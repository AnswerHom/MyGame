var page;
(function (page) {
    var ResultPage = (function () {
        function ResultPage(app) {
            this.SHOW_COUNT = 50; //最多显示条数
            this.PAGE_SIZE = 6;
            this.ITEM_HEIGHT = 162;
            this._needLoadData = false;
            this.isOpened = false;
            this._bgisLoad = false;
            this._bg1isLoad = false;
            this._bg2isLoad = false;
            this._bg3isLoad = false;
            this._app = app;
            this.init();
        }
        ResultPage.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas();
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        ResultPage.prototype.open = function () {
            if (this._needLoadData && this._dataArr) {
                this.updateShow();
                this.updateList();
            }
            this.isOpened = true;
        };
        ResultPage.prototype.close = function () {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, 1000, 1000);
        };
        //设置数据
        ResultPage.prototype.setData = function (type, score, data) {
            console.log("====================", type, score, data);
            this._dataArr = data;
            if (!this.isOpened) {
                this._needLoadData = true;
                return;
            }
            this.updateShow();
            this.updateList();
            var selftop = this._app.wxSelfInfo;
            var idx = 0;
            var selfTop = 0;
            console.log('self', selftop);
            var len = this._dataArr ? this._dataArr.length : 0;
            var index = 0;
            for (var i = 0; i < len; i++) {
                var rowData = this._dataArr[i];
                if (!rowData)
                    continue;
                // if(selftop.openid == rowData.openid){
                // 	index = i;
                // 	selfTop = idx+1;
                // 	break;
                // }
                idx++;
            }
        };
        //更新显示
        ResultPage.prototype.updateShow = function () {
            console.log('进来level');
            // this.clearDataShow();
            if (!this._dataArr)
                return;
            if (!this._dataShowArr) {
                this._dataShowArr = new Array();
            }
            else {
                this._dataShowArr.length = 0;
            }
            console.log('updateShow', this._dataArr.length);
            var idx = 0;
            var index = 0;
            var selftop = this._app.wxSelfInfo;
            for (var i = 0; i < this._dataArr.length; i++) {
                var rowData = this._dataArr[i];
                if (!rowData)
                    continue;
            }
            if (index == 0) {
                for (var i = 0; i < this._dataArr.length && i < 3; i++) {
                    this._dataArr[i].rank = i + 1;
                    this._dataShowArr.push(this._dataArr[i]);
                }
            }
            else {
                for (var i = index - 1; i < this._dataArr.length && i < index + 2; i++) {
                    this._dataArr[i].rank = i + 1;
                    this._dataShowArr.push(this._dataArr[i]);
                }
            }
        };
        ResultPage.prototype.updateList = function () {
            var _this = this;
            var api = window["externalInterfacePI"];
            if (!this._bg1) {
                this._bg1 = api.Image();
                this._bg1.src = 'ui/jiesuan/tu_d1.png';
                this._bg1.onload = function () {
                    _this._bg1isLoad = true;
                    _this._updateList();
                };
            }
            if (this._bg1isLoad)
                this._updateList();
            if (!this._bg2) {
                this._bg2 = api.Image();
                this._bg2.src = 'ui/jiesuan/tu_d2.png';
                this._bg2.onload = function () {
                    _this._bg2isLoad = true;
                    _this._updateList();
                };
            }
            if (this._bg2isLoad)
                this._updateList();
            if (!this._bg3) {
                this._bg3 = api.Image();
                this._bg3.src = 'ui/jiesuan/tu_d3.png';
                this._bg3.onload = function () {
                    _this._bg3isLoad = true;
                    _this._updateList();
                };
            }
            if (this._bg3isLoad)
                this._updateList();
        };
        ResultPage.prototype._updateList = function () {
            var pagedData = this._dataShowArr;
            var pageLen = pagedData.length;
            this._ctx.clearRect(0, 0, 1000, 1000);
            console.log("this.updateList.page", pageLen);
            for (var i = 0; i < pageLen; i++) {
                this.drawRankItem(this._ctx, i, pagedData[i].rank, pagedData[i]);
            }
        };
        //canvas原点在左上角
        ResultPage.prototype.drawRankItem = function (ctx, index, rank, data) {
            var api = window["externalInterfacePI"];
            // cell.setData(rowData.openid,index+1,rowData.nickname,rowData.score,rowData.avatarUrl);
            var avatarUrl = data.avatarUrl;
            var nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
            var grade = data.score;
            var itemGapX = (this.ITEM_HEIGHT + 8) * index;
            console.log("this.drawRankItem", index, nick);
            //绘制背景
            var idx = rank < 3 ? rank : 3;
            // ResMgr.getRes(, (img) => {
            ctx.drawImage(this["_bg" + idx], itemGapX + 60, 50, 162, 279);
            //头像描边
            ctx.beginPath();
            ctx.moveTo(itemGapX + 96, 78);
            ctx.lineTo(itemGapX + 184, 78);
            ctx.lineTo(itemGapX + 184, 166);
            ctx.lineTo(itemGapX + 96, 166);
            ctx.lineTo(itemGapX + 96, 78);
            ctx.closePath(); //闭合路径 
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'block';
            ctx.lineJoin = "round";
            ctx.stroke();
            //头像
            page.ResMgr.getRes(avatarUrl, function (img) {
                ctx.drawImage(img, itemGapX + 96, 78, 88, 88);
            });
            //名字
            ctx.baseLine = "middle";
            ctx.font = "bold 16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(nick, itemGapX + 140, 200, 80);
            //分数
            ctx.baseLine = "middle";
            ctx.font = "bold 36px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("" + grade, itemGapX + 138, 258);
            // })
            page.ResMgr.getRes('ui/jiesuan/top_' + idx + '.png', function (img) {
                ctx.drawImage(img, itemGapX + 98, 15, 80, 80);
                // //名次
                // if (rank > 2){
                // 	ctx.baseLine = "middle";
                // 	ctx.font = "bold 36px Arial";
                // 	ctx.fillStyle = "#ffffff";
                // 	ctx.fillText(`${rank}`, itemGapX +  120, 65);
                // }
            });
            // //头像
            // ResMgr.getRes(avatarUrl, (img) => {
            // 	ctx.drawImage(img, itemGapX +  90, 80, 88, 88);
            // })
        };
        return ResultPage;
    }());
    page.ResultPage = ResultPage;
})(page || (page = {}));
//# sourceMappingURL=ResultPage.js.map