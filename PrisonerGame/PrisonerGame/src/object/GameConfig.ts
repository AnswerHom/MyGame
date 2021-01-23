export class StageConfig {
    /**玩家出牌阶段 */
    static STAGE_CP: number = 0;
    /**选择目标玩家阶段 */
    static STAGE_XZWJ: number = 1;
    /**选择卡牌阶段 */
    static STAGE_XZKP: number = 2;
    /**玩家看牌阶段 */
    static STAGE_KP: number = 3;
    /**回合结束 */
    static STAGE_JS: number = 4;
    /**游戏结束 */
    static STAGE_YXJS: number = 5;

    /**卡牌步骤配置 */
    static CONFIG: { [type: number]: number[] };
}