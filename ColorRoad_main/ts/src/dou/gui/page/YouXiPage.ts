/**
* name 
*/
module dou.gui.page {
	export class YouXiPage extends dou.gui.base.Page {
		private _viewUI: ui.YouXiUI;
		//当前combo数
		public curCombo: number = 0;
		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this._isModal = false;
			this._asset = [Path.uiAtlas + "play.atlas"];
		}

		// 页面初始化函数
		protected init(): void {
			//初始化进度条
			// this.y = 400;
			this._viewUI = this._view = new ui.YouXiUI();
			this.addChild(this._view);
		}

		private _time: number = 0;
		private _isEnd: boolean = false;
		protected onOpen(): void {
			super.onOpen();

			this.reset();
			//每30毫秒更新一次
			Laya.timer.loop(30, this, this.update);

			this._viewUI.txt_road_t.visible = false;
			this._viewUI.img_gem.visible = false;
			this._viewUI.txt_get_coin.visible = false;
			this._viewUI.txt_speed1.visible = false;
			this._viewUI.txt_beishu.visible = false;
			this._viewUI.txt_dis.visible = false;
		}

		private _playerScript: PlayerBaseScript;
		private reset(): void {
			this._isEnd = false;
			this._time = 0;
			this._dis = 0;
			this._diffTime = 0;
			this._totoalTime = 0;
			this._curAddTime = 0;

			this._viewUI.txt_dis.text = "0米";
			// this._viewUI.txt_remain.text = "剩50名";
			this._viewUI.txt_time.text = this._time + "秒";
			// this._viewUI.txt_taotai.text = "已超过0名玩家";
			this._viewUI.progress_power.value = 0;
			this._viewUI.progress_speed.value = 0;
			this._viewUI.txt_speed.text = "0";
			this._playerScript = this._app.sceneRoot.mainPlayer.playerScript;
		}

		//流程，1.不在combo状态：非无敌状态速度达到x，进入状态，无敌状态踩到方块才进入状态 2.在combo状态：踩到加速带直接重置状态时间，combo数+
		initTime(): void {
			this._curComBoTime = 0;
			this.updateComBo();
			this.isDaoJiShi = true;
			Laya.timer.loop(1000, this, this.updateComBo);
		}

		setTime(): void {
			this._curComBoTime = 0;
		}

		private _curComBoTime: number = 0;
		//是否正处于倒计时中
		public isDaoJiShi: boolean = false;
		private updateComBo(): void {
			if (this._curComBoTime >= 2) {
				this.curCombo = 0;
				this._curComBoTime = 0;
				this.isDaoJiShi = false;
				Laya.timer.clear(this, this.updateComBo);
			}
			this._curComBoTime += 1;
		}

		private _dis: number = 0;
		//每毫秒增加这些能量 value / 每20秒加速一次 / 1000毫秒
		private _powerDiff: number = (1 / 20 / 1000);
		//能量条满一下需要的时间
		private _diffTime: number;
		private _totoalTime: number;
		private _isaddSpeed: boolean = false;
		private _curAddTime: number;
		//前后的combo值
		private _comboDiff: number;
		private update(): void {
			if (this._isEnd) {
				this._viewUI.txt_speed.text = "0";
				return;
			}
			this._time += 30;
			this._diffTime += 30;
			this._isEnd = !this._app.sceneRoot.isGamePlay();

			this._viewUI.txt_time.text = (this._time / 1000).toFixed(0) + "秒";
			// this._viewUI.txt_dis.text = (this._playerScript .diff_z* 10).toFixed(0) + "米";
			this._viewUI.txt_score.text = this._app.sceneRoot.PlayScore.toFixed(0);
			let taotai: number = this._app.sceneRoot.getScore();
			if (taotai > SceneRoot.GAME_TOTAL_NUM) {
				taotai = SceneRoot.GAME_TOTAL_NUM;
			}
			// this._viewUI.txt_remain.text = "";
			// this._viewUI.txt_taotai.text = "已超过" + taotai.toFixed(0) + "名玩家"
			//能量条
			this._viewUI.progress_power.value = this._powerDiff * this._diffTime;
			//时速条
			let cuuSpeed = this.caculateSpeed();
			let maxSpped = this.caculateSpeed(true);
			this._viewUI.progress_speed.value = cuuSpeed / maxSpped;
			//加速条颜色变化
			if (cuuSpeed <= 60) {
				//红色
				this._viewUI.progress_speed.skin = "tongyong/progress_xuetiao4.png";
			} else if (cuuSpeed < 180) {
				//橙色
				this._viewUI.progress_speed.skin = "tongyong/progress_xuetiao3.png";
			}
			else if (cuuSpeed >= 180) {
				//绿色
				this._viewUI.progress_speed.skin = "tongyong/progress_xuetiao2.png";
			}
			//时速数值
			this._viewUI.txt_speed.text = StringU.substitute("{0}", cuuSpeed);
			//能量条加速
			if (this._viewUI.progress_power.value >= 1) {
				//加速持续5秒，并且添加上无敌盾
				if(!this._viewUI.ani2.isPlaying)
					this._viewUI.ani2.play(0, false);
				if (!this._isaddSpeed) {
					this._playerScript.addWuDi();
					this._isaddSpeed = true;
					//记录下当前时间
					this._curAddTime = this._diffTime;
				}
				//持续五秒,还要在加上粒子消失的时间大概有1.5秒，也就无敌总时间有6.5秒
				if (this._diffTime >= this._curAddTime + 2500 && this._isaddSpeed) {
					// this._playerScript.removeWuDi();
					this._viewUI.progress_power.value = 0;
					this._diffTime = 0;
					this._isaddSpeed = false;
				}
			} else {
				this._viewUI.img_power.visible = false;
				this._viewUI.ani2.stop();
			}
			//时速
			if (cuuSpeed == 60/*this._viewUI.progress_speed.value >= 0.98*/) {
				//达不到最大值1  无敌最大只能加到0.013952
				if (!this._viewUI.ani3.isPlaying)
					this._viewUI.ani3.play(0, false);
			} else {
				this._viewUI.img_speed.visible = false;
				this._viewUI.ani3.stop();
			}
			if (this.curCombo <= 1) {
				// this._viewUI.img_combo.visible = false;
				if (this._viewUI.ani1.isPlaying) {
					this._viewUI.ani1.stop();
				}
			} else {
				////com值有变化，才出来
				if (this._comboDiff) {
					if (this._comboDiff == this.curCombo) {
						return;
					} else {
						this._comboDiff = this.curCombo;
					}
				} else {
					//第一次进储存
					this._comboDiff = this.curCombo;
				}
				// this._viewUI.txt_num.text = (this.curCombo - 1).toString();
				//开始倒计时3秒，3秒内数值没有更换combo清零
				// if (!this._viewUI.ani1.isPlaying) {
				this._viewUI.ani1.play(0, false);
				// }
			}
		}

		//时速计算公式
		private caculateSpeed(isMax: boolean = false): number {
			let curSpeed = isMax ? PlayerBaseScript.maxSpeed : this._playerScript.speed_Z;
			let baseSpeed = PlayerBaseScript.baseSpeed;
			let cur0 = 1 + (curSpeed - baseSpeed) / 0.001;
			let cur1 = Math.pow(cur0, 3);
			let speed: number = Math.round(0.56 * cur1 + 13.68 * cur0 + 45.76);
			return speed;
		}

		public close(): void {
			this.reset();
			Laya.timer.clearAll(this);
			super.close();

		}

	}
}