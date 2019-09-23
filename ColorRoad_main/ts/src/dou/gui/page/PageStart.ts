module dou.gui.page {
    export class PageStart extends dou.gui.base.Page {

        private _viewUI: ui.PlayUI;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            // this._isModal = false;
            this._asset = [Path.uiAtlas + "play.atlas",
            Path.uiAtlas + "tongyong.atlas"];
        }

        // 页面初始化函数
        protected init(): void {
            //初始化进度条
            // this.y = 400;
            this._viewUI = this._view = new ui.PlayUI();
            this.addChild(this._view);
            this._viewUI.img_share2.visible = false;
            this._viewUI.img_set.visible = false;
            // (<ui.PlayUI>this._view).img_bg.removeSelf();
            // this.addChildAt((<ui.PlayUI>this._view).img_bg, 0);
        }

        private _gamePage: PageGameInfo;
        protected onOpen(): void {
            super.onOpen();
            //测试代码
            // this._app.localStorageMgr.setItem('gold', 1000000 + '');
            //初始三款基础皮肤都获得
            let isSetBaseSkin = this._app.plyertDataMgr.getBaseSkin();
            if (!isSetBaseSkin) {
                this._app.localStorageMgr.setItem('skin_active' + 1, "1", true);
                this._app.localStorageMgr.setItem('skin_active' + 14, "1", true);
                // this._app.localStorageMgr.setItem('skin_active' + 56, "1", true);
                this._app.plyertDataMgr.setBaseSkin(1);
                //当前使用，如果没有的话，设置为默认皮肤
                let ballStr = this._app.plyertDataMgr.getUseSkinIndex();
                if (!ballStr) this._app.plyertDataMgr.setUseSkinIndex(1);
                let tuoWeiStr = this._app.plyertDataMgr.getUseTuoWeiSkinIndex();
                if (!tuoWeiStr) this._app.plyertDataMgr.setUseTuoWeiSkinIndex(14);
                let zhangAiStr = this._app.plyertDataMgr.getUseObstacleSkinIndex();
                if (!zhangAiStr) this._app.plyertDataMgr.setUseObstacleSkinIndex(1);
            }
            if (this._app.plyertDataMgr.getIsNew() == 0 && this._app.plyertDataMgr.getSkinActive(5) != '1') {
                this._app.uiRoot.general.open(PageDef.RESULT_SUPER_SKIN, (page: Page) => {
                    page.dataSource = 1;
                });
            }
            this.updateStartSign();
            this.setSettingStateView(false);
            this._app.plyertDataMgr.setIsNew();
            this._viewUI.txt_ver.text = "v" + WXTool.fk_version;
            // 判断是否显示广告组件
            this._viewUI.img_ad.visible = (!WXTool.isML1 && WXTool.isSwithOpen) || WXTool.isML1 && WXTool.isSwithOpen;
            // if ((!WXTool.isML1 && WXTool.isSwithOpen) || WXTool.isML1 && WXTool.isSwithOpen) {
            //     this._gamePage = new PageGameInfo(this._app, this._viewUI);
            //     this._gamePage.view.mouseThrough = true;
            //     this.addChild(this._gamePage);
            //     this._gamePage.pos(-483, 360);
            // }

            // this._viewUI.btn_fuhuo.visible  = WXTool.isShare;
            this.drawBlack(0.75, "#000000");
            this._viewUI.btn_start.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_top.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_skin.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.img_sanjiao.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_set.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_bgm.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_sound_effect.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.img_gg.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_fuhuo.on(LEvent.CLICK, this, this.onClick);
            // this._viewUI.btn_set.on(LEvent.CLICK, this, this.onClick)
            this._viewUI.on(LEvent.CLICK, this, this.onClickHandler);
            this._viewUI.btn_share.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_qd.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_zhuanpan.on(LEvent.CLICK, this, this.onClick);
            this._viewUI.img_start_hand.on(LEvent.CLICK, this, this.onClick);
            MessageManager.on(WXTool.BLACKEVENT, this, this.onClickHandler);
            MessageManager.on(WXTool.SUPER_SKIN, this, this.onSuperSkin);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.successShare);
            MessageManager.on(WXTool.REBORN_COIN, this, this.onRebornCoin);
            MessageManager.on(WXTool.REBORN_LIBAO, this, this.onRebornCoin);
            this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_QIANDAO, this, this.checkRedPoint);
            this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_TOTAL_LOGIN_CONTINUE);
            this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_TOTAL_LOGIN);
            // this._view.ck_music.on(LEvent.CLICK, this, this.onChange);
            this._app.plyertDataMgr.on(PlayerDataMgr.SKINCHAGNE, this, this.pifuChange);
            this.updateStar();
            this.onChange();
            this.pifuChange(this._app.plyertDataMgr.getTuSiJi());
            console.log("进入步骤0")
            WXTool.countAd = 0;
            WXTool.adViewInit(this._view);
            this.checkRedPoint();
            //判断是否今天第一次登陆
            this._app.plyertDataMgr.checkFirstLogin();
            //向本地缓存管理器存登陆天数
            this._app.plyertDataMgr.setDataIntoLocal();
            if(WXTool.viewHight == 0){
                WXTool.viewHight = Laya.Browser.clientHeight;
                WXTool.viewWidth = Laya.Browser.clientWidth;
            }
            WXTool.layouBanner();

            this._viewUI.btn_chengjiu.visible = false;
            this._viewUI.btn_want.visible = false;
            this._viewUI.btn_levelUp.visible = false;

            this.on(LEvent.MOUSE_DOWN, this, this.onmousedown);
            this.on(LEvent.MOUSE_MOVE, this, this.onmousemove);
            this.on(LEvent.MOUSE_UP, this, this.onmouseup);

            this._isMouseDown = false;
            this.setMouseHand(0);
            this.updateMaxScore();
            //初始声音与震动
            this._viewUI.btn_bgm.selected = PlayerDataMgr.isPlayBgMusic;
            this._viewUI.btn_sound_effect.selected = PlayerDataMgr.isPlayActionMusic;
        }

        private _isMouseDown:boolean = false;
        private _mousePosx:number = 0;
        private onmousedown(e:LEvent):void{
            this._isMouseDown = true;
            this._mousePosx = this.mouseX;
        }

        private onmousemove(e:LEvent):void{
            if (this._isMouseDown){
                let dis:number = this.mouseX - this._mousePosx;
                let per:number = dis / 150;
                if (per >= 1){
                    this.onStart();
                }
                this.setMouseHand(per);
            }
        }

        private onmouseup(e:LEvent):void{
            this._isMouseDown = false;
            this.setMouseHand(0);
        }

        private setMouseHand(per:number):void{
            if (per < 0) per = 0;
            if (per > 1) per = 1;

            let len:number = 335;
            let posx:number = len * per;
            this._viewUI.img_start_hand.x = posx;
        }

        //最高分
        private updateMaxScore():void{
            this._viewUI.txt_best.text = this._app.plyertDataMgr.getMaxScore()+"";
        }

        //检测红点
        private checkRedPoint(): void {
            //转盘免费次数
            let curTime: number = this._app.sync.serverTimeBys;
            let zero_time = Sync.getDayZeroTime(curTime * 1000);
            let free_time = this._app.plyertDataMgr.getTurntableTime();
            // if (zero_time == free_time)
            //     this._viewUI.red_zhuan.visible = false;
            // else
            //     this._viewUI.red_zhuan.visible = true;
            //签到红点  有可签和可补签次数的时候
            let curDay = Sync.getTimeWeekDay(this._app.sync.serverTimeByms) - 1;
            if (curDay == -1) {
                curDay = 6;
            }
            let signFlag: boolean;
            //当天是否签到了
            let isSign = this._app.plyertDataMgr.getQianBitWeek(curDay);
            //是否有可以补签
            let time = this._app.plyertDataMgr.getBuQian();
            console.log("buqian=====",time)
            if (time) {
                if (!Sync.getIsToday(time, curTime)) {
                    //不是当天时间  可以补签
                    signFlag = true
                } else {
                    signFlag = false;
                }
            } else {
                //没有时间，意味着可以补签
                signFlag = true;
            }
            let isRed:boolean = false;
            console.log("curDay",curDay)
            for (var index = curDay-1; index < curDay; index++) {
                if(index<0)break;
                console.log("this._app.plyertDataMgr.getQianBitWeek(index)",this._app.plyertDataMgr.getQianBitWeek(index))
                isRed = this._app.plyertDataMgr.getQianBitWeek(index) != 0?true:false;
                if(!isRed)break;
            }

            //周一不判断补签
            // if (!isSign || !isRed) {
            //     this._viewUI.red_sign.visible = true;
            // } else {
            //     this._viewUI.red_sign.visible = false;
            // }
        }

        private setSettingStateView(show:boolean):void{
            if(show && this._viewUI.img_set.visible) return;//已經打開了 或 正在打開了
            if(!show){
                this._viewUI.img_set.visible = false;
                this.off(LEvent.MOUSE_DOWN, this, this.onDown)
                return
            }
            this._viewUI.img_set.visible = true;
            this.on(LEvent.MOUSE_DOWN, this, this.onDown)
        }

        /**更新开始按钮上的标签 */
        public updateStartSign(): void {
            if (this._app.plyertDataMgr.shareBeiNum == 0.5) {
                this._viewUI.img_share1.visible = false;
                this._viewUI.img_share2.visible = true;
                this._viewUI.img_share2.skin = 'tongyong/jb11.png';
            }
            if ((isDebug || WXTool.isML1) && this._app.plyertDataMgr.getAddSpeedStatus() == 1) {
                // 显示 开局无敌加速
                this._viewUI.img_share2.visible = true;
                this._viewUI.img_share2.skin = 'tongyong/jb12.png';
            }
        }

        private successShare(): void {
            //单局金币增加50%
            console.log("主界面金杯倍数增加", this._app.plyertDataMgr.shareBeiNum);
            this._app.plyertDataMgr.shareBeiNum = 0.5;
            this.updateStartSign();
        }

        private onChange(): void {

            // console.log('----',  (this._view as ui.PlayUI).ck_music.selected)
            // Laya.SoundManager.muted = (this._view as ui.PlayUI).ck_music.selected;
        }

        private pifuChange(index): void {
            // this._view.img_pifu.skin = StringU.substitute('pifu/skin_{0}.png', index);
        }

        private updateStar(): void {
            // SKINCHAGNE
            // this._clipNum1.setNum(this._app.plyertDataMgr.getStar());
            // this._viewUI.btn_fuhuo.visible = WXTool.isShare;
            this._viewUI.box_share.visible = WXTool.isShare;
        }

        //布局
        public layout(): void {
            super.layout();
            if (this._view && onIPhoneX) {
                // (<ui.PlayUI>this._view).img_bg.size(Laya.stage.width,Laya.stage.height);
                // (<ui.PlayUI>this._view).img_bg.pos(this._app.uiRoot.x, -this._app.uiRoot.y);
            }
        }

        private onClickHandler(e?: LEvent) {
            if (this._gamePage) {
                this._gamePage.suoView();
            }
        }

        /**被邀请进来，给对方加邀请数，以获得皮肤 */
        private onSuperSkin(): void {
            let openid = WXTool._openId;
            console.log('************************onSuperSkin:', openid, WXTool.wxOpenid);
            if (openid && openid != '' && WXTool.wxOpenid && WXTool.wxOpenid != '' && openid != WXTool.wxOpenid)
                WXTool.setShareCount(openid, this._app.wxUserInfo.avatarUrl, this._app.wxUserInfo.nickName);// 邀请者的openid
        }

        /**点邀请进来,加复活币 */
        private onRebornCoin(): void {
            console.log("===================复活币点进来==========22222=========");
            let openid = WXTool._openId;
            if (openid && openid != '' && WXTool.wxOpenid && WXTool.wxOpenid != '' && openid != WXTool.wxOpenid) {
                WXTool.setinvite(openid, 0);// 邀请者的openid
                console.log("===================复活币点进来==========33333==========");
            }
        }

        /**点礼包进来,加复活币 */
        private onRebornLibao(): void {
            console.log("===================复活币礼包点进来=========22222===========");
            let openid = WXTool._openId;
            if (openid && openid != '' && WXTool.wxOpenid && WXTool.wxOpenid != '' && openid != WXTool.wxOpenid) {
                WXTool.setinvite(openid, 1);// 邀请者的openid
                console.log("===================复活币礼包点进来=========33333===========");
            }
        }

        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._viewUI.btn_start:
                    
                    break;
                case this._viewUI.img_start_hand:
                    this.onStart();
                    return;
                case this._viewUI.btn_top:
                    this._app.uiRoot.openSortPage();
                    // this._app.plyertDataMgr.setSkinActive(1);
                    break;
                case this._viewUI.btn_skin:
                    // this._app.uiRoot.HUD.open(PageDef.SKIN_PAGE);
                    this._app.uiRoot.general.open(PageDef.SKIN_MAIN_PAGE);
                    break;
                // case this._viewUI.btn_fuhuo:
                //     this._app.uiRoot.general.open(PageDef.FUHUO_PAGE, (page: dou.gui.page.FuHuoPage) => {
                //         page.isOnScene = false;
                //     });
                //     break;
                // case this._viewUI.img_gg:
                //     WXTool.nav("");
                //     return;
                // case this._viewUI.btn_set:
                //     this._app.uiRoot.general.open(PageDef.SETTING_PAGEA);
                //     break;
                case this._viewUI.btn_share:
                    if (isDebug) {
                        this.successShare();
                    } else {
                        WXTool.shareFriend();
                    }
                    return;
                case this._viewUI.btn_qd:
                    this._app.uiRoot.general.open(PageDef.QIANDAO);
                    return;
                case this._viewUI.btn_zhuanpan:
                    this._app.uiRoot.general.open(PageDef.TURNTABLEPAGE);
                    return;
                case this._viewUI.btn_set:
                case this._viewUI.img_set:
                    this.setSettingStateView(!this._viewUI.img_set.visible);
                    return;
                case this._viewUI.btn_bgm://背景音乐
                    this._viewUI.btn_bgm.selected = !this._viewUI.btn_bgm.selected;
                    PlayerDataMgr.isPlayBgMusic = this._viewUI.btn_bgm.selected;
                    return;
                case this._viewUI.btn_sound_effect://音效             
                    this._viewUI.btn_sound_effect.selected = !this._viewUI.btn_sound_effect.selected;
                    PlayerDataMgr.isPlayActionMusic = this._viewUI.btn_sound_effect.selected;
                    return;
            }
            this.close();
        }

        private onDown(e: LEvent): void {
            switch(e.target) {
                case this:
                    let parent = e.target.parent;
                    while(parent){
                        if(parent == this._viewUI.img_set){
                            return
                        }
                    }
                    e.stopPropagation();
                    this.setSettingStateView(false)
                    break;
            }
        }

        private onStart():void{
            //增加提示弹窗
                    // if (WXTool.isShare) {
                    //     //30%的几率打开幸运女神界面
                    //     let rang = MathU.randomRange(1, 100);
                    //     if (rang <= 30) {
                    //         this._app.uiRoot.general.open(PageDef.XINGYUNPAGE);
                    //         this.close();
                    //         return;
                    //     }
                    //     let time = this._app.plyertDataMgr.getTipTime();
                    //     //在一个小时之内则弹出次弹框，否则
                    //     if (time) {
                    //         //判断是否是在一个小时之外且没有分享
                    //         if (this._app.sync.serverTimeByms - time >= Sync.DAY_SECONDS * 1000 && !this._app.plyertDataMgr.shareBeiNum) {
                    //             this._app.uiRoot.general.open(PageDef.TIPS);
                    //             //更新时间
                    //             this._app.plyertDataMgr.updateTime(this._app.sync.serverTimeByms);
                    //             this.close();
                    //             return;
                    //         } else { }
                    //     } else {
                    //         //时间不存在，存入
                    //         this._app.plyertDataMgr.updateTime(this._app.sync.serverTimeByms);
                    //         //如果没有分享
                    //         if (!this._app.plyertDataMgr.shareBeiNum) {
                    //             this._app.uiRoot.general.open(PageDef.TIPS);
                    //             this.close();
                    //             return;
                    //         }
                    //     }
                    // }
                    // if ((isDebug || WXTool.isML1) && this._app.plyertDataMgr.getAddSpeedStatus() == 0) {
                    //     // 打开 开局加速礼包 界面
                    //     this._app.uiRoot.general.open(PageDef.ADD_SPEED_PAGE);
                    //     return;
                    // }
                    this._app.uiRoot.general.open(PageDef.WUDI_PAGE);
                    // this._app.sceneRoot.reset();
                    // this._app.sceneRoot.mainPlayer.playerScript.addWuDi();
                    this.close();
        }

        public close(): void {
            if (this._view) {
                // (<ui.PlayUI>this._view).img_bg.removeSelf();
            }
            MessageManager.off(WXTool.BLACKEVENT, this, this.onClickHandler);
            MessageManager.off(WXTool.SUPER_SKIN, this, this.onSuperSkin);
            MessageManager.off(WXTool.REBORN_COIN, this, this.onRebornCoin);
            MessageManager.off(WXTool.REBORN_LIBAO, this, this.onRebornCoin);
            MessageManager.off(WXTool.SHARED_SUCCESS, this, this.successShare);
            this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_QIANDAO, this, this.checkRedPoint);
            this._app.plyertDataMgr.off(PlayerDataMgr.SKINCHAGNE, this, this.pifuChange);
            this._app.plyertDataMgr.off(PlayerDataMgr.STARCHAGNE, this, this.updateStar);
            this.off(LEvent.MOUSE_DOWN, this, this.onmousedown);
            this.off(LEvent.MOUSE_MOVE, this, this.onmousemove);
            this.off(LEvent.MOUSE_UP, this, this.onmouseup);
            this.off(LEvent.MOUSE_DOWN, this, this.onDown)
            // this._viewUI.img_sanjiao.off(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_set.off(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_bgm.off(LEvent.CLICK, this, this.onClick);
            this._viewUI.btn_sound_effect.off(LEvent.CLICK, this, this.onClick);
            this._viewUI.img_start_hand.off(LEvent.CLICK, this, this.onClick);
            super.close();

        }

    }
}