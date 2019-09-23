/**
* UI
*/
module dou {
	export class UIRoot extends dou.gui.base.Container {
		//UI模式
		public static MODE_PC: number = 0;//PC模式
		public static MODE_HORIZONTAL: number = 1;//横屏模式
		public static MODE_VERTICAL: number = 2;//竖屏模式

		//热键枚举
		public static KEYCODE_A: number = 65;//A键
		public static KEYCODE_Q: number = 81;//Q键
		public static KEYCODE_Z: number = 90;//Z键
		public static KEYCODE_V: number = 86;//V键
		public static KEYCODE_ESC: number = 27;//eac键
		public static KEYCODE_M: number = 77;//M键
		public static KEYCODE_SPAPCE: number = 32;//Space键
		public static KEYCODE_TAB: number = 9;//Tab键
		public static KEYCODE_ENTER: number = 13;//enter键
		public static KEYCODE_UP: number = 38;//↑
		public static KEYCODE_DOWN: number = 40;//↓
		public static KEYCODE_LEFT: number = 37;//←
		public static KEYCODE_RIGHT: number = 39;//→


		// 初始化事件
		public static INIT: string = 'init';
		// 顶层ui
		private _topUI: gui.TopUI;
		// 一般UI层
		private _generalUI: gui.GeneralUI;
		// HUD层
		private _HUD: gui.HUD;

		get top(): gui.TopUI {
			return this._topUI;
		}

		get general(): gui.GeneralUI {
			return this._generalUI;
		}

		get HUD(): gui.HUD {
			return this._HUD;
		}

		private _mouseLock: boolean = false;
		set mouseLock(v: boolean) {
			this._mouseLock = v;
		}

		private _needAssetReady:boolean = false;
		private _appUIroot:GameApp;
		constructor(app: GameApp) {
			super(app);
			this._appUIroot = app;
			MessageManager.on(WXTool.LOADOK,this,this.onInit);
			if(isDebug)
				this.onInit();

		}

		private onInit(){
			PageDef.init();
			this._preLoad = this._app.preLoad;
			// 顶层ui
			this._topUI = new gui.TopUI(this._appUIroot);
			// 一般UI层
			this._generalUI = new gui.GeneralUI(this._appUIroot);
			// HUD层
			this._HUD = new gui.HUD(this._appUIroot);

			this.addChild(this._HUD);
			this.addChild(this._generalUI);
			this.addChild(this._topUI);
			this.loadingWithoutLogin();
			WXTool.login();
			NumGroup.init();

			//初始化更新签到记录数据
			this._app.plyertDataMgr.setCurWeekTime();
			if (PlayerDataMgr.isPlayBgMusic) {
                // Laya.SoundManager.playMusic('scene/music/bgm_low.mp3');
				console.log("播放背景音乐")
            }
		}

		private loadingWithoutLogin():void{
			// 加载必要素材
			let assetsLoader = new AssetsLoader();
			assetsLoader.load([Path.uiAtlas + "tongyong.atlas",Path.skin+"skin_config.txt"], Handler.create(this, this.onNeedAssetLoaded));
		}


		onNeedAssetLoaded(): void {
			this._needAssetReady = true;			
			SkinConfig.init(Laya.loader.getRes(Path.skin+"skin_config.txt"));
			this.checkReady();
		}

		// 加载素材
		private _loadUrls = [
			'ui/tongyon/image_6.png',
			'ui/tongyon/image_65.png',
		];

		private checkReady():void{
			if(this._needAssetReady){
				//可以进游戏了
				this.event(UIRoot.INIT);
				// 加载必要素材
				// var assetsLoader = new AssetsLoader();
				// assetsLoader.load(this._loadUrls, Handler.create(this, this.onAssetLoadedComplete));
				this.general.open(PageDef.LOGO_PAGE);
			}
		}
		private onAssetLoadedComplete():void{
			// DisplayU.initMask();
		}
		/**
		 * 打开某界面
		 * @param pageid 界面id
		 * @param page_type 界面类型 0二级 1顶层 2HUD
		 */
		private onOpenPanel(pageid: number, container: gui.base.PageContainer): void {
			container.open(pageid);
		}

		/**
		 * 关闭某界面
		 * @param pageid 界面id
		 * @param page_type 界面类型 0二级 1顶层 2HUD
		 */
		private onClosePanel(pageid: number, container: gui.base.PageContainer): void {
			if (pageid == 0) {
				container.closeAll();
			}
			else {
				container.close(pageid);
			}
		}

		// 操作返回结果
		public onOperateResult(msg: any): void {
			
		}

		/**
		 * 是否开启状态 
		 * @param page_id
		 * @return 
		 * 
		 */		
		public isOpened(page_id:number):boolean
		{
			return this._generalUI.isOpened(page_id);
		}


		//打开排行榜
		public openSortPage(shareTicket: string = null): void {
			this._HUD.close(PageDef.RESTART_PAGE);
			if (shareTicket)
				this.general.close(PageDef.TOP_PAGE);
			// else
			// 	this.general.close(PageDef.QUN_SORT);
			let sortID = /*shareTicket ? PageDef.QUN_SORT :*/ PageDef.TOP_PAGE;
			this._app.plyertDataMgr.saveDataShare = shareTicket;
			console.log('this._app.plyertDataMgr.saveDataShare', this._app.plyertDataMgr.saveDataShare)
			let sortP: any = this.general.getPage(sortID);
			if (sortP && sortP.isOpened) {
				console.log('yes')
				sortP.setData(shareTicket);
			} else {
				console.log('no')
				this.general.open(sortID);
			}
		}

		private _preLoad: PreLoad;
		// 预加载素材
		private _preLoadUrls = [

		];
		
		//进入游戏了
		private enterGame():void{
			this._preLoad.on(LEvent.CHANGED, this, this.checkLoad);
			for (let url of this._preLoadUrls) {
				let asset = RefAsset.Get(url, false);
				if (!asset || !asset.parseComplete) {
					this._preLoad.load(url, RefAsset.GENRAL);
				}
			}
		}
		private checkLoad(): void {
			let loadCount = this._preLoad.loadCount;
			let totalCount = this._preLoad.totalCount;
			if (loadCount == totalCount) {
				this._preLoad.off(LEvent.CHANGED, this, this.checkLoad);
				for (let url of this._preLoadUrls) {
					this._preLoad.clear(url);
				}
			}
		}

		public resize(w: number, h: number): void {
			this._clientWidth = w;
			this._clientHeight = h;
			this._topUI.resize(w, h);
			this._generalUI.resize(w, h);
			this._HUD.resize(w, h);
		}

		private onKeyDown(e: LEvent): void {

		}

		update(diff: number): void {
			this._topUI.checkQueue();

		}

		/*按下Enter键后*/
		private onKeyEnter(): void {
			!this._topUI.enter() && this._generalUI.enter();
		}

		/*按下Esc键后*/
		private onKeyESC(): void {
			!this._topUI.cancel() && this._generalUI.cancel();
		}		
	}
}