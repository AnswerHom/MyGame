module dou.gui.page {
	let TYPE_BALL: number = 1//球
	let TYPE_TUOWEI: number = 2//拖尾
	let TYPE_ZHANGAI: number = 3//障碍
	export class SkinMainPage extends dou.gui.base.Page {
		public static EVENT_SKILL_CELL_CLICK: string = "EVENT_SKILL_CELL_CLICK";
		
		private _viewUI: ui.PiFuUI;
		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this._isModal = false;
			this._asset = [Path.uiAtlas + "pifu.atlas"];
		}

		static TAB_TYPE_ONE: number = 0;
		static TAB_TYPE_TWO: number = 1;
		static TAB_NUM: number = 2;

		private _tabArr: Array<Button>;
		private _curTabIndex: number = -1;

		// private _curSelectSkin:SkinCellData;	//当前选中皮肤
		// private _curSelectTW:SkinCellData;		//当前选中拖尾
		private _curSelectData: Array<SkinCellData>;

		// 页面初始化函数
		protected init(): void {
			this._view = this._viewUI = new ui.PiFuUI();
			this.addChild(this._view);

			this._tabArr = new Array<Button>(SkinMainPage.TAB_NUM);
			this._tabArr[0] = this._viewUI.btn_skin;
			this._tabArr[1] = this._viewUI.btn_eff;

			this._curSelectData = new Array<SkinCellData>(SkinMainPage.TAB_NUM);
			this._viewUI.list_skin.itemRender = SkinCell;
			this._viewUI.list_skin.vScrollBarSkin = "";
			this._viewUI.list_skin.scrollBar.elasticDistance = 200;
		}

		protected onOpen(): void {
			super.onOpen();

			this.tabIndex = SkinMainPage.TAB_TYPE_ONE;
			this.onTabChange(this.tabIndex);

			this.addListener = true;
		}

		private set addListener(isAdd: boolean) {
			if (isAdd) {
				this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.updateList);
				this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_USE_FLAG, this, this.updateList);
				this.on(SkinMainPage.EVENT_SKILL_CELL_CLICK, this, this.onClickSkinCell);
			} else {
				this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.updateList);
				this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_USE_FLAG, this, this.updateList);
				this.off(SkinMainPage.EVENT_SKILL_CELL_CLICK, this, this.onClickSkinCell);
			}
			// DisplayU.setMouseListener(this._viewUI.btn_back, isAdd, this, this.onclick);
			DisplayU.setMouseListener(this._viewUI.btn_close, isAdd, this, this.onclick);
			for (let i: number = 0; i < this._tabArr.length; i++) {
				DisplayU.setMouseListener(this._tabArr[i], isAdd, this, this.onClickTab);
			}
		}

		private onClickTab(e: LEvent): void {
			let index: number = this._tabArr.indexOf(e.currentTarget as Button);
			if (index == -1) {
				return;
			}
			this.tabIndex = index;
		}

		//tab
		private get tabIndex(): number {
			return this._curTabIndex;
		}

		private set tabIndex(index: number) {
			if (this._curTabIndex == index) {
				return;
			}
			this._curTabIndex = index;
			for (let i: number = 0; i < this._tabArr.length; i++) {
				this._tabArr[i].selected = i == index;
			}
			this.onTabChange(index);
		}

		private onTabChange(index: number): void {
			this.updateList();
		}

		private updateList(): void {
			let skinArr: SkinData[] = SkinConfig.getInstance().getSkinListByType(this.tabIndex + 1);
			let datas: SkinCellData[] = [];
			let id: number = this._curSelectData[this.tabIndex] ? this._curSelectData[this.tabIndex].skinData.id : (this.tabIndex == SkinMainPage.TAB_TYPE_ONE ? this._app.plyertDataMgr.getUseSkinIndex() : this._app.plyertDataMgr.getUseTuoWeiSkinIndex());
			for (let i: number = 0; i < skinArr.length; i++) {
				let da: SkinCellData = new SkinCellData();
				da.app = this._app;
				da.skinData = skinArr[i];
				da.index = i;
				da.skinPage = this;
				da.isSelect = da.skinData.id == id;
				datas.push(da);

				if (da.isSelect) {
					this._curSelectData[this.tabIndex] = da;
				}

			}
			this._viewUI.list_skin.array = datas;
		}

		private onClickSkinCell(data: SkinCellData): void {
			if (this._curSelectData[this.tabIndex]) {
				let skincell: SkinCell = this._viewUI.list_skin.getCell(this._curSelectData[this.tabIndex].index) as SkinCell;
				if (skincell) skincell.setSelect(false);
				let skincellda: SkinCellData = this._viewUI.list_skin.getItem(this._curSelectData[this.tabIndex].index);
				skincellda.isSelect = false;
			}
			this._curSelectData[this.tabIndex] = data;
			if (this._curSelectData[this.tabIndex]) {
				let skincell: SkinCell = this._viewUI.list_skin.getCell(this._curSelectData[this.tabIndex].index) as SkinCell;
				if (skincell) skincell.setSelect(true);
			}
		}

		private onclick(e: LEvent): void {
			switch (e.currentTarget) {
				case this._viewUI.btn_close:
					this._app.uiRoot.general.open(PageDef.START_PAGE);
					this.close();
					break;
			}
		}


		public close(): void {
			if (this._view) {
				this.addListener = false;
			}
			super.close();
		}
	}

	//皮肤格子
	export class SkinCell extends ui.component.PiFuItemUI {
		constructor() {
			super();
			this.img_skin.width = 128;
			this.img_skin.height = 128;
		}

		//数据
		private _data: SkinCellData;
		public get dataSource(): any {
			return this._data;
		}

		public set dataSource(data: any) {
			this._data = data;
			if (this._data) {
				this.open();
			} else {
				this.close();
			}
		}

		private _isOpen: boolean = false;
		private open(): void {
			if (!this._isOpen) {
				this._isOpen = true;
				this.img_bg.on(LEvent.CLICK, this, this.onclick);
				this.box_info.on(LEvent.CLICK, this, this.onclick);
			}
			this.updateView();
		}

		private updateView(): void {
			this.img_skin.skin = 'scene/pifu/icon/' + this._data.skinData.avatar + (this._data.skinData.type == 2 ? '.jpg' : '.png');
			this.img_lock.visible = !this._data.app.plyertDataMgr.isBuySkinFlag(this._data.skinData.id);
			this.txt_num.text = PlayerDataMgr.getSkinDesc(this._data.skinData.c_type, this._data.skinData.condition);
			this.img_gou.visible = this._data.app.plyertDataMgr.getUseSkinIndex() == this._data.skinData.id;
			this.img_use.visible = this.img_gou.visible;
			this.img_get.visible = !this.img_lock.visible && !this.img_use.visible;
			this.box_info.visible = this.img_lock.visible;

			this.setSelect(this._data.isSelect);
		}

		public setSelect(val: boolean): void {
			this._data.isSelect = val;
			//处理选中资源
			this.img_select.visible = val;
		}

		private onclick(e: LEvent): void {
			let app_game = this._data.app;
			let skinData = this._data.skinData;
			if (app_game.plyertDataMgr.isBuySkinFlag(skinData.id)) {
				switch (skinData.type) {
					case TYPE_BALL://球
						app_game.plyertDataMgr.setUseSkinIndex(skinData.id);
						app_game.showRoot.changeBallSkin(skinData.avatar);
						break;
					case TYPE_TUOWEI://拖尾
						app_game.plyertDataMgr.setUseTuoWeiSkinIndex(skinData.id);
						app_game.showRoot.changeTuoWeiSkin(skinData.avatar)
						break;
					case TYPE_ZHANGAI://障碍
						app_game.plyertDataMgr.setUseObstacleSkinIndex(skinData.id);
						break;
				}
				app_game.sceneRoot.mainPlayer.playerScript.reset();
			}
			if (e.currentTarget == this.img_bg) {
				this._data.skinPage.event(SkinMainPage.EVENT_SKILL_CELL_CLICK, this._data);
				return;
			}
			else if (e.currentTarget == this.box_info) {
				//判断条件
				let condition = skinData.condition[1];
				let curGold = app_game.plyertDataMgr.getGold();
				if (curGold >= condition) {
					curGold -= condition;
					app_game.plyertDataMgr.updateGold(curGold);
					app_game.plyertDataMgr.setSkinActive(skinData.id);
					//购买成功
					let page: dou.gui.page.PiFuGetPage = app_game.uiRoot.general.getPage(PageDef.PIFUGETTIP) as dou.gui.page.PiFuGetPage;
					if (!page) {
						app_game.uiRoot.general.open(PageDef.PIFUGETTIP, (page: dou.gui.page.PiFuGetPage) => {
							page.dataSource = { isTurntable: false };
							page.setData(skinData);
						});
					}
				} else {
					//金币不足
					app_game.uiRoot.general.open(PageDef.GOLDNOENOUGH);
				}
				return;
			}
		}

		private close(): void {
			if (this._isOpen) {
				this._isOpen = false;
				this.off(LEvent.CLICK, this, this.onclick);
			}
			this._data = null;
		}

		public destroy(destroyChild: boolean = true): void {
			this.close();
			super.destroy(destroyChild);
		}
	}

	//格子数据
	export class SkinCellData {
		app: GameApp;
		skinPage: SkinMainPage;
		skinData: SkinData;
		index: number;
		isSelect: boolean;
		constructor() {
		}
	}
}