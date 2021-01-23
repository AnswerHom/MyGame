import { PlayerInfo } from "../object/player/PlayerInfo";
import { BaseCard } from "../object/card/BaseCard";
import { CardConfig } from "../object/card/CardConfig";
import { MathU } from "../utils/MathU";
import { StageConfig } from "../object/GameConfig";

export class GameManager {
    static PLAYER_CARD_COUNT: number = 4;

    /**玩家数组 */
    players: PlayerInfo[];
    /**当前人数 */
    playerCount: number = 0;
    /**卡池 */
    cardsPool: BaseCard[];
    /**犯人阵营 */
    prisonerArr: PlayerInfo[];

    /**
     * 初始游戏
     * @param count 游戏人数
     */
    initGame(count: number) {
        this.playerCount = count;
        this.players = [];
        this.prisonerArr = [];
        for (let i = 0; i < count; i++) {
            let info = new PlayerInfo();
            info.index = i;
            this.players.push(info);
        }
        this.initCard(count);
        this.initGameConfig();
        this.dealCard();
        this.showPlayerState();
    }

    private showPlayerState() {
        if (!this.players) return;
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.showHand();
        }
    }

    /**
     * 初始需要的卡组
     * @param count 游戏人数
     */
    private initCard(count: number): void {
        this.cardsPool = [];
        let randomCount = 0;
        this.cardsPool.push(this.createCard(CardConfig.TYPE_DYFXZ));
        this.cardsPool.push(this.createCard(CardConfig.TYPE_FR));
        switch (count) {
            case 3:
                //第一发现者，犯人，侦探，不在场证明+随机8张
                this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                randomCount = 8;
                break;
            case 4:
                //第一发现者，犯人，侦探，不在场证明，共犯+随机11张
                this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                randomCount = 11;
                break;
            case 5:
                //第一发现者，犯人，侦探，不在场证明x2，共犯+随机14张
                this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                randomCount = 14;
                break;
            case 6:
                // 第一发现者，犯人，侦探x2，不在场证明x2，共犯x2+随机16张
                this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_ZT));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_BZCZM));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                this.cardsPool.push(this.createCard(CardConfig.TYPE_GF));
                randomCount = 16;
                break;
            case 7:
                //第一发现者，犯人，侦探x2，不在场证明x3，共犯x2+随机19张
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
        } else {
            let idxArr = MathU.randomRangeArr(0, CardConfig.RANDOM_POOL.length, randomCount);
            for (let i = 0; i < randomCount; i++) {
                let idx = idxArr[i];
                this.cardsPool.push(this.createCard(CardConfig.RANDOM_POOL[idx]));
            }
        }
    }

    /**初始化游戏配置 */
    private initGameConfig(): void {
        StageConfig.CONFIG[CardConfig.TYPE_FR] = [StageConfig.STAGE_YXJS];
        StageConfig.CONFIG[CardConfig.TYPE_GF] = [StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_SQ] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_XZKP, StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_ZT] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_BZCZM] = [StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_DYFXZ] = [StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_PTR] = [StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_MJZ] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_KP, StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_YY] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_XZKP, StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_JY] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_XZKP, StageConfig.STAGE_JS];
        StageConfig.CONFIG[CardConfig.TYPE_QBJH] = [StageConfig.STAGE_XZWJ, StageConfig.STAGE_XZKP, StageConfig.STAGE_JS];
    }

    /**
     * 发牌
     */
    private dealCard(): void {
        if (!this.players || this.players.length <= 0) return;
        let count = this.players.length;
        let idxArr = MathU.randomRangeArr(0, this.cardsPool.length, count * GameManager.PLAYER_CARD_COUNT);
        for (let i = 0; i < count; i++) {
            let player = this.players[i];
            player.cards = [];
            player.addCard(this.cardsPool[idxArr[4 * i]]);
            player.addCard(this.cardsPool[idxArr[4 * i + 1]]);
            player.addCard(this.cardsPool[idxArr[4 * i + 2]]);
            player.addCard(this.cardsPool[idxArr[4 * i + 3]]);
        }
        //发完牌清空卡池
        this.cardsPool = [];
    }

    /**
     * 制造卡牌
     * @param type 
     */
    private createCard(type: number): BaseCard {
        let card = new BaseCard();
        card.type = type;
        card.name = CardConfig.getCardName(type);
        return card;
    }

    /**
     * 卡牌变动
     * @param source 
     * @param sourceIndex  
     * @param target 
     * @param targetIndex 
     */
    exchangeCard(source: PlayerInfo, sourceIndex: number = -1, target: PlayerInfo, targetIndex: number = -1) {
        let sourceCard: BaseCard;
        if (sourceIndex >= 0) {
            sourceCard = source.removeCard(sourceIndex);
        }
        let targetCard: BaseCard;
        if (targetIndex >= 0) {
            targetCard = target.removeCard(targetIndex);
        }
        if (sourceCard) {
            target.addCard(sourceCard);
        }
        if (targetCard) {
            source.addCard(targetCard);
        }
    }

    /**
     * 检查是否是犯人
     * @param target 目标玩家
     */
    checkPrisoner(target: PlayerInfo): boolean {
        let frCard = target.getCardByType(CardConfig.TYPE_FR);
        if (!frCard) return false;
        //如果是犯人看有没有不在场证明
        let zmCard = target.getCardByType(CardConfig.TYPE_BZCZM);
        if (zmCard) return false;
        return true;
    }

    /**
     * 主心跳
     * @param diff 
     */
    private _timer: number = 0;
    update(diff: number) {
        this._timer += diff;
        if (this._timer >= 1000) {
            this._timer = 0;
            //检查所有玩家状态
            if (this.curStage >= 0 && this.curStage != StageConfig.STAGE_YXJS) {
                for (let i = 0; i < this.players.length; i++) {
                    let player = this.players[i];
                    if (player.state != PlayerInfo.STATE_NONE) return;
                }
                //如果所有玩家都是None状态就自动下一步
                if (this.curStageArr && this.curStageArr.length > 0)
                    this.updateProgress();
                else {
                    throw new Error("游戏异常：玩家状态都为None但没有流程可以继续！");
                }
            }
        }
    }


    ////////////////// 游戏流程 /////////////////////
    /**当前出牌序号 */
    public curIndex: number = 0;
    /**当前卡牌类型 */
    public curCardType: number = -1;
    /**当前需要进行的流程 */
    public curStageArr: number[];
    /**当前流程 */
    public curStage: number = -1;
    /**当前流程发起者 */
    public sourcePlayer: PlayerInfo;

    /**
     * 使用卡牌
     * @param source 出牌人
     * @param index 出牌序号
     */
    useCard(source: PlayerInfo, index: number): void {
        //先扣除使用卡
        let card = source.removeCard(index);
        if (!card) return;
        this.curCardType = card.type;
        if (card.type == CardConfig.TYPE_DYFXZ) {
            this.curIndex = source.index;
            this.onTurnEnd();
        } else {
            this.curStageArr = StageConfig.CONFIG[card.type].concat();
            this.sourcePlayer = source;
            this.updateProgress();
        }
    }

    /**更新流程 */
    private updateProgress(): void {
        if (this.curCardType >= 0 && this.curStageArr && this.curStageArr.length > 0) {
            let stage = this.curStageArr.shift();
            if (stage) {
                this.curStage = stage;
                switch (stage) {
                    case StageConfig.STAGE_XZWJ://选择玩家
                        this.onSelectTargetStage(this.sourcePlayer, this.curCardType);
                        break;
                    case StageConfig.STAGE_XZKP://选择卡牌
                        this.onSelectCard(this.sourcePlayer, this.curCardType);
                        break;
                    case StageConfig.STAGE_KP://看牌
                        break;
                    case StageConfig.STAGE_JS://回合结束
                        this.onTurnEnd();
                        break;
                    case StageConfig.STAGE_YXJS://游戏结束
                        this.onEndGame();
                        break;
                }
            }
        }
    }

    /**选择目标玩家 */
    private onSelectTargetStage(sourcePlayer: PlayerInfo, type: number): void {
        switch (type) {
            case CardConfig.TYPE_SQ://神犬
            case CardConfig.TYPE_ZT://侦探
            case CardConfig.TYPE_MJZ://目击者
            case CardConfig.TYPE_JY://交易
                sourcePlayer.state = PlayerInfo.STATE_SELECT_PLAYER;
                break;
            case CardConfig.TYPE_YY://谣言
                //向右手边玩家抽1张牌
                for (let i = 0; i < this.players.length; i++) {
                    let player = this.players[i];
                    let rightIdx = (i + 1) % this.playerCount;
                    player.target = this.players[rightIdx];
                }
                this.updateProgress();
                break;
            case CardConfig.TYPE_QBJH://情报交换
                //自己选1张牌给左手边玩家
                for (let i = 0; i < this.players.length; i++) {
                    let player = this.players[i];
                    let leftIdx = i - 1 < 0 ? this.players.length - 1 : i - 1;
                    player.target = this.players[leftIdx];
                }
                this.updateProgress();
                break;
        }
    }

    /**选择卡牌 */
    private onSelectCard(sourcePlayer: PlayerInfo, type: number): void {
        switch (type) {
            case CardConfig.TYPE_SQ://神犬
                //对方选自己牌
                if (sourcePlayer.target) {
                    sourcePlayer.target.state = PlayerInfo.STATE_SELECT_SELF_CARD;
                } else {
                    throw new Error("神犬-sourcePlayer未选择目标！");
                }
                break;
            case CardConfig.TYPE_YY://谣言
                //向右手边玩家选1张牌
                for (let i = 0; i < this.players.length; i++) {
                    let player = this.players[i];
                    let rightIdx = (i + 1) % this.playerCount;
                    if (player.target) {
                        player.state = PlayerInfo.STATE_SELECT_OTHER_CARD;
                    } else {
                        throw new Error("谣言-player未选择目标！");
                    }
                }
                break;
            case CardConfig.TYPE_JY://交易
                if (sourcePlayer.target) {
                    sourcePlayer.state = PlayerInfo.STATE_SELECT_SELF_CARD;
                    sourcePlayer.target.state = PlayerInfo.STATE_SELECT_SELF_CARD;
                } else {
                    throw new Error("交易-sourcePlayer未选择目标！");
                }
                break;
            case CardConfig.TYPE_QBJH://情报交换
                for (let i = 0; i < this.players.length; i++) {
                    let player = this.players[i];
                    if (player.target) {
                        player.state = PlayerInfo.STATE_SELECT_SELF_CARD;
                    } else {
                        throw new Error("情报交换-player未选择目标！");
                    }
                }
                break;
        }
    }

    /**回合结束 */
    private onTurnEnd(): void {
        //清除状态
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.state = PlayerInfo.STATE_NONE;
            player.target = null;
            player.targetIndex = -1;
        }
        this.sourcePlayer = null;
        this.curStageArr = null;
        this.curStage = -1;
        //下一轮
        this.curIndex = (this.curIndex + 1) % this.playerCount;
        let player = this.players[this.curIndex];
        player.state = PlayerInfo.STATE_TURN;
    }

    /**游戏结束 */
    private onEndGame() {

    }

}