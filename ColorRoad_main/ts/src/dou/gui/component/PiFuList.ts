/**
* name 
*/
module dou.gui.component{
	export class PiFuList extends Laya.Panel{
		public static DIR_H:number = 0;			//水平
		public static DIR_V:number = 0;			//竖直

		protected _startPosX:number = 0;
		protected _startPosY:number = 0;
		protected _spaceX:number = 0;
		protected _spaceY:number = 0;
		protected _dirType:number = 0;

		protected _viewW:number = 0;
		protected _viewH:number = 0;
		constructor(viewW:number, viewH:number, posx:number, posy:number, spacex:number, spacey:number, dirType:number){
			super();

			this._viewW = viewW;
			this._viewH = viewH;
			this._startPosX = posx;
			this._startPosY = posy;
			this._spaceX = spacex;
			this._spaceY = spacey;
			this._dirType = dirType;

			this.width = this._viewW;
			this.height = this._viewH;
		}

		protected _viewRowNum:number = 0;
		protected _viewColNum:number = 0;

		protected _renderItem:any;
		protected _renderItemCB:Laya.Handler;
		protected _itemWidth:number = 0;
		protected _itemHeight:number = 0;
		protected _colNum:number = 0;			//item列数
		protected _rowNum:number = 0;			//item行数
		protected _data:Array<any> = new Array<any>();

		protected _indexPos:number = 0;
		protected _index:number = 0;
		protected _moveColNum:number = 0;
		protected _itemMoveDis:number = 0;
		protected _maxMoveRange:number = 0;
		protected _itemLists:Array<Laya.Sprite> = new Array<Laya.Sprite>();
		public init(item:any, renderItemCB:Laya.Handler, data:Array<any>, itemWidth:number = 0, itemHeight:number = 0):void{
			this._renderItem = item;
			this._renderItemCB = renderItemCB;
			// if (itemWidth == 0) itemWidth = item.width;
			// if (itemHeight == 0) itemHeight = item.height;
			this._itemWidth = itemWidth;
			this._itemHeight = itemHeight;
			if (data){
				this._data = data;
			}

			//计算视图行数
			let h:number = this._viewH - this._startPosY;
			this._viewRowNum = Math.floor(h/(this._itemHeight + this._spaceY));
			//计算试图列数
			let w:number = this._viewW - this._startPosX;
			this._viewColNum = Math.floor(w/(this._itemWidth + this._spaceX));

			this._indexPos = 0;
			this._index = 0;
			this.calMoveParams();
			this._itemLists.length = 0;

			let numCol:number = this._viewRowNum;
			let numRow:number = this._viewColNum;
			if (this._dirType == PiFuList.DIR_H){//水平 
				numCol += 2;
			}else{
				numRow += 2;
			}
			for (let i:number = 0; i < numCol*numRow; i++){
				this._itemLists[i] = new this._renderItem();
				this.addChild(this._itemLists[i]);
			}
			this.updateItem();
			this.addEvent();
		}

		//计算滑动相关参数
		protected calMoveParams():void{
			if (this._dirType == PiFuList.DIR_H){//水平
				this._rowNum = this._viewRowNum;
				this._colNum = Math.ceil(this._data.length/ this._viewRowNum);
				this._itemMoveDis = this._itemWidth + this._spaceX;
				this._moveColNum = this._viewRowNum;
				if (this._colNum > this._viewColNum){
					this._maxMoveRange = (this._colNum - this._viewColNum) * (this._itemWidth + this._spaceX);
				}else{
					this._maxMoveRange = 0;
				}

			}else{
				this._colNum = this._viewColNum;
				this._rowNum = Math.ceil(this._data.length/ this._viewColNum);
				this._itemMoveDis = this._itemHeight + this._spaceY;
				this._moveColNum = this._viewColNum;
				if (this._rowNum > this._viewRowNum){
					this._maxMoveRange = (this._rowNum - this._viewRowNum) * (this._itemHeight + this._spaceY);
				}else{
					this._maxMoveRange = 0;
				}
			}
		}

		//添加监听事件
		protected addEvent():void{
			this.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			this.on(LEvent.MOUSE_UP, this, this.onMouseUp);
			this.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
		}

		private _isMouseDown:boolean = false;
		private _old_Pos:number = 0;
		private onMouseDown():void
		{
			if (this._dirType == PiFuList.DIR_V){
				this._old_Pos = this.mouseX;
			}else{
				this._old_Pos = this.mouseY;
			}
			this._isMouseDown = true;
			console.log('mousedown');
		}

		private onMouseUp():void
		{
			this._isMouseDown = false;
			console.log('mouseup');
		}

		private onMouseMove():void
		{
			if(!this._isMouseDown)return;
			let diff:number = 0;
			if (this._dirType - PiFuList.DIR_H){
				diff = this._old_Pos - this.mouseX;
			}else{
				diff = this._old_Pos - this.mouseY;
			}
			this._old_Pos -= diff;
			this._indexPos -= diff;
			if (this._indexPos < 0) this._indexPos = 0;
			if (this._indexPos > this._maxMoveRange) this._indexPos = this._maxMoveRange;
			this.updateItem();
		}

		private updateItem():void{
			let idx:number = Math.floor(this._indexPos / this._itemMoveDis);
			idx = idx * this._moveColNum;

			let dis:number = this._indexPos % this._itemMoveDis;


			for (let i:number = 0; i < this._itemLists.length; i++){
				if (idx + i < this._data.length){
					this._itemLists[i].visible = true;
					this._renderItemCB.runWith( {item:this._itemLists[i], data:this._data[idx+i]});
					if (this._dirType == PiFuList.DIR_H){
						this._itemLists[i].x = this._startPosX + Math.floor(i/this._rowNum)*(this._itemWidth+this._spaceX) - dis;
						this._itemLists[i].y = this._startPosY + Math.floor(i%this._rowNum)*(this._itemHeight+this._spaceY);
					}else{
						this._itemLists[i].x = this._startPosX + Math.floor(i%this._colNum)*(this._itemWidth+this._spaceX);
						this._itemLists[i].y = this._startPosY + Math.floor(i/this._colNum)*(this._itemHeight+this._spaceY) - dis;
					}
				}else{
					this._itemLists[i].visible = false;
				}
			}
		}



		//清除
		public clear():void{

		}


		//itemPool
		private _itemPool:Array<any> = new Array<any>();
		private outPool():any{
			let obj:any;
			if (this._itemPool.length > 0){
				obj = this._itemPool.pop();
			}else{
				obj = new this._renderItem();
			}
			return obj;
		}

		private intoPool(obj:any):void{
			if (obj){
				this._itemPool.push(obj);
			}
		}

		//释放
		public dispose():void{

		}

	}
}