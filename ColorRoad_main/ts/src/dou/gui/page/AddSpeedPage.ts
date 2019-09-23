/**
 * 是否领取开局加速礼包
 */
module dou.gui.page {
    export class AddSpeedPage extends dou.gui.base.Page {
        // private _viewUI: ui.JiaSuUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }
        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            // this._view = this._viewUI = new ui.JiaSuUI();
            // this.addChild(this._viewUI);
        }
        close(): void {
            super.close()
        }

        protected onOpen(): void {
            super.onOpen();
            // this._viewUI.btn_yes.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_no.on(LEvent.CLICK, this, this.onClick);
        }


        private onClick(e:LEvent): void {
            this._app.plyertDataMgr.setAddSpeedStatus(1);
            switch (e.currentTarget) {
                // case this._viewUI.btn_yes: // 是
                //     if (isDebug){
                //         this.addSpeed();
                //     }else{
                //         WXTool.jumpHZGetAward(this._app.wxUserInfo.gender, (b:boolean)=>{
                //             if (b)
                //                 this.addSpeed();
                //             else{
                //                 this._app.plyertDataMgr.setAddSpeedStatus(2);
                //                 this.close();
                //             }
                //         });
                //     }
                //     break;
                // case this._viewUI.btn_no:// 否
                //     this.close();
                //     break;
            }
        }

        private addSpeed():void{
            this._app.plyertDataMgr.setAddSpeedStatus(1);
            let page:PageStart = this._app.uiRoot.general.getPage(PageDef.START_PAGE) as PageStart;
            if (page && page.isOpened){
                page.updateStartSign();
            }
            this.close();
        }

        //布局
        public layout(): void {
            super.layout();
            if (this._view && onIPhoneX) {

            }
        }
    }
}