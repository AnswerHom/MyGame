module dou.scene.builder{
    export class Road extends BaseBuilder{
        public static poolName = 'Road';
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'Road';
        }

        protected builder():void
        {
            super.builder();
            let mesh:Laya.Mesh = Laya.loader.getRes(this._url);
            let material:dou.scene.BlinnPhongMaterialExp = new dou.scene.BlinnPhongMaterialExp();
            material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.albedoColor = this._albedoColor;
            material.shininess = 0.01;
            // material.specularTexture
            // material.setDiffuseTexture(Laya.Texture2D.load(this._material_url));
            // material.setHasLight(true);
            // material.setHasFog(false);
            // material.setFogEnd(50);
            // material.setFogDensity(0.1);
            // material.setFogColor( new Laya.Vector4(195 / 255, 197 / 255, 185 / 255, 1));
            this.meshFilter.sharedMesh = mesh;
            this.meshRender.material = material;
            this.updatePos();
            this._sceneRoot.mapLayer.addChild(this);
        }
        
        
        protected needRemove():boolean
        {
            return this._sceneRoot.camera.position.z - this.transform.position.z > 30;
        }

        public destory():void
        {
            super.destory();
        }

    }
}