/**
* 场景 
*/
module dou {
    export class BaseScene extends Laya.Sprite {
        protected _isShow:boolean = false;
        //场景载体
        protected _scene: Laya.Scene;
        private _url:string;
        public get scene(): Laya.Scene {
            return this._scene;
        }

        protected _app: GameApp;

        constructor(value: GameApp, url:string) {
            super();
            this._app = value;
            this._url = url;
            this.mouseEnabled = true;
        }

        //布局
        public resize(rw: number, rh: number): void {
            this.size(rw, rh);
            if (this._scene) {
                this._scene.size(rw, rh);
            }
        }

        //场景载入
        public enterScene(): void {
            //判断是否需要释放重新载
            this.dispose();
            Laya.loader.create([this._url], Laya.Handler.create(this, this.on3DComplete), Handler.create(this, this.onLoadProgress));
        }
        //场景加载完毕
        private on3DComplete() {
            var scene: Laya.Scene = this._scene = Laya.Scene.load(this._url);
            this.initScene();
        }
        private onLoadProgress(value: any): void {

        }

        //初始场景
        protected initScene(): void {
            if (!this._scene || !this._scene.loaded) {
                return;
            }
            if(this._isShow)
                this.addChildAt(this._scene, 0);
        }
        
        public show():void
        {
            this._isShow = true;
            if(this._scene)
                this.addChildAt(this._scene, 0);
        }

        public hide():void
        {
            this._isShow = false;
            if(this._scene)
                this._scene.removeSelf();
        }
        
        //释放
        public dispose() {
            if (this._scene) {
                this._scene.destroy(true);
                this._scene = null;
            }
        }
    }
}
