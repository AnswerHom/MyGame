module dou.gui.page {
    export class FuHuoDaoJuPage extends dou.gui.base.Page {
        // private _viewUI: ui.DaoJuUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [Path.uiAtlas + "pifu.atlas"];
        }

        // 页面初始化函数
        protected init(): void {
            // this._viewUI = this._view = new ui.DaoJuUI();
            // this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            this.drawBlack(0.75, "#000000");
            // DisplayU.setMouseListener(this._viewUI.btn_back, true, this, this.onClick);
            // DisplayU.setMouseListener(this._viewUI.btn_share, true, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.shareBack);
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            // switch (e.currentTarget) {
            //     case this._viewUI.btn_back://返回
            //         this.close();
            //         break;
            //     case this._viewUI.btn_share://邀请
            //         WXTool.shareFriend(5);
            //         break;
            // }
        }

        private shareBack(): void {
            if (this._app.sceneRoot.isShareLibao) return;
            //先打开在获得复活币，在关闭当前界面
            this._app.uiRoot.general.open(PageDef.RESULT_RANK);            
            let count = this._app.plyertDataMgr.getRebornCoinCount();
            this._app.plyertDataMgr.setRebornCoinCount(count + 1);
            this._app.sceneRoot.isShareLibao = true;
            this.close();
        }

        public close(): void {
            let page:ResultTop = this._app.uiRoot.general.getPage(PageDef.RESULT_RANK) as ResultTop;
            if(!page) this._app.uiRoot.general.open(PageDef.RESULT_RANK); 
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.shareBack);
            super.close();
        }
    }

}