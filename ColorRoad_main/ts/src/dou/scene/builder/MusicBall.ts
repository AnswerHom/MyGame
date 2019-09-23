module dou.scene.builder{
    export class MusicBall extends BaseBuilder{
        
        private _haveColo:boolean = false;
        private _colo:Laya.SphereCollider;
        public static poolName = 'MusicBall';
        private _material:dou.scene.BlinnPhongMaterialExp;
        private _musicIndex:string;
        constructor(scene:SceneRoot)
        {
            super(scene);
            this.poolName = 'MusicBall';

            let mesh:Laya.Mesh = Laya.loader.getRes(Path.scene_model + "play-play.lm");
            let material:dou.scene.BlinnPhongMaterialExp = this._material = new dou.scene.BlinnPhongMaterialExp();
            material.albedoTexture = Laya.Texture2D.load(Path.scene_material +  "yinfu.jpg");
            material.shininess = 0.01;
            this.meshFilter.sharedMesh = mesh;
            this.meshRender.material = material;
            this.name = 'MusicBall';
        }

        protected builder():void
        {
            super.builder();
            this._sceneRoot.obstacleLayer.addChild(this);
        }

        public set musicIndex(val:string)
        {
            this._musicIndex = val;
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
            if(this._musicIndex && PlayerDataMgr.isPlayActionMusic)
                Laya.SoundManager.playSound(StringU.substitute("scene/sound/{0}.mp3",this._musicIndex));
        }
    }
}