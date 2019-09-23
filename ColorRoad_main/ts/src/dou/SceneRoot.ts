/**
* 场景 
*/
module dou {
    import CameraMoveScript = dou.scene.CameraMoveScript;
    export class SceneRoot extends BaseScene {

        private _eventDispatcher: Laya.EventDispatcher;

        public get eventDispatcher(): Laya.EventDispatcher {
            if (!this._eventDispatcher) {
                this._eventDispatcher = new Laya.EventDispatcher();
            }
            return this._eventDispatcher;
        }

        public static GAME_TOTAL_NUM: number = 50;   //玩家总人数


        //状态机制
        public static STATUS_NONE: number = 0;//无
        public static STATUS_LOAD: number = 1;//加载状态
        public static STATUS_LOADED: number = 2;
        public static STATUS_START: number = 3;//开始
        public static STATUS_END: number = 4;//结束
        public static STATUS_RELIFE: number = 5;//复活
        public static STATUS_OVER: number = 6;//结束
        //当前状态
        private _curStatus: number = 0;
        //当前分数   //淘汰了多少人
        private _curSore: number = 0;
        //主玩家对象
        private _mainPlayer: PlayerMeshSprite3D;
        public get mainPlayer(): PlayerMeshSprite3D {
            return this._mainPlayer;
        }
        //摄像机
        public camera: Laya.Camera;
        private _cameraRoot: CameraMove;
        public get cameraRoot(): CameraMove {
            return this._cameraRoot;
        }
        //灯光
        public directionLight: Laya.DirectionLight;
        //加速线
        public speedEffect: Laya.ShuriKenParticle3D;
        //楼梯
        private _roadMgr: RoadMgr;
        public get roadMgr(): RoadMgr {
            if (!this._roadMgr)
                this._roadMgr = new RoadMgr(this, this._app);
            return this._roadMgr;
        }

        private playerOwner: Laya.MeshSprite3D;
        public isDebug: boolean = false;
        private dstAangles;
        private bendTimes = [1e4, 1e4, 7e3, 1e4, 11500, 1e4, 11500, 1e4];
        private curBendTime = 0;
        private dstIndex = 0;
        private changeTime = 2e3;
        private curBendAngle = new Laya.Vector4();
        private robots: Array<RobotMeshSprite3D> = new Array<RobotMeshSprite3D>();
        private _playClone: MeshSprite3D;
        private _backGround: MeshSprite3D;
        private _backGroundPos: Vector3 = new Vector3();
        private _jiasuDiffPlayer: Vector3 = new Vector3();
        private _backGroundDiffP: number;
        private _colorHelp: scene.Color;
        private _tempColor: Vector4 = new Vector4();
        private _tempColor1: Vector3 = new Vector3();
        private _colorBuilder: scene.Color;
        private _tempBuilder: Vector4 = new Vector4();

        private _isPlayJaSu: boolean = false;//播放加速线

        private _builderLayer: Laya.Sprite3D;
        private _obstacleLayer: Laya.Sprite3D;
        private _playerLayer: Laya.Sprite3D;
        private _mapLayer: Laya.Sprite3D;
        private _shadowLayer: Laya.Sprite3D;
        private _glitterLayer: Laya.Sprite3D;

        public get mapLayer(): Laya.Sprite3D { return this._mapLayer; }
        public get obstacleLayer(): Laya.Sprite3D { return this._obstacleLayer; }
        public get builderLayer(): Laya.Sprite3D { return this._builderLayer; }
        public get glitterLayer(): Laya.Sprite3D { return this._glitterLayer; }
        public get shadowLayer(): Laya.Sprite3D { return this._shadowLayer; }

        private _v: number = 300;
        constructor(value: GameApp) {
            super(value, Path.scene);
            this.mouseEnabled = true;

            let a = new Laya.Vector4(-this._v, 0, 0, 0);
            let b = new Laya.Vector4(this._v, 0, 0, 0);
            let c = new Laya.Vector4(0, this._v, 0, 0);
            let d = new Laya.Vector4(0, -0, 0, 0);
            let e = new Laya.Vector4(-this._v, this._v, 0, 0);
            let f = new Laya.Vector4(this._v, this._v, 0, 0);
            let g = new Laya.Vector4(-this._v, -0, 0, 0);
            let h = new Laya.Vector4(this._v, -0, 0, 0);
            this.dstAangles = [a, b, c, d, e, g, f, h];
            this._builderLayer = new Laya.Sprite3D();
            this._obstacleLayer = new Laya.Sprite3D();
            this._playerLayer = new Laya.Sprite3D();
            this._mapLayer = new Laya.Sprite3D();
            this._glitterLayer = new Laya.Sprite3D();
            this._shadowLayer = new Laya.Sprite3D();
            this._colorHelp = new scene.Color(0, 255, 2);//跑道
            this._colorBuilder = new scene.Color(64, 127, 0.5);//建筑
        }

        private mouse_X: number = 0;
        //鼠标事件
        public onMouseHandler(e?: LEvent) {
            if (WXTool._state == SceneRoot.STATUS_START || WXTool._state == SceneRoot.STATUS_RELIFE) {

                let isDown: boolean = e.type == LEvent.MOUSE_DOWN;
                if (isDown) {
                    this.mouse_X = Laya.stage.mouseX;
                    // if (this._roadMgr) this._roadMgr.isStart = true;

                }
                if (e.type == LEvent.MOUSE_MOVE && this.mouse_X != 0) {
                    let diff: number = Laya.stage.mouseX - this.mouse_X;
                    this.mouse_X = Laya.stage.mouseX;
                    this.mainPlayer.playerScript.playerMove(diff / this.width);
                    // this.width
                }
            }
        }

        //布局
        public resize(rw: number, rh: number): void {
            this.size(rw, rh);
            if (this._scene) {
                this._scene.size(rw, rh);
            }
        }



        //场景载入
        public enterScene(): void {
            //判断是否需要释放重新载
            if (WXTool._state > 0) return;
            WXTool._state = SceneRoot.STATUS_LOAD;
            this.dispose();
            super.enterScene();

        }

        public putBackEffectTuoWei(): void {
            this._mainPlayer && this._mainPlayer.playerScript && this._mainPlayer.playerScript.putBackEffectTuoWei();
        }

        public hide(): void {
            this.putBackEffectTuoWei();
            super.hide();
        }

        //初始场景
        protected initScene(): void {
            if (!this._scene || !this._scene.loaded) {
                return;
            }
            this.show();
            this._colorHelp.init(88, 186, 219);
            this._colorBuilder.init(86, 110.5, 118.75);
            this.scene.addChild(this._mapLayer);
            this.scene.addChild(this._builderLayer);
            this.scene.addChild(this._obstacleLayer);
            this.scene.addChild(this._playerLayer);
            this.scene.addChild(this._shadowLayer);
            this.scene.addChild(this._glitterLayer);


            this._scene.enableFog = true;
            // //设置雾化的颜色F8A130
            this._scene.fogColor = new Laya.Vector3(0.77, 0.82, 0.93);
            //设置雾化的起始位置，相对于相机的距离
            this._scene.fogStart = 1;
            //设置雾化最浓处的距离。
            this._scene.fogRange = 11;
            Config.isAntialias = true;
            if (!this.camera)
                this.camera = this._scene.getChildByName("Main Camera") as Laya.Camera;
            //添加天空盒
            // let skyBox:Laya.SkyBox = new Laya.SkyBox();
            //清除标记，使用天空（必须设置，否则无法显示天空）
            // this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            //为天空盒加载贴图文件
            // skyBox.textureCube = Laya.TextureCube.load(Path.scene_path + "Assets/race/particle/skybox.ltc");
            //绑定天空盒对象到摄像机
            // this.camera.sky = skyBox;

            // let material:Laya.StandardMaterial = Laya.StandardMaterial.load(Path.scene_path + "Assets/race/particle/skybox.lmat");
            // this.camera.addComponent(CameraMoveScript)
            this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;
            this.camera.clearColor = new Laya.Vector4(0.77, 0.82, 0.93);

            this._cameraRoot = this.camera.addComponent(CameraMove) as CameraMove;
            this._cameraRoot.init(this)
            if (!this.directionLight) {
                this.directionLight = this._scene.getChildByName("Directional Light") as Laya.DirectionLight;
                //灯光漫反射  其实就说可以给材质换肤
                // this.directionLight.diffuseColor = new Laya.Vector3(248/255,161/255,130/255);
            }
            this._backGround = this._scene.getChildByName("Plane") as Laya.MeshSprite3D;
            // this._backGround.meshRender.enable = false;
            let assert = this._scene.getChildByName("assert") as Laya.MeshSprite3D;
            if (assert) assert.active = false;
            //初始化特效
            let effect = this._scene.getChildByName("effect") as Laya.MeshSprite3D;
            effect.active = false;
            EffectMgr.addEffect("jiansu0", (effect.getChildByName("jiansu0") as Laya.ShuriKenParticle3D));
            EffectMgr.addEffect("jiansu1", (effect.getChildByName("jiansu1") as Laya.ShuriKenParticle3D));
            EffectMgr.addEffect("wudi", (effect.getChildByName("wudi") as Laya.ShuriKenParticle3D));
            EffectMgr.addEffect("wudi1", (effect.getChildByName("wudi1") as Laya.ShuriKenParticle3D));

            if (!this._mainPlayer) {
                let wanjia = this._scene.getChildByName("Player") as Laya.MeshSprite3D;
                this._playClone = wanjia.clone();
                //获取模版玩家
                this._mainPlayer = new PlayerMeshSprite3D();
                this._mainPlayer.init(this, wanjia);
                //添加缸体
                this._mainPlayer.rigidbodyEnable = true;
                //添加碰撞体
                this._mainPlayer.boxColliderEnable = true;
                this.cameraRoot.distancePlayer = wanjia.transform.position.z - this.camera.transform.position.z
            }
            this._mainPlayer.playerScript.init(this._app, true);
            if (this._backGround) {
                this._backGroundDiffP = this._backGround.transform.position.z - this._playClone.transform.position.z;
                this._backGround.transform.position.cloneTo(this._backGroundPos);
            }

            this.speedEffect = this._scene.getChildByName("jiasu") as Laya.ShuriKenParticle3D;

            Vector3.subtract(this.speedEffect.transform.position, this._playClone.transform.position, this._jiasuDiffPlayer);



            WXTool._state = SceneRoot.STATUS_LOADED;
            if (this._roadMgr) {
                this._tempColor.x = this._colorHelp.r / 255;
                this._tempColor.y = this._colorHelp.g / 255;
                this._tempColor.z = this._colorHelp.b / 255;
                this._tempBuilder.x = this._colorBuilder.r / 255;
                this._tempBuilder.y = this._colorBuilder.g / 255;
                this._tempBuilder.z = this._colorBuilder.b / 255;
                this.roadMgr.init(this._tempColor, this._tempBuilder);
            }
            // this._cameraRoot.init(this);
            // this.readyGo();
            // Laya.timer.once(2000, this, this.readyGo);
            for (var index = 0; index < 0; index++) {
                let robot: RobotMeshSprite3D = new RobotMeshSprite3D();
                let p: MeshSprite3D = this._playClone.clone();
                this.scene.addChild(p);
                robot.init(this, p);
                //添加缸体
                robot.rigidbodyEnable = true;
                //添加碰撞体
                robot.boxColliderEnable = true;
                robot.robotScript.init(this._app, false);
                this.robots.push(robot);
            }
        }

        public test() {
            this._colorHelp.init(88, 186, 219);
            this._colorBuilder.init(86, 110.5, 118.75);
            this._isPlayJaSu = false;
            this.speedEffect.particleSystem.looping = false;
            this.speedEffect.particleSystem.stop();
            this.mouse_X = 0;
            this._cameraRoot.reset();
            this.roadMgr.reset();
            this.mainPlayer.playerScript.reset();
            WXTool.reliveCount++;
            console.log("复活 WXTool._state", WXTool._state)
            if (this._roadMgr) {
                this._tempColor.x = this._colorHelp.r / 255;
                this._tempColor.y = this._colorHelp.g / 255;
                this._tempColor.z = this._colorHelp.b / 255;
                this._tempBuilder.x = this._colorBuilder.r / 255;
                this._tempBuilder.y = this._colorBuilder.g / 255;
                this._tempBuilder.z = this._colorBuilder.b / 255;
                this.roadMgr.init(this._tempColor, this._tempBuilder);
            }
            // this.readyGo();

            Laya.timer.once(100, this, this.readyGo);
            Laya.timer.once(3000, this, () => {
                this._app.sceneRoot.mainPlayer.playerScript.isWuDi = false;
            });
            this.resetRobotPos();

        }


        //开始走
        public readyGo(jiesuo: boolean = false): void {
            Laya.SoundManager.soundMuted = false;
            console.log("2WXTool._state", WXTool._state)
            if (WXTool._state == SceneRoot.STATUS_END) {
                WXTool._state = SceneRoot.STATUS_RELIFE
            } else {
                WXTool._state = SceneRoot.STATUS_START
            }
            //记录游戏次数
            let times: any = this._app.plyertDataMgr.getTimeGame();
            times = parseInt(times) + 1;
            this._app.plyertDataMgr.updateTimesGame(times);
            console.log("3WXTool._state", WXTool._state)
            this.PlayScore = WXTool.score ? WXTool.score : 0;
            // this.app.sceneObjectMgr.event(SceneObjectMgr.EVENT_UPDATE_SCORE);
            if (PlayerDataMgr.isPlayBgMusic) {
                var channel = Laya.SoundManager.playMusic('scene/music/bgm_low.mp3');
                console.log("播放背景音乐==", channel)
            }
            this.resetRobotPos();
            this._app.uiRoot.general.open(PageDef.YOUXI_PAGE);
        }

        public resetRobotPos(): void {
            for (var index = 0; index < this.robots.length; index++) {
                this.robots[index].robotScript.diff_z = this.mainPlayer.playerScript.diff_z + Math.floor(index / 2 + 1) * 3;
                this.robots[index].robotScript._desDiffX = this.robots[index].robotScript._moveDiffX = index % 2 == 0 ? 0.3 : -0.3;
            }
        }
        private changeColorTime: number = 0;
        //心跳
        public onUpdate(diff: number): void {
            if (WXTool._state >= SceneRoot.STATUS_LOADED) {

            }
            if (WXTool._state == SceneRoot.STATUS_START || WXTool._state == SceneRoot.STATUS_RELIFE) {
                this.changeColorTime -= diff;
                let page: dou.gui.page.YouXiPage = this._app.uiRoot.general.getPage(PageDef.YOUXI_PAGE) as dou.gui.page.YouXiPage;
                //根据combo数计算积分倍数
                // let beiNum = this.getBeiNum(page.curCombo);
                // this.PlayDis += 1 * beiNum;
                if (this.changeColorTime < 0) {
                    this._colorHelp.updateColor();
                    this._tempColor1.x = this._tempColor.x = this._colorHelp.r / 255;
                    this._tempColor1.y = this._tempColor.y = this._colorHelp.g / 255;
                    this._tempColor1.z = this._tempColor.z = this._colorHelp.b / 255;
                    this._colorBuilder.updateColor();
                    this._tempBuilder.x = this._colorBuilder.r / 255;
                    this._tempBuilder.y = this._colorBuilder.g / 255;
                    this._tempBuilder.z = this._colorBuilder.b / 255;
                    this.changeColorTime = 100;
                    // this.camera.clearColor = this._tempColor;
                    // this._scene.fogColor = this._tempColor1;
                }
                this.curBendTime += 24 / 24 * Laya.timer.delta;
                this.curBendTime >= this.changeTime && (this.dstIndex = this.RandBlendIndex(this.dstIndex), this.changeTime = this.bendTimes[this.dstIndex], this.curBendTime = 0);
                let a = this.curBendTime / this.changeTime, b = this.dstAangles[this.dstIndex];
                Laya.Vector4.lerp(this.curBendAngle, b, a / 20, this.curBendAngle);
                // c.cloneTo(this.curBendAngle);

                // 
                if (this._roadMgr) this.roadMgr.update(diff, this.curBendAngle, this._tempColor, this._tempBuilder);
                if (this._mainPlayer) this._mainPlayer.playerScript.Update(diff, this.curBendAngle);
                if (this._cameraRoot) this._cameraRoot.Update(diff);
                let robot: PlayerBaseScript;
                for (var index = 0; index < this.robots.length; index++) {
                    robot = this.robots[index].robotScript;
                    robot.Update(diff, this.curBendAngle);
                    if (robot.diff_z + 10 < this.mainPlayer.playerScript.diff_z) {
                        robot.randStartPos();
                    }
                    if (robot.diff_z < this.mainPlayer.playerScript.diff_z && !robot.isPass) {
                        robot.isPass = true;
                        this._curSore++;
                    }

                    if (robot.diff_z > this.mainPlayer.playerScript.diff_z && robot.isPass) {
                        robot.isPass = false;
                        this._curSore--;
                    }
                }
                if (this._backGround) {
                    this._backGroundPos.z = this.mainPlayer.playerScript.diff_z + this._backGroundDiffP;
                    this._backGround.transform.position = this._backGroundPos;
                }

                if (this.speedEffect) {
                    this.speedEffect.transform.position.z = this.mainPlayer.playerScript.diff_z + this._jiasuDiffPlayer.z;
                    this.speedEffect.transform.position = this.speedEffect.transform.position;
                    if (this.speedEffect && this.speedEffect.particleRender.material instanceof dou.scene.ShurikenParticleMaterialExp)
                        this.speedEffect.particleRender.material.setBendOffset(this.curBendAngle);
                    if (this.mainPlayer.playerScript.speed_Z > PlayerBaseScript.baseSpeed + PlayerBaseScript.baseSpeed / 2) {
                        if (!this._isPlayJaSu) {
                            this._isPlayJaSu = true;
                            this.speedEffect.particleSystem.looping = true;
                            this.speedEffect.particleSystem.play();
                        }
                    } else {
                        if (this._isPlayJaSu) {
                            this.speedEffect.particleSystem.looping = false;
                            this.speedEffect.particleSystem.stop();
                            this._isPlayJaSu = false;
                        }
                    }
                }

            }
        }

        //根据combo数计算积分倍数
        private getBeiNum(curCombo): number {
            let beiNum;
            switch (curCombo) {
                case 0:
                    beiNum = 1;
                    break
                case 1:
                    beiNum = 2;
                    break
                case 2:
                    beiNum = 3;
                    break
                case 3:
                    beiNum = 4;
                    break
                case 4:
                    beiNum = 5;
                    break
                default:
                    beiNum = 5;
                    break
            }
            return beiNum;
        }

        protected RandBlendIndex(a) {
            let b;
            do {
                b = Math.floor(Math.random() * this.dstAangles.length);
            } while (b == a);
            return b;
        }

        public PlayScore: number = 0;

        //游戏结束
        public gameEnd(): void {
            // 为什么会重复进呢？
            if (WXTool._state == SceneRoot.STATUS_OVER || WXTool._state == SceneRoot.STATUS_END)
                return;
            //使用结束
            this._app.plyertDataMgr.setIsUseLuckySkin(0);
            this._colorHelp.init(88, 186, 219);
            this._colorBuilder.init(86, 110.5, 118.75);
            console.log("1WXTool._state", WXTool._state)
            if (WXTool._state == SceneRoot.STATUS_START) {
                WXTool._state = SceneRoot.STATUS_END;
            } else if (WXTool._state == SceneRoot.STATUS_RELIFE) {
                WXTool._state = SceneRoot.STATUS_OVER;
            }
            if (WXTool.reliveCount >= 2) {
                WXTool._state = SceneRoot.STATUS_OVER;
            }
            console.log("WXTool._state", WXTool._state)
            // this.app.uiRoot.general.open(PageDef.RESTART_PAGE); this._app.sceneRoot.PlayDis.toFixed(0)
            let num: any = this._app.sceneRoot.PlayScore.toFixed(0);
            this._app.uploadGrade(Math.floor(num), 1);
            if (WXTool.reliveCount >= 4) {
                let page = this._app.uiRoot.general.getPage(PageDef.FUHUO_PAGE);
                if (page && page.isOpened)
                    page.close();
                this._app.uiRoot.general.open(PageDef.RESULT_RANK);
            } else {
                this._app.uiRoot.general.open(PageDef.RESTART_PAGE, (page: dou.gui.page.ResultRestart) => {
                    page.dataSource = {isShowGoToRelife:true}
                    page.getScore(this.getScore());
                })
                // var isShowGoToRelife = this._app.plyertDataMgr.getGameReviedRelifeTime() == 0 || this._app.plyertDataMgr.getGameReviedRelifeTime() <= Laya.timer.currTimer;
                // let data = { 
                //     score: this.getScore(), 
                //     time: 0, 
                //     totalNum: SceneRoot.GAME_TOTAL_NUM, 
                //     dis: this.mainPlayer.playerScript.diff_z ,
                //     isShowGoToRelife: isShowGoToRelife,
                //     closeFun: ()=>{
                //         if (isShowGoToRelife){
                //             Laya.timer.once(100, this, ()=>{
                //                 this._app.uiRoot.general.open(PageDef.RESTART_PAGE, (page: Page) => { 
                //                     data.isShowGoToRelife = false;
                //                     page.dataSource = data;
                //                 })
                //             })
                //         }
                //     }
                // } ;
                // // if(WXTool.isShare){
                //     this._app.uiRoot.general.open(PageDef.RESTART_PAGE, (page: Page) => { 
                //         page.dataSource = data;
                //     });
                // }
            }

            // this._app.uiRoot.general.close(PageDef.YOUXI_PAGE);
            Laya.SoundManager.stopMusic();
            if (PlayerDataMgr.isPlayActionMusic) {
                Laya.SoundManager.playSound('scene/music/gameover.mp3');
            }
            // Laya.timer.once(3000, this, this.reset);
            if (PlayerDataMgr.isZhenDong) {
                WXTool.vibrateLong();
            }
            //游戏界面关闭
            this._app.uiRoot.general.close(PageDef.YOUXI_PAGE);
        }

        //是否再游戏中
        public isGamePlay(): boolean {
            return WXTool._state == SceneRoot.STATUS_START || WXTool._state == SceneRoot.STATUS_RELIFE;
        }

        //当前成绩
        public getScore(): number {
            return this._curSore < 0 ? 0 : this._curSore;
        }

        private getAvatar(id): SkinData {
            let datas = SkinConfig.getInstance().datas;
            let data = null;
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].id == id) {
                    data = datas[i];
                    break;
                }
            }
            return data;
        }

        public obstacleSkin: string;

        public reset(): void {
            WXTool.is_relive = false;
            this._colorHelp.init(88, 186, 219);
            this._colorBuilder.init(86, 110.5, 118.75);
            let obstacleData: SkinData = this.getAvatar(this._app.plyertDataMgr.getUseObstacleSkinIndex());
            this.obstacleSkin = obstacleData && obstacleData.avatar ? obstacleData.avatar : 'heibai';

            // if(this._curStatus == SceneRoot.STATUS_END || this._curStatus == SceneRoot.STATUS_OVER)
            // {
            WXTool.score = 0;
            this._app.uiRoot.general.close(PageDef.YOUXI_PAGE);
            this._curSore = 0;
            WXTool.reliveCount = 0;
            WXTool._state = SceneRoot.STATUS_LOADED;
            this._isPlayJaSu = false;
            this.speedEffect.particleSystem.looping = false;
            this.speedEffect.particleSystem.stop();
            this.mouse_X = 0;
            this._cameraRoot.reset();
            this.roadMgr.reset();
            this.mainPlayer.playerScript.reset();
            this._isShareLibao = false;
            if (this._roadMgr) {
                console.log("死亡重置")
                this._tempColor.x = this._colorHelp.r / 255;
                this._tempColor.y = this._colorHelp.g / 255;
                this._tempColor.z = this._colorHelp.b / 255;
                this._tempBuilder.x = this._colorBuilder.r / 255;
                this._tempBuilder.y = this._colorBuilder.g / 255;
                this._tempBuilder.z = this._colorBuilder.b / 255;
                this.roadMgr.init(this._tempColor, this._tempBuilder);
            }
            // this.readyGo();
            Laya.timer.once(100, this, this.readyGo);
            this.resetRobotPos();
            // }
        }


        public resetScene(): void {
            this._colorHelp.init(88, 186, 219);
            this._colorBuilder.init(86, 110.5, 118.75);
            WXTool.is_relive = false;
            if (WXTool._state == SceneRoot.STATUS_END) {
                this._app.uiRoot.general.close(PageDef.YOUXI_PAGE);
                this._curSore = 0;
                this._isPlayJaSu = false;
                this.speedEffect.particleSystem.looping = false;
                this.speedEffect.particleSystem.stop();
                this.mouse_X = 0;
                this._cameraRoot.reset();
                this.roadMgr.reset();
                this.mainPlayer.playerScript.reset();
                if (this._roadMgr) {
                    this._tempColor.x = this._colorHelp.r / 255;
                    this._tempColor.y = this._colorHelp.g / 255;
                    this._tempColor.z = this._colorHelp.b / 255;
                    this._tempBuilder.x = this._colorBuilder.r / 255;
                    this._tempBuilder.y = this._colorBuilder.g / 255;
                    this._tempBuilder.z = this._colorBuilder.b / 255;
                    this.roadMgr.init(this._tempColor, this._tempBuilder);
                }
                WXTool.reliveCount = 0;
                // this.readyGo();
                // this.resetRobotPos();
            }
        }

        //是否分享过复活礼包
        private _isShareLibao: boolean = false;
        get isShareLibao() {
            return this._isShareLibao;
        }
        set isShareLibao(v: boolean) {
            this._isShareLibao = v;
        }

        //释放
        public dispose() {
            // this.gameEnd();

            if (this._cameraRoot) {
                this._cameraRoot.destory();
                this._cameraRoot = null;
            }

            if (this._mainPlayer) {
                this._mainPlayer.destroy();
                this._mainPlayer = null;
            }
            if (this.camera) {
                this.camera.destroy();
                this.camera = null;
            }
            if (this.directionLight) {
                this.directionLight.destroy();
                this.directionLight = null;
            }
            if (this.roadMgr) {
                this.roadMgr.clear();
            }
            if (this._scene) {
                this._scene.destroy(true);
                this._scene = null;
            }
            Laya.loader.clearRes(Path.scene, true);
            Laya.loader.clearUnLoaded();
            Laya.SoundManager.stopAllSound();
        }
    }
}
