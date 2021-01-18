/**
 * 卡牌配置
 */
export class CardConfig {
    /**犯人 */
    static TYPE_FR: number = 0;
    /**共犯 */
    static TYPE_GF: number = 1;
    /**不在场证明 */
    static TYPE_BZCZM: number = 2;
    /**侦探 */
    static TYPE_ZT: number = 3;
    /**第一发现者 */
    static TYPE_DYFXZ: number = 4;
    /**神犬 */
    static TYPE_SQ: number = 5;
    /**谣言 */
    static TYPE_YY: number = 6;
    /**情报交换 */
    static TYPE_QBJH: number = 7;
    /**交易 */
    static TYPE_JY: number = 8;
    /**目击者 */
    static TYPE_MJZ: number = 9;
    /**普通人 */
    static TYPE_PTR: number = 10;

    /**随机卡池 */
    static RANDOM_POOL: number[] = [
        CardConfig.TYPE_SQ,//神犬
        CardConfig.TYPE_MJZ,//目击者X3
        CardConfig.TYPE_MJZ,
        CardConfig.TYPE_MJZ,
        CardConfig.TYPE_PTR,//普通人X2
        CardConfig.TYPE_PTR,
        CardConfig.TYPE_YY,//谣言X5
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_YY,
        CardConfig.TYPE_QBJH,//情报交换X4
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_QBJH,
        CardConfig.TYPE_JY,//交易X4
        CardConfig.TYPE_JY,
        CardConfig.TYPE_JY,
        CardConfig.TYPE_JY,
    ];

    /**
     * 获得卡牌名字
     * @param type 
     */
    static getCardName(type: number): string {
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