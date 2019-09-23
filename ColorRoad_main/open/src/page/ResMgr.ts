module page {
    export class ResMgr {

        //支持多回调
        private static _resDatas: Array<ResData> = [];

        constructor() {

        }
        public static resDatas() {
            return ResMgr._resDatas;
        }
        public static getRes(url: string, fun: any, index: number = -1): void {
            // if(!url) return;
            let res: ResData;
            for (let i = 0; i < ResMgr._resDatas.length; i++) {
                let data: ResData = ResMgr._resDatas[i];
                if (data.resPath == url) {
                    data.index = index;
                    res = data;
                    break;
                }
            }
            if (!res) {
                let api: any = window["externalInterfacePI"];
                res = new ResData();
                ResMgr._resDatas.push(res);
                res.resPath = url;
                res.img = api.Image();
                res.img.src = url;      
                if (fun)
                    res.funs.push(fun);
                res.index = index;
                res.img.onload = () => {
                    res.isLoad = true;
                    res.done();
                }
            }
            else {
                //遍历是否有这个回调
                let flag = false;
                for (let i = 0; i < res.funs.length; i++) {
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
        }

        public static clear(): void {
            this._resDatas.length = 0;
        }
    }

    class ResData {
        public resPath: string = '';
        public img: any;
        public isLoad: boolean = false;
        public funs: any[] = [];
        public index: number;
        constructor() {

        }

        public done(): void {
            if (this.funs) {
                // console.log("打印执行回调长度", this.funs, this.funs.length);
                while (this.funs.length > 0) {
                    let fun = this.funs.shift();
                    if (fun)
                        fun(this.img, this.index);
                }
            }
        }
    }
}