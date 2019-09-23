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
wx.onMessage(function(data) {
    console.log(data)
    if (data.type && data.type == "wxxx"){
        //通过接收主域的消息来设置开发数据域的画布大小跟矩阵信息
        sharedCanvas.width = data.width;
        sharedCanvas.height = data.height;
        console.log("-----------------sharedresize----------1------------------",sharedCanvas.width,sharedCanvas.height);
       // console.log(data.matrix);
       // console.log("-----------------sharedresize------------2----------------");
        // if (data.matrix){
        //     Laya.stage._canvasTransform = data.matrix;//重新设置矩阵
        //     console.log(Laya.stage._canvasTransform);
        // }
        //版号
        if(data.version && interfacePI.setVersionFun){
            interfacePI.setVersionFun(data.version);
        }
    }else if (data['isLoad'] == "filedata") {
        console.log("zhuyu isLoad");
        // Laya.MiniFileMgr.ziyuFileData[data.url] = data.data;//文本数据
    }
    else if(data.type && data.type == "getselfclouddata"){
        wx.getUserCloudStorage && wx.getUserCloudStorage({
            keyList: ["score","time"],
            success: function (res) {
                console.log("getUserCloudStorage:success", res.KVDataList);
                if(res){
                    console.log("玩家数据", res.KVDataList[0],res.KVDataList[1],data.userinfo);
                    if(data.userinfo){
                        data.userinfo.nickname = data.userinfo.nickName;
                        data.userinfo.KVDataList = res.KVDataList;
                        interfacePI.setWxSelfInfoFun && interfacePI.setWxSelfInfoFun(data.userinfo,data.time);
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
    else if(data.type && data.type == "getOpenid"){
        interfacePI.setWxOpenidFun && interfacePI.setWxOpenidFun(data.openid);
    }
    else if(data.type && data.type == "ctntrolpage"){
        console.log('进入翻页',data.value,data)
        interfacePI.controlPage && interfacePI.controlPage(data.ctntrol)
    }
    else if(data.type && data.type == "ScollSortPage"){
        console.log('进入滚动',data.value,data)
        interfacePI.ScollSortPage && interfacePI.ScollSortPage(data)
    }
    else if(data.type && data.type == "opensort"){
        interfacePI.openSortFun && interfacePI.openSortFun();
        if(data.shareTicket && data.shareTicket != ""){//群排行
            interfacePI.getQunSortData(data.shareTicket,data.time)
        }
        else{
            interfacePI.getFriendData(0,data.time);
        }
    }
    else if(data.type && data.type == "closepage"){
        interfacePI.closePageFun && interfacePI.closePageFun(data.page);
    }
    else if(data.type && data.type == "openresult"){
        interfacePI.getFriendData(1,data.showtype,data.score,data.time);
    }
    else if(data.type && data.type == "updatescore"){
        interfacePI.updateScoreFun(data.score,data,data.etype);
    }
})
//*/

//上传成绩
interfacePI.updateSelfCloundData = function(value,time){
     wx.setUserCloudStorage && wx.setUserCloudStorage({
            KVDataList: [{key:"score",value:value.toString()},{key:"time",value:time.toString()}],
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
interfacePI.getFriendData = function(type,value,value1,value2){
   // console.log("interfacePI:getFriendData");
    wx.getFriendCloudStorage && wx.getFriendCloudStorage({
        keyList: ["score","time"],
        success: function (res) {
            console.log("getFriendCloudStorage:success",res);
            if(res){
                // if(res.data){
                //     for(var i = 0; i < res.data.length;i++){
                //         console.log("朋友玩家数据",i,res.data[i]);
                //     }
                // }
                if(type == 0){
                    interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data,value);
                }
                else if(type == 1){
                    interfacePI.openResultFun && interfacePI.openResultFun(value,value1,res.data,value2);
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

//获取群排行数据
interfacePI.getQunSortData = function(value,time){
   console.log("interfacePI:getQunSortData");
    wx.getGroupCloudStorage && wx.getGroupCloudStorage({
        shareTicket:value,
        keyList: ["score","time"],
        success: function (res) {
            console.log("getQunSortData:success",res);
            if(res){
                if(res.data){
                    for(var i = 0; i < res.data.length;i++){
                        console.log("群玩家数据",i,res.data[i]);
                    }
                }
                interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data,time);
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
interfacePI.Canvas = function(value,time){
   return wx.createCanvas();
}

interfacePI.Image = function(value,time){
   return wx.createImage();
}

interfacePI.getSharedCanvas = function(value,time){
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
            this.PAGE_SIZE = 7;
            this.ITEM_HEIGHT = 100;
            this.PAGE_START_POSX = -2;
            this.PAGE_START_POSY = 0;
            this.PAGE_ITEM_OFFESTY = 9;
            this._needLoadData = false;
            this._curIndex = 0;
            this.isOpened = false;
            this._bgisLoad = false;
            this._scorebgisLoad = false;
            this._showHeight = 0;
            this._min = 0;
            this._max = 0;
            this._oldStartY = 0;
            this._app = app;
            this.init();
        }
        SortPageScoll.prototype.init = function () {
            var api = window["externalInterfacePI"];
            var canvas = api.getSharedCanvas();
            this._showHeight = canvas.height;
            this._ctx = canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = true;
            this._ctx.imageSmoothingQuality = "high";
        };
        SortPageScoll.prototype.open = function () {
            this._curIndex = 0;
            this._oldStartY = 0;
            if (this._needLoadData && this._dataArr) {
                this.updateShow();
                this.updateList(this._curIndex);
            }
            this.isOpened = true;
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
                // if(selftop.openid == rowData.openid){
                // 	selftop.setTop = idx + 1;
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
            var max = this._dataShowArr.length * (this.ITEM_HEIGHT + this.PAGE_ITEM_OFFESTY);
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
            console.log('翻页', type, this._curIndex);
            // console.log("this._dataList.page",this._curIndex)
        };
        SortPageScoll.prototype.updateDela = function (diff) {
            this._oldStartY += diff;
            if (this._oldStartY < this._min)
                this._oldStartY = this._min;
            if (this._oldStartY > this._max)
                this._oldStartY = this._max;
            this.updateList(this._oldStartY);
        };
        SortPageScoll.prototype.updateList = function (page) {
            var _this = this;
            var api = window["externalInterfacePI"];
            if (!this._bg) {
                this._bg = api.Image();
                this._bg.src = 'tongyong/tu_topdi.png';
                this._bg.onload = function () {
                    _this._bgisLoad = true;
                    _this._updateList(page);
                };
            }
            if (this._bgisLoad)
                this._updateList(page);
            // if(!this._scorebg)
            // {
            // 	this._scorebg = api.Image();
            // 	this._scorebg.src = 'ui/top/lb_1.png';
            // 	this._scorebg.onload = () => {
            // 		this._scorebgisLoad = true;
            // 		this._updateList(page);
            // 	}
            // }
            // if(this._scorebgisLoad)
            // 	this._updateList(page);
        };
        SortPageScoll.prototype._updateList = function (startX) {
            var pageStart = Math.floor(startX / this.ITEM_HEIGHT);
            var pagedData = this._dataShowArr.slice(pageStart, pageStart + this.PAGE_SIZE + 1);
            var pageLen = pagedData.length;
            this._ctx.clearRect(0, 0, 1000, 1000);
            // console.log("this.updateList.page", pageLen)
            for (var i = 0; i < pageLen; i++) {
                this.drawRankItem(this._ctx, i, pageStart + i + 1, pagedData[i], startX);
            }
            // this.drawMyRank();
        };
        //canvas原点在左上角
        SortPageScoll.prototype.drawRankItem = function (ctx, index, rank, data, startX) {
            var api = window["externalInterfacePI"];
            var avatarUrl = data.avatarUrl;
            var nick = data.nickname;
            var grade = data.score;
            var itemGapY = ((this.ITEM_HEIGHT + this.PAGE_ITEM_OFFESTY) * (rank - 1)) - startX;
            var posx = this.PAGE_START_POSX;
            var posy = this.PAGE_START_POSY + itemGapY;
            //绘制背景
            ctx.drawImage(this._bg, posx, posy, 606, this.ITEM_HEIGHT);
            ctx.fillStyle = "#946719";
            ctx.textAlign = "center";
            //名次
            if (rank <= 0) {
                page_1.ResMgr.getRes('ui/top/top_' + rank + '.png', function (img) {
                    ctx.drawImage(img, posx + 10, posy + 5, 59, 96);
                });
            }
            else {
                ctx.baseLine = "middle";
                ctx.font = "bold 30px Arial";
                ctx.fillStyle = "#ffffff";
                ctx.fillText("" + rank, posx + 40, posy + 65);
            }
            //头像描边
            ctx.beginPath();
            ctx.moveTo(posx + 80, posy + 5);
            ctx.lineTo(posx + 167, posy + 5);
            ctx.lineTo(posx + 167, posy + 97);
            ctx.lineTo(posx + 80, posy + 97);
            ctx.lineTo(posx + 80, posy + 5);
            ctx.closePath(); //闭合路径 
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'block';
            ctx.lineJoin = "round";
            ctx.stroke();
            // //头像
            page_1.ResMgr.getRes(avatarUrl, function (img) {
                ctx.drawImage(img, posx + 80, posy + 5, 87, 87);
                // this.drawMyRank();
            });
            // //名字
            // ctx.fillStyle = "#946719";
            ctx.fillStyle = "#ffffff";
            ctx.baseLine = "middle";
            ctx.font = "bold 26px Arial";
            ctx.textAlign = "center";
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = 'block';
            // ctx.strokeText(nick, 350, itemGapY + 109);
            ctx.fillText(nick, posx + 270, posy + 60);
            // //分数
            // ctx.drawImage(this._scorebg, posx+380, posy+20, 116, 62);
            ctx.baseLine = "middle";
            ctx.font = "bold 28px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("" + grade, posx + 440, posy + 57);
        };
        SortPageScoll.prototype.drawMyRank = function () {
            this._ctx.clearRect(0, 410, 1000, 1000);
            //名次
            var rank = this._app.wxSelfInfo.setTop;
            this._ctx.fillStyle = "#b44b48";
            this._ctx.baseLine = "middle";
            this._ctx.font = "bold 26px Arial";
            this._ctx.fillText("\u5F53\u524D\u6210\u7EE9", 50, 495);
            //分数
            var score = this._app.wxSelfInfo.score;
            this._ctx.fillStyle = "#360606";
            this._ctx.baseLine = "middle";
            this._ctx.font = "bold 24px Arial";
            this._ctx.fillText("" + score, 150, 495);
        };
        return SortPageScoll;
    }());
    page_1.SortPageScoll = SortPageScoll;
})(page || (page = {}));
//# sourceMappingURL=SortPageScoll.js.map
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
        ResMgr.getRes = function (url, fun) {
            var res;
            for (var i = 0; i < ResMgr._resDatas.length; i++) {
                var data = ResMgr._resDatas[i];
                if (data.resPath == url) {
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
                res.fun = fun;
                res.img.onload = function () {
                    res.isLoad = true;
                    res.done();
                };
            }
            else {
                res.fun = fun;
                if (res.isLoad)
                    res.done();
            }
        };
        ResMgr.clear = function () {
            this._resDatas.length = 0;
        };
        return ResMgr;
    }());
    //注意，当前只支持单回调。。一个url只会对应一个回调。。
    ResMgr._resDatas = [];
    page.ResMgr = ResMgr;
    var ResData = (function () {
        function ResData() {
            this.resPath = '';
            this.isLoad = false;
            this.fun = null;
        }
        ResData.prototype.done = function () {
            if (this.fun)
                this.fun(this.img);
        };
        return ResData;
    }());
})(page || (page = {}));
//# sourceMappingURL=ResMgr.js.map
// 程序入口
var SortPage = page.SortPageScoll;
var ResultPage = page.ResultPage;
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
                _this._curTime = time;
                _this.setWxSelfInfo(data);
            };
            api.setWxOpenidFun = function (data) {
                _this.setWxOpenid(data);
            };
            api.openSortFun = function () {
                _this.openSort();
            };
            api.closePageFun = function (type) {
                _this.closePage(type);
            };
            api.setSortDataFun = function (data, time) {
                _this._curTime = time;
                _this.setSortData(_this.changeDataList(data));
            };
            api.openResultFun = function (type, score, data, time) {
                _this._curTime = time;
                _this.openResult(type, score, _this.changeDataList(data));
            };
            api.updateScoreFun = function (score, data, etype) {
                if (data)
                    _this.friendDataList = _this.changeDataList(data);
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
        }
    };
    //设置自己微信信息
    GameMain.prototype.setWxSelfInfo = function (value) {
        console.log("开放域 获取了用户信息", value);
        if (!this.wxSelfInfo) {
            this.wxSelfInfo = new Object();
        }
        var obj = this.changeDataSingele(value);
        this.wxSelfInfo.nickname = obj.nickname;
        this.wxSelfInfo.avatarUrl = obj.avatarUrl;
        this.wxSelfInfo.score = obj.score;
        this.wxSelfInfo.time = obj.time;
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
        //console.log("子域openSort")
        //更新自己的得分
        if (this.wxSelfInfo) {
            this.wxSelfInfo.newScore = score;
            //结束了判断下成绩是否上传
            if (etype == 1) {
                var nowWeekOne = this.getWeekOneDayByTime(this._curTime);
                //不是本周的了  或 成绩提高了 需要上传
                console.log("+++++++++++++++++++++++++++++++++++++++++++++:" + score);
                if (this.wxSelfInfo.time != nowWeekOne || this.wxSelfInfo.score < score) {
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