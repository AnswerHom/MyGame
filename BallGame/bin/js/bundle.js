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
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
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
        init(url) {
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
            this.init("res/grass.png");
            let tilingOffset = this._material.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            this._material.tilingOffset = tilingOffset;
            this._collide = this.addComponent(Laya.PhysicsCollider);
            this._collide.collisionGroup = CollideGroup.GROUND;
            let planeShape = new Laya.BoxColliderShape(10, 0, 10);
            this._collide.colliderShape = planeShape;
        }
    }
    Ground.poolName = "Ground";

    class Building extends BaseObject {
        constructor(long = 2, width = 2, height = 2) {
            super();
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createBox(long, height, width);
            this.init("res/grass.png");
            let tilingOffset = this._material.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            this._material.tilingOffset = tilingOffset;
            this._collide = this.addComponent(Laya.PhysicsCollider);
            this._collide.collisionGroup = CollideGroup.BUILDING;
            let boxShape = new Laya.BoxColliderShape(long, height, width);
            this._collide.colliderShape = boxShape;
            this._collide.isTrigger = true;
        }
    }

    class Ground1 extends Ground {
        constructor() {
            super();
            let building = new Building(2, 2, 2);
            this.addChild(building);
            let offsetX = -4 + 8 * Math.random();
            building.setPos(this.transform.position.x + offsetX, this.transform.position.y + 1, this.transform.position.z);
        }
    }
    Ground1.poolName = "Ground1";

    class Ground2 extends Ground {
        constructor() {
            super();
            let long = 2 + Math.floor(6 * Math.random());
            let x = -5 + long / 2;
            let hollLong = 2;
            for (let i = 0; i < 2; i++) {
                let wall = new Building(long, 2, 2);
                this.addChild(wall);
                let pos1 = wall.transform.position;
                let groundPos = this.transform.position;
                pos1.setValue(groundPos.x + x, groundPos.y + 1, groundPos.z + 1);
                wall.transform.position = pos1;
                let newLong = 10 - long - hollLong;
                x = -5 + long + hollLong + newLong / 2;
                long = newLong;
            }
        }
    }
    Ground2.poolName = "Ground2";

    class CollideGroup {
    }
    CollideGroup.GROUND = 1;
    CollideGroup.BUILDING = 2;
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
                    let num = Math.random();
                    if (num <= 0.3) {
                        def = Ground;
                    }
                    else if (num > 0.3 && num <= 0.8) {
                        def = Ground1;
                    }
                    else {
                        def = Ground2;
                    }
                }
                let ground = Laya.Pool.getItemByClass(def.poolName, def);
                ground.setPos(0, 0, -this._groundIndex++ * 10);
                this._scene.addChild(ground);
                this._showGroundList.push(ground);
            }
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
    }

    class TriggerCollisionScript extends Laya.Script3D {
        constructor() {
            super();
        }
        onTriggerEnter(other) {
            if (this.owner && other.collisionGroup == CollideGroup.BUILDING) {
                this.owner.removeSelf();
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
            this._radius = 0.5;
            this._mess = 10;
            this._speed = 20;
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);
            this.init("res/wood.jpg");
            this._collide = this.addComponent(Laya.Rigidbody3D);
            this._collide.colliderShape = new Laya.SphereColliderShape(this._radius);
            this._collide.mass = this._mess;
            this._collide.isKinematic = true;
            let script = this.addComponent(TriggerCollisionScript);
            script.owner = this;
        }
        update(diff) {
            let pos = this.transform.position;
            let offsetZ = this._speed * diff / 1000;
            this.setPos(pos.x, pos.y, pos.z - offsetZ);
            let rotation = this.transform.rotationEuler;
            let rotateX = 360 * diff / 1000;
            this.setRotate(rotation.x - rotateX, rotation.y, rotation.z);
        }
    }
    Ball.poolName = "Ball";

    class SceneRoot extends Laya.Scene3D {
        constructor() {
            super();
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
            Laya.timer.once(100, this, this.startGame);
        }
        startGame() {
            GameApp.instance.mapManager.createGround(3);
            this.addMainPlayer();
        }
        addMainPlayer() {
            this._mainPlayer = new Ball();
            Laya.timer.once(100, this, this.onAddMainPlayer);
        }
        onAddMainPlayer() {
            GameApp.instance.mapManager.setMainPlayer = this._mainPlayer;
            this.addChild(this._mainPlayer);
            let pos = this._mainPlayer.transform.position;
            pos.y = 0.5;
            this._mainPlayer.transform.position = pos;
            this._ballList.push(this._mainPlayer);
        }
        update(diff) {
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

    class UIRoot extends Laya.Sprite {
        constructor() {
            super();
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
            let diff = Laya.timer.delta;
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
