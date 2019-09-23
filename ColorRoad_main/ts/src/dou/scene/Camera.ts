/**
* name 
*/
module dou.scene{

	export class Camera{

		

		/*单元格*/
		public static CELL_HEIGHT:number = 1;

		/*单元格*/
		public static CELL_WIDTH:number = 1;

		/*视野范围扩充*/
		public static LOGIC_INNER_LOOK:number = 40;

		/*地震*/
		// private _earthShock:Shock = new Shock();
		/*摄像机位置*/
		private _worldPostion:Vector2 = new Vector2();
		get worldPostion():Vector2
		{
			return this._worldPostion;
		}
		/*所跟随的对象*/
		private _followPostion:Vector2;
		
		/**
		 * viewPort宽度 
		 */		
		public width:number = 720;
		
		/**
		 * viewPort高度 
		 */		
		public height:number = 1280;
		
		/**
		 * 缓冲区宽度/像素 
		 */		
		public bufferWidth:number;
		
		/**
		 * 缓冲区高度/像素 
		 */		
		public bufferHeight:number;
		
		/**
		 * 缓冲区位置的左边线 
		 */		
		public bufferLeft:number;
		
		/**
		 * 缓冲区位置的右边线 
		 */		
		public bufferRight:number;
		
		/**
		 * 缓冲区位置的上边线 
		 */		
		public bufferTop:number;
		
		/**
		 * 缓冲区位置的下边线 
		 */		
		public bufferBottom:number;
		
		/*逻辑左值，右值，上值，下值*/
		public logicLeft:number;
		public logicRight:number;
		public logicTop:number;
		public logicBottom:number;
		
		/*视野内逻辑左值，右值，上值，下值*/
		private look_logicLeft:number;
		private look_logicRight:number;
		private look_logicTop:number;
		private look_logicBottom:number;

		public sceneYOffset:number = 0;

		public sceneYSpeed:number = .5;
		
		/**
		 * 摄像头的位置x，y,z
		 */		
		private _x:number = 0;
		private _y:number = 0;
		
		/*窗口大小标记*/
		private _sizeFlag:number;

		/**
		 * 镜头产生移动 
		 * @return 
		 * 
		 */		
		public get isResize():boolean{
			return this._sizeFlag >= Laya.timer.currFrame;
		}
		
		/**
		 * 是否启用滤镜 
		 */		
		public enableFilter:boolean = true;
		
		/**
		 * 设置摄像机可视大小 
		 * @param newWidth 新高
		 * @param newHeight 新宽
		 * 
		 */		
		setSize(newWidth:number, newHeight:number):void{
			this.width = newWidth;
			this.height= newHeight;
			
			/*
			enableFilter = 
				Starling.current.viewPort.width <= 1920 &&
				Starling.current.viewPort.height <= 1080 &&
				bufferWidth < Starling.current.maxTextureSize && 
				bufferHeight < Starling.current.maxTextureSize;
				*/
		}

	
		/**
		 * 设置摄像头的位置，通过逻辑坐标 
		 * @param newX 逻辑坐标x
		 * @param newY 逻辑坐标y
		 * 
		 */		
		public setWorldPostion(newX:number, newY:number):void{
			this._worldPostion.x = newX;
			this._worldPostion.y = newY;
		}
		
		/*内部函数，设置位置*/
		private __location(newX:number, newY:number):void
		{			
			this._x = newX;
			this._y = newY;
			
			//震动效果
			// if(this._earthShock.update()){
			// 	this._x += this._earthShock.offsetX;
			// 	this._y += this._earthShock.offsetY;
			// }

			//判断窗口是否发生改变
			if(this.width != this.bufferWidth || this.height != this.bufferHeight)
				this._sizeFlag = Laya.timer.currFrame;
			
			//设置窗口大小
			this.bufferWidth = this.width;
			this.bufferHeight = this.height;
			
			this.centerPointX = Math.round(this.bufferWidth/2);
			this.centerPointY = Math.round(this.bufferHeight/2);
			
			//左线
			this.bufferLeft = this._x - this.centerPointX;
			//右线
			this.bufferRight = this.bufferLeft + this.bufferWidth;
			//上线
			this.bufferTop = this._y - this.centerPointY;
			//下线
			this.bufferBottom = this.bufferTop + this.bufferHeight;
		}
		
		/**
		 * 视线范围中央点x，y 
		 */		
		public centerPointX:number;
		public centerPointY:number;
		
		/**
		 * 场景对应的摄像机 
		 * @param scene
		 * 
		 */		
		constructor()
		{
		}
		
		
		/**
		 * 更新摄像机 
		 * @param diff 时差
		 * @param width 摄像机宽度
		 * @param height 摄像机高度
		 * 
		 */		
		public update():void
		{			
			// this.sceneYOffset+= this.sceneYSpeed;
			this.__location(this.width / 2, this.height / 2);

			//逻辑坐标范围
			this.logicLeft = this.bufferLeft / Camera.CELL_WIDTH;
			this.logicRight= this.bufferRight/ Camera.CELL_WIDTH;
			this.logicTop  = this.bufferTop  / Camera.CELL_HEIGHT;
			this.logicBottom = this.bufferBottom / Camera.CELL_HEIGHT;
			
			//更新逻辑范围，用于lookIn函数
			this.look_logicLeft = this.logicLeft - Camera.LOGIC_INNER_LOOK;
			this.look_logicRight= this.logicRight + Camera.LOGIC_INNER_LOOK;
			this.look_logicTop  = this.logicTop - Camera.LOGIC_INNER_LOOK;
			this.look_logicBottom = this.logicBottom + Camera.LOGIC_INNER_LOOK;

		}
		
		
		/**
		 * 获得基于屏幕的X像素位置，通过逻辑X 
		 * @param x 逻辑x
		 * @return 
		 */	
		public getScenePxByCellX(x:number):number{
			return x * Camera.CELL_WIDTH - this.bufferLeft ;
		}		
		
		/**
		 * 获得基于屏幕的Y像素位置，通过逻辑Y 
		 * @param y 逻辑y
		 * @return 
		 */		
		public getScenePxByCellY(y:number, needOffset:boolean = true):number{
			return y * Camera.CELL_HEIGHT - this.bufferTop + this.sceneYOffset;
		}
		
		/*通过实际像素获得相对于屏幕的位置*/
		private getSceneX(xPX:number):number{
			return xPX - this.bufferLeft;
		}
		
		/*通过实际像素获得相对于屏幕的位置*/
		private getSceneY(yPX:number):number{
			return yPX - this.bufferTop;			
		}
		
		/**
		 * 通过当前屏幕的像素x获得逻辑位置x  
		 * @param x
		 * @return 
		 * 
		 */		
		public getCellXByScene(x:number):number{
			var v:number = x + this.bufferLeft;
			return v / Camera.CELL_WIDTH;
		}
		
		/**
		 * 通过当前屏幕的像素y获得逻辑位置y
		 * @param y
		 * @return 
		 * 
		 */		
		public getCellYByScene(y:number):number{			
			var v:number = y + this.bufferTop;
			return v / Camera.CELL_HEIGHT;
		}
		
		/**
		 * 是否存在于摄像头里（区域碰撞检测） 
		 * @param postion 位置
		 * @return 
		 */	
		lookIn(postion:Vector2):boolean;
		/**
		 *  是否存在于摄像头里（区域碰撞检测）
		 * @param postionX
		 * @param postionY
		 * @return 
		 */		
		lookIn(postionX:number, postionY:number):boolean;
		
		lookIn(...args:any[]):boolean{
			let look = false;
			let postionX:number, postionY:number;
			switch(args.length){
				case 1:
					if(args[0] instanceof Vector2){
						postionX = args[0].x
						postionY = args[0].y
						look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
					}
					break;
				case 2:
					if(args[0] instanceof Number && args[1] instanceof Number){
						postionX = args[0]
						postionY = args[1]
						look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
					}
					break;
			}
			return look;
		}

		lookInBuffer(x1:number, y1:number, width:number, height:number):boolean{
			// 判断两矩形是否相交、原理狠简单、如果相交、肯定其中一个矩形的顶点在另一个顶点内、
			let x2:number = x1 + width;
			let y2:number = y1 + height;

			let x3:number = this.bufferLeft;
			let y3:number = this.bufferTop;
			let x4:number = this.bufferRight;
			let y4:number = this.bufferBottom;

			return ( ( (x1 >=x3 && x1 < x4) || (x3 >= x1 && x3 <= x2) ) &&
				( (y1 >=y3 && y1 < y4) || (y3 >= y1 && y3 <= y2) ) ) ? true : false;

		}
			
		/**
		 * 屏幕震动 
		 * @param duration 持续时间，默认500ms
		 * 
		 */		
		public shock(duration:number = 250):void{
			// this._earthShock.start(duration);
		}
		
		/**
		 * 停止屏幕震动 
		 * 
		 */		
		public shockStop():void
		{
			// this._earthShock.stop();
		}
	}
}