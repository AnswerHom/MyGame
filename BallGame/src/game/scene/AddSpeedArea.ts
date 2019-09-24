import { BaseObject } from "./BaseObject";
import { CollideGroup } from "../manager/MapManager";

export class AddSpeedArea extends BaseObject {
    private _collide: Laya.PhysicsCollider;
    constructor() {
        super();
        this.setMaterial("res/wood.jpg");
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(2, 2);
        //平面添加物理碰撞体组件
        this._collide = this.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        this._collide.collisionGroup = CollideGroup.ADD_SPEED;
        //创建盒子形状碰撞器
        let planeShape = new Laya.BoxColliderShape(2, 0, 2);
        //物理碰撞体设置形状
        this._collide.colliderShape = planeShape;
        this._collide.isTrigger = true;
    }
}