module dou.gui.page {
    export class WuDiPage extends dou.gui.base.Page {
        private _viewUI: ui.WudiUI;
        constructor(v: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._asset = [
                Path.uiAtlas + "play.atlas"
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._view = this._viewUI = new ui.WudiUI();
            this.addChild(this._viewUI);
        }

        protected onOpen(): void {
            super.onOpen();
            this.addListener = true;
        }

        // 页面关闭
        close(): void {
            if (this._viewUI) {
                this.addListener = false;
            }
            super.close();
        }

        protected set addListener(isAdd: boolean) {
            DisplayU.setMouseListener(this._viewUI.btn_video, isAdd, this, this.onClick);
            DisplayU.setMouseListener(this._viewUI.btn_start, isAdd, this, this.onClick);
        }

        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.btn_video:
                    if (isDebug) {
                        this.successShare();
                    } else {
                        WXTool.shareFriend(() => {
                            this.successShare();
                        }, -1);
                    }
                    return;
               case this._viewUI.btn_start:
                    this._app.sceneRoot.reset();
                    this.close();
                    break;
            }
        }

        private successShare(): void {
            this._app.sceneRoot.reset();
            this._app.sceneRoot.mainPlayer.playerScript.addWuDi();
            this.close();
        }
    }
}