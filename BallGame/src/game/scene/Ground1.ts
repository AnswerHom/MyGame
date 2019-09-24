import { Ground } from "./Ground";
import { Building } from "./Building";

/**
 * 单个障碍物
 */
export class Ground1 extends Ground {
    static poolName = "Ground1";
    private _building: Building;
    constructor() {
        super();
        this._building = new Building(2, 2, 2);
        this.addChild(this._building);
    }

    init() {
        super.init();
        //随机个位置
        let offsetX = -4 + 8 * Math.random()
        this._building.setPos(this.transform.position.x + offsetX, this.transform.position.y + 1, this.transform.position.z);
    }
}