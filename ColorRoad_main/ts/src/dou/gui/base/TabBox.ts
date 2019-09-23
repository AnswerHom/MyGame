/**
* 标签的子页面 
*/
module dou.gui.base {
	export class TabBox {

		//界面视图
		protected _view: any;
		//子页面
		protected _tabView:any;
		// 应用程序引用
		protected _app: GameApp;
		private _mask:Box;
		public isMove:boolean = false;
		//保存位置信息
		private _point:Point;
		private _tween:Laya.Tween;
		private _isNeedMask:boolean = false;
		public id:number = 0;//活动id
		public isOpened:boolean;
		constructor(app: GameApp, view: any,tabView?:any,isNeedMask:boolean = true) {
			this._app = app;
			this._view = view;
			this._tabView = tabView;
			this._point = new Point(this._tabView.x,this._tabView.y);	
			this._tween = new Laya.Tween();
			this._isNeedMask = isNeedMask;
		}
		public tabViewPos(x:number,y:number):void{
			if(this._point){
				this._point.x = x;
				this._point.y = y;
				this._tabView.pos(this._point.x,this._point.y);
			}
		}

		open(): void {
			if(this._tabView){
				if(!this._mask && this._tabView.parent && this._isNeedMask){
					this._mask = new Box();
					this._mask.graphics.clear();
					this._mask.graphics.drawRect(0,-200,this._tabView.parent.width,this._tabView.parent.height + 350,TeaStyle.COLOR_WHITE);
					this._tabView.parent.mask = this._mask;
				}		
				this.initMove();
			}
			this.isOpened = true;
		}

		//界面打开缓动
		private initMove():void{
			if(this._tabView && this.isMove){
				if(this._tween)this._tween.clear();
				this._tabView.alpha = 1;
				this._point && this._tabView.pos(this._point.x,this._point.y);
				this._tween.from(this._tabView,{x:this._tabView.x + this._tabView.width,alpha:0},200,Laya.Ease.cubicInOut);
			}
		}

		close(): void {
			this.isMove = false;
			if(this._tabView){
				if(this._tween)this._tween.clear();
				// this._tabView.alpha = 1;
				// this._point && this._tabView.pos(this._point.x,this._point.y);
			}
			this.isOpened = false;
		}
		destory():void{
			this.close();
			if(this._tween)this._tween.clear();
			this._tween = null;
			this._mask && this._mask.graphics.clear();
			this._mask = null;
			this._point = null;
		}

		/**显示新手引导表现
		 * @param type 类型
		 * @param step 步骤
		 */
		public showGuideEffect(type?:number, step?:number): void {
			//重载
		}
	}
}