/**
 * 结算--绝版皮肤
 */
module dou.gui.page {
    export class ResultSkin extends dou.gui.base.Page {
        // private _viewUI: ui.PiFu1UI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }
        // 页面初始化函数
        protected init(): void {
            // //初始化进度条
            // this._view = this._viewUI = new ui.PiFu1UI();
            // this.addChild(this._viewUI);
        }
        close(): void {
            MessageManager.off(WXTool.BLACKEVENT, this, this.close);
            if (!this._dataSource)
                this._app.uiRoot.general.open(PageDef.RESULT_RANK);
            super.close();
        }

        protected onOpen(): void {
            super.onOpen();
            MessageManager.on(WXTool.BLACKEVENT, this, this.close);
            // this._viewUI.btn_back.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_invite.on(LEvent.CLICK, this, this.onClick);
            this.initUI();
        }

        private initUI(): void {
            WXTool.getShareCount(()=>{
                // 还要几个
                let left = PlayerDataMgr.SUPER_SKIN_COUNT - WXTool.sharecount;
                // this._viewUI.txt_count.text = (left < 0 ? 0 : left) + "";
                if (this._app.plyertDataMgr.getSkinActive(22) != '1' && WXTool.sharecount >= PlayerDataMgr.SUPER_SKIN_COUNT)
                    this._app.plyertDataMgr.setSkinActive(22);
                // 几个头像
                if (!WXTool.sharePlayers) 
                    return;
                // for (let i = 0; i < PlayerDataMgr.SUPER_SKIN_COUNT; i++) {
                //     let player = WXTool.sharePlayers[i];
                //     let img_a:LImage = this._viewUI['img_head' + i];
                //     let txt_n:Label = this._viewUI['txt_name' + i];
                //     if (!player){
                //         img_a.skin = 'tongyong/wpk_1.png';
                //         txt_n.text = '虚位以待';
                //         continue;
                //     }
                //     img_a.skin = player.headurl;
                //     txt_n.text = player.name;
                // }
            })
        }

        private onClick(e: LEvent): void {
            // switch (e.currentTarget) {
            //     case this._viewUI.btn_back:
			// 		this.close();
            //         break;
            //     case this._viewUI.btn_invite:
            //         WXTool.shareFriend(3);
            //         break;
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