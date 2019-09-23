var page;
(function (page_1) {
    var SortPage = (function () {
        function SortPage(app) {
            this.SHOW_COUNT = 50; //最多显示条数
            this.PAGE_SIZE = 6;
            this.ITEM_HEIGHT = 93;
            this._needLoadData = false;
            this._curIndex = 0;
            this.isOpened = false;
            this._bgisLoad = false;
            this._app = app;
            this.init();
        }
        SortPage.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas(); //api.Canvas();
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        SortPage.prototype.open = function () {
            this._curIndex = 0;
            if (this._needLoadData && this._dataArr) {
                this.updateShow();
                this.updateList(this._curIndex);
            }
            this.isOpened = true;
        };
        SortPage.prototype.close = function () {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, 1000, 1000);
        };
        //设置数据
        SortPage.prototype.setData = function (value) {
            this._dataArr = value;
            if (!this.isOpened) {
                this._needLoadData = true;
                return;
            }
            this.updateShow();
            this.updateList(this._curIndex);
            var selftop = this._app.wxSelfInfo;
            var idx = 0;
            var selfTop = 0;
            console.log('self', selftop);
            var len = this._dataArr ? this._dataArr.length : 0;
            for (var i = 0; i < len; i++) {
                var rowData = this._dataArr[i];
                if (!rowData)
                    continue;
                // if(selftop.openid == rowData.openid){
                // 	selfTop = idx+1;
                // }
                idx++;
            }
            // if(selftop.nickName.length > 7){
            // 	selftop.nickName = selftop.nickName.slice(0,6)+"...";
            // 	// trace(friendName,friendName.length);
            // }
            // this._view.box_self.label_name.text = selftop.nickname;
            // this._view.box_self.label_score.text = selftop.score.toString();
            // if(selftop.avatarUrl&&selftop.avatarUrl.length>0){
            // this._view.box_self.image_photo.skin = selftop.avatarUrl;
            // }
            // this._view.box_self.img_guan.visible = false;
            // this._view.box_self.label_top.text = selfTop?selfTop:"未上榜";
        };
        //更新显示
        SortPage.prototype.updateShow = function () {
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
            for (var i = 0; i < this._dataArr.length; i++) {
                var rowData = this._dataArr[i];
                if (!rowData || !rowData["openid"])
                    continue;
                console.log('updateShow1 ', idx);
                if (idx < this.SHOW_COUNT) {
                    this._dataShowArr.push(rowData);
                    idx++;
                }
            }
        };
        SortPage.prototype.controlPage = function (type) {
            console.log('翻页', type);
            var totalPage = Math.ceil(this._dataShowArr.length / this.PAGE_SIZE);
            var index;
            switch (type) {
                case "up":
                    this._curIndex--;
                    if (this._curIndex < 0)
                        this._curIndex = 0;
                    this.updateList((this._curIndex));
                    break;
                case "next":
                    this._curIndex++;
                    if (this._curIndex > totalPage)
                        this._curIndex = totalPage;
                    console.log('fanye===', this._curIndex);
                    this.updateList((this._curIndex));
                    break;
            }
            // console.log("this._dataList.page",this._curIndex)
        };
        SortPage.prototype.updateList = function (page) {
            var _this = this;
            var api = window["externalInterfacePI"];
            console.log();
            if (!this._bg) {
                this._bg = api.Image();
                this._bg.src = 'ui/jiesuan/wpk_2.png';
                this._bg.onload = function () {
                    _this._bgisLoad = true;
                    _this._updateList(page);
                };
            }
            if (this._bgisLoad)
                this._updateList(page);
        };
        SortPage.prototype._updateList = function (page) {
            var pageStart = page * this.PAGE_SIZE;
            var pagedData = this._dataShowArr.slice(pageStart, pageStart + this.PAGE_SIZE);
            var pageLen = pagedData.length;
            this._ctx.clearRect(0, 0, 1000, 1000);
            console.log("this.updateList.page", pageLen);
            for (var i = 0; i < pageLen; i++) {
                this.drawRankItem(this._ctx, i, pageStart + i + 1, pagedData[i], pageLen);
            }
        };
        //canvas原点在左上角
        SortPage.prototype.drawRankItem = function (ctx, index, rank, data, pageLen) {
            var api = window["externalInterfacePI"];
            // cell.setData(rowData.openid,index+1,rowData.nickname,rowData.score,rowData.avatarUrl);
            var avatarUrl = data.avatarUrl;
            var nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
            var grade = data.score;
            var itemGapY = (this.ITEM_HEIGHT + 7) * index;
            console.log("this.drawRankItem", index, nick);
            //绘制背景
            ctx.drawImage(this._bg, 0, itemGapY, 574, 93);
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            //名次
            if (rank <= 3) {
                page_1.ResMgr.getRes('ui/tongyong/g' + rank + '.png', function (img) {
                    ctx.drawImage(img, 15, itemGapY + 15, 57, 75);
                });
            }
            else {
                ctx.baseLine = "middle";
                ctx.font = "36px Helvetica";
                ctx.textAlign = "center";
                ctx.fillText("" + rank, 40, itemGapY + 55);
            }
            //头像
            page_1.ResMgr.getRes(avatarUrl, function (img) {
                ctx.drawImage(img, 87, itemGapY + 15, 64, 64);
            });
            //名字
            ctx.baseLine = "middle";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "center";
            ctx.fillText(nick, 200, itemGapY + 55);
            //分数
            ctx.baseLine = "middle";
            ctx.font = "32px Helvetica";
            ctx.textAlign = "center";
            ctx.fillText(grade + "\u5206", 400, itemGapY + 55);
        };
        return SortPage;
    }());
    page_1.SortPage = SortPage;
})(page || (page = {}));
//# sourceMappingURL=SortPage.js.map