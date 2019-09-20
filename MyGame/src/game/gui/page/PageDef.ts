import { LoadPage } from "./LoadPage";

/**
 * 页面集合
 */
interface ClassMap {
    [index: string]: Object;
}
export class PageDef {
    static LOAD_PAGE: number = 1;

    //页面集合
    private static _pageClassMap: ClassMap = {};

    public static init(): void {
        this._pageClassMap[PageDef.LOAD_PAGE] = LoadPage;
    }

    public static getPageClass(key: number): Object {
        return PageDef._pageClassMap[key];
    }
}