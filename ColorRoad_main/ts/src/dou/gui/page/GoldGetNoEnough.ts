module dou.gui.page {
    export class GoldGetNoEnough extends dou.gui.base.Page {
        // private _viewUI: ui.Tips_2UI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }

        // 页面初始化函数
        protected init(): void {
            // this._viewUI = this._view = new ui.Tips_2UI();
            this.addChild(this._view);
        }

        setData(str: string = "您的金币不够哦，请在游戏内加油获取哦！"): void {
            // this._viewUI.txt_JD.text = str;
        }

        protected onOpen(): void {
            super.onOpen();
            Laya.timer.once(1500, this, this.close)
        }

        public close(): void {
            super.close();
        }
    }
}