/*
* name
*/
// 是否iphoneX
var onIPhoneX: boolean = false;
class GameApp {
    isNoLogin: boolean = false;
    mutedMusic: boolean = false;
    mutedSound: boolean = false;
    public SCENE_WIDTH: number = 720;
    public SCENE_HEIGHT: number = 1280;
    delayTime: number = 0;

    pageVisibility: string = '';
    //开放域层级
    private _openZone: Sprite;
    public get openZone(): Sprite {
        return this._openZone;
    }
    //开放域纹理
    private _openZoneTexture: Texture;
    //下次更新开放域
    private _nextUpdateOpenZoneTime: number = 0;



    private _clientX: number = 0;
    public get clientX(): number {
        return this._clientX;
    }
    private _clientY: number = 0;
    public get clientY(): number {
        return this._clientY;
    }


    //微信信息
    public wxUserInfo: any;
    private _wxCanvas: laya.resource.HTMLCanvas;
    // ui
    protected _uiRoot: UIRoot;
    get uiRoot(): UIRoot {
        return this._uiRoot;
    }

    //场景层级
    private _sceneRoot: SceneRoot;
    public get sceneRoot(): SceneRoot {
        return this._sceneRoot;
    }

    //展示层级
    private _showRoot: ShowRoot;
    public get showRoot(): ShowRoot {
        return this._showRoot;
    }


    private _blackBorder: BlackBorder;

    // 预加载
    protected _preLoad: PreLoad;
    get preLoad(): PreLoad {
        return this._preLoad;
    }

    private _date: Date;

    constructor() {
        let url = location.href;
        this._preLoad = new PreLoad();
        this.isNoLogin = true;


        //场景
        this._sceneRoot = new SceneRoot(this);
        Laya.stage.addChild(this._sceneRoot);
        this._showRoot = new ShowRoot(this);
        Laya.stage.addChild(this._showRoot);
        // 初始化ui
        this._uiRoot = new UIRoot(this);
        Laya.stage.addChild(this._uiRoot);
        // 黑色边框
        this._blackBorder = new BlackBorder(this);
        Laya.stage.addChild(this._blackBorder);

        //开放域
        this._openZone = new Sprite();
        this._openZone.size(this.SCENE_WIDTH, this.SCENE_HEIGHT);



        Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_OUT, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseHandler);
        this._date = new Date();
        MessageManager.on(WXTool.LOADOK, this, this.onGameInit);
        if (isDebug) {
            this.onGameInit();
        }
    }

    private onGameInit() {
        this._uiRoot.once(UIRoot.INIT, this, () => {
            this.mainPlayerData();
            // this._uiRoot.HUD.open(PageDef.PLAY_PAGE);
            this.sceneRoot.enterScene();
            this.showRoot.enterScene();
        });
    }

    private onMouseHandler(e: LEvent): void {
        if (this._sceneRoot) {
            this._sceneRoot.onMouseHandler(e);
        }
    }




    //Iphone X 安全区域距离顶部
    static IPHONEX_TOP: number = 44 / 812;
    //Iphone X 安全区域距离底部
    static IPHONEX_BOTTOM: number = 34 / 812;



    private openSortPage(shareTicket: string = null): void {
        this._uiRoot.openSortPage(shareTicket);
    }

    //主玩家数据下来
    private mainPlayerData(): void {
        this.mutedMusic = SoundManager.musicMuted = this.localStorageMgr.isMutedMusic;
        this.mutedSound = SoundManager.soundMuted = this.localStorageMgr.isMutedSound;
    }

    // 心跳更新
    public isOut: boolean = false;
    onUpdate(diff: number): void {
        // console.log("app主循环！！！");
        // if (this.isOut) {
        //     console.log("现在处于暂停状态！！！", this.isOut);
        //     return;
        // }
        this._uiRoot && this._uiRoot.update(diff);
        this.sceneRoot && this.sceneRoot.onUpdate(diff);
        this.showRoot && this.showRoot.onUpdate(diff);
    }


    /**
     * 根据时间戳获取本周一日期
     * @param value 时间戳毫秒1
     * @return 2018419
     */
    private getWeekOneDayByTime(value: number): number {
        if (!value) return 0;
        this._date.setTime(value);
        // //当日时间毫秒
        // let dayTime:number = this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        //获取当前星期几 0-6(星期天-星期六)
        let week: number = this._date.getDay();
        if (week == 0) week = 7;
        let time: number = value - (week - 1) * 86400000;
        if (time > 0) this._date.setTime(time);
        //获取当前年月日
        let year: number = this._date.getFullYear();
        let mounth: number = this._date.getMonth();
        let day: number = this._date.getDate();
        let str: string = year.toString() + mounth.toString() + day.toString();
        return parseInt(str);
    }

    // 浏览器可视画布像素高宽
    protected _clientWidth: number;
    protected _clientHeight: number;
    // 客户端画布缩放比
    protected _clientScale: number = 1;
    public get clientScale(): number {
        return this._clientScale;
    }
    public get clientWidth(): number {
        return this._clientWidth;
    }
    public get clientHeight(): number {
        return this._clientHeight;
    }

    set mouseLock(v: boolean) {
        this._uiRoot && (this._uiRoot.mouseLock = v);
    }

    // 游戏窗口尺寸发生变化
    onResize(width: number, height: number): void {
        let rw: number = Laya.stage.width;
        let rh: number = Laya.stage.height;
        console.log("手机型号ipx", onIPhoneX);
        let rx = 0, ry = 0;
        let clientScale: number = 1;
        //判断IPhoneX
        if (onIPhoneX) {
            rw = Browser.clientWidth;
            rh = Browser.clientHeight;
            let __width = rw;
            let __height = rh;
            rw = Math.min(__width, __height);
            rh = Math.max(__width, __height);

            let designWidth = rw * Browser.pixelRatio;
            let designHeight = rh * Browser.pixelRatio;

            let sw = this.SCENE_WIDTH;
            let sh = this.SCENE_HEIGHT;

            let wScale = designWidth / sw;
            let hScale = designHeight / sh;
            clientScale = Math.min(wScale, hScale);

            if (wScale > hScale) {
                rw = sh * (designWidth / designHeight);
                rh = sh;
            }
            else {
                rw = sw;
                rh = sw * (designHeight / designWidth);
            }
            console.log("比例", clientScale, rw, rh, Laya.stage.width, Laya.stage.height, Browser.pixelRatio);

            if (Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL) {
                //正横屏 
                rw = rw * (1 - GameApp.IPHONEX_TOP - GameApp.IPHONEX_BOTTOM);
                // x偏移
                rx = rw * GameApp.IPHONEX_TOP * clientScale;
            }
            else if (Laya.stage.screenMode == Stage.SCREEN_VERTICAL) {
                // 竖屏
                rh = rh * (1 - GameApp.IPHONEX_TOP - GameApp.IPHONEX_BOTTOM);
                // y偏移
                ry = rh * GameApp.IPHONEX_TOP * clientScale;
            } else {
                if (window.orientation == 0) {
                    // 竖屏
                    rh = rh * (1 - GameApp.IPHONEX_TOP - GameApp.IPHONEX_BOTTOM);
                    // y偏移
                    ry = rh * GameApp.IPHONEX_TOP * clientScale;
                } else if (window.orientation == 90) {
                    //正横屏 
                    rw = rw * (1 - GameApp.IPHONEX_TOP - GameApp.IPHONEX_BOTTOM);
                    // x偏移
                    rx = rw * GameApp.IPHONEX_TOP * clientScale;
                } else if (window.orientation == -90) {
                    //反横屏
                    rw = rw * (1 - GameApp.IPHONEX_TOP - GameApp.IPHONEX_BOTTOM);
                    // x偏移
                    rx = rw * GameApp.IPHONEX_BOTTOM * clientScale;
                }
            }
            if (this._uiRoot) {
                this._uiRoot.pos(rx, ry);
                this._uiRoot.scale(clientScale, clientScale);
            }
            if (this._sceneRoot) {
                this._sceneRoot.pos(rx, ry);
                this._sceneRoot.scale(clientScale, clientScale);
            }
        }
        this._clientWidth = rw;
        this._clientHeight = rh;
        this._clientScale = clientScale;


        // this._uiRoot && this._uiRoot.scale(clientScale, clientScale);
        this._uiRoot && this._uiRoot.resize(rw, rh);
        this._sceneRoot && this._sceneRoot.resize(rw, rh);

        // this._blackBorder && this._blackBorder.scale(clientScale, clientScale);
        this._blackBorder && this._blackBorder.resize(width, height);
    }


    //获取自己历史成绩
    public getLocalHistoryScore(): number {
        let obj: any = this._localStorageMgr.getJSON("score_info");
        let localScore: number = 0;
        //新旧版本更替
        if (!obj) {
            localScore = parseInt(this._localStorageMgr.getItem("history_score"));
            if (!localScore || isNaN(localScore)) localScore = 0;
            else {
                this.setLocalHistoryScore(localScore);
            }
        }
        else {
            localScore = obj.score;
            //判断时间有效性
            let curTime = this.getWeekOneDayByTime(Laya.timer.currTimer);
            if (curTime != obj.time) localScore = 0;
        }
        console.log("getLocalHistoryScore", obj, localScore)

        // if(localScore<=0){
        //     localScore = this.getDbHistoryScore();
        // }
        return localScore;
    }

    //从数据库获取的数据
    public getDbHistoryScore(): number {
        if (this.wxUserInfo && this.wxUserInfo.bestScore) {
            return this.wxUserInfo.bestScore;
        }
        return 0;
    }


    /**
     * 上传成绩 
     * 
     */
    public uploadGrade(value: number, type: number): void {
        //是否新纪录
        console.log("上传成绩在主域", value, type);
        if (type == 1) {
            if (this.wxUserInfo) {
                this.wxUserInfo.bestScore = value;
            }
            this._localStorageMgr.setItem("score", value.toString());
        }
        let data = {
            type: "updatescore",
            score: value,
            etype: type
        };
        WXTool.postDataOpen(data)
    }

    /**
     * 获得击败百分数
     * @return 
     * 
     */
    public getBeatPer(value: number): number {
        if (value >= 10000) {
            return 99;
        }
        else if (value >= 7000 && value < 10000) {
            return 90;
        }
        else if (value >= 4000 && value < 7000) {
            return 80;
        }
        else if (value >= 1000 && value < 4000) {
            return 70;
        }

        return 60;
    }

    //设置微信信息
    public setWxSelfInfo(data: any): void {
        if (!data) return;
        console.log("主域 微信信息", data);
        //data = {nickName,avatarUrl,city,country,gender,language,province}
        this.wxUserInfo = data;
        // this.enterGame();
    }
    
    public setLocalHistoryScore(score: number): void {
        // this.saveDataLocal("history_score",score.toString());
        let time = this.getWeekOneDayByTime(Laya.timer.currTimer);
        let obj = { score: score, time: time }
        this._localStorageMgr.setJSON("score_info", obj);
    }


    /**
 * 显示结算排行
 * @param type 
 * @param score 
 */
    public showResutRankOpt(type: number, score: number): void {
        console.log('type' + type + '|' + score);
        //是否新纪录
        if (type == 1) {
            if (this.wxUserInfo) {
                this.wxUserInfo.bestScore = score;
            }
            this.setLocalHistoryScore(score);
        }
        //获取排行
        let data = {
            type: "openresult",
            showtype: type,
            score: score,
            time: Laya.timer.currTimer
        }
        WXTool.postDataOpen(data)
    }

    // 时间同步 
    private _sync: Sync;
    get sync(): Sync {
        if (!this._sync) {
            this._sync = new Sync(this);
        }
        return this._sync;
    }

    //玩家信息管理器
    protected _playerDataMgr: PlayerDataMgr;
    get plyertDataMgr(): PlayerDataMgr {
        if (!this._playerDataMgr) {
            this._playerDataMgr = new PlayerDataMgr(this);
        }
        return this._playerDataMgr;
    }


    //数据本地存储管理器
    private _localStorageMgr: LocalStorageMgr;
    get localStorageMgr(): LocalStorageMgr {
        if (!this._localStorageMgr) {
            this._localStorageMgr = new dou.managers.LocalStorageMgr(this);
        }
        return this._localStorageMgr;
    }
}