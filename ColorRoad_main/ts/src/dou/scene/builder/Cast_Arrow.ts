module dou.scene.builder{
    export class Cast_Arrow extends BaseBuilder{
        
        private _haveColo:boolean = false;
        private _colo:Laya.BoxCollider;
        public static poolName = 'Cast_Arrow';
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'Cast_Arrow';
        }

        protected builder():void
        {
            super.builder();
            let mesh:Laya.Mesh = Laya.loader.getRes(this._url);
            let material:dou.scene.BlinnPhongMaterialExp = new dou.scene.BlinnPhongMaterialExp();
            material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.shininess = 0.01;
            this.meshFilter.sharedMesh = mesh;
            // this._builder['camera'] = this._sceneRoot.camera; 
            this.updatePos();
            this.meshRender.material = material;
            this.name = 'Cast_Arrow';
            //添加Mesh碰撞器组件并获取
            this._sceneRoot.obstacleLayer.addChild(this);
        }

    
        public update(diff:number):boolean
        {
            if(!this._isLoad)return;
            let diff1 = Math.abs(this._sceneRoot.camera.position.z - this.transform.position.z);
            if(-1 < diff1 &&  diff1< 8)
            {
                if(!this._haveColo)
                {
                    if(!this._colo)
                    {
                        this._colo= this.addComponent(Laya.BoxCollider) as Laya.BoxCollider;
                        this._colo.setFromBoundBox(this.meshFilter.sharedMesh.boundingBox);
                        
                    }
                    else
                    {
                        this._colo.enable = true;
                    }
                    
                    this._haveColo = true;
                }
            }
            else
            {
                if(this._haveColo)
                {
                    this._haveColo = false;
                    if(this._colo)
                         this._colo.enable = false;
                }
            }
            return super.update(diff);
        }
    }
}