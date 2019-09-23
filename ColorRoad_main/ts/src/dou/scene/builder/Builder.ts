module dou.scene.builder{
    export class Builder extends BaseBuilder{
        public isRever:boolean = false;
        public reverOffsetX:number = 0;
        public static material:dou.scene.BlinnPhongMaterialExp
        public static poolName = 'Builder';
        constructor(scene:SceneRoot)
        {
            super(scene)
            this.poolName = 'Builder';
        }

        protected builder():void
        {
            super.builder();
            
            let mesh:Laya.BoxMesh = new Laya.BoxMesh(0.7, 1, 2 + 6 * Math.random());
            this.meshFilter.sharedMesh = mesh;
            if(!Builder.material)
            {
                Builder.material = new dou.scene.BlinnPhongMaterialExp();
                Builder.material.albedoColor = new Vector4(0.3,0.4,0.5);
                Builder.material.shininess = 0.1;
            }
            this.transform.position.x = this._offsetX;
            this.transform.position.y = this._offsetY;
            this.transform.position.y = this._startZ;
            this.transform.position = this.transform.position;
            // this._builder.transform.localScale = new Vector3(this.isRever ? -1: 1, 1, 1);
            this.meshRender.material = Builder.material;
            this.name = 'Builder';
            this._sceneRoot.builderLayer.addChild(this);
        }
    }
}