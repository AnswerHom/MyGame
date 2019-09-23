var interfacePI = {}

interfacePI.setWxSelfInfoFun = null;
interfacePI.setWxOpenidFun = null;
interfacePI.openSortFun = null;
interfacePI.closePageFun = null;
interfacePI.setSortDataFun = null;
interfacePI.setVersionFun = null;
interfacePI.openResultFun = null;
interfacePI.updateScoreFun = null;
interfacePI.friendDataList = null;
interfacePI.resizeFun = null;
interfacePI.datacun = null;
interfacePI.controlPage = null;


// /** 
wx.onMessage(function(data) {
    console.log(data)
    if (data.type && data.type == "wxxx"){
        //通过接收主域的消息来设置开发数据域的画布大小跟矩阵信息
        sharedCanvas.width = data.width;
        sharedCanvas.height = data.height;
        console.log("-----------------sharedresize----------1------------------",sharedCanvas.width,sharedCanvas.height);
       // console.log(data.matrix);
       // console.log("-----------------sharedresize------------2----------------");
        // if (data.matrix){
        //     Laya.stage._canvasTransform = data.matrix;//重新设置矩阵
        //     console.log(Laya.stage._canvasTransform);
        // }
        //版号
        if(data.version && interfacePI.setVersionFun){
            interfacePI.setVersionFun(data.version);
        }
    }else if (data['isLoad'] == "filedata") {
        console.log("zhuyu isLoad");
        // Laya.MiniFileMgr.ziyuFileData[data.url] = data.data;//文本数据
    }
    else if(data.type && data.type == "getselfclouddata"){
        wx.getUserCloudStorage && wx.getUserCloudStorage({
            keyList: ["score","time"],
            success: function (res) {
                console.log("getUserCloudStorage:success", res.KVDataList);
                if(res){
                    console.log("玩家数据", res.KVDataList[0],res.KVDataList[1],data.userinfo);
                    if(data.userinfo){
                        data.userinfo.nickname = data.userinfo.nickName;
                        data.userinfo.KVDataList = res.KVDataList;
                        interfacePI.setWxSelfInfoFun && interfacePI.setWxSelfInfoFun(data.userinfo,data.time);
                    }
                }
            },
            fail: function () {
                console.log("getUserCloudStorage:fail");
            },
            complete: function () {
               // console.log("getUserCloudStorage:complete");
            }
        });
    }
    else if(data.type && data.type == "getOpenid"){
        interfacePI.setWxOpenidFun && interfacePI.setWxOpenidFun(data.openid);
    }
    else if(data.type && data.type == "ctntrolpage"){
        console.log('进入翻页',data.value,data)
        interfacePI.controlPage && interfacePI.controlPage(data.ctntrol)
    }
    else if(data.type && data.type == "opensort"){
        interfacePI.openSortFun && interfacePI.openSortFun();
        if(data.shareTicket && data.shareTicket != ""){//群排行
            interfacePI.getQunSortData(data.shareTicket,data.time)
        }
        else{
            interfacePI.getFriendData(0,data.time);
        }
    }
    else if(data.type && data.type == "closepage"){
        interfacePI.closePageFun && interfacePI.closePageFun(data.page);
    }
    else if(data.type && data.type == "openresult"){
        interfacePI.getFriendData(1,data.showtype,data.score,data.time);
    }
})
//*/

//上传成绩
interfacePI.updateSelfCloundData = function(value,time){
     wx.setUserCloudStorage && wx.setUserCloudStorage({
            KVDataList: [{key:"score",value:value.toString()},{key:"time",value:time.toString()}],
            success: function () {
                console.log("setUserCloudStorage:success");
            },
            fail: function () {
                console.log("setUserCloudStorage:fail");
            },
            complete: function () {
                // console.log("setUserCloudStorage:complete");
                // var openDataContext = wx.getOpenDataContext()
                // openDataContext.postMessage({type:"getselfclouddata"})
            }
        })
}

//获取排行榜数据
interfacePI.getFriendData = function(type,value,value1,value2){
   // console.log("interfacePI:getFriendData");
    wx.getFriendCloudStorage && wx.getFriendCloudStorage({
        keyList: ["score","time"],
        success: function (res) {
            console.log("getFriendCloudStorage:success",res);
            if(res){
                // if(res.data){
                //     for(var i = 0; i < res.data.length;i++){
                //         console.log("朋友玩家数据",i,res.data[i]);
                //     }
                // }
                if(type == 0){
                    interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data,value);
                }
                else if(type == 1){
                    interfacePI.openResultFun && interfacePI.openResultFun(value,value1,res.data,value2);
                }
            }
        },
        fail: function () {
            console.log("getFriendCloudStorage:fail");
        },
        complete: function () {
            //console.log("getFriendCloudStorage:complete");
        }
    });
}

//获取群排行数据
interfacePI.getQunSortData = function(value,time){
   console.log("interfacePI:getQunSortData");
    wx.getGroupCloudStorage && wx.getGroupCloudStorage({
        shareTicket:value,
        keyList: ["score","time"],
        success: function (res) {
            console.log("getQunSortData:success",res);
            if(res){
                if(res.data){
                    for(var i = 0; i < res.data.length;i++){
                        console.log("群玩家数据",i,res.data[i]);
                    }
                }
                interfacePI.setSortDataFun && interfacePI.setSortDataFun(res.data,time);
            }
        },
        fail: function () {
            console.log("getQunSortData:fail");
        },
        complete: function () {
            //console.log("getQunSortData:complete");
        }
    });
}
interfacePI.Canvas = function(value,time){
   return wx.createCanvas();
}

interfacePI.Image = function(value,time){
   return wx.createImage();
}

interfacePI.getSharedCanvas = function(value,time){
   return wx.getSharedCanvas();
}

window.externalInterfacePI = interfacePI;