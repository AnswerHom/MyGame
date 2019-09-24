import { SceneRoot } from "./SceneRoot";
import { UIRoot, PageDef } from "./UIRoot";
import { MapManager } from "./manager/MapManager";

export class GameApp {
    private static _app: GameApp;
    static get instance(): GameApp {
        if (!GameApp._app) {
            GameApp._app = new GameApp();
        }
        return GameApp._app;
    }

    private _sceneRoot: SceneRoot;
    get sceneRoot(): SceneRoot {
        return this._sceneRoot;
    }

    private _uiRoot: UIRoot;
    get uiRoot(): UIRoot {
        return this._uiRoot;
    }

    private _mapManager: MapManager;
    get mapManager(): MapManager {
        if (!this._mapManager) {
            this._mapManager = new MapManager(this._sceneRoot);
        }
        return this._mapManager;
    }

    constructor() {
    }

    init(): void {
        this._sceneRoot = new SceneRoot();
        Laya.stage.addChild(this._sceneRoot);

        this._uiRoot = new UIRoot();
        Laya.stage.addChild(this._uiRoot);

        PageDef.init();
        this._uiRoot.openPage(PageDef.START_PAGE);
    }

    update(diff: number) {
        this._sceneRoot && this._sceneRoot.update(diff);
        this._uiRoot && this._uiRoot.update(diff);
    }

    onMouseDown(): void {
        this._sceneRoot && this._sceneRoot.onMouseDown();
    }

    onMouseUp(): void {
        this._sceneRoot && this._sceneRoot.onMouseUp();
    }

    onMouseMove(): void {
        this._sceneRoot && this._sceneRoot.onMouseMove();
    }
}