/*
* name;
*/
class WXTool {
    /**
     * 微信小游戏工具
     */
    constructor() {

    }
    public static WXRESIZE: string = "WXRESIZE";//宽高改变
    public static GROUP_DATA: string = "GROUP_DATA";//群排行数据
    public static FRIEND_DATA: string = "FRIEND_DATA";//排行榜数据
    public static CLOSE_CANVAS: string = "CLOSE_CANVAS";//关闭开放域
    public static SHARED_SUCCESS: string = "SHARED_SUCCESS";//分享成功
    public static SHARED_FAIL: string = "SHARED_FAIL";//分享失败
    public static GROUP_SORT: string = "GROUP_SORT";//群排行
    public static LOADOK: string = "LOADOK";//分包加载成功
    public static BLACKEVENT: string = "BLACKEVENT"//黑底点击事件
    public static VIDEO_SUCCESS: string = "VIDEO_SUCCESS";//视频成功
    public static SUPER_SKIN: string = "SUPER_SKIN";//绝版皮肤   
    public static REBORN_COIN: string = "reborn_coin";//复活币
    public static REBORN_LIBAO: string = "reborn_libao";//复活币礼包   
    public static GAME_REVIED: string = "game_revied";//跳转试玩回来   
    public static GAMESTART: string = "GAMESTART";//游戏开始
    public static GAMESTOP: string = "GAMESTOP";//游戏暂停   
    public static PAGE_UP: string = "PAGE_UP";//上一页
    public static PAGE_NEXT: string = "PAGE_NEXT";//下一页
    public static JINBI: string = "jinbi";

    public static version = "1.1.6"
    public static fk_version = "0.92.6"
    public static fg_game_id = "159"
    public static fg_game_key = "z4yDh8F2pC4WrTnQgYevlOy74YQ3rqUy";
    public static share_mode = 0;
    public static ispingbi: boolean = false;
    public static VIDEO_ID: string = "adunit-a4afebfc10c81239";

    //Iphone X 安全区域距离顶部
    public static IPHONEX_TOP: number = 44 / 812;
    //Iphone X 安全区域距离底部
    public static IPHONEX_BOTTOM: number = 34 / 812;

    public static MODE_SHARE_0: number = 0
    public static MODE_SHARE_1: number = 1
    public static MODE_SHARE_2: number = 2
    public static MODE_SHARE_3: number = 3
    public static MODE_SHARE_4: number = 4
    public static MODE_SHARE_5: number = 5
    public static MODE_SHARE_6: number = 6


    public static DIE_POS = 340;
    public static WIDTH = 720;
    public static HEIGHT = 1280;
    public static CATEGORY_DEFAUL = 0;
    public static CATEGORY_JIANTOU = 2;
    public static CATEGORY_TARGET = 4;
    public static CATEGORY_HAND = 8;
    public static CATEGORY_PLAY = 16;

    public static _curDefendBody: number = 60;
    public static _openId: string;

    //更多好玩红点标识
    public static isTempRed: boolean = false;

    public static STATE_START: number = 0;
    public static STATE_GAMING: number = 1;
    public static STATE_FIRST_END: number = 2;
    public static STATE_RELIFE: number = 3;
    public static STATE_OVER: number = 4;
    public static _state: number = 0;

    private static _bgm: any;

    //重新复活时使用的分数
    public static score: number;

    public static init() {
        WXTool.checkIpx();
        // WXTool.GetIsShare();
        WXTool.GetConfigVersion();
        // Laya.timer.once(500,WXTool,()=>{
        //     WXTool.GetShareContent();
        // })
        //获得抽屉数据
        WXTool.getYXinfo();
        WXTool.getSystemInfo();
        WXTool.onShow();
        WXTool.onHide();
        // Laya.timer.once(1000,WXTool,()=>{
        //     WXTool.GetConfigVersion();
        // })

    }

    public static onIpx: boolean = false;
    public static checkIpx() {
        if (Laya.Browser.onIPhone && Math.abs(Laya.Browser.pixelRatio - 3) < 0.01) {
            WXTool.onIpx = (Laya.Browser.clientWidth == 375 && Laya.Browser.clientHeight == 812) || (Laya.Browser.clientWidth == 812 && Laya.Browser.clientHeight == 375);
        }
    }

    public static isShare = false;
    public static get shareBoole() {
        // return WXTool.isShare || WXTool.isSwithOpen;
        return true;
    }

    /**版本开关 */
    public static isSwithOpen = false;
    public static GetIsShare(callback?) {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.request({
                url: WXTool.contentString("https://gamecenter.phonecoolgame.com/app/getInfo?appid=wx73abab89c857c2d5&version=" + WXTool.fk_version),
                method: "GET",
                success: (res) => {
                    console.log("webLogin success", res);
                    //登录成功
                    if (res && res.data) {
                        console.log("分享开关访问返回参数", res.data)
                        WXTool.isShare = res.data.showyd == "1" ? true : false;
                        callback && callback();
                    }
                    WXTool.GetShareContent();
                },
                fail: (res) => {
                    console.log("分享开关访问失败返回参数")
                    WXTool.isShare = false
                    WXTool.GetShareContent();
                }

            });
        }
        if (Laya.Browser.window.wx) {
            //转发
            Laya.Browser.window.wx.showShareMenu && Laya.Browser.window.wx.showShareMenu({
                withShareTicket: true,
                success: function () {
                    console.log("showShareMenu:success");
                },
                fail: function () {
                    console.log("showShareMenu:fail");
                },
                complete: function () {
                    console.log("showShareMenu:complete");
                }
            });
        }
    }

    //拉去广告相关接口 分平台处理
    public static contentString(strConter): string {
        let str = strConter;
        str = Laya.Browser.onIOS ? str + "&ptform=1" : str;
        return str;
    }


    private static _shareCentent: any
    //获取分享相关
    public static GetShareContent() {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.request({
                url: WXTool.contentString("https://cpgc.phonecoolgame.com/material/getMaterials?appid=wx73abab89c857c2d5"),
                method: "GET",
                success: (res) => {
                    console.log("webLogin success", res);
                    //登录成功
                    if (res && res.data) {
                        var shareData = res.data.data;
                        var temp: any = [];
                        console.log("分享访问返回参数", shareData)

                        for (var key in shareData) {
                            if (shareData[key].length)
                                temp.push(shareData[key]);
                        }
                        WXTool._shareCentent = temp;
                        console.log("WXTool.shareCentent", WXTool._shareCentent)

                        var idx: number = -1;
                        var temp: any = {};
                        var shareCon: string = "";
                        console.log("转发分享信息temp1=", WXTool._shareCentent)
                        if (WXTool._shareCentent && WXTool._shareCentent.length) {
                            idx = WXTool.randomRange(0, WXTool._shareCentent[0].length - 1);
                            temp = WXTool._shareCentent[0][idx];
                            // if(temp.content.indexOf("#score#")!=-1){
                            shareCon = temp.content;
                            if (WXTool.score)
                                shareCon = temp.content.replace("#score#", WXTool.score.toString())
                            // }
                            console.log("转发分享信息temp=", temp, idx)
                        }
                        // /** 正式环境
                        //分享返回
                        if (!WXTool.isShare) return;
                        Laya.Browser.window.wx.onShareAppMessage(function () {
                            console.log("转发信息temp=", temp.content)
                            // 用户点击了“转发”按钮
                            return {
                                title: temp ? shareCon : "不给你点颜色看看，都不知道我的厉害",
                                imageUrl: temp ? temp.cdnurl : "share/share1.jpg",
                                query: "&materialID=" + temp.materialID,
                                success: (res) => {
                                    if (temp)
                                        WXTool.ReportShare(temp.materialID)
                                    console.log("转发 sucess", res);
                                },
                                fail: (res) => {
                                    MessageManager.event(WXTool.SHARED_FAIL);
                                    console.log("shareFriend:fail");
                                }
                            }
                        })
                    }
                },
                fail: (res) => {
                    console.log("分享访问失败返回参数")
                    WXTool._shareCentent = null;
                }
            });
        }
    }

    //上报分享图片内容
    public static ReportShare(id: number) {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.request({
                url: WXTool.contentString("https://cpgc.phonecoolgame.com/material/reportShare?appid=wx73abab89c857c2d5&materialID=" + id),
                method: "GET",
                success: (res) => {
                    console.log("webLogin success", res);
                    //登录成功
                    if (res && res.data) {
                        console.log("分享上报返回参数")
                    }
                },
                fail: (res) => {
                    console.log("分享上报失败返回参数")
                }
            });
        }
    }

    private static _systemInfo;
    // 获取系统信息
    private static getSystemInfo(): void {
        if (!Laya.Browser.window.wx)
            return;
        Laya.Browser.window.wx.getSystemInfo({
            success: (res) => {
                WXTool._systemInfo = res;
                if (!WXTool.wxBversionLess('2.3.0')) {
                    WXTool._isImitateShare = 0;
                }
                console.log('******************SDKVersion', WXTool._systemInfo.SDKVersion, WXTool._isImitateShare);
            }
        });
    }

    public static channel_id
    public static onShow() {
        let wx = Laya.Browser.window.wx;
        if (!wx)
            return;
        wx.onShow((res) => {
            console.log("wx onshow", res.scene, res.query, res.shareTicket);
            MessageManager.event(WXTool.GAMESTART);
            if (res.query) {
                if (res.query.materialID) {
                    WXTool.ReportClick(res.query.materialID);
                }
                if (res.query.type == 'super_skin') {
                    WXTool._openId = res.query.openid;
                    MessageManager.event(WXTool.SUPER_SKIN);
                }
                if (res.query.type == 'reborn_coin') {
                    WXTool._openId = res.query.openid;
                    MessageManager.event(WXTool.REBORN_COIN);
                }
                if (res.query.type == 'reborn_libao') {
                    WXTool._openId = res.query.openid;
                    MessageManager.event(WXTool.REBORN_LIBAO);
                }
                if (res.query.gameRevied_1) {
                    MessageManager.event(WXTool.GAME_REVIED, res.query.gameRevied_1);
                }
                if (res.query.from) {
                    WXTool.channel_id = res.query.from;
                    // WXTool.reportChannel(1,res.query.from)
                } else if (res.scene == "1007"
                    || res.scene == "1008"
                    || res.scene == "1044"
                    || res.scene == "1096") {
                    WXTool.channel_id = "share";
                    // WXTool.reportChannel(1,"share")
                } else {
                    WXTool.channel_id = "fkw001";
                    // WXTool.reportChannel(1,"fkw001")
                }
            }
            //播放背景
            if (PlayerDataMgr.isPlayActionMusic) {
                var channel = Laya.SoundManager.playMusic('music/bgm_low.mp3');
                console.log("播放背景音乐", channel)
            }
            // 是否分享调起
            if (WXTool._isShareFriend) {
                let tempTime = WXTool.shareTime + 500;
                Laya.timer.once(tempTime, WXTool, WXTool.onceTimeShare)
                if (WXTool._isImitateShare) {  // CC_GMAE_ONSHOW_OPEN  配置中的share && 需要判断版本库大于2.3.0 才会起作用
                    let showTime = new Date().getTime();
                    // if (showTime - WXTool._hideTime < WXTool._shareData.sharegap1) { // WXTool._shareMinTime 配置中的 sharegap1 
                    //     WXTool.showTips(WXTool._shareData.sharetips, false, WXTool.shareFriend, null, null);
                    //     // Laya.timer.once(3500, WXTool, WXTool.onceTimeShare)
                    //     Laya.timer.clear(WXTool,WXTool.onceTimeShare);
                    //     return;
                    // }
                    if (!WXTool.judgeTimes(showTime, WXTool._hideTime)) {
                        Laya.timer.clear(WXTool, WXTool.onceTimeShare);
                        return;
                    }
                    console.log("***************虚拟分享成功");
                    if (WXTool._tempID) {
                        WXTool.ReportShare(WXTool._tempID);
                        WXTool._tempID = null;
                    }
                    console.log("打印isShare==============", WXTool.isShare, WXTool.shareSuccess)
                    if (WXTool.isShare) {
                        WXTool.shareSuccess && WXTool.shareSuccess();
                    }
                    //抛出事件
                    MessageManager.event(WXTool.SHARED_SUCCESS);
                }
            }
        });
    }

    private static onceTimeShare() {
        WXTool._isShareFriend = false;
    }

    public static defaultShare(callback, type: number = -1) {
        WXTool.sharetype = type;
        switch (WXTool.share_mode) {
            case WXTool.MODE_SHARE_0:
            case WXTool.MODE_SHARE_5:
            case WXTool.MODE_SHARE_6:
                WXTool.getVideo(callback)
                return;
            case WXTool.MODE_SHARE_1:
                if (type == 0) {
                    WXTool.getVideo(callback)
                } else {
                    WXTool.shareFriend(callback, WXTool.sharetype)
                }
                return;
            case WXTool.MODE_SHARE_2:
                WXTool.shareFriend(callback, WXTool.sharetype)
                break;
            case WXTool.MODE_SHARE_3:
            case WXTool.MODE_SHARE_4:
                if (WXTool.ispingbi)//是否屏蔽
                {
                    WXTool.getVideo(callback)
                } else {
                    WXTool.shareFriend(callback, WXTool.sharetype)
                }
                break;
        }
    }

    private static timeSign: number;
    //请求sign
    public static reportSign() {
        WXTool.httpRequest("https://lgworld.xd-game.com/GetSignForFengGuo",
            "game_id=" + WXTool.gameId,
            (res) => {
                console.log("wxTool reportSign success", res);
                WXTool.reportIp(res)
            }, "post", (res1) => {
                console.log("wxTool reportSign fail", res1);
            }
        );
    }

    private static pingbiArr = ["北京", "上海", "深圳", "广州"]
    public static reportIp(data?) {
        WXTool.httpRequest("https://cpgc.phonecoolgame.com/address/getClientAddress",
            "appid=" + data.appid + "&time=" + data.time + "&sign=" + data.sign,
            (res) => {
                console.log("wxTool reportIp success", res);
                if (res.ecode == 0) {
                    if (WXTool.pingbiArr.indexOf(res.city) == -1) {
                        WXTool.ispingbi = false;
                    } else {
                        WXTool.ispingbi = true;
                    }
                }
            }, "post", (res1) => {
                console.log("wxTool reportSign fail", res1);
            }
        );
    }



    //cps上报
    public static reportChannel(type, channel_id) {
        let url = "";
        let str = "";
        if (WXTool.wxOpenid == "") return;
        let tempstr = "";
        tempstr = Laya.Browser.onIOS ? "&platform=ios" : "&platform=android";
        switch (type) {
            case 1://创角
                url = "http://tj.17fengyou.cn/create.php"
                str = "channel_id=" + channel_id + "&game_id=" + WXTool.fg_game_id + "&openid=" + WXTool.wxOpenid + tempstr + "&roleid=1&rolename=1&server_id=1"
                break;
            case 2://登陆
                url = "http://tj.17fengyou.cn/login.php"
                str = "channel_id=" + channel_id + "&game_id=" + WXTool.fg_game_id + "&openid=" + WXTool.wxOpenid + tempstr + "&roleid=1&server_id=1"
                break;
            case 3://充值
                url = "http://tj.17fengyou.cn/create.php"
                break;
        }
        console.log("md5", str)
        // WXTool.httpRequest(url,
        //     str + "&sign=" + WXTool.strMd5(str) ,
        //     (res) => {
        //         console.log("wxTool reportChannel success", res);
        //     },"post",(res1) => {
        //         console.log("wxTool reportChannel fail", res1);
        //     }
        // );
    }

    //获取md5内容
    // private static strMd5(str){
    //     console.log("md5",str+WXTool.fg_game_key,MD5.hash(str + WXTool.fg_game_key))
    //     return MD5.hash(str + WXTool.fg_game_key);
    // }

    private static _shareLxTime = 0;
    public static _allShareTimes = 0;
    // 鉴定次数
    private static judgeTimes(showTime, hideTime): boolean {
        console.log("showTime", WXTool._shareLxTime);
        let tempTime = WXTool._allShareTimes >= 3 ? WXTool.needShareTime : (WXTool.shareTime - WXTool._allShareTimes * 500)
        let tempindex = WXTool.randomRange(0, 1);
        if (showTime - hideTime < WXTool.shareTime) { // WXTool._shareLXMinTime 配置中的sharegap2
            WXTool.showTips(WXTool._shareData.sharetips, true, WXTool.shareFriend, WXTool.shareFail, null);
            WXTool._shareLxTime += 1;
            WXTool._allShareTimes += 1;
            if (WXTool._allShareTimes % 2 && tempindex == 1) {
                return true;
            }
            return false
        } else {
            WXTool._shareLxTime = 0;
        }
        if (WXTool._shareLxTime >= WXTool.shareCount) {
            // WXTool.showTips(WXTool._shareData.sharetips, false, WXTool.shareFriend, null, null);
            WXTool._shareLxTime = 0;
            return true;
        }
        if (WXTool._allShareTimes % 2 && tempindex == 0) {
            return false;
        }
        return true;
    }

    private static shareFail() {
        WXTool._isShareFriend = false;
        WXTool._shareLxTime = 0;
    }

    private static _hideTime: number;
    public static onHide() {
        let wx = Laya.Browser.window.wx;
        if (!wx) return;
        wx.onHide((res) => {
            WXTool._hideTime = new Date().getTime();
            console.log("wx onhide", WXTool._hideTime);
            //游戏暂停
            MessageManager.event(WXTool.GAMESTOP);
        });
    }

    /**返回小程序启动参数 */
    public static getLaunchOptionsSync(): any {
        let wx = Laya.Browser.window.wx;
        if (!wx) return null;
        return wx.getLaunchOptionsSync();
    }

    public static ReportClick(id: number) {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.request({
                url: WXTool.contentString("https://cpgc.phonecoolgame.com/material/reportClick?appid=wx73abab89c857c2d5&materialID=" + id),
                method: "GET",
                success: (res) => {
                    console.log("webLogin success", res);
                    //登录成功
                    if (res && res.data) {
                        console.log("分享点击上报返回参数")
                        // WXTool.shareCentent = res.data;
                    }
                },
                fail: (res) => {
                    console.log("分享点击上报失败返回参数", res)
                    // WXTool.shareCentent = null;
                }
            });
        }
    }


    public static SetConfigVersion() {
        WXTool.httpRequest("https://lgworld.xd-game.com/SetConfigForVersion",
            "game_id=" + WXTool.gameId + "&versions=" + WXTool.version + "&pass_examine=" + 0 + "&banner_time=2000",
            (res) => {
                console.log("wxTool SetConfigVersion success", res);
            }, "post", (res1) => {
                console.log("wxTool SetConfigVersion fail", res1);
            }
        );
    }

    public static shareTime = 3000;
    public static shareCount = 3;
    public static reportShare = 1;
    private static needShareTime = WXTool.shareTime - 1000;

    public static GetConfigVersion(callback?) {
        WXTool.httpRequest("https://lgworld.xd-game.com/GetConfigForVersion",
            "game_id=" + WXTool.gameId + "&versions=" + WXTool.version,
            (res) => {
                if (res && res.server_info.pass_examine == '1') {
                    WXTool.isShare = WXTool.isSwithOpen = true;
                    WXTool.shareTime = res.server_info.banner_time;
                    WXTool.shareCount = res.server_info.share_fail_count;
                    WXTool.reportShare = res.server_info.func_switch;
                    callback && callback();
                }
                else if (res && res.server_info.pass_examine == '0')
                    WXTool.isShare = WXTool.isSwithOpen = false;
                console.log("wxTool GetConfigVersion success", res);
                WXTool.GetShareContent();
            }, "post", (res1) => {
                WXTool.getswitch(callback);
                console.log("wxTool GetConfigVersion fail", res1);
                WXTool.GetShareContent();
            }
        );
    }


    public static adFrams: any;
    public static bannerAd: any;
    public static isBanner: boolean = false;
    public static likeInfo: any;
    public static isBannerShow: boolean = true;
    //获取广告配置
    public static getAdConfig(idx: number) {
        var urlconfig: string = '';
        switch (idx) {
            case 1://悬浮广告配置
                urlconfig = "https://cpgc.phonecoolgame.com/adc/getAdFrame?appid=wx73abab89c857c2d5";
                break;
            case 2://获取banner组件位置
                urlconfig = "https://cpgc.phonecoolgame.com/adc/getBannerAdInfo?appid=wx73abab89c857c2d5";
                break;
            case 3://获取猜你好玩配置
                urlconfig = "https://cpgc.phonecoolgame.com/adc/getLikeInfo?appid=wx73abab89c857c2d5";
                break;
            case 4://获取更多好玩列表
                urlconfig = "https://cpgc.phonecoolgame.com/adc/getMoreInfo?appid=wx73abab89c857c2d5";
                break;
        }
        // console.log("请求广告配置", WXTool.sdkView);
        WXTool.httpRequest(WXTool.contentString(urlconfig),
            "",
            (res) => {
                console.log("getAdConfig success", res);
                //登录成功
                if (res) {
                    console.log("访问返回参数")
                    WXTool.updateAdView(idx, res);
                }
            }, "get", (res1) => {
                console.log("访问失败返回参数", res1);
            }
        );
    }


    public static updateAdView(idx: number, data: any) {
        switch (idx) {
            case 1:
                if (!WXTool.adFrams)
                    WXTool.adFrams = data.adFrames;
                console.log("访问返回参数 WXTool.adFrams", WXTool.adFrams)
                if (WXTool.adFrams) {
                    var ad: any = WXTool.getAdFrame();
                    console.log("进入步骤2", ad)
                    WXTool.loadAd(ad)

                }
                break;
            case 2:
                if (!WXTool.bannerAd)
                    WXTool.bannerAd = data.bannerAdInfo;
                WXTool.isBanner = data.justgdt == 1 ? true : false;
                console.log("WXTool.getBanner 初始化", WXTool.bannerAd)
                Laya.timer.clear(WXTool, WXTool.getBanner);
                WXTool.getBanner();
                Laya.timer.loop(120000, WXTool, WXTool.getBanner);
                break;
            case 3:
                if (!WXTool.likeInfo)
                    WXTool.likeInfo = data.likeInfoList;
                console.log("访问返回参数  WXTool.likeInfo", WXTool.likeInfo)
                if (WXTool.likeInfo) {
                    console.log("进入步骤3")
                    WXTool.getLikeInfo()
                }
                break;
            case 4:
                if (!WXTool.moreInfo)
                    WXTool.moreInfo = data.moreInfoList;
                if (WXTool.moreInfo.key == "wx845a2f34af2f4235" && Laya.Browser.onIOS) {
                    WXTool.moreInfo.jmpid = WXTool.randomRange(0, 9);
                }
                break;
        }
    }

    //返回当前Ad信息
    private static _curIdxAd: number = 0;
    public static getAdFrame() {
        if (WXTool.adFrams) {
            if (WXTool._curIdxAd == WXTool.adFrams.length) {
                WXTool._curIdxAd = 0;
            }
            console.log("WXTool.curIdxAd", WXTool.adFrams, WXTool._curIdxAd, WXTool.adFrams.length)
            return WXTool.adFrams[WXTool._curIdxAd];
        }
        return null;
    }


    private static _textTureArr: any = [];
    private static _heightIdx: number = 2;
    private static _curIdx: number = 0;
    private static _curImga: Laya.Image;
    private static _xuhao: number = 0
    private static _isShareInfo: boolean = false;

    public static addAdFram(view: any, texture: Texture, ad: any) {
        if (WXTool._isShareFriend) return
        if (!WXTool.sdkView) return;
        if (!texture) return;
        if (!ad) return;
        var widx = ad.size[0];
        // console.log("出错1")
        var hidx = ad.size[1];
        // console.log("出错2")
        var len = ad.len;
        // console.log("出错3")
        if (len == 1) {
            Laya.timer.clearAll(WXTool);
        }
        // console.log("出错4")

        if (WXTool._curIdx % (widx) == 0 && WXTool._curIdx != 0) {
            WXTool._heightIdx--;
            WXTool._curIdx = 0;
        }
        // console.log("出错5")
        var w = (texture.sourceWidth / widx * WXTool._curIdx);
        var h = (texture.sourceHeight / hidx * WXTool._heightIdx);
        // console.log("出错6")
        if (WXTool._textTureArr.length < len) {//WXTool.adFrams.len
            // console.log("出错7")
            let text = Laya.Texture.createFromTexture(texture, w + 1, h + 1, (texture.sourceWidth / (widx)) - 1, (texture.sourceHeight / (hidx) - 1));
            WXTool._textTureArr.push(text);
        }
        // console.log("出错8")
        if (WXTool.sdkView && WXTool.sdkView.img_ad && WXTool._textTureArr.length > 0) {
            // console.log("出错9")
            let imgAd = WXTool.sdkView.img_ad;
            if (imgAd.width && imgAd.height && imgAd.graphics) {
                // console.log("出错10")
                let tempW = texture.sourceWidth / (widx);
                let tempH = texture.sourceWidth / (hidx);
                // console.log("出错10_1")
                if (WXTool.sdkView && imgAd
                    && imgAd.hasOwnProperty("width")
                    && imgAd.hasOwnProperty("height")
                    && imgAd.hasOwnProperty("graphics")
                    && imgAd._bitmap) {
                    imgAd.width = tempW.toFixed(2);
                    imgAd.height = tempH.toFixed(2);
                    imgAd.graphics.clear()
                }
                if (WXTool._textTureArr[WXTool._xuhao])
                    imgAd.graphics.drawTexture(WXTool._textTureArr[WXTool._xuhao]);
            }
        }
        // console.log("出错12")
        if (len != 1) {
            if (WXTool._curIdx == (widx - 1) && WXTool._heightIdx == 0) {
                WXTool._curIdx = 0;
                WXTool._heightIdx = 2;
                WXTool._xuhao = 0;
            } else {
                WXTool._curIdx++;
                WXTool._xuhao++;
            }
        }
        // console.log("出错13")
    }


    public static countAd: number = 0;
    private static _testTureTemp: Texture;
    public static loadAd(ad: any) {
        if (!WXTool.sdkView) return;
        if (!ad) return;
        console.log("点击跳转下一个", ad.url)
        if (!WXTool._testTureTemp)
            WXTool._testTureTemp = new Texture();
        Laya.timer.clearAll(WXTool);
        WXTool._testTureTemp.load(ad.url);
        Laya.timer.loop(3000, WXTool, WXTool.againLoad, [ad]);
        WXTool.againLoad(ad);
    }

    private static againLoad(ad: any) {
        WXTool.countAd++;
        if (WXTool.countAd >= 3) {
            Laya.timer.clear(WXTool, WXTool.againLoad);
            return;
        }
        console.log("加载跳转0", ad.url)
        if (WXTool.sdkView && WXTool._testTureTemp && ad) {
            Laya.loader.load(ad.url, Handler.create(WXTool, (texture: Texture) => {
                console.log("加载跳转", ad.url)
                WXTool._xuhao = 0;
                WXTool._heightIdx = 2;
                WXTool.countAd = 0;
                WXTool._curIdx = 0;
                Laya.timer.clear(WXTool, WXTool.againLoad);
                WXTool._testTureTemp = texture;
                Laya.timer.frameLoop(10, WXTool, WXTool.addAdFram, [WXTool.sdkView, WXTool._testTureTemp, ad]);
            }))
        }
    }

    public static clean() {
        console.log("设置猜你爱玩数据0")
        Laya.timer.clear(WXTool, WXTool.addAdFram);
        Laya.timer.clear(WXTool, WXTool.againLoad);
        WXTool._curIdxAd = 0;
        WXTool._textTureArr = [];
        WXTool._textTureArr.length = 0;
        if (WXTool.sdkView && WXTool.sdkView.img_ad)
            WXTool.sdkView.img_ad.graphics.clear()
        WXTool._testTureTemp && WXTool._testTureTemp.destroy();
        WXTool._testTureTemp = null;
        // WXTool.sdkView = null;
        WXTool.isBooleBtnGo = false;
    }


    public static removeLoadAd(view: any) {
        Laya.timer.clearAll(WXTool);
        WXTool._textTureArr = [];
        WXTool._testTureTemp && WXTool._testTureTemp.destroy();
        WXTool._testTureTemp = null;
        if (WXTool.sdkView)
            WXTool.sdkView.img_ad.source = null;
        WXTool._xuhao = 0;
        WXTool._heightIdx = 2;
        WXTool._curIdx = 0;
    }

    public static get isML1(): boolean {
        let query: any = WXTool.getLaunchOptionsSync() ? WXTool.getLaunchOptionsSync().query : {};
        return parseInt(query.ml) == 1;
    }

    public static sdkView: any;
    public static adViewInit(view: any) {
        if (!view) return;
        WXTool.sdkView = null;
        WXTool.sdkView = view;
        let isML1: boolean = WXTool.isML1;
        if ((isML1 && WXTool.isSwithOpen || !isML1) && WXTool.sdkView.img_ad) {
            if (WXTool.adFrams) {
                WXTool.updateAdView(1, WXTool.adFrams)
            } else {
                WXTool.getAdConfig(1);
            }

            WXTool.sdkView.img_ad.on(LEvent.CLICK, WXTool, WXTool.adHander, [WXTool.sdkView]);
        }
        if ((WXTool.isSwithOpen || !isML1) && WXTool.sdkView["img_0"]) {
            // WXTool.getAdConfig(3);
            if (WXTool.likeInfo) {
                WXTool.updateAdView(3, WXTool.likeInfo)
            } else {
                WXTool.getAdConfig(3);
            }
            for (var index = 0; index < 3; index++) {
                if (WXTool.sdkView["img_" + index]) {
                    WXTool.sdkView["img_" + index].on(LEvent.CLICK, WXTool, WXTool.likeHander);
                }
            }
        }

        if (WXTool.sdkView.img_ban) {
            // WXTool.getAdConfig(2);
            if (WXTool.bannerAd) {
                WXTool.updateAdView(2, WXTool.bannerAd)
            } else {
                WXTool.getAdConfig(2);
            }
            console.log("初始化banner")
            WXTool.sdkView.img_ban.on(LEvent.CLICK, WXTool, WXTool.banHander, [WXTool.sdkView]);
        }
        if (!WXTool.moreInfo) {
            WXTool.getAdConfig(4);
        }
    }

    private static banHander(view: any) {
        if (!WXTool.isBanner) return;
        console.log("WXTool.bannerAd", WXTool.bannerAd);
        if (WXTool.bannerAd) {
            if (!WXTool.isBanner)
                WXTool.nav("", WXTool.bannerAd[0]);
        }
    }

    private static adHander(view: any) {
        if (WXTool.adFrams && WXTool.sdkView) {
            WXTool.isboolStatue = 2;
            var ad: any = WXTool.getAdFrame();
            console.log("进入步骤2_1", ad)
            WXTool.nav("", ad)
            WXTool._textTureArr = [];
            WXTool._testTureTemp = null;
            if (WXTool.sdkView && WXTool.sdkView.img_ad)
                WXTool.sdkView.img_ad.source = null;
            WXTool._curIdxAd++;
            let nextad = WXTool.getAdFrame();
            // console.log("进入步骤2_2", nextad)
            WXTool.loadAd(nextad)
        }
    }

    public static autoAd() {
        if (!WXTool.sdkView) return;
        WXTool._textTureArr = [];
        WXTool._testTureTemp = null;
        if (WXTool.sdkView && WXTool.sdkView.img_ad)
            WXTool.sdkView.img_ad.source = null;
        WXTool._curIdxAd++;
        let nextad = WXTool.getAdFrame();
        console.log("进入步骤3_2", nextad)
        WXTool.loadAd(nextad)
    }

    public static moreInfo: any;
    public static getMoreInfo() {
        if (!WXTool.moreInfo) {

        }

    }

    public static isboolStatue: number = 0;
    private static likeHander(e: LEvent): void {
        if (!WXTool.sdkView || !WXTool.likeInfo || WXTool.likeInfo.length <= 0) return;
        console.log("猜你好玩点击进入", e, WXTool.likeInfo)
        WXTool.isboolStatue = 1;
        switch (e.currentTarget) {
            case WXTool.sdkView["img_0"]:
                WXTool.nav("", WXTool.likeInfo[0])
                break;
            case WXTool.sdkView["img_1"]:
                WXTool.nav("", WXTool.likeInfo[1])
                break;
            case WXTool.sdkView["img_2"]:
                WXTool.nav("", WXTool.likeInfo[2])
                break;
        }
    }

    private static _mask: Laya.Image;
    //见面显示猜你爱玩
    public static getLikeInfo() {
        console.log("设置猜你爱玩数据", WXTool.likeInfo)
        if (WXTool.likeInfo && WXTool.sdkView) {
            for (var index = 0; index < WXTool.likeInfo.length; index++) {
                if (!WXTool._mask)
                    WXTool._mask = new Laya.Image();
                if (WXTool.sdkView["img_" + index]) {
                    WXTool._mask.skin = WXTool.sdkView["img_" + index].skin;
                }
                if (WXTool.sdkView["img_" + index]) {
                    WXTool.sdkView["img_" + index].skin = WXTool.likeInfo[index].icon;
                }
                if (WXTool.sdkView["lab_name" + index]) {
                    WXTool.sdkView["lab_name" + index].text = WXTool.likeInfo[index].name
                }


            }
        }
    }

    //界面显示banner
    public static getBanInfo() {
        if (!WXTool.sdkView) return;
        if (WXTool.bannerAd && WXTool.bannerAd.length) {
            var info: any = WXTool.bannerAd[0];
            if (WXTool.isBanner) {

            } else {
                if (info)
                    WXTool.sdkView.img_ban.skin = info.url;
            }
        }
    }

    //广点通banner
    private static _bananerBtn: any;

    public static viewHight: number = 0;
    public static viewWidth: number = 0;
    public static banHight: number;
    public static banWidth: number;
    public static banTop: number;
    public static getBanner() {
        if (!WXTool.isBannerShow) return;
        if (Laya.Browser.window.wx) {
            if (WXTool._bananerBtn) {
                WXTool._bananerBtn.hide();
                WXTool._bananerBtn.destroy();
            }
            // console.log("Laya.Browser.clientHeight====",Laya.Browser.clientHeight,Laya.Browser.clientHeight)
            var topValue = WXTool.onIpx ? Laya.Browser.clientHeight - 110 : Laya.Browser.clientHeight - 75
            // if(isBool){
            WXTool._bananerBtn = Laya.Browser.window.wx.createBannerAd({
                adUnitId: "adunit-f135cad61f030a7a",
                style: { left: 0, top: topValue }
            })
            // }
            // console.log("banner变化0", WXTool.onIpx, topValue)
            WXTool._bananerBtn && WXTool._bananerBtn.onLoad(WXTool.onloadBanner)
            WXTool._bananerBtn && WXTool._bananerBtn.onResize(WXTool.layouBanner)
            WXTool._bananerBtn && WXTool._bananerBtn.onError(WXTool.onBanError)
        }
    }

    private static onBanError(res) {
        console.log(res);
    }

    private static onloadBanner() {
        // console.log("banner变化1")
        WXTool.layouBanner();
        WXTool._bananerBtn && WXTool._bananerBtn.show();
        WXTool._bananerBtn.offLoad(WXTool.onloadBanner);

    }


    public static layouBanner() {
        if (!WXTool._bananerBtn) return;
        if (WXTool.banHight != WXTool._bananerBtn.style.realHeight && WXTool._bananerBtn.style.realHeight) {
            WXTool.banHight = WXTool._bananerBtn.style.realHeight
        }
        // if(WXTool.banWidth != WXTool._bananerBtn.style.realWidth && WXTool._bananerBtn.style.realWidth){
        //     WXTool.banWidth = WXTool._bananerBtn.style.realWidth
        // }
        // console.log("banner width",WXTool.banWidth,WXTool.banHight,WXTool._bananerBtn.style.realHeight,WXTool._bananerBtn.style.realWidth)
        let h: number = WXTool.banHight > 100 ? 90 : WXTool.banHight;
        // console.log("banner init======>",WXTool.viewHight,WXTool.viewWidth,WXTool._bananerBtn.style.realWidth)
        if (!WXTool.isBooleBtnGo)
            WXTool.banTop = WXTool._bananerBtn.style.top = WXTool.onIpx ? WXTool.viewHight - h - 30 : WXTool.viewHight - h - 20;
        if (!WXTool.isShare) {
            WXTool.banTop = WXTool._bananerBtn.style.top = WXTool.onIpx ? WXTool.viewHight - h - 30 : WXTool.viewHight - h - 10;
        }
        WXTool._bananerBtn.style.width = Laya.Browser.window.wx.getSystemInfoSync().screenWidth;
        // WXTool._bananerBtn.style.left = (WXTool.viewWidth - WXTool.banWidth) / 2;
        console.log("banner==========>", WXTool._bananerBtn.style.width)
        WXTool._bananerBtn.offResize(WXTool.layouBanner);
        WXTool.getBtn_GO();
    }


    public static isBooleBtnGo: boolean = false;
    public static getBtn_GO(view?) {
        if (view) {
            if (WXTool._bananerBtn) {
                WXTool.isBooleBtnGo = true;
                if (WXTool.onIpx) {
                    WXTool._bananerBtn.style.top = (view.y + view.height) * (Laya.Browser.clientHeight / view.parent.height) - 25;
                } else {
                    WXTool._bananerBtn.style.top = (view.y + view.height) * (Laya.Browser.clientHeight / view.parent.height) + 15;
                }
                if (Laya.Browser.window.wx)
                    WXTool._bananerBtn.style.width = Laya.Browser.window.wx.getSystemInfoSync().screenWidth;
            }

        }
        else
            WXTool.isBooleBtnGo = false;
    }


    private static viedoBtn: any;
    // private static _videoData: any;
    // public static getVideo(error?: Function, close?: Function, finish?: Function) {
    //     if (Laya.Browser.window.wx) {
    //         WXTool._viedoBtn = Laya.Browser.window.wx.createRewardedVideoAd({
    //             adUnitId: 'adunit-146da794d564435e'
    //         })
    //         WXTool._videoData = WXTool._viedoBtn.show();
    //         WXTool._videoData.catch(() => {
    //             WXTool._viedoBtn.load().then(() => {
    //                 WXTool._viedoBtn && WXTool._viedoBtn.show();
    //             })
    //         })
    //         WXTool._viedoBtn.onLoad(() => {
    //             console.log('激励视频 广告加载成功', WXTool._videoData)
    //         })

    //         WXTool._viedoBtn.onClose((res) => {
    //             if (res && (res.isEnd || res.isEnded)) {

    //             }
    //             else {
    //                 WXTool.isBannerShow = false;
    //                 close && close();
    //                 console.log("正常播放广告")
    //             }
    //         })
    //         WXTool._viedoBtn.onError((res) => {
    //             console.log("广告错误", res)
    //             error && error();
    //         });

    //     }

    // }

    public static isplayVideo: boolean = false;
    public static videoData: any;
    public static isPlayError: boolean = false;
    //callback 外部传入的时候 必须()=>{callback()} 这种格式传入
    public static getVideo(error?: Function, close?: Function) {
        if (WXTool.VIDEO_ID == "" && WXTool.isPlayError) {
            error && error();
            return;
        }
        function video(res) {
            // console.log("是否允许播放=>1", WXTool.isplayVideo, WXTool.viedoBtn.onClose)
            if (res && (res.isEnd || res.isEnded)) {
                WXTool.isplayVideo = false;
                WXTool.isBannerShow = false;
                // console.log("广告复活成功", Laya.timer.currTimer);
                WXTool.clean();
                MessageManager.event(WXTool.VIDEO_SUCCESS);
                close && close();
            }
            else {
                // console.log("正常播放广告")
                WXTool.isplayVideo = false;
                WXTool.isPlayError = false;
                // console.log("onClose=>3")
                // console.log("onClose=>4")
            }
            WXTool.viedoBtn.offClose(video)
        }

        if (Laya.Browser.window.wx) {
            // console.log("是否允许播放", WXTool.isplayVideo)
            if (WXTool.isplayVideo) return;
            WXTool.isplayVideo = true;
            WXTool.video_show(error);
            // console.log("onClose=>0")
            WXTool.viedoBtn.onClose(video)
        }
    }

    //视频id 加载失败的时候 换一个新的id 在去加载
    // private static chongshi_count: number = 0;
    private static video_show(error?: Function) {
        let videoId = "";
        videoId = WXTool.VIDEO_ID;//todo 视频id
        WXTool.viedoBtn = Laya.Browser.window.wx.createRewardedVideoAd({
            adUnitId: videoId
        })

        WXTool.videoData = WXTool.viedoBtn.show();
        WXTool.videoData.catch(() => {
            WXTool.viedoBtn.load().then(() => {
                // console.log('激励视频 广告加载成功')
                WXTool.viedoBtn && WXTool.viedoBtn.show();
            })
        })

        WXTool.viedoBtn.onError((res) => {
            // console.log("视频失败")
            WXTool.isPlayError = true;
            WXTool.isplayVideo = false;
            WXTool.showTips("视频暂时无法观看，是否分享到群领取奖励？", null, () => {
                error && error();
            }, () => {
                error && error();
            }, null);

            return;
        });
    }


    public static navList = [
        "wx845a2f34af2f4235",
        "wxc7e310f0d21af54d",
        "wxe57bfaaa884daed6",
        "wxa2707f6d3b2f3856",
        "wx3d2e2fa8c4ca3eaf",
        "wx7207b404168ff0e4",
        "wx868c10731a7c9891",
        "wxc7b0f323d0d4b39a",
        "wxa7e8912a8edb1257",
        "wx4ef4ca9305f25543"
    ];
    //跳转
    public static nav(url: string, dstApp?: any) {
        // console.log("进入跳转", dstApp)
        if (Laya.Browser.window.wx) {
            if (Laya.Browser.window.wx.navigateToMiniProgram) {
                let tempNav = Laya.Browser.onIOS ? WXTool.randomRange(1, 9) : WXTool.randomRange(0, 9);
                let goid;
                if (dstApp) {
                    switch (WXTool.isboolStatue) {
                        case 1://猜你爱玩
                            goid = dstApp.key;
                            break;
                        case 2://悬浮广告
                            goid = dstApp.id;
                            break;
                        default:
                            if (dstApp && dstApp[0])
                                goid = dstApp[0].jmpid;
                            else
                                goid = dstApp.jmpid;
                            break;
                    }
                    if (WXTool.navList.indexOf(goid) == -1) {
                        WXTool.setImage(dstApp.share);
                        return;
                    }
                } else {
                    goid = Laya.Browser.onIOS ? WXTool.navList[tempNav] : WXTool.navList[0]
                }
                Laya.Browser.window.wx.navigateToMiniProgram({
                    appId: goid,
                    path: dstApp ? dstApp.parm : 'pages/main/main',
                    success: (res) => {
                        // 打开成功
                        console.log("跳转成功")
                    }
                })
            }
        }
        WXTool.isboolStatue = 0;
    }

    public static setImage(url) {
        if (Laya.Browser.window.wx) {
            var object = {};
            object["urls"] = [url];
            Laya.Browser.window.wx.previewImage(object);
        }
    }

    public static randomRange(min: number, max: number): number {
        var range: number = Math.floor((max - min + 1) * Math.random());
        return range + min;
    }

    public static reliveCount: number = 0;
    public static is_relive: boolean = false;
    public static SHARE_DESC_LIST: string[] = ["duang~，duang~，duang~,你就能跟我一样帅！", "弹指神功？过了1000分再和我说话吧", "Q弹的手感，令人流连忘返~", "没别的，就想看看你有多能耐",
        '别人家的不知道，我们家的弹一弹一定是最好的'];
    private static _shareData: any = {
        share: 1,  //模拟分享是否开启 1 / 0
        sharegap1: 3000, // 分享时间间隔大于sharegap1（ms），分享成功，提供回调
        sharegap2: 3000, // 连续3次分享，时间小于sharegap2大于 sharegap1，提示分享失败，请分享到群或好友
        sharetips: '分享失败，请分享给好友或者群再试试！'// 分享失败提示文字
    }
    private static _isImitateShare = WXTool._shareData.share;
    private static _isShareFriend = false;
    private static _tempID = null;
    public static sharetype = -1;
    private static shareSuccess: any;
    /**发起分享 */
    public static shareFriend(callback?, type?) {//shareType:number = -1
        if (!Laya.Browser.window.wx)
            return;
        WXTool.shareSuccess = callback;
        WXTool._isShareFriend = true;
        WXTool.sharetype = type;
        let idx: number = -1, temp: any = {}, title: string = "", query: string = "", imageUrl: string = "";
        if (WXTool._shareCentent && WXTool._shareCentent.length) {
            idx = WXTool.randomRange(0, WXTool._shareCentent[0].length - 1);
            temp = WXTool._shareCentent[0][idx];
            title = temp.content;
            if (WXTool.score)
                title = temp.content.replace("#score#", WXTool.score.toString());
            // console.log("分享信息temp=", temp, WXTool._shareCentent, idx)
        }
        // console.log("分享接口temp=", temp);
        imageUrl = temp && temp.cdnurl && temp.cdnurl.length > 0 ? temp.cdnurl : "share/share1.jpg";
        WXTool._tempID = temp && temp.materialID ? temp.materialID : null;

        if (WXTool.sharetype == -1) {
            title = title.length > 0 ? title : "不给你点颜色看看，都不知道我的厉害";
            query = temp && temp.materialID && temp.materialID.length > 0 ? "&materialID=" + temp.materialID : '';
        }
        //群排名
        else if (WXTool.sharetype == 1) {
            title = "群雄逐鹿,看你排第几";
            query = "type=opensort";
        }
        //发起挑战
        else if (WXTool.sharetype == 2) {
            title = "恕我直言,玩的再差你们也赢不了";
            query = "type=update&openid=" + WXTool.wxOpenid;
        }
        //邀请拿绝版皮肤
        else if (WXTool.sharetype == 3) {
            title = "有人@你 跪求绝版皮肤";
            query = "type=super_skin&openid=" + WXTool.wxOpenid;
        }
        //邀请拿复活币
        else if (WXTool.sharetype == 4) {
            title = "救救小老弟吧";
            query = "type=reborn_coin&openid=" + WXTool.wxOpenid;
        }
        //发送复活币礼包
        else if (WXTool.sharetype == 5) {
            title = "复活大礼包，点击帮领";
            query = "type=reborn_libao&openid=" + WXTool.wxOpenid;
        }
        else {
            var rand: number = MathU.randomRange(0, WXTool.SHARE_DESC_LIST.length - 1);
            title = WXTool.SHARE_DESC_LIST[rand];
        }
        WXTool._isShareInfo = true;
        // 发起分享
        WXTool.clean();
        Laya.Browser.window.wx.shareAppMessage && Laya.Browser.window.wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query,
            success: (res) => {
                // console.log("*********************真分享成功", res);
                // if (!WXTool._isShareFriend || WXTool.is_relive) {
                //     // WXTool._isShareFriend = false;
                //     if (WXTool._tempID) {
                //         WXTool.ReportShare(WXTool._tempID);
                //         WXTool._tempID = null;
                //     }
                //     console.log("打印isShare==============",WXTool.isShare)
                //     // if (WXTool.isShare) {
                //     // }
                // }
                MessageManager.event(WXTool.SHARED_SUCCESS);

            },
            fail: (res) => {
                // MessageManager.event(WXTool.SHARED_FAIL);
                console.log("shareFriend:fail");
            }
        });
    }

    public static gameInfo: any = [];
    //获取抽屉数据
    public static getYXinfo() {
        if (!Laya.Browser.window.wx)
            return;
        // console.log("获得抽屉数据");
        WXTool.httpRequest(WXTool.contentString("https://cpgc.phonecoolgame.com/adc/getAdexpInfo?appid=wx73abab89c857c2d5"),
            "",
            (res) => {
                console.log("获得抽屉数据成功", res);
                //登录成功
                if (res && res.adexpList) {
                    console.log("设置参数", res.adexpList)
                    WXTool.gameInfo = res.adexpList;
                }
            }, "get", (res1) => {
                console.log("访问失败返回参数", res1)
            }
        );

    }

    /**试玩复活 */
    public static goTrialRevied(gender, successCB, failCB) {
        let wx = Laya.Browser.window.wx;
        if (!wx) return;
        wx.request({
            url: WXTool.contentString("https://cpgc.phonecoolgame.com/adc/getAd4Reborn?appid=wx73abab89c857c2d5"),
            method: "GET",
            success: (res) => {
                // console.log("试玩复活信息成功", res);
                let info = res;
                const appid = info['jmpid'] || "wx845a2f34af2f4235";
                if (!appid) {
                    return;
                }
                var parm = info['parm'] || "pages/main/main?";
                parm = parm.indexOf('?') > 0 ? parm : parm + '?';
                parm = parm.indexOf('gender') > 0 ? parm : parm + '&gender=' + gender;
                parm += '&gameRevied=1';
                if (WXTool.wxBversionLess('2.2.0')) {
                    //do some thing;
                    // console.log("满足2.2.0");
                    wx.navigateToMiniProgram({
                        appId: appid,
                        path: parm,
                        // envVersion: 'trial',
                        success: (res) => {
                            console.log('goTrialRevied success', res);
                            successCB && successCB();
                        },
                        fail: (res) => {
                            console.log('goTrialRevied fail', res);
                            failCB && failCB(res);
                        }
                    });
                }
            },
            fail: (res) => {
                console.log("访问试玩复活信息失败返回参数", res);
            }
        });
    }

    /**跳转盒子拿奖励 */
    public static jumpHZGetAward(gender, callback) {
        let wx = Laya.Browser.window.wx;
        if (!wx) return;
        if (this.wxBversionLess("2.2.0")) {
            console.log("满足2.2.0");
            wx.navigateToMiniProgram({
                appId: "wx845a2f34af2f4235",
                path: "pages/main/main?jumpHZGetAward=1&gender=" + gender,
                // envVersion: 'trial',  //用于测试跳转体验版/正式版
                success: (res) => {
                    // console.log('跳转盒子拿奖励成功', res);
                    callback && callback(true);
                },
            });
        } else {
            //不能跳转情况处理 do something 
            WXTool.showTips('微信版本过低', false, null, null, null);
            callback && callback(false);
        }
    }

    /**登录--拿openid */
    public static login() {
        if (!Laya.Browser.window.wx)
            return;
        Laya.Browser.window.wx.login({
            timeout: 20000,
            success: (res) => {
                console.log('def login success', res);
                WXTool.requestOpenid(res.code);
                Laya.Browser.window.wx.postMessage && Laya.Browser.window.wx.postMessage({
                    type: "getselfclouddata",
                    userinfo: {},
                    time: Laya.timer.currTimer,
                });
            },
            fail: (res) => {
                console.log('def login fail', res);
            }
        })
    }

    //请求openid
    public static requestOpenid(code) {
        WXTool.httpRequest("https://t1.xd-game.com:1127/login",
        // WXTool.httpRequest("https://lgworld.xd-game.com/login",
            'code=' + code + '&game_id=' + WXTool.gameId,
            (res) => {
                console.log("---------------------------requestOpenid success", res);
                if (res) {
                    WXTool.wxOpenid = res.openid;
                    WXTool.reportChannel(1, WXTool.channel_id);
                    Laya.Browser.window.wx.postMessage && Laya.Browser.window.wx.postMessage({
                        type: "getOpenid",
                        openid: res.openid
                    });
                    MessageManager.event(WXTool.SUPER_SKIN);
                }
            }
        );
    }

    public static inviteCount: number = 0;
    public static libaoCount: number = 0;
    //获取复活币的分享次数
    public static getinvite(type: number) {
        WXTool.httpRequest("http://h5.xd-game.com/wx.php?s=/Wx/getinvite",
            '{ "openid": "' + WXTool.wxOpenid + '", "gameid": ' + WXTool.gameId + '", "type": ' + type + ' }',
            (res) => {
                console.log("wxTool getShareCount success", res);
                if (type == 0)
                    WXTool.inviteCount = parseInt(res.msg);
                else
                    WXTool.libaoCount = parseInt(res.msg.count);
            }
        );
    }

    // 发起助力--增加邀请人分享数
    public static setinvite(invite_openid: string, type: number): void {
        WXTool.httpRequest("http://h5.xd-game.com/wx.php?s=/Wx/setinvite",
            '{ "openid": "' + invite_openid + '", "gameid": ' + WXTool.gameId + ', "invited_openid":"' + WXTool.wxOpenid + ', "type":"' + type + '" }',
            (res) => {
                if (res.result == -1)
                    console.log("记录失败,已经助力过", res);
            }
        );
    }


    public static wxOpenid: string = '';
    public static gameId: number = 18;
    public static sharecount: number = 0;
    public static sharePlayers: any;
    private static _tryLoginCount: number = 3;
    //获取分享次数
    public static getShareCount(callback: Function) {
        if (!WXTool.reportShare) return;
        WXTool.httpRequest("https://h5.xd-game.com/wx.php?s=/Wx/getsharecount",
            '{ "openid": "' + WXTool.wxOpenid + '", "gameid": ' + WXTool.gameId + ' }',
            (res) => {
                console.log("wxTool getShareCount success", res);
                WXTool.sharecount = parseInt(res.msg.count);
                WXTool.sharePlayers = res.msg.player;
                callback && callback();
            }
        );
    }

    // 发起助力--增加邀请人分享数
    public static setShareCount(invite_openid: string, invited_headurl: string, invited_name: string): void {
        if (!WXTool.reportShare) return;
        WXTool.httpRequest("https://h5.xd-game.com/wx.php?s=/Wx/setsharecount",
            '{ "openid": "' + invite_openid + '", "gameid": ' + WXTool.gameId + ', "invited_openid":"' + WXTool.wxOpenid + '", "invited_headurl":"' + invited_headurl + '", "invited_name":"' + invited_name + '" }',
            (res) => {
                console.log("wxTool setShareCount success", res);
            }
        );
    }

    // 版本开关
    public static getswitch(callback?): void {
        WXTool.httpRequest("https://h5.xd-game.com/wx.php?s=/Wx/getswitch",
            '{ "version": "' + WXTool.version + '", "appid":"wx73abab89c857c2d5" }',
            (res) => {
                console.log("wxTool getswitch success", res);
                if (res && res.msg == '1') {
                    WXTool.isShare = WXTool.isSwithOpen = true;
                    callback && callback();
                }
                // else if (res && res.msg == '0')
                //     WXTool.isShare = WXTool.isSwithOpen = false;
            }
        );
    }

    public static showTips(mess, showNo, callback, nocallback, title) {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.showModal({
                title: title ? title : "提示",
                content: mess,
                showCancel: showNo,
                cancelText: "取消",
                confirmText: "重新分享",
                success: (res) => {
                    if (res.confirm) {
                        callback && callback();
                    }
                    else if (res.cancel) {
                        nocallback && nocallback();
                    }
                },
                fail: function () {
                    console.log("wx showModal fail");
                }
            });
        };
    }

    /**
     * 发起http请求
     * @param url 
     * @param data 
     * @param compCallback 
     * @param resType 
     */
    public static httpRequest(url: string, data: any, compCallback: Function, resType: string = "post", errorCallback: Function = null): void {
        let request: HttpRequest = new HttpRequest();
        request.once(LEvent.COMPLETE, WXTool, (value: any) => {
            console.log('[JSSdk]->httpRequest:', resType, url, data, 'info:' + value);
            if (compCallback != null)
                compCallback(JSON.parse(value));
            request.offAll();
        });
        request.once(LEvent.ERROR, WXTool, (...args) => {
            console.log("[JSSdk]->httpRequest:http req error ", resType, url, data, args);
            if (errorCallback != null)
                errorCallback.apply(null, args);
            request.offAll();
        });
        console.log('[send]->httpRequest:', resType, url, data);
        request.send(url, data, resType);
    }

    //url请求串转成objcet
    public static parseUrlParameterToObj(url: string): Object {
        let paraObj: Object = {};
        if (url && url.length) {
            let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            for (let i = 0; i < paraString.length; i++) {
                let j = paraString[i];
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
        }
        return paraObj;
    }

    //objcet转成url请求串
    public static parseObjToUrlParameter(obj: any): string {
        let str: string = "";
        for (let k in obj) {
            str += "&" + k + "=" + obj[k];
        }
        str = str.substr(1, str.length);
        return str;
    }

    /**比较基础版本库 */
    public static wxBversionLess(version: string): boolean {
        return WXTool.versionToInt(WXTool._systemInfo.SDKVersion) >= WXTool.versionToInt(version);
    }

    // 版本号转数值
    private static versionToInt(version: string): number {
        let array = version.split('.');
        let num = 0;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            num += parseInt(element) * 1000000 / Math.pow(1000, index);
        }
        return num;
    }

    //上传数据并打开
    public static postDataOpen(parm) {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.postMessage(parm);
        }
    }

    public static wxPlayInfo;
    public static userInfoButton;
    //如果没有登陆的话 创建登陆按钮
    public static createWxUseInfoBtn() {
        console.log("创建登陆按钮")
        if (Laya.Browser.window.wx && Laya.Browser.window.wx.createUserInfoButton) {
            var systemInfo = Laya.Browser.window.wx.getSystemInfoSync();
            WXTool.userInfoButton = Laya.Browser.window.wx.createUserInfoButton({
                type: "text",
                text: "",
                style: {
                    left: 0,
                    top: 0,
                    width: systemInfo.screenWidth,
                    height: systemInfo.screenHeight
                }
            })
            console.log("创建登陆按钮", systemInfo.screenWidth, systemInfo.screenHeight)
            WXTool.userInfoButton.onTap(function (res) {
                console.log("获取微信用户昵称", res);
                if (res.rawData) {
                    WXTool.wxPlayInfo = JSON.parse(res.rawData);
                    Laya.Browser.window.wx.postMessage && Laya.Browser.window.wx.postMessage({
                        type: "getselfclouddata",
                        userinfo: WXTool.wxPlayInfo,
                        time: Laya.timer.currTimer,
                    });
                    WXTool.userInfoButton.hide();
                } else {
                    WXTool.userInfoButton.hide();
                }

            });
            WXTool.userInfoButton.show();
        }

    }

    //关闭开放域窗口
    public static closePageOpen(value) {
        let data = {
            type: "closepage",
            page: value
        }
        Laya.Browser.window.wx && Laya.Browser.window.wx.postMessage(data);
    }

    //加载资源分包内容
    public static fenbao_task: any;
    public static loadFenbao() {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.loadSubpackage({
                name: 'scene', // 
                success: (res) => {
                    // 分包加载成功后通过 success 回调
                    MessageManager.event(WXTool.LOADOK)
                    // console.log("loadAudio success");
                },
                fail: (res) => {
                    // WXTool.loadFenbao();
                    // 分包加载失败通过 fail 回调
                    // console.log("loadAudio fail");
                }
            });
        }
    }

    //短震动
    public static vibrateShort() {
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.vibrateShort && Laya.Browser.window.wx.vibrateShort({
                success: function (res) {
                    // console.log("openSetting success",res)
                },
                fail: function () {
                    // console.log("openSetting fail")
                }
            })
        }
    }

    //长震动
    public static vibrateLong() {
        Laya.Browser.window.wx && Laya.Browser.window.wx.vibrateLong && Laya.Browser.window.wx.vibrateLong({
            success: function (res) {
                // console.log("openSetting success",res)
            },
            fail: function () {
                // console.log("openSetting fail")
            }
        })
    }
}