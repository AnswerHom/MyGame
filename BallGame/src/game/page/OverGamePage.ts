import { ui } from "../../ui/layaMaxUI";
import { GameApp } from "../GameApp";
import { PageDef } from "../UIRoot";

export class OverGamePage extends ui.test.StartGameUI {
    constructor() {
        super();
        this.btn_Start.on(Laya.Event.CLICK, this, this.onStartGame);
        this.btn_Start.label = "重新开始";
    }

    private onStartGame() {
        GameApp.instance.sceneRoot.startGame();
        GameApp.instance.uiRoot.closePage(PageDef.OVER_PAGE);
    }

    close() {
        this.btn_Start.off(Laya.Event.CLICK, this, this.onStartGame);
    }
}