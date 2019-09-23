module dou.scene{
    import RenderQueue = Laya.RenderQueue;
	import BaseTexture = Laya.BaseTexture;
	import ShaderCompile3D = Laya.ShaderCompile3D;
	import ShaderDefines = Laya.ShaderDefines;
    import BaseMaterial = Laya.BaseMaterial;
    import Vector4 = Laya.Vector4;
	import VertexElementUsage = Laya.VertexElementUsage;
	import ShuriKenParticle3D = Laya.ShuriKenParticle3D;
	/**
	 * ...
	 * @author ...
	 */
	export class ShurikenParticleMaterialExp extends BaseMaterial {
		/**渲染状态_不透明。*/
		public static RENDERMODE_OPAQUE:number = 1;
		/**渲染状态_不透明_双面。*/
		public static RENDERMODE_OPAQUEDOUBLEFACE:number = 2;
		/**渲染状态_透明测试。*/
		public static RENDERMODE_CUTOUT:number = 3;
		/**渲染状态_透明测试_双面。*/
		public static RENDERMODE_CUTOUTDOUBLEFACE:number = 4;
		/**渲染状态_透明混合。*/
		public static RENDERMODE_TRANSPARENT:number = 13;
		/**渲染状态_透明混合_双面。*/
		public static RENDERMODE_TRANSPARENTDOUBLEFACE:number = 14;
		/**渲染状态_加色法混合。*/
		public static RENDERMODE_ADDTIVE:number = 15;
		/**渲染状态_加色法混合_双面。*/
		public static RENDERMODE_ADDTIVEDOUBLEFACE:number = 16;
		/**渲染状态_只读深度_透明混合。*/
		public static RENDERMODE_DEPTHREAD_TRANSPARENT:number = 5;
		/**渲染状态_只读深度_透明混合_双面。*/
		public static RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE:number = 6;
		/**渲染状态_只读深度_加色法混合。*/
		public static RENDERMODE_DEPTHREAD_ADDTIVE:number = 7;
		/**渲染状态_只读深度_加色法混合_双面。*/
		public static RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE:number = 8;
		/**渲染状态_无深度_透明混合。*/
		public static RENDERMODE_NONDEPTH_TRANSPARENT:number = 9;
		/**渲染状态_无深度_透明混合_双面。*/
		public static RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE:number = 10;
		/**渲染状态_无深度_加色法混合。*/
		public static RENDERMODE_NONDEPTH_ADDTIVE:number = 11;
		/**渲染状态_无深度_加色法混合_双面。*/
		public static RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE:number = 12;
		
		public static SHADERDEFINE_DIFFUSEMAP:number;
		public static SHADERDEFINE_TINTCOLOR:number;
		public static SHADERDEFINE_TILINGOFFSET:number;
		public static SHADERDEFINE_ADDTIVEFOG:number;
		
		public static DIFFUSETEXTURE:number = 1;
		public static TINTCOLOR:number = 2;
		public static TILINGOFFSET:number = 3;
		public static BENDANGLE:number = 4;
		public static BENDDISTANCE:number = 5;
		
		
		/** 默认材质，禁止修改*/
		public static defaultMaterial:ShurikenParticleMaterialExp = new ShurikenParticleMaterialExp();
		/**@private */
		public static shaderDefines:ShaderDefines = new ShaderDefines(BaseMaterial.shaderDefines);
		
		/**
		 * @private
		 */
		public static __init__():void {
			ShurikenParticleMaterialExp.SHADERDEFINE_DIFFUSEMAP = ShurikenParticleMaterialExp.shaderDefines.registerDefine("DIFFUSEMAP");
			ShurikenParticleMaterialExp.SHADERDEFINE_TINTCOLOR = ShurikenParticleMaterialExp.shaderDefines.registerDefine("TINTCOLOR");
			ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG = ShurikenParticleMaterialExp.shaderDefines.registerDefine("ADDTIVEFOG");
			ShurikenParticleMaterialExp.SHADERDEFINE_TILINGOFFSET = ShurikenParticleMaterialExp.shaderDefines.registerDefine("TILINGOFFSET");
		}
		
		/**
		 * 加载手里剑粒子材质。
		 * @param url 手里剑粒子材质地址。
		 */
		public static load(url:String):ShurikenParticleMaterialExp {
			return Laya.loader.create(url, null, null, ShurikenParticleMaterialExp);
		}
		
		/**
		 * 设置渲染模式。
		 * @return 渲染模式。
		 */
		public set renderMode(value:number) {
			switch (value) {
			case ShurikenParticleMaterialExp.RENDERMODE_OPAQUE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_DISABLE;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_OPAQUEDOUBLEFACE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_DISABLE;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_CUTOUT: 
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_DISABLE;
				this.renderQueue = RenderQueue.OPAQUE;
				this.alphaTest = true;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_CUTOUTDOUBLEFACE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_DISABLE;
				this.alphaTest = true;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_DEPTHREAD_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_DEPTHREAD_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_NONDEPTH_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = ShurikenParticleMaterialExp.DEPTHTEST_LESS;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = ShurikenParticleMaterialExp.DEPTHTEST_LESS;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_NONDEPTH_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = ShurikenParticleMaterialExp.DEPTHTEST_LESS;
				this.cull = ShurikenParticleMaterialExp.CULL_BACK;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case ShurikenParticleMaterialExp.RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = ShurikenParticleMaterialExp.DEPTHTEST_LESS;
				this.cull = ShurikenParticleMaterialExp.CULL_NONE;
				this.blend = ShurikenParticleMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = ShurikenParticleMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = ShurikenParticleMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			default: 
				throw new Error("Material:renderMode value error.");
			}
			
			this._conchMaterial && this._conchMaterial.setRenderMode(value);//NATIVE
		}
		
		/**
		 * 获取颜色。
		 * @return  颜色。
		 */
		public get tintColor():Vector4 {
			return this._getColor(ShurikenParticleMaterialExp.TINTCOLOR);
		}
		
		/**
		 * 设置颜色。
		 * @param value 颜色。
		 */
		public set tintColor(value:Vector4) {
			if (value)
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_TINTCOLOR);
			else
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_TINTCOLOR);
			
			this._setColor(ShurikenParticleMaterialExp.TINTCOLOR, value);
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @return 纹理平铺和偏移。
		 */
		public get tilingOffset():Vector4 {
			return this._getColor(ShurikenParticleMaterialExp.TILINGOFFSET);
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @param value 纹理平铺和偏移。
		 */
		public set tilingOffset(value:Vector4) {
			if (value) {
				let valueE:Float32Array = value.elements;
				if (valueE[0] != 1 || valueE[1] != 1 || valueE[2] != 0 || valueE[3] != 0)
					this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_TILINGOFFSET);
				else
					this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_TILINGOFFSET);
			} else {
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_TILINGOFFSET);
			}
			this._setColor(ShurikenParticleMaterialExp.TILINGOFFSET, value);
		}

		public getBendOffset(){
            return this._getColor(ShurikenParticleMaterialExp.BENDANGLE);
        };

        public setBendOffset(n){
            this._setColor(ShurikenParticleMaterialExp.BENDANGLE, n);
        };

        public setBendDistance(n){
            this._setNumber(ShurikenParticleMaterialExp.BENDDISTANCE, n);
        };
		
		
		/**
		 * 获取漫反射贴图。
		 * @return 漫反射贴图。
		 */
		public get diffuseTexture():BaseTexture {
			return this._getTexture(ShurikenParticleMaterialExp.DIFFUSETEXTURE);
		}
		
		/**
		 * 设置漫反射贴图。
		 * @param value 漫反射贴图。
		 */
		public set diffuseTexture(value:BaseTexture) {
			if (value)
				this._addShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_DIFFUSEMAP);
			else
				this._removeShaderDefine(ShurikenParticleMaterialExp.SHADERDEFINE_DIFFUSEMAP);
			
			this._setTexture(ShurikenParticleMaterialExp.DIFFUSETEXTURE, value);
		}
		
		public constructor() {
			/*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
			super();
			this.initShader1();
			this.setShaderName("PARTICLESHURIKENEXP");
			this.setBendDistance(50);
			this.renderMode = ShurikenParticleMaterialExp.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;//默认加色法会自动加上雾化宏定义，导致非加色法从材质读取完后未移除宏定义。
		}
		
		/**
		 * @private
		 */
		public static _parseShurikenParticleMaterial(textureMap:any, material:ShurikenParticleMaterialExp, json:any):void {//兼容性函数
			let customProps:any = json.customProps;
			let diffuseTexture:string = customProps.diffuseTexture.texture2D;
			(diffuseTexture) && (material.diffuseTexture = Loader.getRes(textureMap[diffuseTexture]));
			let tintColorValue:any = customProps.tintColor;
			(tintColorValue) && (material.tintColor = new Vector4(tintColorValue[0], tintColorValue[1], tintColorValue[2], tintColorValue[3]));
		}
		
		/**
		 *@private
		 */
		public onAsynLoaded(url:string, data:any, params:any):void {
			let jsonData:any = data[0];
			if (jsonData.version) {
				super.onAsynLoaded(url, data, params);
			} else {//兼容性代码
				let textureMap:Object = data[1];
				let props:Object = jsonData.props;
				for (let prop in props)
					this[prop] = props[prop];
				ShurikenParticleMaterialExp._parseShurikenParticleMaterial(textureMap, this, jsonData);
				
				this._endLoaded();
			}
		}

		private static isInit:boolean = false;
        public initShader1():void
        {
			if(ShurikenParticleMaterialExp.isInit)return;
				ShurikenParticleMaterialExp.isInit = true;
            let vs;
			let ps;
    		let attributeMap={
			'a_CornerTextureCoordinate':/*laya.d3.graphics.VertexElementUsage.CORNERTEXTURECOORDINATE0*/17,
			'a_MeshPosition':/*laya.d3.graphics.VertexElementUsage.POSITION0*/0,
			'a_MeshColor':/*laya.d3.graphics.VertexElementUsage.COLOR0*/1,
			'a_MeshTextureCoordinate':/*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE0*/2,
			'a_ShapePositionStartLifeTime':/*laya.d3.graphics.VertexElementUsage.SHAPEPOSITIONSTARTLIFETIME*/30,
			'a_DirectionTime':/*laya.d3.graphics.VertexElementUsage.DIRECTIONTIME*/32,
			'a_StartColor':/*laya.d3.graphics.VertexElementUsage.STARTCOLOR0*/19,
			'a_EndColor':/*laya.d3.graphics.VertexElementUsage.ENDCOLOR0*/23,
			'a_StartSize':/*laya.d3.graphics.VertexElementUsage.STARTSIZE*/20,
			'a_StartRotation0':/*laya.d3.graphics.VertexElementUsage.STARTROTATION*/22,
			'a_StartSpeed':/*laya.d3.graphics.VertexElementUsage.STARTSPEED*/31,
			'a_Random0':/*laya.d3.graphics.VertexElementUsage.RANDOM0*/34,
			'a_Random1':/*laya.d3.graphics.VertexElementUsage.RANDOM1*/35,
			'a_SimulationWorldPostion':/*laya.d3.graphics.VertexElementUsage.SIMULATIONWORLDPOSTION*/36,
			'a_SimulationWorldRotation':/*laya.d3.graphics.VertexElementUsage.SIMULATIONWORLDROTATION*/37};
		let uniformMap={
			'u_Tintcolor':[ /*laya.d3.core.particleShuriKen.ShurikenParticleMaterial.TINTCOLOR*/2,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
			'u_TilingOffset':[ /*laya.d3.core.particleShuriKen.ShurikenParticleMaterial.TILINGOFFSET*/3,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
			'u_texture':[ /*laya.d3.core.particleShuriKen.ShurikenParticleMaterial.DIFFUSETEXTURE*/1,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
			'_QOffset': [ ShurikenParticleMaterialExp.BENDANGLE, Laya.Shader3D.PERIOD_MATERIAL ],
            '_Dist': [ ShurikenParticleMaterialExp.BENDDISTANCE, Laya.Shader3D.PERIOD_MATERIAL ],
			'u_WorldPosition':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.WORLDPOSITION*/0,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_WorldRotation':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.WORLDROTATION*/1,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_PositionScale':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.POSITIONSCALE*/4,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SizeScale':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SIZESCALE*/5,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ScalingMode':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SCALINGMODE*/6,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_Gravity':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.GRAVITY*/7,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ThreeDStartRotation':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.THREEDSTARTROTATION*/8,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_StretchedBillboardLengthScale':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.STRETCHEDBILLBOARDLENGTHSCALE*/9,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_StretchedBillboardSpeedScale':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.STRETCHEDBILLBOARDSPEEDSCALE*/10,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SimulationSpace':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SIMULATIONSPACE*/11,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_CurrentTime':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.CURRENTTIME*/12,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ColorOverLifeGradientAlphas':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.COLOROVERLIFEGRADIENTALPHAS*/22,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ColorOverLifeGradientColors':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.COLOROVERLIFEGRADIENTCOLORS*/23,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_MaxColorOverLifeGradientAlphas':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.MAXCOLOROVERLIFEGRADIENTALPHAS*/24,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_MaxColorOverLifeGradientColors':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.MAXCOLOROVERLIFEGRADIENTCOLORS*/25,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityConst':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYCONST*/13,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTX*/14,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTY*/15,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTZ*/16,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityConstMax':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYCONSTMAX*/17,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientMaxX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTXMAX*/18,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientMaxY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTYMAX*/19,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLVelocityGradientMaxZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLVELOCITYGRADIENTZMAX*/20,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_VOLSpaceType':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.VOLSPACETYPE*/21,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradient':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSIZEGRADIENT*/26,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSIZEGRADIENTX*/27,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSIZEGRADIENTY*/28,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSizeGradientZ*/29,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientMax':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSizeGradientMax*/30,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientMaxX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSIZEGRADIENTXMAX*/31,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientMaxY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSIZEGRADIENTYMAX*/32,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_SOLSizeGradientMaxZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.SOLSizeGradientZMAX*/33,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityConst':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYCONST*/34,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityConstSeprarate':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYCONSTSEPRARATE*/35,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradient':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENT*/36,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTX*/37,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTY*/38,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTZ*/39,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientW':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTW*/40,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityConstMax':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYCONSTMAX*/41,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityConstMaxSeprarate':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYCONSTMAXSEPRARATE*/42,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientMax':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTMAX*/43,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientMaxX':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTXMAX*/44,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientMaxY':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTYMAX*/45,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientMaxZ':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTZMAX*/46,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_ROLAngularVelocityGradientMaxW':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.ROLANGULARVELOCITYGRADIENTWMAX*/47,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_TSACycles':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.TEXTURESHEETANIMATIONCYCLES*/48,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_TSASubUVLength':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.TEXTURESHEETANIMATIONSUBUVLENGTH*/49,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_TSAGradientUVs':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.TEXTURESHEETANIMATIONGRADIENTUVS*/50,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_TSAMaxGradientUVs':[ /*laya.d3.core.particleShuriKen.ShuriKenParticle3D.TEXTURESHEETANIMATIONGRADIENTMAXUVS*/51,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
			'u_CameraPosition':[ /*laya.d3.core.BaseCamera.CAMERAPOS*/0,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
			'u_CameraDirection':[ /*laya.d3.core.BaseCamera.CAMERADIRECTION*/5,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
			'u_CameraUp':[ /*laya.d3.core.BaseCamera.CAMERAUP*/6,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
			'u_View':[ /*laya.d3.core.BaseCamera.VIEWMATRIX*/1,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
			'u_Projection':[ /*laya.d3.core.BaseCamera.PROJECTMATRIX*/2,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
			'u_FogStart':[ /*laya.d3.core.scene.Scene.FOGSTART*/1,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
			'u_FogRange':[ /*laya.d3.core.scene.Scene.FOGRANGE*/2,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
			'u_FogColor':[ /*laya.d3.core.scene.Scene.FOGCOLOR*/0,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4]};
			let PARTICLESHURIKEN=Laya.Shader3D.nameKey.add("PARTICLESHURIKENEXP");
			vs = `#ifdef HIGHPRECISION
  precision highp float;
#else
  precision mediump float;
#endif

#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)
	attribute vec4 a_CornerTextureCoordinate;
#endif
#ifdef RENDERMODE_MESH
	attribute vec3 a_MeshPosition;
	attribute vec4 a_MeshColor;
	attribute vec2 a_MeshTextureCoordinate;
	varying vec4 v_MeshColor;
#endif

attribute vec4 a_ShapePositionStartLifeTime;
attribute vec4 a_DirectionTime;
attribute vec4 a_StartColor;
attribute vec3 a_StartSize;
attribute vec3 a_StartRotation0;
attribute float a_StartSpeed;
#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)
  attribute vec4 a_Random0;
#endif
#if defined(TEXTURESHEETANIMATIONRANDOMCURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
  attribute vec4 a_Random1;
#endif
attribute vec3 a_SimulationWorldPostion;
attribute vec4 a_SimulationWorldRotation;

varying float v_Discard;
varying vec4 v_Color;
#ifdef DIFFUSEMAP
	varying vec2 v_TextureCoordinate;
#endif

uniform float u_CurrentTime;
uniform vec3 u_Gravity;

uniform vec3 u_WorldPosition;
uniform vec4 u_WorldRotation;
uniform bool u_ThreeDStartRotation;
uniform int u_ScalingMode;
uniform vec3 u_PositionScale;
uniform vec3 u_SizeScale;
uniform mat4 u_View;
uniform mat4 u_Projection;

#ifdef STRETCHEDBILLBOARD
	uniform vec3 u_CameraPosition;
#endif
uniform vec3 u_CameraDirection;//TODO:只有几种广告牌模式需要用
uniform vec3 u_CameraUp;

uniform  float u_StretchedBillboardLengthScale;
uniform  float u_StretchedBillboardSpeedScale;
uniform int u_SimulationSpace;

#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
  uniform  int  u_VOLSpaceType;
#endif
#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)
  uniform  vec3 u_VOLVelocityConst;
#endif
#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
  uniform  vec2 u_VOLVelocityGradientX[4];//x为key,y为速度
  uniform  vec2 u_VOLVelocityGradientY[4];//x为key,y为速度
  uniform  vec2 u_VOLVelocityGradientZ[4];//x为key,y为速度
#endif
#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT
  uniform  vec3 u_VOLVelocityConstMax;
#endif
#ifdef VELOCITYOVERLIFETIMERANDOMCURVE
  uniform  vec2 u_VOLVelocityGradientMaxX[4];//x为key,y为速度
  uniform  vec2 u_VOLVelocityGradientMaxY[4];//x为key,y为速度
  uniform  vec2 u_VOLVelocityGradientMaxZ[4];//x为key,y为速度
#endif

#ifdef COLOROVERLIFETIME
  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color
  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha
#endif
#ifdef RANDOMCOLOROVERLIFETIME
  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color
  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha
  uniform  vec4 u_MaxColorOverLifeGradientColors[4];//x为key,yzw为Color
  uniform  vec2 u_MaxColorOverLifeGradientAlphas[4];//x为key,y为Alpha
#endif


#if defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMERANDOMCURVES)
  uniform  vec2 u_SOLSizeGradient[4];//x为key,y为尺寸
#endif
#ifdef SIZEOVERLIFETIMERANDOMCURVES
  uniform  vec2 u_SOLSizeGradientMax[4];//x为key,y为尺寸
#endif
#if defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)
  uniform  vec2 u_SOLSizeGradientX[4];//x为key,y为尺寸
  uniform  vec2 u_SOLSizeGradientY[4];//x为key,y为尺寸
  uniform  vec2 u_SOLSizeGradientZ[4];//x为key,y为尺寸
#endif
#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE
  uniform  vec2 u_SOLSizeGradientMaxX[4];//x为key,y为尺寸
  uniform  vec2 u_SOLSizeGradientMaxY[4];//x为key,y为尺寸
  uniform  vec2 u_SOLSizeGradientMaxZ[4];//x为key,y为尺寸
#endif


#ifdef ROTATIONOVERLIFETIME
  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)
    uniform  float u_ROLAngularVelocityConst;
  #endif
  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
    uniform  float u_ROLAngularVelocityConstMax;
  #endif
  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)
    uniform  vec2 u_ROLAngularVelocityGradient[4];//x为key,y为旋转
  #endif
  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES
    uniform  vec2 u_ROLAngularVelocityGradientMax[4];//x为key,y为旋转
  #endif
#endif
#ifdef ROTATIONOVERLIFETIMESEPERATE
  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)
    uniform  vec3 u_ROLAngularVelocityConstSeprarate;
  #endif
  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
    uniform  vec3 u_ROLAngularVelocityConstMaxSeprarate;
  #endif
  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)
    uniform  vec2 u_ROLAngularVelocityGradientX[4];
    uniform  vec2 u_ROLAngularVelocityGradientY[4];
    uniform  vec2 u_ROLAngularVelocityGradientZ[4];
	uniform  vec2 u_ROLAngularVelocityGradientW[4];
  #endif
  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES
    uniform  vec2 u_ROLAngularVelocityGradientMaxX[4];
    uniform  vec2 u_ROLAngularVelocityGradientMaxY[4];
    uniform  vec2 u_ROLAngularVelocityGradientMaxZ[4];
	uniform  vec2 u_ROLAngularVelocityGradientMaxW[4];
  #endif
#endif

#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)
  uniform  float u_TSACycles;
  uniform  vec2 u_TSASubUVLength;
  uniform  vec2 u_TSAGradientUVs[4];//x为key,y为frame
#endif
#ifdef TEXTURESHEETANIMATIONRANDOMCURVE
  uniform  vec2 u_TSAMaxGradientUVs[4];//x为key,y为frame
#endif

#ifdef FOG
	varying vec3 v_PositionWorld;
#endif

#ifdef TILINGOFFSET
	uniform vec4 u_TilingOffset;
#endif
uniform vec4 _QOffset;
uniform float _Dist;

vec3 rotationByEuler(in vec3 vector,in vec3 rot)
{
	float halfRoll = rot.z * 0.5;
    float halfPitch = rot.x * 0.5;
	float halfYaw = rot.y * 0.5;

	float sinRoll = sin(halfRoll);
	float cosRoll = cos(halfRoll);
	float sinPitch = sin(halfPitch);
	float cosPitch = cos(halfPitch);
	float sinYaw = sin(halfYaw);
	float cosYaw = cos(halfYaw);

	float quaX = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
	float quaY = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
	float quaZ = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
	float quaW = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
	
	//vec4 q=vec4(quaX,quaY,quaZ,quaW);
	//vec3 temp = cross(q.xyz, vector) + q.w * vector;
	//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);
	
	float x = quaX + quaX;
    float y = quaY + quaY;
    float z = quaZ + quaZ;
    float wx = quaW * x;
    float wy = quaW * y;
    float wz = quaW * z;
	float xx = quaX * x;
    float xy = quaX * y;
	float xz = quaX * z;
    float yy = quaY * y;
    float yz = quaY * z;
    float zz = quaZ * z;

    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),
                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),
                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));
	
}

//假定axis已经归一化
vec3 rotationByAxis(in vec3 vector,in vec3 axis, in float angle)
{
	float halfAngle = angle * 0.5;
	float sin = sin(halfAngle);
	
	float quaX = axis.x * sin;
	float quaY = axis.y * sin;
	float quaZ = axis.z * sin;
	float quaW = cos(halfAngle);
	
	//vec4 q=vec4(quaX,quaY,quaZ,quaW);
	//vec3 temp = cross(q.xyz, vector) + q.w * vector;
	//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);
	
	float x = quaX + quaX;
    float y = quaY + quaY;
    float z = quaZ + quaZ;
    float wx = quaW * x;
    float wy = quaW * y;
    float wz = quaW * z;
	float xx = quaX * x;
    float xy = quaX * y;
	float xz = quaX * z;
    float yy = quaY * y;
    float yz = quaY * z;
    float zz = quaZ * z;

    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),
                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),
                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));
	
}

vec3 rotationByQuaternions(in vec3 v,in vec4 q) 
{
	return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

 
#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)
float getCurValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)
{
	float curValue;
	for(int i=1;i<4;i++)
	{
		vec2 gradientNumber=gradientNumbers[i];
		float key=gradientNumber.x;
		if(key>=normalizedAge)
		{
			vec2 lastGradientNumber=gradientNumbers[i-1];
			float lastKey=lastGradientNumber.x;
			float age=(normalizedAge-lastKey)/(key-lastKey);
			curValue=mix(lastGradientNumber.y,gradientNumber.y,age);
			break;
		}
	}
	return curValue;
}
#endif

#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)
float getTotalValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)
{
	float totalValue=0.0;
	for(int i=1;i<4;i++)
	{
		vec2 gradientNumber=gradientNumbers[i];
		float key=gradientNumber.x;
		vec2 lastGradientNumber=gradientNumbers[i-1];
		float lastValue=lastGradientNumber.y;
		
		if(key>=normalizedAge){
			float lastKey=lastGradientNumber.x;
			float age=(normalizedAge-lastKey)/(key-lastKey);
			totalValue+=(lastValue+mix(lastValue,gradientNumber.y,age))/2.0*a_ShapePositionStartLifeTime.w*(normalizedAge-lastKey);
			break;
		}
		else{
			totalValue+=(lastValue+gradientNumber.y)/2.0*a_ShapePositionStartLifeTime.w*(key-lastGradientNumber.x);
		}
	}
	return totalValue;
}
#endif

#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)
vec4 getColorFromGradient(in vec2 gradientAlphas[4],in vec4 gradientColors[4],in float normalizedAge)
{
	vec4 overTimeColor;
	for(int i=1;i<4;i++)
	{
		vec2 gradientAlpha=gradientAlphas[i];
		float alphaKey=gradientAlpha.x;
		if(alphaKey>=normalizedAge)
		{
			vec2 lastGradientAlpha=gradientAlphas[i-1];
			float lastAlphaKey=lastGradientAlpha.x;
			float age=(normalizedAge-lastAlphaKey)/(alphaKey-lastAlphaKey);
			overTimeColor.a=mix(lastGradientAlpha.y,gradientAlpha.y,age);
			break;
		}
	}
	
	for(int i=1;i<4;i++)
	{
		vec4 gradientColor=gradientColors[i];
		float colorKey=gradientColor.x;
		if(colorKey>=normalizedAge)
		{
			vec4 lastGradientColor=gradientColors[i-1];
			float lastColorKey=lastGradientColor.x;
			float age=(normalizedAge-lastColorKey)/(colorKey-lastColorKey);
			overTimeColor.rgb=mix(gradientColors[i-1].yzw,gradientColor.yzw,age);
			break;
		}
	}
	return overTimeColor;
}
#endif


#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)
float getFrameFromGradient(in vec2 gradientFrames[4],in float normalizedAge)
{
	float overTimeFrame;
	for(int i=1;i<4;i++)
	{
		vec2 gradientFrame=gradientFrames[i];
		float key=gradientFrame.x;
		if(key>=normalizedAge)
		{
			vec2 lastGradientFrame=gradientFrames[i-1];
			float lastKey=lastGradientFrame.x;
			float age=(normalizedAge-lastKey)/(key-lastKey);
			overTimeFrame=mix(lastGradientFrame.y,gradientFrame.y,age);
			break;
		}
	}
	return floor(overTimeFrame);
}
#endif

#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
vec3 computeParticleLifeVelocity(in float normalizedAge)
{
  vec3 outLifeVelocity;
  #ifdef VELOCITYOVERLIFETIMECONSTANT
	 outLifeVelocity=u_VOLVelocityConst; 
  #endif
  #ifdef VELOCITYOVERLIFETIMECURVE
     outLifeVelocity= vec3(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));
  #endif
  #ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT
	 outLifeVelocity=mix(u_VOLVelocityConst,u_VOLVelocityConstMax,vec3(a_Random1.y,a_Random1.z,a_Random1.w)); 
  #endif
  #ifdef VELOCITYOVERLIFETIMERANDOMCURVE
     outLifeVelocity=vec3(mix(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y),
	                 mix(getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z),
					 mix(getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));
  #endif
					
  return outLifeVelocity;
} 
#endif

vec3 computeParticlePosition(in vec3 startVelocity, in vec3 lifeVelocity,in float age,in float normalizedAge,vec3 gravityVelocity,vec4 worldRotation)
{
   vec3 startPosition;
   vec3 lifePosition;
   #if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
	#ifdef VELOCITYOVERLIFETIMECONSTANT
		  startPosition=startVelocity*age;
		  lifePosition=lifeVelocity*age;
	#endif
	#ifdef VELOCITYOVERLIFETIMECURVE
		  startPosition=startVelocity*age;
		  lifePosition=vec3(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));
	#endif
	#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT
		  startPosition=startVelocity*age;
		  lifePosition=lifeVelocity*age;
	#endif
	#ifdef VELOCITYOVERLIFETIMERANDOMCURVE
		  startPosition=startVelocity*age;
		  lifePosition=vec3(mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y)
	      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z)
	      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));
	#endif
	
	vec3 finalPosition;
	if(u_VOLSpaceType==0){
	  if(u_ScalingMode!=2)
	   finalPosition =rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition),worldRotation);
	  else
	   finalPosition =rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition,worldRotation);
	}
	else{
	  if(u_ScalingMode!=2)
	    finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation)+lifePosition;
	  else
	    finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation)+lifePosition;
	}
  #else
	 startPosition=startVelocity*age;
	 vec3 finalPosition;
	 if(u_ScalingMode!=2)
	   finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation);
	 else
	   finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation);
  #endif
  
  if(u_SimulationSpace==0)
    finalPosition=finalPosition+a_SimulationWorldPostion;
  else if(u_SimulationSpace==1) 
    finalPosition=finalPosition+u_WorldPosition;
  
  finalPosition+=0.5*gravityVelocity*age;
 
  return  finalPosition;
}


vec4 computeParticleColor(in vec4 color,in float normalizedAge)
{
	#ifdef COLOROVERLIFETIME
	  color*=getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge);
	#endif
	
	#ifdef RANDOMCOLOROVERLIFETIME
	  color*=mix(getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge),getColorFromGradient(u_MaxColorOverLifeGradientAlphas,u_MaxColorOverLifeGradientColors,normalizedAge),a_Random0.y);
	#endif

    return color;
}

vec2 computeParticleSizeBillbard(in vec2 size,in float normalizedAge)
{
	#ifdef SIZEOVERLIFETIMECURVE
		size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);
	#endif
	#ifdef SIZEOVERLIFETIMERANDOMCURVES
	    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); 
	#endif
	#ifdef SIZEOVERLIFETIMECURVESEPERATE
		size*=vec2(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge));
	#endif
	#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE
	    size*=vec2(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)
	    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z));
	#endif
	return size;
}

#ifdef RENDERMODE_MESH
vec3 computeParticleSizeMesh(in vec3 size,in float normalizedAge)
{
	#ifdef SIZEOVERLIFETIMECURVE
		size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);
	#endif
	#ifdef SIZEOVERLIFETIMERANDOMCURVES
	    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); 
	#endif
	#ifdef SIZEOVERLIFETIMECURVESEPERATE
		size*=vec3(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge));
	#endif
	#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE
	    size*=vec3(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)
	    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z)
		,mix(getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxZ,normalizedAge),a_Random0.z));
	#endif
	return size;
}
#endif

float computeParticleRotationFloat(in float rotation,in float age,in float normalizedAge)
{ 
	#ifdef ROTATIONOVERLIFETIME
		#ifdef ROTATIONOVERLIFETIMECONSTANT
			float ageRot=u_ROLAngularVelocityConst*age;
	        rotation+=ageRot;
		#endif
		#ifdef ROTATIONOVERLIFETIMECURVE
			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);
		#endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
			float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;
	        rotation+=ageRot;
	    #endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES
			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);
		#endif
	#endif
	#ifdef ROTATIONOVERLIFETIMESEPERATE
		#ifdef ROTATIONOVERLIFETIMECONSTANT
			float ageRot=u_ROLAngularVelocityConstSeprarate.z*age;
	        rotation+=ageRot;
		#endif
		#ifdef ROTATIONOVERLIFETIMECURVE
			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge);
		#endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
			float ageRot=mix(u_ROLAngularVelocityConstSeprarate.z,u_ROLAngularVelocityConstMaxSeprarate.z,a_Random0.w)*age;
	        rotation+=ageRot;
	    #endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES
			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));
		#endif
	#endif
	return rotation;
}


#if defined(RENDERMODE_MESH)&&(defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE))
vec3 computeParticleRotationVec3(in vec3 rotation,in float age,in float normalizedAge)
{ 
	#ifdef ROTATIONOVERLIFETIME
	#ifdef ROTATIONOVERLIFETIMECONSTANT
			float ageRot=u_ROLAngularVelocityConst*age;
	        rotation+=ageRot;
		#endif
		#ifdef ROTATIONOVERLIFETIMECURVE
			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);
		#endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
			float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;
	        rotation+=ageRot;
	    #endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES
			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);
		#endif
	#endif
	#ifdef ROTATIONOVERLIFETIMESEPERATE
	#ifdef ROTATIONOVERLIFETIMECONSTANT
			vec3 ageRot=u_ROLAngularVelocityConstSeprarate*age;
	        rotation+=ageRot;
		#endif
		#ifdef ROTATIONOVERLIFETIMECURVE
			rotation+=vec3(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge));
		#endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS
			vec3 ageRot=mix(u_ROLAngularVelocityConstSeprarate,u_ROLAngularVelocityConstMaxSeprarate,a_Random0.w)*age;
	        rotation+=ageRot;
	    #endif
		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES
			rotation+=vec3(mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxX,normalizedAge),a_Random0.w)
	        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxY,normalizedAge),a_Random0.w)
	        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));
		#endif
	#endif
	return rotation;
}
#endif

vec2 computeParticleUV(in vec2 uv,in float normalizedAge)
{ 
	#ifdef TEXTURESHEETANIMATIONCURVE
		float cycleNormalizedAge=normalizedAge*u_TSACycles;
		float frame=getFrameFromGradient(u_TSAGradientUVs,cycleNormalizedAge-floor(cycleNormalizedAge));
		float totalULength=frame*u_TSASubUVLength.x;
		float floorTotalULength=floor(totalULength);
	    uv.x+=totalULength-floorTotalULength;
		uv.y+=floorTotalULength*u_TSASubUVLength.y;
    #endif
	#ifdef TEXTURESHEETANIMATIONRANDOMCURVE
		float cycleNormalizedAge=normalizedAge*u_TSACycles;
		float uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);
	    float frame=floor(mix(getFrameFromGradient(u_TSAGradientUVs,uvNormalizedAge),getFrameFromGradient(u_TSAMaxGradientUVs,uvNormalizedAge),a_Random1.x));
		float totalULength=frame*u_TSASubUVLength.x;
		float floorTotalULength=floor(totalULength);
	    uv.x+=totalULength-floorTotalULength;
		uv.y+=floorTotalULength*u_TSASubUVLength.y;
    #endif
	return uv;
}

void main()
{
	float age = u_CurrentTime - a_DirectionTime.w;
	float normalizedAge = age/a_ShapePositionStartLifeTime.w;
	vec3 lifeVelocity;
	if(normalizedAge<1.0){ 
	vec3 startVelocity=a_DirectionTime.xyz*a_StartSpeed;
	#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
		lifeVelocity= computeParticleLifeVelocity(normalizedAge);//计算粒子生命周期速度
	#endif 
	vec3 gravityVelocity=u_Gravity*age;
	
	vec4 worldRotation;
	if(u_SimulationSpace==0)
		worldRotation=a_SimulationWorldRotation;
	else
		worldRotation=u_WorldRotation;
	
	vec3 center=computeParticlePosition(startVelocity, lifeVelocity, age, normalizedAge,gravityVelocity,worldRotation);//计算粒子位置
   
   
   #ifdef SPHERHBILLBOARD
		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效
        vec3 cameraUpVector =normalize(u_CameraUp);//TODO:是否外面归一化
        vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));
        vec3 upVector = normalize(cross(sideVector,u_CameraDirection));
	    corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);
		#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)
			if(u_ThreeDStartRotation){
				vec3 rotation=vec3(a_StartRotation0.xy,computeParticleRotationFloat(a_StartRotation0.z,age,normalizedAge));
				center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,rotation);
			}
			else{
				float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);
				float c = cos(rot);
				float s = sin(rot);
				mat2 rotation= mat2(c, -s, s, c);
				corner=rotation*corner;
				center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);
			}
		#else
			if(u_ThreeDStartRotation){
				center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,a_StartRotation0);
			}
			else{
				float c = cos(a_StartRotation0.x);
				float s = sin(a_StartRotation0.x);
				mat2 rotation= mat2(c, -s, s, c);
				corner=rotation*corner;
				center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);
			}
		#endif
   #endif
   
   #ifdef STRETCHEDBILLBOARD
	vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效
	vec3 velocity;
	#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)
	    if(u_VOLSpaceType==0)
		  velocity=rotationByQuaternions(u_SizeScale*(startVelocity+lifeVelocity),worldRotation)+gravityVelocity;
	    else
		  velocity=rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+lifeVelocity+gravityVelocity;
    #else
	    velocity= rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+gravityVelocity;
    #endif	
		vec3 cameraUpVector = normalize(velocity);
		vec3 direction = normalize(center-u_CameraPosition);
        vec3 sideVector = normalize(cross(direction,normalize(velocity)));
		
		sideVector=u_SizeScale.xzy*sideVector;
		cameraUpVector=length(vec3(u_SizeScale.x,0.0,0.0))*cameraUpVector;
		
	    vec2 size=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);
		
	    const mat2 rotaionZHalfPI=mat2(0.0, -1.0, 1.0, 0.0);
	    corner=rotaionZHalfPI*corner;
	    corner.y=corner.y-abs(corner.y);
		
	    float speed=length(velocity);//TODO:
	    center +=sign(u_SizeScale.x)*(sign(u_StretchedBillboardLengthScale)*size.x*corner.x*sideVector+(speed*u_StretchedBillboardSpeedScale+size.y*u_StretchedBillboardLengthScale)*corner.y*cameraUpVector);
   #endif
   
   #ifdef HORIZONTALBILLBOARD
		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效
        const vec3 cameraUpVector=vec3(0.0,0.0,1.0);
	    const vec3 sideVector = vec3(-1.0,0.0,0.0);
		
		float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);
        float c = cos(rot);
        float s = sin(rot);
        mat2 rotation= mat2(c, -s, s, c);
	    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因
		corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);
        center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);
   #endif
   
   #ifdef VERTICALBILLBOARD
		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效
        const vec3 cameraUpVector =vec3(0.0,1.0,0.0);
        vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));
		
		float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);
        float c = cos(rot);
        float s = sin(rot);
        mat2 rotation= mat2(c, -s, s, c);
	    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因
		corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);
        center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);
   #endif
   
   #ifdef RENDERMODE_MESH
	    vec3 size=computeParticleSizeMesh(a_StartSize,normalizedAge);
		#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)
			if(u_ThreeDStartRotation){
				vec3 rotation=vec3(a_StartRotation0.xy,-computeParticleRotationFloat(a_StartRotation0.z, age,normalizedAge));
				center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,rotation),worldRotation);
			}
			else{
				#ifdef ROTATIONOVERLIFETIME
					float angle=computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);
					if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){
						center+= (rotationByQuaternions(rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),angle),worldRotation));//已验证
					}
					else{
						#ifdef SHAPE
							center+= u_SizeScale.xzy*(rotationByQuaternions(rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),angle),worldRotation));
						#else
							if(u_SimulationSpace==0)
								center+=rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle);//已验证
							else if(u_SimulationSpace==1)
								center+=rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle),worldRotation);//已验证
						#endif
					}
				#endif
				#ifdef ROTATIONOVERLIFETIMESEPERATE
					//TODO:是否应合并if(u_ThreeDStartRotation)分支代码,待测试
					vec3 angle=computeParticleRotationVec3(vec3(0.0,0.0,a_StartRotation0.z), age,normalizedAge);
					center+= (rotationByQuaternions(rotationByEuler(u_SizeScale*a_MeshPosition*size,vec3(angle.x,angle.y,angle.z)),worldRotation));//已验证
				#endif	
			}
		#else
			if(u_ThreeDStartRotation){
				center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,a_StartRotation0),worldRotation);//已验证
			}
			else{
				if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){
					if(u_SimulationSpace==0)
						center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x);
					else if(u_SimulationSpace==1)
						center+= (rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x),worldRotation));//已验证
				}
				else{
					#ifdef SHAPE
						if(u_SimulationSpace==0)
							center+= u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x);
						else if(u_SimulationSpace==1)
							center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x),worldRotation);	
					#else
						if(u_SimulationSpace==0)
							center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x);
						else if(u_SimulationSpace==1)
							center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x),worldRotation);//已验证
					#endif
				}
			}
		#endif
		v_MeshColor=a_MeshColor;
   #endif

    highp vec4 vPos = u_Projection*u_View*vec4(center,1.0);
	float zOff = vPos.z / _Dist;
	vPos += _QOffset * zOff * zOff;
    gl_Position = vPos;
    v_Color = computeParticleColor(a_StartColor, normalizedAge);
	#ifdef DIFFUSEMAP
		#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)
			v_TextureCoordinate =computeParticleUV(a_CornerTextureCoordinate.zw, normalizedAge);
		#endif
		#ifdef RENDERMODE_MESH
			v_TextureCoordinate =computeParticleUV(a_MeshTextureCoordinate, normalizedAge);
		#endif
		
		#ifdef TILINGOFFSET
			v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y)*u_TilingOffset.xy+vec2(u_TilingOffset.z,-u_TilingOffset.w);//需要特殊处理
			v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y);//需要特殊处理
		#endif
	#endif
    v_Discard=0.0;
	  
	#ifdef FOG
		v_PositionWorld=center;
	#endif
   }
   else
	{
		v_Discard=1.0;
	}
}

`;
			// vs="uniform vec4 _QOffset;\nuniform float _Dist;\n#ifdef HIGHPRECISION\n  precision highp float;\n#else\n  precision mediump float;\n#endif\n\n#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\n	attribute vec4 a_CornerTextureCoordinate;\n#endif\n#ifdef RENDERMODE_MESH\n	attribute vec3 a_MeshPosition;\n	attribute vec4 a_MeshColor;\n	attribute vec2 a_MeshTextureCoordinate;\n	varying vec4 v_MeshColor;\n#endif\n\nattribute vec4 a_ShapePositionStartLifeTime;\nattribute vec4 a_DirectionTime;\nattribute vec4 a_StartColor;\nattribute vec3 a_StartSize;\nattribute vec3 a_StartRotation0;\nattribute float a_StartSpeed;\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\n  attribute vec4 a_Random0;\n#endif\n#if defined(TEXTURESHEETANIMATIONRANDOMCURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n  attribute vec4 a_Random1;\n#endif\nattribute vec3 a_SimulationWorldPostion;\nattribute vec4 a_SimulationWorldRotation;\n\nvarying float v_Discard;\nvarying vec4 v_Color;\n#ifdef DIFFUSEMAP\n	varying vec2 v_TextureCoordinate;\n#endif\n\nuniform float u_CurrentTime;\nuniform vec3 u_Gravity;\n\nuniform vec3 u_WorldPosition;\nuniform vec4 u_WorldRotation;\nuniform bool u_ThreeDStartRotation;\nuniform int u_ScalingMode;\nuniform vec3 u_PositionScale;\nuniform vec3 u_SizeScale;\nuniform mat4 u_View;\nuniform mat4 u_Projection;\n\n#ifdef STRETCHEDBILLBOARD\n	uniform vec3 u_CameraPosition;\n#endif\nuniform vec3 u_CameraDirection;//TODO:只有几种广告牌模式需要用\nuniform vec3 u_CameraUp;\n\nuniform  float u_StretchedBillboardLengthScale;\nuniform  float u_StretchedBillboardSpeedScale;\nuniform int u_SimulationSpace;\n\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n  uniform  int  u_VOLSpaceType;\n#endif\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)\n  uniform  vec3 u_VOLVelocityConst;\n#endif\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n  uniform  vec2 u_VOLVelocityGradientX[4];//x为key,y为速度\n  uniform  vec2 u_VOLVelocityGradientY[4];//x为key,y为速度\n  uniform  vec2 u_VOLVelocityGradientZ[4];//x为key,y为速度\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\n  uniform  vec3 u_VOLVelocityConstMax;\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\n  uniform  vec2 u_VOLVelocityGradientMaxX[4];//x为key,y为速度\n  uniform  vec2 u_VOLVelocityGradientMaxY[4];//x为key,y为速度\n  uniform  vec2 u_VOLVelocityGradientMaxZ[4];//x为key,y为速度\n#endif\n\n#ifdef COLOROVERLIFETIME\n  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\n  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\n#endif\n#ifdef RANDOMCOLOROVERLIFETIME\n  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\n  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\n  uniform  vec4 u_MaxColorOverLifeGradientColors[4];//x为key,yzw为Color\n  uniform  vec2 u_MaxColorOverLifeGradientAlphas[4];//x为key,y为Alpha\n#endif\n\n\n#if defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMERANDOMCURVES)\n  uniform  vec2 u_SOLSizeGradient[4];//x为key,y为尺寸\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVES\n  uniform  vec2 u_SOLSizeGradientMax[4];//x为key,y为尺寸\n#endif\n#if defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\n  uniform  vec2 u_SOLSizeGradientX[4];//x为key,y为尺寸\n  uniform  vec2 u_SOLSizeGradientY[4];//x为key,y为尺寸\n  uniform  vec2 u_SOLSizeGradientZ[4];//x为key,y为尺寸\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\n  uniform  vec2 u_SOLSizeGradientMaxX[4];//x为key,y为尺寸\n  uniform  vec2 u_SOLSizeGradientMaxY[4];//x为key,y为尺寸\n  uniform  vec2 u_SOLSizeGradientMaxZ[4];//x为key,y为尺寸\n#endif\n\n\n#ifdef ROTATIONOVERLIFETIME\n  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\n    uniform  float u_ROLAngularVelocityConst;\n  #endif\n  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n    uniform  float u_ROLAngularVelocityConstMax;\n  #endif\n  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\n    uniform  vec2 u_ROLAngularVelocityGradient[4];//x为key,y为旋转\n  #endif\n  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n    uniform  vec2 u_ROLAngularVelocityGradientMax[4];//x为key,y为旋转\n  #endif\n#endif\n#ifdef ROTATIONOVERLIFETIMESEPERATE\n  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\n    uniform  vec3 u_ROLAngularVelocityConstSeprarate;\n  #endif\n  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n    uniform  vec3 u_ROLAngularVelocityConstMaxSeprarate;\n  #endif\n  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\n    uniform  vec2 u_ROLAngularVelocityGradientX[4];\n    uniform  vec2 u_ROLAngularVelocityGradientY[4];\n    uniform  vec2 u_ROLAngularVelocityGradientZ[4];\n	uniform  vec2 u_ROLAngularVelocityGradientW[4];\n  #endif\n  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n    uniform  vec2 u_ROLAngularVelocityGradientMaxX[4];\n    uniform  vec2 u_ROLAngularVelocityGradientMaxY[4];\n    uniform  vec2 u_ROLAngularVelocityGradientMaxZ[4];\n	uniform  vec2 u_ROLAngularVelocityGradientMaxW[4];\n  #endif\n#endif\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\n  uniform  float u_TSACycles;\n  uniform  vec2 u_TSASubUVLength;\n  uniform  vec2 u_TSAGradientUVs[4];//x为key,y为frame\n#endif\n#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\n  uniform  vec2 u_TSAMaxGradientUVs[4];//x为key,y为frame\n#endif\n\n#ifdef FOG\n	varying vec3 v_PositionWorld;\n#endif\n\n#ifdef TILINGOFFSET\n	uniform vec4 u_TilingOffset;\n#endif\n\nvec3 rotationByEuler(in vec3 vector,in vec3 rot)\n{\n	float halfRoll = rot.z * 0.5;\n    float halfPitch = rot.x * 0.5;\n	float halfYaw = rot.y * 0.5;\n\n	float sinRoll = sin(halfRoll);\n	float cosRoll = cos(halfRoll);\n	float sinPitch = sin(halfPitch);\n	float cosPitch = cos(halfPitch);\n	float sinYaw = sin(halfYaw);\n	float cosYaw = cos(halfYaw);\n\n	float quaX = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);\n	float quaY = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);\n	float quaZ = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);\n	float quaW = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);\n	\n	//vec4 q=vec4(quaX,quaY,quaZ,quaW);\n	//vec3 temp = cross(q.xyz, vector) + q.w * vector;\n	//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\n	\n	float x = quaX + quaX;\n    float y = quaY + quaY;\n    float z = quaZ + quaZ;\n    float wx = quaW * x;\n    float wy = quaW * y;\n    float wz = quaW * z;\n	float xx = quaX * x;\n    float xy = quaX * y;\n	float xz = quaX * z;\n    float yy = quaY * y;\n    float yz = quaY * z;\n    float zz = quaZ * z;\n\n    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n	\n}\n\n//假定axis已经归一化\nvec3 rotationByAxis(in vec3 vector,in vec3 axis, in float angle)\n{\n	float halfAngle = angle * 0.5;\n	float sin = sin(halfAngle);\n	\n	float quaX = axis.x * sin;\n	float quaY = axis.y * sin;\n	float quaZ = axis.z * sin;\n	float quaW = cos(halfAngle);\n	\n	//vec4 q=vec4(quaX,quaY,quaZ,quaW);\n	//vec3 temp = cross(q.xyz, vector) + q.w * vector;\n	//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\n	\n	float x = quaX + quaX;\n    float y = quaY + quaY;\n    float z = quaZ + quaZ;\n    float wx = quaW * x;\n    float wy = quaW * y;\n    float wz = quaW * z;\n	float xx = quaX * x;\n    float xy = quaX * y;\n	float xz = quaX * z;\n    float yy = quaY * y;\n    float yz = quaY * z;\n    float zz = quaZ * z;\n\n    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n	\n}\n\nvec3 rotationByQuaternions(in vec3 v,in vec4 q) \n{\n	return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\n \n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\nfloat getCurValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\n{\n	float curValue;\n	for(int i=1;i<4;i++)\n	{\n		vec2 gradientNumber=gradientNumbers[i];\n		float key=gradientNumber.x;\n		if(key>=normalizedAge)\n		{\n			vec2 lastGradientNumber=gradientNumbers[i-1];\n			float lastKey=lastGradientNumber.x;\n			float age=(normalizedAge-lastKey)/(key-lastKey);\n			curValue=mix(lastGradientNumber.y,gradientNumber.y,age);\n			break;\n		}\n	}\n	return curValue;\n}\n#endif\n\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\nfloat getTotalValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\n{\n	float totalValue=0.0;\n	for(int i=1;i<4;i++)\n	{\n		vec2 gradientNumber=gradientNumbers[i];\n		float key=gradientNumber.x;\n		vec2 lastGradientNumber=gradientNumbers[i-1];\n		float lastValue=lastGradientNumber.y;\n		\n		if(key>=normalizedAge){\n			float lastKey=lastGradientNumber.x;\n			float age=(normalizedAge-lastKey)/(key-lastKey);"
			// +"\n			totalValue+=(lastValue+mix(lastValue,gradientNumber.y,age))/2.0*a_ShapePositionStartLifeTime.w*(normalizedAge-lastKey);\n			break;\n		}\n		else{\n			totalValue+=(lastValue+gradientNumber.y)/2.0*a_ShapePositionStartLifeTime.w*(key-lastGradientNumber.x);\n		}\n	}\n	return totalValue;\n}\n#endif\n\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)\nvec4 getColorFromGradient(in vec2 gradientAlphas[4],in vec4 gradientColors[4],in float normalizedAge)\n{\n	vec4 overTimeColor;\n	for(int i=1;i<4;i++)\n	{\n		vec2 gradientAlpha=gradientAlphas[i];\n		float alphaKey=gradientAlpha.x;\n		if(alphaKey>=normalizedAge)\n		{\n			vec2 lastGradientAlpha=gradientAlphas[i-1];\n			float lastAlphaKey=lastGradientAlpha.x;\n			float age=(normalizedAge-lastAlphaKey)/(alphaKey-lastAlphaKey);\n			overTimeColor.a=mix(lastGradientAlpha.y,gradientAlpha.y,age);\n			break;\n		}\n	}\n	\n	for(int i=1;i<4;i++)\n	{\n		vec4 gradientColor=gradientColors[i];\n		float colorKey=gradientColor.x;\n		if(colorKey>=normalizedAge)\n		{\n			vec4 lastGradientColor=gradientColors[i-1];\n			float lastColorKey=lastGradientColor.x;\n			float age=(normalizedAge-lastColorKey)/(colorKey-lastColorKey);\n			overTimeColor.rgb=mix(gradientColors[i-1].yzw,gradientColor.yzw,age);\n			break;\n		}\n	}\n	return overTimeColor;\n}\n#endif\n\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\nfloat getFrameFromGradient(in vec2 gradientFrames[4],in float normalizedAge)\n{\n	float overTimeFrame;\n	for(int i=1;i<4;i++)\n	{\n		vec2 gradientFrame=gradientFrames[i];\n		float key=gradientFrame.x;\n		if(key>=normalizedAge)\n		{\n			vec2 lastGradientFrame=gradientFrames[i-1];\n			float lastKey=lastGradientFrame.x;\n			float age=(normalizedAge-lastKey)/(key-lastKey);\n			overTimeFrame=mix(lastGradientFrame.y,gradientFrame.y,age);\n			break;\n		}\n	}\n	return floor(overTimeFrame);\n}\n#endif\n\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\nvec3 computeParticleLifeVelocity(in float normalizedAge)\n{\n  vec3 outLifeVelocity;\n  #ifdef VELOCITYOVERLIFETIMECONSTANT\n	 outLifeVelocity=u_VOLVelocityConst; \n  #endif\n  #ifdef VELOCITYOVERLIFETIMECURVE\n     outLifeVelocity= vec3(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\n  #endif\n  #ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\n	 outLifeVelocity=mix(u_VOLVelocityConst,u_VOLVelocityConstMax,vec3(a_Random1.y,a_Random1.z,a_Random1.w)); \n  #endif\n  #ifdef VELOCITYOVERLIFETIMERANDOMCURVE\n     outLifeVelocity=vec3(mix(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y),\n	                 mix(getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z),\n					 mix(getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\n  #endif\n					\n  return outLifeVelocity;\n} \n#endif\n\nvec3 computeParticlePosition(in vec3 startVelocity, in vec3 lifeVelocity,in float age,in float normalizedAge,vec3 gravityVelocity,vec4 worldRotation)\n{\n   vec3 startPosition;\n   vec3 lifePosition;\n   #if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n	#ifdef VELOCITYOVERLIFETIMECONSTANT\n		  startPosition=startVelocity*age;\n		  lifePosition=lifeVelocity*age;\n	#endif\n	#ifdef VELOCITYOVERLIFETIMECURVE\n		  startPosition=startVelocity*age;\n		  lifePosition=vec3(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\n	#endif\n	#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\n		  startPosition=startVelocity*age;\n		  lifePosition=lifeVelocity*age;\n	#endif\n	#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\n		  startPosition=startVelocity*age;\n		  lifePosition=vec3(mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y)\n	      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z)\n	      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\n	#endif\n	\n	vec3 finalPosition;\n	if(u_VOLSpaceType==0){\n	  if(u_ScalingMode!=2)\n	   finalPosition =rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition),worldRotation);\n	  else\n	   finalPosition =rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition,worldRotation);\n	}\n	else{\n	  if(u_ScalingMode!=2)\n	    finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation)+lifePosition;\n	  else\n	    finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation)+lifePosition;\n	}\n  #else\n	 startPosition=startVelocity*age;\n	 vec3 finalPosition;\n	 if(u_ScalingMode!=2)\n	   finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation);\n	 else\n	   finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation);\n  #endif\n  \n  if(u_SimulationSpace==0)\n    finalPosition=finalPosition+a_SimulationWorldPostion;\n  else if(u_SimulationSpace==1) \n    finalPosition=finalPosition+u_WorldPosition;\n  \n  finalPosition+=0.5*gravityVelocity*age;\n \n  return  finalPosition;\n}\n\n\nvec4 computeParticleColor(in vec4 color,in float normalizedAge)\n{\n	#ifdef COLOROVERLIFETIME\n	  color*=getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge);\n	#endif\n	\n	#ifdef RANDOMCOLOROVERLIFETIME\n	  color*=mix(getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge),getColorFromGradient(u_MaxColorOverLifeGradientAlphas,u_MaxColorOverLifeGradientColors,normalizedAge),a_Random0.y);\n	#endif\n\n    return color;\n}\n\nvec2 computeParticleSizeBillbard(in vec2 size,in float normalizedAge)\n{\n	#ifdef SIZEOVERLIFETIMECURVE\n		size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\n	#endif\n	#ifdef SIZEOVERLIFETIMERANDOMCURVES\n	    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \n	#endif\n	#ifdef SIZEOVERLIFETIMECURVESEPERATE\n		size*=vec2(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge));\n	#endif\n	#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\n	    size*=vec2(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\n	    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z));\n	#endif\n	return size;\n}\n\n#ifdef RENDERMODE_MESH\nvec3 computeParticleSizeMesh(in vec3 size,in float normalizedAge)\n{\n	#ifdef SIZEOVERLIFETIMECURVE\n		size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\n	#endif\n	#ifdef SIZEOVERLIFETIMERANDOMCURVES\n	    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \n	#endif\n	#ifdef SIZEOVERLIFETIMECURVESEPERATE\n		size*=vec3(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge));\n	#endif\n	#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\n	    size*=vec3(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\n	    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z)\n		,mix(getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxZ,normalizedAge),a_Random0.z));\n	#endif\n	return size;\n}\n#endif\n\nfloat computeParticleRotationFloat(in float rotation,in float age,in float normalizedAge)\n{ \n	#ifdef ROTATIONOVERLIFETIME\n		#ifdef ROTATIONOVERLIFETIMECONSTANT\n			float ageRot=u_ROLAngularVelocityConst*age;\n	        rotation+=ageRot;\n		#endif\n		#ifdef ROTATIONOVERLIFETIMECURVE\n			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\n		#endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n			float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\n	        rotation+=ageRot;\n	    #endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\n		#endif\n	#endif\n"+
			// "	#ifdef ROTATIONOVERLIFETIMESEPERATE\n		#ifdef ROTATIONOVERLIFETIMECONSTANT\n			float ageRot=u_ROLAngularVelocityConstSeprarate.z*age;\n	        rotation+=ageRot;\n		#endif\n		#ifdef ROTATIONOVERLIFETIMECURVE\n			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge);\n		#endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n			float ageRot=mix(u_ROLAngularVelocityConstSeprarate.z,u_ROLAngularVelocityConstMaxSeprarate.z,a_Random0.w)*age;\n	        rotation+=ageRot;\n	    #endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\n		#endif\n	#endif\n	return rotation;\n}\n\n\n#if defined(RENDERMODE_MESH)&&(defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE))\nvec3 computeParticleRotationVec3(in vec3 rotation,in float age,in float normalizedAge)\n{ \n	#ifdef ROTATIONOVERLIFETIME\n	#ifdef ROTATIONOVERLIFETIMECONSTANT\n			float ageRot=u_ROLAngularVelocityConst*age;\n	        rotation+=ageRot;\n		#endif\n		#ifdef ROTATIONOVERLIFETIMECURVE\n			rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\n		#endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n			float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\n	        rotation+=ageRot;\n	    #endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n			rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\n		#endif\n	#endif\n	#ifdef ROTATIONOVERLIFETIMESEPERATE\n	#ifdef ROTATIONOVERLIFETIMECONSTANT\n			vec3 ageRot=u_ROLAngularVelocityConstSeprarate*age;\n	        rotation+=ageRot;\n		#endif\n		#ifdef ROTATIONOVERLIFETIMECURVE\n			rotation+=vec3(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge));\n		#endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n			vec3 ageRot=mix(u_ROLAngularVelocityConstSeprarate,u_ROLAngularVelocityConstMaxSeprarate,a_Random0.w)*age;\n	        rotation+=ageRot;\n	    #endif\n		#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n			rotation+=vec3(mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxX,normalizedAge),a_Random0.w)\n	        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxY,normalizedAge),a_Random0.w)\n	        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\n		#endif\n	#endif\n	return rotation;\n}\n#endif\n\nvec2 computeParticleUV(in vec2 uv,in float normalizedAge)\n{ \n	#ifdef TEXTURESHEETANIMATIONCURVE\n		float cycleNormalizedAge=normalizedAge*u_TSACycles;\n		float frame=getFrameFromGradient(u_TSAGradientUVs,cycleNormalizedAge-floor(cycleNormalizedAge));\n		float totalULength=frame*u_TSASubUVLength.x;\n		float floorTotalULength=floor(totalULength);\n	    uv.x+=totalULength-floorTotalULength;\n		uv.y+=floorTotalULength*u_TSASubUVLength.y;\n    #endif\n	#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\n		float cycleNormalizedAge=normalizedAge*u_TSACycles;\n		float uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);\n	    float frame=floor(mix(getFrameFromGradient(u_TSAGradientUVs,uvNormalizedAge),getFrameFromGradient(u_TSAMaxGradientUVs,uvNormalizedAge),a_Random1.x));\n		float totalULength=frame*u_TSASubUVLength.x;\n		float floorTotalULength=floor(totalULength);\n	    uv.x+=totalULength-floorTotalULength;\n		uv.y+=floorTotalULength*u_TSASubUVLength.y;\n    #endif\n	return uv;\n}\n\nvoid main()\n{\n	float age = u_CurrentTime - a_DirectionTime.w;\n	float normalizedAge = age/a_ShapePositionStartLifeTime.w;\n	vec3 lifeVelocity;\n	if(normalizedAge<1.0){ \n	vec3 startVelocity=a_DirectionTime.xyz*a_StartSpeed;\n	#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n		lifeVelocity= computeParticleLifeVelocity(normalizedAge);//计算粒子生命周期速度\n	#endif \n	vec3 gravityVelocity=u_Gravity*age;\n	\n	vec4 worldRotation;\n	if(u_SimulationSpace==0)\n		worldRotation=a_SimulationWorldRotation;\n	else\n		worldRotation=u_WorldRotation;\n	\n	vec3 center=computeParticlePosition(startVelocity, lifeVelocity, age, normalizedAge,gravityVelocity,worldRotation);//计算粒子位置\n   \n   \n   #ifdef SPHERHBILLBOARD\n		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n        vec3 cameraUpVector =normalize(u_CameraUp);//TODO:是否外面归一化\n        vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\n        vec3 upVector = normalize(cross(sideVector,u_CameraDirection));\n	    corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n		#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\n			if(u_ThreeDStartRotation){\n				vec3 rotation=vec3(a_StartRotation0.xy,computeParticleRotationFloat(a_StartRotation0.z,age,normalizedAge));\n				center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,rotation);\n			}\n			else{\n				float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n				float c = cos(rot);\n				float s = sin(rot);\n				mat2 rotation= mat2(c, -s, s, c);\n				corner=rotation*corner;\n				center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n			}\n		#else\n			if(u_ThreeDStartRotation){\n				center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,a_StartRotation0);\n			}\n			else{\n				float c = cos(a_StartRotation0.x);\n				float s = sin(a_StartRotation0.x);\n				mat2 rotation= mat2(c, -s, s, c);\n				corner=rotation*corner;\n				center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n			}\n		#endif\n   #endif\n   \n   #ifdef STRETCHEDBILLBOARD\n	vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n	vec3 velocity;\n	#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n	    if(u_VOLSpaceType==0)\n		  velocity=rotationByQuaternions(u_SizeScale*(startVelocity+lifeVelocity),worldRotation)+gravityVelocity;\n	    else\n		  velocity=rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+lifeVelocity+gravityVelocity;\n    #else\n	    velocity= rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+gravityVelocity;\n    #endif	\n		vec3 cameraUpVector = normalize(velocity);\n		vec3 direction = normalize(center-u_CameraPosition);\n        vec3 sideVector = normalize(cross(direction,normalize(velocity)));\n		\n		sideVector=u_SizeScale.xzy*sideVector;\n		cameraUpVector=length(vec3(u_SizeScale.x,0.0,0.0))*cameraUpVector;\n		\n	    vec2 size=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n		\n	    const mat2 rotaionZHalfPI=mat2(0.0, -1.0, 1.0, 0.0);\n	    corner=rotaionZHalfPI*corner;\n	    corner.y=corner.y-abs(corner.y);\n		\n	    float speed=length(velocity);//TODO:\n	    center +=sign(u_SizeScale.x)*(sign(u_StretchedBillboardLengthScale)*size.x*corner.x*sideVector+(speed*u_StretchedBillboardSpeedScale+size.y*u_StretchedBillboardLengthScale)*corner.y*cameraUpVector);\n   #endif\n   \n   #ifdef HORIZONTALBILLBOARD\n		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n        const vec3 cameraUpVector=vec3(0.0,0.0,1.0);\n	    const vec3 sideVector = vec3(-1.0,0.0,0.0);\n		\n		float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n        float c = cos(rot);\n        float s = sin(rot);\n        mat2 rotation= mat2(c, -s, s, c);\n	    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\n		corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n        center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n   #endif\n   \n   #ifdef VERTICALBILLBOARD\n		vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n        const vec3 cameraUpVector =vec3(0.0,1.0,0.0);\n        vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\n		\n		float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n        float c = cos(rot);\n        float s = sin(rot);\n        mat2 rotation= mat2(c, -s, s, c);\n	    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\n		corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n        center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n   #endif\n   \n   "+
			// "#ifdef RENDERMODE_MESH\n	    vec3 size=computeParticleSizeMesh(a_StartSize,normalizedAge);\n		#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\n			if(u_ThreeDStartRotation){\n				vec3 rotation=vec3(a_StartRotation0.xy,-computeParticleRotationFloat(a_StartRotation0.z, age,normalizedAge));\n				center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,rotation),worldRotation);\n			}\n			else{\n				#ifdef ROTATIONOVERLIFETIME\n					float angle=computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n					if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\n						center+= (rotationByQuaternions(rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),angle),worldRotation));//已验证\n					}\n					else{\n						#ifdef SHAPE\n							center+= u_SizeScale.xzy*(rotationByQuaternions(rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),angle),worldRotation));\n						#else\n							if(u_SimulationSpace==0)\n								center+=rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle);//已验证\n							else if(u_SimulationSpace==1)\n								center+=rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle),worldRotation);//已验证\n						#endif\n					}\n				#endif\n				#ifdef ROTATIONOVERLIFETIMESEPERATE\n					//TODO:是否应合并if(u_ThreeDStartRotation)分支代码,待测试\n					vec3 angle=computeParticleRotationVec3(vec3(0.0,0.0,a_StartRotation0.z), age,normalizedAge);\n					center+= (rotationByQuaternions(rotationByEuler(u_SizeScale*a_MeshPosition*size,vec3(angle.x,angle.y,angle.z)),worldRotation));//已验证\n				#endif	\n			}\n		#else\n			if(u_ThreeDStartRotation){\n				center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,a_StartRotation0),worldRotation);//已验证\n			}\n			else{\n				if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\n					if(u_SimulationSpace==0)\n						center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x);\n					else if(u_SimulationSpace==1)\n						center+= (rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x),worldRotation));//已验证\n				}\n				else{\n					#ifdef SHAPE\n						if(u_SimulationSpace==0)\n							center+= u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x);\n						else if(u_SimulationSpace==1)\n							center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x),worldRotation);	\n					#else\n						if(u_SimulationSpace==0)\n							center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x);\n						else if(u_SimulationSpace==1)\n							center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x),worldRotation);//已验证\n					#endif\n				}\n			}\n		#endif\n		v_MeshColor=a_MeshColor;\n   #endif\n   \n"+
			// "highp vec4 vPos = u_Projection*u_View*vec4(center,1.0);\nfloat zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n  gl_Position=vPos;\n    v_Color = computeParticleColor(a_StartColor, normalizedAge);\n	#ifdef DIFFUSEMAP\n		#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\n			v_TextureCoordinate =computeParticleUV(a_CornerTextureCoordinate.zw, normalizedAge);\n		#endif\n		#ifdef RENDERMODE_MESH\n			v_TextureCoordinate =computeParticleUV(a_MeshTextureCoordinate, normalizedAge);\n		#endif\n		\n		#ifdef TILINGOFFSET\n			v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y)*u_TilingOffset.xy+vec2(u_TilingOffset.z,-u_TilingOffset.w);//需要特殊处理\n			"+
			// "v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y);//需要特殊处理\n		#endif\n	#endif\n    v_Discard=0.0;\n	  \n	#ifdef FOG\n		v_PositionWorld=center;\n	#endif\n   }\n   else\n	{\n		v_Discard=1.0;\n	}\n}\n\n";
			
			
			
			
			ps="#ifdef HIGHPRECISION\n  precision highp float;\n#else\n  precision mediump float;\n#endif\n\nvarying float v_Discard;\nvarying vec4 v_Color;\nvarying vec2 v_TextureCoordinate;\nuniform sampler2D u_texture;\nuniform vec4 u_Tintcolor;\n\n#ifdef RENDERMODE_MESH\n	varying vec4 v_MeshColor;\n#endif\n\n#ifdef FOG\n	varying vec3 v_PositionWorld;\n	uniform vec3 u_CameraPosition;\n	uniform float u_FogStart;\n	uniform float u_FogRange;\n	#ifdef ADDTIVEFOG\n	#else\n		uniform vec3 u_FogColor;\n	#endif\n#endif\n\n\nvoid main()\n{	\n	#ifdef RENDERMODE_MESH\n		gl_FragColor=v_MeshColor;\n	#else\n		gl_FragColor=vec4(1.0);	\n	#endif\n		\n	#ifdef DIFFUSEMAP\n		if(v_Discard!=0.0)\n			discard;\n		#ifdef TINTCOLOR\n			gl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*u_Tintcolor*2.0*v_Color;\n		#else\n			gl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*v_Color;\n		#endif\n	#else\n		#ifdef TINTCOLOR\n			gl_FragColor*=u_Tintcolor*2.0*v_Color;\n		#else\n			gl_FragColor*=v_Color;\n		#endif\n	#endif\n	\n	#ifdef FOG\n		vec3 toEye=u_CameraPosition-v_PositionWorld;\n		float toEyeLength=length(toEye);\n		toEye/=toEyeLength;\n		\n		float lerpFact=clamp((toEyeLength-u_FogStart)/u_FogRange,0.0,1.0);\n		#ifdef ADDTIVEFOG\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n		#else\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n		#endif\n	#endif\n}";
			let shaderCompile=ShaderCompile3D.add(PARTICLESHURIKEN,vs,ps,attributeMap,uniformMap);
			ShurikenParticleMaterialExp.SHADERDEFINE_DIFFUSEMAP=shaderCompile.registerMaterialDefine("DIFFUSEMAP");
			ShurikenParticleMaterialExp.SHADERDEFINE_TINTCOLOR=shaderCompile.registerMaterialDefine("TINTCOLOR");
			ShurikenParticleMaterialExp.SHADERDEFINE_ADDTIVEFOG=shaderCompile.registerMaterialDefine("ADDTIVEFOG");
			ShurikenParticleMaterialExp.SHADERDEFINE_TILINGOFFSET=shaderCompile.registerMaterialDefine("TILINGOFFSET");
		
			ShuriKenParticle3D.SHADERDEFINE_RENDERMODE_BILLBOARD=shaderCompile.registerSpriteDefine("SPHERHBILLBOARD");
			ShuriKenParticle3D.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD=shaderCompile.registerSpriteDefine("STRETCHEDBILLBOARD");
			ShuriKenParticle3D.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD=shaderCompile.registerSpriteDefine("HORIZONTALBILLBOARD");
			ShuriKenParticle3D.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD=shaderCompile.registerSpriteDefine("VERTICALBILLBOARD");
			ShuriKenParticle3D.SHADERDEFINE_COLOROVERLIFETIME=shaderCompile.registerSpriteDefine("COLOROVERLIFETIME");
			ShuriKenParticle3D.SHADERDEFINE_RANDOMCOLOROVERLIFETIME=shaderCompile.registerSpriteDefine("RANDOMCOLOROVERLIFETIME");
			ShuriKenParticle3D.SHADERDEFINE_VELOCITYOVERLIFETIMECONSTANT=shaderCompile.registerSpriteDefine("VELOCITYOVERLIFETIMECONSTANT");
			ShuriKenParticle3D.SHADERDEFINE_VELOCITYOVERLIFETIMECURVE=shaderCompile.registerSpriteDefine("VELOCITYOVERLIFETIMECURVE");
			ShuriKenParticle3D.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCONSTANT=shaderCompile.registerSpriteDefine("VELOCITYOVERLIFETIMERANDOMCONSTANT");
			ShuriKenParticle3D.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCURVE=shaderCompile.registerSpriteDefine("VELOCITYOVERLIFETIMERANDOMCURVE");
			ShuriKenParticle3D.SHADERDEFINE_TEXTURESHEETANIMATIONCURVE=shaderCompile.registerSpriteDefine("TEXTURESHEETANIMATIONCURVE");
			ShuriKenParticle3D.SHADERDEFINE_TEXTURESHEETANIMATIONRANDOMCURVE=shaderCompile.registerSpriteDefine("TEXTURESHEETANIMATIONRANDOMCURVE");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIME=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIME");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIMESEPERATE=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIMESEPERATE");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIMECONSTANT=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIMECONSTANT");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIMECURVE=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIMECURVE");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCONSTANTS=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIMERANDOMCONSTANTS");
			ShuriKenParticle3D.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCURVES=shaderCompile.registerSpriteDefine("ROTATIONOVERLIFETIMERANDOMCURVES");
			ShuriKenParticle3D.SHADERDEFINE_SIZEOVERLIFETIMECURVE=shaderCompile.registerSpriteDefine("SIZEOVERLIFETIMECURVE");
			ShuriKenParticle3D.SHADERDEFINE_SIZEOVERLIFETIMECURVESEPERATE=shaderCompile.registerSpriteDefine("SIZEOVERLIFETIMECURVESEPERATE");
			ShuriKenParticle3D.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVES=shaderCompile.registerSpriteDefine("SIZEOVERLIFETIMERANDOMCURVES");
			ShuriKenParticle3D.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVESSEPERATE=shaderCompile.registerSpriteDefine("SIZEOVERLIFETIMERANDOMCURVESSEPERATE");
			ShuriKenParticle3D.SHADERDEFINE_RENDERMODE_MESH=shaderCompile.registerSpriteDefine("RENDERMODE_MESH");
			ShuriKenParticle3D.SHADERDEFINE_SHAPE=shaderCompile.registerSpriteDefine("SHAPE");
			
        }
	}
}