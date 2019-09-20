import { Container } from "./Container";
import { Page } from "./Page";
import { PageDef } from "../page/PageDef";
import { GameApp } from "../../GameApp";

interface PageMap {
    [index: string]: Page;
}
export class PageContainer extends Container {
    // 页面集合
    protected _pages: PageMap = {};

    constructor(app: GameApp) {
        super(app);
        this.mouseThrough = true;
    }

    openPage(key: number, onOpenFunc?: any, onCloseFunc?: any, createNew: boolean = false) {
        let page: Page;
        if (!createNew) {
            page = this._pages[key]
        }
        if (!page) {
            let pageClass: any = PageDef.getPageClass(key);
            page = new pageClass(this._app, onOpenFunc, () => {
                onCloseFunc && onCloseFunc();
                delete this._pages[key];
            });
            this.addChild(page);
            page.open(key);
        } else {
            //如果有父级就置顶
            if (page.parent) {
                page.parent.setChildIndex(page, page.parent.numChildren - 1);
                page.visible = true;
            }
        }
    }

    // 获取页面
    getPage(key: number): Page {
        return this._pages[key];
    }

    // 关闭页面
    closePage(key: number): void {
        let page: Page = this._pages[key];
        if (page) {
            page.close();
        }
    }

    // 关闭所有页面
    closeAll(): void {
        for (let key in this._pages) {
            this.closePage(Number(key));
        }
        while (this.numChildren)
            this.removeChildAt(0);
    }
}