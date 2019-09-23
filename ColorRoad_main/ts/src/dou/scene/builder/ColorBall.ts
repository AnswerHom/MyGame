module dou.scene.builder{
    export class ColorBall extends BaseBuilder{
        
        private _haveColo:boolean = false;
        private _colo:Laya.SphereCollider;
        public static poolName = 'ColorBall';
       
        private _material:dou.scene.BlinnPhongMaterialExp;
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'ColorBall';

            let mesh:Laya.Mesh = Laya.loader.getRes(Path.scene_model + "play_tw-Sphere001.lm");
            let material:dou.scene.BlinnPhongMaterialExp = this._material = new dou.scene.BlinnPhongMaterialExp();
            // material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.shininess = 0.01;
            this.meshFilter.sharedMesh = mesh;
            this.meshRender.material = material;
            this.name = 'ColorBall';
        }

        protected builder():void
        {
            super.builder();
            this._sceneRoot.obstacleLayer.addChild(this);
        }

        public set color_type(val:number)
        {
            this._color_type = val;
            (this.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoColor = TD.getColor(val);
        }

        public get color_type():number
        {
            return this._color_type;
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