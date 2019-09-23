/**
* 同步时间 
*/
module dou {
	export class Sync extends Laya.EventDispatcher{
		/**同步服务器时间*/
		public static TIME_SYNC:string = "time_sync";

		/**
		 * 星期日 
		 */
		public static SUNDAY: number = 0;
		/**
		 * 星期一 
		 */
		public static MONDAY: number = 1;
		/**
		 * 星期二 
		 */
		public static TUESDAY: number = 2;
		/**
		 * 星期三 
		 */
		public static WEDNESDAY: number = 3;
		/**
		 * 星期四 
		 */
		public static THURSDAY: number = 4;
		/**
		 * 星期五 
		 */
		public static FRIDAY: number = 5;
		/**
		 * 星期六 
		 */
		public static SATURDAY: number = 6;

		/**
		 * 一天多少秒
		 */
		public static DAY_SECONDS: number = 86400;
		public static UTC_SECONDS: number = 28800;

		/*服务器时间 单位秒*/
		private _serverTime: number = 0;
		/*服务器时间同步的时间单位毫秒*/
		private _ost: number = 0;
		/*服务器运行时间 单位毫秒*/
		private _systemRunTime: number = 0;
		/*服务器运行时间同步的时间 单位毫秒*/
		private _osrt: number = 0;
		/*服务器运行时间同步的时间 单位毫秒*/
		private _oserverRunt: number = 0;
		/*自然时间的服务器启动时间 单位秒*/
		private _serverStartTime: number = 0;

		/*需要同步时间*/
		private _hasSyncTime: boolean = true;

		/*时间同步损耗*/
		private _syncLoss: number = 0;
		/**登陆时间*/
		public loginTime:number;


		//事件
		private static _date: Date = new Date();
		//同步函数
		private _syncFunc: Function;
		get syncFunc(): Function{
			return this._syncFunc;
		}

		// 应用程序引用
		private _app: GameApp;
		constructor(app: GameApp) {
			super()
			this._app = app;
		}
		/**
		 * 服务器同步时间
		 */
		public syncSystemRunTime(value: number): void {
			this._systemRunTime = value;
			this._osrt = Laya.timer.currTimer;
		}

		/**
		 * 获取当前服务器时间(秒)
		 */
		public get serverTimeBys(): number {
			this._hasSyncTime = true;
			return (new Date()).getTime() / 1000;
		}
		/**
		 * 获取当前服务器时间(毫秒)
		 */
		public get serverTimeByms(): number {
			this._hasSyncTime = true;
			return (new Date()).getTime();
		}
		/**
		 * 获取小时
		 * @param value  时间戳毫秒
		 */
		public static getHours(value:number):number
		{
			this._date.setTime(value);
			return this._date.getHours();
		}

		/**
		 * 获取时间字符串 2017-3-20 09:09:10
		 * @param value  时间戳毫秒
		 */
		public static getTimeStr(value: number): string {
			this._date.setTime(value);
			return StringU.substitute("{0}-{1}-{2} {3}:{4}:{5}", this._date.getFullYear(), this._date.getMonth() + 1
				, this._date.getDate(), StringU.paddingLeft(this._date.getHours().toString(),"0",2),
				 StringU.paddingLeft(this._date.getMinutes().toString(),"0",2), StringU.paddingLeft(this._date.getSeconds().toString(),"0",2));
		}


		/**
		 * 获取星期几
		 * @param value  时间戳毫秒
		 */
		public static getTimeWeekDay(value: number): number {
			this._date.setTime(value);
			return this._date.getDay();
		}

		/**
		 * 获取当日时间 秒
		 * @param value  时间毫秒
		 */
		public static getDayTime(value: number): number {
			this._date.setTime(value);
			return this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
		}

		/**
		 * 获取时间字符串 09:09:10
		 * @param value  时间戳毫秒
		 */
		public static getTimeShortStr(value: number): string {
			this._date.setTime(value);
			return StringU.substitute("{0}:{1}:{2}", this._date.getHours(), this._date.getMinutes(), this._date.getSeconds());
		}

		/**
		 * 获取时间字符串 09:09:10
		 * @param value  剩余时间秒
		 */
		public static getTimeShortStr2(value: number): string {
			let h:number = MathU.parseInt(value / 3600);
			value = MathU.parseInt(value % 3600);
			let m:number = MathU.parseInt(value / 60);
			let s:number = MathU.parseInt(value % 60);
			return StringU.substitute("{0}:{1}:{2}", StringU.paddingLeft(h.toString(),"0",2), StringU.paddingLeft(m.toString(),"0",2), StringU.paddingLeft(s.toString(),"0",2));
		}

		/**
		 * 获取时间字符串 09:10
		 * @param value  剩余时间秒
		 */
		public static getTimeShortStr3(value: number): string {
			let m:number = MathU.parseInt(value / 60);
			let s:number = MathU.parseInt(value % 60);
			return StringU.substitute("{0}:{1}", StringU.paddingLeft(m.toString(),"0",2), StringU.paddingLeft(s.toString(),"0",2));
		}

		/**
		 * 是否当天时间
		 * @param value  时间秒
		 */
		 public static getIsToday(value: number,value1:number): boolean {
			let str:string = Sync.getTimeStr(value*1000).split(" ")[0];
			let str1:string = Sync.getTimeStr(value1*1000).split(" ")[0];
			return Boolean(str == str1);
		}

		/**获取么天0点时间戳 时间毫秒  返回是秒*/
		public static getDayZeroTime(value:number):number{
			this._date.setTime(value);
			this._date.setHours(0,0,0,1);
			return Math.floor(this._date.getTime()/1000);
		}


		/**
		 * 释放
		 */
		public dispose(): void {

		}
	}
}