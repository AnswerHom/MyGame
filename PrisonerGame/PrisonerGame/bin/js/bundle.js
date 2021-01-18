(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class PlayerInfo {
        constructor() {
            this.index = 0;
            this.score = 0;
        }
        getCardByType(type) {
            for (let i = 0; i < this.cards.length; i++) {
                let card = this.cards[i];
                if (!card)
                    continue;
                if (card.type == type)
                    return card;
            }
            return null;
        }
        getCardByIndex(index) {
            if (this.cards.length >= index)
                return null;
            return this.cards[index];
        }
        showHand() {
            let str = "";
            for (let i = 0; i < this.cards.length; i++) {
                let card = this.cards[i];
                if (!card)
                    continue;
                str += card.name + ",";
            }
            console.log("=============> player" + this.index + "  cards:" + str);
        }
    }

    class BaseCard {
    }

    class CardConfig {
        static getCardName(type) {
            switch (type) {
                case CardConfig.TYPE_FR: return "犯人";
                case CardConfig.TYPE_GF: return "共犯";
                case CardConfig.TYPE_BZCZM: return "不在场证明";
                case CardConfig.TYPE_ZT: return "侦探";
                case CardConfig.TYPE_DYFXZ: return "第一发现者";
                case CardConfig.TYPE_SQ: return "神犬";
                case CardConfig.TYPE_YY: return "谣言";
                case CardConfig.TYPE_QBJH: return "情报交换";
                case CardConfig.TYPE_JY: return "交易";
                case CardConfig.TYPE_MJZ: return "目击者";
                case CardConfig.TYPE_PTR: return "普通人";
            }
        }
    }
    CardConfig.TYPE_FR = 0;
    CardConfig.TYPE_GF = 1;
    CardConfig.TYPE_BZCZM = 2;
    CardConfig.TYPE_ZT = 3;
    CardConfig.TYPE_DYFXZ = 4;
    CardConfig.TYPE_SQ = 5;
    CardConfig.TYPE_YY = 6;
    CardConfig.TYPE_QBJH = 7;
    CardConfig.TYPE_JY = 8;
    CardConfig.TYPE_MJZ = 9;
    CardConfig.TYPE_PTR = 10;
    CardConfig.RANDOM_POOL = [
        CardConfig.TYPE_SQ,
        CardConfig.TYPE_MJZ,
        CardConfig.TYPE_MJZ,
        CardConfig.TYPE_MJZ,
        CardConfig.TYPE_PTR,
        CardConfig.TYPE_PTR,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_JY,
        CardConfig.TYPE_JY,
        CardConfig.TYPE_JY,
        CardConfig.TYPE_JY,
    ];

    var Point = Laya.Point;
    class MathU {
        constructor() {
        }
        static randomRange(min, max) {
            var range = Math.floor((max - min + 1) * Math.random());
            return range + min;
        }
        static randomRangeArr(min, max, count) {
            let n = [];
            for (var i = min; i < max; i++) {
                n.push(i);
            }
            n.sort(function () {
                return 0.5 - Math.random();
            });
            n.length = count;
            return n;
        }
        static randomRangeNum(min, max, num) {
            let n = [];
            for (var i = min; i < max; i++) {
                if (i != num)
                    n.push(i);
            }
            n.sort(function () {
                return 0.5 - Math.random();
            });
            return n[0];
        }
        static randomRangeArr2(min, max, arr) {
            let n = [];
            for (var i = min; i < max; i++) {
                if (arr.indexOf(i) == -1)
                    n.push(i);
            }
            n.sort(function () {
                return 0.5 - Math.random();
            });
            return n[0];
        }
        static randomPointInCicle(centerPoint, radiusMin, radiusMax) {
            let randomRad = MathU.randomRange(radiusMin, radiusMax);
            let randomAngle = Math.random() * 360;
            let resultPoint = new Point();
            resultPoint.x = centerPoint.x + Math.sin(randomAngle * Math.PI / 180) * randomRad;
            resultPoint.y = centerPoint.y + Math.cos(randomAngle * Math.PI / 180) * randomRad;
            return resultPoint;
        }
        static parseInt(v) {
            if (v >= 0) {
                return Math.floor(v);
            }
            else {
                return Math.ceil(v);
            }
        }
        static getDistance(srcX, srcY, dstX, dstY) {
            var x = srcX - dstX;
            var y = srcY - dstY;
            return Math.sqrt(x * x + y * y);
        }
        static getAngleTimeT(duration) {
            return Number((Laya.timer.currTimer % duration) / duration) * Math.PI;
        }
        static getAngleByRotaion(rotation) {
            rotation %= rotation;
            return Math.PI * Number(rotation / 180);
        }
        static getAngle(srcX, srcY, dstX, dstY) {
            dstX -= srcX;
            dstY -= srcY;
            var ang = Math.atan2(dstY, dstX);
            ang = (ang >= 0) ? ang : 2 * Math.PI + ang;
            return ang;
        }
        static getRotation(angle) {
            return Math.round(Number(angle / Math.PI) * 180);
        }
        static randomBoolen() {
            return Math.round(Math.random()) == 0;
        }
        static colorMatrix_adjust(contrast, brightness) {
            let s = contrast + 1;
            let o = 128 * (1 - s);
            let aMatrix = [s, 0, 0, 0, o,
                0, s, 0, 0, o,
                0, 0, s, 0, o,
                0, 0, 0, 1, 0];
            brightness *= 255;
            let bMatrix = [1, 0, 0, 0, brightness,
                0, 1, 0, 0, brightness,
                0, 0, 1, 0, brightness,
                0, 0, 0, 1, 0];
            return MathU.colorMatrix_concat(aMatrix, bMatrix);
        }
        static colorMatrix_concat(matrixa, matrixb) {
            let sMatrix = new Array(20);
            var i = 0;
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 5; ++x) {
                    sMatrix[i + x] = matrixa[i] * matrixb[x] +
                        matrixa[i + 1] * matrixb[x + 5] +
                        matrixa[i + 2] * matrixb[x + 10] +
                        matrixa[i + 3] * matrixb[x + 15] +
                        (x == 4 ? matrixa[i + 4] : 0);
                }
                i += 5;
            }
            return sMatrix;
        }
        static toHex(num) {
            let rs = "";
            let temp;
            while (num / 16 > 0) {
                temp = num % 16;
                rs = (temp + "").replace("10", "a").replace("11", "b").replace("12", "c").replace("13", "d").replace("14", "e").replace("15", "f") + rs;
                num = Math.floor(num / 16);
            }
            return rs;
        }
        static getRadiusByBox(width, height) {
            let doubleW = Math.pow(width, 2);
            let doubleH = Math.pow(height, 2);
            let radius = Math.sqrt(doubleH + doubleW) / 2;
            return radius;
        }
        static lerp(a, b, t) {
            let c = 0;
            c = a + t * (b - a);
            return c;
        }
        static clearUpReward(arr) {
            let info = [];
            for (let i = 0; i < arr.length / 2; i++) {
                let flag = false;
                let key = arr[i * 2];
                let value = arr[i * 2 + 1];
                for (let j = 0; j < info.length; j++) {
                    if (info[j * 2] == key) {
                        info[j * 2 + 1] += value;
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    info.push(key);
                    info.push(value);
                }
            }
            return info;
        }
    }
    MathU.kTowardCount = 8;

    class GameManager {
        constructor() {
            this.curPlayerCount = 0;
        }
        initGame(count) {
            this.curPlayerCount = count;
            this.players = [];
            for (let i = 0; i < count; i++) {
                let info = new PlayerInfo();
                info.index = i;
                this.players.push(info);
            }
            this.initCard(count);
            this.dealCard();
            for (let i = 0; i < count; i++) {
                let player = this.players[i];
                player.showHand();
            }
        }
        initCard(count) {
            this.cardsPool = [];
            let randomCount = 0;
            this.cardsPool.push(this.createCard(CardConfig.TYPE_DYFXZ));
            this.cardsPool.push(this.createCard(CardConfig.TYPE_FR));
            switch (count) {
                case 3:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    randomCount = 8;
                    break;
                case 4:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    randomCount = 11;
                    break;
                case 5:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    randomCount = 14;
                    break;
                case 6:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    randomCount = 16;
                    break;
                case 7:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    randomCount = 19;
                    break;
                case 8:
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                    randomCount = 19;
                    break;
            }
            if (randomCount >= CardConfig.RANDOM_POOL.length) {
                for (let i = 0; i < randomCount; i++) {
                    this.cardsPool.push(this.createCard(CardConfig.RANDOM_POOL[i]));
                }
            }
            else {
                let idxArr = MathU.randomRangeArr(0, CardConfig.RANDOM_POOL.length, randomCount);
                for (let i = 0; i < randomCount; i++) {
                    let idx = idxArr[i];
                    this.cardsPool.push(this.createCard(CardConfig.RANDOM_POOL[idx]));
                }
            }
        }
        dealCard() {
            if (!this.players || this.players.length <= 0)
                return;
            let count = this.players.length;
            let idxArr = MathU.randomRangeArr(0, this.cardsPool.length, count * GameManager.PLAYER_CARD_COUNT);
            for (let i = 0; i < count; i++) {
                let player = this.players[i];
                player.cards = [];
                player.cards.push(this.cardsPool[idxArr[4 * i]]);
                player.cards.push(this.cardsPool[idxArr[4 * i + 1]]);
                player.cards.push(this.cardsPool[idxArr[4 * i + 2]]);
                player.cards.push(this.cardsPool[idxArr[4 * i + 3]]);
            }
        }
        createCard(type) {
            let card = new BaseCard();
            card.type = type;
            card.name = CardConfig.getCardName(type);
            return card;
        }
    }
    GameManager.PLAYER_CARD_COUNT = 4;

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            let gameMgr = new GameManager();
            gameMgr.initGame(8);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
