import { Container } from "./Container";
import { GameApp } from "../../GameApp";

/**
 * UI页面基类
 */
export class Page extends Container {
    // 视图
    protected _view: Laya.Scene;
    // 素材配置
    protected _asset: Array<string>;
    // 页面打开时执行函数
    private _onOpenFunc: Function;
    // 页面关闭时执行函数
    private _onCloseFunc: Function;
    // 页面索引
    protected _key: number;

    // 是否打开
    public isOpened: boolean = false;

    constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
        super(app);
        this.mouseThrough = true;
    }

    open(key: number) {
        this._key = key;
        this.isOpened = true;
        this.clear();
        Laya.loader.load(this._asset, Laya.Handler.create(this, this.onLoaded));
    }

    private onLoaded(): void {
        if (!this.isOpened) return;
        this.init();
        this.onOpen();
        if (this._view instanceof Laya.View) {
            this._view.mouseThrough = this.mouseThrough;
            this._view.cacheAs = "normal";
            this._view.centerX = 0.5;
            this._view.centerY = 0.5;
        }
    }

    // 页面初始化函数
    protected init(): void {

    }

    // 页面打开时执行函数
    protected onOpen(): void {
        this._onOpenFunc && this._onOpenFunc(this);
    }

    // 清理下页面
    protected clear(): void {
        Laya.timer.clearAll(this);
        if (this._view) {
            this._view.destroy(true);
            this._view = null;
        }
    }

    close() {
        this.clear();
        this._onCloseFunc && this._onCloseFunc(this);
        this.dispose();
    }
}