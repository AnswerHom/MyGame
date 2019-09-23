module dou.scene.builder{
    export class Road1 implements IPoolsObject{
        public static poolName = 'Road1';
        private _tempLaya:Laya.Sprite3D;
        protected _sceneRoot:ShowRoot;
        protected _builder:MeshSprite3D;
        protected _albedoColor:Vector4 = new Vector4(88/255,186/255,219/255,1);
        protected _url:string;
        protected _material_url:string;
        protected _startZ:number;
        protected _offsetX:number = 0;
        protected _offsetY:number = 0;
        protected _para:string;
        protected _isLoad:boolean = false;
        public obstacleWidth:number = 0.25;
        protected _inpool:boolean = false;
        private _isInit:boolean = false;
        poolName = 'BaseBuilder';

        constructor(scene:ShowRoot)
        {
            this._sceneRoot = scene;
            this.poolName = 'Road1';
        }

        public get builderO():MeshSprite3D
        {
            return this._builder;
        }

        intoPool(...arg):void
        {
            // this._sceneRoot = arg[0];
            if(this._builder)
                this._builder.active = false;
            this._inpool = true;
        }
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void{
            this._sceneRoot = arg[0][0];
            if(this._builder)
                this._builder.active = true;
            this._inpool = false;
        }

        

        public setOffset(offsetX, offsetY, startZ):void
        {
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this._startZ = startZ;
            if(this._builder)
            {
                this._builder.transform.position.x = this._offsetX;
                this._builder.transform.position.y = this._offsetY;
                this._builder.transform.position.z = this._startZ;
                this._builder.transform.position = this._builder.transform.position;//new Vector3(this._offsetX, this._offsetY, this._startZ);
            }
                // 
        }

        public init(url:string, material_url:string = '', para:string = ''):void
        {
            if(this._isInit)return;
            this._isInit = true;
            this._url = url;
            this._material_url = material_url;
            this._para = para;
            let asset = [];
            if(this._url != '')
                asset.push(this._url);
            if(this._material_url != '')
                asset.push(this._material_url);
            if(this._para != '')
                asset.push(this._para);

            if(asset.length == 0)this.onLoad()
            else Laya.loader.create(asset, Handler.create(this, this.onLoad));
        }

        private onLoad():void
        {
            this._isLoad = true;
            this.builder();
        }

        protected builder():void
        {
            let mesh:Laya.Mesh = Laya.loader.getRes(this._url);
            let material:BlinnPhongMaterial = new BlinnPhongMaterial();
            material.albedoTexture = Laya.Texture2D.load(this._material_url);
            material.albedoColor = this._albedoColor;
            material.shininess = 0.01
            // material.specularTexture
            // material.setDiffuseTexture(Laya.Texture2D.load(this._material_url));
            // material.setHasLight(true);
            // material.setHasFog(false);
            // material.setFogEnd(50);
            // material.setFogDensity(0.1);
            // material.setFogColor( new Laya.Vector4(195 / 255, 197 / 255, 185 / 255, 1));
            this._builder = new MeshSprite3D(mesh);
            // this._builder.meshRender.enable = false;
            this._builder.transform.position.x = this._offsetX;
            this._builder.transform.position.y = this._offsetY;
            this._builder.transform.position.z = this._startZ;
            this._builder.transform.position = this._builder.transform.position;
            this._builder.meshRender.material = material;
            this._builder.layer = Laya.Layer.getLayerByNumber(9);//层
            this._sceneRoot.mapLayer.addChild(this._builder);
        }


        public setParent(laya:Laya.Sprite3D):void
        {
            
            if(this._builder &&laya)
            {
                this._builder.removeSelf();
                laya.addChild(this._builder);
            }
                
            this._tempLaya = laya;
        }

         protected needRemove():boolean
        {
            return this._sceneRoot.playerOwner.transform.position.z - this._builder.transform.position.z > 30;;
        }

        public destory():void
        {
            // if(this._builder)
            //     this._builder.destroy(true);
        }

        public get position():Vector3
        {
            if(this._builder)
                return this._builder.transform.position;
            return null;
        }

        public update(diff:number):boolean
        {
            if(!this._isLoad)return;
            if(this.needRemove())
            {
                this.destory();
                return true;
            }
            return false;
        }
    }
}