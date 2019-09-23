"use strict";
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
            res.resPath = url;
            res.img = api.Image();
            res.img.src = url;
            res.img.onload = function () {
                res.isLoad = true;
            };
        }
        else {
            res.funList.push(fun);
            if (res.isLoad)
                res.done();
        }
    };
    return ResMgr;
}());
ResMgr._resDatas = [];
exports.ResMgr = ResMgr;
var ResData = (function () {
    function ResData() {
        this.resPath = '';
        this.isLoad = false;
        this.funList = [];
    }
    ResData.prototype.done = function () {
        for (var i = 0; i < this.funList.length; i++) {
            this.funList[i]();
        }
        this.funList.length = 0;
    };
    return ResData;
}());
//# sourceMappingURL=ResMgr.js.map