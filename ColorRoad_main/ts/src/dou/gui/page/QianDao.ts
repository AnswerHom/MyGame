module dou.gui.page {
    export class QianDaoPage extends dou.gui.base.Page {
        public static IS_NEED_BuQian: boolean = false;
        //连续的话按征程周天数计算，不连续的话就按每天登录的天数计算，满足七次之后重置
        public static IS_NEED_CONTINUE: boolean = true;
        public static MAX_DAYS: number = 7;
        //奖励数值
        public static WEEKSTR: any = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        public static DAYS: any = ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"];
        private _curDay = -2;
        private _viewUI: ui.LianXuDengLuUI;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [Path.uiAtlas + "qiridenglu.atlas",
            Path.uiAtlas + "tongyong.atlas",
            Path.uiAtlas + "jiesuan.atlas"];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this._view = new ui.LianXuDengLuUI();
            this.addChild(this._view);
        }

        private _CurZeroTime: number;
        protected onOpen(): void {
            super.onOpen();
            //测试代码
            // for (let i = 0; i < 7; i++) {
            //     //  修改为直接设置重置
            //     this._app.localStorageMgr.setItem("WeedKDay" + i, "0");
            //     this._app.localStorageMgr.setItem("WeedKDayLingQu" + i, "0");
            //     this._app.plyertDataMgr.setSignTime(0);
            // }
            //初始化当前的下标
            this.initList();
            this._viewUI.checkBox.selected = true;
            this.checkBox();
            this._viewUI.btnHome.on(LEvent.CLICK, this, this.close);
            this._viewUI.btn_double.on(LEvent.CLICK, this, this.onBtnClick);
            this._viewUI.checkBox.on(LEvent.CLICK, this, this.checkBox);
            this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_QIANDAO, this, this.checkBox);
            // MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.onBuQian);
            // MessageManager.on(WXTool.SHARED_SUCCESS, this, this.onBuQian);
        }

        private onBtnClick(): void {
            if (PlayerDataMgr.goldDays.indexOf(this._curDay) >= 0) {
                if (this._viewUI.checkBox.selected) {
                    //暂时没有看视频直接获取领取 观看视频
                    if (!isDebug) {
                        WXTool.getVideo(() => {
                            this.getReward();
                            this.close();
                        });
                    } else {
                        this.getReward();
                        this.close();
                    }
                    // this.getReward();
                } else {
                    //直接领取
                    this.getReward()
                    this.close();
                }
            } else {
                //领取皮肤
                this.getReward();
                this.close();
            }

        }

        private initDay(): void {
            if (QianDaoPage.IS_NEED_CONTINUE) {
                this.getCurDay();
            } else {
                //获得当前时间对应的周天数 0-6
                this._curDay = Sync.getTimeWeekDay(this._app.sync.serverTimeByms) - 1;
            }
            if (this._curDay == -1) {
                this._curDay = 6;
            }
        }
        //领取奖励
        private getReward(): void {
            let curDay = this._curDay;
            this._app.plyertDataMgr.setQianBitWeek(curDay);
            this._app.plyertDataMgr.setLingQuWeek(curDay, false, this._viewUI.checkBox.selected);
            if (QianDaoPage.IS_NEED_CONTINUE) {
                //不连续的，需要记录签到时间，防止重复签到
                let signZeroTime = this._app.plyertDataMgr.getSignTime();
                if (signZeroTime && this._CurZeroTime == signZeroTime) {
                    return;
                }
                this._app.plyertDataMgr.setSignTime(this._CurZeroTime);
            }
        }

        private checkBox(): void {
            this.initDay();
            this.updateUI();
            let checkBox = this._viewUI.checkBox;
            if (QianDaoPage.IS_NEED_CONTINUE) {
                if (this._CurZeroTime == this._app.plyertDataMgr.getSignTime()) {
                    this._viewUI.btn_double.disabled = true;
                }
                //未领取
                if (checkBox.selected) {
                    this._viewUI.img_txt.skin = "qiridenglu/tu_lqsb.png";
                } else {
                    this._viewUI.img_txt.skin = "qiridenglu/tu_lqjl.png";
                }
            } else {
                let isSign = this._app.plyertDataMgr.getLingQuWeek(this._curDay);
                // if (this._curDay == 0 || this._curDay == 2 || this._curDay == 3 || this._curDay == 5) {
                    //金币
                    this._viewUI.checkBox.visible = true;
                    if (isSign) {
                        //已领取
                        this._viewUI.btn_double.disabled = true;
                    } else {
                        this._viewUI.btn_double.disabled = false;
                        //未领取
                        if (checkBox.selected) {
                            this._viewUI.img_txt.skin = "qiridenglu/tu_lqsb.png";
                        } else {
                            this._viewUI.img_txt.skin = "qiridenglu/tu_lqjl.png";
                        }
                    }
                // } else {
                //     this._viewUI.checkBox.visible = false;
                //     //皮肤的
                //     this._viewUI.img_txt.skin = "qiridenglu/tu_lqjl.png";
                //     if (isSign) {
                //         this._viewUI.btn_double.disabled = true;
                //     } else {
                //         this._viewUI.btn_double.disabled = false;
                //     }
                // }
            }
        }

        private updateUI(): void {
            this._viewUI.list_day.array = PlayerDataMgr.DayDatas;
        }

        private initList(): void {
            this._viewUI.list_day.renderHandler = new Handler(this, this.updateBox);
        }

        private updateBox(box: ui.component.QianDao_TUI, index: number): void {
            box.img_double.visible = false;
            box.img_YL.visible = false;
            if (QianDaoPage.IS_NEED_CONTINUE) {
                box.txt_day.text = QianDaoPage.DAYS[index];
                if (this._curDay == index && this._CurZeroTime != this._app.plyertDataMgr.getSignTime()) {
                    box.img_di.disabled = false;
                } else {
                    box.img_di.disabled = true;
                }
            } else {
                box.txt_day.text = QianDaoPage.WEEKSTR[index];
                if (this._curDay == index) {
                    box.img_di.disabled = false;
                }
            }

            //星期日做特殊
            if (index == 6) {
                box.img_di.width = 277;
                box.img_di.height = 224;
                box.img_di.sizeGrid = "0,51,0,30";
                box.img_icon.skin = "tongyong/tu_qian6.png";
            }
            // if (PlayerDataMgr.goldDays.indexOf(index) != -1) {
                //星期一三五 金币
                box.img_icon.size(85, 80);
                if (this._viewUI.checkBox.selected)
                    box.img_icon.skin = "tongyong/tu_qian4.png";
                else
                    box.img_icon.skin = "tongyong/tu_qian6.png";
            // } else {
            //     // box.img_icon.size(117, 81);
                if (index == 6) {
                    box.img_icon.x = 142;
                }
            //     box.img_icon.skin = "jiesuan/tu_fuhuobi.png";
            // }
            //数值 
            if (this._viewUI.checkBox.selected)
                box.txt_num.text = "+" + PlayerDataMgr.DayDatas[index] * 2;
            else
                box.txt_num.text = "+" + PlayerDataMgr.DayDatas[index];

            //没有补签的
            let isSign = this._app.plyertDataMgr.getLingQuWeek(index);
            if (QianDaoPage.IS_NEED_CONTINUE) {
                if (isSign) {
                    box.img_double.visible = false;
                    box.img_YLQ.visible = true;
                } else {
                    box.img_YLQ.visible = false;
                    box.img_di.disabled = false;
                    //未领取
                    if (this._curDay == index && this._viewUI.checkBox.selected && PlayerDataMgr.goldDays.indexOf(index) >= 0) {
                        box.img_double.visible = true;
                    } else {
                        box.img_double.visible = false;
                    }
                }
            } else {
                if (isSign && this._curDay == index) {
                    //已领取
                    box.img_double.visible = false;
                    box.img_YLQ.visible = true;
                } else {
                    box.img_YLQ.visible = false;
                    //未领取
                    if (this._curDay == index && this._viewUI.checkBox.selected && PlayerDataMgr.goldDays.indexOf(index) >= 0) {
                        box.img_double.visible = true;
                    } else {
                        box.img_double.visible = false;
                    }
                }
            }

            //有补签的
            // //是否签到了
            // let isSign = this._app.plyertDataMgr.getQianBitWeek(index);
            // //是否领取了
            // let isLingQu = this._app.plyertDataMgr.getLingQuWeek(index);
            // if (isSign) {
            //     if (isLingQu) {
            //         box.img_YL.visible = true;
            //         box.btn_L.visible = false;
            //     } else {
            //         box.img_YL.visible = false;
            //         box.btn_L.visible = true;
            //         box.btn_L.label = "领 取";
            //     }
            // } else {
            //     box.img_YL.visible = false;
            //     box.btn_L.visible = true;
            // }
            // box.txt_day.text = QianDaoPage.WEEKSTR[index];
            // //补签,当前的前一天才可以
            // if (index == this._curDay - 1 && this._curDay - 1 >= 0 && !this._app.plyertDataMgr.getQianBitWeek(index)) {
            //     //检测是否有补签的次数
            //     let time = this._app.plyertDataMgr.getBuQian();
            //     let curTime = this._app.sync.serverTimeByms;
            //     if (time) {
            //         if (!Sync.getIsToday(time, curTime)) {
            //             //不是当天时间  可以补签
            //             box.btn_L.label = "补 签";
            //         } else {
            //             box.btn_L.label = "签 到";
            //         }
            //     } else {
            //         //没有时间，意味着可以补签
            //         box.btn_L.label = "补 签";
            //     }
            // } else if (index == this._curDay) {
            //     //当天可以双倍
            //     box.img_double.visible = true;
            // } else {
            //     //不是今天也不是前一天
            //     box.btn_L.visible = false;
            // }
            // if (this._curDay <= index) {
            //     box.img_di.skin = "qiridenglu/tu_xxd.png";
            // } else {
            //     box.img_di.skin = "qiridenglu/tu_xxd2.png";
            // }
            // box.btn_L.on(LEvent.CLICK, this, this.qianDao, [index, box.btn_L]);
        }

        // private qianDao(index: number, btnL: any): void {
        //     if (btnL.label == "签 到") {
        //         //签到
        //         if (this._curDay > index || this._app.plyertDataMgr.getQianBitWeek(index)) {
        //             //今天之前不允许直接签到  防止重复签到
        //             return;
        //         }
        //         this._app.plyertDataMgr.setQianBitWeek(index);
        //     } else if (btnL.label == "补 签") {
        //         this._index = index;
        //         // 看视频补签
        //         if (isDebug) {
        //             this.onBuQian();
        //         } else {
        //             WXTool.getVideo();
        //         }
        //     } else if (btnL.label == "领 取") {
        //         this._app.plyertDataMgr.setLingQuWeek(index);
        //     }
        // }

        // private _index: number = -1;
        // private onBuQian(): void {
        //     if (this._index == -1) return;
        //     //补签
        //     this._app.plyertDataMgr.setBuQian();
        //     this._app.plyertDataMgr.setQianBitWeek(this._index);
        //     this._index = -1;
        //     this.close();
        // }

        //---------------------是否连续相关的方法---------
        private getCurDay(): void {
            //获取当前没有签到过的下标位并且当天没有签到过
            let curTime = this._app.sync.serverTimeBys;
            this._CurZeroTime = Sync.getDayZeroTime(curTime * 1000);
            let signZeroTime = this._app.plyertDataMgr.getSignTime();
            for (let i = 0; i < QianDaoPage.MAX_DAYS; i++) {
                let isSign = this._app.plyertDataMgr.getQianBitWeek(i);
                if (!isSign) {
                    if (this._CurZeroTime != signZeroTime || !signZeroTime) {
                        this._curDay = i;
                        break;
                    } else {
                        this._curDay = -2;
                    }
                }
            }
        }

        public close(): void {
            // MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.onBuQian);
            // MessageManager.off(WXTool.SHARED_SUCCESS, this, this.onBuQian);
            // MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.getReward);
            this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_QIANDAO, this, this.checkBox);
            super.close();
        }
    }
}