import { TriggerCollisionScript } from "../../script/TriggerCollisionScript";
import { BaseObject } from "./BaseObject";

/**
 * 小球
 */
export class Ball extends BaseObject {
    static poolName: string = "Ball";
    /**小球半径 */
    private _radius: number = 0.5;
    /**小球质量 */
    private _mess: number = 10;
    /**碰撞器 */
    private _collide: Laya.Rigidbody3D;
    /**速度 */
    private _speed: number = 20;

    constructor() {
        super();
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);
        this.init("res/wood.jpg");

        //创建刚体碰撞器
        this._collide = this.addComponent(Laya.Rigidbody3D);
        this._collide.colliderShape = new Laya.SphereColliderShape(this._radius);
        //设置刚体的质量
        this._collide.mass = this._mess;
        this._collide.isKinematic = true;

        let script = this.addComponent(TriggerCollisionScript);
        script.owner = this;
    }

    update(diff: number) {
        let pos = this.transform.position;
        let offsetZ = this._speed * diff / 1000;
        this.setPos(pos.x, pos.y, pos.z - offsetZ);
        //旋转
        let rotation = this.transform.rotationEuler;
        let rotateX = 360 * diff / 1000;
        this.setRotate(rotation.x - rotateX, rotation.y, rotation.z);
    }

}