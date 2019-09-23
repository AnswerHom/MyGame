/**
* 标签页 
*/
module dou.gui.base {
    export class TabPage extends Page {

        //标签页集合
        protected _tabPages: Array<any>;
        protected _selectIdx: number = -1;
        protected _oldSelectIdx: number = 0;
        public tabIndex:number = 0;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
        }

        public get selectIdx(): number {
            return this._selectIdx;
        }
        public get tabPages(): Array<any> {
            return this._tabPages;
        }

        //添加标签页
        protected addTabPage(index: number, value: any): void {
            if (!this._tabPages) return;
            this._tabPages[index] = value;
        }

        //选择
        public selectTab(index: number, isReuse: boolean = false): void {
            if (!this._tabPages) return;
            //防止重复打开页面
            if (!isReuse && this._selectIdx == index) return;
            this._selectIdx = index;
            let len: number = this._tabPages.length;
            for (let i: number = 0; i < len; i++) {
                let pageChild: any = this._tabPages[i];
                if (!pageChild) continue;
                if (i == index) {
                    this._tabPages[i].open();
                }
                else {
                    this._tabPages[i].close();
                }
            }
        }

        // 页面关闭
        public close(): void {
            if (this._tabPages) {
                let len: number = this._tabPages.length;
                for (let i: number = 0; i < len; i++) {
                    if (!this._tabPages[i]) continue;
                    this._tabPages[i].destory();
                    this._tabPages[i] = null;
                }
                this._tabPages = null;
                this._oldSelectIdx = 0;
                this._selectIdx = -1;
                this.tabIndex = 0;
            }
            super.close();
        }
    }
}