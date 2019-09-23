import { Ball } from "./scene/Ball";
import { MapManager } from "./manager/MapManager";
import { GameApp } from "./GameApp";

/**
 * 场景容器
 */
export class SceneRoot extends Laya.Scene3D {
    private _mapManager: MapManager;
    private _mainPlayer: Ball;
    private _ballList: Ball[];
    private _camera: Laya.Camera;

    constructor() {
        super();
        this._ballList = [];
        //初始化照相机
        this._camera = this.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        this._camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        //方向光
        var directionLight = new Laya.DirectionLight();
        this.addChild(directionLight);
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        //设置平行光的方向
        var mat = directionLight.transform.worldMatrix;
        mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
        directionLight.transform.worldMatrix = mat;

        Laya.timer.once(100, this, this.startGame);
    }

    public startGame(): void {
        GameApp.instance.mapManager.createGround(3);
        this.addMainPlayer();
    }

    private addMainPlayer(): void {
        this._mainPlayer = new Ball();
        Laya.timer.once(100, this, this.onAddMainPlayer);
    }

    private onAddMainPlayer(): void {
        GameApp.instance.mapManager.setMainPlayer = this._mainPlayer;
        this.addChild(this._mainPlayer);
        let pos = this._mainPlayer.transform.position;
        pos.y = 0.5;
        this._mainPlayer.transform.position = pos;
        this._ballList.push(this._mainPlayer);
    }

    //心跳
    update(diff: number): void {
        GameApp.instance.mapManager && GameApp.instance.mapManager.update(diff);
        if (this._ballList) {
            let len = this._ballList.length;
            for (let i = 0; i < len; i++) {
                let ball = this._ballList[i];
                ball && ball.update(diff);
            }
        }
        //相机
        if (this._camera && this._mainPlayer && this._mainPlayer.parent) {
            let pos = this._camera.transform.position;
            let playerPos = this._mainPlayer.transform.position;
            pos.setValue(0, playerPos.y + 6, playerPos.z + 9.5);
            this._camera.transform.position = pos;
        }
    }

    //是否按着
    private _isMouseDown: boolean = false;
    //开始滑动坐标
    private _startX: number;
    onMouseDown(): void {
        this._isMouseDown = true;
        this._startX = Laya.stage.mouseX;
    }

    onMouseUp(): void {
        this._isMouseDown = false;
    }

    onMouseMove(): void {
        if (!this._isMouseDown || !this._mainPlayer) return;
        let diff = Laya.stage.mouseX - this._startX;
        this._startX = Laya.stage.mouseX;
        if (Math.abs(diff) >= 0.1) {
            let pos = this._mainPlayer.transform.position;
            pos.x += diff * (15 / Laya.Browser.width);
            this._mainPlayer.transform.position = pos;
        }
    }
}