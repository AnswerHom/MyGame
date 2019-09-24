import { Ground } from "./Ground";
import { Building } from "./Building";

/**
 * 有通道的障碍物
 */
export class Ground2 extends Ground {
    static poolName = "Ground2";
    private _holeLong: number = 4;
    private _buildingList: Building[] = [];

    constructor() {
        super();
        for (let i = 0; i < 2; i++) {
            let building = new Building();
            this.addChild(building);
            this._buildingList.push(building);
        }
    }

    init() {
        super.init();
        //两个长方体组成
        let long = 2 + Math.floor(4 * Math.random());
        let x = -5 + long / 2;
        for (let i = 0; i < 2; i++) {
            let building = this._buildingList[i];
            if (!building) continue;
            building.size(long, 2, 2);
            this.addChild(building);
            this._buildingList.push(building);
            let pos1 = building.transform.position;
            let groundPos = this.transform.position;
            pos1.setValue(groundPos.x + x, groundPos.y + 1, groundPos.z + 1);
            building.transform.position = pos1;
            let newLong = 10 - long - this._holeLong;
            x = -5 + long + this._holeLong + newLong / 2;
            long = newLong;
        }
    }
}