import Stage = Laya.Stage;                      //laya.display.Stage;
import Sprite = Laya.Sprite;                    //laya.display.Sprite;
import Graphics = Laya.Graphics;                //laya.display.Graphics;

import TextInput = Laya.TextInput;              //laya.ui.TextInput;
import TextArea = Laya.TextArea;                //laya.ui.TextArea;
import Button = Laya.Button;                    //laya.ui.Button;
import Box = Laya.Box;                          //laya.ui.Box;
import ProgressBar = Laya.ProgressBar;          //laya.ui.ProgressBar;
import List = Laya.List;                        //laya.ui.List;
import LImage = Laya.Image;                     //laya.ui.Image;
import Label = Laya.Label;                      //laya.ui.Label;

import Socket = Laya.Socket;                    //laya.net.Socket;
import Loader = Laya.Loader;                    //laya.net.Loader;
import HttpRequest = Laya.HttpRequest;          //laya.net.HttpRequest;
import LocalStorage = Laya.LocalStorage;        //laya.net.LocalStorage

import Texture = Laya.Texture;                  //laya.resource.Texture;
import Templet = Laya.Templet;                  //laya.ani.bone.Templet
import Skeleton = Laya.Skeleton;

import Byte = Laya.Byte;                        //laya.utils.Byte;
import Handler = Laya.Handler;                  //laya.utils.Handler;
import Browser = Laya.Browser;                  //laya.utils.Browser;
import Dictionary = Laya.Dictionary;            //laya.utils.Dictionary;

import Matrix = Laya.Matrix;                    //laya.maths.Matrix;
import Rectangle = Laya.Rectangle;              //laya.maths.Rectangle;
import Point = Laya.Point;                      //laya.maths.Point;

import LEvent = Laya.Event;                     //laya.events.Event;
import EventDispatcher = Laya.EventDispatcher;  //laya.events.EventDispatcher 

import SoundManager = Laya.SoundManager;        //laya.media.SoundManager;

import GlowFilter = Laya.GlowFilter;            //laya.filters.GlowFilter;
import ColorFilter = Laya.ColorFilter;          //laya.filters.ColorFilter;
import Animation = Laya.Animation;
import AnimationPlayer = Laya.AnimationPlayer;
import Timer = laya.utils.Timer;
import Vector3 = Laya.Vector3;
import Vector4 = Laya.Vector4;
import MeshSprite3D = Laya.MeshSprite3D;
import MeshCollider = Laya.MeshCollider;
import Glitter = Laya.Glitter;
import BlinnPhongMaterial = Laya.BlinnPhongMaterial;

import ShowScene = dou.ShowRoot;


import Path = dou.Path;
import UIRoot = dou.UIRoot;
import BlackBorder = dou.BlackBorder;
import Sync = dou.Sync;


import LMiniAdpter = Laya.MiniAdpter;
import TD = dou.utils.TD;
import IPoolsObject = dou.utils.IPoolsObject;
import ObjectPools = dou.utils.ObjectPools;
import StringU = dou.utils.StringU;
// import EffectU = dou.utils.EffectU;
import Vesion = dou.utils.Vesion;
import Vector2 = dou.utils.Vector2;
import MathU = dou.utils.MathU;
import TextFieldU = dou.utils.TextFieldU;
import DisplayU = dou.utils.DisplayU;
import TeaStyle = dou.utils.TeaStyle;
// import EffectUnit = dou.utils.EffectUnit;

import Template = dou.data.Template;
import AssetsLoader = dou.data.AssetsLoader;
import RefAsset = dou.data.RefAsset;
import PreLoad = dou.data.PreLoad;


import PageDef = dou.gui.page.PageDef;
import Page = dou.gui.base.Page;
import TabPage = dou.gui.base.TabPage;
import TabBox = dou.gui.base.TabBox;
import Grid = doc.gui.component.Grid;
import TemplateGrid = doc.gui.component.TemplateGrid;
import TemplateInfoGrid = doc.gui.component.TemplateInfoGrid;
import TweenBtnEff = dou.gui.component.TweenBtnEff;


import EffectLayer = dou.scene.EffectLayer;
import Effect = dou.scene.Effect;
import EffectFrame = dou.scene.EffectFrame;
import Camera = dou.scene.Camera;
import PlayerMeshSprite3D = dou.scene.PlayerMeshSprite3D;
import RobotMeshSprite3D = dou.scene.RobotMeshSprite3D;

import PlayerBaseScript = dou.scene.PlayerBaseScript;
import CameraMove = dou.scene.CameraMove;
import BaseBuilder = dou.scene.builder.BaseBuilder;
import Road = dou.scene.builder.Road;
import Road1 = dou.scene.builder.Road1;
import Builder = dou.scene.builder.Builder;
import XiePo = dou.scene.builder.XiePo;
import SpeedAdd = dou.scene.builder.SpeedAdd;
import ColorBall = dou.scene.builder.ColorBall;
import SuperBall = dou.scene.builder.SuperBall;
import Cast_Arrow = dou.scene.builder.Cast_Arrow;
import Diamond = dou.scene.builder.Diamond;
import SlowNet = dou.scene.builder.SlowNet;
import MusicBall = dou.scene.builder.MusicBall;
import MultipleBall = dou.scene.builder.MultipleBall;

import EffectMgr = dou.scene.EffectMgr;

import RoadMgr = dou.scene.BuilderMgr;

import BaseScene = dou.BaseScene;
import SceneRoot = dou.SceneRoot;
import ShowRoot = dou.ShowRoot;



import PlayerDataMgr = dou.managers.PlayerDataMgr;
import LocalStorageMgr = dou.managers.LocalStorageMgr;
import NumGroup = doc.gui.component.NumGroup;
import MyList = dou.gui.component.MyList;


// import SortPage = dou.gui.page.SortPage;
import ClipUtil = dou.gui.base.ClipUtil;


// 打印
let logd_o = false;
let logw_o = false;
let loge_o = false;
let logl_o = false;
// 本地调试
var isDebug: boolean = true;

function logd(...args: any[]): void {
    // if (!logd_o) return;
    args.unshift("[D]");
    console.debug(args.join(" "));
}

function logw(...args: any[]): void {
    if (!logw_o) return;
    args.unshift("[W]");
    console.warn(args.join(" "));
}

function loge(...args: any[]): void {
    if (!loge_o) return;
    args.unshift("[E]");
    console.error(args.join(" "));
}

function logl(...args: any[]): void {
    if (!logl_o) return;
    args.unshift("[L]");
    console.log(args.join(" "));
}

var Zlib = window['Zlib'];
var JSZip = window["JSZip"];
// 启动程序
class Launch {
    public SCENE_WIDTH: number = 720;
    public SCENE_HEIGHT: number = 1280;

    private _clientWidth: number = 0;
    private _clientHeight: number = 0;
    public get clientWidth(): number {
        return this._clientWidth;
    }
    public get clientHeight(): number {
        return this._clientHeight;
    }

    private _clientScale: number = 1;
    // 程序集合
    private _apps: Array<GameApp> = [];


    constructor() {
        //初始化微信小游戏
        LMiniAdpter.init(true);
        WXTool.loadFenbao();
        // 初始化舞台
        console.log("初始-----", Browser.onIPhone, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio);
        //是否微信，非debug就是微信
        isDebug = location.href.indexOf('index.html') != -1 && location.href.indexOf("game.js") == -1 && location.href.indexOf("gamePage.html") == -1;
        // Defines.setVersion(this._curGameVersion);
        // 是否IPhoneX
        if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
            onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        }
        if (onIPhoneX) {
            //初始化引擎
            // Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio,Laya.WebGL);
            Laya3D.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, true);
        }
        else {
            //初始化引擎
            // Laya.init(this.SCENE_WIDTH, this.SCENE_HEIGHT,Laya.WebGL);
            Laya3D.init(this.SCENE_WIDTH, this.SCENE_HEIGHT, true);
        }
        WXTool.init();


        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置横竖屏
        Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
        //设置水平对齐
        Laya.stage.alignH = "center";
        //设置垂直对齐
        Laya.stage.alignV = "middle";


        Loader.typeMap["data"] = Loader.BUFFER;
        Loader.typeMap["bin"] = Loader.BUFFER;
        // 抗锯齿
        Config.isAntialias = true;

        Vesion.httpsProtocol = (location.href.indexOf('https://') == 0);
        if (Browser.httpProtocol) {
            let url = location.href;
            let log = StringU.getParameter(url, "log");
            if (log != "") {
                logd_o = logw_o = loge_o = logl_o = true;
            }
            else {
                logd_o = StringU.getParameter(url, "logd") != "";
                logw_o = StringU.getParameter(url, "logw") != "";
                loge_o = StringU.getParameter(url, "loge") != "";
                logl_o = StringU.getParameter(url, "logl") != "";
            }
            if (url.indexOf("192.168.") != -1) {
                ObjectPools.mold = ObjectPools.MOLD_DEBUG_STRICT;
                logd_o = logw_o = loge_o = logl_o = true;
            }
        }
        else {
            logd_o = logw_o = loge_o = logl_o = true;
            ObjectPools.mold = ObjectPools.MOLD_DEBUG_STRICT;
        }
        logd_o = logw_o = loge_o = logl_o = true;
        let onPC = Browser.onPC;
        if (!onPC) {
            if (window.orientation == 0) {
                Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
            }
            else if (window.orientation == 90 || window.orientation == -90) {
                Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
            }
            window.addEventListener("orientationchange", (e) => {
                this.lockOrientation = false;
                Laya.stage.screenMode = Stage.SCREEN_NONE;
            });
        }
        // Vesion.addSearchPath("CN/", "data.bin");
        //加载文件版本信息
        Vesion.once(Vesion.LOAD_DATA_COMPLETE, this, () => {
            this.init();
        })
        ClipUtil.init();
        Vesion.loadVesionFile();
        //获得抽屉数据
        WXTool.getYXinfo();
    }

    private _app: GameApp;
    private init(): void {
        //  logd("进游戏了-------------")
        this._app = new GameApp();
        // //初始化更新签到记录数据   内有调用页面设置   在真实环境受异步影响  移动到 uiroot init之后调用
        // this._app.plyertDataMgr.setCurWeekTime();
        this._apps.push(this._app);

        this._app.pageVisibility = "***";
        MessageManager.on(WXTool.LOADOK, this, this.onInitData);
        if (isDebug) {
            this.onInitData();
        }
        Laya.Stat.show();
    }

    private onInitData() {
        // 主心跳
        Laya.timer.frameLoop(1, this, this.onUpdate);
        // 监听窗口大小变化
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        this.onResize();
    }

    private _prevUpdateTimer: number;
    // 心跳更新
    private onUpdate(): void {
        let timer = Laya.timer.currTimer;
        let diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }

        // 心跳
        // let diff = Laya.timer.delta;
        for (let app of this._apps) {
            app.onUpdate(diff);
        }
        // 对象池
        ObjectPools.update(diff);
        // 引用计数素材更新
        RefAsset.update(diff);
    }

    /**计算两个触摸点之间的距离*/
    private getDistance(points: Array<any>): number {
        let distance: number = 0;
        if (points && points.length == 2) {
            let dx: number = points[0].stageX - points[1].stageX;
            let dy: number = points[0].stageY - points[1].stageY;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }

    // 游戏窗口尺寸发生变化
    onResize(): void {
        let clientWidth = Laya.stage.width;
        let clientHeight = Laya.stage.height;

        for (let app of this._apps) {
            app.onResize(clientWidth, clientHeight);
        }
    }

    // 浏览器可视原始高宽
    private _browserClientWidth: number = 0;
    private _browserClientHeight: number = 0;
    private _prevBrowserClientWidth: number;
    private _prevBrowserClientHeight: number;

    private _lockOrientation: boolean = true;
    private set lockOrientation(v: boolean) {
        this._lockOrientation = v;
    }

}

var main = new Launch();
