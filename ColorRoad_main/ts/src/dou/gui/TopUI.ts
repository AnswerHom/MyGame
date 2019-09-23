/**
* 顶层ui
*/
module dou.gui {
	export class TopUI extends dou.gui.base.PageContainer {
		//飘字队列
		private _tipQueue: string[];
		constructor(app: GameApp) {
			super(app);
			this._tipQueue = [];
		}

		/**
		* 显示提示
		* value --文本显示
		* id --物品id，弹物品购买框
		* count --物品购买数量，弹物品购买框
		*/
		public showTip(value: string,id:number = 0,count:number = 0): void {
			if (!value || value.length <= 0) return;
			if (this._tipQueue)
				this._tipQueue.push(value);
		}

		public checkQueue(): void {
			if (this._tipQueue.length != 0) {
				// let message = this._tipQueue.shift();
				// let page = this.getPage(PageDef.TIPS) as dou.gui.page.Tips;
				// if (page) {
				// 	page.setText(message);
				// } else
				// 	this.open(PageDef.TIPS, (page: page.Tips) => {
				// 		page.setText(message);
				// 	}, null, null, true);
			}
		}
	}
}