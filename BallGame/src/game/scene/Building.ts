import { CollideGroup } from "../manager/MapManager";

/**
 * 地板
 */
export class Building extends Laya.MeshSprite3D {

    /**材质 */
    private _material: Laya.BlinnPhongMaterial;
    /**碰撞器 */
    private _collide: Laya.PhysicsCollider;

    constructor(long: number = 2, width: number = 2, height: number = 2) {
        super();
        //设置形状
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createBox(long, height, width);
        //设置材质
        this._material = new Laya.BlinnPhongMaterial();
        //设置纹理平铺和偏移
        let tilingOffset = this._material.tilingOffset;
        tilingOffset.setValue(5, 5, 0, 0);
        this._material.tilingOffset = tilingOffset;
        this.meshRenderer.material = this._material;
        Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, this.onLoadMaterial, null, false));
        //平面添加物理碰撞体组件
        this._collide = this.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        this._collide.collisionGroup = CollideGroup.BUILDING;
        //创建盒子形状碰撞器
        let boxShape = new Laya.BoxColliderShape(long, height, width);
        //物理碰撞体设置形状
        this._collide.colliderShape = boxShape;
        // this._collide.enabled = false;
        this._collide.isTrigger = true;
    }

    private onLoadMaterial(tex: Laya.Texture2D) {
        this._material.albedoTexture = tex;
    }

    clear(): void {
        this.removeSelf();
    }
}