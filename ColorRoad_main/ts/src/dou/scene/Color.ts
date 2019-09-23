/**
* 颜色渐变
*/
module dou.scene{

	export class Color{

		private _r:number = 0;
        private _g:number = 0;
        private _b:number = 0;
        private _min:number = 0;
        private _max:number = 255;
        private _step:number = 1;

        private __add:boolean = true;
        private __index:number = 0;

	
		constructor(min:number = 0, max:number = 255, step:number = 1)
		{
            this._min = min;
            this._max = max;
            this._step = step;
            this._r = min;
            this._g = max;
            this._b = min;
            this.__index = 0;
            this.__add = true;
		}

        public init(r:number, g:number, b:number){
            this._r = r
            this._g = g
            this._b = b
        }

        public get r():number
        {
            return this._r;
        }

        public get g():number
        {
            return this._g;
        }
        public get b():number
        {
            return this._b;
        }

        public updateColor():void
        {
            let diff:number = this.__add ? this._step:-this._step;
            switch (this.__index) {
                case 0: this._r = this.checkValue(this._r+diff); break;
                case 1: this._g = this.checkValue(this._g+diff); break;
                case 2: this._b = this.checkValue(this._b+diff); break;
                default: break;
            }
        }
        //检测数值
        private checkValue(value:number):number{
            if(value > this._min && value < this._max) return value;
            if(value < this._min) value = this._min;
            if(value > this._max) value = this._max;
            this.__index = (this.__index+1)%3;
            this.__add = !this.__add;
            return value;
        }
	}
}