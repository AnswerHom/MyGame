import { Page } from "../base/Page";
import { GameApp } from "../../GameApp";
import { ui } from "../../../ui/layaMaxUI";

export class LoadPage extends Page {
    private _viewUI: ui.LoadUI;

    constructor(app: GameApp) {
        super(app);
        this._asset = ["res/atlas/comp.atlas"];
    }

    protected init() {
        this._view = new Laya.Scene();
        this._view.createView(Laya.View.uiMap['Load']);
        this._viewUI = <ui.LoadUI>this._view;
        this.addChild(this._view);
    }

    protected onOpen() {
        super.onOpen();
        this._viewUI.progress_JD.value = 0;
        Laya.Tween.to(this._viewUI.progress_JD, { value: 1 }, 2000);
    }

    close() {
        Laya.Tween.clearAll(this._viewUI.progress_JD);
        super.close();
    }
}