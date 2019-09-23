module dou.gui.page {
    export class TipsPage extends dou.gui.base.Page {
        // private _viewUI: ui.Tips_1UI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }

        // 页面初始化函数
        protected init(): void {
            // this._viewUI = this._view = new ui.Tips_1UI();
            this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            // DisplayU.setMouseListener(this._viewUI.btn_back, true, this, this.onClick);
            // DisplayU.setMouseListener(this._viewUI.btn_invite, true, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.close);
            MessageManager.on(WXTool.BLACKEVENT, this, this.close);
            this.drawBlack();
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            // switch (e.currentTarget) {
            //     case this._viewUI.btn_back://返回
            //         this.close();
            //         break;
            //     case this._viewUI.btn_invite://邀请
            //         if (isDebug) {
            //             this.successShare();
            //         } else {
            //             WXTool.shareFriend();
            //         }
            //         break;
            // }
        }

        private successShare(): void {
            //单局金币增加50%
            this._app.plyertDataMgr.shareBeiNum = 0.5;
        }

        public close(): void {
            this._app.uiRoot.general.open(PageDef.START_PAGE);
            MessageManager.off(WXTool.BLACKEVENT, this, this.close)
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.close);
            super.close();
        }
    }
}