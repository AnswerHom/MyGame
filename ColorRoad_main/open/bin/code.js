var interfacePI = {}

interfacePI.setWxSelfInfoFun = null;
interfacePI.setWxOpenidFun = null;
interfacePI.openSortFun = null;
interfacePI.closePageFun = null;
interfacePI.setSortDataFun = null;
interfacePI.setVersionFun = null;
interfacePI.openResultFun = null;
interfacePI.updateScoreFun = null;
interfacePI.friendDataList = null;
interfacePI.resizeFun = null;
interfacePI.datacun = null;
interfacePI.controlPage = null;
interfacePI.ScollSortPage = null;

// /** 
wx.onMessage(function (data) {
    console.log(data)
    if (data.type && data.type == "wxxx") {
        //通过接收主域的消息来设置开发数据域的画布大小跟矩阵信息
        sharedCanvas.width = data.width;
        sharedCanvas.height = data.height;
        console.log("-----------------sharedresize----------1------------------", sharedCanvas.width, sharedCanvas.height);
        // console.log(data.matrix);
        // console.log("-----------------sharedresize------------2----------------");
        // if (data.matrix){
        //     Laya.stage._canvasTransform = data.matrix;//重新设置矩阵
        //     console.log(Laya.stage._canvasTransform);
        // }
        //版号
        if (data.version && interfacePI.setVersionFun) {
            interfacePI.setVersionFun(data.version);
        }
    } else if (data['isLoad'] == "filedata") {
        console.log("zhuyu isLoad");
        // Laya.MiniFileMgr.ziyuFileData[data.url] = data.data;//文本数据
    }
    else if (data.type && data.type == "getselfclouddata") {
        wx.getUserCloudStorage && wx.getUserCloudStorage({
            keyList: ["score", "time"],
            success: function (res) {
                console.log("getUserCloudStorage:success", res.KVDataList);
                if (res) {
                    console.log("玩家数据", res.KVDataList[0], res.KVDataList[1], data.userinfo);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                    if (data.userinfo) {
                        data.userinfo.nickname = data.userinfo.nickName;
                        data.userinfo.KVDataList = res.KVDataList;
                        interfacePI.setWxSelfInfoFun && interfacePI.setWxSelfInfoFun(data.userinfo, data.time);
                    }
                }
            },
            fail: function () {
                console.log("getUserCloudStorage:fail");
            },
            complete: function () {
                // console.log("getUserCloudStorage:complete");
            }
        });
    }
    else if (data.type && data.type == "getOpenid") {
        interfacePI.setWxOpenidFun && interfacePI.setWxOpenidFun(data.openid);
    }
    else if (data.type && data.type == "ctntrolpage") {
        console.log('进入翻页', data.value, data)
        interfacePI.controlPage && interfacePI.controlPage(data.ctntrol)
    }
    else if (data.type && data.type == "ScollSortPage") {
        console.log('进入滚动', data.value, data)
        interfacePI.ScollSortPage && interfacePI.ScollSortPage(data)
    }
    else if (data.type && data.type == "opensort") {
        interfacePI.openSortFun && interfacePI.openSortFun();
        if (data.shareTicket && data.shareTicket != "") {//群排行
            interfacePI.getQunSortData(data.shareTicket, data.time)
        }
        else {
            interfacePI.getFriendData(0, data.time);
        }
    }
    else if (data.type && data.type == "closepage") {
        interfacePI.closePageFun && interfacePI.closePageFun(data.page);
    }
    else if (data.type && data.type == "openresult") {
        interfacePI.getFriendData(1, data.showtype, data.score, data.time);
    }
    else if (data.type && data.type == "updatescore") {
        interfacePI.updateScoreFun(data.score, data, data.etype);
    }
    else if (data.type && data.type == "opensingleshow") {
        console.log('正式进入开放域', data.showType, data);
        interfacePI.openSingleShow(data.showType, data.time,data.score);
    }
    else if (data.type && data.type == "chaoyue") {
        console.log('正式进入开放域', data.showType, data);
        interfacePI.openChaoyue(data.score,data.time);
    }
    else if (data.type && data.type == "cleanchaoyue") {
        console.log('正式进入开放域', data.showType, data);
        interfacePI.cleanChaoYueFun && interfacePI.cleanChaoYueFun()
    }
    
})
//*/
interfacePI.cleanChaoYueFun = function(){
    
}
//上传成绩
interfacePI.updateSelfCloundData = function (value, time) {
    wx.setUserCloudStorage && wx.setUserCloudStorage({
        KVDataList: [{ key: "score", value: value.toString() }, { key: "time", value: time.toString() }],
        success: function () {
            console.log("setUserCloudStorage:success");
        },
        fail: function () {
            console.log("setUserCloudStorage:fail");
        },
        complete: function () {
            // console.log("setUserCloudStorage:complete");
            // var openDataContext = wx.getOpenDataContext()
            // openDataContext.postMessage({type:"getselfclouddata"})
        }
    })
}

//获取排行榜数据
interfacePI.getFriendData = function (type, value, value1, value2) {
    // console.log("interfacePI:getFriendData");
    wx.getFriendCloudStorage && wx.getFriendCloudStorage({
        keyList: ["score", "time"],
        success: function (res) {
            console.log("getFriendCloudStorage:success", res);
            if (res) {
                // if(res.data){
                //     for(var i = 0; i < res.data.length;i++){
                //         console.log("朋友玩家数据",i,res.data[i]);
                //     }
                // }
                if (type == 0) {
                    interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data, value);
                }
                else if (type == 1) {
                    interfacePI.openResultFun && interfacePI.openResultFun(value, value1, res.data, value2);
                }
            }
        },
        fail: function () {
            console.log("getFriendCloudStorage:fail");
        },
        complete: function () {
            //console.log("getFriendCloudStorage:complete");
        }
    });
}

//获取单个头像或者多个显示
interfacePI.openSingleShow = function (type, time,score) {
    wx.getFriendCloudStorage && wx.getFriendCloudStorage({
        keyList: ["score", "time"],
        success: function (res) {
            console.log("openSingleShow:success大爷进来了", res, type, time);
            if (res) {
                interfacePI.openSingleShowFun && interfacePI.openSingleShowFun(res, type, time,score)
            }
        },
        fail: function () {
            console.log("openSingleShow:fail");
        },
    });
}

//获取单个头像超越
interfacePI.openChaoyue = function (score,time) {
    wx.getFriendCloudStorage && wx.getFriendCloudStorage({
        keyList: ["score", "time"],
        success: function (res) {
            // console.log("openChaoyue:success大爷进来了", res, time);
            if (res) {
                interfacePI.openChaoYueFun && interfacePI.openChaoYueFun(res, score,time)
            }
        },
        fail: function () {
            console.log("openChaoyue:fail");
        },
    });
}

interfacePI.cleanChaoyue = function () {
    
}



//获取群排行数据
interfacePI.getQunSortData = function (value, time) {
    console.log("interfacePI:getQunSortData");
    wx.getGroupCloudStorage && wx.getGroupCloudStorage({
        shareTicket: value,
        keyList: ["score", "time"],
        success: function (res) {
            console.log("getQunSortData:success", res);
            if (res) {
                if (res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        console.log("群玩家数据", i, res.data[i]);
                    }
                }
                interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data, time);
            }
        },
        fail: function () {
            console.log("getQunSortData:fail");
        },
        complete: function () {
            //console.log("getQunSortData:complete");
        }
    });
}
interfacePI.Canvas = function (value, time) {
    return wx.createCanvas();
}

interfacePI.Image = function (value, time) {
    return wx.createImage();
}

interfacePI.getSharedCanvas = function (value, time) {
    return wx.getSharedCanvas();
}
var window = {}
console.log('window = ', window)
window.externalInterfacePI = interfacePI;
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
var page;
(function (page) {
    /**当需要显示单个或者3个头像的界面 */
    var singeleShowPage = (function () {
        function singeleShowPage(app) {
            this.isOpened = false;
            this._clearRectWidth = 1000;
            this._clearRectHeight = 1000;
            this._diffNum = 200;
            this._app = app;
            this.init();
        }
        singeleShowPage.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas();
            console.log(canvas.width, canvas.height);
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        singeleShowPage.prototype.open = function () {
            this.isOpened = true;
        };
        singeleShowPage.prototype.setData = function (data, type, score) {
            this._score = score;
            //取前三名来绘制
            console.log("进入绘制头像了！！");
            if (!data || data.length <= 0)
                return;
            this._friendData = data;
            console.log("打印赋值头像数据", this._friendData);
            //储存图画
            // this.initImg();
            //开始绘制
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
            this.drawHead(type);
        };
        singeleShowPage.prototype.drawHead = function (type) {
            var _this = this;
            console.log("老子要开始绘制", type);
            //从自己的分数中找出对应的数据
            var selfInfo = this._app.wxSelfInfo;
            // for(let i=0;i<this._friendData.length;i++){
            // 	if(this._app.wxSelfInfo.openid == this._friendData[i].openid){
            // 		selfInfo = this._friendData[i];
            // 		break;
            // 	}
            // }
            console.log(this._app.wxSelfInfo);
            var index;
            if (type == singeleShowPage.TYPE_SINGLE) {
                //即将超越
                for (var i = 0; i < this._friendData.length; i++) {
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
                var curFriend_1 = this._friendData[index];
                if (!curFriend_1) {
                    this._ctx.font = "45px Arial";
                    this._ctx.fillStyle = "#ffffff";
                    this._ctx.fillText("已经是第一名啦", 20, 60);
                }
                else {
                    var avatarUrl = curFriend_1.avatarUrl;
                    //头像
                    if (avatarUrl) {
                        page.ResMgr.getRes(avatarUrl, function (img, index) {
                            _this._ctx.drawImage(img, 10, 5, 80, 80);
                            console.log("老子要开始绘制分数", curFriend_1.score);
                            //分数
                            _this._ctx.font = "45px Arial";
                            _this._ctx.fillStyle = "#ffffff";
                            _this._ctx.strokeStyle = "#ffffff";
                            _this._ctx.textAlign = "left";
                            _this._ctx.lineWidth = 2;
                            _this._ctx.strokeText(curFriend_1.score, 180, 65);
                            _this._ctx.fillText(curFriend_1.score, 180, 65);
                        });
                    }
                }
            }
            else if (type == singeleShowPage.TYPE_THREE) {
                console.log("结算超越", this._friendData);
                //显示三个
                for (var i = 0; i < this._friendData.length; i++) {
                    if (selfInfo && selfInfo.openid == this._friendData[i].openid) {
                        //找出自己的位置
                        index = i;
                    }
                }
                if (!selfInfo) {
                    index = 0;
                }
                console.log("老子要index", index);
                var dataArray = [];
                var showTypeSort = void 0;
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
                }
                else if (this._friendData.length == 2) {
                    //只有两个人
                    dataArray.push(this._friendData[0]);
                    dataArray.push(this._friendData[1]);
                    //两者之间的排序
                    showTypeSort = index == 0 ? 1 : 2;
                }
                else if (this._friendData.length == 1) {
                    //只有一个人
                    dataArray.push(this._friendData[0]);
                    showTypeSort = 1;
                }
                //开始绘制
                for (var i = 0; i < dataArray.length; i++) {
                    //因为index从零开始，所以要+1
                    this.drawOther(dataArray[i], i, index + 1, showTypeSort);
                }
            }
        };
        singeleShowPage.prototype.drawOther = function (data, i, index, showTypeSort) {
            var _this = this;
            var curFriend = data;
            if (!curFriend || !curFriend.avatarUrl)
                return;
            var avatarUrl = curFriend.avatarUrl;
            var curGrade;
            var nickName = data.nickname;
            var isSelf = data.openid == this._app.wxSelfInfo.openid ? true : false;
            //名次
            switch (showTypeSort) {
                case 1:
                    curGrade = index + i;
                    break;
                case 2:
                    curGrade = index + (i - 2);
                    break;
                case 3:
                    curGrade = i == 0 ? index - 1 : i == 1 ? index : index + 1;
                    break;
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
                page.ResMgr.getRes(avatarUrl, function (img, index) {
                    _this._ctx.drawImage(img, (_this._diffNum * i) + 35, 31, 80, 80);
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
        };
        singeleShowPage.prototype.close = function () {
            this.isOpened = false;
            this._ctx.clearRect(0, 0, this._clearRectWidth, this._clearRectHeight);
        };
        return singeleShowPage;
    }());
    singeleShowPage.TYPE_SINGLE = 0;
    singeleShowPage.TYPE_THREE = 1;
    page.singeleShowPage = singeleShowPage;
})(page || (page = {}));
//# sourceMappingURL=singeleShow.js.map
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
var page;
(function (page) {
    var ResMgr = (function () {
        function ResMgr() {
        }
        ResMgr.resDatas = function () {
            return ResMgr._resDatas;
        };
        ResMgr.getRes = function (url, fun, index) {
            if (index === void 0) { index = -1; }
            // if(!url) return;
            var res;
            for (var i = 0; i < ResMgr._resDatas.length; i++) {
                var data = ResMgr._resDatas[i];
                if (data.resPath == url) {
                    data.index = index;
                    res = data;
                    break;
                }
            }
            if (!res) {
                var api = window["externalInterfacePI"];
                res = new ResData();
                ResMgr._resDatas.push(res);
                res.resPath = url;
                res.img = api.Image();
                res.img.src = url;
                if (fun)
                    res.funs.push(fun);
                res.index = index;
                res.img.onload = function () {
                    res.isLoad = true;
                    res.done();
                };
            }
            else {
                //遍历是否有这个回调
                var flag = false;
                for (var i = 0; i < res.funs.length; i++) {
                    if (res.funs[i] == fun) {
                        flag = true;
                    }
                }
                //没有的话传进去
                if (!flag)
                    res.funs.push(fun);
                if (res.isLoad)
                    res.done();
            }
        };
        ResMgr.clear = function () {
            this._resDatas.length = 0;
        };
        return ResMgr;
    }());
    //支持多回调
    ResMgr._resDatas = [];
    page.ResMgr = ResMgr;
    var ResData = (function () {
        function ResData() {
            this.resPath = '';
            this.isLoad = false;
            this.funs = [];
        }
        ResData.prototype.done = function () {
            if (this.funs) {
                // console.log("打印执行回调长度", this.funs, this.funs.length);
                while (this.funs.length > 0) {
                    var fun = this.funs.shift();
                    if (fun)
                        fun(this.img, this.index);
                }
            }
        };
        return ResData;
    }());
})(page || (page = {}));
//# sourceMappingURL=ResMgr.js.map
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
// 程序入口
var SortPage = page.SortPageScoll;
var ResultPage = page.ResultPage;
var singleShowPage = page.singeleShowPage;
var chaoyue = page.chaoyue;
var ResMgr = page.ResMgr;
var GameMain = (function () {
    function GameMain() {
        this._curTime = 0;
        this._clientWidth = 0;
        this._clientHeight = 0;
        this._date = new Date();
    }
    Object.defineProperty(GameMain.prototype, "clientWidth", {
        get: function () {
            return this._clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMain.prototype, "clientHeight", {
        get: function () {
            return this._clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    GameMain.prototype.addListen = function () {
        var _this = this;
        var api = window["externalInterfacePI"];
        if (api) {
            api.setWxSelfInfoFun = function (data, time) {
                if (!data)
                    return;
                _this._curTime = time;
                _this.setWxSelfInfo(data);
            };
            api.setWxOpenidFun = function (data) {
                if (!data)
                    return;
                _this.setWxOpenid(data);
            };
            api.openSortFun = function () {
                _this.openSort();
            };
            api.closePageFun = function (type) {
                _this.closePage(type);
            };
            api.setSortDataFun = function (data, time) {
                if (!data)
                    return;
                _this._curTime = time;
                _this.setSortData(_this.changeDataList(data));
            };
            api.openResultFun = function (type, score, data, time) {
                if (!data)
                    return;
                _this._curTime = time;
                _this.openResult(type, score, _this.changeDataList(data));
            };
            api.updateScoreFun = function (score, data, etype) {
                if (!data)
                    return;
                console.log("上传成绩,开放域", score, data, etype);
                if (data)
                    _this.friendDataList = _this.changeDataList(data);
                console.log("经过替换之后", score, score);
                _this.updateSelfScore(score, etype);
            };
            api.controlPage = function (data) {
                if (data) {
                    if (_this._sortPage) {
                        console.log('data.type', data.ctntrol, data);
                        _this._sortPage.controlPage(data);
                    }
                }
            };
            api.ScollSortPage = function (data) {
                if (data) {
                    if (_this._sortPage) {
                        console.log('ScollSortPage', data.ctntrol);
                        _this._sortPage.updateDela(data.ctntrol);
                    }
                }
            };
            api.openSingleShowFun = function (data, type, time, score) {
                if (!data)
                    return;
                _this._curTime = time;
                console.log("进入LayaSample");
                _this.setSingleShow(_this.changeDataList(data.data), type, score);
            };
            api.openChaoYueFun = function (data, score, time) {
                if (!data)
                    return;
                _this._curTime = time;
                console.log("进入LayaSample");
                _this.setChaoYue(_this.changeDataList(data.data), score);
            };
            api.cleanChaoYueFun = function () {
                _this.setChaoYueClean();
            };
        }
    };
    //设置自己微信信息
    GameMain.prototype.setWxSelfInfo = function (value) {
        console.log("开放域 获取了用户信息", value);
        if (!this.wxSelfInfo) {
            this.wxSelfInfo = new Object();
        }
        // let rawData = value.rawData;
        // if (rawData) {
        //     let obj = {
        //         nickname: rawData.nickName,
        //         avatarUrl: rawData.avatarUrl,
        //     }
        //     this.wxSelfInfo.nickname = obj.nickname;
        //     this.wxSelfInfo.avatarUrl = obj.avatarUrl;
        //     this.wxSelfInfo.score = value.KVDataList['score'];
        //     this.wxSelfInfo.time = value.KVDataList['time'];
        // } else {
        var obj = this.changeDataSingele(value);
        this.wxSelfInfo.nickname = obj.nickname;
        this.wxSelfInfo.avatarUrl = obj.avatarUrl;
        this.wxSelfInfo.score = obj.score;
        this.wxSelfInfo.time = obj.time;
        // }
    };
    GameMain.prototype.setWxOpenid = function (value) {
        if (!this.wxSelfInfo) {
            this.wxSelfInfo = new Object();
        }
        this.wxSelfInfo.openid = value;
    };
    //转换单个数据
    GameMain.prototype.changeDataSingele = function (value) {
        if (!value)
            return null;
        var obj = new Object();
        obj.openid = value.openid ? value.openid : "";
        obj.nickname = value.nickname ? value.nickname : "";
        obj.avatarUrl = value.avatarUrl ? value.avatarUrl : "ui/top/wpk_2.png";
        if (obj.avatarUrl)
            ResMgr.getRes(obj.avatarUrl, null);
        var kvList = value.KVDataList;
        var score = 0;
        var time = 0;
        if (kvList) {
            var len = kvList.length;
            for (var i = 0; i < len; i++) {
                var kv = kvList[i];
                if (!kv)
                    continue;
                if (kv.key == "score" && kv.value) {
                    score = parseInt(kv.value);
                }
                else if (kv.key == "time" && kv.value) {
                    time = parseInt(kv.value);
                }
            }
        }
        obj.score = score;
        obj.time = time;
        return obj;
    };
    /**
     * 根据时间戳获取本周一日期
     * @param value 时间戳毫秒
     * @return 2018419
     */
    GameMain.prototype.getWeekOneDayByTime = function (value) {
        if (!value)
            return 0;
        this._date.setTime(value);
        // //当日时间毫秒
        // let dayTime:number = this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        //获取当前星期几 0-6(星期天-星期六)
        var week = this._date.getDay();
        if (week == 0)
            week = 7;
        var time = value - (week - 1) * 86400000;
        if (time > 0)
            this._date.setTime(time);
        //获取当前年月日
        var year = this._date.getFullYear();
        var mounth = this._date.getMonth();
        var day = this._date.getDate();
        var str = year.toString() + mounth.toString() + day.toString();
        return parseInt(str);
    };
    //转换数据列表
    GameMain.prototype.changeDataList = function (value) {
        var arr = [];
        if (!value)
            return arr;
        var nowWeekOne = this.getWeekOneDayByTime(this._curTime);
        console.log("time", nowWeekOne);
        var len = value.length;
        console.log("len", len);
        for (var i = 0; i < len; i++) {
            var obj = this.changeDataSingele(value[i]);
            //过滤下时间  每周清榜
            if (!obj /*|| obj.time != nowWeekOne*/)
                continue;
            arr.push(obj);
        }
        //排下序
        arr.sort(this.sortByScore);
        return arr;
    };
    GameMain.prototype.sortByScore = function (a, b) {
        return b.score - a.score;
    };
    //打开排行榜
    GameMain.prototype.openSort = function () {
        //console.log("子域openSort")
        if (!this._sortPage) {
            this._sortPage = new SortPage(this);
        }
        if (!this._sortPage.isOpened) {
            this._sortPage.open();
        }
        // else{
        //     this._sortPage.close();
        // }
    };
    //设置排行榜数据
    GameMain.prototype.setSortData = function (data) {
        if (!this._sortPage) {
            this.openSort();
        }
        if (this._sortPage)
            this._sortPage.setData(data);
    };
    //设置单个或者多个头像数据
    GameMain.prototype.setSingleShow = function (data, type, score) {
        console.log("老子要打开页面了", data, type);
        if (!this._singleShowPage) {
            this._singleShowPage = new singleShowPage(this);
        }
        if (this._singleShowPage) {
            this._singleShowPage.setData(data, type, score);
        }
    };
    //设置超越
    GameMain.prototype.setChaoYue = function (data, score) {
        if (!this._chaoyuePage) {
            this._chaoyuePage = new chaoyue(this);
        }
        this._chaoyuePage.setData(data, score);
    };
    GameMain.prototype.setChaoYueClean = function () {
        if (!this._chaoyuePage) {
            this._chaoyuePage = new chaoyue(this);
        }
        this._chaoyuePage.clean();
    };
    //关闭页面
    GameMain.prototype.closePage = function (type) {
        if (type == "sort") {
            if (this._sortPage)
                this._sortPage.close();
        }
        else if (type == "result") {
            if (this._resultPage)
                this._resultPage.close();
        }
        else if (type == "singlePage" || type == "thirdHead") {
            console.log("老子被关闭啦啊啊啊啊啊", type, this._singleShowPage);
            if (this._singleShowPage) {
                this._singleShowPage.close();
                this._singleShowPage = null;
            }
        }
    };
    //打开结算
    GameMain.prototype.openResult = function (type, score, data) {
        console.log("子域openSort" + type + '|' + score);
        //更新自己的得分
        if (this.wxSelfInfo) {
            this.wxSelfInfo.newScore = score;
        }
        if (!this._resultPage) {
            console.log('type,score===' + type + '|' + score);
            this._resultPage = new ResultPage(this);
        }
        if (!this._resultPage.isOpened) {
            console.log('type,score' + type + '|' + score);
            this._resultPage.open();
            this._resultPage.setData(type, score, data);
        }
        else {
            this._resultPage.close();
        }
        //结束了判断下成绩是否上传
        if (this.wxSelfInfo) {
            var nowWeekOne = this.getWeekOneDayByTime(this._curTime);
            //不是本周的了  或 成绩提高了 需要上传
            if (this.wxSelfInfo.time != nowWeekOne || this.wxSelfInfo.score < score) {
                this.wxSelfInfo.score = score;
                this.wxSelfInfo.time = nowWeekOne;
                var api = window["externalInterfacePI"];
                if (api) {
                    api.updateSelfCloundData(score, nowWeekOne);
                }
            }
        }
    };
    //打开
    GameMain.prototype.updateSelfScore = function (score, etype) {
        console.log("子域openSort");
        //更新自己的得分
        if (this.wxSelfInfo) {
            this.wxSelfInfo.newScore = score;
            //结束了判断下成绩是否上传
            if (etype == 1) {
                var nowWeekOne = this.getWeekOneDayByTime(this._curTime);
                //不是本周的了  或 成绩提高了 需要上传
                console.log("+++++++++++++++++++++++++++++++++++++++++++++:" + score);
                if (this.wxSelfInfo.score < score) {
                    console.log("上传乘成绩了" + score);
                    this.wxSelfInfo.score = score;
                    this.wxSelfInfo.time = nowWeekOne;
                    var api = window["externalInterfacePI"];
                    if (api) {
                        api.updateSelfCloundData(score, nowWeekOne);
                    }
                }
            }
        }
    };
    return GameMain;
}());
var game = new GameMain();
game.addListen();
//# sourceMappingURL=LayaSample.js.map