module dou.gui.page {
    export class GetRewardPage extends dou.gui.base.Page {
        // private _viewUI: ui.meiri1UI;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._asset = [];
        }

        // 页面初始化函数
        protected init(): void {
            // this._viewUI = this._view = new ui.meiri1UI();
            // this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            // this._viewUI.btn_video.on(LEvent.CLICK, this, this.onBtnVideo);
            // this._viewUI.btn_restart.on(LEvent.CLICK, this, this.onBtnLQ);
            // this._viewUI.btn_lq.on(LEvent.CLICK, this, this.onBtnLQ);
            MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.onVideo);
        }

        private onVideo(): void {
            //翻倍
            if (this._curGoldNum) {
                this._curGoldNum += this._curGoldNum;
                // this._viewUI.txt_gold.text = this._curGoldNum.toString();
            }
            if (this._curFuHuoB) {
                this._curFuHuoB += this._curFuHuoB;
                // this._viewUI.txt_fuhuo.text = this._curFuHuoB.toString();
            }
            // this._viewUI.btn_video.visible = false;
            // this._viewUI.btn_lq.visible = true;
            // this._viewUI.btn_video.disabled = true;
            // this._viewUI.btn_restart.visible = false;
        }

        //观看视频
        private onBtnVideo(): void {
            if (isDebug)
                this.onVideo();
            else
                WXTool.getVideo();
        }

        //领取奖励
        private onBtnLQ(): void {
            if (this._curGoldNum) {
                let num = this._app.plyertDataMgr.getGold();
                num += this._curGoldNum;
                this._app.plyertDataMgr.updateGold(num);
            }
            if (this._curFuHuoB) {
                let fhNum = this._app.plyertDataMgr.getRebornCoinCount();
                fhNum += this._curFuHuoB;
                this._app.plyertDataMgr.setRebornCoinCount(fhNum);
            }
            this.close();
        }

        private _curGoldNum: number;
        private _curFuHuoB: number;
        setData(goldNum: number, fuhuoB: number): void {
            this._curFuHuoB = fuhuoB;
            this._curGoldNum = goldNum;
            // if (goldNum) {
            //     this._viewUI.box_gold.visible = true;
            //     this._viewUI.txt_gold.text = goldNum.toString();
            // } else {
            //     this._viewUI.box_gold.visible = false;
            // }
            // if (fuhuoB) {
            //     this._viewUI.box_fh.visible = true;
            //     this._viewUI.txt_fuhuo.text = fuhuoB.toString();
            // } else {
            //     this._viewUI.box_fh.visible = false;
            // }
            // if (goldNum && fuhuoB) {
            //     this._viewUI.box_fh.x = 0;
            //     this._viewUI.box_gold.x = 0;
            // } else {
            //     this._viewUI.box_fh.centerX = 0;
            //     this._viewUI.box_gold.centerX = 0;
            // }
        }

        public close(): void {
            MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.onVideo);
            super.close();
        }
    }
}