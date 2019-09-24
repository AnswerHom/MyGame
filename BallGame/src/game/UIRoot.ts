import { StartGamePage } from "./page/StartGamePage";
import { OverGamePage } from "./page/OverGamePage";
import { GameApp } from "./GameApp";
import { SceneRoot } from "./SceneRoot";

/**
 * UI容器
 */
export class PageDef {
    private static _pageClass: any = {};
    static START_PAGE: number = 0;
    static OVER_PAGE: number = 1;
    static init() {
        PageDef._pageClass[PageDef.START_PAGE] = StartGamePage;
        PageDef._pageClass[PageDef.OVER_PAGE] = OverGamePage;
    }

    static getPageClass(key: number): any {
        return PageDef._pageClass[key];
    }
}
export class UIRoot extends Laya.Sprite {
    private _pages: any = {};

    constructor() {
        super();
        GameApp.instance.sceneRoot.on(SceneRoot.EVENT_MAINPLAYER_DEAD, this, this.onMainPlayerDead);
    }

    private onMainPlayerDead(): void {
        GameApp.instance.sceneRoot.gameState = SceneRoot.STATE_OVER;
        this.openPage(PageDef.OVER_PAGE);
    }

    openPage(key: number) {
        let pageClass = PageDef.getPageClass(key);
        let page = new pageClass();
        this.addChild(page);
        this._pages[key] = page;
    }

    closePage(key: number) {
        let page = this._pages[key];
        if (page) {
            page.close();
            page.removeSelf();
            page.destroy(true);
            delete this._pages[key];
        }
    }

    update(diff: number) {

    }
}