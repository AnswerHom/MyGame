import { Ground } from "./Ground";
import { Building } from "./Building";

export class Ground2 extends Ground {
    static poolName = "Ground2";

    constructor() {
        super();
        //两个长方体组成
        let long = 2 + Math.floor(6 * Math.random());
        let x = -5 + long / 2;
        let hollLong = 2;
        for (let i = 0; i < 2; i++) {
            let wall = new Building(long, 2, 2);
            this.addChild(wall);
            let pos1 = wall.transform.position;
            let groundPos = this.transform.position;
            pos1.setValue(groundPos.x + x, groundPos.y + 1, groundPos.z + 1);
            wall.transform.position = pos1;
            let newLong = 10 - long - hollLong;
            x = -5 + long + hollLong + newLong / 2;
            long = newLong;
        }
    }
}