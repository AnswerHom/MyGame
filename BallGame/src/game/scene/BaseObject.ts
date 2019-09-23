import { SceneRoot } from "../SceneRoot";

export class BaseObject extends Laya.MeshSprite3D {
    static poolName: string = "BaseObject";
    private _textureUrl: string = "";
    protected _material: Laya.BlinnPhongMaterial;

    constructor() {
        super();
        this._material = new Laya.BlinnPhongMaterial();
        //设置材质
        this.meshRenderer.material = this._material;
    }

    init(url: string) {
        this._textureUrl = url;
        Laya.Texture2D.load(url, Laya.Handler.create(this, this.onLoadMaterial, null, false));
    }

    onLoadMaterial(tex: Laya.Texture2D): void {
        this._material.albedoTexture = tex;
    }

    setPos(x: number, y: number, z: number) {
        let pos = this.transform.position;
        pos.setValue(x, y, z);
        this.transform.position = pos;
    }

    setRotate(x: number, y: number, z: number) {
        let rotation = this.transform.rotationEuler;
        rotation.setValue(x, y, z);
        this.transform.rotationEuler = rotation;
    }

    clear(): void {
        this.removeSelf();
    }
}