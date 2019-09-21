import { CollideGroup } from "../manager/MapManager";
import { Building } from "./Building";
import { Platform } from "./Platform";

/**
 * 地板
 */
export class Ground extends Laya.MeshSprite3D {
    static TYPE_1: number = 0;//无障碍物
    static TYPE_2: number = 1;//跳跃
    static TYPE_3: number = 2;//洞口

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
    private _objList: any[] = [];

    private _type: number = 0;
    setType(type: number) {
        this._type = type;

        switch (this._type) {
            case Ground.TYPE_1:
                break;
            case Ground.TYPE_2:
                let platform = new Platform();
                this._objList.push(platform);
                this._scene.addChild(platform);
                let pos1 = platform.transform.position;
                let groundPos = this.transform.position;
                pos1.setValue(groundPos.x, groundPos.y, groundPos.z + 5);
                platform.transform.position = pos1;
                break;
            case Ground.TYPE_3:
                //两个长方体组成
                let long = 2 + Math.floor(6 * Math.random());
                let x = -5 + long / 2;
                let hollLong = 2;
                for (let i = 0; i < 2; i++) {
                    let wall = new Building(long, 2, 2);
                    this._objList.push(wall);
                    this._scene.addChild(wall);
                    let pos1 = wall.transform.position;
                    let groundPos = this.transform.position;
                    pos1.setValue(groundPos.x + x, groundPos.y + 1, groundPos.z + 1);
                    wall.transform.position = pos1;
                    let newLong = 10 - long - hollLong;
                    x = -5 + long + hollLong + newLong / 2;
                    long = newLong;
                }
                break;
        }
    }

    private _scene: Laya.Scene3D;
    constructor(scene: Laya.Scene3D) {
        super();
        this._scene = scene;
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
        this._collide.collisionGroup = CollideGroup.GROUND;
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
        for (let i = 0; i < this._objList.length; i++) {
            let building = this._objList[i];
            building && building.clear();
        }
        this._objList.length = 0;
        this.removeSelf();
    }
}