module dou.gui.page {
    export class settingPage extends dou.gui.base.Page {
        // private _viewUI: ui.SheZhiUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }
        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            // this._view = this._viewUI = new ui.SheZhiUI();
            // this.addChild(this._viewUI);
        }
        close(): void {
            this._app.uiRoot.general.open(PageDef.START_PAGE);
            super.close()
        }

        protected onOpen(): void {
            super.onOpen();
            this.initUI();
        }

        private initUI(): void {
            // for (let i = 0; i < 3; i++) {
            //     this._viewUI['btn_check' + (i + 1)].on(LEvent.CLICK, this, this.onClick, [i + 1]);
            // }
            // this._viewUI.btn_check1.selected = PlayerDataMgr.isPlayBgMusic;
            // this._viewUI.btn_check2.selected = PlayerDataMgr.isPlayActionMusic;
            // this._viewUI.btn_check3.selected = PlayerDataMgr.isZhenDong;
            // this._viewUI.btn_close.on(LEvent.CLICK, this, this.close);
        }

        private onClick(index: number, e: LEvent): void {
            // switch (e.currentTarget) {
            //     case this._viewUI.btn_check1:
            //         this._viewUI.btn_check1.selected = this._viewUI.btn_check1.selected;
            //         PlayerDataMgr.isPlayBgMusic = this._viewUI.btn_check1.selected;
            //         break
            //     case this._viewUI.btn_check2:
            //         this._viewUI.btn_check2.selected = this._viewUI.btn_check2.selected;
            //         PlayerDataMgr.isPlayActionMusic = this._viewUI.btn_check2.selected;
            //         break
            //     case this._viewUI.btn_check3:
            //         this._viewUI.btn_check3.selected = this._viewUI.btn_check3.selected;
            //         PlayerDataMgr.isZhenDong = this._viewUI.btn_check3.selected;
            //         break
            // }
        }

        //布局
        public layout(): void {
            super.layout();
            if (this._view && onIPhoneX) {

            }
        }
    }
}