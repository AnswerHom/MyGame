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