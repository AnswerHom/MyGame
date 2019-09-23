var interfacePI = {}


interfacePI.grant_type = "authorization_code";
interfacePI.wxOpenid = "";
interfacePI.session_key = "";
interfacePI.isDebug = false;


interfacePI.tryLoginCount = 3;//登录连接尝试次数


interfacePI.getWxSelfInfoFun = null;
interfacePI.updateGoldFun = null;
interfacePI.openSortFun = null;
interfacePI.updateUserInfoFun = null;
interfacePI.shareCallbcak = null;
interfacePI.shareCallbcakfail = null;

interfacePI.albumFun = null;
interfacePI.albumfailFun = null;

interfacePI.showImageFun = null;

interfacePI.initGame = function (res, inDebug) {
    interfacePI.isDebug = inDebug;
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.postMessage && wx.postMessage(res);
    //设置开放域大小
    if (res && res.type && res.type == "wxxx") {
        interfacePI.resizeGame(res.width, res.height);
    }

    //转发
    wx.showShareMenu && wx.showShareMenu({
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

    //屏幕长亮
    wx.setKeepScreenOn && wx.setKeepScreenOn({
        keepScreenOn: true
    })
}




//创建获取微信用户昵称按钮
interfacePI.wxUserInfoBtn = null;
interfacePI.createWxUseInfoBtn = function (time, cx, cy, cw, ch) {
    interfacePI.setWxUserInfo(time, null);
    //版本兼容
    if (wx.createUserInfoButton) {
        if (!interfacePI.wxUserInfoBtn) {
            cw = !cw ? 150 : cw;
            ch = !ch ? 80 : ch;
            console.log("createWxUseInfoBtn", cx, cy, cw, ch)
            interfacePI.wxUserInfoBtn = wx.createUserInfoButton({
                type: "text",
                text: "",
                style: {
                    left: cx,
                    top: cy,
                    width: cw,
                    height: ch
                }
            })
            interfacePI.wxUserInfoBtn.onTap(function (res) {
                console.log("获取微信用户昵称", res);
                interfacePI.setWxUserInfo(time, res);
                interfacePI.wxUserInfoBtn.hide();
            });
        }
        interfacePI.wxUserInfoBtn.show();
        return true;
    }
    return false;
}


interfacePI.getWxSelfInfoFun = null;
interfacePI.wxUserInfo = null;
//设置微信用户信息
interfacePI.setWxUserInfo = function (time, userInfo) {
    if (userInfo) {
        interfacePI.wxUserInfo = userInfo;
        interfacePI.getWxSelfInfoFun && interfacePI.getWxSelfInfoFun(interfacePI.wxUserInfo);
    }
    //向开放域通信
    wx.postMessage({
        type: "getselfclouddata",
        userinfo: interfacePI.wxUserInfo,
        time: time
    });

}

//弹窗提示
interfacePI.showTips = function (mess, showNo, callback, nocallback, title) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.showModal({
        title: title ? title : "提示",
        content: mess,
        showCancel: showNo,
        cancelText: "退出",
        confirmText: "确定",
        success: function (res) {
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
}

//获取用户信息
interfacePI.getUserInfo = function (openid, time, cx, cy, cw, ch, btnUrl) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    //版本兼容
    if (wx.getUserInfo) {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: function (res) {
                console.log('getUserInfo success', res);
                interfacePI.getWxSelfInfoFun && interfacePI.getWxSelfInfoFun(res ? res.userInfo : null);
                if (res && res.userInfo) {
                    //向开放域通信
                    wx.postMessage({
                        type: "getselfclouddata",
                        userinfo: res.userInfo,
                        time: time
                    });
                }
                //检验下版本 给提示 没有这个方法说明版本不对
                if (!wx.getOpenDataContext) {
                    interfacePI.showTips("您当前微信版本过低，部分功能会受到限制，请及时更新");
                }
            },
            fail: function (res) {
                console.log('getUserInfo fail');
                interfacePI.createWxUseInfoBtn(time, cx, cy, cw, ch);

                // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                    interfacePI.showTips("当前未授权，是否重新授权", true, interfacePI.openSetting, interfacePI.exitGame, '');
                }
            }
        })
    }
    else {
        interfacePI.createWxUseInfoBtn(time, cx, cy, cw, ch);
    }
}

//退出小游戏
interfacePI.exitGame = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.exitMiniProgram && wx.exitMiniProgram({
        success: function (res) {
            console.log("exitGame success", res)
        },
        fail: function () {
            console.log("exitGame fail")
        }
    });
}

//打开授权设置
interfacePI.openSetting = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.openSetting && wx.openSetting({
        success: function (res) {
            console.log("openSetting success", res)
            var authSetting = res.authSetting
            if (authSetting && authSetting['scope.userInfo'] === true) {
                // 用户已授权，可以直接调用相关 API
                interfacePI.login();//重新登陆
            } else if (authSetting && authSetting['scope.userInfo'] === false) {
                // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                interfacePI.exitGame();
            } else {
                // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
            }
        },
        fail: function () {
            console.log("openSetting fail")
        }
    })
}

//获取授权设置
interfacePI.setting = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    //获取用户授权设置
    wx.getSetting && wx.getSetting({
        success: function (res) {
            var authSetting = res.authSetting
            if (authSetting['scope.userInfo'] === true) {
                // 用户已授权，可以直接调用相关 API
            } else if (authSetting['scope.userInfo'] === false) {
                // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
            } else {
                // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
            }
        }
    })
}


interfacePI.removeSelfCloundData = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.removeUserCloudStorage && wx.removeUserCloudStorage({
        keyList: ["score", "time"]
    })
}

interfacePI.duanzhendong = null;
interfacePI.duanzhendong = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.vibrateShort && wx.vibrateShort({
        success: function (res) {
            console.log("openSetting success", res)
        },
        fail: function () {
            console.log("openSetting fail")
        }
    })
}

interfacePI.longzhendong = null;
interfacePI.longzhendong = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    wx.vibrateLong && wx.vibrateLong({
        success: function (res) {
            console.log("openSetting success", res)
        },
        fail: function () {
            console.log("openSetting fail")
        }
    })
}



//上传自己的分数
interfacePI.updateSelfScore = function (value, etype) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    //当局中更新分数
    wx.postMessage && wx.postMessage({
        type: "updatescore",
        score: value,
        etype: etype
    });
    //*/
}

//获取排行榜数据
interfacePI.openSort = function (value, time) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("获取排行榜数据");
    wx.postMessage && wx.postMessage({
        type: "opensort",
        shareTicket: value,
        time: time
    });
}

//获取单个头像显示
interfacePI.openSingleShow = function (showType, time) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("仅限单个或者多个头像显示", showType, time);
    wx.postMessage && wx.postMessage({
        type: "opensingleshow",
        showType: showType,
        time: time
    });
}



//打开结算
interfacePI.openResult = function (value, value1, time) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("打开结算");
    wx.postMessage && wx.postMessage({
        type: "openresult",
        showtype: value,
        score: value1,
        time: time
    });
}

//关闭界面
interfacePI.closePage = function (value) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("关闭界面");
    wx.postMessage && wx.postMessage({
        type: "closepage",
        page: value
    });
}



//上下翻页
interfacePI.ctntrolPage = function (value) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("发送翻页界面");
    wx.postMessage && wx.postMessage({
        type: "ctntrolpage",
        ctntrol: value
    });
}
//滚动排行版
interfacePI.ScollSortPage = function (value) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    console.log("发送滚动排行版");
    wx.postMessage && wx.postMessage({
        type: "ScollSortPage",
        ctntrol: value
    });
}

interfacePI.updateShare = function (shareTicket) {
    console.log("updateShare", shareTicket)
}


interfacePI.createBtn = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    if (wx.createUserInfoButton) {
        var systemInfo = wx.getSystemInfoSync();
        console.log('systemInfo', systemInfo)
        var button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 0,
                top: 0,
                width: systemInfo.screenWidth,
                height: systemInfo.screenHeight,
            }
        })
        return button;
    }
}



//调整布局
interfacePI.resizeGame = function (rw, rh, rx, ry, cscale, isIpx) {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    // /** 正式环境
    //设置开放域大小
    if (wx.getOpenDataContext) {
        var openDataContext = wx.getOpenDataContext();
        if (openDataContext) {
            var sharedCanvas = openDataContext.canvas;
            if (sharedCanvas) {
                sharedCanvas.width = rw * cscale;
                sharedCanvas.height = rh * cscale;
            }
        }
    }

    wx.postMessage && wx.postMessage({
        type: "resize",
        width: rw,
        height: rh,
        rx: rx,
        ry: ry,
        cscale: cscale,
        isIpx: isIpx
    });
    //*/
}


interfacePI.createCanvas = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    return wx.createCanvas();
}



interfacePI.createImage = function () {
    //调试版本 就不执行
    if (interfacePI.isDebug) return;
    return wx.createImage();
}

window.externalInterfacePI = interfacePI;