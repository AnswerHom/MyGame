import { BaseCard } from "../card/BaseCard";

export class PlayerInfo {
    /**无法操作 */
    static STATE_NONE: number = 0;
    /**到了出牌回合 */
    static STATE_TURN: number = 1;
    /**选择玩家 */
    static STATE_SELECT_PLAYER: number = 2;
    /**选择自己的牌 */
    static STATE_SELECT_SELF_CARD: number = 3;
    /**选择他人的牌 */
    static STATE_SELECT_OTHER_CARD: number = 4;
    /**等待他人阶段 */
    static STATE_WAIT: number = 5;
    /**查看他人牌 */
    static STATE_WATCH_OTHER: number = 6;

    /**序号 */
    index: number = 0;
    /**当前分数 */
    score: number = 0;
    /**当前牌组 */
    cards: BaseCard[];
    /**玩家状态 */
    state: number = 0;
    /**目标玩家 */
    target: PlayerInfo = null;
    /**选择卡牌序号 */
    targetIndex: number = -1;

    /**
     * 根据类型获得卡
     * @param type 
     */
    getCardByType(type: number): BaseCard {
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (!card) continue;
            if (card.type == type) return card;
        }
        return null;
    }

    /**
     * 根据顺序拿卡
     * @param index 
     */
    getCardByIndex(index: number): BaseCard {
        if (this.cards.length >= index) return null;
        return this.cards[index];
    }

    /**
     * 获得卡牌
     * @param card 
     */
    addCard(card: BaseCard) {
        this.cards.push(card);
    }

    /**
     * 丢弃卡牌
     * @param index 
     */
    removeCard(index: number): BaseCard {
        let arr = this.cards.splice(index, 1);
        return arr[0];
    }

    /**选择玩家 */
    selectTarget(target: PlayerInfo) {
        if (this.state == PlayerInfo.STATE_SELECT_PLAYER) {
            this.target = target;
            this.state = PlayerInfo.STATE_NONE;
        }
    }

    /**选择卡牌 */
    selectCard(index: number) {
        if (this.state == PlayerInfo.STATE_SELECT_SELF_CARD || this.state == PlayerInfo.STATE_SELECT_OTHER_CARD) {
            this.targetIndex = index;
            this.state = PlayerInfo.STATE_NONE;
        }
    }

    showHand(): void {
        let str = "";
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (!card) continue;
            str += card.name + ",";
        }
        console.log("=============> player" + this.index + "  score:" + this.score + "  cards:" + str);
    }
}