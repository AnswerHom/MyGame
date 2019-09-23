import { Ground } from "./Ground";
import { Building } from "./Building";

export class Ground1 extends Ground {
    static poolName = "Ground1";

    constructor() {
        super();
        let building = new Building(2, 2, 2);
        this.addChild(building);
        let offsetX = -4 + 8 * Math.random()
        building.setPos(this.transform.position.x + offsetX, this.transform.position.y + 1, this.transform.position.z);
    }
}