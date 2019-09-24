import { Ground } from "../scene/Ground";
import { Ball } from "../scene/Ball";
import { SceneRoot } from "../SceneRoot";
import { Ground1 } from "../scene/Ground1";
import { Ground2 } from "../scene/Ground2";
import { Ground3 } from "../scene/Ground3";

export class CollideGroup {
    static GROUND: number = 1;//地板
    static BUILDING: number = 2;//障碍物
    static ADD_SPEED: number = 3;//加速带
}

export class MapManager {
    private _showGroundList: Ground[];
    private _player: Ball;
    private _scene: SceneRoot;
    private _groundIndex: number = 0;
    private _index: number;

    set setMainPlayer(player: Ball) {
        this._player = player;
    }

    constructor(scene: SceneRoot) {
        this._showGroundList = [];
        this._scene = scene;
    }

    createGround(count: number = 1): void {
        for (let i = 0; i < count; i++) {
            let def: any;
            if (this._groundIndex <= 3) {
                def = Ground;
            } else {
                def = this.randomGround();
            }
            let ground = Laya.Pool.getItemByClass(def.poolName, def);
            ground.init();
            ground.setPos(0, 0, -this._groundIndex++ * 10);
            this._scene.addChild(ground);
            this._showGroundList.push(ground);
        }
    }

    private randomGround(): any {
        let num = Math.random();
        let def: any;
        if (num <= 0.3) {
            def = Ground;
        } else if (num > 0.3 && num <= 0.5) {
            def = Ground1;
        } else if (num > 0.5 && num <= 0.8) {
            def = Ground2;
        }
        else {
            def = Ground3;
        }
        return def;
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
                if (ground instanceof Ground1)
                    Laya.Pool.recover(Ground1.poolName, ground);
                else if (ground instanceof Ground2)
                    Laya.Pool.recover(Ground2.poolName, ground);
                else if (ground instanceof Ground)
                    Laya.Pool.recover(Ground.poolName, ground);
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

    clear() {
        this._index = 0;
        this._groundIndex = 0;
        let len = this._showGroundList.length;
        for (let i = 0; i < len; i++) {
            let ground = this._showGroundList[i];
            if (ground) {
                //回收
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