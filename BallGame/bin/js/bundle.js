(function () {
    'use strict';

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
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

    class Ground extends Laya.MeshSprite3D {
        constructor() {
            super();
            this._width = 10;
            this._height = 10;
            this._friction = 2;
            this._restitution = 0;
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(this._width, this._height, 10, 10);
            this._material = new Laya.BlinnPhongMaterial();
            let tilingOffset = this._material.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            this._material.tilingOffset = tilingOffset;
            this.meshRenderer.material = this._material;
            Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, this.onLoadMaterial, null, false));
            this._collide = this.addComponent(Laya.PhysicsCollider);
            let planeShape = new Laya.BoxColliderShape(this._width, 0, this._height);
            this._collide.colliderShape = planeShape;
            this._collide.friction = this._friction;
            this._collide.restitution = this._restitution;
        }
        onLoadMaterial(tex) {
            this._material.albedoTexture = tex;
        }
        clear() {
            this.removeSelf();
        }
    }

    class MapManager {
        constructor(scene) {
            this._groundIndex = 0;
            this._showGroundList = [];
            this._freeGroundList = [];
            this._scene = scene;
            this.createGround(3);
        }
        set setMainPlayer(player) {
            this._player = player;
        }
        createGround(count = 1) {
            for (let i = 0; i < count; i++) {
                let ground = this._freeGroundList.shift();
                if (!ground) {
                    ground = new Ground();
                }
                let pos = ground.transform.position;
                pos.x = pos.y = 0;
                pos.z = -this._groundIndex++ * 10;
                ground.transform.position = pos;
                this._showGroundList.push(ground);
                this._scene.addChild(ground);
            }
        }
        update(diff) {
            if (!this._player)
                return;
            let len = this._showGroundList.length;
            for (let i = 0; i < len; i++) {
                let ground = this._showGroundList[i];
                if (ground && ground.transform.position.z - this._player.transform.position.z > 10) {
                    ground.clear();
                    this._freeGroundList.push(ground);
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

    class Ball extends Laya.MeshSprite3D {
        constructor() {
            super();
            this._radius = 0.5;
            this._mess = 10;
            this._speed = 20;
            this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);
            this._material = new Laya.BlinnPhongMaterial();
            Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, this.onLoadMaterial, null, false));
            this.meshRenderer.material = this._material;
            this._collide = this.addComponent(Laya.Rigidbody3D);
            this._collide.colliderShape = new Laya.BoxColliderShape(this._radius, this._radius, this._radius);
            this._collide.mass = this._mess;
        }
        onLoadMaterial(tex) {
            this._material.albedoTexture = tex;
        }
        update(diff) {
            var transform = this.transform;
            var pos = transform.position;
            pos.z -= this._speed * diff / 1000;
            this.transform.position = pos;
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            this._ballList = [];
            this.newScene = Laya.stage.addChild(new Laya.Scene3D());
            this._camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100));
            this._camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
            var directionLight = new Laya.DirectionLight();
            this.newScene.addChild(directionLight);
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
            this._mapManager = new MapManager(this.newScene);
            this.addMainPlayer();
            Laya.timer.frameLoop(1, this, this.update);
        }
        addMainPlayer() {
            this._mainPlayer = new Ball();
            Laya.timer.once(100, this, this.onAddMainPlayer);
        }
        onAddMainPlayer() {
            if (this._mapManager)
                this._mapManager.setMainPlayer = this._mainPlayer;
            this.newScene.addChild(this._mainPlayer);
            let pos = this._mainPlayer.transform.position;
            pos.y = 0.5;
            this._mainPlayer.transform.position = pos;
            this._ballList.push(this._mainPlayer);
        }
        update() {
            let diff = Laya.timer.delta;
            this._mapManager && this._mapManager.update(diff);
            if (this._ballList) {
                let len = this._ballList.length;
                for (let i = 0; i < len; i++) {
                    let ball = this._ballList[i];
                    ball && ball.update(diff);
                }
            }
            if (this._camera && this._mainPlayer) {
                let pos = this._camera.transform.position;
                let playerPos = this._mainPlayer.transform.position;
                pos.setValue(playerPos.x, playerPos.y + 6, playerPos.z + 9.5);
                this._camera.transform.position = pos;
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
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
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

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
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
