/**
 * 结算排名
 */
module dou.gui.page {
    export class ResultTop extends dou.gui.base.Page {
        private _rank: ClipUtil;
        private _viewUI: ui.JieSuanUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }
        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            this._view = this._viewUI = new ui.JieSuanUI();
            this.addChild(this._view);
            this._viewUI.txt_score.visible = false;
            this._rank = new ClipUtil(ClipUtil.PET_ZZ_FONT);
            this._rank.scaleX = 1.5
            this._rank.scaleY = 1.5
            this._rank.y = this._viewUI.txt_score.y + (this._viewUI.txt_score.parent as Box).y;
            this.addChild(this._rank);
        }

        close(): void {
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.onShare);
            this.closeOpenZone();
            super.close();
        }

        protected onOpen(): void {
            super.onOpen();
            this.openAgain();
            this._viewUI.btn_share.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_restart.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_toRelife.on(LEvent.CLICK, this, this.onClick);
            // if(WXTool.isShare){
            //     this._viewUI.btn_skip.visible = false;
            //     Laya.timer.once(2000,this,()=>{
            //         this._viewUI.btn_skip.visible = true;
            //     })
            // }
            // this._viewUI.btn_skip.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.txt_allTop.on(LEvent.CLICK, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.onShare);
            WXTool.countAd = 0;
            WXTool.adViewInit(this._viewUI);
            this.initUI();
            // this._viewUI.btn_toRelife.visible = WXTool.isShare;
            WXTool.layouBanner();
        }

        public openAgain() {
			//金币数
			let data = {
				type: "opensingleshow",
				showType: 1,
				score: 0,
				time: this._app.sync.serverTimeByms
			}
			WXTool.postDataOpen(data)
			//打开开放域
			this.openZone();
		}

        private initUI(): void {
            this._rank.setText(this._app.sceneRoot.PlayScore.toFixed(0));
            // this._viewUI.btn_toSkin.visible = WXTool.isShare;
            this._rank.centerX = 0;
            this._viewUI.box_isNew.visible = this._app.sceneRoot.PlayScore >= this._app.plyertDataMgr.getMaxScore();

            // if (WXTool.isShare) {
            //     this._viewUI.btn_skip.y = WXTool.onIpx ? this._viewUI.btn_invite.y + this._viewUI.btn_invite.height + 140 : this._viewUI.btn_invite.y + this._viewUI.btn_invite.height + 100;
            // }
        }

        private onShare():void{
            console.log("结算界面金币倍数增加",this._app.plyertDataMgr.shareBeiNum);
            this._app.uiRoot.general.open(PageDef.RESULT_GOLD_REWARD, (page: Page) => {
                // 金币计算
                let gold: number = ~~(this._app.sceneRoot.PlayScore / PlayerDataMgr.SCORE_TO_GOLD_RATE);
                gold = !gold ? 0 : (gold > PlayerDataMgr.SCORE_TO_GOLD_MAX ? PlayerDataMgr.SCORE_TO_GOLD_MAX : gold);
                page.dataSource = gold * (this._app.plyertDataMgr.shareBeiNum + 1);
                this._app.plyertDataMgr.shareBeiNum = 0;
            });
            this.close();
        }

        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                // case this._viewUI.btn_skip:
                case this._viewUI.btn_restart:
                    // this._app.uiRoot.general.open(PageDef.RESULT_GOLD_REWARD, (page: Page) => {
                    //     // 金币计算
                    //     let gold: number = ~~(this._app.sceneRoot.PlayScore / PlayerDataMgr.SCORE_TO_GOLD_RATE);
                    //     gold = !gold ? 0 : (gold > PlayerDataMgr.SCORE_TO_GOLD_MAX ? PlayerDataMgr.SCORE_TO_GOLD_MAX : gold);
                    //     page.dataSource = gold * (this._app.plyertDataMgr.shareBeiNum + 1);
                    //     this._app.plyertDataMgr.shareBeiNum = 0;
                    // });
                    this._app.uiRoot.general.open(PageDef.START_PAGE);
                    this.close();
                    break;
                case this._viewUI.btn_share:
                    WXTool.shareFriend();
                    break;
                // case this._viewUI.btn_toSkin:
                //     //绝版皮肤
                //     this._app.uiRoot.general.open(PageDef.RESULT_SUPER_SKIN);
                //     this.close();
                //     break;
                // case this._viewUI.btn_toRelife:
                //     // 打开复活币界面
                //     this._app.uiRoot.general.open(PageDef.FUHUO_DAOJU_PAGE);
                //     this.close();
                //     break;
                case this._viewUI.txt_allTop:
                    this._app.uiRoot.general.open(PageDef.TOP_PAGE);
                    this.close();
                    break;
            }
        }

        //开放域层级
        private _openZone: Laya.Sprite;
        //开放域纹理
        private _openZoneTexture: Laya.Texture;
        private openZone(vx: number = 0, vy: number = 0, scaleX: number = 1, scaleY: number = 1) {
            if (!this._openZone) {
                //开放域
                this._openZone = new Laya.Sprite();
            }
            let mouseLayer = this._viewUI.mouseLayer;
            this._openZone.size(mouseLayer.width, mouseLayer.height);
            if (this._openZone.parent) return;
            console.log("打开开放域", Laya.Browser.onMiniGame)
            mouseLayer.addChild(this._openZone);
            this._openZone.x = vx;
            this._openZone.y = vy;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.sharedCanvas.width = mouseLayer.width;
                Laya.Browser.window.sharedCanvas.height = mouseLayer.height;
                if (!this._openZoneTexture)
                    this._openZoneTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                this._openZoneTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
                console.log("开放域大小", this._openZoneTexture.width, this._openZoneTexture.height, Laya.Browser.window.sharedCanvas.width, Laya.Browser.window.sharedCanvas.height);
                this._openZone.graphics.drawTexture(this._openZoneTexture, 0, 0, this._openZoneTexture.width, this._openZoneTexture.height, new Laya.Matrix(scaleX, 0, 0, scaleY));
            }
        }

        //关闭开放域
        private closeOpenZone(): void {
            console.log("this._openZone" + this._openZone);
            if (!this._openZone) return;
            console.log("关闭开放域")
            if (this._openZoneTexture && this._openZoneTexture.bitmap) {
                this._openZoneTexture.bitmap.alwaysChange = false;
                this._openZoneTexture = null;
            }
            this._openZone.graphics.clear();
            this._openZone.removeSelf();
            WXTool.closePageOpen("thirdHead");
        }


        //布局
        public layout(): void {
            super.layout();
            if (this._view && onIPhoneX) {

            }
        }
    }
}