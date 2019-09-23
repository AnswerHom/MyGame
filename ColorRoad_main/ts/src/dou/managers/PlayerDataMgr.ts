module dou.managers {
	/**
	* 玩家信息管理器
	*/
	export class PlayerDataMgr extends Laya.EventDispatcher {

		public static EVENT_SKIN_BUY_FLAG: string = "skin_buy_flag";
		public static EVENT_SKIN_USE_FLAG: string = "skin_use_flag";
		public static EVENT_SKIN_CHANGE:string = "skin_change";
		// public static EVENT_QIANDAO: string = "qian_dao";

		//复活币消耗
		static FUHUO_COIN_CHANGE = "fuhuo_coin_change";
		static STARCHAGNE = "STARCHAGNE";
		static SKINCHAGNE = "SKINCHAGNE";
		static GOLDCHANGE = "GOLDCHANGE";
		private _app: GameApp;
		public curScore: number = 0;
		public curStar: number = 0;
		public curGold: number = 0;
		public curTimes: number = 0;
		public saveDataShare: string = '';
		/**播放背景音乐 */
		public static isPlayBgMusic: boolean = true;
		/**播放游戏音效 */
		public static isPlayActionMusic: boolean = true;
		/**是否震动 */
		public static isZhenDong: boolean = true;

		/**各种条件类型 */
		/**累计登陆 */
		static TYPE_TOTAL_LOGIN: number = 1;
		/**累计邀请 */
		static TYPE_TOTAL_INVITE: number = 2;
		/**连续登陆 */
		static TYPE_TOTAL_LOGIN_CONTINUE: number = 3;
		/**连续进行多少次游戏 */
		static TYPE_TOTAL_GAME_TIMES: number = 4;
		/**单局最高分 */
		static TYPE_BEST_SCORE: number = 5;
		/**消耗多少金币 */
		static TYPE_CONSUME_GOLD: number = 6;
		/**观看视频 */
		static TYPE_VIDEO_1: number = 7;
		/**累看50次视频 */
		static TYPE_VIDEO_50: number = 8;
		/**连看7天视频 */
		static TYPE_VIDEO_7: number = 9;
		/**分享次数 */
		static TYPE_SHARE_COUNT: number = 10;
		/**转盘 */
		static TYPE_ZHUANPAN: number = 11;


		/**多少分一个金币 */
		static SCORE_TO_GOLD_RATE: number = 20;
		/**每局获得金币上限 */
		static SCORE_TO_GOLD_MAX: number = 1000;
		/**获得绝版皮肤 邀请玩家数 */
		static SUPER_SKIN_COUNT: number = 3;
		//分享金币增加倍数
		public shareBeiNum: number = 0;
		//本局是否打开过宝箱，防止重复有宝箱弹出
		isOpenBoxCur: boolean = false;
		constructor(app: GameApp) {
			super()
			this._app = app;
			// MessageManager.on(WXTool.VIDEO_SUCCESS, this, this.onVideo);
		}

	
	



	

		/**设置试玩复活按钮出现时间 */
		public setGameReviedRelifeTime(): void {
			let time: number = Laya.timer.currTimer + 86400 * 1000 * 3;
			this._app.localStorageMgr.setItem("GameReviedRelifeTime", time + '');
		}
		public getGameReviedRelifeTime(): number {
			return parseInt(this._app.localStorageMgr.getItem("GameReviedRelifeTime")) || 0;
		}

		/**开局加速礼包 -1、版本开关关了 0、未打开过界面且未使用 1、打开过界面且未使用 2、已使用  */
		public setAddSpeedStatus(value: number) {
			this._app.localStorageMgr.setItem("AddSpeedStatus", value + '');
		}
		public getAddSpeedStatus(): number {
			if (!WXTool.isSwithOpen)
				return -1;
			return parseInt(this._app.localStorageMgr.getItem("AddSpeedStatus")) || 0;
		}



		//存下当前的记录时间，用以判断是否是当前周
		// //1.将当前的时间的零点记录下来，
		// //2.然后判断是周几，如果是周三则减去前两天(差值)的总时间，然后下一次登录的时候拿当前时间判断，两者差值是否有大于(一周的总时间减去之前记录的差值)
		// public setCurWeekTime(): void {
		// 	let oldTime = this.getCurWeekTime();
		// 	let curTime = Sync.getDayZeroTime(this._app.sync.serverTimeByms);  //返回的是秒
		// 	if (!oldTime) {
		// 		this._app.localStorageMgr.setItem("WeekTime", curTime.toString());
		// 	} else {
		// 		let curWeek = Sync.getTimeWeekDay(oldTime * 1000);
		// 		let diffTime = curWeek * (24 * 3600);
		// 		if (curTime >= oldTime + diffTime) {
		// 			let timeStr = curTime.toString();
		// 			this._app.localStorageMgr.setItem("WeekTime", timeStr);
		// 			//达到最新周了，重置所有的签到状态
		// 			for (let i = 0; i < 7; i++) {
		// 				//  修改为直接设置重置
		// 				this._app.localStorageMgr.setItem("WeedKDay" + i, "0");
		// 				//this.setQianBitWeek(i, true);
		// 			}
		// 		}
		// 	}
		// }

		// public getCurWeekTime(): number {
		// 	return parseInt(this._app.localStorageMgr.getItem("WeekTime")) || 0;
		// }

		//存入弹窗计时
		public updateTime(time: number): void {
			this._app.localStorageMgr.setItem("tipTime", time + '');
		}

		//获得弹窗计时
		public getTipTime(): number {
			let time = this._app.localStorageMgr.getItem("tipTime")
			return parseInt(time) || 0;
		}

		//最高分
		public getMaxScore():number{
			return parseInt(this._app.localStorageMgr.getItem("bestScore")) || 0;
		}

		public updateScore(score: number): void {
			this.curScore = score;
			let max = parseInt(this._app.localStorageMgr.getItem("bestScore")) || 0;
			if (score > max) {
				this._app.localStorageMgr.setItem('bestScore', score + '');
				this.setPlayerDataSkin(PlayerDataMgr.TYPE_BEST_SCORE);
			}
			//累计分数值
			let totalCore: number = parseInt(this._app.localStorageMgr.getItem('totalCore')) || 0;
			if (!totalCore) {
				this._app.localStorageMgr.setItem('totalCore', this.curScore + '');
			} else {
				totalCore = totalCore + this.curScore;
				this._app.localStorageMgr.setItem('totalCore', totalCore + '');
			}
		}
		//更新金币数量
		public updateGold(gold: number): void {
			this.curGold = gold;
			this._app.localStorageMgr.setItem('gold', gold + '');
			this.event(PlayerDataMgr.GOLDCHANGE, this.curGold);
			MessageManager.event(WXTool.JINBI);
		}
		//获取金币数量
		public getGold(): number {
			let gold = parseInt(this._app.localStorageMgr.getItem("gold")) || 0;
			this.curGold = gold;
			return gold;
		}

		//进行了多少场游戏
		public updateTimesGame(times: number): void {
			this.curTimes = times;
			this._app.localStorageMgr.setItem('Times', times + '');
			//把判断是否获得皮肤的放在金币结算之后
		}
		//获取游戏场数
		public getTimeGame(): number {
			let times = parseInt(this._app.localStorageMgr.getItem("Times")) || 0;
			this.curTimes = times;
			return times;
		}

		//今天是否签到
		public isQianDao(): boolean {
			let date: Date = new Date();
			let da = this._app.localStorageMgr.getItem('signTime', true) || '';
			let da1 = StringU.substitute('{0}{1}', date.getFullYear(), date.getUTCDay());
			return da == da1;
		}
		//出来签到
		public sign(): void {
			let date: Date = new Date();
			let da1 = StringU.substitute('{0}{1}', date.getFullYear(), date.getUTCDay());
			this._app.localStorageMgr.setItem('signTime', da1, true);
		}

		public getTuSiJi(): string {
			let da = parseInt(this._app.localStorageMgr.getItem('tusiji_index', true)) || 0;
			return da.toString();
		}

		public setTuSiJi(index): void {
			this._app.localStorageMgr.setItem('tusiji_index', index, true);
			this.event(PlayerDataMgr.SKINCHAGNE, index)
		}

		public isBuySkinFlag(index: number): boolean {
			//是否皮肤购买
			let da = parseInt(this._app.localStorageMgr.getItem('skin_active' + index, true)) || 0;
			return da == 1;
		}

		//设置皮肤购买标志
		public setSkinActive(index): void {
			this._app.localStorageMgr.setItem('skin_active' + index, "1", true);
			this.event(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, index);
			this.event(PlayerDataMgr.EVENT_SKIN_CHANGE);
			//设立皮肤获得弹窗,除了游戏中不弹，其他地方都弹
			let totalData = SkinConfig.getInstance().datas;
			let curData;
			for (let i = 0; i < totalData.length; i++) {
				if (totalData[i].id == index) {
					curData = totalData[i];
					break;
				}
			}
			if (!curData) return;
			if (WXTool._state != SceneRoot.STATUS_START) {
				//处于游戏状态中不弹窗
				if (WXTool.isShare) {
					let piFuGetPage = this._app.uiRoot.general.getPage(PageDef.PIFUGETTIP);
					this._app.uiRoot.general.open(PageDef.PIFUGETTIP, (piFuGetPage: dou.gui.page.PiFuGetPage) => {
						piFuGetPage.setData(curData);
					})
				}

			}
		}
		//获取皮肤购买标志
		public getSkinActive(index): string {
			return this._app.localStorageMgr.getItem('skin_active' + index, true);
		}

		//获取使用球皮肤
		public getUseSkinIndex(): number {
			return parseInt(this._app.localStorageMgr.getItem('skin_use', true));
		}

		//设置球皮肤使用索引
		public setUseSkinIndex(index: number): void {
			// 还未购买就无法使用
			if (!this.isBuySkinFlag(index)) {
				return;
			}
			this._app.localStorageMgr.setItem('skin_use', index.toString(), true);
			this.event(PlayerDataMgr.EVENT_SKIN_USE_FLAG, index);
		}

		/**是否新玩家 */
		public getIsNew(): number {
			return parseInt(this._app.localStorageMgr.getItem('new_player')) || 0;
		}
		public setIsNew(): void {
			this._app.localStorageMgr.setItem('new_player', '1');
		}

		//获取使用障碍皮肤
		public getUseObstacleSkinIndex(): number {
			return parseInt(this._app.localStorageMgr.getItem('skin_Obstacle_use', true));
		}

		//设置障碍皮肤使用索引
		public setUseObstacleSkinIndex(index: number): void {
			//还未购买就无法使用
			if (!this.isBuySkinFlag(index)) {
				return;
			}
			this._app.localStorageMgr.setItem('skin_Obstacle_use', index.toString(), true);
			this.event(PlayerDataMgr.EVENT_SKIN_USE_FLAG, index);
			this.event(PlayerDataMgr.EVENT_SKIN_CHANGE);
		}

		//获取使用拖尾皮肤
		public getUseTuoWeiSkinIndex(): number {
			return parseInt(this._app.localStorageMgr.getItem('skin_tuoWei_use', true));
		}

		//设置拖尾皮肤使用索引
		public setUseTuoWeiSkinIndex(index: number): void {
			//还未购买就无法使用
			if (!this.isBuySkinFlag(index)) {
				return;
			}
			this._app.localStorageMgr.setItem('skin_tuoWei_use', index.toString(), true);
			this.event(PlayerDataMgr.EVENT_SKIN_USE_FLAG, index);
		}

		//获取复活币数量
		public getRebornCoinCount(): number {
			return parseInt(this._app.localStorageMgr.getItem('rebornCoin_count', true));
		}
		//设置复活币数量
		public setRebornCoinCount(count: number): void {
			count = !count ? 0 : count;
			count = count > 10 ? 10 : count;
			//如果获得复活币，则弹出获得界面
			let oldCount = this.getRebornCoinCount();
			if (count > oldCount) {
				//大于相当于获得了复活币
				this._app.uiRoot.general.open(PageDef.GETREWARD, (page: dou.gui.page.GetRewardPage) => {
					//传入差值
					page.setData(0, count - oldCount);
				})
			}
			this._app.localStorageMgr.setItem('rebornCoin_count', count.toString(), true);
			this.event(PlayerDataMgr.FUHUO_COIN_CHANGE);
		}

		//获取邀请已加的复活币
		public getInviteAddCount(): number {
			return parseInt(this._app.localStorageMgr.getItem('inviteAdd_count', true));
		}
		//设置邀请已加的复活币
		public setInviteAddCount(count: number): void {
			this._app.localStorageMgr.setItem('inviteAdd_count', count.toString(), true);
		}

		//获取邀请已加的礼包复活币
		public getLibaoAddCount(): number {
			return parseInt(this._app.localStorageMgr.getItem('libaoAdd_count', true));
		}
		//设置邀请已加的礼包复活币
		public setLibaoAddCount(count: number): void {
			this._app.localStorageMgr.setItem('libaoAdd_count', count.toString(), true);
		}
		//获取转盘CD
		public getTurntableCD(): number {
			return parseInt(this._app.localStorageMgr.getItem('turntable_CD', true));
		}
		//设置转盘CD
		public setTurntableCD(value: number) {
			this._app.localStorageMgr.setItem('turntable_CD', value.toString(), true);
		}
		//获取免费转盘时间
		public getTurntableTime(): number {
			return parseInt(this._app.localStorageMgr.getItem('turntable_time', true));
		}
		//设置免费转盘日期
		public setTurntableTime(value: number) {
			this._app.localStorageMgr.setItem('turntable_time', value.toString(), true);
		}

		//达到要求自动获得皮肤
		setPlayerDataSkin(type): void {
			let temp = SkinConfig.getInstance().datas;
			//根据type获得对应的数据
			let curData = [];
			for (let i = 0; i < temp.length; i++) {
				if (temp[i].condition[0] == type) {
					curData.push(temp[i]);
				}
			}
			switch (type) {
				case PlayerDataMgr.TYPE_TOTAL_LOGIN:
					//累计登陆
					let str: String = this._app.localStorageMgr.getItem('loginTime');  //登陆时间
					let loginNum = str.split('&').length - 1;
					this.isCanCondition(curData, loginNum);
					break
				case PlayerDataMgr.TYPE_TOTAL_INVITE:
					//累计邀请
					//分享次数相当于累计邀请多少人
					WXTool.getShareCount(() => {
						this.isCanCondition(curData, WXTool.sharecount);
					})
					break
				case PlayerDataMgr.TYPE_TOTAL_LOGIN_CONTINUE:
					//连续登陆
					let strLogin = this._app.localStorageMgr.getItem('continueLoginTime');
					let strLoginArray = strLogin.split('&');
					let timeLoginContinue = strLoginArray.length;
					this.isCanCondition(curData, timeLoginContinue);
					break
				case PlayerDataMgr.TYPE_TOTAL_GAME_TIMES:
					//进行多少次游戏
					let times = this.getTimeGame();
					this.isCanCondition(curData, times);
					break
				case PlayerDataMgr.TYPE_BEST_SCORE:
					// 单局最高分(原)
					let f = parseInt(this._app.localStorageMgr.getItem("bestScore"));
					if (!f) f = 0;
					let bestCore = f  //单局分数 拿的是历史分数来判断
					this.isCanCondition(curData, bestCore);
					break
				case PlayerDataMgr.TYPE_VIDEO_1:
					//看一次视频直接添加，不用写
					break
				case PlayerDataMgr.TYPE_VIDEO_50:
					//累看50次视频
					let v_times = parseInt(this._app.localStorageMgr.getItem("TYPE_VIDEO_50")) || 0;
					console.log("记录连续观看视频次数111111111111", v_times);
					v_times++;
					console.log("记录连续观看视频次数22222222222222", v_times);
					this._app.localStorageMgr.setItem("TYPE_VIDEO_50", v_times + '');
					this.isCanCondition(curData, v_times);
					break
				case PlayerDataMgr.TYPE_VIDEO_7:
					//连看7天视频
					let lianKan = this._app.localStorageMgr.getItem('TYPE_VIDEO_7');
					let lianKanArray = lianKan.split('&');
					let lianKanTime = lianKanArray.length;
					this.isCanCondition(curData, lianKanTime);
					break
				case PlayerDataMgr.TYPE_ZHUANPAN:
					// 转盘转到直接添加进去，不用写

					break
				case PlayerDataMgr.TYPE_SHARE_COUNT:
					//分享到群的次数  因为无法用获得群的，点击就算成功分享到群
					let shareCount = this.getShareQunCount();
					this.isCanCondition(curData, shareCount);
					break;
			}
		}

		

		//皮肤的分享


		//当前类型的数据，以及判断条件
		private isCanCondition(datas: any, condition): void {
			for (let i = 0; i < datas.length; i++) {
				if (this.isBuySkinFlag(datas[i].id)) {
					//已经拥有了
					continue;
				} else {
					//还未拥有的，判断
					if (condition >= datas[i].condition[1]) {
						console.log("获得皮肤啦！！！！！", datas,condition);
						//满足条件的,直接设置成已经购买的
						this.setSkinActive(datas[i].id);
					} else {
						continue;
					}
				}
			}
		}

		//是否设置过获得基础皮肤
		public getBaseSkin(): number {
			return parseInt(this._app.localStorageMgr.getItem('bask_skin', true));
		}
		//设置基础皮肤
		public setBaseSkin(value: number) {
			this._app.localStorageMgr.setItem('bask_skin', value.toString(), true);
		}

		//点击分享到群次数
		public getShareQunCount(): number {
			return parseInt(this._app.localStorageMgr.getItem('shareQun', true)) || 0;
		}

		//设置分享到群次数
		public setShareQunCount(value: number) {
			console.log("设置分享到群次数", value);
			this._app.localStorageMgr.setItem('shareQun', value.toString(), true);
			//检测是否获得
			this.setPlayerDataSkin(PlayerDataMgr.TYPE_SHARE_COUNT);
		}

		//向本地缓存管理器存登陆天数
		setDataIntoLocal(): void {
			//记录当前登陆的零点时间  累计登陆
			let curZeroTime = Sync.getDayZeroTime(this._app.sync.serverTimeByms).toString();   //返回的时间是秒
			let getLoginTime = this._app.localStorageMgr.getItem('loginTime')
			if (!getLoginTime) {
				this._app.localStorageMgr.setItem("loginTime", curZeroTime + "");
			} else {
				let strlogin = getLoginTime;
				let strLoinArray = strlogin.split('&');
				let lastLoginTime = strLoinArray[strLoinArray.length - 1];
				if (lastLoginTime != curZeroTime) {
					//不要重复记录                
					strlogin += '&';
					strlogin += curZeroTime;
					this._app.localStorageMgr.setItem("loginTime", strlogin + "");
				}
			}
			//连续登陆
			let getContinueTime = this._app.localStorageMgr.getItem('continueLoginTime');
			if (!getContinueTime) {
				this._app.localStorageMgr.setItem("continueLoginTime", curZeroTime + "");
			} else {
				let str = getContinueTime;
				let strArray = str.split("&");
				let lastTime = strArray[strArray.length - 1];
				//拿最后一次记录的时间进行比较
				if (parseInt(lastTime) - this._app.sync.serverTimeBys >= Sync.DAY_SECONDS * 1000) {
					//间隔大于一天,清空掉重新记录
					let strZero = curZeroTime + "";
					this._app.localStorageMgr.setItem("continueLoginTime", strZero);
				} else {
					//在最后面存入数值
					if (curZeroTime != lastTime) {
						//不要重复记录
						str += '&';
						str += curZeroTime;
						this._app.localStorageMgr.setItem("continueLoginTime", str + "");
					}
				}
			}
		}

		//判断是否今天第一次登陆
		checkFirstLogin(): void {
			let arr = this._app.localStorageMgr.getItem('loginTime');
			let login_arr = arr ? arr.split('&') : [0];
			let login_time = ~~login_arr[login_arr.length - 1];
			let day_time = Sync.getDayZeroTime(this._app.sync.serverTimeByms);
			let count = this._app.plyertDataMgr.getRebornCoinCount();
			if (login_time != day_time || !login_time) {
				this._app.plyertDataMgr.setRebornCoinCount(count + 1);
			}
		}

		//是否使用幸运女神皮肤
		isUseLuckySkin(): number {
			return parseInt(this._app.localStorageMgr.getItem("is_use_lucky_skin")) || 0;
		}

		//设置是否使用幸运女神皮肤
		setIsUseLuckySkin(value: number) {
			this._app.localStorageMgr.setItem('is_use_lucky_skin', value.toString(), true);
		}

		//幸运女神皮肤
		getUseLuckSkin(): number {
			return parseInt(this._app.localStorageMgr.getItem('lucky_skin')) || 0;
		}

		//设置幸运女神皮肤
		setUseLuckSkin(index: number) {
			this._app.localStorageMgr.setItem('lucky_skin', index.toString(), true);
		}

		//----------------------------签到相关-----------
		public static EVENT_QIANDAO: string = "qian_dao";
		public static DayDatas: any = [500, 500, 500, 500, 500, 500, 500];
		public static goldDays = [0, 1, 2, 3, 4, 5, 6];

		//获得签到的时间
		public getSignTime(): number {
			return parseInt(this._app.localStorageMgr.getItem("SignTime")) || 0;
		}

		//设置签到的时间
		public setSignTime(time: number): void {
			this._app.localStorageMgr.setItem("SignTime", time.toString());
			this.event(PlayerDataMgr.EVENT_QIANDAO);
		}

		//设置补签
		public setBuQian(): void {
			let timeStr = this._app.sync.serverTimeByms;
			this._app.localStorageMgr.setItem("BuQian", timeStr.toString());
			this.event(PlayerDataMgr.EVENT_QIANDAO);
		}

		//获得补签
		public getBuQian(): number {
			return parseInt(this._app.localStorageMgr.getItem("BuQian")) || 0;
		}

		//获得每周的签到标志
		public getQianBitWeek(index: number): number {
			return parseInt(this._app.localStorageMgr.getItem("WeedKDay" + index)) || 0;
		}

		//设置每周的签到标志
		public setQianBitWeek(index: number, bClear = false): void {
			let status = bClear ? "0" : "1"
			this._app.localStorageMgr.setItem("WeedKDay" + index, status);
			this.event(PlayerDataMgr.EVENT_QIANDAO);
		}

		//获得每周的领取标志
		public getLingQuWeek(index: number): number {
			return parseInt(this._app.localStorageMgr.getItem("WeedKDayLingQu" + index)) || 0;
		}

		//设置每周的领取标志
		public setLingQuWeek(index: number, bClear = false,isdouble:boolean): void {
			let status = bClear ? "0" : "1"
			this._app.localStorageMgr.setItem("WeedKDayLingQu" + index, status);
			//根据index 设立获取的东西
			this.setQianDaoReward(index,isdouble);
			this.event(PlayerDataMgr.EVENT_QIANDAO);
		}

		//设置签到奖励
		setQianDaoReward(index,isdouble): void {
			let getIndex = isdouble ? PlayerDataMgr.DayDatas[index]*2:PlayerDataMgr.DayDatas[index];
			let type: number;
			if (index == 0 || index == 2 || index == 3 || index == 5) {
				//星期一三五 金币
				type = 1;
			} else {
				//复活币
				type = 3;
			}
			this._app.uiRoot.general.open(PageDef.GETTIPS, (page: dou.gui.page.GetTipsPage) => {
				page.setData(getIndex, type);
			});
		}

		//签到为周的检测
		public setCurWeekTime(): void {
			let oldTime = this.getCurWeekTime();
			let curTime = Sync.getDayZeroTime(this._app.sync.serverTimeByms);  //返回的是秒
			if (!oldTime) {
				this._app.localStorageMgr.setItem("WeekTime", curTime.toString());
			} else {
				let curWeek = Sync.getTimeWeekDay(oldTime * 1000);
				let diffTime = curWeek * (24 * 3600);
				if (curTime >= oldTime + diffTime) {
					let timeStr = curTime.toString();
					this._app.localStorageMgr.setItem("WeekTime", timeStr);
					//达到最新周了，重置所有的签到状态
					for (let i = 0; i < 7; i++) {
						//  修改为直接设置重置
						this._app.localStorageMgr.setItem("WeedKDay" + i, "0");
					}
				}
			}
		}

		public getCurWeekTime(): number {
			return parseInt(this._app.localStorageMgr.getItem("WeekTime")) || 0;
		}

		//签到为不连续的检测
		public setContinueBits(): void {
			//当所有的都签到了，并且签到的时间不是今天就可以重置了
			let curZeroTime = Sync.getDayZeroTime(this._app.sync.serverTimeBys * 1000);
			let curTime = this.getSignTime();
			let signCount = 0;
			let maxDay = dou.gui.page.QianDaoPage.MAX_DAYS;
			for (let i = 0; i < maxDay; i++) {
				let isSign = this.getQianBitWeek(i);
				if (isSign) {
					signCount++;
				}
			}
			if (signCount == maxDay && curTime != curZeroTime) {
				for (let i = 0; i < maxDay; i++) {
					this._app.localStorageMgr.setItem("WeedKDay" + i, "0");
					this._app.localStorageMgr.setItem("WeedKDayLingQu" + i, "0");
					// this._app.plyertDataMgr.setSignTime(0);
				}
			}
		}


		getAvatar(id): SkinData {
			let datas = SkinConfig.getInstance().datas;
			let data = null;
			for (let i = 0; i < datas.length; i++) {
				if (datas[i].id == id) {
					data = datas[i];
					break;
				}
			}
			return data;
		}

		//获取皮肤条件描述
		public static getSkinDesc(type:number, num:number):string{
			if (num == 0){
				return "";
			}
			// let index:number = confirm[2];
			switch(type){
				case SkinData.CONDITION_TYPE_ONE:
					return num+"金币";
				case SkinData.CONDITION_TYPE_TWO:
					return "未知类型";
				case SkinData.CONDITION_TYPE_THREE:
					return "邀请" + num + "人";
				default :
					return "未知类型";
			}
		}

		//检测皮肤条件是否满足
		public CheckSkinCondition(condition:number[], showTips:boolean = false):boolean{
			if (!condition || condition.length != 2){
				//无需条件，就当解锁了皮肤
				return true;
			}

			let type:number = condition[0];
			let num:number = condition[1];
			// let index:number = confirm[2];
			switch(type){
				case SkinData.CONDITION_TYPE_ONE:
					let hasNum:number = this.getGold();
					if (hasNum < num){
						if (showTips){
							console.log("金币不足");
						}
						return false;
					}
					break;
				case SkinData.CONDITION_TYPE_TWO:
					return false;
				case SkinData.CONDITION_TYPE_THREE:
					if (WXTool.sharecount < num){
						if (showTips){
							console.log("邀请人数不够");
						}
						return false;
					}
					break;
				default :
					return false;
			}

			return true;
		}
	}
}