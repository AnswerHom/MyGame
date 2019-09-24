import { TriggerCollisionScript } from "../../script/TriggerCollisionScript";
import { BaseObject } from "./BaseObject";

/**
 * 小球
 */
export class Ball extends BaseObject {
    static NORMAL_SPEED: number = 20;
    static MAX_SPEED: number = 40;
    /**是否是主玩家 */
    isMainPlayer: boolean = false;

    static poolName: string = "Ball";
    /**小球半径 */
    private _radius: number = 0.5;
    /**碰撞器 */
    private _collide: Laya.Rigidbody3D;
    /**速度 */
    private _speed: number;

    constructor() {
        super();
        this._speed = Ball.NORMAL_SPEED;

        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);
        this.setMaterial("res/wood.jpg");

        //创建刚体碰撞器
        this._collide = this.addComponent(Laya.Rigidbody3D);
        this._collide.colliderShape = new Laya.SphereColliderShape(this._radius);
        //设置刚体的质量 
        this._collide.isKinematic = true;

        let script = this.addComponent(TriggerCollisionScript);
        script.owner = this;
    }

    private _endTime: number = 0;
    addSpeed(): void {
        this._speed = Ball.MAX_SPEED;
        this._endTime = Laya.Browser.now() + 1500;
    }

    update(diff: number) {
        console.log("=======> speed = " + this._speed + "   diff = " + diff);
        let pos = this.transform.position;
        let offsetZ = this._speed * diff / 1000;
        this.setPos(pos.x, pos.y, pos.z - offsetZ);
        //旋转
        let rotation = this.transform.rotationEuler;
        let rotateX = 360 * diff / 1000;
        this.setRotate(rotation.x - rotateX, rotation.y, rotation.z);
        //检查加速
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