/**
* 本地缓存管理 
*/
module dou.managers {

	export class LocalStorageMgr extends Laya.EventDispatcher {

		///////////////////////////////////////
		//key 管理
		/**账号信息 */
		public static ACCOUNT: string = "Account";
		/** 是否游戏静音 */
		public static IS_MUTE: string = "IsMute";
		/** 是否游戏静音音效 */
		public static IS_MUTE_SOUND: string = "IsMuteSound";

		//内存存储
		private _dicObj:any;

		private _app: GameApp;
		private static server_id:string = '';

		constructor(app: GameApp) {
			super();
			this._app = app;
			this._dicObj = new Object();
			LocalStorageMgr.server_id = window['server_id'];
			//开启本地存储
			// Laya.LocalStorage.__init__();
			// Laya.LocalStorage.support = true;
		}

		/*指定服务器角色下的本地存储*/
		private getRoleLocalKey(key: string): string {
			return key;
		}

		/**
		 * 存储指定键名和键值，字符串类型 
		 * @param key 键值
		 * @param roleSelf 指定玩家
		 * @param value 内容
		 */
		public setItem(key: string, value: string, roleSelf: boolean = true): void {
			let event_name: string = key;
			if (roleSelf)
				key = this.getRoleLocalKey(key);
			Laya.LocalStorage.setItem(key, value);

			//内存也存下吧
			this._dicObj[key] = value;

			this.event(event_name);
		}

		/**
		 * 获取指定键名的值
		 * @param key函数
		 * @param roleSelf 指定玩家
		 * @return 内容
		 */
		public getItem(key: string, roleSelf: boolean = true): string {
			if (roleSelf)
				key = this.getRoleLocalKey(key);

			//先从内存里去找 找不到再去cookie里找
			let value: string = this._dicObj[key];
			if(!value)	
				value = Laya.LocalStorage.getItem(key);
			
			return value == null ? "" : value;
		}

		/**
		 * 删除指定键名的信息
		 * @param key函数
		 * @param roleSelf 指定玩家
		 * @return 内容
		 */
		public removeItem(key: string, roleSelf: boolean = true): void {
			if (roleSelf)
				key = this.getRoleLocalKey(key);
			Laya.LocalStorage.removeItem(key);
			this._dicObj[key] = null;
		}

		/**
		 * 存储指定键名和键值，字符串类型 
		 * @param key 键值
		 * @param roleSelf 指定玩家
		 * @param value 内容
		 */
		public setJSON(key: string, value: any, roleSelf: boolean = true): void {
			let event_name: string = key;
			if (roleSelf)
				key = this.getRoleLocalKey(key);
			Laya.LocalStorage.setJSON(key, value);
			//内存也存下
			this._dicObj[key] = value;
			this.event(event_name);
		}

		/**
		 * 获取指定键名的值
		 * @param key函数
		 * @param roleSelf 指定玩家
		 * @return 内容
		 */
		public getJSON(key: string, roleSelf: boolean = true): any {
			if (roleSelf)
				key = this.getRoleLocalKey(key);
			//先从内存里找下 找不到再去cookie里找
			let value:any = this._dicObj[key];
			if(!value)
				value = Laya.LocalStorage.getJSON(key);
			return value;
		}

		//本地缓存是否静音
		public get isMutedMusic():boolean{
			var value: string = this.getItem("IsMute");
			return value == "true" ? true : false;
		}
		//本地缓存是否静音
		public get isMutedSound():boolean{
			var value: string = this.getItem("IsMuteSound");
			return value == "true" ? true : false;
		}

		/**
		 * 存储指定键名和键值，字符串类型  静态函数
		 * @param key 键值
		 * @param value 内容
		 */
		public static setItem(key: string, value: string): void {
			Laya.LocalStorage.setItem('[' + LocalStorageMgr.server_id + ']' + key, value);
		}

		/**
		 * 获取指定键名的值 静态函数
		 * @param key函数
		 * @return 内容
		 */
		public static getItem(key: string): string {
			var value: string = Laya.LocalStorage.getItem('[' + LocalStorageMgr.server_id + ']' + key);
			return value == null ? "" : value;
		}
	}
}