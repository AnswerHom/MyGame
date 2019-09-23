module page {
    /**当需要显示单个或者3个头像的界面 */
    export class chaoyue {
        private _app: any;
        private _ctx: any;
        public isOpened: boolean = false;
        private _clearRectWidth: number = 100;
        private _clearRectHeight: number = 100;

        public static TYPE_SINGLE: number = 0;
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
        setData(data,score): void {
            //取前三名来绘制
            console.log("进入绘制头像了！！");
            if (!data || data.length <= 0) return;
            this._friendData = data;
            console.log("打印赋值头像数据", this._friendData);
            //储存图画
            // this.initImg();
            //开始绘制
            this.drawHead(score);
        }

        clean(){
            if(this._ctx)
                this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        }

        private _index:number = 0;
        private _isDraw:boolean = false;
        private _curData = [];
        private drawHead(score): void {
            //从自己的分数中找出对应的数据
            // let selfInfo: any;
			// for(let i=0;i<this._friendData.length;i++){
			// 	if(this._app.wxSelfInfo.openid == this._friendData[i].openid){
			// 		selfInfo = this._friendData[i];
			// 		break;
			// 	}
			// }
            // console.log(this._app.wxSelfInfo);

            //即将超越
            this._friendData = this._friendData.reverse()
            if(this._curData.length == 0)
                this._curData = this._friendData;
            console.log("初始化",this._index)
            for (let i = this._index; i < this._curData.length; i++) {
                if (score >= this._curData[i].score) {
                    // console.log("超越分数了", score, this._friendData[i].score);
                    this._index = i;
                    this._isDraw = true;
                    break;
                }else{
                    this._isDraw = false;
                }
            }
            // console.log("即将超越", score, this._friendData);
            let curFriend = this._curData[this._index];
            let avatarUrl = curFriend.avatarUrl;
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
            //头像
            if (avatarUrl && this._isDraw) {
                this._curData.shift();
                this._isDraw = false
                ResMgr.getRes(avatarUrl, (img, index) => {
                    this._ctx.drawImage(img, 0, 25, 60, 60);
                    console.log("成功绘制")
                    //分数
                    this._ctx.font = "22px Arial";
                    this._ctx.fillStyle = "#ffffff";
                    this._ctx.strokeStyle="#000000";
                    this._ctx.textAlign = "left";
                    this._ctx.lineWidth=3;
                    this._ctx.strokeText("超越", 8, 18);
                    this._ctx.fillText("超越", 8, 18);
                });
            }else{
                console.log("成功绘制")
                // this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
            }
            

            
        }

        public close(): void {
            this.isOpened = false;
            
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        }
    }
}
