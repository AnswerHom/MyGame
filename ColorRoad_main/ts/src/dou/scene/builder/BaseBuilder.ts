module dou.scene.builder{
    export class BaseBuilder extends Laya.MeshSprite3D implements IPoolsObject{
        protected _sceneRoot:SceneRoot;
        protected _albedoColor:Vector4 = new Vector4();
        protected _url:string;
        protected _material_url:string;
        protected _startZ:number;
        protected _offsetX:number = 0;
        protected _offsetY:number = 0;
        protected _para:string;
        protected _isLoad:boolean = false;
        public obstacleWidth:number = 0.25;
        protected _inpool:boolean = false;
        protected _isInit:boolean = false;
        protected _color_type:number;
        protected _needRecicle:boolean = false;
        public allowMove:boolean = false;
        public topType:any;
        public static poolName = 'BaseBuilder';
        poolName = 'BaseBuilder';

        constructor(scene:SceneRoot)
        {
            super();
            this._sceneRoot = scene;
        }


        intoPool(...arg):void
        {
            // this._sceneRoot = arg[0];
            this.active = false;
            this._inpool = true;
            this._needRecicle = false;
            this._isInit = false;
            this.allowMove = false;
            this.topType = null;
        }
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void{
            this._sceneRoot = arg[0][0];
            this.active = true;
            this._inpool = false;
            this._needRecicle = false;
        }

        

        public setOffset(offsetX, offsetY, startZ):void
        {
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this._startZ = startZ;
            this.updatePos();
        }


        public updatePos():void
        {
            this.transform.position.x = this._offsetX;
            this.transform.position.y = this._offsetY;
            this.transform.position.z = this._startZ;
            this.transform.position = this.transform.position;
        }

        public setAlbedoColor(albedoColor:Vector4):void
        {
            albedoColor.cloneTo(this._albedoColor);
            if(this.meshRender.material instanceof BlinnPhongMaterialExp)
            {
                this.meshRender.material.albedoColor = this._albedoColor;
            }
               
        }

        public init(url:string, material_url:string = '', para:string = ''):void
        {
            if(this._isInit)return;
            this._isInit = true;
            this._url = url;
            this._material_url = material_url;
            this._para = para;
            
            this.onCreate();
        }

        protected onCreate():void{
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
            // let material:Laya.StandardMaterial = Laya.StandardMaterial.load(this._material_url);
            // let boxMesh:Laya.BoxMesh=new Laya.BoxMesh(0.5,1,2);
            // this._builder = new MeshSprite3D(boxMesh);
            // this._builder.transform.position = new Vector3(1, -0.28, this._startZ);
            // this._builder.meshRender.material = material;
            // this._sceneRoot.scene.addChild(this._builder);
        }

        public updateBlendOffset(c:Laya.Vector4):void
        {
            if(this.meshRender.material)
                (this.meshRender.material as dou.scene.BlinnPhongMaterialExp).setBendOffset(c);                
        }

        protected needRemove():boolean
        {
            return this._sceneRoot.camera.position.z - this.transform.position.z > 1 || this._needRecicle;
        }

        public destory():void
        {
            // if(this._builder)
            //     this._builder.destroy(true);
        }

        public get position():Vector3
        {
            return this.transform.position;
        }

        public get color_type():number
        {
            return this._color_type;
        }

        public set color_type(v)
        {
            this._color_type = v;
        }

        public update(diff:number):boolean
        {
            if(!this._isLoad)return;
            if(this.allowMove)
                this.updateOffsetX();
            if(this.needRemove())
            {
                this.destory();
                return true;
            }
            return false;
        }

        private moveSpeed:Vector3 = new Vector3(0.01,0,0);
        private curNum = 0.01;
		private updateOffsetX()
		{
            // logd("创建可移动的格子",this.curNum,dis);
			if(Math.abs(this.transform.position.x) >= 0.358)
            {
                this.moveSpeed.x = this.transform.position.x > 0 ? (0.357 - this.transform.position.x) : (-0.357 - this.transform.position.x);
                this.transform.translate(this.moveSpeed);
                this.moveSpeed.x = this.transform.position.x > 0 ?  -this.curNum : this.curNum;
            }
            else
            {
                this.transform.translate(this.moveSpeed);
            }
        }
    }
}