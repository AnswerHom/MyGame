import { Container } from "./base/Container";
import { HUD } from "./HUD";
import { General } from "./General";
import { Top } from "./Top";
import { PageDef } from "./page/PageDef";
import { GameApp } from "../GameApp";

export class UIRoot extends Container {
    //HUD层
    private _HUD: HUD;
    get HUD() {
        return this._HUD;
    }
    //普通层
    private _general: General;
    get general() {
        return this._general;
    }
    //最高层
    private _top: Top;
    get top() {
        return this._top;
    }

    constructor(app: GameApp) {
        super(app);
        PageDef.init();

        this._HUD = new HUD(app);
        this.addChild(this._HUD);

        this._general = new General(app);
        this.addChild(this._general);

        this._top = new Top(app);
        this.addChild(this._top);

        this.openLoadPage();
    }

    private openLoadPage(): void {
        this._top.openPage(PageDef.LOAD_PAGE);
    }
}