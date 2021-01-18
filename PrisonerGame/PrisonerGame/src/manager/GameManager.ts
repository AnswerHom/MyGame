import { PlayerInfo } from "../object/player/PlayerInfo";
import { BaseCard } from "../object/card/BaseCard";
import { CardConfig } from "../object/card/CardConfig";
import { MathU } from "../utils/MathU";

export class GameManager {
    static PLAYER_CARD_COUNT: number = 4;

    /**玩家数组 */
    players: PlayerInfo[];
    /**当前人数 */
    curPlayerCount: number = 0;
    /**卡池 */
    cardsPool: BaseCard[];
    /**犯人阵营 */
    prisonerArr: PlayerInfo[];

    /**
     * 初始游戏
     * @param count 游戏人数
     */
    initGame(count: number) {
        this.curPlayerCount = count;
        this.players = [];
        this.prisonerArr = [];
        for (let i = 0; i < count; i++) {
            let info = new PlayerInfo();
            info.index = i;
            this.players.push(info);
        }
        this.initCard(count);
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
    private initCard(count: number) {
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
     * 使用卡牌
     * @param index 
     * @param source 
     * @param sourceIndex 
     * @param target 
     * @param targetIndex 
     */
    useCard(index: number, source: PlayerInfo, sourceIndex: number = -1, target: PlayerInfo, targetIndex: number = -1): void {
        //先扣除使用卡
        let card = source.removeCard(index);
        if (!card) return;
        let type = card.type;
        switch (type) {
            case CardConfig.TYPE_FR://犯人
                //比赛结束
                this.endGame();
                break;
            case CardConfig.TYPE_GF://共犯
                this.prisonerArr.push(source);
                break;
            case CardConfig.TYPE_BZCZM://不在场证明
                break;
            case CardConfig.TYPE_ZT://侦探
                let flag1 = this.checkPrisoner(target);
                if (flag1) {
                    //比赛结束
                    this.endGame();
                }
                break;
            case CardConfig.TYPE_DYFXZ: //第一发现者
                break;
            case CardConfig.TYPE_SQ://神犬

                break;
            case CardConfig.TYPE_YY: //谣言
                break;
            case CardConfig.TYPE_QBJH://情报交换
                break;
            case CardConfig.TYPE_JY: //交易
                this.exchangeCard(source, sourceIndex, target, targetIndex);
                break;
            case CardConfig.TYPE_MJZ: //目击者
                break;
            case CardConfig.TYPE_PTR: //普通人
                break;
        }

    }

    endGame() {

    }
}