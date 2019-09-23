/**
* name 
*/
module dou.gui.page{
	export class PiPeiPage extends dou.gui.base.Page{
	
		private _headArrAll:Array<number> = new Array<number>();
		private _headArr:Array<number> = new Array<number>();
		// private _viewUI:ui.PiPeiUI;
		private _tempIdx:number = 0;
		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = true;
            // this._asset = [Path.uiAtlas + "q_head.atlas"];
        }

        // 页面初始化函数
		protected init(): void {
			// this._viewUI = new ui.PiPeiUI();
			// this.addChild(this._viewUI);

			// this._viewUI.list_head.renderHandler = new Handler(this, this.renderItemcb);
			// this._viewUI.list_head.array = [1,2,3,4,5,6,7,8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
			
		}
		protected onOpen(): void {
			super.onOpen();
			this.drawBlack(0.75,"#000000")
			this._tempIdx = MathU.randomRange(1,36);
            // DisplayU.setMouseListener(this._viewUI.btn_back, true, this, this.onClick);
			// DisplayU.setMouseListener(this._viewUI.btn_cancel, true, this, this.onClick);

			this.updateInfo();
			this.reset();
			this.getHeadArr();
			Laya.timer.loop(this._time/36, this, this.updateHead);
        }

		private _curIndex:number = 0;
		private _time:number = 0;
		private updateHead():void{
			if (this._curIndex < 36){
				Laya.loader.load("scene/q_head/6ab111d_q_head_"+ this._headArr[this._curIndex]+".jpg", Handler.create(this, this.onComplete, [this._curIndex]));
				
				this._curIndex ++;

				this._time -= 2500/36;
				// this._viewUI.txt_cd.text = "正在匹配对手... " + (Math.floor(this._time/1000)+1) + "s";
			}else{
				this._app.sceneRoot.reset();
				if (this._app.plyertDataMgr.getAddSpeedStatus() == 1){
					this._app.plyertDataMgr.setAddSpeedStatus(2);
					this._app.sceneRoot.mainPlayer.playerScript.isWuDi = true;
				}
				this.close();
			}
		}

		private onComplete(index:number){
			// let cell:Box = this._viewUI.list_head.getCell(index);
			// let img:Laya.Image = cell.getChildAt(0) as Laya.Image;
			// if (this._app.wxUserInfo && this._tempIdx == index){
			// 	img.skin = this._app.wxUserInfo.avatarUrl;
			// }else{
			// 	img.skin = "scene/q_head/6ab111d_q_head_"+ this._headArr[index]+".jpg";
			// }
			// img.width = 70;
			// img.height = 70;
		}

		private getHeadArr():void{
			this._headArr.length = 0;
			this._headArrAll.length = 0;
			for (let i:number = 0; i < 101; i++){
				this._headArrAll.push(i);
			}
			for (let i:number = 0; i < 36; i++){
				let ran:number = Math.floor(this._headArrAll.length * Math.random());
				this._headArr.push(this._headArrAll[ran]);
				this._headArrAll.splice(ran, 1);
			}
		}

		  private renderItemcb(cell:any, index:number):void{
            // 
        }

		
		private updateInfo():void{
			
		}

		private reset():void{
			this._curIndex = 0;
			this._time = 2500;
			// this._viewUI.txt_cd.text = "正在匹配对手... ";
		}

        		//鼠标点击事件
		private onClick(e:LEvent):void{
			// TweenBtnEff.BtnTween(e.currentTarget);
			switch(e.currentTarget){

				// case this._viewUI.btn_back://返回
				// case this._viewUI.btn_cancel:
				// 	this._app.uiRoot.general.open(PageDef.START_PAGE);
				// 	this.close();
				// 	break;
				
			}
			
			
		}

        public close():void{
            this.reset();
			Laya.timer.clearAll(this);
            super.close();
        }
    }
}