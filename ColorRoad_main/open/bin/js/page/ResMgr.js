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