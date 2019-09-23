module dou.gui.component{
    export class MapLayer extends Laya.Sprite
    {
        private __width:number = 0;
        private __height:number = 0;
        private IMGS:Array<any> = ['bg_01.jpg','bg_02.jpg','bg_03.jpg','bg_04.jpg','bg_05.jpg']; 
        private _imgIndex:number = 0;
        private _imgCreate:number = 0;
        private _map_zhezhao:Array<any> = [];
        private _move_height:number = 0;
        static MAP_HEIGHT = 183;
        private PER_PAGE:number = 7;

        private _maps:Array<Map> = [];
        constructor()
        {
            super();
            this.init();
        }


        public init():void
        {
            for(let i = 0; i < this._maps.length; i++)
            {
                Map.free(this._maps[i]);
            }
            this._maps.length = 0;
            for(let i = 0; i < this.PER_PAGE; i++)
            {
                let map = Map.malloc();
                map.url = 'bg_01.jpg';
                map.offsetY = MapLayer.MAP_HEIGHT*(i - 1);
                map.moveSpeed = 2;
                this._maps.push(map);
            }

            let map = Map.malloc();
            map.url = 'tu_di2.png';
            map.botoom = false;
            map.offsetX = 15;
            map.offsetY = 587;
            map.moveSpeed = 2;
            this._maps.push(map);

            
            this.__height = 0;
            this._imgCreate = 0;
            this._imgIndex = 0;
        }


        public update():void
        {
            this.__height -= 2;
            if(this.__height <= 0)
            {
                if(this._imgCreate == this.PER_PAGE)
                {
                    this._imgIndex = ++this._imgIndex%5;
                    this._imgCreate = 0;
                }

                if(this._imgCreate == this.PER_PAGE - 1)
                {
                    //云
                    let map = Map.malloc();
                    map.url = 'tu_yun1.png';
                    map.offsetY = -300;
                    // map.needLoad = true;
                    map.botoom = false;
                    map.loader();
                    map.moveSpeed = 1.8;
                    this._maps.push(map);

                    map = Map.malloc();
                    map.url = 'tu_yun3.png';
                    map.offsetY = -300;
                    // map.needLoad = true;
                    map.botoom = false;
                    map.loader();
                    map.moveSpeed = 2;
                    this._maps.push(map);
                }

                this._imgCreate++;
                this.__height += 183;

                let map = Map.malloc();
                map.url = this.IMGS[this._imgIndex];
                map.offsetY = -this.__height;
                map.moveSpeed = 2;
                this._maps.push(map);
            }
            this.graphics.clear();
            for(let i = 0; i < this._maps.length; i++)
            {
                let map = this._maps[i];
                map.update();
                if(map.needDestory())
                {
                    this._maps.splice(i, 1);
                    Map.free(map);
                    i--;
                    continue;
                }
                if(map.texture && map.botoom)
                {
                    this.graphics.drawTexture(map.texture, map.offsetX, map.offsetY);
                }
            }

            for(let i = 0; i < this._maps.length; i++)
            {
                let map = this._maps[i];
                if(map.texture && !map.botoom)
                {
                    this.graphics.drawTexture(map.texture, map.offsetX, map.offsetY);
                }
            }
        }
    }

    class Map{
        public url:string;
        public moveSpeed:number;
        private _texture:Texture;
        public offsetX:number = 0;
        public offsetY:number = 0;
        public botoom:boolean = true;
        public needLoad:boolean = false;
        static _map_list:Array<Map> = []
        static malloc():Map
        {
            if(Map._map_list.length > 0)
               return Map._map_list.pop();
            return new Map();
        }

        static free(map:Map):void
        {
            if(!map)
                return;
            map.reset();
            Map._map_list.push(map);
        }

        constructor()
        {

        }

        public get texture():Texture
        {
            if(!this._texture && !this.needLoad)
            {
                // 
                this._texture = Loader.getRes('tongyong/' + this.url);
            }
            return this._texture;
        }

        public loader():void
        {
            if(this.needLoad)
                Laya.loader.load('tongyong/' + this.url, Handler.create(this, this.onLoad))
        }

        private onLoad(texture:Texture):void
        {
            this._texture = texture;
        }

        public update():void
        {
            this.offsetY += this.moveSpeed;
        }

        public needDestory():boolean
        {
            return this.offsetY > 736;
        }

        public reset():void
        {
            this.offsetX = 0;
            this.offsetY = 0;
            this.needLoad = false;
            this._texture = null;
            this.botoom = true;
        }
    }

}