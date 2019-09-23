module page{
	export class ResultPage{
	
		private SHOW_COUNT:number = 50;//最多显示条数
		private PAGE_SIZE:number = 6;
		private ITEM_HEIGHT:number = 162;

		private _dataArr:any;
		private _dataShowArr:any[];
		private _needLoadData:boolean = false;
		public isOpened:boolean = false;
		private _app:any;
		private _ctx:any;
		private _bg:any;
		private _bgisLoad:boolean = false;
		private _bg1:any;
		private _bg1isLoad:boolean = false;
		private _bg2:any;
		private _bg2isLoad:boolean = false;
		private _bg3:any;
		private _bg3isLoad:boolean = false;
		constructor(app:any){
			this._app = app;
			this.init();
		}
		
		private init():void{
			let api: any = window["externalInterfacePI"];
			let canvas = api.getSharedCanvas();
			this._ctx = canvas.getContext('2d');
			this._ctx.imageSmoothingEnabled = true;
			this._ctx.imageSmoothingQuality = "high";
		}
		
		public open():void
		{
			if(this._needLoadData && this._dataArr){
				this.updateShow();
				this.updateList();
			}
			this.isOpened = true;
		}
		
		public close():void{
			this.isOpened = false;
			this._ctx.clearRect(0, 0, 1000, 1000);
		}
		
		//设置数据
		public setData(type,score,data):void{
			console.log("====================",type,score,data)
			this._dataArr = data;
			if(!this.isOpened){
				this._needLoadData = true;
				return;
			}
			this.updateShow();
			this.updateList();
			
			let selftop:any = this._app.wxSelfInfo;
			let idx:number = 0;
			let selfTop:number = 0;
			console.log('self',selftop)
			let len:number = this._dataArr ? this._dataArr.length:0;
			let index:number = 0;
			for(let i=0;i<len;i++)
			{
				let rowData:any= this._dataArr[i];
				if(!rowData) continue;
				// if(selftop.openid == rowData.openid){
				// 	index = i;
				// 	selfTop = idx+1;
				// 	break;
				// }
				idx++;
			}
			
		}
		
		//更新显示
		private updateShow():void
		{
			console.log('进来level')
			// this.clearDataShow();
			if(!this._dataArr) return;
			if(!this._dataShowArr){
				this._dataShowArr = new Array();
			}
			else{
				this._dataShowArr.length = 0;
			}
			console.log('updateShow',this._dataArr.length)
			let idx:number = 0;
			let index:number = 0;
			let selftop:any = this._app.wxSelfInfo;
			for(let i=0;i<this._dataArr.length;i++)
			{
				let rowData:any= this._dataArr[i];
				if(!rowData) continue;
				// if(selftop.openid == rowData.openid){
				// 	index = i;
				// 	break;
				// }
			}
			if(index == 0)
			{
				for(let i = 0 ; i < this._dataArr.length && i < 3; i++)
				{
					this._dataArr[i].rank = i + 1;
					this._dataShowArr.push(this._dataArr[i])
				}
			}
			else
			{
				for(let i = index - 1 ; i < this._dataArr.length && i < index + 2; i++)
				{
					this._dataArr[i].rank = i + 1;
					this._dataShowArr.push(this._dataArr[i])
				}
			}
		}
		


		private updateList():void
		{
			let api: any = window["externalInterfacePI"];
			
			if(!this._bg1)
			{
				this._bg1 = api.Image();
				this._bg1.src = 'ui/jiesuan/tu_d1.png';
				this._bg1.onload = () => {
					this._bg1isLoad = true;
					this._updateList();
				}
			}
			if(this._bg1isLoad)
				this._updateList();

			if(!this._bg2)
			{
				this._bg2 = api.Image();
				this._bg2.src = 'ui/jiesuan/tu_d2.png';
				this._bg2.onload = () => {
					this._bg2isLoad = true;
					this._updateList();
				}
			}
			if(this._bg2isLoad)
				this._updateList();

			if(!this._bg3)
			{
				this._bg3 = api.Image();
				this._bg3.src = 'ui/jiesuan/tu_d3.png';
				this._bg3.onload = () => {
					this._bg3isLoad = true;
					this._updateList();
				}
			}
			if(this._bg3isLoad)
				this._updateList();
		}
		
		private _updateList():void{
			const pagedData = this._dataShowArr;
			const pageLen = pagedData.length;

			this._ctx.clearRect(0, 0, 1000, 1000);
			console.log("this.updateList.page", pageLen)
			for(let i = 0; i < pageLen; i++)
			{
				this.drawRankItem(this._ctx, i, pagedData[i].rank, pagedData[i]);
			}
		}
		
		//canvas原点在左上角
		private drawRankItem(ctx, index, rank, data)
		{
			let api: any = window["externalInterfacePI"];
			// cell.setData(rowData.openid,index+1,rowData.nickname,rowData.score,rowData.avatarUrl);
			const avatarUrl = data.avatarUrl;
			const nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
			const grade = data.score;
			const itemGapX = (this.ITEM_HEIGHT + 8) * index;
			console.log("this.drawRankItem",index, nick)
			//绘制背景
	
			let idx:number = rank < 3 ? rank : 3;
			// ResMgr.getRes(, (img) => {
				ctx.drawImage(this["_bg" + idx], itemGapX +  60, 50, 162, 279);

				//头像描边
				ctx.beginPath();
            	ctx.moveTo(itemGapX +  96, 78);
            	ctx.lineTo(itemGapX +  184, 78); 
            	ctx.lineTo(itemGapX +  184, 166); 
            	ctx.lineTo(itemGapX +  96, 166); 
            	ctx.lineTo(itemGapX +  96, 78); 
            	ctx.closePath();//闭合路径 
            	ctx.lineWidth = 3; 
            	ctx.strokeStyle = 'block';
            	ctx.lineJoin = "round";
            	ctx.stroke();  

				//头像
				ResMgr.getRes(avatarUrl, (img) => {
					ctx.drawImage(img, itemGapX +  96, 78, 88, 88);
				})

				//名字
				ctx.baseLine = "middle";
				ctx.font = "bold 16px Arial";
				ctx.fillStyle = "#ffffff";
				ctx.textAlign="center";
				ctx.fillText(nick, itemGapX +  140,  200, 80);

				//分数
				ctx.baseLine = "middle";
				ctx.font = "bold 36px Arial";
				ctx.fillStyle = "#ffffff";
				ctx.textAlign="center";
				ctx.fillText(`${grade}`, itemGapX +  138,  258);

				


			// })
			ResMgr.getRes('ui/jiesuan/top_' + idx + '.png', (img) => {
				ctx.drawImage(img, itemGapX +  98, 15, 80, 80);

				// //名次
				// if (rank > 2){
				// 	ctx.baseLine = "middle";
				// 	ctx.font = "bold 36px Arial";
				// 	ctx.fillStyle = "#ffffff";
				// 	ctx.fillText(`${rank}`, itemGapX +  120, 65);
				// }



			})
			
			
			
			// //头像
			// ResMgr.getRes(avatarUrl, (img) => {
			// 	ctx.drawImage(img, itemGapX +  90, 80, 88, 88);
			// })

			
		}
	}
} 
