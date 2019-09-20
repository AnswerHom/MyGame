/**
 * 地板
 */
export class Ground extends Laya.MeshSprite3D {
    private _width: number = 10;
    private _height: number = 10;
    /**摩擦系数 */
    private _friction: number = 2;
    /**弹力 */
    private _restitution: number = 0;

    /**材质 */
    private _material: Laya.BlinnPhongMaterial;
    /**碰撞器 */
    private _collide: Laya.PhysicsCollider;

    constructor() {
        super();
        //设置形状
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createPlane(this._width, this._height, 10, 10);
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
        //创建盒子形状碰撞器
        let planeShape = new Laya.BoxColliderShape(this._width, 0, this._height);
        //物理碰撞体设置形状
        this._collide.colliderShape = planeShape;
        //物理碰撞体设置摩擦力
        this._collide.friction = this._friction;
        //物理碰撞体设置弹力
        this._collide.restitution = this._restitution;
    }

    private onLoadMaterial(tex: Laya.Texture2D) {
        this._material.albedoTexture = tex;
    }

    clear(): void {
        this.removeSelf();
    }
}