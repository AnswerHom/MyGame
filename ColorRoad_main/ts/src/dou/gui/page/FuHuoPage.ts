module dou.gui.page {
    export class FuHuoPage extends dou.gui.base.Page {
        //复活币数量
        private _coinCount: number;
        //是否在场景中打开
        private _isOnScene: boolean;
        set isOnScene(v: boolean) {
            this._isOnScene = v;
        }
        //需要复活币的数量
        private _needCount: number;
        private _viewUI: ui.FuHuoBiUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [Path.uiAtlas + "pifu.atlas"];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this._view = new ui.FuHuoBiUI();
            this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            // if (this._isOnScene) {
            //     this._viewUI.btn_fuhuo.visible = true;
            //     this._viewUI.btn_invite.x = 66;
            // } else {
            //     this._viewUI.btn_fuhuo.visible = false;
            //     this._viewUI.btn_invite.x = 217;
            // }
            this.drawBlack(0.75, "#000000");
            DisplayU.setMouseListener(this._viewUI.btn_back, true, this, this.onClick);
            DisplayU.setMouseListener(this._viewUI.btn_fuhuo, true, this, this.onClick);
            DisplayU.setMouseListener(this._viewUI.btn_invite, true, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.clearLibaoCount);
            Laya.timer.loop(1000, this, this.getCoinCount);
            this.getCoinCount();
            this.getReliveCount();
        }

        private clearLibaoCount(): void {
            this._app.plyertDataMgr.setLibaoAddCount(0);
        }

        private getCoinCount(): void {
            if (WXTool.wxOpenid && WXTool.wxOpenid != '') {
                WXTool.getinvite(0);
                WXTool.getinvite(1);
            }
            let player = this._app.plyertDataMgr;
            this._coinCount = player.getRebornCoinCount();
            if (WXTool.inviteCount) {
                //邀请的人数
                let inviteCoin_count = player.getInviteAddCount();
                //加上差值
                player.setRebornCoinCount(this._coinCount + (WXTool.inviteCount - (inviteCoin_count ? inviteCoin_count : 0)));
                player.setInviteAddCount(WXTool.inviteCount);
            }
            if (WXTool.libaoCount) {
                //点击礼包的人数
                let libaoCoin_count = player.getLibaoAddCount();
                //加上差值
                let diff = WXTool.libaoCount - (libaoCoin_count ? libaoCoin_count : 0);
                player.setRebornCoinCount(this._coinCount + diff > 10 ? 10 : diff);
                player.setLibaoAddCount(WXTool.libaoCount);
            }
            this._coinCount = player.getRebornCoinCount();
            // this._viewUI.txt_gold.text = (this._coinCount ? this._coinCount : 0) + '';
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.btn_back://返回
                    if (!this._isOnScene)
                        this._app.uiRoot.general.open(PageDef.START_PAGE);
                    this.close();
                    break;
                case this._viewUI.btn_invite://邀请
                    WXTool.shareFriend(4);
                    break;
                case this._viewUI.btn_fuhuo: //复活
                    if (this._coinCount < this._needCount) {
                        this._app.uiRoot.top.open(PageDef.GOLDNOENOUGH, (page: dou.gui.page.GoldGetNoEnough) => {
                            page.setData("复活币不足！");
                        })
                        return;
                    } else {
                        this._app.plyertDataMgr.setRebornCoinCount(this._coinCount - this._needCount);
                        this.reborn();
                    }
                    break;
            }
        }

        private reborn() {
            this._app.sceneRoot.test()
            this._app.sceneRoot.mainPlayer.playerScript.addWuDi();
     
            let page = this._app.uiRoot.general.getPage(PageDef.RESTART_PAGE);
            if (page && page.isOpened)
                page.close();
            this.close();
        }

        private getReliveCount(): void {
            switch (WXTool.reliveCount) {
                case 2:
                    this._needCount = 1;
                    break;
                case 3:
                    this._needCount = 2;
                    break;
                default:
                    this._needCount = 3;
                    break;
            }
            // this._viewUI.txt_coin.text = this._needCount + '';
        }

        public close(): void {
            Laya.timer.clearAll(this);
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.clearLibaoCount);
            if (this._view) {
            }
            super.close();
        }
    }

}