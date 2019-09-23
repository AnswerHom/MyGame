/**
* name 
*/
module dou{
	export class BlackBorder extends  dou.gui.base.Container{
		// private 
		constructor(app: GameApp) {
			super(app);
		}

		update(diff: number): void {
			
		}

		resize(w: number, h: number): void {
			super.resize(w, h);
			const desginPixelW = 720;
			const desginPixelH = 1280;
				let scaleX = this._clientWidth / desginPixelW;
				let scaleY = this._clientHeight / desginPixelH;
				let scale = Math.min(scaleX, scaleY);
			const cl = TeaStyle.COLOR_BLACK;
			let borderWidth = (w - desginPixelW * scale) / 2;
			this.graphics.clear();
			this.graphics.drawRect(0, 0, borderWidth, desginPixelH * scale, cl);
			this.graphics.drawRect(w - borderWidth, 0, desginPixelW * scale, desginPixelH * scale, cl);
		}
	}
}