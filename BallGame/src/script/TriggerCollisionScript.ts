import { CollideGroup } from "../game/manager/MapManager";

export class TriggerCollisionScript extends Laya.Script3D {
	public owner: Laya.MeshSprite3D;
	constructor() {
		super();
	}

	public onTriggerEnter(other: Laya.PhysicsComponent): void {
		if (this.owner && other.collisionGroup == CollideGroup.BUILDING) {
			this.owner.removeSelf();
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