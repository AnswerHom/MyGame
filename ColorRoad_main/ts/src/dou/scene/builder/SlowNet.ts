module dou.scene.builder{
    export class SlowNet extends BaseBuilder{
        
        private _haveColo:boolean = false;
        private _colo:Laya.BoxCollider;
        public static poolName = 'SlowNet';
        private effect:Laya.ShuriKenParticle3D;
        private effect1:Laya.ShuriKenParticle3D;
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'SlowNet';
        }

        protected builder():void
        {
            super.builder();
            let mesh:Laya.Mesh = Laya.loader.getRes(Path.scene_model + "play_tw-Sphere001.lm");
            let material:dou.scene.BlinnPhongMaterialExp = new dou.scene.BlinnPhongMaterialExp();
            // material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.shininess = 0.01;
            this.meshFilter.sharedMesh = mesh;
            this.updatePos();
            this.meshRender.material = material;
            this.meshRender.enable = false;
            this.name = 'SlowNet';
            this._sceneRoot.obstacleLayer.addChild(this);

            if(!this.effect)
            {
                this.effect = EffectMgr.getEffect("jiansu0");
                Vector3.ZERO.cloneTo(this.effect.transform.position);
                this.effect.transform.position.z = -0.05;
                this.effect.transform.position = this.effect.transform.position;
                this.addChild(this.effect);

                this.effect1 = EffectMgr.getEffect("jiansu1");
                Vector3.ZERO.cloneTo(this.effect1.transform.position);
                this.effect1.transform.position.z = -0.05;
                this.effect1.transform.position = this.effect1.transform.position;
                this.addChild(this.effect1);
            }
        }

        // public set color_type(val:number)
        // {
        //     this._color_type = val;
        //     switch(val)
        //     {
        //         case 1:
        //             (this.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoColor = new Vector4(1,0,0,1);
        //         break;
        //         case 2:
        //             (this.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoColor = new Vector4(0,1,0,1);
        //         break;
        //         case 3:
        //             (this.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoColor = new Vector4(0,0,1,1);
        //         break;
        //     }

        // }

        // public get color_type():number
        // {
        //     return this._color_type;
        // }

        public updateBlendOffset(c:Laya.Vector4):void
        {
            super.updateBlendOffset(c);
            if (this.effect && this.effect.particleRender.material instanceof ShurikenParticleMaterialExp)
                this.effect.particleRender.material.setBendOffset(c);
            if (this.effect1 && this.effect1.particleRender.material instanceof ShurikenParticleMaterialExp)
                this.effect1.particleRender.material.setBendOffset(c);               
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