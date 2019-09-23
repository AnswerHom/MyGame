var page;
(function (page) {
    /**当需要显示单个或者3个头像的界面 */
    var chaoyue = (function () {
        function chaoyue(app) {
            this.isOpened = false;
            this._clearRectWidth = 100;
            this._clearRectHeight = 100;
            this._index = 0;
            this._isDraw = false;
            this._curData = [];
            this._app = app;
            this.init();
        }
        chaoyue.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas();
            console.log(canvas.width, canvas.height);
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        chaoyue.prototype.open = function () {
            this.isOpened = true;
        };
        chaoyue.prototype.setData = function (data, score) {
            //取前三名来绘制
            console.log("进入绘制头像了！！");
            if (!data || data.length <= 0)
                return;
            this._friendData = data;
            console.log("打印赋值头像数据", this._friendData);
            //储存图画
            // this.initImg();
            //开始绘制
            this.drawHead(score);
        };
        chaoyue.prototype.clean = function () {
            if (this._ctx)
                this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        };
        chaoyue.prototype.drawHead = function (score) {
            //从自己的分数中找出对应的数据
            // let selfInfo: any;
            // for(let i=0;i<this._friendData.length;i++){
            // 	if(this._app.wxSelfInfo.openid == this._friendData[i].openid){
            // 		selfInfo = this._friendData[i];
            // 		break;
            // 	}
            // }
            // console.log(this._app.wxSelfInfo);
            var _this = this;
            //即将超越
            this._friendData = this._friendData.reverse();
            if (this._curData.length == 0)
                this._curData = this._friendData;
            console.log("初始化", this._index);
            for (var i = this._index; i < this._curData.length; i++) {
                if (score >= this._curData[i].score) {
                    // console.log("超越分数了", score, this._friendData[i].score);
                    this._index = i;
                    this._isDraw = true;
                    break;
                }
                else {
                    this._isDraw = false;
                }
            }
            // console.log("即将超越", score, this._friendData);
            var curFriend = this._curData[this._index];
            var avatarUrl = curFriend.avatarUrl;
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
            //头像
            if (avatarUrl && this._isDraw) {
                this._curData.shift();
                this._isDraw = false;
                page.ResMgr.getRes(avatarUrl, function (img, index) {
                    _this._ctx.drawImage(img, 0, 25, 60, 60);
                    console.log("成功绘制");
                    //分数
                    _this._ctx.font = "22px Arial";
                    _this._ctx.fillStyle = "#ffffff";
                    _this._ctx.strokeStyle = "#000000";
                    _this._ctx.textAlign = "left";
                    _this._ctx.lineWidth = 3;
                    _this._ctx.strokeText("超越", 8, 18);
                    _this._ctx.fillText("超越", 8, 18);
                });
            }
            else {
                console.log("成功绘制");
            }
        };
        chaoyue.prototype.close = function () {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        };
        return chaoyue;
    }());
    chaoyue.TYPE_SINGLE = 0;
    page.chaoyue = chaoyue;
})(page || (page = {}));
//# sourceMappingURL=chaoyue.js.map