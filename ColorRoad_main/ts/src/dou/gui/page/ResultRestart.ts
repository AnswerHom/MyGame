/**
 * 复活界面
 */
module dou.gui.page {
	export class ResultRestart extends dou.gui.base.Page {
		private _rank: ClipUtil;
		private _viewUI: ui.FuHuoUI;
		private _isShowGoToRelife: boolean;
		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			// this._isModal = true;
			this._asset = [Path.uiAtlas + "jiesuan.atlas"];
		}
		private _time: number = 30;
		// 页面初始化函数
		protected init(): void {
			this._viewUI = this._view = new ui.FuHuoUI();
			this.addChild(this._view);
			this._viewUI.txt_score.visible = false;
			this._rank = new ClipUtil(ClipUtil.PET_ZZ_FONT);
			this._rank.scaleX = 1.5
			this._rank.scaleY = 1.5
			this._rank.y = this._viewUI.txt_score.y + (this._viewUI.txt_score.parent as Box).y;
			this.addChild(this._rank);
		}
		protected onOpen(): void {
			super.onOpen();
			// this._viewUI.btn_relife.disabled = false;
			if (!WXTool.wxPlayInfo && !WXTool.userInfoButton)
				WXTool.createWxUseInfoBtn();
			let data = {
				type: "opensingleshow",
				showType: 0,
				score: this._score,
				time: this._app.sync.serverTimeByms
			}
			WXTool.postDataOpen(data)
			//打开开放域
			this.openZone();
			this.drawBlack(0.75, "#000000")
			if (WXTool.isShare) {
				this._viewUI.btn_skip.visible = false;
				Laya.timer.once(2000, this, () => {
					this._viewUI.btn_skip.visible = true;
				})
			}

			DisplayU.setMouseListener(this._viewUI.btn_skip, true, this, this.onClick);
			DisplayU.setMouseListener(this._viewUI.btn_relife, true, this, this.onClick);
			DisplayU.setMouseListener(this._viewUI.btn_share, true, this, this.onClick);
			DisplayU.setMouseListener(this._viewUI.btn_relife_use, true, this, this.onClick);
			// DisplayU.setMouseListener(this._viewUI.btn_goToRelife, true, this, this.onClick);

			this.updateInfo();

			MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.videoAgain);
			MessageManager.on(WXTool.SHARED_SUCCESS, this, this.videoAgain);
			MessageManager.on(WXTool.GAME_REVIED, this, this.onGameRevied);
			this.checkFuhuoState();

			this._rank.setText(this._app.sceneRoot.PlayScore.toFixed(0));
			this._rank.centerX = 0;
			WXTool.countAd = 0;
			WXTool.adViewInit(this._viewUI);
			console.log("分享次数", WXTool.isShare, WXTool.reliveCount)

			if (WXTool.isShare) {
				this._viewUI.btn_skip.y = WXTool.onIpx ? this._viewUI.btn_relife.y + this._viewUI.btn_relife.height + 110 : this._viewUI.btn_relife.y + this._viewUI.btn_relife.height + 65;
				// 是否显示试玩复活
				this._isShowGoToRelife = this.dataSource.isShowGoToRelife;	
				this._viewUI.btn_goToRelife.visible = this._isShowGoToRelife;
				this._viewUI.btn_relife.visible = !this._isShowGoToRelife;
			} else {
				this._viewUI.btn_goToRelife.visible = false;
				this._viewUI.btn_relife.visible = false;
			}
			WXTool.layouBanner();
		}

		//确认复活状态
		private checkFuhuoState(): void {
			console.log("开启分享界面", WXTool.isShare, WXTool._state, WXTool.reliveCount);
			if (WXTool._state == SceneRoot.STATUS_OVER && WXTool.reliveCount >= 1) {
				if (WXTool.reliveCount >= 2) {
					// 复活币复活
					// this._viewUI.btn_relife.skin = 'tongyong/icon_09.png';
					this._viewUI.btn_share.visible = false;
					this._viewUI.btn_relife.visible = false;
					this._viewUI.btn_relife_use.visible = true;
					MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.videoAgain);
					MessageManager.off(WXTool.SHARED_SUCCESS, this, this.videoAgain);
				} else
					//看视频
					// this._viewUI.btn_relife.skin = 'tongyong/icon_02.png';
					this._viewUI.btn_share.visible = false;
				this._viewUI.btn_relife.visible = true;
				this._viewUI.btn_relife_use.visible = false;
			} else {
				if (WXTool.isShare) {
					// 分享复活
					// this._viewUI.btn_relife.skin = 'tongyong/icon_03.png';
					this._viewUI.btn_share.visible = true;
					this._viewUI.btn_relife.visible = false;
					this._viewUI.btn_relife_use.visible = false;
				} else {
					//看视频
					// this._viewUI.btn_relife.skin = 'tongyong/icon_02.png';
					this._viewUI.btn_share.visible = false;
					this._viewUI.btn_relife.visible = true;
					this._viewUI.btn_relife_use.visible = false;
				}

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
			WXTool.closePageOpen("singlePage");
		}


		public close(): void {
			this._app.uiRoot.general.close(PageDef.YOUXI_PAGE);
			this.closeOpenZone();
			MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.videoAgain);
			MessageManager.off(WXTool.SHARED_SUCCESS, this, this.videoAgain);
			MessageManager.off(WXTool.GAME_REVIED, this, this.onGameRevied);
			if (this._viewUI) {
				DisplayU.setMouseListener(this._viewUI.btn_skip, false, this, this.onClick);
				DisplayU.setMouseListener(this._viewUI.btn_relife, false, this, this.onClick);
				DisplayU.setMouseListener(this._viewUI.btn_share, false, this, this.onClick);
				DisplayU.setMouseListener(this._viewUI.btn_relife_use, false, this, this.onClick);
				super.close();
			}
		}

		private onGameRevied(res) {
			this._app.plyertDataMgr.setGameReviedRelifeTime();
			this.videoAgain();
		}

		private videoAgain() {
			this._app.sceneRoot.test();
			this._app.sceneRoot.mainPlayer.playerScript.addWuDi();
			this.close();
		}

		private _score: number;
		getScore(score): void {
			this._score = this._app.sceneRoot.PlayScore;
			if (!this._score) this._score = 0;
			this._viewUI.txt_score.text = this._score.toString();
		}

		private updateInfo(): void {
			WXTool.score = parseInt(this._app.sceneRoot.PlayScore.toFixed(0));
			this._app.plyertDataMgr.updateScore(WXTool.score);
			// this._viewUI.txt_die.text = die.toFixed(0) + "人";
		}

		//鼠标点击事件
		private onClick(e: LEvent): void {
			// TweenBtnEff.BtnTween(e.currentTarget);
			switch (e.currentTarget) {
				case this._viewUI.btn_skip://跳过
					// WXTool.isShare = true;
					// if (WXTool.isShare) {
					// 	let page = this._app.uiRoot.general.getPage(PageDef.FUHUO_PAGE);
					// 	if (page && page.isOpened)
					// 		page.close();
					// 	if (!this._isShowGoToRelife)
							this._app.uiRoot.general.open(PageDef.RESULT_RANK);
						this.close();
					// } else {
						// this._app.uiRoot.general.open(PageDef.START_PAGE);
						// this.close();
					// }

					break;
				// case this._viewUI.btn_goToRelife://玩其他游戏复活
				// 	if (isDebug)
				// 		this.onGameRevied(null);
				// 	else
				// 		WXTool.goTrialRevied(this._app.wxUserInfo.gender, (res)=>{
				// 			// this._app.plyertDataMgr.setGameReviedRelifeTime();
				// 			// this.close();
				// 		}, (res)=>{
				// 			this._app.plyertDataMgr.setGameReviedRelifeTime();
				// 			this.close();
				// 		});
				// 	break;
				case this._viewUI.btn_relife:
					//原地复活
					// 看视频复活
					this._viewUI.btn_relife.disabled = true;
					if (isDebug) {
						this.videoAgain();
					} else {
						WXTool.getVideo();
					}

					break;
				case this._viewUI.btn_relife_use:
					// 复活币复活
					this._app.uiRoot.general.open(PageDef.FUHUO_PAGE, (page: dou.gui.page.FuHuoPage) => {
						page.isOnScene = true;
					})
					break;
				case this._viewUI.btn_share:
					// 分享复活
					if (isDebug) {
						this.videoAgain();
					} else {
						WXTool.shareFriend();
					}
					break;
			}

		}
	}
}