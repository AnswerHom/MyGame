module dou.scene{
    import RenderQueue = Laya.RenderQueue;
	import BaseTexture = Laya.BaseTexture;
	import ShaderCompile3D = Laya.ShaderCompile3D;
	import ShaderDefines = Laya.ShaderDefines;
    import BaseMaterial = Laya.BaseMaterial;
    import Vector4 = Laya.Vector4;
    
    export class BlinnPhongMaterialExp extends Laya.BaseMaterial
    {

		static DIFFUSETEXTURE = 1;
        static MARGINALCOLOR = 2;
        static COLOR = 5;

        static SPECULAR = 6;

        static GLOSS = 7;

        static FOGCOLOR = 8;

        static DENSITY = 9;

        static GRADIENT = 10;

        static FOGSTART = 11;

        static FOGEND = 12;

        static SHADERDEFINE_ENABLELIGHT;

        static SHADERDEFINE_ENABLELAMBERT;

        static SHADERDEFINE_ENABLESPECULAR;

        static SHADERDEFINE_ENABLEFOG;

        static SHADERDEFINE_LINEARFOG;

        static SHADERDEFINE_EXFOG;

        static SHADERDEFINE_EXPFOG;

        static FOGTYPE_LINEAR = 1;

        static FOGTYPE_EX = 2;

        static FOGTYPE_EXP = 3;


        /**高光强度数据源_漫反射贴图的Alpha通道。*/
		public static SPECULARSOURCE_DIFFUSEMAPALPHA:number;
		/**高光强度数据源_高光贴图的RGB通道。*/
		public static SPECULARSOURCE_SPECULARMAP:number;
		
		/**渲染状态_不透明。*/
		public static RENDERMODE_OPAQUE:number = 0;
		/**渲染状态_透明测试。*/
		public static RENDERMODE_CUTOUT:number = 1;
		/**渲染状态__透明混合。*/
		public static RENDERMODE_TRANSPARENT:number = 2;
		/**渲染状态__加色法混合。*/
		public static RENDERMODE_ADDTIVE:number = 3;
		
		public static SHADERDEFINE_DIFFUSEMAP:number;
		public static SHADERDEFINE_NORMALMAP:number;
		public static SHADERDEFINE_SPECULARMAP:number;
		public static SHADERDEFINE_REFLECTMAP:number;
		public static SHADERDEFINE_TILINGOFFSET:number;
		public static SHADERDEFINE_ADDTIVEFOG:number;
		public static SHADERDEFINE_GLOWINGEDGE:number;
		
		public static ALBEDOTEXTURE:number = 1;
		public static NORMALTEXTURE:number = 2;
		public static SPECULARTEXTURE:number = 3;
		public static EMISSIVETEXTURE:number = 4;
		public static REFLECTTEXTURE:number = 5;
		public static ALBEDOCOLOR:number = 6;
		public static MATERIALSPECULAR:number = 8;
		public static SHININESS:number = 9;
		public static MATERIALREFLECT:number = 10;
		public static TILINGOFFSET:number = 11;
		public static GLOWINGEDGECOLOR:number = 12;
		static BENDANGLE = 13;
        static BENDDISTANCE = 14;
		
		/** 默认材质，禁止修改*/
		// public static defaultMaterial:BlinnPhongMaterialExp = new BlinnPhongMaterialExp();
		/**@private */
		public static shaderDefines:ShaderDefines = new ShaderDefines(BaseMaterial.shaderDefines);
		
		/**
		 * @private
		 */
		public static __init__():void {
			this.SHADERDEFINE_DIFFUSEMAP = this.shaderDefines.registerDefine("DIFFUSEMAP");
			this.SHADERDEFINE_NORMALMAP = this.shaderDefines.registerDefine("NORMALMAP");
			this.SHADERDEFINE_SPECULARMAP = this.shaderDefines.registerDefine("SPECULARMAP");
			this.SHADERDEFINE_REFLECTMAP = this.shaderDefines.registerDefine("REFLECTMAP");
			this.SHADERDEFINE_TILINGOFFSET = this.shaderDefines.registerDefine("TILINGOFFSET");
			this.SHADERDEFINE_ADDTIVEFOG = this.shaderDefines.registerDefine("ADDTIVEFOG");
			this.SHADERDEFINE_GLOWINGEDGE = this.shaderDefines.registerDefine("GLOWINGEDGE");
		}
		
		/**
		 * 加载标准材质。
		 * @param url 标准材质地址。
		 */
		public static load(url:String):BlinnPhongMaterialExp {
			return Laya.loader.create(url, null, null, BlinnPhongMaterialExp);
		}
		
		/**@private */
		private _albedoColor:Laya.Vector4;
		/**@private */
		private _albedoIntensity:number;
		/**@private */
		private _enableLighting:Boolean;
		
		/**
		 * 设置渲染模式。
		 * @return 渲染模式。
		 */
		public set renderMode(value:number) {
			switch (value) {
			case BlinnPhongMaterialExp.RENDERMODE_OPAQUE: 
				this.renderQueue = RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = BlinnPhongMaterialExp.CULL_BACK;
				this.blend = BlinnPhongMaterialExp.BLEND_DISABLE;
				this.alphaTest = false;
				this.depthTest = BlinnPhongMaterialExp.DEPTHTEST_LESS;
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case BlinnPhongMaterialExp.RENDERMODE_CUTOUT: 
				this.depthWrite = true;
				this.cull = BlinnPhongMaterialExp.CULL_BACK;
				this.blend = BlinnPhongMaterialExp.BLEND_DISABLE;
				this.renderQueue = RenderQueue.OPAQUE;
				this.alphaTest = true;
				this.depthTest = BlinnPhongMaterialExp.DEPTHTEST_LESS;
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case BlinnPhongMaterialExp.RENDERMODE_TRANSPARENT: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = BlinnPhongMaterialExp.CULL_BACK;
				this.blend = BlinnPhongMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = BlinnPhongMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = BlinnPhongMaterialExp.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
				this.alphaTest = false;
				this.depthTest = BlinnPhongMaterialExp.DEPTHTEST_LESS;
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			case BlinnPhongMaterialExp.RENDERMODE_ADDTIVE: 
				this.renderQueue = RenderQueue.TRANSPARENT;
				this.depthWrite = false;
				this.cull = BlinnPhongMaterialExp.CULL_BACK;
				this.blend = BlinnPhongMaterialExp.BLEND_ENABLE_ALL;
				this.srcBlend = BlinnPhongMaterialExp.BLENDPARAM_SRC_ALPHA;
				this.dstBlend = BlinnPhongMaterialExp.BLENDPARAM_ONE;
				this.alphaTest = false;
				this.depthTest = BlinnPhongMaterialExp.DEPTHTEST_LESS;
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ADDTIVEFOG);
				break;
			default: 
				throw new Error("Material:renderMode value error.");
			}
			
			this._conchMaterial && this._conchMaterial.setRenderMode(value);//NATIVE
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @return 纹理平铺和偏移。
		 */
		public get tilingOffset():Laya.Vector4 {
			return this._getColor(BlinnPhongMaterialExp.TILINGOFFSET);
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @param value 纹理平铺和偏移。
		 */
		public set tilingOffset(value:Laya.Vector4) {
			if (value) {
				var valueE:Float32Array = value.elements;
				if (valueE[0] != 1 || valueE[1] != 1 || valueE[2] != 0 || valueE[3] != 0)
					this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_TILINGOFFSET);
				else
					this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_TILINGOFFSET);
			} else {
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_TILINGOFFSET);
			}
			this._setColor(BlinnPhongMaterialExp.TILINGOFFSET, value);
		}
		
		/**
		 * 获取漫反射颜色。
		 * @return 漫反射颜色。
		 */
		public get albedoColor():Vector4 {
			return this._albedoColor;
		}
		
		/**
		 * 设置漫反射颜色。
		 * @param value 漫反射颜色。
		 */
		public set albedoColor(value:Vector4) {
			var finalAlbedo:Vector4 = this._getColor(BlinnPhongMaterialExp.ALBEDOCOLOR);
			Vector4.scale(value, this._albedoIntensity, finalAlbedo);
			this._albedoColor = value;
		}
		
		/**
		 * 获取漫反射颜色。
		 * @return 漫反射颜色。
		 */
		public get albedoIntensity():number {
			return this._albedoIntensity;
		}
		
		/**
		 * 设置漫反射颜色。
		 * @param value 漫反射颜色。
		 */
		public set albedoIntensity(value:number) {
			if (this._albedoIntensity !== value) {
				var finalAlbedo:Vector4 = this._getColor(BlinnPhongMaterialExp.ALBEDOCOLOR);
				Vector4.scale(this._albedoColor, value, finalAlbedo);
				this._albedoIntensity = value;
			}
		}
		
		/**
		 * 获取高光颜色。
		 * @return 高光颜色。
		 */
		public get specularColor():Vector3 {
			return this._getColor(BlinnPhongMaterialExp.MATERIALSPECULAR);
		}
		
		/**
		 * 设置高光颜色。
		 * @param value 高光颜色。
		 */
		public set specularColor(value:Vector3) {
			this._setColor(BlinnPhongMaterialExp.MATERIALSPECULAR, value);
		}
		
		/**
		 * 获取高光强度,范围为0到1。
		 * @return 高光强度。
		 */
		public get shininess():number {
			return this._getNumber(BlinnPhongMaterialExp.SHININESS);
		}
		
		/**
		 * 设置高光强度,范围为0到1。
		 * @param value 高光强度。
		 */
		public set shininess(value:number) {
			value = Math.max(0.0, Math.min(1.0, value));
			this._setNumber(BlinnPhongMaterialExp.SHININESS, value);
		}
		
		/**
		 * 获取反射颜色。
		 * @return value 反射颜色。
		 */
		public get reflectColor():Vector3 {
			return this._getColor(BlinnPhongMaterialExp.MATERIALREFLECT);
		}
		
		/**
		 * 设置反射颜色。
		 * @param value 反射颜色。
		 */
		public set reflectColor(value:Vector3) {
			this._setColor(BlinnPhongMaterialExp.MATERIALREFLECT, value);
		}
		
		/**
		 * 获取漫反射贴图。
		 * @return 漫反射贴图。
		 */
		public get albedoTexture():BaseTexture {
			return this._getTexture(BlinnPhongMaterialExp.ALBEDOTEXTURE);
		}
		
		/**
		 * 设置漫反射贴图。
		 * @param value 漫反射贴图。
		 */
		public set albedoTexture(value:BaseTexture) {
			if (value)
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_DIFFUSEMAP);
			else
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_DIFFUSEMAP);
			this._setTexture(BlinnPhongMaterialExp.ALBEDOTEXTURE, value);
		}
		
		/**
		 * 获取法线贴图。
		 * @return 法线贴图。
		 */
		public get normalTexture():BaseTexture {
			return this._getTexture(BlinnPhongMaterialExp.NORMALTEXTURE);
		}
		
		/**
		 * 设置法线贴图。
		 * @param value 法线贴图。
		 */
		public set normalTexture(value:BaseTexture) {
			if (value)
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_NORMALMAP);
			else
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_NORMALMAP);
			this._setTexture(BlinnPhongMaterialExp.NORMALTEXTURE, value);
		}
		
		/**
		 * 获取高光贴图。
		 * @return 高光贴图。
		 */
		public get specularTexture():BaseTexture {
			return this._getTexture(BlinnPhongMaterialExp.SPECULARTEXTURE);
		}
		
		/**
		 * 设置高光贴图，高光强度则从该贴图RGB值中获取,如果该值为空则从漫反射贴图的Alpha通道获取。
		 * @param value  高光贴图。
		 */
		public set specularTexture(value:BaseTexture) {
			if (value)
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_SPECULARMAP);
			else
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_SPECULARMAP);
			
			this._setTexture(BlinnPhongMaterialExp.SPECULARTEXTURE, value);
		}
		
		/**
		 * 获取反射贴图。
		 * @return 反射贴图。
		 */
		public get reflectTexture():BaseTexture {
			return this._getTexture(BlinnPhongMaterialExp.REFLECTTEXTURE);
		}
		
		/**
		 * 设置反射贴图。
		 * @param value 反射贴图。
		 */
		public set reflectTexture(value:BaseTexture) {
			if (value)
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_REFLECTMAP);
			else
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_REFLECTMAP);
			this._setTexture(BlinnPhongMaterialExp.REFLECTTEXTURE, value);
		}
		
		/**
		 * 获取是否启用光照。
		 * @return 是否启用光照。
		 */
		public get enableLighting():Boolean {
			return this._enableLighting;
		}
		
		/**
		 * 设置是否启用光照。
		 * @param value 是否启用光照。
		 */
		public set enableLighting(value:Boolean) {
			if (this._enableLighting !== value) {
				if (value)
					this._removeDisablePublicShaderDefine(ShaderCompile3D.SHADERDEFINE_POINTLIGHT | ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
				else
					this._addDisablePublicShaderDefine(ShaderCompile3D.SHADERDEFINE_POINTLIGHT | ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
				this._enableLighting = value;
			}
		}
		
		/**
		 * 设置是否开启边缘光照。
		 * @param value 是否开启边缘光照。
		 */
		public set enableGlowingEdge(value:Boolean) {
			if (value)
				this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_GLOWINGEDGE);
			else
				this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_GLOWINGEDGE);
		}
		
		
		/**
		 * 获取边缘颜色。
		 * @return value 边缘颜色。
		 */
		public get glowingEdgeColor():Vector4 {
			return this._getColor(BlinnPhongMaterialExp.GLOWINGEDGECOLOR);
		}
		
		/**
		 * 设置边缘颜色。
		 * @param value 边缘颜色。
		 */
		public set glowingEdgeColor(value:Vector4) {
			this._setColor(BlinnPhongMaterialExp.GLOWINGEDGECOLOR, value);
		}
		
		public constructor() {
			/*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
			super();
			this.initShader1();
			this.setShaderName("BLINNPHONGEXP");
            this.setBendDistance(50);
			this._albedoIntensity = 1.0;
			this._albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
			this._setColor(BlinnPhongMaterialExp.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
			this._setColor(BlinnPhongMaterialExp.MATERIALSPECULAR, new Vector3(1.0, 1.0, 1.0));
			this._setNumber(BlinnPhongMaterialExp.SHININESS, 0.078125);
			this._setColor(BlinnPhongMaterialExp.MATERIALREFLECT, new Vector3(1.0, 1.0, 1.0));
			this._setNumber(BlinnPhongMaterialExp.ALPHATESTVALUE, 0.5);
			this._setColor(BlinnPhongMaterialExp.TILINGOFFSET, new Vector4(1.0, 1.0, 0.0, 0.0));
			this._enableLighting = true;
			this.renderMode = BlinnPhongMaterialExp.RENDERMODE_OPAQUE;
			this._setColor(BlinnPhongMaterialExp.GLOWINGEDGECOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
		}
		
		/**
		 * 禁用灯光。
		 */
		public disableLight():void {
			this._addDisablePublicShaderDefine(ShaderCompile3D.SHADERDEFINE_POINTLIGHT | ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
		}
		
		/**
		 * 禁用雾化。
		 */
		public disableFog():void {
			this._addDisablePublicShaderDefine(ShaderCompile3D.SHADERDEFINE_FOG);
		}
		
		/**
		 * @inheritDoc
		 */
		public cloneTo(destObject:any):void {
			super.cloneTo(destObject);
			var destMaterial:BlinnPhongMaterialExp = destObject as BlinnPhongMaterialExp;
			destMaterial._enableLighting = this._enableLighting;
			destMaterial._albedoIntensity = this._albedoIntensity;
			this._albedoColor.cloneTo(destMaterial._albedoColor);
		}



        

        // constructor()
        // {
        //     super();
        //     this.initShader1();
        //     this.setShaderName("BLINNPHONGEXP");
            
        // }

        
        


     
      

        public getBendOffset(){
            return this._getColor(BlinnPhongMaterialExp.BENDANGLE);
        };

        public setBendOffset(n){
            this._setColor(BlinnPhongMaterialExp.BENDANGLE, n);
        };

        public setBendDistance(n){
            this._setNumber(BlinnPhongMaterialExp.BENDDISTANCE, n);
        };
		
        public setHasFog(n){
            n ? this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ENABLEFOG) : this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_ENABLEFOG);
        };

        public setFogType(n){
            switch (n) {
            case BlinnPhongMaterialExp.FOGTYPE_LINEAR:
                this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_LINEARFOG);
                this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXFOG);
                this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXPFOG);
                break;

            case BlinnPhongMaterialExp.FOGTYPE_EX:
                this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_LINEARFOG);
                this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXFOG);
                this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXPFOG);
                break;

            case BlinnPhongMaterialExp.FOGTYPE_EXP:
                this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_LINEARFOG), this._removeShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXFOG), 
                this._addShaderDefine(BlinnPhongMaterialExp.SHADERDEFINE_EXPFOG);
            }
        };

        public setFogColor(n){
            this._setColor(BlinnPhongMaterialExp.FOGCOLOR, n);
        };

        public setFogDensity(n){
            this._setNumber(BlinnPhongMaterialExp.DENSITY, n);
        };

        public setFogGradient(n){
            this._setNumber(BlinnPhongMaterialExp.GRADIENT, n);
        };

        public setFogStart(n){
            this._setNumber(BlinnPhongMaterialExp.FOGSTART, n);
        };

        public setFogEnd(n){
            this._setNumber(BlinnPhongMaterialExp.FOGEND, n);
        };

		private static isInit:boolean = false;
        public initShader1():void
        {
			if(BlinnPhongMaterialExp.isInit)return;
			BlinnPhongMaterialExp.isInit = true;
            let vs,ps;
            let attributeMap={
                'a_Position':/*laya.d3.graphics.VertexElementUsage.POSITION0*/0,
                'a_Color':/*laya.d3.graphics.VertexElementUsage.COLOR0*/1,
                'a_Normal':/*laya.d3.graphics.VertexElementUsage.NORMAL0*/3,
                'a_Texcoord0':/*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE0*/2,
                'a_Texcoord1':/*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE1*/15,
                'a_BoneWeights':/*laya.d3.graphics.VertexElementUsage.BLENDWEIGHT0*/7,
                'a_BoneIndices':/*laya.d3.graphics.VertexElementUsage.BLENDINDICES0*/6,
                'a_Tangent0':/*laya.d3.graphics.VertexElementUsage.TANGENT0*/5};
            let uniformMap={
                'u_Bones':[ /*laya.d3.core.SkinnedMeshSprite3D.BONES*/0,/*laya.d3.shader.Shader3D.PERIOD_RENDERELEMENT*/0],
                'u_DiffuseTexture':[ /*laya.d3.core.material.BlinnPhongMaterialExp.ALBEDOTEXTURE*/1,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_SpecularTexture':[ /*laya.d3.core.material.BlinnPhongMaterialExp.SPECULARTEXTURE*/3,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_NormalTexture':[ /*laya.d3.core.material.BlinnPhongMaterialExp.NORMALTEXTURE*/2,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_ReflectTexture':[ /*laya.d3.core.material.BlinnPhongMaterialExp.REFLECTTEXTURE*/5,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_AlphaTestValue':[ /*laya.d3.core.material.BaseMaterial.ALPHATESTVALUE*/0,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_DiffuseColor':[ /*laya.d3.core.material.BlinnPhongMaterialExp.ALBEDOCOLOR*/6,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_MaterialSpecular':[ /*laya.d3.core.material.BlinnPhongMaterialExp.MATERIALSPECULAR*/8,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_Shininess':[ /*laya.d3.core.material.BlinnPhongMaterialExp.SHININESS*/9,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_MaterialReflect':[ /*laya.d3.core.material.BlinnPhongMaterialExp.MATERIALREFLECT*/10,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_TilingOffset':[ /*laya.d3.core.material.BlinnPhongMaterialExp.TILINGOFFSET*/11,/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1],
                'u_WorldMat':[ /*laya.d3.core.Sprite3D.WORLDMATRIX*/0,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
                'u_MvpMatrix':[ /*laya.d3.core.Sprite3D.MVPMATRIX*/1,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
                'u_LightmapScaleOffset':[ /*laya.d3.core.RenderableSprite3D.LIGHTMAPSCALEOFFSET*/2,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
                'u_LightMap':[ /*laya.d3.core.RenderableSprite3D.LIGHTMAP*/3,/*laya.d3.shader.Shader3D.PERIOD_SPRITE*/2],
                'u_CameraPos':[ /*laya.d3.core.BaseCamera.CAMERAPOS*/0,/*laya.d3.shader.Shader3D.PERIOD_CAMERA*/3],
                'u_FogStart':[ /*laya.d3.core.scene.Scene.FOGSTART*/1,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_FogRange':[ /*laya.d3.core.scene.Scene.FOGRANGE*/2,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_FogColor':[ /*laya.d3.core.scene.Scene.FOGCOLOR*/0,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_DirectionLight.Color':[ /*laya.d3.core.scene.Scene.LIGHTDIRCOLOR*/4,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_DirectionLight.Direction':[ /*laya.d3.core.scene.Scene.LIGHTDIRECTION*/3,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_PointLight.Position':[ /*laya.d3.core.scene.Scene.POINTLIGHTPOS*/5,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_PointLight.Range':[ /*laya.d3.core.scene.Scene.POINTLIGHTRANGE*/6,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_PointLight.Color':[ /*laya.d3.core.scene.Scene.POINTLIGHTCOLOR*/8,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_SpotLight.Position':[ /*laya.d3.core.scene.Scene.SPOTLIGHTPOS*/9,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_SpotLight.Direction':[ /*laya.d3.core.scene.Scene.SPOTLIGHTDIRECTION*/10,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_SpotLight.Range':[ /*laya.d3.core.scene.Scene.SPOTLIGHTRANGE*/12,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_SpotLight.Spot':[ /*laya.d3.core.scene.Scene.SPOTLIGHTSPOT*/11,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_SpotLight.Color':[ /*laya.d3.core.scene.Scene.SPOTLIGHTCOLOR*/14,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_AmbientColor':[ /*laya.d3.core.scene.Scene.AMBIENTCOLOR*/21,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_shadowMap1':[ /*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE1*/18,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_shadowMap2':[ /*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE2*/19,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_shadowMap3':[ /*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE3*/20,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_shadowPSSMDistance':[ /*laya.d3.core.scene.Scene.SHADOWDISTANCE*/15,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_lightShadowVP':[ /*laya.d3.core.scene.Scene.SHADOWLIGHTVIEWPROJECT*/16,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                'u_shadowPCFoffset':[ /*laya.d3.core.scene.Scene.SHADOWMAPPCFOFFSET*/17,/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4],
                '_QOffset': [ BlinnPhongMaterialExp.BENDANGLE, Laya.Shader3D.PERIOD_MATERIAL ],
                '_Dist': [ BlinnPhongMaterialExp.BENDDISTANCE, Laya.Shader3D.PERIOD_MATERIAL ]};
            let BLINNPHONG=Laya.Shader3D.nameKey.add("BLINNPHONGEXP");
            vs="uniform vec4 _QOffset;\nuniform float _Dist;\nattribute vec4 a_Position;\nuniform mat4 u_MvpMatrix;\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))||(defined(LIGHTMAP)&&defined(UV))\n	attribute vec2 a_Texcoord0;\n	varying vec2 v_Texcoord0;\n#endif\n\n#if defined(LIGHTMAP)&&defined(UV1)\n	attribute vec2 a_Texcoord1;\n#endif\n\n#ifdef LIGHTMAP\n	uniform vec4 u_LightmapScaleOffset;\n	varying vec2 v_LightMapUV;\n#endif\n\n#ifdef COLOR\n	attribute vec4 a_Color;\n	varying vec4 v_Color;\n#endif\n\n#ifdef BONE\n	const int c_MaxBoneCount = 24;\n	attribute vec4 a_BoneIndices;\n	attribute vec4 a_BoneWeights;\n	uniform mat4 u_Bones[c_MaxBoneCount];\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	attribute vec3 a_Normal;\n	varying vec3 v_Normal; \n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	uniform vec3 u_CameraPos;\n	varying vec3 v_ViewDir; \n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP))&&defined(NORMALMAP)\n	attribute vec4 a_Tangent0;\n	varying vec3 v_Tangent;\n	varying vec3 v_Binormal;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n	uniform mat4 u_WorldMat;\n	varying vec3 v_PositionWorld;\n#endif\n\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n  #ifdef SHADOWMAP_PSSM1 \n  varying vec4 v_lightMVPPos;\n  uniform mat4 u_lightShadowVP[4];\n  #endif\n#endif\n\n#ifdef TILINGOFFSET\n	uniform vec4 u_TilingOffset;\n#endif\n\nvoid main_castShadow()\n{\n	#ifdef BONE\n		mat4 skinTransform=mat4(0.0);\n		skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n		skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n		skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n		skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n		vec4 position=skinTransform*a_Position;\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n	#else\n		highp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n	#endif\n	 \n	//TODO没考虑UV动画呢\n	#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n		v_Texcoord0=a_Texcoord0;\n	#endif\n		v_posViewZ = gl_Position.z;\n}\n\nvoid main_normal()\n{\n	#ifdef BONE\n		mat4 skinTransform=mat4(0.0);\n		skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n		skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n		skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n		skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n		vec4 position=skinTransform*a_Position;\n		\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n	#else\n		highp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		mat3 worldMat;\n		#ifdef BONE\n			worldMat=mat3(u_WorldMat*skinTransform);\n		#else\n			worldMat=mat3(u_WorldMat);\n		#endif  \n		v_Normal=worldMat*a_Normal;//TODO:法线可以用\"魔法\"矩阵\n		#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n			v_Tangent=worldMat*a_Tangent0.xyz;\n			v_Binormal=cross(v_Normal,v_Tangent)*a_Tangent0.w;\n		#endif\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n		#ifdef BONE\n			v_PositionWorld=(u_WorldMat*position).xyz;\n		#else\n			v_PositionWorld=(u_WorldMat*a_Position).xyz;\n		#endif\n	#endif\n	\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		v_ViewDir=u_CameraPos-v_PositionWorld;\n	#endif\n\n	#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n		v_Texcoord0=a_Texcoord0;\n		#ifdef TILINGOFFSET\n			v_Texcoord0=(vec2(v_Texcoord0.x,v_Texcoord0.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;\n			v_Texcoord0=vec2(v_Texcoord0.x,1.0+v_Texcoord0.y);\n		#endif\n	#endif\n\n	#ifdef LIGHTMAP\n		#ifdef SCALEOFFSETLIGHTINGMAPUV\n			#ifdef UV1\n				v_LightMapUV=vec2(a_Texcoord1.x*u_LightmapScaleOffset.x+u_LightmapScaleOffset.z,1.0+a_Texcoord1.y*u_LightmapScaleOffset.y+u_LightmapScaleOffset.w);\n			#else\n				v_LightMapUV=vec2(a_Texcoord0.x,a_Texcoord0.y-1.0)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n			#endif \n		#else\n			#ifdef UV1\n				v_LightMapUV=a_Texcoord1;\n			#else\n				v_LightMapUV=a_Texcoord0;\n			#endif \n		#endif \n	#endif\n\n	#ifdef COLOR\n		v_Color=a_Color;\n	#endif\n\n	#ifdef RECEIVESHADOW\n		v_posViewZ = gl_Position.w;\n		#ifdef SHADOWMAP_PSSM1 \n			v_lightMVPPos = u_lightShadowVP[0] * vec4(v_PositionWorld,1.0);\n		#endif\n	#endif\n}\n\nvoid main()\n{\n	#ifdef CASTSHADOW\n		main_castShadow();\n	#else\n		main_normal();\n	#endif\n}";
            ps="#ifdef HIGHPRECISION\n	precision highp float;\n#else\n	precision mediump float;\n#endif\n\n#include \"Lighting.glsl\";\n\nuniform vec4 u_DiffuseColor;\n\n#ifdef COLOR\n	varying vec4 v_Color;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	varying vec3 v_ViewDir; \n#endif\n\n#ifdef ALPHATEST\n	uniform float u_AlphaTestValue;\n#endif\n\n#ifdef DIFFUSEMAP\n	uniform sampler2D u_DiffuseTexture;\n#endif\n\n#ifdef REFLECTMAP\n	uniform samplerCube u_ReflectTexture;\n	uniform vec3 u_MaterialReflect;\n#endif\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n	varying vec2 v_Texcoord0;\n#endif\n\n#ifdef LIGHTMAP\n	varying vec2 v_LightMapUV;\n	uniform sampler2D u_LightMap;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n	uniform vec3 u_MaterialSpecular;\n	uniform float u_Shininess;\n	#ifdef SPECULARMAP \n		uniform sampler2D u_SpecularTexture;\n	#endif\n#endif\n\n#ifdef FOG\n	uniform float u_FogStart;\n	uniform float u_FogRange;\n	#ifdef ADDTIVEFOG\n	#else\n		uniform vec3 u_FogColor;\n	#endif\n#endif\n\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	varying vec3 v_Normal;\n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n	uniform sampler2D u_NormalTexture;\n	varying vec3 v_Tangent;\n	varying vec3 v_Binormal;\n#endif\n\n#ifdef DIRECTIONLIGHT\n	uniform DirectionLight u_DirectionLight;\n#endif\n\n#ifdef POINTLIGHT\n	uniform PointLight u_PointLight;\n#endif\n\n#ifdef SPOTLIGHT\n	uniform SpotLight u_SpotLight;\n#endif\n\nuniform vec3 u_AmbientColor;\n\n\n#if defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n	varying vec3 v_PositionWorld;\n#endif\n\n#include \"ShadowHelper.glsl\"\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n	#if defined(SHADOWMAP_PSSM2)||defined(SHADOWMAP_PSSM3)\n		uniform mat4 u_lightShadowVP[4];\n	#endif\n	#ifdef SHADOWMAP_PSSM1 \n		varying vec4 v_lightMVPPos;\n	#endif\n#endif\n\nvoid main_castShadow()\n{\n	//gl_FragColor=vec4(v_posViewZ,0.0,0.0,1.0);\n	gl_FragColor=packDepth(v_posViewZ);\n	#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n		float alpha = texture2D(u_DiffuseTexture,v_Texcoord0).w;\n		if( alpha < u_AlphaTestValue )\n		{\n			discard;\n		}\n	#endif\n}\nvoid main_normal()\n{\n	vec4 mainColor=u_DiffuseColor;\n	#ifdef DIFFUSEMAP\n		vec4 difTexColor=texture2D(u_DiffuseTexture, v_Texcoord0);\n		mainColor=mainColor*difTexColor;\n	#endif \n	#ifdef COLOR\n		mainColor=mainColor*v_Color;\n	#endif \n    \n	#ifdef ALPHATEST\n		if(mainColor.a<u_AlphaTestValue)\n			discard;\n	#endif\n  \n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		vec3 normal;\n		#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n			vec3 normalMapSample = texture2D(u_NormalTexture, v_Texcoord0).rgb;\n			normal = normalize(NormalSampleToWorldSpace(normalMapSample, v_Normal, v_Tangent,v_Binormal));\n		#else\n			normal = normalize(v_Normal);\n		#endif\n	#endif\n	\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		vec3 viewDir= normalize(v_ViewDir);\n		vec3 diffuse = vec3(0.0);\n		vec3 specular= vec3(0.0);\n		vec3 dif,spe;\n		#ifdef SPECULARMAP\n			vec3 gloss=texture2D(u_SpecularTexture, v_Texcoord0).rgb;\n		#else\n			#ifdef DIFFUSEMAP\n				vec3 gloss=vec3(difTexColor.a);\n			#else\n				vec3 gloss=vec3(1.0);\n			#endif\n		#endif\n	#endif\n\n	\n	#ifdef DIRECTIONLIGHT\n		LayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_DirectionLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n \n	#ifdef POINTLIGHT\n		LayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_PointLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n\n	#ifdef SPOTLIGHT\n		LayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_SpotLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n\n	\n	vec3 finalDiffuse;\n	#ifdef LIGHTMAP\n		finalDiffuse=texture2D(u_LightMap, v_LightMapUV).rgb*2.0;\n		//float exponent = texture2D(u_LightMap, v_LightMapUV).a;\n		//finalDiffuse = texture2D(u_LightMap, v_LightMapUV).rgb;\n		//float ratio = pow(2.0, exponent * 255.0 - (128.0 + 8.0));\n		//finalDiffuse = finalDiffuse * 255.0 * ratio;	\n		//finalDiffuse = sqrt(finalDiffuse);\n	#else\n		finalDiffuse=vec3(0.0);\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		finalDiffuse+=diffuse;\n	#endif\n\n	#ifdef RECEIVESHADOW\n		float shadowValue = 1.0;\n		#ifdef SHADOWMAP_PSSM3\n			shadowValue = getShadowPSSM3( u_shadowMap1,u_shadowMap2,u_shadowMap3,u_lightShadowVP,u_shadowPSSMDistance,u_shadowPCFoffset,v_PositionWorld,v_posViewZ,0.001);\n		#endif\n		#ifdef SHADOWMAP_PSSM2\n			shadowValue = getShadowPSSM2( u_shadowMap1,u_shadowMap2,u_lightShadowVP,u_shadowPSSMDistance,u_shadowPCFoffset,v_PositionWorld,v_posViewZ,0.001);\n		#endif \n		#ifdef SHADOWMAP_PSSM1\n			shadowValue = getShadowPSSM1( u_shadowMap1,v_lightMVPPos,u_shadowPSSMDistance,u_shadowPCFoffset,v_posViewZ,0.001);\n		#endif\n		gl_FragColor =vec4(mainColor.rgb*(u_AmbientColor + finalDiffuse)*shadowValue,mainColor.a);\n	#else\n		gl_FragColor =vec4(mainColor.rgb*(u_AmbientColor + finalDiffuse),mainColor.a);\n	#endif\n	\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		#ifdef RECEIVESHADOW\n			gl_FragColor.rgb+=specular*shadowValue;\n		#else\n			gl_FragColor.rgb+=specular;\n		#endif\n	#endif\n\n\n	#ifdef REFLECTMAP\n		vec3 incident = -viewDir;\n		vec3 reflectionVector = reflect(incident,normal);\n		vec3 reflectionColor  = textureCube(u_ReflectTexture,reflectionVector).rgb;\n		gl_FragColor.rgb += u_MaterialReflect*reflectionColor;\n	#endif\n	  \n	#ifdef FOG\n		float lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\n		#ifdef ADDTIVEFOG\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n		#else\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n		#endif\n	#endif\n}\n\nvoid main()\n{\n	#ifdef CASTSHADOW		\n		main_castShadow();\n	#else\n	  main_normal();\n	#endif  \n}\n\n";
            let shaderCompile= Laya.ShaderCompile3D.add(BLINNPHONG,vs,ps,attributeMap,uniformMap);
            BlinnPhongMaterialExp.SHADERDEFINE_DIFFUSEMAP=shaderCompile.registerMaterialDefine("DIFFUSEMAP");
            BlinnPhongMaterialExp.SHADERDEFINE_NORMALMAP=shaderCompile.registerMaterialDefine("NORMALMAP");
            BlinnPhongMaterialExp.SHADERDEFINE_SPECULARMAP=shaderCompile.registerMaterialDefine("SPECULARMAP");
            BlinnPhongMaterialExp.SHADERDEFINE_REFLECTMAP=shaderCompile.registerMaterialDefine("REFLECTMAP");
            BlinnPhongMaterialExp.SHADERDEFINE_TILINGOFFSET=shaderCompile.registerMaterialDefine("TILINGOFFSET");
            BlinnPhongMaterialExp.SHADERDEFINE_ADDTIVEFOG=shaderCompile.registerMaterialDefine("ADDTIVEFOG");
        }

        public initShader() {
            let n = {
                a_Position: Laya.VertexElementUsage.POSITION0,
                a_Normal: Laya.VertexElementUsage.NORMAL0,
                a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0
            };
            let r = {
                u_MvpMatrix: [ Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE ],
                u_WorldMat: [ Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE ],
                u_ViewMatrix: [ Laya.BaseCamera.VIEWMATRIX, Laya.Shader3D.PERIOD_CAMERA ],
                u_texture: [ BlinnPhongMaterialExp.DIFFUSETEXTURE, Laya.Shader3D.PERIOD_MATERIAL ],
                u_CameraPos: [ Laya.BaseCamera.CAMERAPOS, Laya.Shader3D.PERIOD_CAMERA ],
                _QOffset: [ BlinnPhongMaterialExp.BENDANGLE, Laya.Shader3D.PERIOD_MATERIAL ],
                _Dist: [ BlinnPhongMaterialExp.BENDDISTANCE, Laya.Shader3D.PERIOD_MATERIAL ],
                _Color: [ BlinnPhongMaterialExp.COLOR, Laya.Shader3D.PERIOD_MATERIAL ],
                _FogColor: [ BlinnPhongMaterialExp.FOGCOLOR, Laya.Shader3D.PERIOD_MATERIAL ],
                u_Density: [ BlinnPhongMaterialExp.DENSITY, Laya.Shader3D.PERIOD_MATERIAL ],
                u_Gradient: [ BlinnPhongMaterialExp.GRADIENT, Laya.Shader3D.PERIOD_MATERIAL ],
                u_FogStart: [ BlinnPhongMaterialExp.FOGSTART, Laya.Shader3D.PERIOD_MATERIAL ],
                u_FogEnd: [ BlinnPhongMaterialExp.FOGEND, Laya.Shader3D.PERIOD_MATERIAL ],
                _Gloss: [ BlinnPhongMaterialExp.GLOSS, Laya.Shader3D.PERIOD_MATERIAL ],
                u_DirectionLight_Direction: [ Laya.Scene.LIGHTDIRECTION, Laya.Shader3D.PERIOD_SCENE ],
                u_DirectionLight_Diffuse: [ Laya.Scene.LIGHTDIRCOLOR, Laya.Shader3D.PERIOD_SCENE ],
                u_DirectionLight_Ambient: [ Laya.Scene.AMBIENTCOLOR, Laya.Shader3D.PERIOD_SCENE ]
            };
            let k:number = Laya.Shader3D.nameKey.add("CustomShader");
            let shader:Laya.ShaderCompile3D = Laya.ShaderCompile3D.add(k, `attribute vec3 a_Normal;
attribute vec2 a_Texcoord;
attribute vec4 a_Position;
precision highp float;
uniform mat4 u_MvpMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_WorldMat;
uniform vec4 _QOffset;
uniform float _Dist;
uniform vec4 _Color;
uniform float _Gloss;
uniform vec4 _Specular;
uniform vec3 u_CameraPos;
uniform vec3 u_DirectionLight_Direction;
uniform vec3 u_DirectionLight_Diffuse;
uniform vec3 u_DirectionLight_Ambient;
varying vec4 v_Color;
varying vec2 v_Texcoord;
varying vec4 v_EyeSpacePos;
void main() {
	mat4 mvMatrix = u_ViewMatrix * u_WorldMat;
	highp vec4 vPos = u_MvpMatrix * a_Position;
	float zOff = vPos.z / _Dist;
	vPos += _QOffset * zOff * zOff;
	gl_Position = vPos;
	mat3 worldMat = mat3(u_WorldMat);
	v_EyeSpacePos = mvMatrix * a_Position;
	v_Texcoord = a_Texcoord;
	#ifdef CUSTOM_ENABLELIGHT
		vec3 worldNormal = worldMat * a_Normal;
		worldNormal = normalize(worldNormal);
		vec3 m_Position = vec3(u_WorldMat * a_Position);
		vec3 worldLightDir = normalize(u_DirectionLight_Direction - m_Position);
		vec3 ambient = u_DirectionLight_Ambient.xyz * _Color.rgb;
		 #ifdef CUSTOM_ENABLELAMBERT 
			float lambert = max(0.0, dot(worldNormal, worldLightDir));
		 #else
			float lambert = 0.5 * dot(worldNormal, worldLightDir) + 0.5;
		 #endif
		v_Color = vec4(lambert * u_DirectionLight_Diffuse.xyz * _Color.rgb + ambient, _Color.a);
		 #ifdef CUSTOM_ENABLESPECULAR
			vec3 viewDir = normalize(u_CameraPos - m_Position);
			vec3 halfDir = normalize(viewDir + worldLightDir);
			vec3 specular = u_DirectionLight_Diffuse.xyz * _Specular.rgb * pow(max(dot(worldNormal, halfDir), 0.0), _Gloss);
			v_Color += vec4(v_Color.rgb + specular, v_Color.a);
		 #endif
	 #else
		v_Color = _Color;
	 #endif
}
`, 
`precision highp float;
varying vec4 v_EyeSpacePos;
varying vec2 v_Texcoord;
varying vec4 v_Color;
uniform sampler2D u_texture;
uniform float u_Density;
uniform float u_Gradient;
uniform vec4 _FogColor;
uniform float u_FogStart;
uniform float u_FogEnd;
float ExFog(float distance) {
	float fogAlpha = exp(-abs(distance * u_Density));
	fogAlpha = 1.0 - clamp(fogAlpha, 0.0, 1.0);
	return fogAlpha;
}
float ExpFog(float distance) {
	float fogAlpha = exp(-pow(abs(distance * u_Density), u_Gradient));
	fogAlpha = 1.0 - clamp(fogAlpha, 0.0, 1.0);
	return fogAlpha;
}
float LinearFog(float distance) {
	float fogAlpha = (distance - u_FogStart) / (u_FogEnd - u_FogStart);
	fogAlpha = clamp(fogAlpha, 0.0, 1.0);
	return fogAlpha;
}
void main() {
	vec4 tex = texture2D(u_texture, v_Texcoord);
	vec4 color = v_Color * tex;
	#ifdef CUSTOM_ENABLEFOG 
		#ifdef CUSTOM_LINEARFOG
			float fogAlpha = LinearFog(abs(v_EyeSpacePos.z / v_EyeSpacePos.w));
		#endif 
		#ifdef CUSTOM_EXFOG
			float fogAlpha = ExFog(abs(v_EyeSpacePos.z / v_EyeSpacePos.w));
		#endif	
		#ifdef CUSTOM_EXPFOG 
			float fogAlpha = ExpFog(abs(v_EyeSpacePos.z / v_EyeSpacePos.w));
		#endif 
		gl_FragColor = mix(color, _FogColor, fogAlpha);
	#else
		gl_FragColor = color;
	#endif
}
`, n, r);
            BlinnPhongMaterialExp.SHADERDEFINE_ENABLELIGHT = shader.registerMaterialDefine("CUSTOM_ENABLELIGHT");
            BlinnPhongMaterialExp.SHADERDEFINE_ENABLELAMBERT = shader.registerMaterialDefine("CUSTOM_ENABLELAMBERT");
            BlinnPhongMaterialExp.SHADERDEFINE_ENABLESPECULAR = shader.registerMaterialDefine("CUSTOM_ENABLESPECULAR");
            BlinnPhongMaterialExp.SHADERDEFINE_ENABLEFOG = shader.registerMaterialDefine("CUSTOM_ENABLEFOG");
            BlinnPhongMaterialExp.SHADERDEFINE_LINEARFOG = shader.registerMaterialDefine("CUSTOM_LINEARFOG");
            BlinnPhongMaterialExp.SHADERDEFINE_EXFOG = shader.registerMaterialDefine("CUSTOM_EXFOG");
            BlinnPhongMaterialExp.SHADERDEFINE_EXPFOG = shader.registerMaterialDefine("CUSTOM_EXPFOG");
    }
    }
}