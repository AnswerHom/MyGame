(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "noscale";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Load.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = false;
    GameConfig.init();

    class Container extends Laya.Sprite {
        constructor(app) {
            super();
            this._dispose = false;
            this._app = app;
        }
        dispose() {
            this._dispose = true;
        }
    }

    class Page extends Container {
        constructor(app, onOpenFunc, onCloseFunc) {
            super(app);
            this.isOpened = false;
            this.mouseThrough = true;
        }
        open(key) {
            this._key = key;
            this.isOpened = true;
            this.clear();
            Laya.loader.load(this._asset, Laya.Handler.create(this, this.onLoaded));
        }
        onLoaded() {
            if (!this.isOpened)
                return;
            this.init();
            this.onOpen();
            if (this._view instanceof Laya.View) {
                this._view.mouseThrough = this.mouseThrough;
                this._view.cacheAs = "normal";
                this._view.centerX = 0.5;
                this._view.centerY = 0.5;
            }
        }
        init() {
        }
        onOpen() {
            this._onOpenFunc && this._onOpenFunc(this);
        }
        clear() {
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

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class LoadUI extends Laya.View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Load");
            }
        }
        ui.LoadUI = LoadUI;
        REG("ui.LoadUI", LoadUI);
        class StartUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Start");
            }
        }
        ui.StartUI = StartUI;
        REG("ui.StartUI", StartUI);
    })(ui || (ui = {}));

    class LoadPage extends Page {
        constructor(app) {
            super(app);
            this._asset = ["res/atlas/comp.atlas"];
        }
        init() {
            this._view = new ui.LoadUI();
            this._view.createView(Laya.View.uiMap['Load']);
            this._viewUI = this._view;
            this.addChild(this._view);
        }
        onOpen() {
            super.onOpen();
            this._viewUI.progress_JD.value = 0;
            Laya.Tween.to(this._viewUI.progress_JD, { value: 1 }, 2000);
        }
        close() {
            super.close();
        }
    }

    class PageDef {
        static init() {
            this._pageClassMap[PageDef.LOAD_PAGE] = LoadPage;
        }
        static getPageClass(key) {
            return PageDef._pageClassMap[key];
        }
    }
    PageDef.LOAD_PAGE = 1;
    PageDef._pageClassMap = {};

    class PageContainer extends Container {
        constructor(app) {
            super(app);
            this._pages = {};
            this.mouseThrough = true;
        }
        openPage(key, onOpenFunc, onCloseFunc, createNew = false) {
            let page;
            if (!createNew) {
                page = this._pages[key];
            }
            if (!page) {
                let pageClass = PageDef.getPageClass(key);
                page = new pageClass(this._app, onOpenFunc, () => {
                    onCloseFunc && onCloseFunc();
                    delete this._pages[key];
                });
                this.addChild(page);
                page.open(key);
            }
            else {
                if (page.parent) {
                    page.parent.setChildIndex(page, page.parent.numChildren - 1);
                    page.visible = true;
                }
            }
        }
        getPage(key) {
            return this._pages[key];
        }
        closePage(key) {
            let page = this._pages[key];
            if (page) {
                page.close();
            }
        }
        closeAll() {
            for (let key in this._pages) {
                this.closePage(Number(key));
            }
            while (this.numChildren)
                this.removeChildAt(0);
        }
    }

    class HUD extends PageContainer {
        constructor(app) {
            super();
        }
    }

    class General extends PageContainer {
        constructor(app) {
            super(app);
        }
    }

    class Top extends PageContainer {
        constructor(app) {
            super(app);
        }
    }

    class UIRoot extends Container {
        get HUD() {
            return this._HUD;
        }
        get general() {
            return this._general;
        }
        get top() {
            return this._top;
        }
        constructor(app) {
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
        openLoadPage() {
            this._top.openPage(PageDef.LOAD_PAGE);
        }
    }

    class GameApp {
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

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.loader.load("ui.json", Laya.Handler.create(this, this.onLoadUIJson, null, false));
        }
        onLoadUIJson() {
            Laya.View.uiMap = Laya.loader.getRes("ui.json");
            let app = new GameApp();
        }
    }
    new Main();

}());
