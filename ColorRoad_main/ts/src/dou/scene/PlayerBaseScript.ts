/**
* 玩家脚本基础类 
*/
module dou.scene {
	export class PlayerBaseScript extends Laya.Script {
		//是否等级计算中
		public running: boolean = true;
		public player: Laya.MeshSprite3D;
		private shadow: MeshSprite3D;
		private ray: Laya.Ray;
		private ray_down: Laya.Ray;
		public diff_z: number = 0;
		//玩家位置
		private playPos: Vector3;
		//玩家位置临时变量
		private offsetplayPos: Vector3;
		protected _app: GameApp;
		//ｘ方向的偏移
		public _moveDiffX: number = 0;
		public _desDiffX: number = 0;
		//是否是主玩家
		private _isMainPlayer: boolean = false;
		//是否被玩家超越过
		public isPass: boolean = false;
		//无敌开关
		private _isWuDi: boolean = false;
		//无敌持续时间
		private _wuDiTimeEnd:number;
		private _buffSpeed:number = 0;


		private effect1: Laya.ShuriKenParticle3D;
		private effect2: Laya.ShuriKenParticle3D;
		private effect3: Laya.ShuriKenParticle3D;
		private effect4: Laya.ShuriKenParticle3D;
		private effect5: Laya.ShuriKenParticle3D;
		private effect6: Laya.ShuriKenParticle3D;

		private guangbo: Laya.ShuriKenParticle3D;


		private effect_wudi_0: Laya.ShuriKenParticle3D;
		private effect_wudi_1: Laya.ShuriKenParticle3D;
		private effect_wudi_2: Laya.ShuriKenParticle3D;

		private playerBase: Laya.MeshSprite3D;
		private _nameMesh: MeshSprite3D;
		private _startPos: Vector3
		//拖尾
		private _glitter: Glitter;
		//基础速度
		static baseSpeed: number = 0.005;
		static maxSpeed: number = 0.01;
		//加速
		private speedAdd: number = 0.005;
		//斜坡减速
		private speedRelease: number = 0.0045;
		//递减速度
		private speedRelasePerTime: number = 0.00000125;
		//倍率
		private _muli:number = 1;
		constructor() {
			super();
		}

		public static _robotGlitMaterial: GlitterMaterialNew;
		public static _playerGlitMaterial: GlitterMaterialNew;
		public init(app: GameApp, isMainPlayer: boolean): void {
			if (!this._app)
				this._app = app;
			this.pos1 = new Laya.Vector3(0, 0, 0);
			this.pos2 = new Laya.Vector3(1, 0, 0);

			this._glitter = this._app.sceneRoot.glitterLayer.addChild(new Laya.Glitter()) as Laya.Glitter;
			let glitterTemplet: Laya.GlitterTemplet = this._glitter.templet;
			glitterTemplet.lifeTime = 0.12;
			glitterTemplet.minSegmentDistance = 0.1;
			glitterTemplet.minInterpDistance = 0.6;
			glitterTemplet.maxSlerpCount = 128;
			glitterTemplet.maxSegments = 600;
			if (!PlayerBaseScript._robotGlitMaterial) {
				PlayerBaseScript._robotGlitMaterial = new GlitterMaterialNew();
				PlayerBaseScript._robotGlitMaterial.renderMode = GlitterMaterialNew.RENDERMODE_TRANSPARENT;
				PlayerBaseScript._robotGlitMaterial.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
			}
			PlayerBaseScript._robotGlitMaterial.diffuseTexture = Laya.Texture2D.load(StringU.substitute("scene/tuowei/qiu11.png"));
			this._glitter.glitterRender.material = PlayerBaseScript._robotGlitMaterial;
			this._isMainPlayer = isMainPlayer;		
			// this.createName();
			// this.createShadow();


			//监听游戏进程事件
			MessageManager.on(WXTool.GAMESTART, this, this.startGame);
			MessageManager.on(WXTool.GAMESTOP, this, this.stopGame);
		}

		public _initialize(owner: Laya.MeshSprite3D, isMainPlayer?: boolean): void {
			super._initialize(owner);
			this.player = owner;
			this.playPos = this.player.transform.position.clone();
			this.offsetplayPos = this.player.transform.position.clone();
			this.diff_z = this.playPos.z;
			this.playerBase = owner.getChildByName("player") as Laya.MeshSprite3D;

			this.effect1 = owner.getChildByName("guangquan") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect1);
			this.effect2 = owner.getChildByName("wudian") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect2);
			this.effect3 = owner.getChildByName("zhuangji") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect3);
			this.guangbo = owner.getChildByName("guangbo") as Laya.ShuriKenParticle3D;
			this._initEffect(this.guangbo);
			this.effect4 = owner.getChildByName("jiansu0") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect4);
			this.effect5 = owner.getChildByName("jiansu1") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect5);
			this.effect6 = owner.getChildByName("jiansu2") as Laya.ShuriKenParticle3D;
			this._initEffect(this.effect6);
			

			this.effect_wudi_0 = owner.getChildByName("wudi0") as Laya.ShuriKenParticle3D;
			this.effect_wudi_0.transform.position.x += -100;
			this.effect_wudi_0.transform.position = this.effect_wudi_0.transform.position;
			this.effect_wudi_1 = owner.getChildByName("wudi1") as Laya.ShuriKenParticle3D;
			this.effect_wudi_1.transform.position.x += -100;
			this.effect_wudi_1.transform.position = this.effect_wudi_1.transform.position;
			this.effect_wudi_2 = owner.getChildByName("wudi2") as Laya.ShuriKenParticle3D;
			this.effect_wudi_2.transform.position.x += -100;
			this.effect_wudi_2.transform.position = this.effect_wudi_2.transform.position;

			Laya.timer.once(1000, this, this.stopEffect)
			
			this._startPos = this.player.transform.position.clone();

			let material: dou.scene.BlinnPhongMaterialExp = new dou.scene.BlinnPhongMaterialExp();
			if (!isMainPlayer) {
				//机器人初始皮肤 到18不要由仙人掌皮肤
				let num = Math.floor(MathU.randomRange(1, 18));
				let numStr: string;
				if (num >= 1 && num <= 9) {
					numStr = '0' + num.toString();
				} else {
					numStr = num.toString();
				}
				material.albedoTexture = Laya.Texture2D.load(StringU.substitute("scene/pifu/role{0}.jpg", numStr));
			}
			else {
				//这边设置为默认皮肤
				material.albedoTexture = Laya.Texture2D.load(StringU.substitute("scene/pifu/role01.jpg"));
				//刺要移除
			}		
			material.shininess = 0.078;
			this.playerBase.meshRender.material = material;
			this.isWuDi = false;
		}

		private _initEffect(effect:Laya.ShuriKenParticle3D):void
		{
			effect.transform.position.x -= 100;
			effect.transform.position = effect.transform.position;
		}

		private stopEffect():void
		{
			this._stopEffect(this.effect4);
			this._stopEffect(this.effect5);
			this._stopEffect(this.effect6);
			this._stopEffect(this.effect1);
			this._stopEffect(this.effect2);
			this._stopEffect(this.effect3);
			this._stopEffect(this.guangbo);
			this._stopEffect(this.effect_wudi_0);
			this._stopEffect(this.effect_wudi_1);
			this._stopEffect(this.effect_wudi_2);
		}

		private _stopEffect(effect:Laya.ShuriKenParticle3D):void
		{
			effect.transform.position.x += 100;
			effect.transform.position = effect.transform.position;
			effect.removeSelf();
		}
		private slowNetEndTime:number = 0;
		//添加减速特效
		public addSlowNet():void
		{
			this.player.addChild(this.effect4);
			this.effect4.particleSystem.play();

			this.player.addChild(this.effect5);
			this.effect5.particleSystem.play();

			this.player.addChild(this.effect6);
			this.effect6.particleSystem.play();

			this._buffSpeed = -0.002;
			this.slowNetEndTime = Laya.timer.currTimer + 10000;
		}

		public removeSlowNet():void
		{
			// this.player.removeChild(this.effect4);
			// this.effect4.particleSystem.stop();
			// this.player.removeChild(this.effect5);
			// this.effect5.particleSystem.stop();
			// this.player.removeChild(this.effect6);
			// this.effect6.particleSystem.stop();
			this._buffSpeed = 0;
			this.slowNetEndTime = 0;
		}

		public createName(): void {
			if (!this._nameMesh && !this._isMainPlayer) {
				let c = new Laya.PlaneMesh(1, .1, 1, 1)
				this._nameMesh = new MeshSprite3D(c);
				let cusM: BlinnPhongMaterialExp = new BlinnPhongMaterialExp();
				cusM.albedoTexture = Laya.Texture2D.load(Path.name_texture + Math.floor(Math.random() * 100) + '.png');
				this._nameMesh.meshRender.material = cusM;
				TD.TD_Vector3_0.x = -Math.PI / 2 * 3;
				TD.TD_Vector3_0.y = Math.PI;
				TD.TD_Vector3_0.z = 0;
				this._nameMesh.transform.rotate(TD.TD_Vector3_0);
				TD.TD_Vector3_1.x = 0;
				TD.TD_Vector3_1.y = 0.05;
				TD.TD_Vector3_1.z = -0.2;
				this._nameMesh.transform.translate(TD.TD_Vector3_1);
				cusM.renderMode = BlinnPhongMaterialExp.RENDERMODE_TRANSPARENT;
				this.player.addChild(this._nameMesh);
			}
		}
		public static shadowMaterial: dou.scene.BlinnPhongMaterialExp;
		public createShadow(): void {
			if(!PlayerBaseScript.shadowMaterial)
			{
				PlayerBaseScript.shadowMaterial = new dou.scene.BlinnPhongMaterialExp();
				PlayerBaseScript.shadowMaterial.albedoTexture = Laya.Texture2D.load('scene/shadow01.png');
				PlayerBaseScript.shadowMaterial.renderMode = BlinnPhongMaterialExp.RENDERMODE_TRANSPARENT;
			}
			let c = new Laya.PlaneMesh(0.15, 0.15, 1, 1)
			this.shadow = new MeshSprite3D(c);
			this._app.sceneRoot.shadowLayer.addChild(this.shadow);
			this.shadow.meshRender.material = PlayerBaseScript.shadowMaterial;
		}

		public reset(): void {
			this.running = true;
			this.isWuDi = false;
			this.effect1 && this.effect1.particleSystem.stop();
			this.effect2 && this.effect2.particleSystem.stop();
			this.effect3 && this.effect3.particleSystem.stop();
			this.playerBase.meshRender.enable = true;
			// this.shadow.meshRender.enable = true;
			this._startPos.cloneTo(this.playPos);
			this._startPos.cloneTo(this.offsetplayPos);
			this.player.transform.position = this.offsetplayPos;
			this.diff_z = this._startPos.z;
			this._moveDiffX = 0;
			this._desDiffX = 0;
			this._speed_z = PlayerBaseScript.baseSpeed;
			this._oldMoveOffsetY = 0;
			this._levelOffsetY = 0;
			this._lastOffsetY = 0;
			this.removeSlowNet();
			this.isEnd = true;
			this._path.length = 0;
			this.colorType = 1;
			this.updateSkin();
			this.updateTuoWei();
		}

		private updateSkin(): void {
			//主玩家切换皮肤
			let idx = this._app.plyertDataMgr.getUseSkinIndex();
			if(idx > 24){
				idx = Math.floor(MathU.randomRange(1, 24));
			}
			let data = this._app.plyertDataMgr.getAvatar(idx);
			console.log("打印皮肤", data);
			let getUseLuckSkin = this._app.plyertDataMgr.getUseLuckSkin();
			if(getUseLuckSkin > 24){
				getUseLuckSkin = Math.floor(MathU.randomRange(1, 24));
			}
			let getUserLuckData = this._app.plyertDataMgr.getAvatar(getUseLuckSkin);
			if(this._app.plyertDataMgr.isUseLuckySkin()&&getUseLuckSkin&&getUserLuckData.type == dou.gui.page.SkinPage.TYPE_BALL+1){
				//使用女神皮肤
				(this.playerBase.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoTexture = Laya.Texture2D.load(StringU.substitute("scene/pifu/{0}.jpg", getUserLuckData.avatar));
				//使用过了就设置掉
				// this._app.plyertDataMgr.setIsUseLuckySkin(0);
			}
			else if (data && data.avatar)
				(this.playerBase.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoTexture = Laya.Texture2D.load(StringU.substitute("scene/pifu/{0}.jpg", data.avatar));
		}
		private _color_type:number;
		public set colorType(typ:number)
		{
			this._color_type = typ;
			(this.playerBase.meshRender.material as dou.scene.BlinnPhongMaterialExp).albedoColor = TD.getColor(typ);
		}

		private _mParent;
		private _effectTuoWei: Laya.Sprite3D;
		private _tuoWeiSkin:string;
        private _isLizi:boolean;
		private updateTuoWei():void{
			let data = this._app.plyertDataMgr.getAvatar(this._app.plyertDataMgr.getUseTuoWeiSkinIndex());
			let tuoWeiScene:Laya.Sprite3D = this._app.showRoot.effectTuoWeiSence;
			console.log("打印拖尾", data, tuoWeiScene);
			if (!data || !tuoWeiScene)
				return;
			
			if (this._glitter){
                this._glitter.destroy();
                this._glitter = null;
            }
            this.putBackEffectTuoWei();
			let TuoWeiSkin:string = data.avatar;
			this._tuoWeiSkin = TuoWeiSkin;
			let getUseLuckSkin = this._app.plyertDataMgr.getUseLuckSkin();
			let getUserLuckData = this._app.plyertDataMgr.getAvatar(getUseLuckSkin);
			if(this._app.plyertDataMgr.isUseLuckySkin()&&getUseLuckSkin&&getUserLuckData.type == dou.gui.page.SkinPage.TYPE_TUOWEI+1){
					TuoWeiSkin = getUserLuckData.avatar;
			}
			this._effectTuoWei = tuoWeiScene.getChildByName(TuoWeiSkin) as Laya.Sprite3D;
			if ( this._isMainPlayer && this._effectTuoWei){
				this._isLizi = true;
				this._mParent = this._effectTuoWei.parent;
				this._app.sceneRoot.glitterLayer.addChild(this._effectTuoWei);
			}else{
				this._isLizi = false;
				this._glitter = this._app.sceneRoot.glitterLayer.addChild(new Laya.Glitter()) as Laya.Glitter;
				let glitterTemplet: Laya.GlitterTemplet = this._glitter.templet;
				glitterTemplet.lifeTime = 0.12;
				glitterTemplet.minSegmentDistance = 0.1;
				glitterTemplet.minInterpDistance = 0.6;
				glitterTemplet.maxSlerpCount = 128;
				glitterTemplet.maxSegments = 600;
				if (!PlayerBaseScript._playerGlitMaterial) {
					PlayerBaseScript._playerGlitMaterial = new GlitterMaterialNew();
					PlayerBaseScript._playerGlitMaterial.renderMode = GlitterMaterialNew.RENDERMODE_TRANSPARENT;
					PlayerBaseScript._playerGlitMaterial.albedo = new Laya.Vector4(1.3, 1.3, 1.3, 1);
				}
				
				
					PlayerBaseScript._playerGlitMaterial.diffuseTexture = Laya.Texture2D.load(StringU.substitute("scene/tuowei/{0}.png", this._isMainPlayer && TuoWeiSkin?TuoWeiSkin:'glitter'));
				this._glitter.glitterRender.material = PlayerBaseScript._playerGlitMaterial;
			}			
		}

		public putBackEffectTuoWei():void{
			if (this._effectTuoWei && this._effectTuoWei.parent) {
                if (this._mParent)
                    this._mParent.addChild(this._effectTuoWei);
                else
                    this._effectTuoWei.removeSelf();
                this._effectTuoWei = null;
            }
		}

		

		public randStartPos(): void {
			this.isEnd = true;
			this._path.length = 0;
			this.isPass = false;
			this.effect1 && this.effect1.particleSystem.stop();
			this.effect2 && this.effect2.particleSystem.stop();
			this.effect3 && this.effect3.particleSystem.stop();
			this.effect4 && this.effect4.particleSystem.stop();
			this.effect5 && this.effect5.particleSystem.stop();
			this.effect6 && this.effect6.particleSystem.stop();
			this.playerBase.meshRender.enable = true;
			this.removeSlowNet();
			// this.shadow.meshRender.enable = true;
			this.running = true;
			this._desDiffX = this._moveDiffX = Math.random() * 1.2 - 0.6;
			this.diff_z = this._app.sceneRoot.mainPlayer.playerScript.diff_z + 10 + Math.random() * 10;
			this._speed_z = PlayerBaseScript.baseSpeed + Math.random() * this.speedAdd;
			this._lastOffsetY = 0;
			this._levelOffsetY = 0;
			if (this._glitter){
				this._glitter.glitterRender.enable = false;
				Laya.timer.once(1000, this, () => { this._glitter.glitterRender.enable = true; })
			}
		}

		private max_width: number = 0.35;
		public playerMove(diff: number): void {
			this._desDiffX += diff * 2.5;
			if (this._desDiffX > this.max_width)
				this._desDiffX = this.max_width;
			if (this._desDiffX < - this.max_width)
				this._desDiffX = - this.max_width;
			this._moveDiffX = this._desDiffX;
		}

		//游戏暂停
		stopGame(): void {
			this._app.isOut = true;
			console.log("游戏暂停了", this.running, this._app.isOut);
		}

		//恢复游戏
		startGame(): void {
			this._app.isOut = false;
			console.log("游戏恢复了", this.running, this._app.isOut);
		}

		private pos1: Laya.Vector3;
		private pos2: Laya.Vector3;
		//心跳
		public Update(diff: number, c: Laya.Vector4): void {
			if (this.running) {
				if(this.slowNetEndTime!= 0 && this.slowNetEndTime < Laya.timer.currTimer)
				{
					this.removeSlowNet();
				}

				if(this._wuDiTimeEnd!= 0 && this._wuDiTimeEnd - 1000 < Laya.timer.currTimer)
				{
					this._buffSpeed = 0;
				}

				if(this._wuDiTimeEnd!= 0 && this._wuDiTimeEnd < Laya.timer.currTimer)
				{
					this.removeWuDi();
				}
				
				this.updatePos(diff);
				if (this.playerBase.meshRender.material instanceof BlinnPhongMaterialExp) {
					this.playerBase.meshRender.material.setBendOffset(c);
				}
				if (this._nameMesh && this._nameMesh.meshRender.material instanceof BlinnPhongMaterialExp)
					this._nameMesh.meshRender.material.setBendOffset(c);

				if (this.shadow && this.shadow.meshRender.material instanceof BlinnPhongMaterialExp)
					this.shadow.meshRender.material.setBendOffset(c);

				if (this._glitter && this._glitter.glitterRender.material instanceof GlitterMaterialNew)
					this._glitter.glitterRender.material.setBendOffset(c);

				if (this.effect1 && this.effect1.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect1.particleRender.material.setBendOffset(c);

				if (this.effect2 && this.effect2.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect2.particleRender.material.setBendOffset(c);

				if (this.effect3 && this.effect3.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect3.particleRender.material.setBendOffset(c);
				if (this.guangbo && this.guangbo.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.guangbo.particleRender.material.setBendOffset(c);
					
				if (this.effect4 && this.effect4.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect4.particleRender.material.setBendOffset(c);
				if (this.effect5 && this.effect5.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect5.particleRender.material.setBendOffset(c);
				if (this.effect6 && this.effect6.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect6.particleRender.material.setBendOffset(c);

				if (this.effect_wudi_0 && this.effect_wudi_0.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect_wudi_0.particleRender.material.setBendOffset(c);
				if (this.effect_wudi_1 && this.effect_wudi_1.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect_wudi_1.particleRender.material.setBendOffset(c);
				if (this.effect_wudi_2 && this.effect_wudi_2.particleRender.material instanceof ShurikenParticleMaterialExp)
					this.effect_wudi_2.particleRender.material.setBendOffset(c);
			}
		}
		
		public set isWuDi(value: boolean) {
			if (value == this._isWuDi) return;
			//只有要消失的进入这个			
			if (!value) {
				//结束无敌的时候
				// this.effect_wudi_0.particleSystem.stop();
				// this.effect_wudi_1.particleSystem.stop();
				// this.effect_wudi_2.particleSystem.stop();
				// this.effect_wudi_0.removeSelf();
				// this.effect_wudi_1.removeSelf();
				// this.effect_wudi_2.removeSelf();
			} else {
				//设置无敌的时候不用进这个  开始无敌的时候
				this.effect_wudi_0.particleSystem.play();
				this.effect_wudi_1.particleSystem.play();
				this.effect_wudi_2.particleSystem.play();

				this.player.addChild(this.effect_wudi_0);
				this.player.addChild(this.effect_wudi_1);
				this.player.addChild(this.effect_wudi_2);
			}
			this._isWuDi = value;
		}

		public get isWuDi(): boolean {
			return this._isWuDi;
		}

		public addWuDi():void
		{
			this._buffSpeed = 0.005;
			this._wuDiTimeEnd = Laya.timer.currTimer + 5000;
			this.isWuDi = true;
		}

		public removeWuDi():void
		{
			this._wuDiTimeEnd = 0;
			this._buffSpeed = 0;
			this.isWuDi = false;
		}

		private _oldMoveOffsetY: number = 0;
		private _levelOffsetY:number = 0;
		private _tempRoate: Vector3 = new Vector3();
		private updatePos(diff: number): void {
			this.updateSpeedZ(diff);
			let d = this._desDiffX - this._moveDiffX;
			this._moveDiffX += Math.abs(d) > 0.05 ? (d > 0 ? 0.05 : -0.05) : 0;
			let speed = (this._speed_z + this._buffSpeed) * diff;
			this.updateLevelChange();
			this._oldMoveOffsetY = this.updateOffsetY();
			this.diff_z += speed;
			this.playPos.cloneTo(this.offsetplayPos);
			this.offsetplayPos.x = -this._moveDiffX;
			this.offsetplayPos.y = this._levelOffsetY + this._oldMoveOffsetY + 0.08;
			this.offsetplayPos.z = this.diff_z;
			this.player.transform.position = this.offsetplayPos;
			this._tempRoate.x = 3 * PlayerBaseScript.baseSpeed * diff;
			this.playerBase.transform.rotate(this._tempRoate);
			// this.shadow.transform.position.x = this.offsetplayPos.x;
			// this.shadow.transform.position.y = this._levelOffsetY + 0.007;
			// this.shadow.transform.position.z = this.offsetplayPos.z + 0.01;
			// this.shadow.transform.position = this.shadow.transform.position;

			if (this._glitter){
				this.pos2.z = this.pos1.z = this.diff_z + 0.15;
				this.pos1.x = this.offsetplayPos.x - 0.04;
				this.pos2.x = this.pos1.x + 0.08//0.07;
				this.pos1.y = this.pos2.y = this._levelOffsetY + 0.006;
				this._glitter.addGlitterByPositions(this.pos1, this.pos2);
			}

			if (this._isLizi && this._effectTuoWei){
                this._effectTuoWei.transform.position.x = this.player.transform.position.x;
                this._effectTuoWei.transform.position.y = this.player.transform.position.y;
                this._effectTuoWei.transform.position.z = this.player.transform.position.z - (this._tuoWeiSkin == "jianqi" ? 0.3 : 0);
            }
		}

		public get speed_Z(): number {
			return this._speed_z;
		}

		// public set speed_Z(v: number) {
		// 	this._speed_z = v;
		// }

		private updateSpeedZ(diff: number): void {
			// if (this._speed_z > PlayerBaseScript.baseSpeed)
			// 	this._speed_z -= this.speedRelasePerTime * diff;
			// else {
			// 	this._speed_z = PlayerBaseScript.baseSpeed;
			// }
		}

		//当前速度
		protected _speed_z: number = PlayerBaseScript.baseSpeed;
		public onTriggerEnter(other?: Laya.Collider): void {
			// console.log('-------------onTriggerEnter', other.owner.name)
			if (other.owner.name == 'xiepo') {
				this.movePath();
				this.colorType = (other.owner as XiePo).color_type;
			}
			else if (other.owner.name == 'ColorBall') {
				let ball:ColorBall = (other.owner as ColorBall);
				if (!this.isWuDi && ball.color_type != this._color_type) {
					this.playDie();
				}
				else
				{
					ball.onHit();
					this.playZhuanji(ball.color_type);
					this._app.sceneRoot.PlayScore = this._app.sceneRoot.PlayScore + this._muli * 1;
				}
			}
			else if (other.owner.name == 'MusicBall') {
				let ball:MusicBall = (other.owner as MusicBall);
				ball.onHit();
				this.playZhuanji(1);
			}
			else if (other.owner.name == 'MultipleBall') {
				let ball:MultipleBall = (other.owner as MultipleBall);
				ball.onHit();
				this._muli += 1;
				this.playZhuanji(ball.color_type);
			}

			if(other.owner as BaseBuilder)
			{
				let type:any = (other.owner as BaseBuilder).topType;
				if(type)
				{
					if(type.type == 'speed')
					{
						this.addSlowNet();
					}

					if(type.type == 'power')
					{
						this.addWuDi();
					}
				}
			}

			WXTool.vibrateShort();
		}


		public playZhuanji(color_type:number):void
		{
			this.player.addChild(this.guangbo);
			this.player.addChild(this.effect3);
			this.guangbo.particleSystem.startColorConstant = TD.getColor(color_type);
			this.guangbo && this.guangbo.particleSystem.play();
			(this.guangbo.particleRender.material as ShurikenParticleMaterialExp).renderMode = GlitterMaterialNew.RENDERMODE_TRANSPARENT;
			(this.guangbo.particleRender.material as ShurikenParticleMaterialExp).tintColor = TD.getColor(color_type);

			this.effect3 && this.effect3.particleSystem.play();
			(this.effect3.particleRender.material as ShurikenParticleMaterialExp).tintColor = TD.getColor(color_type);
			(this.effect3.particleRender.material as ShurikenParticleMaterialExp).renderMode = GlitterMaterialNew.RENDERMODE_TRANSPARENT;
		}

		public playDie(): void {
			this.running = false;
			this.playerBase.meshRender.enable = false;
			// this.shadow.meshRender.enable = false;
			this.effect1 && this.effect1.particleSystem.play();
			this.effect2 && this.effect2.particleSystem.play();
			this.player.addChild(this.effect1);
			this.player.addChild(this.effect2);
			//死亡之后移除监听
			MessageManager.off(WXTool.GAMESTART, this, this.startGame);
			MessageManager.off(WXTool.GAMESTOP, this, this.startGame);
			this._speed_z = 0;
			if (PlayerDataMgr.isPlayActionMusic) 
				Laya.SoundManager.playSound('scene/music/dead.mp3');
			if (this._isMainPlayer) {
				this._app.sceneRoot.gameEnd();
			}

		}

		private _lastOffsetY:number = 0;
		//判断是否要跨级了
		public updateLevelChange():void
		{
			let offsetY = BuilderMgr.getOffestY(this.diff_z);
			if(this._lastOffsetY == offsetY)return;
			this._lastOffsetY = offsetY;
			this.movePathLevel();
		}

		public movePathLevel(): void {
			this._path = [0.05, -1, -0.9, -1];
			this.des_y = this._path.shift();
			this.start_y = 0;
			this.pass_time = 0;
			let len = this.des_y;
			this.speed_y = PlayerBaseScript.baseSpeed * 0.2;
			this.need_time = len / this.speed_y;
			this.isEnd = false;
		}

		public movePath(): void {
			this._path = [0.4, 0, 0.1, 0];
			this.des_y = this._path.shift();
			this.start_y = 0;
			this.pass_time = 0;
			let len = this.des_y;
			this.speed_y = PlayerBaseScript.baseSpeed * 0.6;
			this.need_time = len / this.speed_y;
			this.isEnd = false;
		}

		private _path: Array<number> = [];
		private des_y: number;
		private start_y: number;
		private need_time: number;
		private pass_time: number;
		private speed_y: number;
		private isEnd: boolean = true;
		private updateOffsetY(): number {
			if (this.isEnd) return 0;
			this.pass_time = this.pass_time + Laya.timer.delta;
			let per = this.pass_time / this.need_time;
			per = per > 1 ? 1 : per;
			let offsetY = this.start_y + per * (this.des_y - this.start_y);
			if (this.pass_time >= this.need_time) {
				if (this._path.length > 0) {
					this.pass_time = this.pass_time - this.need_time;
					this.des_y = this._path.shift();
					this.start_y = offsetY;
					let len = Math.abs(this.des_y - this.start_y);
					this.need_time = len / this.speed_y;
					if (this._isMainPlayer) {
						WXTool.vibrateShort();
					}
				}
				else {
					this.isEnd = true;
					this._levelOffsetY = this._lastOffsetY;
				}
			}
			// logd('offsetY',offsetY);
			return offsetY;
		}



		public destory() {

			this.enable = false;
			this.running = false;
			if (this.player)
				this.player.active = true;
		}
	}
}