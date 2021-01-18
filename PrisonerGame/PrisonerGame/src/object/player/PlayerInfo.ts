import { BaseCard } from "../card/BaseCard";

export class PlayerInfo {
    /**序号 */
    index: number = 0;
    /**当前分数 */
    score: number = 0;
    /**当前牌组 */
    cards: BaseCard[];

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

    addCard(card: BaseCard) {
        this.cards.push(card);
    }

    removeCard(index: number): BaseCard {
        let arr = this.cards.splice(index, 1);
        return arr[0];
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