module dou.gui.page {
    export class PageGameInfo extends Laya.Box {
        private _viewUI: ui.CaiNiXiHuanUI;
        private _app;
        // 贴图加载器
        protected _assetsLoader: AssetsLoader = new AssetsLoader();
        constructor(app: GameApp, parent) {
            super();
            this._app = app;
            this._assetsLoader.load([Path.uiAtlas + "tongyong.atlas"], Handler.create(this, this.onLoaded));
        }
        get view() {
            return this._viewUI;
        }

        public _isBool: boolean;
        private onLoaded(): void {
            this.init();
        }
        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            this._viewUI = new ui.CaiNiXiHuanUI();
            this.addChild(this._viewUI);
            // this._viewUI.zOrder = 99;
            this.onOpen();
        }

        close(): void {
            if (this._viewUI) {

            }
        }
        protected clear(): void {
            if (this._viewUI) {

            }
        }

        private _datas;
        protected onOpen(): void {
            this._datas = WXTool.gameInfo;
            this.updateView();
            // this._viewUI.img_shou.on(LEvent.CLICK, this, this.onClickHandler);
        }

        //更新界面
        private updateView(): void {
            this.initList();
            // this._viewUI.list_info.array = [{ "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/icon/tanchishewangzhe.jpg", "name": "铔囪泧鐜嬭€�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=tcswz&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/longjuanfengluandouicon002.jpg", "name": "榫欏嵎椋庝贡鏂�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=ljfld&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/xiariliangliangicon006.png", "name": "澶忔棩瑕佸噳鍑�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=xryll&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/icon_fangkuaiwan.png", "name": "鏇村娓告垙", "share": "https://cdn.phonecoolgame.com/wxgame/hezi/back/fangkuaiwan_quanping.jpg", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/sheishisanfenwangicon001.png", "name": "璋佹槸涓夊垎鐜�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=sssfw&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/xiaoniaoliuliuliuicon@002.png", "name": "楦熷緱璁╁畠椋�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=xnlll&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/kuailezumaicon001.png", "name": "蹇箰绁栫帥", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=klzm&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/lianaimiaomiaozaiyiqi003.jpg", "name": "鎭嬬埍鍠靛柕", "share": "https://cdn.phonecoolgame.com/wxgame/hezi/back/lianaimiaomiao_tuiguang.jpg", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=lammzyq&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/cbcq001.png", "name": "瓒呭彉浼犲", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=jzbrm&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/yiqidazhuoqiuicon001.png", "name": "涓€璧锋墦妗岀悆", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=yqdzq&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/qqdld.png", "name": "鍦堝湀澶т贡鏂�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=qqdld&from=12780073" }, { "icon": "https://cdn.phonecoolgame.com/wxgame/hezi/back/mmxljticon001.png", "name": "鍏斿瓙璺虫ゼ鏈�", "share": "", "jmpid": "wx845a2f34af2f4235", "parm": "pages/main/main?navigateto=mmxl&from=12780073" }]//;
            this._viewUI.list_info.array = this._datas;
        }

        private initList(): void {
            let list = this._viewUI.list_info;
            list.vScrollBarSkin = "";
            list.itemRender = skinRender;
            console.log("打印数据", this._datas);
        }

        private onClickHandler(e: LEvent): void {
            // let img_shou = this._viewUI.img_shou;
            if (!this._isBool) {

                //出
                Laya.Tween.to(this, { x: 0 }, 300, null, Handler.create(this, this.complete, [true]));

            } else if (this._isBool) {
                //缩
                Laya.Tween.to(this, { x: -483 }, 300, null, Handler.create(this, this.complete, [false]));
            }
        }

        public suoView() {
            if (this._isBool)
                Laya.Tween.to(this, { x: -483 }, 300, null, Handler.create(this, this.complete, [false]));
        }

        private complete(isChu: boolean): void {
            this._isBool = isChu;
            this.mouseThrough = isChu ? false : true;
            Laya.Tween.clearAll(this);
            // let imgClick = this._viewUI.img_shou;
            // imgClick.skin = isChu ? "tongyong/jiantou2.png" : "tongyong/jiantou.png";
        }
    }
    class skinRender extends ui.component.CaiNiXiHuan_TUI {
        private _data;
        set dataSource(data: any) {
            if (!data) return;
            this._data = data
            this.txt_name.text = data.name;
            this.img_grid.skin = data.icon;
            this.on(LEvent.CLICK, this, this.onBtnCLick);
        }

        private onBtnCLick(): void {
            console.log("点击", this._data)
            WXTool.nav("", this._data);
        }

        constructor() {
            super();
        }
    }
}