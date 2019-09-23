/**
* 物品格子对象
*/
module doc.gui.component{
	/** 物品格子 */
	export class Grid extends Laya.Box {
		static isShowItemTempId = false;
		protected _prev_view:any;
		//背景
		protected _imgBg: LImage;
		//背景文字
		protected _lbBg: Label;
		//物品视图
		protected _imgIcon: LImage;
		//品质视图
		protected _imgQuality: LImage;
		//是否要特效
		protected _isEffect: boolean = true;

		get icon(): LImage {
			return this._imgIcon;
		}

		// 应用程序引用
		protected _app: GameApp;
		constructor(app: GameApp,prev_view?:any) {
			super();
			this._app = app;
			this._prev_view = prev_view;
		}

		// 设置大小
		size(width: number, height: number): Sprite {
			let sprite = super.size(width, height);
			if (this._imgBg)
				this._imgBg.size(width, height);
			return sprite;
		}
		setBgSkin(skin: any): void {
			if (skin instanceof LImage) {
				this._imgBg = skin;
			}
			else if (typeof (skin) == "string") {
				this._imgBg = new LImage();
				this._imgBg.skin = skin;
			}
			this._imgBg.centerX = this._imgBg.centerY = 0;
			this._imgBg.alpha = 0.2;
			this.size(this._imgBg.width, this._imgBg.height);
			this.addChild(this._imgBg);
		}

		//背景文字
		setBgLabel(msg: string): void {
			if (!this._imgBg) return;
			if (!this._lbBg) {
				this._lbBg = new Label();
				this._lbBg.color = TeaStyle.COLOR_GRAY;
				this._lbBg.font = "SimHei";
				this._lbBg.fontSize = 20;
			}
			this._imgBg.addChild(this._lbBg);
			this._lbBg.pos(16, 28);
			this._lbBg.text = msg;
		}		

		//设置图片
		setIcon(skin: string): void {
			if (!this._imgIcon) {
				// 创建图标
				this._imgIcon = new LImage();
				this._imgIcon.centerX = this._imgIcon.centerY = 0;
				this.addChild(this._imgIcon);
			}

			// TODO 看一下要不要做一下引用计数内存自己管理
			this._imgIcon.skin = skin;
		}

		//设置品质
		public setQuality(quality: number) {
			if (quality < 0) {
				if(this._imgQuality)this._imgQuality.skin = null;
				return;
			}
			if (!this._imgQuality) {
				this._imgQuality = new LImage();
				this._imgQuality.centerX = this._imgQuality.centerY = 0;
				this.addChild(this._imgQuality);
				// this._imgQuality.frameOnce(1, null, ()=>{this._imgQuality.centerX = this._imgQuality.centerY = 0;});
			}
			if(!this._imgQuality)return;

		}

		//清除图标
		public clear(): void {
			this.setIcon(null);
			this.setQuality(-1);
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			if (this._lbBg) {
				this._lbBg.destroy();
				this._lbBg = null;
			}
			if (this._imgBg) {
				this._imgBg.destroy();
				this._imgBg = null;
			}
			this._prev_view = null;
			super.destroy(destroyChild);
		}
	}

	//背包格子
	export class TemplateGrid extends Grid {
		// 物品模板id
		protected _tempData: any;
		// 叠加数
		protected _count: number = 0;
		//强制显示叠加数
		protected _showCount:boolean = false;
		// 叠加数文本
		protected _labelCount: Label;
		//特效层
		protected _effectLayer:EffectLayer;
		//特效
		// protected _effect:EffectUnit;

		constructor(app: GameApp,prev_view?:any) {
			super(app,prev_view);
			this._effectLayer = new EffectLayer();
			this.addChild(this._effectLayer);
		}

		public get entry(): number {
			if (this._tempData)
				return this._tempData.id;
			return 0;
		}
		public get showCount():boolean{
			return this._showCount;
		}
		public set showCount(v:boolean){
			this._showCount = v;
		}

		// 设置数据
		setData(value: any, count: number = 1): void {
			this.clear();
			if (!value) return;
			this._tempData = value;
			this._count = count;
			this.setIcon(Path.ui + "icon/" + value.icon + ".png");
			if (this._tempData.quality >= 0)
				this.setQuality(this._tempData.quality);
			this.setCount(this._count);
		}

		//重载
		public setCount(count: number): void {
			if (count == 0 || (!this._showCount && count == 1)) {
				if (this._labelCount) this._labelCount.text = "";
				return;
			}
			this.createLabelCount();
			this._labelCount.text = count.toString();
			//位置
			this._labelCount.right = 2;
			this._labelCount.bottom = 2;
		}
		/**设置数量文本*/
		public setCountText(value: string): void {
			this.createLabelCount();
			this._labelCount.text = value;
			//位置
			this._labelCount.right = 2;
			this._labelCount.bottom = 2;
		}

		//创建
		protected createLabelCount(): void {
			if (this._labelCount) return;
			//叠加数文本
			this._labelCount = new Label();
			this._labelCount.fontSize = 25;
			//白色
			this._labelCount.color = TeaStyle.COLOR_WHITE;
			this.addChild(this._labelCount);
			this._labelCount.align = "right";
			//描边
			this._labelCount.stroke = 2;
			this._labelCount.strokeColor = TeaStyle.COLOR_BLACK;
		}
		//设置品质
		public setQuality(quality: number) {
			this.clearEffect();
			super.setQuality(quality);
			if(!this._tempData || quality != 5) return;
		}
		private playEffect():void{
			// if(this._effect) return;
			// this._effect = EffectU.createEffect("tongyong/pzk_chengse", 12, {x:this._imgBg.width/2+2,y:this._imgBg.height/2+2,isLoop:true});
			// this._effectLayer.addEffect(this._effect.effect);
			// this.setChildIndex(this._effectLayer, this.numChildren-1);
		}
		private clearEffect():void{
			// if(!this._effect) return;
			// this._effectLayer.removeEffectByKey(this._effect.key);
			// this._effect = null;
		}

		clear(): void {
			this._tempData = null;
			this.setCount(0);
			this.clearEffect();
			super.clear();
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			if(this._effectLayer){
				this._effectLayer.removeSelf();
				this._effectLayer = null;
			}
			super.destroy(destroyChild);
		}

	}

	/** 可以查看详情的模板格子 */
	export class TemplateInfoGrid extends TemplateGrid {
		public isEnough:boolean = true;
		public isDetial:boolean = true;
		constructor(app: GameApp,prev_view?:any) {
			super(app,prev_view);
			this.on(LEvent.CLICK, this, this.onGridClick);
		}
		//点击事件
		protected onGridClick(): void {
			if (!this.isDetial || !this._tempData) return;
			//弹界面
			if(this.isEnough){
				
			}
			else{
				//点开商城
				// this._app.uiRoot.general.open(PageDef.SHOP,null,null,null,false,this._prev_view);
			}
		}
		
		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			this.off(LEvent.CLICK, this, this.onGridClick);
			super.destroy(destroyChild);
		}
	}
}