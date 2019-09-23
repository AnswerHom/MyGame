/**
* name 
*/
module dou.gui.component {
	export class PiFuItem extends ui.component.PiFuItemUI {
		//根据id获取描述
		public static DESC_INFO_ID: any = [
			{ id: 1, desc: "免费皮肤" },{ id: 2, desc: "登录3天" },{ id: 3, desc: "登录5天" },{ id: 4, desc: "20场游戏" },{ id: 5, desc: "连登2天" },{ id: 6, desc: "2500金币" },{ id: 7, desc: "分享到2个群" },{ id: 8, desc: "2500金币" },{ id: 9, desc: "2500金币" },{ id: 10, desc: "分享到10个群" },{ id: 11, desc: "2500金币" },{ id: 12, desc: "2500金币" },{ id: 13, desc: "分享到20个群" },{ id: 14, desc: "5000金币" },{ id: 15, desc: "5000金币" },{ id: 16, desc: "连看2天视频" },{ id: 17, desc: "连看5天视频" },{ id: 18, desc: "累看5次视频" },{ id: 19, desc: "累看10次视频" },{ id: 20, desc: "邀请1人" },{ id: 21, desc: "累看50次视频" },{ id: 22, desc: "邀请3人" },{ id: 23, desc: "转盘抽取" },{ id: 24, desc: "20000金币" },{ id: 25, desc: "登录4天" },{ id: 26, desc: "登录7天" },{ id: 27, desc: "50场游戏" },{ id: 28, desc: "连登3天" },{ id: 29, desc: "2500金币" },{ id: 30, desc: "分享到3个群" },{ id: 31, desc: "2500金币" },{ id: 32, desc: "连看3天视频" },{ id: 33, desc: "5000金币" },{ id: 34, desc: "分享到15个群" },{ id: 35, desc: "5000金币" },{ id: 36, desc: "邀请5人" },{ id: 37, desc: "5000金币" },{ id: 38, desc: "邀请2人" },{ id: 39, desc: "累看20次视频" },{ id: 40, desc: "10000金币" },{ id: 41, desc: "邀请4人" },{ id: 42, desc: "邀请6人" },{ id: 43, desc: "登录6天" },{ id: 44, desc: "30场游戏" },{ id: 45, desc: "连登5天" },{ id: 46, desc: "5000金币" },{ id: 47, desc: "分享到5个群" },{ id: 48, desc: "5000金币" },{ id: 49, desc: "连看4天视频" },{ id: 50, desc: "邀请7人" },{ id: 51, desc: "10000金币" },{ id: 52, desc: "邀请8人" },{ id: 53, desc: "邀请9人" },{ id: 54, desc: "20000金币" },{ id: 55, desc: "免费拖尾" },{ id: 56, desc: "免费障碍物" }
		];

		private effectTuoWei: Laya.ShuriKenParticle3D;
		constructor() {
			super();
		}
		private _curData: any = [];
		private _curType: number;
		public init(app: GameApp, curData: any, type: number): void {
			this._curData = curData;
			this._app = app;
			this._curType = type;
			this.txt_num.on(LEvent.CLICK, this, this.onclick);
			this.img_skin.on(LEvent.CLICK, this, this.onclick);
			this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.onSkinBuyFlag);
			this._app.plyertDataMgr.on(PlayerDataMgr.EVENT_SKIN_USE_FLAG, this, this.onSkinUseFlag);
		}

		private _app: GameApp;
		private _index: number = 0;
		public setIndex(val: number): void {
			this._index = val;
			this.updateInfo();
		}

		//皮肤购买标志
		private onSkinBuyFlag(index: number): void {
			if (this._index == index) {
				this.updateInfo();
			}
		}

		//皮肤使用标志
		private onSkinUseFlag(index: number, oldIndex: number): void {
			this.updateInfo();
		}

		// private onUpdate(): void {
		// 	let curBendAngle = new Laya.Vector4();
		// 	this.effectTuoWei.particleRender.material.setBendOffset(curBendAngle);
		// }

		private updateInfo(): void {
			let curData = this._curData[this._index];
			// if (this._curType == dou.gui.page.SkinPage.TYPE_TUOWEI) {
			// this.effectTuoWei = this._app.showRoot.getChildByName(curData.avatar) as Laya.ShuriKenParticle3D;
			// //拖尾使用特效
			// if (this.effectTuoWei) {
			// 	this.effectTuoWei.particleSystem.play();
			// 	this.effectTuoWei.particleSystem.looping = true;
			// }
			// this.img_skin.visible = false;
			// } else {
			this.img_skin.visible = true;
			this.img_skin.skin = 'scene/pifu/icon/' + curData.avatar + (curData.type == 2 ? '.jpg' : '.png');
			// }
			if (this._app.plyertDataMgr.isBuySkinFlag(curData.id)) {
				let id: number
				if (this._curType == dou.gui.page.SkinPage.TYPE_BALL) {
					//球
					id = this._app.plyertDataMgr.getUseSkinIndex();
				} else if (this._curType == dou.gui.page.SkinPage.TYPE_TUOWEI) {
					//拖尾
					id = this._app.plyertDataMgr.getUseTuoWeiSkinIndex();
				} else if (this._curType == dou.gui.page.SkinPage.TYPE_ZHANGAI) {
					//障碍
					id = this._app.plyertDataMgr.getUseObstacleSkinIndex();
				}
				// this.txt_user.visible = id == curData.id;
				// this.img_gou.visible = id == curData.id;
				// this.box_price.visible = false;
			} else {
				// this.txt_user.visible = false;
				// this.img_gou.visible = false;
				// this.box_price.visible = true;
				let curObj;
				//根据id获取描述
				for (let i = 0; i < PiFuItem.DESC_INFO_ID.length; i++) {
					let obj = PiFuItem.DESC_INFO_ID[i];
					if (obj.id == this._curData[this._index].id) {
						curObj = obj;
						break;
					}
				}
				this.txt_num.text = curObj ? curObj.desc : "无";
			}
			//邀请换一个醒目的底
			// if (this.txt_num.text.indexOf('邀请') > -1) {
			// 	this.img_di.skin = "tongyong/btn_113.png";
			// } else {
			// 	this.img_di.skin = "tongyong/btn_111.png";
			// }
			//底要隐藏
			// if (this.box_price.visible || this.txt_user.visible) {
			// 	this.img_di.visible = true;
			// } else {
			// 	this.img_di.visible = false;
			// }
		}

		private onclick(e: LEvent): void {
			let curData = this._curData[this._index];
			switch (e.currentTarget) {
				case this.txt_num:
					if (this.txt_num.text.indexOf('邀请') > -1) {
						//邀请按钮
						WXTool.shareFriend(3);
					} else if (this.txt_num.text.indexOf('金币') > -1) {
						//购买
						this.buySkin(curData);
					} 
					// else if (this.txt_num.text.indexOf('观看视频') > -1) {
					// 	if (isDebug)
					// 		this._app.plyertDataMgr.setSkinActive(curData.id);
					// 	else
					// 		WXTool.getVideo(() => {
					// 			this._app.plyertDataMgr.setSkinActive(curData.id);
					// 		});
					// } 
					else if (this.txt_num.text.indexOf('视频') > -1) {
						let page:dou.gui.page.SkinPage = this._app.uiRoot.general.getPage(PageDef.SKIN_PAGE) as dou.gui.page.SkinPage;
						if (isDebug)
							page.onVideo();
						else
							WXTool.getVideo();
					} else if (this.txt_num.text.indexOf('分享到') > -1) {
						if (isDebug)
							this._app.uiRoot.general.getPage(PageDef.SKIN_PAGE);

						else
							WXTool.shareFriend();
					}
					break;
				case this.img_skin:
					if (this._curType == dou.gui.page.SkinPage.TYPE_BALL) {
						//球
						this._app.showRoot.changeBallSkin(curData.avatar);
					} else if (this._curType == dou.gui.page.SkinPage.TYPE_TUOWEI) {
						//拖尾
						this._app.showRoot.changeTuoWeiSkin(curData.avatar);
					}
					//如果是已经购买的话，直接使用
					if (!this._app.plyertDataMgr.isBuySkinFlag(curData.id)) {
						console.log("PiFuItem.onClick:未购买该皮肤" + this._index);
						return;
					}
					if (this._curType == dou.gui.page.SkinPage.TYPE_BALL) {
						//球
						this._app.plyertDataMgr.setUseSkinIndex(curData.id);
					} else if (this._curType == dou.gui.page.SkinPage.TYPE_TUOWEI) {
						//拖尾
						this._app.plyertDataMgr.setUseTuoWeiSkinIndex(curData.id);
					} else if (this._curType == dou.gui.page.SkinPage.TYPE_ZHANGAI) {
						//障碍
						this._app.plyertDataMgr.setUseObstacleSkinIndex(curData.id);
					}
					break;
			}
		}

		private buySkin(curData: any): void {
			if (this._app.plyertDataMgr.isBuySkinFlag(curData.id)) {
				// console.log("PiFuItem.onClick:已经购买该皮肤"+this._index);
				return;
			}
			//判断条件
			let condition = curData.condition[1];
			let curGold = this._app.plyertDataMgr.getGold();
			if (curGold >= condition) {
				curGold -= condition;
				this._app.plyertDataMgr.updateGold(curGold);
				this._app.plyertDataMgr.setSkinActive(curData.id);
				//购买成功
				let page: dou.gui.page.PiFuGetPage = this._app.uiRoot.general.getPage(PageDef.PIFUGETTIP) as dou.gui.page.PiFuGetPage;
				if (!page) {
					this._app.uiRoot.general.open(PageDef.PIFUGETTIP, (page: dou.gui.page.PiFuGetPage) => {
						page.setData(curData);
					});
				}
			} else {
				//金币不足
				this._app.uiRoot.general.open(PageDef.GOLDNOENOUGH);
			}
		}

		public destroy(): void {
			this.txt_num.off(LEvent.CLICK, this, this.onclick);
			if (this._app && this._app.plyertDataMgr) {
				this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_BUY_FLAG, this, this.onSkinBuyFlag);
				this._app.plyertDataMgr.off(PlayerDataMgr.EVENT_SKIN_USE_FLAG, this, this.onSkinUseFlag);
			}
		}
	}
}