import { CollideGroup } from "../game/manager/MapManager";
import { Ball } from "../game/scene/Ball";
import { GameApp } from "../game/GameApp";
import { SceneRoot } from "../game/SceneRoot";

export class TriggerCollisionScript extends Laya.Script3D {
	public owner: Laya.MeshSprite3D;
	constructor() {
		super();
	}

	public onTriggerEnter(other: Laya.PhysicsComponent): void {
		if (!this.owner) return;
		if (other.collisionGroup == CollideGroup.BUILDING) {
			if (this.owner instanceof Ball) {
				if (this.owner.isMainPlayer) {
					GameApp.instance.sceneRoot.ballDead(this.owner);
				}
			}
		} else if (other.collisionGroup == CollideGroup.ADD_SPEED) {
			if (this.owner instanceof Ball) {
				this.owner.addSpeed();
			}
		}
	}

	public onTriggerStay(other: Laya.PhysicsComponent): void {

	}

	public onTriggerExit(other: Laya.PhysicsComponent): void {

	}

	public onCollisionEnter(collision: Laya.Collision): void {

	}

	public onCollisionStay(collision: Laya.Collision): void {
	}

	public onCollisionExit(collision: Laya.Collision): void {
	}

}