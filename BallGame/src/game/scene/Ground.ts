import { CollideGroup } from "../manager/MapManager";
import { Building } from "./Building";
import { Platform } from "./Platform";
import { BaseObject } from "./BaseObject";

/**
 * 普通地板
 */
export class Ground extends BaseObject {
    static poolName = "Ground";

    /**碰撞器 */
    private _collide: Laya.PhysicsCollider;
    private _objList: any[] = [];

    constructor() {
        super();
        //设置形状
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(10, 10, 10, 10);
        this.setMaterial("res/grass.png");
        //设置纹理平铺和偏移
        let tilingOffset = this._material.tilingOffset;
        tilingOffset.setValue(5, 5, 0, 0);
        this._material.tilingOffset = tilingOffset;
        //平面添加物理碰撞体组件
        this._collide = this.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        this._collide.collisionGroup = CollideGroup.GROUND;
        //创建盒子形状碰撞器
        let planeShape = new Laya.BoxColliderShape(10, 0, 10);
        //物理碰撞体设置形状
        this._collide.colliderShape = planeShape;
    }

    //出池调用
    init() {

    }
}