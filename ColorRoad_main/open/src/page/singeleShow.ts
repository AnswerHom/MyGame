module page {
    /**当需要显示单个或者3个头像的界面 */
    export class singeleShowPage {
        private _app: any;
        private _ctx: any;
        public isOpened: boolean = false;
        private _clearRectWidth: number = 1000;
        private _clearRectHeight: number = 1000;

        public static TYPE_SINGLE: number = 0;
        public static TYPE_THREE: number = 1;
        constructor(app: any) {
            this._app = app;
            this.init();
        }

        private init(): void {
            let api: any = window["externalInterfacePI"];
            let canvas = api.getSharedCanvas();
            console.log(canvas.width, canvas.height);
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        }

        public open(): void {
            this.isOpened = true;
        }

        private _friendData: any;
        private _score: number;
        setData(data, type, score: number): void {
            this._score = score;
            //取前三名来绘制
            console.log("进入绘制头像了！！");
            if (!data || data.length <= 0) return;
            this._friendData = data;
            console.log("打印赋值头像数据", this._friendData);
            //储存图画
            // this.initImg();
            //开始绘制
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
            this.drawHead(type);
        }

        private drawHead(type: number): void {
            console.log("老子要开始绘制", type);
            //从自己的分数中找出对应的数据
            let selfInfo: any = this._app.wxSelfInfo;
            // for(let i=0;i<this._friendData.length;i++){
            // 	if(this._app.wxSelfInfo.openid == this._friendData[i].openid){
            // 		selfInfo = this._friendData[i];
            // 		break;
            // 	}
            // }
            console.log(this._app.wxSelfInfo);
            let index: number;
            if (type == singeleShowPage.TYPE_SINGLE) {
                //即将超越
                for (let i = 0; i < this._friendData.length; i++) {
                    if (this._score >= this._friendData[i].score) {
                        console.log("超越分数了", selfInfo.score, this._friendData[i].score);
                        index = i - 1;
                        break;
                    }
                }
                if (!index && index != 0) {
                    console.log("index不存在", index);
                    index = this._friendData.length - 1;
                }
                console.log("即将超越", selfInfo, this._friendData, index);
                let curFriend = this._friendData[index];
                if (!curFriend) {
                    this._ctx.font = "45px Arial";
                    this._ctx.fillStyle = "#ffffff";
                    this._ctx.fillText("已经是第一名啦", 20, 60);
                } else {
                    let avatarUrl = curFriend.avatarUrl;
                    //头像
                    if (avatarUrl) {
                        ResMgr.getRes(avatarUrl, (img, index) => {
                            this._ctx.drawImage(img, 10, 5, 80, 80);
                            console.log("老子要开始绘制分数", curFriend.score);
                            //分数
                            this._ctx.font = "45px Arial";
                            this._ctx.fillStyle = "#ffffff";
                            this._ctx.strokeStyle = "#ffffff";
                            this._ctx.textAlign = "left";
                            this._ctx.lineWidth = 2;
                            this._ctx.strokeText(curFriend.score, 180, 65);
                            this._ctx.fillText(curFriend.score, 180, 65);
                        });
                    }
                }

            } else if (type == singeleShowPage.TYPE_THREE) {
                console.log("结算超越", this._friendData)
                //显示三个
                for (let i = 0; i < this._friendData.length; i++) {
                    if (selfInfo && selfInfo.openid == this._friendData[i].openid) {
                        //找出自己的位置
                        index = i;
                    }
                }
                if (!selfInfo) {
                    index = 0;
                }
                console.log("老子要index", index);
                let dataArray = [];
                let showTypeSort: number;
                //顺序不能颠倒
                if (this._friendData.length >= 3) {
                    if (index == 0) {
                        //前一个没有，也就是自己第一名    
                        dataArray.push(this._friendData[index]);
                        dataArray.push(this._friendData[index + 1]);
                        dataArray.push(this._friendData[index + 2]);
                        showTypeSort = 1;
                    }
                    if (index == this._friendData.length - 1) {
                        //后一个没有，也就是自己最后一名 ,等于长度减一，位于最后一个位置
                        dataArray.push(this._friendData[index - 2]);
                        dataArray.push(this._friendData[index - 1]);
                        dataArray.push(this._friendData[index]);
                        showTypeSort = 2;
                    }
                    if (this._friendData[index + 1] && this._friendData[index - 1]) {
                        //位于中的时候
                        dataArray.push(this._friendData[index - 1]);
                        dataArray.push(this._friendData[index]);
                        dataArray.push(this._friendData[index + 1]);
                        showTypeSort = 3;
                    }
                    console.log("老子要开始绘制分数", dataArray);
                } else if (this._friendData.length == 2) {
                    //只有两个人
                    dataArray.push(this._friendData[0]);
                    dataArray.push(this._friendData[1]);
                    //两者之间的排序
                    showTypeSort = index == 0 ? 1 : 2;
                } else if (this._friendData.length == 1) {
                    //只有一个人
                    dataArray.push(this._friendData[0]);
                    showTypeSort = 1;
                }

                //开始绘制
                for (let i = 0; i < dataArray.length; i++) {
                    //因为index从零开始，所以要+1
                    this.drawOther(dataArray[i], i, index + 1, showTypeSort);
                }
            }
        }

        private _diffNum: number = 200;
        private drawOther(data: any, i: number, index: number, showTypeSort: number): void {
            let curFriend = data;
            if (!curFriend || !curFriend.avatarUrl) return;
            let avatarUrl = curFriend.avatarUrl;
            let curGrade: number;
            let nickName = data.nickname;
            let isSelf = data.openid == this._app.wxSelfInfo.openid ? true : false;
            //名次
            switch (showTypeSort) {
                case 1:
                    curGrade = index + i;
                    break
                case 2:
                    curGrade = index + (i - 2);
                    break
                case 3:
                    curGrade = i == 0 ? index - 1 : i == 1 ? index : index + 1;
                    break
            }
            this._ctx.fillStyle = isSelf ? "#ffff08" : "#ffffff";
            this._ctx.font = "32px Arial";
            this._ctx.textAlign = "center";
            this._ctx.lineWidth = 2;
            this._ctx.strokeStyle = '#000000';
            this._ctx.strokeText(curGrade, 70 + (this._diffNum * i), 25);
            this._ctx.fillText(curGrade, 70 + (this._diffNum * i), 25);
            //头像
            if (avatarUrl) {
                page.ResMgr.getRes(avatarUrl, (img, index) => {
                    this._ctx.drawImage(img, (this._diffNum * i) + 35, 31, 80, 80);
                });
            }
            //姓名
            this._ctx.fillStyle = isSelf ? "#ffff08" : "#ffffff";
            this._ctx.font = "32px Arial";
            this._ctx.textAlign = "center";
            this._ctx.lineWidth = 2;
            this._ctx.strokeStyle = '#000000';
            this._ctx.strokeText(nickName, 70 + (this._diffNum * i), 151);
            this._ctx.fillText(nickName, 70 + (this._diffNum * i), 151);
            //分数
            this._ctx.fillStyle = isSelf ? "#ffff08" : "#ffffff";
            this._ctx.font = "32px Arial";
            this._ctx.textAlign = "center";
            this._ctx.lineWidth = 2;
            this._ctx.strokeStyle = '#000000';
            this._ctx.strokeText(curFriend.score, 70 + (this._diffNum * i), 191);
            this._ctx.fillText(curFriend.score, 70 + (this._diffNum * i), 191);
        }

        public close(): void {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        }
    }
}
