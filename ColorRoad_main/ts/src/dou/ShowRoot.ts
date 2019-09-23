/**
* 场景 
*/
module dou {
    export class ShowRoot extends BaseScene {
        public playerOwner: Laya.MeshSprite3D;
        public playerView: Laya.MeshSprite3D;
        public playerArrow:Laya.MeshSprite3D;
        //摄像机
        public camera: Laya.Camera;
        private _lenghtOfRoad: number = 0;
        private _distanceCP: number;
        private _mapLayer: Laya.Sprite3D;
        //地图数据
        private map_list: Array<Road1>;
        //移动相关
        private _diff_Z: number = 0;
        private _changeSkinMoveZ: number = 0;
        private _changeSkinState: number = 0;
        //要换的皮肤
        private _nextSkin: string = '';
        private shadow: MeshSprite3D;
        constructor(value: GameApp) {
            super(value, Path.newraceshow);
            this._mapLayer = new Laya.Sprite3D();
            this.map_list = new Array<Road1>();
            let a = new Laya.Vector4(-150, 0, 0, 0);
            let b = new Laya.Vector4(150, 0, 0, 0);
            let c = new Laya.Vector4(0, 150, 0, 0);
            let d = new Laya.Vector4(0, -0, 0, 0);
            let e = new Laya.Vector4(-150, 150, 0, 0);
            let f = new Laya.Vector4(150, 150, 0, 0);
            let g = new Laya.Vector4(-150, -0, 0, 0);
            let h = new Laya.Vector4(150, -0, 0, 0);
            this.dstAangles = [a, b, c, d, e, g, f, h];
            this.pos1 = new Laya.Vector3(0, 0, 0);
			this.pos2 = new Laya.Vector3(1, 0, 0);            
        }

        public get mapLayer(): Laya.Sprite3D { return this._mapLayer; }
        //初始场景
        protected initScene(): void {
            if (!this._scene || !this._scene.loaded) {
                return;
            }
            this.playerOwner = this._scene.getChildByName("Player") as Laya.MeshSprite3D;
            this.playerView = this.playerOwner.getChildByName("Player") as Laya.MeshSprite3D;
            this.playerArrow = this.playerOwner.getChildByName("xrz01") as Laya.MeshSprite3D;
            if(!this.camera)
                this.camera = this._scene.getChildByName("Main Camera") as Laya.Camera;
            this._distanceCP = this.playerOwner.transform.position.z - this.camera.transform.position.z;
            this._scene.addChild(this._mapLayer);
            this.initTuoWei();
            this.initZhangAi();

            if(!PlayerBaseScript.shadowMaterial)
			{
				PlayerBaseScript.shadowMaterial = new dou.scene.BlinnPhongMaterialExp();
				PlayerBaseScript.shadowMaterial.albedoTexture = Laya.Texture2D.load(Path.scene_texture + 'shadow01.png');
				PlayerBaseScript.shadowMaterial.renderMode = dou.scene.BlinnPhongMaterialExp.RENDERMODE_TRANSPARENT;
			}

            let pm = new Laya.PlaneMesh(0.15, 0.15, 1, 1)
			this.shadow = new MeshSprite3D(pm);
			this.scene.addChild(this.shadow);
			this.shadow.meshRender.material = PlayerBaseScript.shadowMaterial;
            this.shadow.meshRender.enable = true;
        }

        private initTuoWei(): void {
            this._effectTuoWeiSence = Laya.loader.create(Path.tuoWei, Laya.Handler.create(this, this.onTuoWeiComplete), Handler.create(this, this.onLoadTuoWeiProgress));            
        }

        private initZhangAi(): void {

        }

        private _effectTuoWeiSence: Laya.Sprite3D;
        get effectTuoWeiSence(): Laya.Sprite3D{
            return this._effectTuoWeiSence;
        }
        private _effectTuoWei: Laya.Sprite3D;
        private _isTuoWeiLoad: boolean = false;
        //场景加载完毕
        private onTuoWeiComplete() {
            this._isTuoWeiLoad = true;
        }

        private onLoadTuoWeiProgress(value: any): void {
            
        }

        private nextDiff: number = 0.01
        public onUpdate(diff: number): void {
            if (!this._isShow) return;
            if (this._lenghtOfRoad - this.playerOwner.transform.position.z < 30) {
                this.addRoad();
            }


            for (let i = 0; i < this.map_list.length; i++) {
                if (this.map_list[i].update(diff)) {
                    ObjectPools.free(this.map_list[i]);
                    this.map_list.splice(i, 1);
                    i--;
                }
            }

            this.move(diff);
        }
        private _glitter:Glitter;

        private _diff_X: number = 0;
        private dstAangles;
        private bendTimes = [1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4];
        private curBendTime = 0;
        private dstIndex = 0;
        private changeTime = 2e3;
        private curBendAngle = new Laya.Vector4(149.99, 43.61, 0, 0);
        private pos1: Laya.Vector3;
		private pos2: Laya.Vector3;
        public move(diff): void {
            this._diff_Z += 0.01;
            this.camera.transform.position.z = this._diff_Z - this._distanceCP;
            this.camera.transform.position = this.camera.transform.position;
            this.playerOwner.transform.position.z = this._diff_Z + this._changeSkinMoveZ;

            if (this._diff_X < -0.2 || this._diff_X > 0.2)
                this.nextDiff = - this.nextDiff;
            this._diff_X += this.nextDiff;
            this.playerOwner.transform.position.x = this._diff_X + 0.3;
            this.playerOwner.transform.position = this.playerOwner.transform.position;
            TD.TD_Vector3_0.y = 0;
            TD.TD_Vector3_0.z = 0;
            TD.TD_Vector3_0.x = 0.1;
            this.playerView.transform.rotate(TD.TD_Vector3_0);
            if(this.playerArrow.parent){
                this.playerArrow.transform.rotate(TD.TD_Vector3_0);
            }
            if (this._glitter && this._glitter.glitterRender.material instanceof dou.scene.GlitterMaterialNew){
                this._glitter.glitterRender.material.setBendOffset(this.curBendAngle);

                this.pos2.z = this.pos1.z = this.playerOwner.transform.position.z;
                this.pos1.x = this.playerOwner.transform.position.x - 0.07;
                this.pos2.x = this.playerOwner.transform.position.x + 0.07//0.07;
                this.pos1.y = this.pos2.y = 0.006;
                this._glitter.addGlitterByPositions(this.pos1, this.pos2);
            }
            if (this.shadow && this.shadow.meshRender.material instanceof dou.scene.BlinnPhongMaterialExp){
                this.shadow.meshRender.material.setBendOffset(this.curBendAngle);
                this.shadow.transform.position.x = this.playerOwner.transform.position.x;
                this.shadow.transform.position.y = 0.008;
                this.shadow.transform.position.z = this.playerOwner.transform.position.z;
                this.shadow.transform.position = this.shadow.transform.position;
            }
            if (this._isLizi && this._effectTuoWei){
                this._effectTuoWei.transform.position.x = this.playerOwner.transform.position.x;
                this._effectTuoWei.transform.position.y = this.playerOwner.transform.position.y;
                this._effectTuoWei.transform.position.z = this.playerOwner.transform.position.z - (this._tuoWeiSkin == "jianqi" ? 0.3 : 0);
            }

            this.updateSkinPos();
        }

        private RandBlendIndex(a) {
            let b;
            do {
                b = Math.floor(Math.random() * this.dstAangles.length);
            } while (b == a);
            return b;
        }

        public addRoad(): void {
            let road: Road1 = ObjectPools.malloc(Road1, [this], [this]) as Road1;
            // let road:Road = new Road(this._scene);
            let url = "race_01-Plane001.lm"
            road.setOffset(0, 0, this._lenghtOfRoad);
            road.init(Path.scene_model + url, Path.scene_texture + "ground_010.jpg");
            this.map_list.push(road);
            this._lenghtOfRoad += 12.7;
        }

        private material: BlinnPhongMaterial = new BlinnPhongMaterial();
        private changeSkinPosEnd: number = 0.5;
        public updateSkinPos(): void {
            if (this._changeSkinState == 0) return;
            if (this._changeSkinState == 1) {
                this._changeSkinMoveZ += 0.02;
                if (this._changeSkinMoveZ > this.changeSkinPosEnd) {
                    this._changeSkinState = 2;
                    this._changeSkinMoveZ = -this.changeSkinPosEnd;

                    this.material.albedoTexture = Laya.Texture2D.load(StringU.substitute("scene/pifu/{0}.jpg", this._nextSkin));
                    this.material.shininess = 0.078;
                    this.playerView.meshRender.material = this.material;
                }
            }
            if (this._changeSkinState == 2) {
                this._changeSkinMoveZ += 0.02;
                if (this._changeSkinMoveZ > 0) {
                    this._changeSkinState = 0;
                    this._changeSkinMoveZ = 0;
                }
            }
        }

        //球的皮肤更换
        public changeBallSkin(ballSkin: string): void {
            if (!this._scene || !this._scene.loaded) {
                return;
            }
            this._changeSkinState = 1;
            this._nextSkin = ballSkin;
            if(ballSkin == "role29"){
                this.playerOwner.addChild(this.playerArrow);
            }else{
                this.playerArrow.removeSelf();
            }
        }

        private _mParent;
        private _tuoWeiSkin:string;
        private _isLizi:boolean;
        //拖尾皮肤更换
        public changeTuoWeiSkin(TuoWeiSkin: string): void {
            this._tuoWeiSkin = TuoWeiSkin;
            if (this._glitter){
                this._glitter.destroy();
                this._glitter = null;
            }
            this.putBackEffectTuoWei();
            this._effectTuoWei = this._effectTuoWeiSence.getChildByName(TuoWeiSkin) as Laya.Sprite3D;
            if (this._effectTuoWei) {
                //特效
                this._isLizi = true;
            } else {
                //贴图
                this._isLizi = false;
                this._effectTuoWei = new Laya.Sprite3D();
                this._glitter = this._effectTuoWei.addChild(new Laya.Glitter()) as Laya.Glitter;
                let glitterTemplet: Laya.GlitterTemplet = this._glitter.templet;
                glitterTemplet.lifeTime = 0.52;
                glitterTemplet.minSegmentDistance = 0.1;
                glitterTemplet.minInterpDistance = 0.6;
                glitterTemplet.maxSlerpCount = 128;
                glitterTemplet.maxSegments = 600;
                let glitMaterial
                if (this._glitter.glitterRender.material) {
                    glitMaterial = new dou.scene.GlitterMaterialNew();
                    glitMaterial.renderMode = dou.scene.GlitterMaterialNew.RENDERMODE_TRANSPARENT;
                    glitMaterial.diffuseTexture = Laya.Texture2D.load(StringU.substitute("scene/tuowei/{0}.png", TuoWeiSkin));
                    glitMaterial.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
                }
                this._glitter.glitterRender.material = glitMaterial;
                this._glitter.glitterRender.enable = true;
            }
            this._effectTuoWei.transform.position = new Vector3();
            this._mParent = this._effectTuoWei.parent;
            this.scene.addChild(this._effectTuoWei);
        }

        private putBackEffectTuoWei():void{
            if (this._effectTuoWei && this._effectTuoWei.parent) {
                if (this._mParent)
                    this._mParent.addChild(this._effectTuoWei);
                else
                    this.scene.removeChild(this._effectTuoWei);
                this._effectTuoWei = null;
            }
        }

        public hide():void{
            this.putBackEffectTuoWei();
            super.hide();
        }
    }
}
