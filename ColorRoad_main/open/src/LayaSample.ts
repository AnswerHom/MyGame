// 程序入口
import SortPage = page.SortPageScoll;
import ResultPage = page.ResultPage;
import singleShowPage = page.singeleShowPage;
import chaoyue = page.chaoyue;
import ResMgr = page.ResMgr;
class GameMain {

    private _sortPage: SortPage;
    private _singleShowPage: singleShowPage;
    private _chaoyuePage:chaoyue;
    private _resultPage: any;
    //自己的微信信息
    public wxSelfInfo: any;
    //排行榜数据
    public friendDataList: any;
    //日期
    private _date: Date;
    private _curTime: number = 0;

    private _clientWidth: number = 0;
    private _clientHeight: number = 0;
    public get clientWidth(): number {
        return this._clientWidth;
    }
    public get clientHeight(): number {
        return this._clientHeight;
    }

    constructor() {
        this._date = new Date();
    }
    public addListen(): void {
        let api: any = window["externalInterfacePI"];
        if (api) {
            api.setWxSelfInfoFun = (data, time) => {
                if (!data) return;
                this._curTime = time;
                this.setWxSelfInfo(data);
            }
            api.setWxOpenidFun = (data) => {
                if (!data) return;
                this.setWxOpenid(data);
            }
            api.openSortFun = () => {
                this.openSort();
            }
            api.closePageFun = (type) => {
                this.closePage(type);
            }
            api.setSortDataFun = (data, time) => {
                if (!data) return;
                this._curTime = time;
                this.setSortData(this.changeDataList(data));
            }
            api.openResultFun = (type, score, data, time) => {
                if (!data) return;
                this._curTime = time;
                this.openResult(type, score, this.changeDataList(data));
            }
            api.updateScoreFun = (score, data, etype) => {
                if (!data) return;
                console.log("上传成绩,开放域", score, data, etype);
                if (data) this.friendDataList = this.changeDataList(data);
                console.log("经过替换之后", score, score)
                this.updateSelfScore(score, etype);
            }
            api.controlPage = (data) => {
                if (data) {
                    if (this._sortPage) {
                        console.log('data.type', data.ctntrol, data)
                        this._sortPage.controlPage(data);
                    }
                }
            }
            api.ScollSortPage = (data) => {
                if (data) {
                    if (this._sortPage) {
                        console.log('ScollSortPage', data.ctntrol)
                        this._sortPage.updateDela(data.ctntrol);
                    }
                }
            }
            api.openSingleShowFun = (data, type, time,score) => {
                if (!data) return;
                this._curTime = time;
                console.log("进入LayaSample")
                this.setSingleShow(this.changeDataList(data.data), type,score);
            }
            api.openChaoYueFun = (data, score,time) => {
                if (!data) return;
                this._curTime = time;
                console.log("进入LayaSample")
                this.setChaoYue(this.changeDataList(data.data),score);
            }
            api.cleanChaoYueFun = () => {
                this.setChaoYueClean();
            }
        }
    }

    //设置自己微信信息
    public setWxSelfInfo(value): void {
        console.log("开放域 获取了用户信息", value);
        if (!this.wxSelfInfo) {
            this.wxSelfInfo = new Object();
        }
        // let rawData = value.rawData;
        // if (rawData) {
        //     let obj = {
        //         nickname: rawData.nickName,
        //         avatarUrl: rawData.avatarUrl,
        //     }
        //     this.wxSelfInfo.nickname = obj.nickname;
        //     this.wxSelfInfo.avatarUrl = obj.avatarUrl;
        //     this.wxSelfInfo.score = value.KVDataList['score'];
        //     this.wxSelfInfo.time = value.KVDataList['time'];
        // } else {
        let obj = this.changeDataSingele(value);
        this.wxSelfInfo.nickname = obj.nickname;
        this.wxSelfInfo.avatarUrl = obj.avatarUrl;
        this.wxSelfInfo.score = obj.score;
        this.wxSelfInfo.time = obj.time;
        // }
    }

    public setWxOpenid(value): void {
        if (!this.wxSelfInfo) {
            this.wxSelfInfo = new Object();
        }
        this.wxSelfInfo.openid = value;
    }

    //转换单个数据
    private changeDataSingele(value: any): any {
        if (!value) return null;
        let obj: any = new Object();
        obj.openid = value.openid ? value.openid : "";
        obj.nickname = value.nickname ? value.nickname : "";
        obj.avatarUrl = value.avatarUrl ? value.avatarUrl : "ui/top/wpk_2.png";
        if (obj.avatarUrl)
            ResMgr.getRes(obj.avatarUrl, null);
        let kvList = value.KVDataList;
        let score: number = 0;
        let time: number = 0;
        if (kvList) {
            let len: number = kvList.length;
            for (let i: number = 0; i < len; i++) {
                let kv: any = kvList[i];
                if (!kv) continue;
                if (kv.key == "score" && kv.value) {
                    score = parseInt(kv.value);
                }
                else if (kv.key == "time" && kv.value) {
                    time = parseInt(kv.value);
                }
            }
        }
        obj.score = score;
        obj.time = time;
        return obj;
    }

    /**
     * 根据时间戳获取本周一日期
     * @param value 时间戳毫秒
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

    //转换数据列表
    private changeDataList(value: any[]): any[] {
        let arr: any[] = [];
        if (!value) return arr;
        let nowWeekOne: number = this.getWeekOneDayByTime(this._curTime);
        console.log("time", nowWeekOne)
        let len: number = value.length;
        console.log("len", len)
        for (let i: number = 0; i < len; i++) {

            let obj = this.changeDataSingele(value[i]);
            //过滤下时间  每周清榜
            if (!obj /*|| obj.time != nowWeekOne*/) continue;
            arr.push(obj);
        }
        //排下序
        arr.sort(this.sortByScore);
        return arr;
    }
    private sortByScore(a: any, b: any): number {
        return b.score - a.score;
    }

    //打开排行榜
    public openSort(): void {
        //console.log("子域openSort")
        if (!this._sortPage) {
            this._sortPage = new SortPage(this);
            // this._sortPage.resize(this._clientWidth,this._clientHeight, false);
        }
        if (!this._sortPage.isOpened) {
            this._sortPage.open();
        }
        // else{
        //     this._sortPage.close();
        // }
    }
    //设置排行榜数据
    public setSortData(data: any): void {
        if (!this._sortPage) {
            this.openSort();
        }
        if (this._sortPage)
            this._sortPage.setData(data);
    }

    //设置单个或者多个头像数据
    public setSingleShow(data: any, type,score:number): void {
        console.log("老子要打开页面了", data, type)
        if (!this._singleShowPage) {
            this._singleShowPage = new singleShowPage(this);
        }
        if (this._singleShowPage) {
            this._singleShowPage.setData(data, type,score);
        }
    }

    //设置超越
    public setChaoYue(data,score){
        if (!this._chaoyuePage) {
            this._chaoyuePage = new chaoyue(this);
        }
        this._chaoyuePage.setData(data,score)
    }

    public setChaoYueClean(){
        if (!this._chaoyuePage) {
            this._chaoyuePage = new chaoyue(this);
        }
        this._chaoyuePage.clean();
    }

    //关闭页面
    private closePage(type: string): void {
        if (type == "sort") {
            if (this._sortPage) this._sortPage.close();
        }
        else if (type == "result") {
            if (this._resultPage) this._resultPage.close();
        }
        else if (type == "singlePage" || type == "thirdHead") {
            console.log("老子被关闭啦啊啊啊啊啊", type, this._singleShowPage);
            if (this._singleShowPage) {
                this._singleShowPage.close();
                this._singleShowPage = null;
            }
        }
    }



    //打开结算
    public openResult(type: number, score: number, data: any): void {
        console.log("子域openSort" + type + '|' + score)
        //更新自己的得分
        if (this.wxSelfInfo) {
            this.wxSelfInfo.newScore = score;
        }

        if (!this._resultPage) {
            console.log('type,score===' + type + '|' + score)
            this._resultPage = new ResultPage(this);
        }
        if (!this._resultPage.isOpened) {
            console.log('type,score' + type + '|' + score)
            this._resultPage.open();
            this._resultPage.setData(type, score, data);
        }
        else {
            this._resultPage.close();
        }

        //结束了判断下成绩是否上传
        if (this.wxSelfInfo) {
            let nowWeekOne: number = this.getWeekOneDayByTime(this._curTime);
            //不是本周的了  或 成绩提高了 需要上传
            if (this.wxSelfInfo.time != nowWeekOne || this.wxSelfInfo.score < score) {
                this.wxSelfInfo.score = score;
                this.wxSelfInfo.time = nowWeekOne;
                let api: any = window["externalInterfacePI"];
                if (api) {
                    api.updateSelfCloundData(score, nowWeekOne);
                }
            }
        }
    }

    //打开
    public updateSelfScore(score: number, etype: number): void {
        console.log("子域openSort")
        //更新自己的得分
        if (this.wxSelfInfo) {
            this.wxSelfInfo.newScore = score;
            //结束了判断下成绩是否上传
            if (etype == 1) {
                let nowWeekOne: number = this.getWeekOneDayByTime(this._curTime);
                //不是本周的了  或 成绩提高了 需要上传
                console.log("+++++++++++++++++++++++++++++++++++++++++++++:" + score);
                if (this.wxSelfInfo.score < score) {
                    console.log("上传乘成绩了" + score);
                    this.wxSelfInfo.score = score;
                    this.wxSelfInfo.time = nowWeekOne;
                    let api: any = window["externalInterfacePI"];
                    if (api) {
                        api.updateSelfCloundData(score, nowWeekOne);
                    }
                }
            }
        }
    }
}
let game = new GameMain();
game.addListen();