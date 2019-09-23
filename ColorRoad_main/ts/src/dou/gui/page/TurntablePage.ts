module dou.gui.page {
	/**
	* 转盘界面
	*/
    export class TurntablePage extends dou.gui.base.Page {
        private _viewUI: ui.ZhuanPanUI;
        private _gridNum: number = 6;
        //当前奖励
        private _index: number = -1;
        private _type: number;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [
                Path.uiAtlas + 'zhuanpan.atlas',
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this._view = new ui.ZhuanPanUI();
            this.addChild(this._view);
        }
        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
            this.drawBlack(0.75, "#000000");
            this._viewUI.btn_back.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_share.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_relife.on(LEvent.CLICK, this, this.onClick);
            MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.vedioOver);
            this.updateBtnStatus();
            Laya.timer.loop(1000, this, this.update);
            this.update();
        }

        /**关闭 */
        public close(): void {
            MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.vedioOver);
            if (this._viewUI) {
                Laya.Tween.clearAll(this._viewUI.img_pan);
            }
            Laya.timer.clearAll(this);
            super.close();
        }

        private updateBtnStatus(): void {
            let cd: number = this._app.plyertDataMgr.getTurntableCD();
            let curTime: number = this._app.sync.serverTimeBys;
            if (curTime > (cd ? cd : 0))
                this._viewUI.btn_relife.disabled = false;
            else
                this._viewUI.btn_relife.disabled = true;
            let zero_time = Sync.getDayZeroTime(curTime * 1000);
            let free_time = this._app.plyertDataMgr.getTurntableTime();
            if (zero_time == free_time)
                this._viewUI.btn_share.disabled = true;
            else
                this._viewUI.btn_share.disabled = false;
            
            this._viewUI.btn_share.visible = !this._viewUI.btn_share.disabled;
            this._viewUI.btn_relife.visible = this._viewUI.btn_share.disabled;
        }

        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.btn_share:
                    if(this._index != -1) return;
                    this._type = 1;
                    this._viewUI.btn_share.disabled = true;
                    this._index = this.getRandomByArray();
                    this.turnTable(this._index);
                    break;
                case this._viewUI.btn_relife:
                    if(this._index != -1) return;
                    // this._viewUI.btn_relife.disabled = true;
                    this._index = this.getRandomByArray();
                    // this._index = 5;
                    // console.log("==========================:" + this._index);
                    this.turnTable(this._index);
                    // this._type = 2;
                    // this._viewUI.btn_relife.disabled = true;
                    // WXTool.getVideo();
                    break;
                case this._viewUI.btn_back:
                    this._app.uiRoot.general.open(PageDef.START_PAGE);
                    this.close();
                    break;
            }
        }

        //数组描述  类型 参数 权重
        private _temp = [1, 200, 4000, 1, 1000, 800, 1, 500, 1600, 1, 2000, 400, 1, 300, 2667, 1, 1500, 533];
        //转盘添加权重计算比
        public getRandomByArray(): number {
            length = this._temp.length / 3;
            let total_rand: number = 0;
            var index: number = 0;
            if (!this._temp) return;
            for (let i: number = 0; i < length; i++) {
                if (!this._temp[i]) continue;
                total_rand += this._temp[3 * i + 2];
            }
            for (let i: number = 0; i < length; i++) {
                let rand: number = Math.random() * (total_rand - 1) + 1;
                if (!this._temp[i]) continue;
                if (this._temp[i] >= rand) {
                    index = i;
                    break;
                }
                total_rand -= this._temp[i];
            }
            return index;
        }

        // 转动转盘
        private turnTable(index: number): void {
            let r1 = -(~~((360 / this._gridNum - 10) * 0.5)); // 随机到格子中的角度
            let r2 = 360 * ~~(10 + Math.random() * 5); // 随机转几圈
            let r3 = -360 / this._gridNum * index - 5 /*- (360 / this._gridNum * 0)*/;// 第几格
            let t1 = 3000 + ~~(Math.random() * 2000); // 随机转多久
            this._viewUI.box_pan.rotation = this._viewUI.box_pan.rotation % 360;
            // r3 = this._viewUI.box_pan.rotation > r3 ? r3 + 360 : r3;
            logd('**********', r1, r2, r3);
            Laya.Tween.to(this._viewUI.box_pan, { rotation: r1 + r2 + r3 }, t1, Laya.Ease.cubicInOut, Handler.create(this, () => { this.showPrize() }));
        }

        // 显示奖励
        private showPrize(): void {
            let type:number = this._temp[3*this._index];
            if (type == 2) { //目前没有这个鬼东西了
                //神秘皮肤
                this._app.plyertDataMgr.setSkinActive(23);
                //获得皮肤
                this._app.uiRoot.general.open(PageDef.PIFUGETTIP, (page: dou.gui.page.PiFuGetPage) => {
                    let tempArr: any = SkinConfig.getInstance().datas;
                    let curTemp: string;
                    for (let temp of tempArr) {
                        if (temp.id == 23)
                            curTemp = temp;
                    }
                    page.dataSource = {isTurntable:true};
                    page.setData(curTemp);
                })
            } else {
                this._app.uiRoot.general.open(PageDef.RESULT_GOLD_REWARD, (page: Page) => {
                    // 金币计算
                    page.dataSource = this._temp[3 * this._index + 1];
                    page["isTurntable"] = true;
                });
            }
            MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.vedioOver);
            this._viewUI.img_pan.rotation = 0;
            this.onComplete();
        }

        // 心跳更新时间
        private update(): void {
            let cur_time = this._app.sync.serverTimeBys;
            let cd: number = this._app.plyertDataMgr.getTurntableCD();
            if ((cd ? cd : 0) < cur_time) {
                this._viewUI.btn_relife.disabled = false;
                this._viewUI.txt_time.text = "";
            } else {
                this._viewUI.btn_relife.disabled = true;
                let str = Math.floor(cd - cur_time) + '';
                this._viewUI.txt_time.text = str + "秒后重置";
            }
        }

        //抽奖完成
        private onComplete(): void {
            let cur_time = this._app.sync.serverTimeBys;
            if (this._type == 1) {
                let zero_time = Sync.getDayZeroTime(cur_time * 1000);
                //免费次数
                this._app.plyertDataMgr.setTurntableTime(zero_time);
            } else {
                //看视频CD 30秒
                this._app.plyertDataMgr.setTurntableCD(cur_time + 30);
            }
            this.close();
        }

        private vedioOver(): void {
            this._index = this.getRandomByArray();
            this.turnTable(this._index);
        }
    }
}