/**
* 页面容器 
*/
module dou.gui.base {

	interface PageMap {
		[index: string]: Page;
	}

	export class PageContainer extends Container {

		// 页面集合
		protected _pages: PageMap = {};

		constructor(app: GameApp) {
			super(app);
			//鼠标能穿过层
			this.mouseThrough = true;
		}

		// 打开页面
		open(key: number, onOpenFunc?: Function, onCloseFunc?: Function, bronSprite?: Sprite, createNew?: boolean,prevView?: any): Page {
			//入口是否开启
			// if(!PageDef.checkTurnedPage(this._app,key))return null;
			console.log(key);
			let page: Page;
			if (!createNew) {
				page = this._pages[key]
			}
			if (!page) {
				let pageClass: any = dou.gui.page.PageDef.getPageClass(key);
				page = new pageClass(this._app, onOpenFunc, () => {
					onCloseFunc && onCloseFunc(page);
					delete this._pages[key];
				});
				page.resize(this._clientWidth, this._clientHeight, false);
				this._pages[key] = page;
				this.addChild(page);
				page.open(key, bronSprite,prevView);
			}
			else {
				if(page.parent){
					page.parent.setChildIndex(page, page.parent.numChildren - 1);
					page.visible = true;
				}
			}
			// if(!page.isOpened){
			// 	page.open();
			// }
			// else{
			// 	//置顶
			// 	if(page.parent)
			// 		page.parent.setChildIndex(page,page.parent.numChildren - 1);
			// }
			return page;
		}

		// 获取页面
		getPage(key: number): Page {
			return this._pages[key];
		}

		//界面是否打开
		isOpened(key: number):boolean{
			if(!this._pages[key]) return false;
			return this._pages[key].isOpened;
		}

		// 关闭页面
		close(key: number): void {
			let page: Page = this._pages[key];
			if (page) {
				page.close();
			}
		}

		// 关闭所有页面
		closeAll(): void {
			for (let key in this._pages) {
				this.close(Number(key));
			}
			while (this.numChildren)
				this.removeChildAt(0);
		}

		//获取最上页面的key
		getTopKey(): string {
			if (this.numChildren) {
				let top: Page = this.getChildAt(this.numChildren - 1) as Page;
				if (top) {
					for (let key in this._pages) {
						if (this._pages[key] == top)
							return key;
					}
				}
			}
		}

		// 确认函数
		enter(): boolean {
			if (this.numChildren) {
				let top: Page = this.getChildAt(this.numChildren - 1) as Page;
				if (top) {
					return top.enter();
				}
			}
			return false;
		}

		// 取消函数
		cancel(): boolean {
			if (this.numChildren) {
				let topPage: any = this.getChildAt(this.numChildren - 1);
				if (topPage instanceof Page) {
					return topPage.cancel();
				}
			}
			return false;
		}

		resize(w: number, h: number): void {
			super.resize(w, h);
			for (let key in this._pages) {
				let page: Page = this._pages[key];
				if (page) {
					page.resize(w, h);
				}
			}
		}

		// 释放函数
		dispose(): void {
			this.closeAll();
			this._pages = null;
			super.dispose();
		}
	}
}