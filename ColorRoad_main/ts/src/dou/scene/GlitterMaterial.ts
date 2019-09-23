module dou.scene{
	import RenderQueue = Laya.RenderQueue;
	import BaseTexture = Laya.BaseTexture;
	import VertexElementUsage = Laya.VertexElementUsage;
	import Shader3D = Laya.Shader3D;
	import Sprite3D = Laya.Sprite3D;
	
	/**
	 * ...
	 * @author ...
	 */
	export class GlitterMaterialNew extends Laya.BaseMaterial {
		/**渲染状态_不透明。*/
		public static RENDERMODE_OPAQUE:number = 1;
		/**渲染状态_不透明_双面。*/
		public static RENDERMODE_OPAQUEDOUBLEFACE:number = 2;
		///**渲染状态_透明测试。*/
		//public static const RENDERMODE_CUTOUT:number = 3;
		///**渲染状态_透明测试_双面。*/
		//public static const RENDERMODE_CUTOUTDOUBLEFACE:number = 4;
		/**渲染状态_透明混合。*/
		public static RENDERMODE_TRANSPARENT:number = 13;
		/**渲染状态_透明混合_双面。*/
		public static RENDERMODE_TRANSPARENTDOUBLEFACE:number = 14;
		/**渲染状态_加色法混合。*/
		public static RENDERMODE_ADDTIVE:number = 15;
		/**渲染状态_加色法混合_双面。*/
		public static  RENDERMODE_ADDTIVEDOUBLEFACE:number = 16;
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
		
		public static DIFFUSETEXTURE:number = 1;
		public static ALBEDO:number = 2;
		public static UNICOLOR:number = 3;
		public static BENDANGLE:number = 4;
		public static BENDDISTANCE:number = 5;
		
		
		
		/** 默认材质，禁止修改*/
		// public static defaultMaterial:GlitterMaterialNew = new GlitterMaterialNew();
		
		/**
		 * 加载闪光材质。
		 * @param url 闪光材质地址。
		 */
		public static load(url:string):GlitterMaterialNew {
			return Laya.loader.create(url, null, null, GlitterMaterialNew);
		}
		
		/**
		 * 设置渲染模式。
		 * @return 渲染模式。
		 */
		public set renderMode(value:number) {
			switch (value) {
			case GlitterMaterialNew.RENDERMODE_OPAQUE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_DISABLE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_OPAQUEDOUBLEFACE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_DISABLE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			//case RENDERMODE_CUTOUT: 
			//depthWrite = true;
			//cull = CULL_BACK;
			//blend = BLEND_DISABLE;
			//_renderQueue = RenderQueue.OPAQUE;
			////_addShaderDefine(ShaderDefines3D.ALPHATEST);
			//event(Event.RENDERQUEUE_CHANGED, this);
			//break;
			//case RENDERMODE_CUTOUTDOUBLEFACE: 
			//_renderQueue = RenderQueue.OPAQUE;
			//depthWrite = true;
			//cull = CULL_NONE;
			//blend = BLEND_DISABLE;
			////_addShaderDefine(ShaderDefines3D.ALPHATEST);
			//event(Event.RENDERQUEUE_CHANGED, this);
			//break;
			case GlitterMaterialNew.RENDERMODE_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);;
				break;
			case GlitterMaterialNew.RENDERMODE_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = true;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_DEPTHREAD_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_DEPTHREAD_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_NONDEPTH_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = GlitterMaterialNew.DEPTHTEST_LESS;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = GlitterMaterialNew.DEPTHTEST_LESS;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_NONDEPTH_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = GlitterMaterialNew.DEPTHTEST_LESS;
				this.cull = GlitterMaterialNew.CULL_BACK;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			case GlitterMaterialNew.RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthTest = GlitterMaterialNew.DEPTHTEST_LESS;
				this.cull = GlitterMaterialNew.CULL_NONE;
				this.blend = GlitterMaterialNew.BLEND_ENABLE_ALL;
				this.srcBlend = GlitterMaterialNew.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = GlitterMaterialNew.BLENDPARAM_ONE;
				//_removeShaderDefine(ShaderDefines3D.ALPHATEST);
				break;
			default: 
				throw new Error("Material:renderMode value error.");
			}
			
			this._conchMaterial && this._conchMaterial.setRenderMode(value);//NATIVE
		}
		
		/**
		 * 获取漫反射贴图。
		 * @return 漫反射贴图。
		 */
		public get diffuseTexture():BaseTexture {
			return this._getTexture(GlitterMaterialNew.DIFFUSETEXTURE);
		}
		
		/**
		 * 设置漫反射贴图。
		 * @param value 漫反射贴图。
		 */
		public set diffuseTexture(value:BaseTexture) {
			this._setTexture(GlitterMaterialNew.DIFFUSETEXTURE, value);
		}
		
		/**
		 * 获取颜色。
		 * @return 漫反射颜色。
		 */
		public get color():Vector4 {
			return this._getColor(GlitterMaterialNew.UNICOLOR);
		}
		
		/**
		 * 设置颜色。
		 * @param value 颜色。
		 */
		public set color(value:Vector4) {
			this._setColor(GlitterMaterialNew.UNICOLOR, value);
		}
		
		/**
		 * 获取反射率。
		 * @return 反射率。
		 */
		public get albedo():Vector4 {
			return this._getColor(GlitterMaterialNew.ALBEDO);
		}
		
		/**
		 * 设置反射率。
		 * @param value 反射率。
		 */
		public set albedo(value:Vector4) {
			this._setColor(GlitterMaterialNew.ALBEDO, value);
		}

		public getBendOffset(){
            return this._getColor(GlitterMaterialNew.BENDANGLE);
        };

        public setBendOffset(n){
            this._setColor(GlitterMaterialNew.BENDANGLE, n);
        };

        public setBendDistance(n){
            this._setNumber(GlitterMaterialNew.BENDDISTANCE, n);
        };
		
		/**
		 * @inheritDoc
		 */
		public setShaderName(name:string):void {
			super.setShaderName(name);
		}
		
		constructor() {
			super();
			this.initShader();
			this.setShaderName("GLITTER1");
			this.renderMode = GlitterMaterialNew.RENDERMODE_OPAQUE;
			this._setColor(GlitterMaterialNew.UNICOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
			this._setColor(GlitterMaterialNew.ALBEDO, new Vector4(1.0, 1.0, 1.0, 1.0));
			this.setBendDistance(50);
		}
		private static isInit:boolean = false;
		private initShader():void
		{
			if(GlitterMaterialNew.isInit)return;
				GlitterMaterialNew.isInit = true;
			let attributeMap = {
				'a_Position': VertexElementUsage.POSITION0, 
				'a_Texcoord0': VertexElementUsage.TEXTURECOORDINATE0, 
				'a_Time': VertexElementUsage.TIME0};
			let uniformMap = {
				'u_Texture': [GlitterMaterialNew.DIFFUSETEXTURE, Shader3D.PERIOD_MATERIAL], 
				'u_Albedo': [GlitterMaterialNew.ALBEDO, Shader3D.PERIOD_MATERIAL], 
				'u_Color': [GlitterMaterialNew.UNICOLOR, Shader3D.PERIOD_MATERIAL], 
				'u_CurrentTime': [Glitter.CURRENTTIME, Shader3D.PERIOD_SPRITE], 
				'_QOffset': [GlitterMaterialNew.BENDANGLE, Shader3D.PERIOD_MATERIAL], 
				'_Dist': [GlitterMaterialNew.BENDDISTANCE, Shader3D.PERIOD_MATERIAL],
				'u_Duration': [Glitter.DURATION, Shader3D.PERIOD_SPRITE], 
				'u_MvpMatrix': [Sprite3D.MVPMATRIX, Shader3D.PERIOD_SPRITE]};
				
			var GLITTER:number = Shader3D.nameKey.add("GLITTER1");
			let vs = `attribute vec4 a_Position;
			attribute vec2 a_Texcoord0;
			attribute float a_Time;

			uniform mat4 u_MvpMatrix;
			uniform  float u_CurrentTime;
			uniform  vec4 u_Color;
			uniform float u_Duration;

			varying vec2 v_Texcoord;
			varying vec4 v_Color;

			uniform vec4 _QOffset;
			uniform float _Dist;


			void main()
			{
				highp vec4 vPos = u_MvpMatrix * a_Position;
				float zOff = vPos.z / _Dist;
				vPos += _QOffset * zOff * zOff;
				gl_Position = vPos;

			float age = u_CurrentTime-a_Time;
			float normalizedAge = clamp(age / u_Duration,0.0,1.0);
			
			v_Texcoord=a_Texcoord0;
			
			v_Color=u_Color;
			v_Color.a*=1.0-normalizedAge;
			}
			`;
			let ps = `#ifdef HIGHPRECISION
				precision highp float;
			#else
				precision mediump float;
			#endif

			uniform vec4 u_Albedo;
			uniform sampler2D u_Texture;

			varying vec2 v_Texcoord;
			varying vec4 v_Color;


			void main()
			{	
			gl_FragColor=texture2D(u_Texture, v_Texcoord)*v_Color;
			gl_FragColor=gl_FragColor*u_Albedo;
			}
			`;
			let shaderCompile = Laya.ShaderCompile3D.add(GLITTER, vs, ps, attributeMap, uniformMap);
		}
	
	}


}