module dou.scene{
    export class BuilderMgr{
        static ball_radis:number = 0.08;
        private _scene:SceneRoot;
        private _app:GameApp;
        private _lenghtOfRoad:number = 0;
        private _obstacleList:Array<BaseBuilder> = new Array<BaseBuilder>();
        private _builderList:Array<BaseBuilder> = new Array<BaseBuilder>();
        private _createCount:number = 0;

        private _configIndex:number = 0;
        private _roadCount = 0;//已经创建的第几条路
        static LEVEL_OFFSET_Y = 1;
        static LEVEL_PET_MAP = 6;
        static PER_ROAD_LEN = 12.7;
        
        constructor(app:SceneRoot,GameApp:GameApp)
        {
            this._scene = app;
            this._app = GameApp;
            this.parseConfig();
        }
        private isFirst:boolean = true;
        private RoadId:number = 0;
        private Speed:number = 0;
        private BlockCf:Array<any> = [];
        private GetRoadCf():any
        {
            let reslut;
            if(this.isFirst)
            {
                reslut = SceneConfig.RoadInit;
            }
            else
            {
                reslut = SceneConfig.Roads[this.RoadId++];
                if(this.RoadId >= SceneConfig.Roads.length)
                {
                    this.RoadId = 0;
                }
            }
            return reslut;
        }
        
        public parseConfig():void
        {
            let config = this.GetRoadCf();
            this.isFirst = false;
            this.Speed = config.speed;
            this.BlockCf.length = 0;
            let block = config.block;
            for (let o = 0; o < block.length; o++) {
                let h = block[o];
                if ("randomS" == h[0]) {
                    o++;
                    let l = new Array()
                    for (; o < block.length && "randomE" != (h = block[o])[0]; ) 
                    {
                        l.push(h);
                        o++;
                    }
                    let len = l.length;
                    if (len > 0) 
                        for (let c = MathU.RandomArray(len), _ = 0; _ < len; _++) 
                            this.BlockCf.push(l[c[_]]);
                } 
                else if ("random" == h[0])
                {
                    let d = h[Math.round(Math.random() * (h.length - 2)) + 1];
                    for (let _ = 0; _ < d.length; _++)
                        this.BlockCf.push(d[_]); 
                }
                else this.BlockCf.push(h);
            }
        }
        private create(resName:string, typ:number, music:string, move:boolean):BaseBuilder
        {
            let builder:BaseBuilder;
            switch(resName)
            {
                case "Ball":
                    builder = music ? ObjectPools.malloc(MusicBall, [this._scene], [this._scene]) as MusicBall :
                                    ObjectPools.malloc(ColorBall, [this._scene], [this._scene]) as ColorBall;
                    builder.init("");
                    builder.allowMove = move;
                    if(builder as MusicBall)
                    {
                        (builder as MusicBall).musicIndex = music;
                    }
                break;
                case "Jump":
                    let con:any = this.getJumpUrl(typ);
                    builder = ObjectPools.malloc(XiePo, [this._scene], [this._scene]) as XiePo;
                    builder.init(con.mo, con.ma)
                    
                break;
                case "Diamond":
                    // builder = ObjectPools.malloc(Diamond, [this._scene], [this._scene]) as Diamond;
                    // builder.init(basePath + "Mesh/Diamond-Diamond_01_f.lm",basePath + "Material/diamond_01_m.lmat")
                break;

                case "multiple":
                    con = this.getMultipleBallUrl(typ);
                    builder = ObjectPools.malloc(MultipleBall, [this._scene], [this._scene]) as MultipleBall;
                    builder.init(con.mo, con.ma)
                    builder.allowMove = move;
                break;
                case "SlowNet":
                    builder = ObjectPools.malloc(SlowNet, [this._scene], [this._scene]) as SlowNet;
                    builder.init("");
                break;
                case "SuperBall":
                    builder = ObjectPools.malloc(SuperBall, [this._scene], [this._scene]) as SuperBall;
                    builder.init("");
                break;
                
                case "Cast_Arrow":
                    // builder = ObjectPools.malloc(Cast_Arrow, [this._scene], [this._scene]) as Cast_Arrow;
                    // builder.init(basePath + "Mesh/Arrow_01_m.lm",effectPath + "Materials/Net_m.lmat")
                    // builder = ObjectPools.malloc(Diamond, [this._scene], [this._scene]) as Diamond;
                    // builder.init(basePath + "Mesh/Diamond-Diamond_01_f.lm",effectPath + "Materials/Arrow_01_m.lmat")
                break;
            }
            if(builder)
                builder.color_type = typ;
            return builder;
        }

        public getMultipleBallUrl(typ:number):any
        {
            let modle:string = '';
            let material:string = '';
            switch(typ)
            {
                case 1:
                    modle = Path.scene_model + "play_tw-Sphere001.lm";
                    material = Path.scene_material + "red_tw.jpg";
                    break;
                case 2:
                    modle = Path.scene_model + "play_tw-Sphere001.lm";
                    material = Path.scene_material + "green_tw.jpg";
                    break;
                case 3:
                    modle = Path.scene_model + "play_tw-Sphere001.lm";
                    material = Path.scene_material + "blue_tw.jpg";
                    break;
            }
            return {mo:modle, ma:material};
        }

         public getJumpUrl(typ:number):any
        {
            let modle:string = '';
            let material:string = '';
            switch(typ)
            {
                case 1:
                    modle = Path.scene_model + "red-red.lm";
                    material = Path.scene_material + "tiaoyue.jpg";
                    break;
                case 2:
                    modle = Path.scene_model + "green-green.lm";
                    material = Path.scene_material + "tiaoyue.jpg";
                    break;
                case 3:
                    modle = Path.scene_model + "blue-blue.lm";
                    material = Path.scene_material + "tiaoyue.jpg";
                    break;
            }
            return {mo:modle, ma:material};
        }


        CreateOne(config:any, index:number, z:number, isUp:boolean = false) {
            // if (this.isMusicToDim && i.music) {
            //     var a = e[i.track];
            //     null == a && (a = Utils.DeepCopy(i), e[i.track] = a, a.type = "Diamond", a.top = null), 
            //     i = a;
            // }
            let resName = SceneConfig.BlockResMap[config.type];
            let builder = this.create(resName, config.cType, config.music, config.speed > 0);
            if(!builder)return;
            builder.setOffset(index * 0.25 - 0.25, BuilderMgr.getOffestY(z) + (isUp ? 0.3: 0.1),z);
            // o.IsMove = false;
            // o.ResName = resName;
            // o.BallInfo = config;
            // o.Index = index;
            this._obstacleList.push(builder);
            return builder;
        }
        
        _NewRowBlocks(config, z:number) {
            let i = new Array(), n = config[1], r = 0;
            n.length > 1 && (r = Math.floor(Math.random() * n.length));
            let a = n[r];
            Array.isArray(a) || (a = SceneConfig.BlockGroup[a]);
            let s = null;
            1 == config[2] && (s = MathU.RandomArray(a.length));
            for (let o = 0; o < a.length; o++) {
                let typeName = a[o], index = o;
                null != s && (index = s[o]);
                if ( 0 != typeName) {
                    let typeConfig = SceneConfig.BallTypeConfig[typeName];
                    null == typeConfig.track && (typeConfig.track = typeName);
                    let c = this.CreateOne(typeConfig, index, z);
                    let bestScore:number = 10;
                    if (null != typeConfig.top && (null == typeConfig.arrowScore || bestScore <= typeConfig.arrowScore)) {
                        let _ = SceneConfig.BallTypeConfig[typeConfig.top];
                        // let d = SceneConfig.BlockResMap[_.type];
                        let f = this.CreateOne(_, index, z, true);
                        c.topType = _;
                        // f.IsMove = !1;
                        // f.ResName = d;
                        // f.BallInfo = _;
                        // var p = BlockCallMap[_.type];
                        // null != p && p(f), 
                        // c.RootObj.addChild(f.RootObj);
                        // let m = f.RootObj.transform;
                        // Utils.SetTransformLocalPos(m, Laya.Vector3.Up);
                        //  c.TopObj = f;
                    }
                    i[i.length] = c;
                }
            }
            return i;
        }
        //当前已经读取到第几个配置了
        private _curBlockIndex:number = 0;
        //最后一次添加元素的位置
        private _lastAddPos:number = 0;
        private _level:number = 0;
        public updateBlock():void
        {
            //当前配置已经走完了
            if(this.BlockCf.length <= this._curBlockIndex)
            {
                this.parseConfig();
                this._curBlockIndex = 0;
            }

            let config:any = this.BlockCf[this._curBlockIndex];
            let diff:number = config[0]/18;
            // 距离镜头在100以内，就把元素添加到场景
            let level:number = BuilderMgr.getLevel(this._lastAddPos + diff);
            if(level != this._level)
            {
                this._lastAddPos += 8;
                this._level = level;
            }
            if(this._lastAddPos + diff < this._scene.camera.position.z + 20)
            {
                this._lastAddPos += diff;
                this._curBlockIndex++;
                this._NewRowBlocks(config, this._lastAddPos);
            }
        }

        


        public reset():void
        {
            this._lenghtOfRoad = 0;
            this.nextCreateBuilderZ1 = 0;
            this.nextCreateBuilderZ2 = 0;
            this._createCount = 0;
            this._configIndex = 0;
            this.obstacleLenght = -15;
            this.accelerateLenght = 0;
            this.isFirst = true;
            this._configIndex = 0;
            this._curBlockIndex = 0;
            this._lastAddPos = 0;
            this.BlockCf.length = 0;
            this.RoadId = 0;
            this._roadCount = 0;
            this._level = 0;
            this.clear();
        }
        
        public addRoad(color:Vector4):void
        {
            let road:Road = ObjectPools.malloc(Road, [this._scene], [this._scene]) as Road;
            let url = "race_01-对象001.lm";
            let levelY:number = Math.floor(this._roadCount/ BuilderMgr.LEVEL_PET_MAP) * BuilderMgr.LEVEL_OFFSET_Y;
            let levelZ:boolean = this._roadCount!= 0 && this._roadCount % BuilderMgr.LEVEL_PET_MAP == 0;
            road.setOffset(0, levelZ ? -levelY - 0.001: -levelY, levelZ ? this._lenghtOfRoad + 3.5:this._lenghtOfRoad);
            road.init(Path.scene_model + url, Path.scene_texture + "ground_011.jpg");
            road.setAlbedoColor(color);
            this._obstacleList.push(road);
            this._roadCount++;
            this._lenghtOfRoad += BuilderMgr.PER_ROAD_LEN;
        }
        static TEMP_LEVEL_PET_MAP = BuilderMgr.LEVEL_PET_MAP * BuilderMgr.PER_ROAD_LEN;
        public static getOffestY(offsetZ):number
        {
            offsetZ += 6.3                   
            return -Math.floor(offsetZ / BuilderMgr.TEMP_LEVEL_PET_MAP) * BuilderMgr.LEVEL_OFFSET_Y;
        }

        public static getLevel(offsetZ):number
        {
            offsetZ += 6.3                   
            return Math.floor(offsetZ /BuilderMgr.TEMP_LEVEL_PET_MAP);
        }
        
        private accelerateLenght:number = 0;
  
        
        private obstacleLenght:number = -15;
        //障碍
        public addObstacle():void
        {
            if(this.obstacleLenght - this._scene.camera.position.z < 10)
            {
                this.obstacleLenght += (4 + Math.floor(Math.random() * 3));
                // this._addObstacle(this.obstacleLenght);
            }
        }

        
        //以下为两边建筑的代码
        private nextCreateBuilderZ1:number = 0;
        private nextCreateBuilderZ2:number = 1;
        private addBuilder(offsetZ:number, color:Vector4, isRever:boolean = false):number
        {
            let diff:number = 0;
            let builder:Builder = ObjectPools.malloc(Builder, [this._scene], [this._scene]) as Builder;
            builder.isRever = isRever;
            builder.setOffset(-1.3 , 0, offsetZ);
            builder.init("", "");
            builder.setAlbedoColor(color);
            this.tweenTo(builder);
            this._builderList.push(builder);

            builder = ObjectPools.malloc(Builder, [this._scene], [this._scene]) as Builder;
            builder.isRever = isRever;
            builder.setOffset(1.3 , 0, offsetZ);
            builder.init("", "");
            builder.setAlbedoColor(color);
            this.tweenTo(builder);
            this._builderList.push(builder);

            diff += 2;
            return diff;
        }
        //建筑下降
        private tweenTo(builder:Builder):void{
            if(Math.random() > 0.1) return;
            let pos:Vector3 = builder.transform.position;
            Laya.Tween.to(pos, {y:pos.y - Math.random()*2, update:Handler.create(this, ()=>{
                builder.transform.position = pos;
            }, null, false)}, 300, null, null, 300);
        }

        public init(color:Vector4, cBuilder:Vector4):void
        {
            if(this._lenghtOfRoad - this._scene.camera.position.z < 30)
            {
                this.addRoad(color);
            }
        }

        public update(diff:number, c:Laya.Vector4, color:Vector4, cBuilder:Vector4):void
        {   
            // console.log("场景创建中！！！",diff,c,color,cBuilder);
            while(this.nextCreateBuilderZ1  < this._scene.camera.position.z + 15)
                this.nextCreateBuilderZ1 += this.addBuilder(this.nextCreateBuilderZ1, cBuilder);
            if(this._lenghtOfRoad - this._scene.camera.position.z < 30)
            {
                this.addRoad(color);
            }
            this.addObstacle();
            this.updateBlock();
            
            for(let i = 0; i < this._obstacleList.length; i++)
            {
                if(this._obstacleList[i].update(diff))
                {
                    ObjectPools.free(this._obstacleList[i]);
                    this._obstacleList.splice(i,1);
                    i--;
                }
                else
                {
                    this._obstacleList[i].updateBlendOffset(c);
                }
            }
            for(let i = 0; i < this._builderList.length; i++)
            {
                if(this._builderList[i].update(diff))
                {
                    ObjectPools.free(this._builderList[i]);
                    this._builderList.splice(i,1);
                    i--;
                }
                else
                {
                    this._builderList[i].updateBlendOffset(c);
                }
            }
        }

       

        private findOffsetX(objs:Array<BaseBuilder>, offsetX:number):number
        {
            if(Math.abs(offsetX) > 0.6)return 100;
            for(let i = 0; i < objs.length; i++)
            {
                let diff = objs[i].position.x - offsetX;
                // logd(offsetX, diff)
                if( Math.abs(diff) <= objs[i].obstacleWidth)
                {
                    return 100;
                    // return offsetX;
                }
            }
            return offsetX;
        }

        public clear():void
        {
            for(let i = 0; i < this._obstacleList.length; i++)
            {
                ObjectPools.free(this._obstacleList[i]);
                // this._obstacleList[i].destory();
            }
            this._obstacleList.length = 0;

            for(let i = 0; i < this._builderList.length; i++)
            {
                ObjectPools.free(this._builderList[i]);
                // this._builderList[i].destory();
            }
            this._builderList.length = 0;
            
        }
    }
}