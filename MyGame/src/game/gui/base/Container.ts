import { GameApp } from "../../GameApp";

/**
 * 基础容器
 */
export class Container extends Laya.Sprite {
    // 应用程序引用
    protected _app: GameApp;
    constructor(app: GameApp) {
        super();
        this._app = app;
    }
    // 是否释放
    private _dispose: boolean = false;

    // 释放函数
    dispose(): void {
        this._dispose = true;
    }
}