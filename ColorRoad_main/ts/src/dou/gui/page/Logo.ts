module dou.gui.page {
	export class Logo extends dou.gui.base.Page {
        private _viewUI:ui.logoUI;
        private _endTime:number;
        private _contentSx:number = 0;

		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [Path.uiAtlas + "jiesuan.atlas"];
        }
        // 页面初始化函数
		protected init(): void {
			//初始化进度条
			this._view = this._viewUI = new ui.logoUI();
			this.addChild(this._viewUI);
            this._contentSx = (<ui.logoUI>this._view).box_tip.y;
		}
        close():void{
            Laya.timer.clearAll(this);
            this._app.uiRoot.general.open(PageDef.START_PAGE);
            super.close()
        }



		protected onOpen(): void {
			super.onOpen();
            this.drawBlack(1,"#ffffff");
            Laya.timer.once(2000,this,this.close)
            
        }

        //布局
		public layout():void
		{
			super.layout();
			if (this._view && onIPhoneX) {
				(<ui.logoUI>this._view).box_tip.y = this._contentSx + this._app.uiRoot.y + 100; 
			}
		}
    }
}