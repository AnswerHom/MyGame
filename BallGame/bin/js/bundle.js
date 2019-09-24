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
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/StartGame.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = true;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class BaseObject extends Laya.MeshSprite3D {
        constructor() {
            super();
            this._textureUrl = "";
            this._material = new Laya.BlinnPhongMaterial();
            this.meshRenderer.material = this._material;
        }
        setMaterial(url) {
            this._textureUrl = url;
            Laya.Texture2D.load(url, Laya.Handler.create(this, this.onLoadMaterial, null, false));
        }
        onLoadMaterial(tex) {
            this._material.albedoTexture = tex;
        }
        setPos(x, y, z) {
            let pos = this.transform.position;
            pos.setValue(x, y, z);
            this.transform.position = pos;
        }
        setRotate(x, y, z) {
            let rotation = this.transform.rotationEuler;
            rotation.setValue(x, y, z);
            this.transform.rotationEuler = rotation;
        }
        clear() {
            this.removeSelf();
        }
    }
    BaseObject.poolName = "BaseObject";

    class Ground extends BaseObject {
        constructor() {
            super();
            this._objList = [];
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(10, 10, 10, 10);
            this.setMaterial("res/grass.png");
            let tilingOffset = this._material.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            this._material.tilingOffset = tilingOffset;
            this._collide = this.addComponent(Laya.PhysicsCollider);
            this._collide.collisionGroup = CollideGroup.GROUND;
            let planeShape = new Laya.BoxColliderShape(10, 0, 10);
            this._collide.colliderShape = planeShape;
        }
        init() {
        }
    }
    Ground.poolName = "Ground";

    class Building extends BaseObject {
        constructor(long = 2, width = 2, height = 2) {
            super();
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createBox(long, height, width);
            this.setMaterial("res/grass.png");
            let tilingOffset = this._material.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            this._material.tilingOffset = tilingOffset;
            this._collide = this.addComponent(Laya.PhysicsCollider);
            this._collide.collisionGroup = CollideGroup.BUILDING;
            let boxShape = new Laya.BoxColliderShape(long, height, width);
            this._collide.colliderShape = boxShape;
            this._collide.isTrigger = true;
        }
        size(long, width, height) {
            if (this.meshFilter)
                this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createBox(long, height, width);
            let boxShape = new Laya.BoxColliderShape(long, height, width);
            this._collide.colliderShape = boxShape;
        }
    }

    class Ground1 extends Ground {
        constructor() {
            super();
            this._building = new Building(2, 2, 2);
            this.addChild(this._building);
        }
        init() {
            super.init();
            let offsetX = -4 + 8 * Math.random();
            this._building.setPos(this.transform.position.x + offsetX, this.transform.position.y + 1, this.transform.position.z);
        }
    }
    Ground1.poolName = "Ground1";

    class Ground2 extends Ground {
        constructor() {
            super();
            this._holeLong = 4;
            this._buildingList = [];
            for (let i = 0; i < 2; i++) {
                let building = new Building();
                this.addChild(building);
                this._buildingList.push(building);
            }
        }
        init() {
            super.init();
            let long = 2 + Math.floor(4 * Math.random());
            let x = -5 + long / 2;
            for (let i = 0; i < 2; i++) {
                let building = this._buildingList[i];
                if (!building)
                    continue;
                building.size(long, 2, 2);
                this.addChild(building);
                this._buildingList.push(building);
                let pos1 = building.transform.position;
                let groundPos = this.transform.position;
                pos1.setValue(groundPos.x + x, groundPos.y + 1, groundPos.z + 1);
                building.transform.position = pos1;
                let newLong = 10 - long - this._holeLong;
                x = -5 + long + this._holeLong + newLong / 2;
                long = newLong;
            }
        }
    }
    Ground2.poolName = "Ground2";

    class AddSpeedArea extends BaseObject {
        constructor() {
            super();
            this.setMaterial("res/wood.jpg");
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(2, 2);
            this._collide = this.addComponent(Laya.PhysicsCollider);
            this._collide.collisionGroup = CollideGroup.ADD_SPEED;
            let planeShape = new Laya.BoxColliderShape(2, 0, 2);
            this._collide.colliderShape = planeShape;
            this._collide.isTrigger = true;
        }
    }

    class Ground3 extends Ground {
        constructor() {
            super();
            this._area = new AddSpeedArea();
            this.addChild(this._area);
        }
        init() {
            super.init();
            if (this._area) {
                let offsetX = -3 + 6 * Math.random();
                this._area.setPos(offsetX, 0.5, 5);
            }
        }
    }
    Ground3.poolName = "Ground3";

    class CollideGroup {
    }
    CollideGroup.GROUND = 1;
    CollideGroup.BUILDING = 2;
    CollideGroup.ADD_SPEED = 3;
    class MapManager {
        constructor(scene) {
            this._groundIndex = 0;
            this._showGroundList = [];
            this._scene = scene;
        }
        set setMainPlayer(player) {
            this._player = player;
        }
        createGround(count = 1) {
            for (let i = 0; i < count; i++) {
                let def;
                if (this._groundIndex <= 3) {
                    def = Ground;
                }
                else {
                    def = this.randomGround();
                }
                let ground = Laya.Pool.getItemByClass(def.poolName, def);
                ground.init();
                ground.setPos(0, 0, -this._groundIndex++ * 10);
                this._scene.addChild(ground);
                this._showGroundList.push(ground);
            }
        }
        randomGround() {
            let num = Math.random();
            let def;
            if (num <= 0.3) {
                def = Ground;
            }
            else if (num > 0.3 && num <= 0.5) {
                def = Ground1;
            }
            else if (num > 0.5 && num <= 0.8) {
                def = Ground2;
            }
            else {
                def = Ground3;
            }
            return def;
        }
        update(diff) {
            if (!this._player || !this._player.parent)
                return;
            let len = this._showGroundList.length;
            for (let i = 0; i < len; i++) {
                let ground = this._showGroundList[i];
                if (ground && ground.transform.position.z - this._player.transform.position.z > 10) {
                    ground.clear();
                    if (ground instanceof Ground1)
                        Laya.Pool.recover(Ground1.poolName, ground);
                    else if (ground instanceof Ground2)
                        Laya.Pool.recover(Ground2.poolName, ground);
                    else if (ground instanceof Ground)
                        Laya.Pool.recover(Ground.poolName, ground);
                    this._showGroundList.splice(i--, 1);
                }
            }
            let index = Math.floor(Math.abs(this._player.transform.position.z / 10));
            if (index != this._index) {
                this._index = index;
                this.createGround();
            }
        }
        clear() {
            this._index = 0;
            this._groundIndex = 0;
            let len = this._showGroundList.length;
            for (let i = 0; i < len; i++) {
                let ground = this._showGroundList[i];
                if (ground) {
                    ground.clear();
                    if (ground instanceof Ground1)
                        Laya.Pool.recover(Ground1.poolName, ground);
                    else if (ground instanceof Ground2)
                        Laya.Pool.recover(Ground2.poolName, ground);
                    else if (ground instanceof Ground)
                        Laya.Pool.recover(Ground.poolName, ground);
                    this._showGroundList.splice(i--, 1);
                }
            }
        }
    }

    class TriggerCollisionScript extends Laya.Script3D {
        constructor() {
            super();
        }
        onTriggerEnter(other) {
            if (!this.owner)
                return;
            if (other.collisionGroup == CollideGroup.BUILDING) {
                if (this.owner instanceof Ball) {
                    if (this.owner.isMainPlayer) {
                        GameApp.instance.sceneRoot.ballDead(this.owner);
                    }
                }
            }
            else if (other.collisionGroup == CollideGroup.ADD_SPEED) {
                if (this.owner instanceof Ball) {
                    this.owner.addSpeed();
                }
            }
        }
        onTriggerStay(other) {
        }
        onTriggerExit(other) {
        }
        onCollisionEnter(collision) {
        }
        onCollisionStay(collision) {
        }
        onCollisionExit(collision) {
        }
    }

    class Ball extends BaseObject {
        constructor() {
            super();
            this.isMainPlayer = false;
            this._radius = 0.5;
            this._endTime = 0;
            this._speed = Ball.NORMAL_SPEED;
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);
            this.setMaterial("res/wood.jpg");
            this._collide = this.addComponent(Laya.Rigidbody3D);
            this._collide.colliderShape = new Laya.SphereColliderShape(this._radius);
            this._collide.isKinematic = true;
            let script = this.addComponent(TriggerCollisionScript);
            script.owner = this;
        }
        addSpeed() {
            this._speed = Ball.MAX_SPEED;
            this._endTime = Laya.Browser.now() + 1500;
        }
        update(diff) {
            console.log("=======> speed = " + this._speed + "   diff = " + diff);
            let pos = this.transform.position;
            let offsetZ = this._speed * diff / 1000;
            this.setPos(pos.x, pos.y, pos.z - offsetZ);
            let rotation = this.transform.rotationEuler;
            let rotateX = 360 * diff / 1000;
            this.setRotate(rotation.x - rotateX, rotation.y, rotation.z);
            let nowTime = Laya.Browser.now();
            if (this._endTime && this._endTime - nowTime <= 0) {
                this._endTime = 0;
                this._speed = Ball.NORMAL_SPEED;
            }
        }
        clear() {
            super.clear();
            this._endTime = 0;
            this._speed = Ball.NORMAL_SPEED;
        }
    }
    Ball.NORMAL_SPEED = 20;
    Ball.MAX_SPEED = 40;
    Ball.poolName = "Ball";

    class SceneRoot extends Laya.Scene3D {
        constructor() {
            super();
            this.gameState = 0;
            this._isMouseDown = false;
            this._ballList = [];
            this._camera = this.addChild(new Laya.Camera(0, 0.1, 100));
            this._camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
            var directionLight = new Laya.DirectionLight();
            this.addChild(directionLight);
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
        }
        get mainPlayer() {
            return this._mainPlayer;
        }
        ballDead(ball) {
            if (ball.isMainPlayer) {
                this.event(SceneRoot.EVENT_MAINPLAYER_DEAD);
            }
            let index = this._ballList.indexOf(ball);
            if (index >= 0)
                this._ballList.splice(index, 1);
            ball.clear();
            Laya.Pool.recover(Ball.poolName, ball);
        }
        startGame() {
            GameApp.instance.mapManager.clear();
            this.gameState = SceneRoot.STATE_START;
            GameApp.instance.mapManager.createGround(3);
            this.addMainPlayer();
        }
        addMainPlayer() {
            if (!this._mainPlayer) {
                this._mainPlayer = new Ball();
            }
            this._mainPlayer.isMainPlayer = true;
            this._mainPlayer.setPos(0, 0.5, 0);
            this.onAddMainPlayer();
        }
        onAddMainPlayer() {
            GameApp.instance.mapManager.setMainPlayer = this._mainPlayer;
            this.addChild(this._mainPlayer);
            this._ballList.push(this._mainPlayer);
        }
        update(diff) {
            if (this.gameState != SceneRoot.STATE_START)
                return;
            GameApp.instance.mapManager && GameApp.instance.mapManager.update(diff);
            if (this._ballList) {
                let len = this._ballList.length;
                for (let i = 0; i < len; i++) {
                    let ball = this._ballList[i];
                    ball && ball.update(diff);
                }
            }
            if (this._camera && this._mainPlayer && this._mainPlayer.parent) {
                let pos = this._camera.transform.position;
                let playerPos = this._mainPlayer.transform.position;
                pos.setValue(0, playerPos.y + 6, playerPos.z + 9.5);
                this._camera.transform.position = pos;
            }
        }
        onMouseDown() {
            this._isMouseDown = true;
            this._startX = Laya.stage.mouseX;
        }
        onMouseUp() {
            this._isMouseDown = false;
        }
        onMouseMove() {
            if (!this._isMouseDown || !this._mainPlayer)
                return;
            let diff = Laya.stage.mouseX - this._startX;
            this._startX = Laya.stage.mouseX;
            if (Math.abs(diff) >= 0.1) {
                let pos = this._mainPlayer.transform.position;
                pos.x += diff * (15 / Laya.Browser.width);
                this._mainPlayer.transform.position = pos;
            }
        }
    }
    SceneRoot.EVENT_MAINPLAYER_DEAD = "Dead";
    SceneRoot.STATE_OVER = 0;
    SceneRoot.STATE_START = 1;

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class StartGameUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(StartGameUI.uiView);
                }
            }
            StartGameUI.uiView = { "type": "Scene", "props": { "width": 640, "height": 1136 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 640, "height": 1136, "alpha": 0.8 }, "compId": 4, "child": [{ "type": "Rect", "props": { "width": 640, "lineWidth": 1, "height": 1136, "fillColor": "#000000" }, "compId": 5 }] }, { "type": "Button", "props": { "y": 521, "x": 192, "var": "btn_Start", "skin": "comp/button.png", "scaleY": 2, "scaleX": 2, "labelSize": 30, "labelFont": "SimHei", "label": "开始游戏" }, "compId": 3 }], "loadList": ["comp/button.png"], "loadList3D": [] };
            test.StartGameUI = StartGameUI;
            REG("ui.test.StartGameUI", StartGameUI);
            class TestSceneUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class StartGamePage extends ui.test.StartGameUI {
        constructor() {
            super();
            this.btn_Start.on(Laya.Event.CLICK, this, this.onStartGame);
        }
        onStartGame() {
            GameApp.instance.sceneRoot.startGame();
            GameApp.instance.uiRoot.closePage(PageDef.START_PAGE);
        }
        close() {
            this.btn_Start.off(Laya.Event.CLICK, this, this.onStartGame);
        }
    }

    class OverGamePage extends ui.test.StartGameUI {
        constructor() {
            super();
            this.btn_Start.on(Laya.Event.CLICK, this, this.onStartGame);
            this.btn_Start.label = "重新开始";
        }
        onStartGame() {
            GameApp.instance.sceneRoot.startGame();
            GameApp.instance.uiRoot.closePage(PageDef.OVER_PAGE);
        }
        close() {
            this.btn_Start.off(Laya.Event.CLICK, this, this.onStartGame);
        }
    }

    class PageDef {
        static init() {
            PageDef._pageClass[PageDef.START_PAGE] = StartGamePage;
            PageDef._pageClass[PageDef.OVER_PAGE] = OverGamePage;
        }
        static getPageClass(key) {
            return PageDef._pageClass[key];
        }
    }
    PageDef._pageClass = {};
    PageDef.START_PAGE = 0;
    PageDef.OVER_PAGE = 1;
    class UIRoot extends Laya.Sprite {
        constructor() {
            super();
            this._pages = {};
            GameApp.instance.sceneRoot.on(SceneRoot.EVENT_MAINPLAYER_DEAD, this, this.onMainPlayerDead);
        }
        onMainPlayerDead() {
            GameApp.instance.sceneRoot.gameState = SceneRoot.STATE_OVER;
            this.openPage(PageDef.OVER_PAGE);
        }
        openPage(key) {
            let pageClass = PageDef.getPageClass(key);
            let page = new pageClass();
            this.addChild(page);
            this._pages[key] = page;
        }
        closePage(key) {
            let page = this._pages[key];
            if (page) {
                page.close();
                page.removeSelf();
                page.destroy(true);
                delete this._pages[key];
            }
        }
        update(diff) {
        }
    }

    class GameApp {
        static get instance() {
            if (!GameApp._app) {
                GameApp._app = new GameApp();
            }
            return GameApp._app;
        }
        get sceneRoot() {
            return this._sceneRoot;
        }
        get uiRoot() {
            return this._uiRoot;
        }
        get mapManager() {
            if (!this._mapManager) {
                this._mapManager = new MapManager(this._sceneRoot);
            }
            return this._mapManager;
        }
        constructor() {
        }
        init() {
            this._sceneRoot = new SceneRoot();
            Laya.stage.addChild(this._sceneRoot);
            this._uiRoot = new UIRoot();
            Laya.stage.addChild(this._uiRoot);
            PageDef.init();
            this._uiRoot.openPage(PageDef.START_PAGE);
        }
        update(diff) {
            this._sceneRoot && this._sceneRoot.update(diff);
            this._uiRoot && this._uiRoot.update(diff);
        }
        onMouseDown() {
            this._sceneRoot && this._sceneRoot.onMouseDown();
        }
        onMouseUp() {
            this._sceneRoot && this._sceneRoot.onMouseUp();
        }
        onMouseMove() {
            this._sceneRoot && this._sceneRoot.onMouseMove();
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
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            this._app = GameApp.instance;
            this._app.init();
            Laya.timer.frameLoop(1, this, this.update);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        update() {
            let diff = 20;
            this._app && this._app.update(diff);
        }
        onMouseDown() {
            this._app && this._app.onMouseDown();
        }
        onMouseUp() {
            this._app && this._app.onMouseUp();
        }
        onMouseMove() {
            this._app && this._app.onMouseMove();
        }
    }
    new Main();

}());
