module dou.gui.page {
    export class XingYunPage extends dou.gui.base.Page {
        // private _viewUI: ui.XingYunUI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [];
        }

        // 页面初始化函数
        protected init(): void {
            // this._viewUI = this._view = new ui.XingYunUI();
            // this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            this.drawBlack(0.75, "#000000");
            // DisplayU.setMouseListener(this._viewUI.btn_close, true, this, this.onClick);
            // DisplayU.setMouseListener(this._viewUI.btn_no, true, this, this.onClick);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.successShare);
            this.initData();
            this.initUI();
        }

        private initData(): void {
            //设置随机皮肤
            // let datas = SkinConfig.getInstance().datas;
            let datas = SkinPage.getDataByType(SkinPage.TYPE_BALL + 1);
            let allNoHaveData = [];
            for (let i = 0; i < datas.length; i++) {
                if (!this._app.plyertDataMgr.isBuySkinFlag(datas[i].id)) {
                    //未购买的
                    allNoHaveData.push(datas[i]);
                }
            }
            let random = MathU.randomRange(0, allNoHaveData.length - 1);
            this._curBallData = allNoHaveData[random];
        }

        private initUI(): void {
            // this._viewUI.img_skin.skin = 'scene/pifu/icon/' + this._curBallData.avatar + (this._curBallData.type == 2 ? '.jpg' : '.png');
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            // switch (e.currentTarget) {
            //     case this._viewUI.btn_close://返回
            //         this._app.uiRoot.general.open(PageDef.PIPEI_PAGE);
            //         this.close();
            //         break;
            //     case this._viewUI.btn_no://
            //         if (isDebug) {
            //             this.successShare();
            //         } else {
            //             WXTool.shareFriend();
            //         }
            //         break;
            // }
        }

        private _curBallData: any;
        private successShare(): void {
            //分享成功后
            //让她使用当前的皮肤
            this._app.plyertDataMgr.setIsUseLuckySkin(1);
            if (this._curBallData)
                this._app.plyertDataMgr.setUseLuckSkin(this._curBallData.id);
            this._app.plyertDataMgr.setAddSpeedStatus(1);
            this._app.uiRoot.general.open(PageDef.PIPEI_PAGE);
            this.close();
        }

        public close(): void {
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.successShare);
            super.close();
        }
    }

}