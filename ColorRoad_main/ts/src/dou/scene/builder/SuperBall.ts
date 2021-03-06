module dou.scene.builder{
    export class SuperBall extends BaseBuilder{
        
        private _haveColo:boolean = false;
        private _colo:Laya.SphereCollider;
        public static poolName = 'SuperBall';
        private effect:Laya.ShuriKenParticle3D;
        private effect1:Laya.ShuriKenParticle3D;
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'SuperBall';
        }

        protected builder():void
        {
            super.builder();
            let mesh:Laya.Mesh = Laya.loader.getRes(Path.scene_model + "play_tw-Sphere001.lm");
            let material:dou.scene.BlinnPhongMaterialExp = new dou.scene.BlinnPhongMaterialExp();
            // material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.shininess = 0.01;
            this.meshRender.enable = false;
            this.meshFilter.sharedMesh = mesh;
            this.updatePos();
            this.meshRender.material = material;
            this.name = 'SuperBall';
            this._sceneRoot.obstacleLayer.addChild(this);

            if(!this.effect)
            {
                this.effect = EffectMgr.getEffect("wudi");
                Vector3.ZERO.cloneTo(this.effect.transform.position);
                // this.effect.transform.position.z = -0.05;
                this.effect.transform.position = this.effect.transform.position;
                this.addChild(this.effect);

                this.effect1 = EffectMgr.getEffect("wudi1");
                Vector3.ZERO.cloneTo(this.effect1.transform.position);
                // this.effect.transform.position.z = -0.05;
                this.effect1.transform.position = this.effect1.transform.position;
                // this.addChild(this.effect1);

                
            }
        }

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
                        this._colo= this.addComponent(Laya.SphereCollider) as Laya.SphereCollider;
                        this._colo.radius = BuilderMgr.ball_radis;
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

        public onHit():void
        {
            // this.active = false;
            this._needRecicle = true;
        }
    }
}