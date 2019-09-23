/**
* 获得金币以及皮肤界面
*/
module dou.gui.page {
    export class GetTipsPage extends dou.gui.base.Page {
        private _viewUI: ui.HuoDeJinBiUI;
        //金币
        public static TYPE_GOLD: number = 1;
        //皮肤
        public static TYPE_SKIN: number = 2;
        //复活币
        public static TYPE_FUHBI: number = 3;
        private _isReward:boolean = false;
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            this._isClickModalClose = false;
            this._asset = [Path.uiAtlas + 'tongyong.atlas',];
        }

        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            this._viewUI = this._view = new ui.HuoDeJinBiUI();
            this.addChild(this._view);
        }

        protected onOpen(): void {
            super.onOpen();
            this._viewUI.btn_video.on(LEvent.CLICK, this, this.onBtnClick);
            this._isReward = false;
            if (this._type == GetTipsPage.TYPE_SKIN) {
                //没有看视频接口，暂时置灰
                this._viewUI.btn_video.disabled = true;
            } else {
                this._viewUI.btn_video.disabled = !WXTool.isShare;
            }
            this._viewUI.btn_lq.on(LEvent.CLICK, this, this.onBtnClick);
            // MessageManager.on(WXTool.VIDEO_SUCCESS, this, );
            // MessageManager.on(WXTool.SHARED_SUCCESS, this, this.setDouble);

            // this._viewUI.img_video1.skin = WXTool.isPlayError ? "zhuanpan/tu_fxdsb.png" : "tongyong/tu_gkspsb.png"
            // this._viewUI.img_video2.skin = WXTool.isPlayError ? "zhuanpan/tu_fenxiang.png" : "tongyong/tu_shipin.png"
            // this._viewUI.box_jinbi.visible = false;
            if(this._type != GetTipsPage.TYPE_FUHBI
                && this._type != GetTipsPage.TYPE_SKIN)
                this._viewUI.img_icon.visible = false;

            if(this._type == GetTipsPage.TYPE_GOLD){
                // this._viewUI.ani2.play(0, false);
                // this._viewUI.ani2.on(LEvent.COMPLETE, this, this.complete2);
            }
        }

        //皮肤的时候 _index是id  金币的时候_index是钱数 复活币是复活币数
        private _index: number;
        // private _isGold: boolean;
        private _type: number;
        setData(index: number, type: number): void {
            this._type = type;
            this._index = index;
            if (this._type == GetTipsPage.TYPE_GOLD) {
                //金币界面的UI设置
                this._viewUI.img_title.skin = "tongyong/bt_hdjb.png";
                this._viewUI.txt_gold.fontSize = 120;
                this._viewUI.txt_gold.color = "#ffc047";
                this._viewUI.txt_gold.text = index.toString();
                this._viewUI.img_friend.visible = false;
                this._viewUI.img_video1.visible = true;
                this._viewUI.img_video2.visible = true;
            } else if (this._type == GetTipsPage.TYPE_SKIN) {
                //皮肤界面的设置
                this._viewUI.img_icon.visible = true;
                this._viewUI.img_title.skin = "tongyong/bt_hdpf.png";
                this._viewUI.img_friend.visible = true;
                this._viewUI.img_video1.visible = false;
                this._viewUI.img_video2.visible = false;
                this._viewUI.txt_gold.fontSize = 50;
                this._viewUI.txt_gold.color = "#4eb8b3";
                let curData = SkinConfig.getInstance().datas;
                for (let i = 0; i < curData.length; i++) {
                    if (curData[i].id == this._index) {
                        this._viewUI.img_icon.skin = "scene/pifu/icon/" + curData[i].avatar + (curData[i].type == SkinPage.TYPE_BALL ? ".png" : ".jpg");
                        // let data: any = PlayerDataMgr.getSkinDesc(curData[i].id);
                        // this._viewUI.txt_gold.text = data.name;
                        break
                    }
                }
                this._viewUI.img_icon.y -= 30;
            } else if (this._type == GetTipsPage.TYPE_FUHBI) {
                //复活币的获得
                //金币界面的UI设置
                this._viewUI.img_icon.visible = true;
                this._viewUI.img_title.skin = "tongyong/tu_hdfhb.png";
                this._viewUI.img_icon.skin = "tongyong/tu_fuhuobi.png";
                this._viewUI.img_icon.size(117, 81);
                this._viewUI.txt_gold.fontSize = 120;
                this._viewUI.txt_gold.color = "#ffc047";
                this._viewUI.txt_gold.text = index.toString();
                this._viewUI.img_friend.visible = false;
                this._viewUI.img_video1.visible = true;
                this._viewUI.img_video2.visible = true;
            }
        }



        private onBtnClick(e: LEvent): void {
            
            switch (e.currentTarget) {
                case this._viewUI.btn_video:
                    if(this._isReward)return;
                    // if (this._type == GetTipsPage.TYPE_GOLD || this._type == GetTipsPage.TYPE_FUHBI) {
                    //     if (isDebug) {
                    //         this.setDouble();
                    //     } else {
                    //         WXTool.getVideo(() => {
                    //             WXTool.shareFriend();
                    //         }, () => {
                    //             this.setDouble();
                    //         });
                    //     }
                    // } else {
                    // //皮肤 复活币 炫耀
                    // WXTool.shareFriend();
                    // }
                    if (!this._isDouble) {
                        if (isDebug) {
                            this.setDouble();
                            this.getReward();
                        } else {
                            // WXTool.getVideo(() => {
                            //     WXTool.shareFriend(()=>{
                            //         this.setDouble();
                            //     });
                            // }, () => {
                            //     this.setDouble();
                            //     this.getReward();
                            // });
                        }
                    } 
                    break
                case this._viewUI.btn_lq:
                    this._isReward = true;
                    //领取
                    this.getReward();
                    break
            }
        }

        private _isDouble: boolean = false;
        //双倍展示
        setDouble(): void {
            if (this._type == GetTipsPage.TYPE_SKIN) {
                return;
            }
            this._viewUI.btn_video.disabled = this._isDouble = true;
            this._index *= 2;
            this._viewUI.txt_gold.text = this._index.toString();
            //图片更换
            this._viewUI.btn_lq.visible = false;
            this._viewUI.img_video1.visible = false;
            this._viewUI.img_video2.visible = false;
            this._viewUI.img_friend.visible = true;
            this._viewUI.img_friend.skin = "tongyong/tu_ljlq1.png";
        }

        //防止重复点击
        private _isClick: boolean = false;
        getReward(): void {
            if (this._isClick) return;
            this._isClick = true;
            this.clickClose();
        }

        public clickClose(): void {
            if (this._type == GetTipsPage.TYPE_GOLD) {
                // this._viewUI.box_jinbi.visible = true;
                this._viewUI.ani1.play(0, false);
                this._viewUI.ani1.on(LEvent.COMPLETE, this, this.complete);
                //飘金币跟飘字同时
                let goldNum = this._app.plyertDataMgr.getGold();
                this._goldClip.setText(goldNum.toString(),true);
                let str = StringU.substitute("恭喜获得{0}金币", this._index);
                this._app.uiRoot.top.showTip(str);
            } else if (this._type == GetTipsPage.TYPE_SKIN) {
                //皮肤的话，直接给。不用播放动画
                this._app.plyertDataMgr.setSkinActive(this._index);
                // MessageManager.off(WXTool.SHARED_SUCCESS, this, this.setDouble);
                super.close();
            } else if (this._type == GetTipsPage.TYPE_FUHBI) {
                //复活币的获得
                let haveCount = this._app.plyertDataMgr.getRebornCoinCount();
                this._app.plyertDataMgr.setRebornCoinCount(haveCount + this._index);
                // MessageManager.off(WXTool.SHARED_SUCCESS, this, this.setDouble);
                super.close();
            }
        }

        //动画播放完成
        private complete(): void {
            this._viewUI.ani1.off(LEvent.LABEL, this, this.complete);
            this._viewUI.ani1.stop();
            if(this._goldClip)
                this._goldClip.on(ClipUtil.EVENT_NUM_TWWEN_STOP, this, this.delayClose);
            this.getGoldRecode();
            // Laya.timer.once(2000, this, this.FinalClose);
        }

        private complete2(): void {
            // this._viewUI.ani2.off(LEvent.LABEL, this, this.complete2);
            // this._viewUI.ani2.stop();
            this._viewUI.img_icon.visible = true;
            MessageManager.event(WXTool.JINBI);
            // Laya.timer.once(2000, this, this.FinalClose);
        }

        private delayClose(): void {
            Laya.timer.once(700, this, this.FinalClose);
        }

        private getGoldRecode(): void {
            let haveMoney = this._app.plyertDataMgr.getGold();
            haveMoney += this._index;
            this._app.localStorageMgr.setItem('money', haveMoney + '');
            this._app.plyertDataMgr.event(PlayerDataMgr.GOLDCHANGE, haveMoney);
            //获得金币记录
            console.log("获得金币！！！！", haveMoney, this._index);
            // this._app.plyertDataMgr.setGoldCount(this._index);
            //UI变化
            this._goldClip.setText(haveMoney.toString(), false, true);
        }

        private FinalClose(): void {
            this._goldClip.off(ClipUtil.EVENT_NUM_TWWEN_STOP, this, this.delayClose);
            this.isAlertBox();
            // MessageManager.off(WXTool.SHARED_SUCCESS, this, this.setDouble);
            this.complete2();
            this._isReward = false;
            super.close();
        }

        private isAlertBox(): void {
            //如果处于结算界面存在的时候关掉金币获得，有30%的概率弹出宝箱
            let resultPage = this._app.uiRoot.general.getPage(PageDef.RESTART_PAGE)
            if (this._type == GetTipsPage.TYPE_GOLD && resultPage && !this._app.plyertDataMgr.isOpenBoxCur) {
                this._app.plyertDataMgr.isOpenBoxCur = true;
                if (isDebug) {
                    //debug阶段的时候，会直接弹出来
                    // this._app.uiRoot.general.open(PageDef.GETBOX);
                } else {
                    let random = MathU.randomRange(1, 100);
                    if (random <= 30) {
                        //并且得是金币弹窗  并且要结算界面存在
                        // this._app.uiRoot.general.open(PageDef.GETBOX);
                    }
                }
            }
        }
    }
}