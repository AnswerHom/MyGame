import { UIRoot } from "./gui/UIRoot";

export class GameApp {
    private _uiRoot: UIRoot;
    get uiRoot() {
        return this._uiRoot;
    }

    constructor() {
        this.init();
    }

    init() {
        this._uiRoot = new UIRoot(this);
        Laya.stage.addChild(this._uiRoot);
    }
}