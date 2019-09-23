/**
* 排行榜 
*/
module dou.gui.page {
	import TopUI = ui.TopUI;
	export class SortScrollPage extends dou.gui.base.Page {
		//开放域层级
		private _openZone: Sprite;
		//开放域纹理
		private _openZoneTexture: Texture;
		private _viewUI: ui.TopUI;
		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this._isModal = true;
			this._isClickModalClose = false;
			this._asset = [Path.uiAtlas + "top.atlas"];
		}

		protected init(): void {
			super.init();
			this._viewUI = this._view = new ui.TopUI();
			this.addChild(this._view);
			this._openZone = new Sprite();
		}

		protected onOpen(): void {
			super.onOpen();
			console.log('打开排行榜');
			//打开开放域
			(<ui.TopUI>this._view).btn_back.on("click", this, this.close);
			this._view.mouseLayer.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			this._view.mouseLayer.on(LEvent.MOUSE_UP, this, this.onMouseUp);
			this._view.mouseLayer.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
			this.setData();
			this.showOpenZone();
		}

		private qunPaihang(): void {
			WXTool.shareFriend(1);
		}

		private fenXiang(): void {
			WXTool.shareFriend();
		}

		private _isMouseDown: boolean = false;
		private _old_y: number = 0;
		private onMouseDown(): void {
			this._old_y = this._openZone.mouseY;
			this._isMouseDown = true;
			console.log('mousedown');
		}

		private onMouseUp(): void {
			this._isMouseDown = false;
			console.log('mouseup');
		}

		private onMouseMove(): void {
			if (!this._isMouseDown) return;
			let diff: number = this._old_y - this._openZone.mouseY;
			this._old_y = this._openZone.mouseY;
			let data = {
				type: "ScollSortPage",
				ctntrol: diff
			}
			WXTool.postDataOpen(data);
		}

		//显示开放域
		public showOpenZone(): void {
			if (!this._openZone || this._openZone.parent) return;
			console.log("打开开放域", Laya.Browser.onMiniGame)
			this._viewUI.addChild(this._openZone);
			if (Laya.Browser.onMiniGame) {
				Laya.Browser.window.sharedCanvas.width = this._viewUI.mouseLayer.width + 60;
				Laya.Browser.window.sharedCanvas.height = this._viewUI.mouseLayer.height;
				if (!this._openZoneTexture)
					this._openZoneTexture = new Texture(Laya.Browser.window.sharedCanvas);
				this._openZoneTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
				this._openZone.graphics.drawTexture(this._openZoneTexture, this._viewUI.mouseLayer.x, this._viewUI.mouseLayer.y - 10
					, Laya.Browser.window.sharedCanvas.width, Laya.Browser.window.sharedCanvas.height);
			}
		}

		//关闭开放域
		public closeOpenZone(): void {
			if (!this._openZone) return;
			console.log("关闭开放域")
			if (this._openZoneTexture && this._openZoneTexture.bitmap) {
				this._openZoneTexture.bitmap.alwaysChange = false;
			}
			this._openZone.graphics.clear();
			this._openZone.removeSelf();
		}


		public setData(shareTicket: string = null): void {
			let data = {
				type: "opensort",
				showType: this._app.plyertDataMgr.saveDataShare,
				time: Laya.timer.currTimer
			}
			WXTool.postDataOpen(data);
		}

		public layout(): void {
			super.layout();
		}

		public close(): void {
			if (this.isOpened) {
				//如果结算界面打开 就不关了
				this.closeOpenZone();
				WXTool.closePageOpen("sort");
			}
			let tempPage = this._app.uiRoot.general.getPage(PageDef.RESULT_RANK) as ResultTop;
			if(tempPage && tempPage.isOpened){
				tempPage.openAgain();
			}
			 this._app.uiRoot.general.open(PageDef.START_PAGE);
			super.close();
		}
	}

}