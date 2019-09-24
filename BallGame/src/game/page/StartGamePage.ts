import { ui } from "../../ui/layaMaxUI";
import { GameApp } from "../GameApp";
import { PageDef } from "../UIRoot";

export class StartGamePage extends ui.test.StartGameUI {
    constructor() {
        super();
        this.btn_Start.on(Laya.Event.CLICK, this, this.onStartGame);
    }

    private onStartGame() {
        GameApp.instance.sceneRoot.startGame();
        GameApp.instance.uiRoot.closePage(PageDef.START_PAGE);
    }

    close() {
        this.btn_Start.off(Laya.Event.CLICK, this, this.onStartGame);
    }
}