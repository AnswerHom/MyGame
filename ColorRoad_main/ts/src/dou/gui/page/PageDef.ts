/**
* name 
*/
module dou.gui.page {
	interface ClassMap {
		[index: string]: Object;
	}

	export class PageDef {
		/**主界面*/
		public static START_PAGE: number = 1;		//开始
		public static RESTART_PAGE: number = 2;		//重新开始
		public static SKIN_PAGE: number = 3;		//皮肤
		public static TOP_PAGE: number = 4;			//排行
		// public static QUN_SORT: number = 5;			//群排行
		public static ADD_SPEED_PAGE: number = 6;	//是否领取开局加速礼包
		public static YOUXI_PAGE: number = 7;		//游戏中
		public static PIPEI_PAGE: number = 8;		//匹配
		public static LOGO_PAGE: number = 9;		//LOGO
		public static SETTING_PAGEA: number = 10; //设置界面
		public static FUHUO_PAGE: number = 11;		//复活界面
		public static RESULT_GOLD_REWARD: number = 12; //本局金币结算
		public static RESULT_RANK: number = 13; //本局排行榜
		public static RESULT_SUPER_SKIN: number = 14; //绝版皮肤
		public static FUHUO_DAOJU_PAGE: number = 15; //复活礼包
		public static TIPS: number = 16; //金币分享提示
		public static PIFUGETTIP: number = 17;//皮肤获得提示
		public static GOLDNOENOUGH: number = 18;//金币获得不足
		public static QIANDAO: number = 19; //签到界面
		public static GETREWARD: number = 20;//获得奖励
		public static TURNTABLEPAGE: number = 21;//转盘界面		
		public static XINGYUNPAGE:number = 22;//幸运女神界面
		public static GETTIPS: number = 23;  //金币和皮肤的获得
		public static SKIN_MAIN_PAGE: number = 24;  //皮肤主界面
		public static WUDI_PAGE: number = 25;  //無敵界面
		public static HELP: number = 999;

		//页面集合
		private static _pageClassMap: ClassMap = {};

		public static init(): void {
			PageDef._pageClassMap[PageDef.START_PAGE] = PageStart;
			PageDef._pageClassMap[PageDef.RESTART_PAGE] = ResultRestart;
			PageDef._pageClassMap[PageDef.SKIN_PAGE] = SkinPage;
			PageDef._pageClassMap[PageDef.TOP_PAGE] = SortScrollPage;
			// PageDef._pageClassMap[PageDef.QUN_SORT] = QunSortScrollPage;
			PageDef._pageClassMap[PageDef.YOUXI_PAGE] = YouXiPage;
			PageDef._pageClassMap[PageDef.PIPEI_PAGE] = PiPeiPage;
			PageDef._pageClassMap[PageDef.LOGO_PAGE] = Logo;
			PageDef._pageClassMap[PageDef.SETTING_PAGEA] = settingPage;
			PageDef._pageClassMap[PageDef.FUHUO_PAGE] = FuHuoPage;
			PageDef._pageClassMap[PageDef.RESULT_GOLD_REWARD] = ResultGoldReward;
			PageDef._pageClassMap[PageDef.RESULT_RANK] = ResultTop;
			PageDef._pageClassMap[PageDef.RESULT_SUPER_SKIN] = ResultSkin;
			PageDef._pageClassMap[PageDef.FUHUO_DAOJU_PAGE] = FuHuoDaoJuPage;
			PageDef._pageClassMap[PageDef.TIPS] = TipsPage;
			PageDef._pageClassMap[PageDef.PIFUGETTIP] = PiFuGetPage;
			PageDef._pageClassMap[PageDef.GOLDNOENOUGH] = GoldGetNoEnough;
			PageDef._pageClassMap[PageDef.QIANDAO] = QianDaoPage;
			PageDef._pageClassMap[PageDef.GETREWARD] = GetRewardPage; 
			PageDef._pageClassMap[PageDef.TURNTABLEPAGE] = TurntablePage;
			PageDef._pageClassMap[PageDef.ADD_SPEED_PAGE] = AddSpeedPage;
			PageDef._pageClassMap[PageDef.XINGYUNPAGE] = XingYunPage;
			PageDef._pageClassMap[PageDef.GETTIPS] = GetTipsPage;
			PageDef._pageClassMap[PageDef.SKIN_MAIN_PAGE] = SkinMainPage;
			PageDef._pageClassMap[PageDef.WUDI_PAGE] = WuDiPage;
		}

		public static getPageClass(key: number): Object {
			return PageDef._pageClassMap[key];
		}
	}
}