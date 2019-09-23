// /**
// * 排行榜 
// */
// module  dou.gui.page{
// 	// import TopUI = ui.Top_qunUI;
// 	export class QunSortScrollPage extends dou.gui.base.Page{
// 		//开放域层级
//     	private _openZone:Sprite;
// 		//开放域纹理
//     	private _openZoneTexture:Texture;
// 		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function){
// 			super(app, onOpenFunc, onCloseFunc);
// 			this._asset = [Path.uiAtlas + "top.atlas"];
// 		}

// 		protected init():void
// 		{
// 			super.init();
// 			// this._view = new ui.Top_qunUI();
// 			this.addChild(this._view);
// 			this._openZone = new Sprite();
// 		}

// 		protected onOpen():void
// 		{
// 			super.onOpen();
// 			console.log('打开排行榜');
// 			//打开开放域
// 			this.showOpenZone();
// 			// (<TopUI>this._view).btn_close.on("click",this,this.onHome);
// 			// (<TopUI>this._view).btn_start.on("click",this,this.onStart);
// 			this._view.mouseLayer.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
// 			this._view.mouseLayer.on(LEvent.MOUSE_UP, this, this.onMouseUp);
// 			this._view.mouseLayer.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
// 			this.setData();

// 			 let api: any = window["externalInterfacePI"];
//             if(api){
//                 api.shareCallbcak = ()=>{
//                     console.log('分享成功执行重生')
// 				}
//                 api.shareCallbcakfail = ()=>{
// 					console.log('分享成功执行失败')
// 				}
//             }
// 		}

// 		private onHome():void
// 		{
// 			// this._app.uiRoot.HUD.open(PageDef.PLAY_PAGE);
// 			this.close();
// 		}
		 
// 		private onStart():void
// 		{
// 			// let page = this._app.uiRoot.HUD.getPage(PageDef.MAIN_PAGE) as PinBallPage;
// 			// if(page && page.isOpened)
// 			// 	page.start();
// 			// else
// 			// 	this._app.uiRoot.HUD.open(PageDef.MAIN_PAGE);
// 			this.close();
// 		}

// 		private _isMouseDown:boolean = false;
// 		private _old_y:number = 0;
// 		private onMouseDown():void
// 		{
// 			this._old_y = this._openZone.mouseY;
// 			this._isMouseDown = true;
// 			console.log('mousedown');
// 		}

// 		private onMouseUp():void
// 		{
// 			this._isMouseDown = false;
// 			console.log('mouseup');
// 		}

// 		private onMouseMove():void
// 		{
// 			if(!this._isMouseDown)return;
// 			let diff:number = this._old_y - this._openZone.mouseY;
// 			this._old_y = this._openZone.mouseY;
// 			let api: any = window["externalInterfacePI"];
// 			if(api){
// 				api.ScollSortPage(diff)
// 			}
// 		}

// 		 //显示开放域
// 		public showOpenZone():void{
// 			if(!this._openZone || this._openZone.parent) return;
// 			console.log("打开开放域",Laya.Browser.onMiniGame)
// 			this.view.addChild(this._openZone);
// 			if(Laya.Browser.onMiniGame){
// 				Laya.Browser.window.sharedCanvas.width = 365;
// 				Laya.Browser.window.sharedCanvas.height = 424;
// 				if(!this._openZoneTexture)
// 					this._openZoneTexture = new Texture(Laya.Browser.window.sharedCanvas);
// 				this._openZoneTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
// 				this._openZone.graphics.drawTexture(this._openZoneTexture,25,186, Laya.Browser.window.sharedCanvas.width, Laya.Browser.window.sharedCanvas.height);
// 			}
// 		}

// 		//关闭开放域
// 		public closeOpenZone():void{
// 			if(!this._openZone) return;
// 			console.log("关闭开放域")
// 			if(this._openZoneTexture && this._openZoneTexture.bitmap){
// 				this._openZoneTexture.bitmap.alwaysChange = false;
// 			}
// 			this._openZone.graphics.clear();
// 			this._openZone.removeSelf();
// 		}


// 		public setData(shareTicket:string=null):void{
// 			let api: any = window["externalInterfacePI"];
// 			if(api){
// 				console.log('shareTicket' + shareTicket);
// 				api.openSort(this._app.plyertDataMgr.saveDataShare,Laya.timer.currTimer);
// 			}
// 		}

// 		public layout():void{
// 			super.layout();
// 		}

// 		public close():void
// 		{
// 			if(this.isOpened){
// 				//如果结算界面打开 就不关了
// 				this.closeOpenZone();
// 				let api: any = window["externalInterfacePI"];
// 				if(api){
// 					// api.closePage("result");
// 					api.closePage("sort");
// 				}
// 			}
			
// 			super.close();
// 		}
// 	}

// }