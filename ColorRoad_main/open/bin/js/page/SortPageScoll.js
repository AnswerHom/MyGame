var page;
(function (page_1) {
    var SortPageScoll = (function () {
        function SortPageScoll(app) {
            this.SHOW_COUNT = 50; //最多显示条数
            this.PAGE_SIZE = 5;
            this.ITEM_HEIGHT = 110;
            this.PAGE_START_POSX = 90;
            this.PAGE_START_POSY = 45;
            this.PAGE_ITEM_OFFESTY = 9;
            this._needLoadData = false;
            this._curIndex = 0;
            this.isOpened = false;
            this._bgisLoad = false;
            this._scorebgisLoad = false;
            this._showHeight = 0;
            //初始化当前开放域所需要用到的图片，先加载好，以防止没有绘制成功的情况
            this._isInit = false;
            this._min = 0;
            this._max = 0;
            this._oldStartY = 0;
            //canvas原点在左上角
            this.imgCount = 0;
            this.MY_RANK_POS = 755;
            this._app = app;
            this.init();
        }
        SortPageScoll.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas();
            this._showHeight = 690;
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        SortPageScoll.prototype.open = function () {
            this.initImg();
            this._curIndex = 0;
            this._oldStartY = 0;
            if (this._needLoadData && this._dataArr) {
                this.updateShow();
                this.updateList(this._curIndex);
            }
            this.isOpened = true;
        };
        SortPageScoll.prototype.initImg = function () {
            if (!this._isInit) {
                this._isInit = true;
                page_1.ResMgr.getRes("top/top1.png", null);
                page_1.ResMgr.getRes("top/top2.png", null);
                page_1.ResMgr.getRes("top/top3.png", null);
                page_1.ResMgr.getRes("tongyong/wpk_1.png", null);
                page_1.ResMgr.getRes("top/tu_yd.png", null);
                page_1.ResMgr.getRes("top/tu_di.png", null);
                page_1.ResMgr.getRes("top/1_1.png", null);
                page_1.ResMgr.getRes("top/1_2.png", null);
                page_1.ResMgr.getRes("top/1_3.png", null);
                page_1.ResMgr.getRes("top/1_4.png", null);
                page_1.ResMgr.getRes("top/1_5.png", null);
                page_1.ResMgr.getRes("top/1_6.png", null);
                page_1.ResMgr.getRes("top/1_7.png", null);
                page_1.ResMgr.getRes("top/1_8.png", null);
                page_1.ResMgr.getRes("top/1_9.png", null);
                page_1.ResMgr.getRes("top/1_10.png", null);
                page_1.ResMgr.getRes("top/1_11.png", null);
            }
        };
        SortPageScoll.prototype.close = function () {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, 1000, 1000);
        };
        //设置数据
        SortPageScoll.prototype.setData = function (value) {
            this._dataArr = value;
            if (!this.isOpened) {
                this._needLoadData = true;
                return;
            }
            this.updateShow();
            this.updateList(this._curIndex);
            var selftop = this._app.wxSelfInfo;
            var idx = 0;
            console.log('self', selftop);
            var len = this._dataArr ? this._dataArr.length : 0;
            for (var i = 0; i < len; i++) {
                var rowData = this._dataArr[i];
                if (!rowData)
                    continue;
                idx++;
            }
        };
        //更新显示
        SortPageScoll.prototype.updateShow = function () {
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
            var idx = 0;
            for (var i = 0; i < this._dataArr.length; i++) {
                var rowData = this._dataArr[i];
                if (!rowData || !rowData["openid"])
                    continue;
                if (idx < this.SHOW_COUNT) {
                    this._dataShowArr.push(rowData);
                    idx++;
                }
            }
            //算出拖动页面的数据
            console.log("打印出max!!!!!");
            var max = this._dataShowArr.length * (this.ITEM_HEIGHT);
            this._max = max - this._showHeight;
            if (this._max < 0)
                this._max = 0;
        };
        SortPageScoll.prototype.controlPage = function (type) {
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
                    this.updateList((this._curIndex));
                    break;
            }
            // console.log("this._dataList.page",this._curIndex)
        };
        SortPageScoll.prototype.updateDela = function (diff) {
            // if(Math.ceil(this._dataShowArr.length / this.PAGE_SIZE) == 2)return;
            this._oldStartY += diff;
            if (this._oldStartY < this._min)
                this._oldStartY = this._min;
            if (this._oldStartY > this._max)
                this._oldStartY = this._max;
            this.updateList(this._oldStartY);
        };
        SortPageScoll.prototype.updateList = function (page) {
            var api = window["externalInterfacePI"];
            this._updateList(page);
        };
        SortPageScoll.prototype._updateList = function (startX) {
            var pageStart = Math.floor(startX / this.ITEM_HEIGHT);
            console.log(pageStart);
            var pagedData = this._dataShowArr.slice(pageStart, pageStart + this.PAGE_SIZE + 1);
            var pageLen = pagedData.length;
            this._ctx.clearRect(0, 0, 1000, 1000);
            this.imgCount = 0;
            for (var i = 0; i < pageLen; i++) {
                this.drawRankItem(this._ctx, i, pageStart + i + 1, pagedData[i], startX);
            }
            // console.log("this.updateList.page", pageLen)
            this.drawMyRank();
        };
        SortPageScoll.prototype.drawRankItem = function (ctx, index, rank, data, startX) {
            var _this = this;
            var api = window["externalInterfacePI"];
            var avatarUrl = data.avatarUrl;
            var nick = data.nickname.length > 5 ? data.nickname.slice(0, 5) + "..." : data.nickname;
            var grade = data.score;
            var itemGapY = (this.ITEM_HEIGHT * (rank - 1)) - startX;
            var posx = this.PAGE_START_POSX;
            var posy = this.PAGE_START_POSY + itemGapY;
            //绘制背景
            page_1.ResMgr.getRes('top/tu_di.png', function (img) {
                ctx.drawImage(img, posx, posy, 545, 100);
                //名次
                if (rank <= 3) {
                    page_1.ResMgr.getRes('top/top' + rank + '.png', function (img) {
                        ctx.drawImage(img, posx + 10, posy + 5, 56, 84);
                    });
                }
                else {
                    ctx.font = "55px Arial";
                    ctx.fillStyle = "#3d7e9c";
                    ctx.fillText("" + rank, posx + 60, posy + 65);
                }
                ///头像
                page_1.ResMgr.getRes("tongyong/wpk_1.png", function (img) {
                    ctx.drawImage(img, posx + 110, posy + 5, 87, 87);
                    page_1.ResMgr.getRes(avatarUrl, function (avatarUrl) {
                        ctx.drawImage(avatarUrl, posx + 110, posy + 5, 87, 87);
                    });
                });
                // //名字
                ctx.fillStyle = "#3d7e9c";
                ctx.font = "28px SimSun";
                ctx.textAlign = "left";
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#3d7e9c';
                ctx.strokeText(nick, posx + 230, posy + 34);
                ctx.fillText(nick, posx + 230, posy + 34);
                //绘制称号
                var chengHaoIndex = _this.getTextChanegHao(grade);
                page_1.ResMgr.getRes("top/1_" + (chengHaoIndex + 1) + ".png", function (img) {
                    ctx.drawImage(img, posx + 230, posy + 50);
                });
                //绘制底
                page_1.ResMgr.getRes("top/tu_yd.png", function (img) {
                    ctx.drawImage(img, posx + 425, posy + 23);
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "32px SimSun";
                    ctx.textAlign = "right";
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#ffffff';
                    ctx.strokeText("" + grade, posx + 515, posy + 53);
                    ctx.fillText("" + grade, posx + 515, posy + 53);
                });
            });
        };
        SortPageScoll.prototype.getTextChanegHao = function (grade) {
            for (var i = 0; i < SortPageScoll.DATATEXT.length; i++) {
                var curArray = SortPageScoll.DATATEXT[i];
                var maxCondition = curArray.score;
                var tesc = curArray.text;
                if (grade < maxCondition) {
                    return i;
                }
                else {
                    continue;
                }
            }
        };
        //绘制自己
        SortPageScoll.prototype.drawMyRank = function () {
            var _this = this;
            this._ctx.clearRect(0, 800, 1000, 1000);
            console.log("打印自己的数据", this._app.wxSelfInfo);
            if (!this._app.wxSelfInfo)
                return;
            var mySelfInfo;
            var rank;
            for (var i = 0; i < this._dataArr.length; i++) {
                if (this._app.wxSelfInfo && this._app.wxSelfInfo.openid == this._dataArr[i].openid) {
                    mySelfInfo = this._dataArr[i];
                    rank = i + 1;
                    break;
                }
            }
            var nickName = mySelfInfo.nickname;
            var nick = nickName.length > 5 ? nickName.slice(0, 5) + "..." : nickName;
            //名次
            if (!rank)
                rank = "未上榜";
            if (rank <= 3) {
                page_1.ResMgr.getRes('top/top' + rank + '.png', function (img) {
                    _this._ctx.drawImage(img, _this.PAGE_START_POSX + 10, _this.MY_RANK_POS, 56, 84);
                });
            }
            else {
                this._ctx.font = "55px Arial";
                this._ctx.fillStyle = "#3d7e9c";
                this._ctx.fillText("" + rank, this.PAGE_START_POSX + 65, this.MY_RANK_POS + 55);
            }
            ///头像
            var avatarUrl = mySelfInfo.avatarUrl;
            page_1.ResMgr.getRes("tongyong/wpk_1.png", function (img) {
                _this._ctx.drawImage(img, _this.PAGE_START_POSX + 110, _this.MY_RANK_POS, 87, 87);
                page_1.ResMgr.getRes(avatarUrl, function (avatarUrl) {
                    _this._ctx.drawImage(avatarUrl, _this.PAGE_START_POSX + 110, _this.MY_RANK_POS, 87, 87);
                });
            });
            // //名字
            this._ctx.fillStyle = "#3d7e9c";
            this._ctx.font = "28px SimSun";
            this._ctx.textAlign = "left";
            this._ctx.lineWidth = 2;
            this._ctx.strokeStyle = '#3d7e9c';
            this._ctx.strokeText(nick, this.PAGE_START_POSX + 226, this.MY_RANK_POS + 30);
            this._ctx.fillText(nick, this.PAGE_START_POSX + 226, this.MY_RANK_POS + 30);
            var score = mySelfInfo.score;
            var chengHao = this.getTextChanegHao(score);
            var chengHaoIndex = this.getTextChanegHao(score);
            page_1.ResMgr.getRes("top/1_" + (chengHaoIndex + 1) + ".png", function (img) {
                _this._ctx.drawImage(img, _this.PAGE_START_POSX + 230, _this.MY_RANK_POS + 40);
            });
            page_1.ResMgr.getRes("top/tu_yd.png", function (img) {
                _this._ctx.drawImage(img, _this.PAGE_START_POSX + 425, _this.MY_RANK_POS + 20);
                _this._ctx.fillStyle = "#ffffff";
                _this._ctx.font = "32px SimSun";
                _this._ctx.textAlign = "right";
                _this._ctx.lineWidth = 2;
                _this._ctx.strokeStyle = '#ffffff';
                _this._ctx.strokeText("" + score, _this.PAGE_START_POSX + 515, _this.MY_RANK_POS + 49);
                _this._ctx.fillText("" + score, _this.PAGE_START_POSX + 515, _this.MY_RANK_POS + 49);
            });
        };
        return SortPageScoll;
    }());
    SortPageScoll.DATATEXT = [{ score: 100, text: "学徒" }, { score: 200, text: "勇者" }, { score: 300, text: "大侠" }, { score: 500, text: "神勇" }, { score: 750, text: "霸主" }, { score: 1000, text: "宗师" }, { score: 1500, text: "主宰" }, { score: 2000, text: "暴走" }, { score: 3000, text: "无敌" }, { score: 5000, text: "王者" }, { score: 9999999, text: "超神" }];
    page_1.SortPageScoll = SortPageScoll;
})(page || (page = {}));
//# sourceMappingURL=SortPageScoll.js.map