import { Ground } from "../scene/Ground";
import { Ball } from "../scene/Ball";

export class CollideGroup {
    static GROUND: number = 1;
    static BUILDING: number = 2;
}

export class MapManager {
    private _showGroundList: Ground[];
    private _freeGroundList: Ground[];
    private _player: Ball;
    private _scene: Laya.Scene3D;
    private _groundIndex: number = 0;
    private _index: number;

    set setMainPlayer(player: Ball) {
        this._player = player;
    }

    constructor(scene: Laya.Scene3D) {
        this._showGroundList = [];
        this._freeGroundList = [];
        this._scene = scene;
        this.createGround(3);
    }

    createGround(count: number = 1): void {
        for (let i = 0; i < count; i++) {
            let ground = this._freeGroundList.shift();
            if (!ground) {
                ground = new Ground(this._scene);
            }
            let pos = ground.transform.position;
            pos.x = pos.y = 0;
            pos.z = -this._groundIndex++ * 10;
            ground.transform.position = pos;
            this._showGroundList.push(ground);
            this._scene.addChild(ground);
            let type = Ground.TYPE_1;
            if (this._groundIndex > 3) {
                type = Math.random() >= 0.5 ? Ground.TYPE_2 : Ground.TYPE_3;
            }
            ground.setType(type);
        }
    }

    update(diff: number) {
        if (!this._player || !this._player.parent) return;
        //检查回收地板
        let len = this._showGroundList.length;
        for (let i = 0; i < len; i++) {
            let ground = this._showGroundList[i];
            if (ground && ground.transform.position.z - this._player.transform.position.z > 10) {
                //回收
                ground.clear();
                this._freeGroundList.push(ground);
                this._showGroundList.splice(i--, 1);
            }
        }
        // console.log("=========> show = " + this._showGroundList.length + "  free = " + this._freeGroundList.length);
        //检查创建新地板
        let index = Math.floor(Math.abs(this._player.transform.position.z / 10));
        if (index != this._index) {
            // console.log("=========> this._groundIndex = " + this._groundIndex)
            this._index = index;
            this.createGround();
        }
    }
}