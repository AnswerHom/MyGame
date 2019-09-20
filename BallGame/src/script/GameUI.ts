import { ui } from "./../ui/layaMaxUI";
import { MapManager } from "../game/manager/MapManager";
import { Ball } from "../game/scene/Ball";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
	private mat1: Laya.BlinnPhongMaterial;
	private newScene: Laya.Scene3D;
	private _mapManager: MapManager;
	private _mainPlayer: Ball;
	private _ballList: Ball[];
	private _camera: Laya.Camera;

	constructor() {
		super();
		this._ballList = [];
		this.newScene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

		//初始化照相机
		this._camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
		this._camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

		//方向光
		var directionLight = new Laya.DirectionLight();
		this.newScene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
		//设置平行光的方向
		var mat = directionLight.transform.worldMatrix;
		mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
		directionLight.transform.worldMatrix = mat;

		this._mapManager = new MapManager(this.newScene);
		this, this.addMainPlayer();
		Laya.timer.frameLoop(1, this, this.update);
	}

	private addMainPlayer(): void {
		this._mainPlayer = new Ball();
		Laya.timer.once(100, this, this.onAddMainPlayer);
	}

	private onAddMainPlayer(): void {
		if (this._mapManager)
			this._mapManager.setMainPlayer = this._mainPlayer;
		this.newScene.addChild(this._mainPlayer);
		let pos = this._mainPlayer.transform.position;
		pos.y = 0.5;
		this._mainPlayer.transform.position = pos;
		this._ballList.push(this._mainPlayer);
	}

	private update(): void {
		let diff = Laya.timer.delta;
		this._mapManager && this._mapManager.update(diff);
		if (this._ballList) {
			let len = this._ballList.length;
			for (let i = 0; i < len; i++) {
				let ball = this._ballList[i];
				ball && ball.update(diff);
			}
		}
		//相机
		if (this._camera && this._mainPlayer) {
			let pos = this._camera.transform.position;
			let playerPos = this._mainPlayer.transform.position;
			pos.setValue(playerPos.x, playerPos.y + 6, playerPos.z + 9.5);
			this._camera.transform.position = pos;
		}
	}
}