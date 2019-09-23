module dou.gui.page {
    export class PiFuGetPage extends dou.gui.base.Page {
        private _viewUI: ui.HuoDePiFuUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [Path.uiAtlas + 'pifu.atlas',
                Path.uiAtlas + 'huodepifu.atlas'
                ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this._view = new ui.HuoDePiFuUI();
            this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            DisplayU.setMouseListener(this._viewUI.btn_cancel, true, this, this.onClick);
            DisplayU.setMouseListener(this._viewUI.btn_sure, true, this, this.onClick);
            DisplayU.setMouseListener(this._viewUI, true, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.close);
            MessageManager.on(WXTool.BLACKEVENT, this, this.close);
        }

        setData(curData:any):void{
            this._viewUI.img_icon.skin = 'scene/pifu/icon/' + curData.avatar + (curData.type == 2 ? '.jpg' : '.png');
            this._viewUI.txt_desc.visible = false;
            this._viewUI.txt_name.text = curData.name;
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.btn_cancel://返回
                    if(this.dataSource && this.dataSource.isTurntable)
                        this._app.uiRoot.general.open(PageDef.TURNTABLEPAGE);
                    this.close();
                    break;
                case this._viewUI.btn_sure://邀请
                    // WXTool.shareFriend();
                    if(this.dataSource && this.dataSource.isTurntable)
                        this._app.uiRoot.general.open(PageDef.TURNTABLEPAGE);
                    this.close();
                    break;
                // case this._viewUI:
                //     this.close();
                // break
            }
        }

        public close(): void {
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.close);
            MessageManager.off(WXTool.BLACKEVENT, this, this.close);
            super.close();
        }
    }
}