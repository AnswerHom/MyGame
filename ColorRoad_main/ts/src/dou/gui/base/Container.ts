/**
* 容器
*/
module dou.gui.base {

	export class Container extends Laya.Sprite {
		// 是否释放
		private _dispose: boolean = false;

		protected _clientWidth: number;
		protected _clientHeight: number;
		// 应用程序引用
		protected _app: GameApp;
		get app():GameApp{
			return this._app;
		}
		constructor(app: GameApp) {
			super();
			this._app = app;
		}

		// 确认函数
		enter():boolean{
			return false;
		}

		// 取消函数
		cancel():boolean{
			return false;
		}

		resize(w: number, h: number): void {
			this._clientWidth = this.width = w;
			this._clientHeight = this.height = h;
		}

		// 释放函数
		dispose(): void {
			this._dispose = true;
		}
	}
}