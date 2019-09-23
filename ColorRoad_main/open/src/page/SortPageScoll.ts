module page {
	export class SortPageScoll {
		public static DATATEXT = [{ score: 100, text: "学徒" }, { score: 200, text: "勇者" }, { score: 300, text: "大侠" }, { score: 500, text: "神勇" }, { score: 750, text: "霸主" }, { score: 1000, text: "宗师" }, { score: 1500, text: "主宰" }, { score: 2000, text: "暴走" }, { score: 3000, text: "无敌" }, { score: 5000, text: "王者" }, { score: 9999999, text: "超神" }];
		private SHOW_COUNT: number = 50;//最多显示条数
		private PAGE_SIZE: number = 5;
		private ITEM_HEIGHT: number = 110;
		private PAGE_START_POSX: number = 90;
		private PAGE_START_POSY: number = 45;
		private PAGE_ITEM_OFFESTY: number = 9;

		private _dataArr: any;
		private _dataShowArr: any[];
		private _needLoadData: boolean = false;
		private _curIndex: number = 0;
		public isOpened: boolean = false;
		private _app: any;
		private _ctx: any;
		private _bg: any;
		private _bgisLoad: boolean = false;
		private _scorebg: any;
		private _scorebgisLoad: boolean = false;
		private _showHeight = 0;

		constructor(app: any) {
			this._app = app;
			this.init();
		}

		private init(): void {
			let api: any = window["externalInterfacePI"];
			let canvas = api.getSharedCanvas();
			this._showHeight = 690;
			this._ctx = canvas.getContext('2d');
			this._ctx.imageSmoothingEnabled = true;
			this._ctx.imageSmoothingQuality = "high";
		}

		public open(): void {
			this.initImg();
			this._curIndex = 0;
			this._oldStartY = 0;
			if (this._needLoadData && this._dataArr) {
				this.updateShow();
				this.updateList(this._curIndex);
			}
			this.isOpened = true;
		}
		//初始化当前开放域所需要用到的图片，先加载好，以防止没有绘制成功的情况
		private _isInit = false;
		private initImg(): void {
			if (!this._isInit) {
				this._isInit = true;
				ResMgr.getRes("top/top1.png", null);
				ResMgr.getRes("top/top2.png", null);
				ResMgr.getRes("top/top3.png", null);
				ResMgr.getRes("tongyong/wpk_1.png", null);
				ResMgr.getRes("top/tu_yd.png", null);
				ResMgr.getRes("top/tu_di.png", null);
				ResMgr.getRes("top/1_1.png", null);
				ResMgr.getRes("top/1_2.png", null);
				ResMgr.getRes("top/1_3.png", null);
				ResMgr.getRes("top/1_4.png", null);
				ResMgr.getRes("top/1_5.png", null);
				ResMgr.getRes("top/1_6.png", null);
				ResMgr.getRes("top/1_7.png", null);
				ResMgr.getRes("top/1_8.png", null);
				ResMgr.getRes("top/1_9.png", null);
				ResMgr.getRes("top/1_10.png", null);
				ResMgr.getRes("top/1_11.png", null);
			}
		}


		public close(): void {
			this.isOpened = false;
			this._ctx.clearRect(0, 0, 1000, 1000);
		}

		//设置数据
		public setData(value: any): void {
			this._dataArr = value;
			if (!this.isOpened) {
				this._needLoadData = true;
				return;
			}
			this.updateShow();
			this.updateList(this._curIndex);

			let selftop: any = this._app.wxSelfInfo;
			let idx: number = 0;
			console.log('self', selftop)
			let len: number = this._dataArr ? this._dataArr.length : 0;
			for (let i = 0; i < len; i++) {
				let rowData: any = this._dataArr[i];
				if (!rowData) continue;
				idx++;
			}
		}

		//更新显示
		private updateShow(): void {

			console.log('进来level')
			// this.clearDataShow();
			if (!this._dataArr) return;
			if (!this._dataShowArr) {
				this._dataShowArr = new Array();
			}
			else {
				this._dataShowArr.length = 0;
			}
			let idx: number = 0;
			for (let i = 0; i < this._dataArr.length; i++) {
				let rowData: any[] = this._dataArr[i];
				if (!rowData || !rowData["openid"]) continue;
				if (idx < this.SHOW_COUNT) {
					this._dataShowArr.push(rowData);
					idx++;
				}
			}
			//算出拖动页面的数据
			console.log("打印出max!!!!!")
			let max = this._dataShowArr.length * (this.ITEM_HEIGHT);
			this._max = max - this._showHeight;
			if (this._max < 0) this._max = 0;
		}
		private _min: number = 0;
		private _max: number = 0;
		private _oldStartY: number = 0;

		public controlPage(type: string): void {

			let totalPage = Math.ceil(this._dataShowArr.length / this.PAGE_SIZE);
			let index: number;
			switch (type) {
				case "up":
					this._curIndex--;
					if (this._curIndex < 0)
						this._curIndex = 0
					this.updateList((this._curIndex))
					break;
				case "next":
					this._curIndex++;
					if (this._curIndex > totalPage)
						this._curIndex = totalPage;
					this.updateList((this._curIndex))
					break;
			}
			// console.log("this._dataList.page",this._curIndex)
		}

		public updateDela(diff: number): void {
			// if(Math.ceil(this._dataShowArr.length / this.PAGE_SIZE) == 2)return;
			this._oldStartY += diff;
			if (this._oldStartY < this._min)
				this._oldStartY = this._min;
			if (this._oldStartY > this._max)
				this._oldStartY = this._max;
			this.updateList(this._oldStartY);
		}


		private updateList(page: number): void {
			let api: any = window["externalInterfacePI"];
			this._updateList(page);
		}

		private _updateList(startX: number): void {
			let pageStart = Math.floor(startX / this.ITEM_HEIGHT);
			console.log(pageStart)
			const pagedData = this._dataShowArr.slice(pageStart, pageStart + this.PAGE_SIZE + 1);


			const pageLen = pagedData.length;
			this._ctx.clearRect(0, 0, 1000, 1000);
			this.imgCount = 0;
			for (let i = 0; i < pageLen; i++) {
				this.drawRankItem(this._ctx, i, pageStart + i + 1, pagedData[i], startX);
			}
			// console.log("this.updateList.page", pageLen)

			this.drawMyRank();
		}


		//canvas原点在左上角
		private imgCount: number = 0;
		private drawRankItem(ctx, index, rank, data, startX) {
			let api: any = window["externalInterfacePI"];
			const avatarUrl = data.avatarUrl;
			const nick = data.nickname.length > 5 ? data.nickname.slice(0, 5) + "..." : data.nickname;
			const grade = data.score;
			const itemGapY = (this.ITEM_HEIGHT * (rank - 1)) - startX;

			let posx: number = this.PAGE_START_POSX;
			let posy: number = this.PAGE_START_POSY + itemGapY;
			//绘制背景
			ResMgr.getRes('top/tu_di.png', (img) => {
				ctx.drawImage(img, posx, posy, 545, 100);
				//名次
				if (rank <= 3) {
					ResMgr.getRes('top/top' + rank + '.png', (img) => {
						ctx.drawImage(img, posx + 10, posy + 5, 56, 84);
					})
				}
				else {
					ctx.font = "55px Arial";
					ctx.fillStyle = "#3d7e9c";
					ctx.fillText(`${rank}`, posx + 60, posy + 65);
				}

				///头像
				ResMgr.getRes("tongyong/wpk_1.png", (img) => {
					ctx.drawImage(img, posx + 110, posy + 5, 87, 87);
					ResMgr.getRes(avatarUrl, (avatarUrl) => {
						ctx.drawImage(avatarUrl, posx + 110, posy + 5, 87, 87);
					})
				})


				// //名字
				ctx.fillStyle = "#3d7e9c";
				ctx.font = "28px SimSun";
				ctx.textAlign = "left";
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#3d7e9c';
				ctx.strokeText(nick, posx + 230, posy + 34);
				ctx.fillText(nick, posx + 230, posy + 34);


				//绘制称号
				let chengHaoIndex = this.getTextChanegHao(grade);

				ResMgr.getRes("top/1_" + (chengHaoIndex + 1) + ".png", (img) => {
					ctx.drawImage(img, posx + 230, posy + 50);
				})

				//绘制底
				ResMgr.getRes("top/tu_yd.png", (img) => {
					ctx.drawImage(img, posx + 425, posy + 23);
					ctx.fillStyle = "#ffffff";
					ctx.font = "32px SimSun";
					ctx.textAlign = "right";
					ctx.lineWidth = 2;
					ctx.strokeStyle = '#ffffff';
					ctx.strokeText(`${grade}`, posx + 515, posy + 53);
					ctx.fillText(`${grade}`, posx + 515, posy + 53);
				});
			})
		}

		private getTextChanegHao(grade: number): number {
			for (let i = 0; i < SortPageScoll.DATATEXT.length; i++) {
				let curArray: any = SortPageScoll.DATATEXT[i];
				let maxCondition = curArray.score;
				let tesc = curArray.text;
				if (grade < maxCondition) {
					return i;
				} else {
					continue;
				}
			}
		}

		private MY_RANK_POS: number = 755;
		//绘制自己
		private drawMyRank(): void {
			this._ctx.clearRect(0, 800, 1000, 1000);
			console.log("打印自己的数据", this._app.wxSelfInfo)
			if (!this._app.wxSelfInfo) return;
			let mySelfInfo;
			let rank;
			for (let i = 0; i < this._dataArr.length; i++) {
				if (this._app.wxSelfInfo && this._app.wxSelfInfo.openid == this._dataArr[i].openid) {
					mySelfInfo = this._dataArr[i];
					rank = i + 1;
					break;
				}
			}
			let nickName = mySelfInfo.nickname;
			const nick = nickName.length > 5 ? nickName.slice(0, 5) + "..." : nickName;
			//名次
			if (!rank) rank = "未上榜";
			if (rank <= 3) {
				ResMgr.getRes('top/top' + rank + '.png', (img) => {
					this._ctx.drawImage(img, this.PAGE_START_POSX + 10, this.MY_RANK_POS, 56, 84);
				})
			}
			else {
				this._ctx.font = "55px Arial";
				this._ctx.fillStyle = "#3d7e9c";
				this._ctx.fillText(`${rank}`, this.PAGE_START_POSX + 65, this.MY_RANK_POS + 55);
			}

			///头像
			let avatarUrl = mySelfInfo.avatarUrl;
			ResMgr.getRes("tongyong/wpk_1.png", (img) => {
				this._ctx.drawImage(img, this.PAGE_START_POSX + 110, this.MY_RANK_POS, 87, 87);
				ResMgr.getRes(avatarUrl, (avatarUrl) => {
					this._ctx.drawImage(avatarUrl, this.PAGE_START_POSX + 110, this.MY_RANK_POS, 87, 87);
				})
			})


			// //名字
			this._ctx.fillStyle = "#3d7e9c";
			this._ctx.font = "28px SimSun";
			this._ctx.textAlign = "left";
			this._ctx.lineWidth = 2;
			this._ctx.strokeStyle = '#3d7e9c';

			this._ctx.strokeText(nick, this.PAGE_START_POSX + 226, this.MY_RANK_POS + 30);
			this._ctx.fillText(nick, this.PAGE_START_POSX + 226, this.MY_RANK_POS + 30);
			let score = mySelfInfo.score;

			let chengHao = this.getTextChanegHao(score);
			let chengHaoIndex = this.getTextChanegHao(score);
			ResMgr.getRes("top/1_" + (chengHaoIndex + 1) + ".png", (img) => {
				this._ctx.drawImage(img, this.PAGE_START_POSX + 230, this.MY_RANK_POS + 40);
			})

			ResMgr.getRes("top/tu_yd.png", (img) => {
				this._ctx.drawImage(img, this.PAGE_START_POSX + 425, this.MY_RANK_POS + 20);
				this._ctx.fillStyle = "#ffffff";
				this._ctx.font = "32px SimSun";
				this._ctx.textAlign = "right";
				this._ctx.lineWidth = 2;
				this._ctx.strokeStyle = '#ffffff';

				this._ctx.strokeText(`${score}`, this.PAGE_START_POSX + 515, this.MY_RANK_POS + 49);
				this._ctx.fillText(`${score}`, this.PAGE_START_POSX + 515, this.MY_RANK_POS + 49);
			});
		}
	}
} 
