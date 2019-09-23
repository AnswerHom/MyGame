/**
 * 本局金币结算
 */
module dou.gui.page {
    export class ResultGoldReward extends dou.gui.base.Page {
        //是否转盘打开
        private _isTurntable: boolean = false;
        set isTurntable(v: boolean) {
            this._isTurntable = v;
        }
        get isTurntable(): boolean {
            return this._isTurntable;
        }

        private _viewUI: ui.HuoDeJinBiUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [Path.uiAtlas + 'jiesuan.atlas',];
        }
        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            this._view = this._viewUI = new ui.HuoDeJinBiUI();
            this.addChild(this._viewUI);
        }
        close(): void {
            if(this._isTurntable){
                this._app.uiRoot.general.open(PageDef.TURNTABLEPAGE);
            }
            MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.onVideo);
            //检测是否有可以获得的皮肤
            this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_TOTAL_GAME_TIMES);
            super.close();
        }

        protected onOpen(): void {
            super.onOpen();
            this._viewUI.btn_video.disabled = false;
            this._viewUI.btn_video.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_restart.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_lq.on(LEvent.CLICK, this, this.onClick);
            MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.onVideo);
            this._viewUI.btn_video.visible = true;
            if (this._dataSource)
                this._dataSource = Math.ceil(this._dataSource);
            WXTool.adViewInit(this._viewUI);
            this.initUI();
            WXTool.layouBanner();

            this._viewUI.img_friend.visible = false;
        }

        private initUI(): void {
            this._viewUI.txt_gold.text = this._dataSource;
            this.addGold(this._dataSource);
            if (this._isTurntable) {
                // this._viewUI.txt_title.text = "恭喜获得";
                // this._viewUI.btn_restart.visible = false;
            } else {
                // this._viewUI.txt_title.text = "本局金币结算";
                // this._viewUI.btn_restart.visible = true;
            }
        }

        private addGold(value: number): void {
            let gold: number = this._app.plyertDataMgr.getGold();
            this._app.plyertDataMgr.updateGold(gold + value);
        }

        private _isSuccess: boolean = false;
        private onVideo(): void {
            if (!this._isSuccess) {
                this._isSuccess = true;
                this.addGold(this._dataSource);
                this._viewUI.btn_video.disabled = true;
                this._viewUI.txt_gold.text = this._dataSource * 2 + "";
            }
        }

        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                // case this._viewUI.btn_restart:
                //     this._app.uiRoot.general.open(PageDef.START_PAGE);
                //     this._app.sceneRoot.resetScene();
                //     this._app.sceneRoot.putBackEffectTuoWei();
                //     this.close();
                //     break;
                case this._viewUI.btn_video:
                    if (isDebug)
                        this.onVideo();
                    else
                        WXTool.getVideo();
                    break;
                case this._viewUI.btn_lq:
                    // this._app.uiRoot.general.open(PageDef.START_PAGE);
                    this._app.sceneRoot.resetScene();
                    this._app.sceneRoot.putBackEffectTuoWei();
                    this.close();
                    break;

            }
        }

        //布局
        public layout(): void {
            super.layout();
            if (this._view && onIPhoneX) {

            }
        }
    }
}