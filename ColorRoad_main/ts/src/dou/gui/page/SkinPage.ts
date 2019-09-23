module dou.gui.page {
    export class SkinPage extends dou.gui.base.Page {
        //小类型
        /**全部皮肤 */
        static TYPE_ALLSKIN: number = 0
        /**挑战获得 */
        static TYPE_CHALLENGE: number = 1;
        /**金币获得 */
        static TYPE_GOLD: number = 2;
        //大类型
        /**球 */
        static TYPE_BALL: number = 0;
        /**拖尾 */
        static TYPE_TUOWEI: number = 1;
        /**障碍 */
        static TYPE_ZHANGAI: number = 2

        private _viewUI: ui.PiFuUI;
        private _pifuGET: List;
        private _pifuNO: List;
        private _getData: any;  //已获得的数据
        private _noGetData: any; //未获得的数据
        private _totalDatas: any; //总的数据
        private _goldData: any; //金币购买的数据
        private _changeData: any;   //挑战获得
        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = false;
            this._asset = [Path.uiAtlas + "pifu.atlas", Path.uiAtlas + "/pifu/icon.atlas"];
        }

        get curBigIndex() {
            return this._curIndexBig;
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this._view = new ui.PiFuUI();
            this.addChild(this._view);
            this.initList();
            this.initTab();
            this.selectHandlerBig(SkinPage.TYPE_BALL);
            this.ballSkin();
            this.tuoWeiEffect();
            this.updateUI();
            this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_TOTAL_INVITE);
            MessageManager.on(WXTool.SHARED_SUCCESS, this, this.shareQun);
            MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.onVideo);
            this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_CHANGE, this, this.selectHandlerBig);
        }

        protected onOpen(): void {
            super.onOpen();
            DisplayU.setMouseListener(this._view.btn_back, true, this, this.onClick);
            this._app.plyertDataMgr.on(PlayerDataMgr.GOLDCHANGE, this, this.updateUI);
            // this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.selectHandlerBig);

            this._app.sceneRoot.hide();
            this._app.showRoot.show();
        }

        shareQun(): void {
			//分享到群
			let shareCount = this._app.plyertDataMgr.getShareQunCount();
			console.log("当前获得的分享到群的次数",shareCount);
			shareCount++;
			this._app.plyertDataMgr.setShareQunCount(shareCount);
		}

        onVideo(): void {
			console.log("观看视频中=============");
			this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_VIDEO_50);
			//连看7天视频
			let getContinueTime = this._app.localStorageMgr.getItem('TYPE_VIDEO_7');
			let curZeroTime = Sync.getDayZeroTime(this._app.sync.serverTimeByms).toString();   //返回的时间是秒
			if (!getContinueTime) {
				this._app.localStorageMgr.setItem("TYPE_VIDEO_7", curZeroTime + "");
			} else {
				let str = getContinueTime;
				let strArray = str.split("&");
				let lastTime = strArray[strArray.length - 1];
				//拿最后一次记录的时间进行比较
				if (parseInt(lastTime) - this._app.sync.serverTimeBys >= Sync.DAY_SECONDS * 1000) {
					//间隔大于一天,清空掉重新记录
					let strZero = curZeroTime + "";
					this._app.localStorageMgr.setItem("TYPE_VIDEO_7", strZero);
				} else {
					//在最后面存入数值
					if (curZeroTime != lastTime) {
						console.log("连续观看视频次数记录前", getContinueTime);
						//不要重复记录
						str += '&';
						str += curZeroTime;
						this._app.localStorageMgr.setItem("TYPE_VIDEO_7", str + "");
					}
				}
			}
			this._app.plyertDataMgr.setPlayerDataSkin(PlayerDataMgr.TYPE_VIDEO_7);
		}

        private ballSkin(): void {
            //初始化当前使用的皮肤
            let curBallID = this._app.plyertDataMgr.getUseSkinIndex();
            let curBallData;
            for (let i = 0; i < this._totalDatas.length; i++) {
                if (curBallID == this._totalDatas[i].id) {
                    curBallData = this._totalDatas[i];
                }
            }
            let ballSkin = curBallData ? curBallData.avatar : 'role01';
            if (ballSkin) {
                this._app.showRoot.changeBallSkin(ballSkin);
            }
        }

        private tuoWeiEffect():void{
            //初始化当前使用的拖尾
            let tuoWeiData;
            let tuoWeiDatas = SkinPage.getDataByType(2);
            let curTuoWeiId = this._app.plyertDataMgr.getUseTuoWeiSkinIndex();
            for (let i = 0; i < tuoWeiDatas.length; i++) {
                if (curTuoWeiId == tuoWeiDatas[i].id) {
                    tuoWeiData = tuoWeiDatas[i];
                }
            }
            let tuoWeiSkin = tuoWeiData ? tuoWeiData.avatar : "qiu11";
            if (tuoWeiSkin) {
                this._app.showRoot.changeTuoWeiSkin(tuoWeiSkin);
            }
        }

        private initList(): void {
            //已获得列表
            this._pifuGET = new List();
            this._pifuGET.itemRender = dou.gui.component.PiFuItem;
            this._pifuGET.repeatX = 3;
            this._pifuGET.renderHandler = new Handler(this, this.renderItemcb, [true]);
            // this._viewUI.panel_skin.addChild(this._pifuGET);
            // this._pifuGET.x = 70;
            this._pifuGET.spaceX = 10;
            // if (WXTool.onIpx) {
            //     this._pifuGET.y = 380;
            // } else {
            //     this._pifuGET.y = 350;
            // }
            //未获得列表
            this._pifuNO = new List();
            this._pifuNO.itemRender = dou.gui.component.PiFuItem;
            this._pifuNO.repeatX = 3;
            this._pifuNO.renderHandler = new Handler(this, this.renderItemcb, [false]);
            // this._viewUI.panel_skin.addChild(this._pifuNO);
            // this._pifuNO.x = 70;
            this._pifuNO.spaceX = 10;
            // if (WXTool.onIpx) {
            //     this._pifuNO.y = 380;
            // } else {
            //     this._pifuNO.y = 350;
            // }
            //panel列表
            // this._viewUI.panel_skin.vScrollBarSkin = "";
        }

        private updateUI(): void {
            //当前金币数
            // this._viewUI.txt_gold.text = this._app.plyertDataMgr.getGold().toString();
            //当前皮肤的进度
            let array = this._curArray;
            let count: number = 0;
            for (let i = 0; i < array.length; i++) {
                if (this._app.plyertDataMgr.isBuySkinFlag(array[i].id)) {
                    count++;
                }
            }
            // this._viewUI.txt_JD.text = StringU.substitute("收集进度:{0}/{1}", count, array.length);
            this.updatePos();
        }

        //设置位置
        private updatePos(): void {
            // let titleGet = this._viewUI.title_get;
            // let titleNo = this._viewUI.title_no;
            // if (WXTool.onIpx) {
            //     titleGet.y = titleGet.y+30;
            // } else {
            //     // titleGet.y = 350;
            // }
            // this._pifuGET.y = titleGet.y + titleGet.height;
            // if (this._pifuGET.array.length > 0) {
            //     titleNo.y = this._pifuGET.y + this._pifuGET.height;
            // } else {
            //     titleNo.y = this._pifuGET.y;
            // }
            // this._pifuNO.y = titleNo.y + titleNo.height;
            // this._viewUI.panel_skin.vScrollBar.max = titleGet.height + titleNo.height + this._pifuGET.height + this._pifuNO.height;
        }

        private initTab(): void {
            // this._viewUI.mcTab_Small.selectedIndex = 0;
            // this._viewUI.mcTab_Big.selectedIndex = 0;
            // this._curIndexBig = 0;
            // this._curIndexSamll = 0;
            // this._viewUI.mcTab_Small.selectHandler = new Handler(this, this.selectHandlerSamll);
            // this._viewUI.mcTab_Big.selectHandler = new Handler(this, this.selectHandlerBig);
        }

        private _curIndexSamll: number;
        private _curIndexBig: number;
        private _curArray: any;
        private selectHandlerSamll(index: number) {
            if (index == undefined) index = this._curIndexSamll;
            let curArray;
            switch (index) {
                case SkinPage.TYPE_CHALLENGE:
                    //挑战界面
                    curArray = this._changeData;
                    break
                case SkinPage.TYPE_GOLD:
                    //金币界面
                    curArray = this._goldData;
                    break
                case SkinPage.TYPE_ALLSKIN:
                    curArray = this._totalDatas;
                    break;
            }
            // this._viewUI.mcTab_Small.selectedIndex = index;
            this._curIndexSamll = index;
            this._curArray = curArray;
            this.updateList(curArray);
            this.updateUI();
        }

        private updateList(array: any): void {
            //根据当前的传进来的数据，在细分已获得跟未获得
            this._getData = [];
            this._noGetData = [];
            for (let i = 0; i < array.length; i++) {
                if (this._app.plyertDataMgr.isBuySkinFlag(array[i].id)) {
                    this._getData.push(array[i]);
                } else {
                    this._noGetData.push(array[i]);
                }
            }
            this._pifuGET.array = this._getData;
            if (this._getData.length <= 0) {
                this._pifuGET.height = 0;
            } else {
                this._pifuGET.visible = true;
                this._pifuGET.repeatY = Math.ceil(this._getData.length / 3);
            }
            this._pifuNO.array = this._noGetData;
            if (this._noGetData.length <= 0) {
                this._pifuNO.height = 0;
            } else {
                this._pifuNO.repeatY = Math.ceil(this._noGetData.length / 3);
                this._pifuNO.visible = true;
            }            
        }

        //切换大标签类型
        private selectHandlerBig(index: number) {
            if (index == undefined) index = this._curIndexBig;
            let type
            switch (index) {
                case SkinPage.TYPE_BALL:
                    //球
                    type = SkinPage.TYPE_BALL + 1;
                    this._totalDatas = SkinPage.getDataByType(type);
                    break
                case SkinPage.TYPE_TUOWEI:
                    //拖尾
                    type = SkinPage.TYPE_TUOWEI + 1;
                    this._totalDatas = SkinPage.getDataByType(type);
                    break
                case SkinPage.TYPE_ZHANGAI:
                    //障碍
                    type = SkinPage.TYPE_ZHANGAI + 1;
                    this._totalDatas = SkinPage.getDataByType(type);
                    break;
            }
            // this._viewUI.panel_skin.vScrollBar.value = 0;
            // this._viewUI.mcTab_Big.selectedIndex = index;
            this._curIndexBig = index;
            //分类数组
            this.classifyData();
            this.selectHandlerSamll(SkinPage.TYPE_ALLSKIN);
        }

        public static getDataByType(type: number): any {
            let datas = SkinConfig.getInstance().datas;
            let curArray = [];
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].type == type) {
                    curArray.push(datas[i]);
                }
            }
            return curArray;
        }

        //分类数组
        private classifyData(): void {
            //分成挑战获得以及金币获得
            this._goldData = [];
            this._changeData = [];
            for (let i = 0; i < this._totalDatas.length; i++) {
                if (this._totalDatas[i].condition[0] == PlayerDataMgr.TYPE_CONSUME_GOLD) {
                    this._goldData.push(this._totalDatas[i]);
                } else {
                    this._changeData.push(this._totalDatas[i]);
                }
            }
        }

        

        private renderItemcb(isGet: boolean, cell: dou.gui.component.PiFuItem, index: number): void {
            if (isGet) {
                //已获得
                cell.init(this._app, this._getData, this._curIndexBig);
            } else {
                //未获得
                cell.init(this._app, this._noGetData, this._curIndexBig);
            }
            cell.setIndex(index);
        }

        //鼠标点击事件
        private onClick(e: LEvent): void {
            switch (e.currentTarget) {
                case this._view.btn_back://返回
                    this._app.uiRoot.general.open(PageDef.START_PAGE);
                    this.close();
                    break;
            }
        }

        public layout(): void {
            super.layout();
        }

        public close(): void {
            if (this._view) {
                MessageManager.off(WXTool.VIDEO_SUCCESS, this, this.onVideo);
                MessageManager.off(WXTool.SHARED_SUCCESS, this, this.shareQun);
                this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_CHANGE, this, this.selectHandlerBig);
                // this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.selectHandler);
                this._app.plyertDataMgr.off(PlayerDataMgr.GOLDCHANGE, this, this.updateUI);
                super.close();
                this._app.sceneRoot.show();
                this._app.showRoot.hide();
            }
        }
    }

}