/** 
 * 小红点检测管理器
*/
module dou.managers {
	export class RedPointCheckMgr {
		private static MIN_CHECKTIME: number = 1000;//最小检测时间间隔(毫秒)
		private _app: GameApp;
		private _url: string;
		private _checkInfos: RedPointCheckInfo[];//检测信息列表
		private _offsetTime: number//剩余检测时间(毫秒)
		private _nextIndex: number;//下一个下标

		constructor(app: GameApp) {
			this._app = app;
			this._url = "tongyong/tishi_2.png";
			this._checkInfos = [];
			this._offsetTime = this._nextIndex = 0;
		}
		/**
		 * 添加检测数据
		 * @param page 父级面板(当面板关闭时，移除检测)
		 * @param parent 父级容器
		 * @param caller 执行域
		 * @param checkFun 检测函数
		 * @param cPos 小气泡中心位置:默认parent右上角(parent.width-5, 5)
		 * @param checkTime 检测间隔时间
		 * @param checkView 指定检测的红点对象
		 * @param args    检测函数的参数
		 */
		public addCheckInfo(page: Page, parent: Sprite, caller: any, checkFun: Function, cPos: Point = null, checkTime: number = 1, checkView: any = null, args?: Array<any>): number {
			cPos = cPos || new Point(parent.width - 38, 0);
			var info: RedPointCheckInfo;
			for (var i: number = 0; i < this._checkInfos.length; i++) {
				info = this._checkInfos[i];
				if (info.checkFun == checkFun && info.parent == parent && info.cPos.x == cPos.x && info.cPos.y == cPos.y) {//已存在
					logd("addCheckInfo", "该检测数据已存在");
					return info.index;
				}
			}
			info = new RedPointCheckInfo();
			info.index = this._nextIndex;
			info.caller = caller;
			info.checkFun = checkFun;
			info.parent = parent;
			info.checkTime = checkTime;
			info.cPos = cPos;
			info.page = page;
			info.checkView = checkView;
			info.args = args;
			// info.imgPoint = new LImage();
			this._checkInfos[this._checkInfos.length] = info;
			this._nextIndex++;
			return info.index;
		}
		/**立即检测指定对象*/
		public checkTargetNow(index: number): void {
			for (var i: number = 0; i < this._checkInfos.length; i++) {
				if (this._checkInfos[i].index != index) continue;
				this._checkInfos[i].curTime = 0;
				this.checkSingleInfo(this._checkInfos[i]);
				break;
			}
		}
		public update(diff: number): void {
			if (this._offsetTime > 0) {
				this._offsetTime -= diff;
				return;
			}
			this._offsetTime = RedPointCheckMgr.MIN_CHECKTIME;
			if (!this._checkInfos.length) return;
			let len: number = this._checkInfos.length;
			for (let i: number = 0; i < len; i++) {
				this.checkSingleInfo(this._checkInfos[i]);
				if (len != this._checkInfos.length) {
					len = this._checkInfos.length;
					i--;
				}
			}
		}
		/*检测单一对象*/
		private checkSingleInfo(info: RedPointCheckInfo): void {
			if (!info) return;
			if (info.page && !info.page.isOpened) {
				this.removeCheckInfo(info.index);
				return;
			}
			if (!info.parent.parent || !info.parent.visible) {//对象看不见
				if (info.imgPoint) info.imgPoint.removeSelf();
				info.curTime = 0;
				return;
			}
			if (info.checkView && (info.checkView.visible || info.checkView.isOpened)) {//对象看不见
				if (info.imgPoint) info.imgPoint.removeSelf();
				info.curTime = 0;
				return;
			}
			info.curTime--;
			if (info.curTime > 0) return;//检测时间未到
			info.curTime = info.checkTime;
			if (info.caller == null || info.checkFun == null) return;
			let handler: Handler = Handler.create(info.caller, info.checkFun, info.args);
			if (!handler.runWith(info.parent)) {//检测条件不足
				if (info.imgPoint) info.imgPoint.removeSelf();
				return;
			}
			if (!info.imgPoint) {
				// if (!info.checkView) {//默认红点图片
					info.imgPoint = new LImage(this._url);
					info.imgPoint.x = info.cPos.x - 10;
					info.imgPoint.y = info.cPos.y + 10;
					// info.imgPoint.scale(0.7,0.7);
				// }
				// else {
				// 	info.imgPoint = new info.checkView();
				// 	info.imgPoint.x = info.cPos.x;
				// 	info.imgPoint.y = info.cPos.y;
				// 	if (info.imgPoint.hasOwnProperty("ani1"))
				// 		info.imgPoint.ani1.play(0, true);
				// }
			}
			if (!info.imgPoint.parent) info.parent.addChild(info.imgPoint);
		}
		/*移除检测数量*/
		private removeCheckInfo(index: number): void {
			var info: RedPointCheckInfo;
			for (var i: number = 0; i < this._checkInfos.length; i++) {
				if (this._checkInfos[i].index != index) continue;
				info = this._checkInfos[i];
				if (!info.imgPoint) continue;
				info.imgPoint.removeSelf();
				info.imgPoint = null;
				this._checkInfos.splice(i, 1);
				break;
			}
		}
	}
	/**检测数据结构*/
	export class RedPointCheckInfo {
		public index: number;					//下标
		public page: Page;						//父级面板
		public parent: Sprite;					//父级容器
		public cPos: Point;						//小气泡中心位置
		public caller: any;						//执行域
		public checkFun: Function;				//检测函数
		public checkTime: number;				//检测间隔时间(秒)
		public curTime: number;					//当前时间
		public imgPoint: any;					//小红点图片
		public checkView: any;					//小红点对象
		public args: Array<any>;                 //检测函数参数
	}
}