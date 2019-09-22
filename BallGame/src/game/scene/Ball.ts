import { TriggerCollisionScript } from "../../script/TriggerCollisionScript";

/**
 * 小球
 */
export class Ball extends Laya.MeshSprite3D {
    /**小球半径 */
    private _radius: number = 0.5;
    /**小球质量 */
    private _mess: number = 10;
    /**材质 */
    private _material: Laya.BlinnPhongMaterial;
    /**碰撞器 */
    private _collide: Laya.Rigidbody3D;
    /**速度 */
    private _speed: number = 20;

    constructor() {
        super();
        this.meshFilter.sharedMesh = Laya.PrimitiveMesh.createSphere(this._radius);

        this._material = new Laya.BlinnPhongMaterial();
        //加载纹理资源
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, this.onLoadMaterial, null, false));
        //设置材质
        this.meshRenderer.material = this._material;

        //创建刚体碰撞器
        this._collide = this.addComponent(Laya.Rigidbody3D);
        this._collide.colliderShape = new Laya.SphereColliderShape(this._radius);
        //设置刚体的质量
        this._collide.mass = this._mess;
        this._collide.isKinematic = true;

        let script = this.addComponent(TriggerCollisionScript);
        script.owner = this;
    }

    private onLoadMaterial(tex: Laya.Texture2D) {
        this._material.albedoTexture = tex;
    }

    update(diff: number) {
        let transform = this.transform;
        let pos = transform.position;
        pos.z -= this._speed * diff / 1000;
        transform.position = pos;
        //旋转
        let rotation = transform.rotationEuler;
        rotation.x -= 360 * diff / 1000;
        transform.rotationEuler = rotation;
    }
}