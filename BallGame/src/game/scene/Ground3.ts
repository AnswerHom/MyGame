import { Ground } from "./Ground";
import { Building } from "./Building";
import { AddSpeedArea } from "./AddSpeedArea";

/**
 * 有通道的障碍物
 */
export class Ground3 extends Ground {
    static poolName = "Ground3";
    private _area: AddSpeedArea;

    constructor() {
        super();
        this._area = new AddSpeedArea();
        this.addChild(this._area);
    }

    init() {
        super.init();
        if (this._area) {
            let offsetX = -3 + 6 * Math.random();
            this._area.setPos(offsetX, 0.5, 5);
        }
    }
}