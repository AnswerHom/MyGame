/**
* 位图切片生成工具
*/
module doc.gui.component{
    export class NumGroup extends Laya.Box {
        //分数字体
        public static SCORE_FONT: any;
		public static SCORE0_FONT: any;
		public static SCORE1_FONT: any;
		public static SCORE2_FONT: any;
        public static SCORE3_FONT: any;
        public static SCORE4_FONT: any;
        public static SCORE5_FONT: any;
   

        //当前选中的字体
        private _curFont: any;
        //clip组件集合
        private _clipArray: Laya.Clip[];
        //前置图片
        public _preImage: LImage;
        //后置图片
        public _postImage: LImage;

        private _oldValue:number = -1;
        private _maxWidth:number = 0;
        

        static init(): void {

            this.SCORE_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: Path.ui + 'tongyong/clip_1.png',
                clipWidth: 0,
                clipX: 10,
                space: -15
            };

			this.SCORE0_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: 'tongyong/clip_1.png',
                clipWidth: 27,
                clipX: 10,
                space: 0
            };

            this.SCORE1_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: 'tongyong/clip_1.png',
                clipWidth: 0,
                clipX: 10,
                space: 0
            };

            this.SCORE2_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: 'tongyong/clip_2.png',
                clipWidth: 0,
                clipX: 10,
                space: 0
            };

            this.SCORE3_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: 'tongyong/clip_shuzi4.png',
                clipWidth: 0,
                clipX: 10,
                space: 0
            };

            this.SCORE4_FONT = {
                source: Path.uiAtlas + "tongyong.atlas",
                url: 'tongyong/clip_shuzi_xiao.png',
                clipWidth: 0,
                clipX: 10,
                space: 0
            };
             this.SCORE5_FONT = {
                source: Path.uiAtlas + "jiesuan.atlas",
                url: 'jiesuan/clip_shuzi1.png',
                clipWidth: 0,
                clipX: 10,
                space: 52
            };


        }

        constructor(font: any,maxWidth:number=0) {
            super();
            this.setFont(font);
            this._maxWidth = maxWidth;
            this._clipArray = [];
        }

        public setFont(font: any): void {
            if (this._curFont == font) return;
            this._curFont = font;
            if (font.source) {
                let refTexture = RefAsset.Get(font.source);
                refTexture.retain();
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
                this._clipArray = [];
            }
        }

        //设置
        public setNum(value: number, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
           
			if (!this._curFont) {
                console.log("Font not found!");
				return;
            }

            let refTexture = RefAsset.Get(this._curFont.source);
            if (!refTexture.parseComplete) {
                refTexture.once(LEvent.COMPLETE, this, (num: number, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null) => {
                    this.onAssetParseComplete(num, needZero, isTween, preSkin, postSkin);
                }, [value, needZero, isTween, preSkin, postSkin]);
            }
            else {
                this.onAssetParseComplete(value, needZero, isTween, preSkin, postSkin);
            }
        }

        private onAssetParseComplete(value:number, needZero: boolean = false, isTween: boolean = false, preSkin: string = null, postSkin: string = null): void {
            
            //是否播滚动
            if(value > 0 && this._oldValue >= 0 && isTween){
                let diff:number = value - this._oldValue;
                if(diff > 0){
                    for(let i:number = 0; i < diff; i++){
                        let newV:number = this._oldValue + i+1;
                        Laya.timer.once(i*30,this,(num:number,nz:boolean,pes:string,pts:string)=>{
                            this.showData(num,nz,pes,pts);
                        },[newV,needZero,preSkin,postSkin]);
                    }
                }
                else{
                    this.showData(value,needZero,preSkin,postSkin);
                }
            }
            else{
                this.showData(value,needZero,preSkin,postSkin);
            }
            this._oldValue = value;
        }

        private showData(value:number,needZero: boolean = false,preSkin: string = null,postSkin: string = null):void{
            let str:string = value.toString();
            let posX = 0;
            //前置图片
            if (preSkin) {
                if (!this._preImage) {
                    this._preImage = new LImage();
                    this.addChild(this._preImage);
                }
                this._preImage.skin = preSkin;
                this._preImage.pos(posX, 0);
                posX += this._preImage.width + this._curFont.space;
            } else {
                if (this._preImage) {
                    this._preImage.destroy();
                    this._preImage = null;
                }
            }
            //清理
            for (let clip of this._clipArray) {
                clip.removeSelf();
            }
            if (str && (((!needZero && str > "0") || needZero))) {
                this.visible = true;
                for (let i = 0; i < str.length; i++) {
                    let clipNum = this._clipArray[i];
                    if (!clipNum) {
                        let index = parseInt(str.charAt(i));
                        clipNum = this.createClip(index);
                        this._clipArray.push(clipNum);
                    } else {
                        clipNum.index = parseInt(str.charAt(i));
                    }
                    if (!clipNum.parent)
                        this.addChild(clipNum);
                    clipNum.x = posX;
                    clipNum.y = 0;
                    posX += clipNum.width + this._curFont.space;
                }
            } else {
                this.visible = false;
            }

            //后置图片
            if (postSkin) {
                if (!this._postImage) {
                    this._postImage = new LImage();
                    this.addChild(this._postImage);
                }
                this._postImage.skin = postSkin;
                this._postImage.pos(posX, 0);
            } else {
                if (this._postImage) {
                    this._postImage.destroy();
                    this._postImage = null;
                }
            }

            //位置重置下
            if(this._maxWidth > 0) this.x = (this._maxWidth - this.width)/2;
            if(value == this._oldValue){
                Laya.timer.clearAll(this);
            }
        }

        //创建位图切片
        private createClip(index: number): laya.ui.Clip {
            let clip = new laya.ui.Clip(this._curFont.url);
            clip.clipWidth = this._curFont.clipWidth;
            clip.clipX = this._curFont.clipX;
            clip.index = index;
            this.addChild(clip);
            return clip;
        }

        //释放
        destroy(destroyChild?: boolean): void {
            Laya.timer.clearAll(this);
            if (this._curFont.source) {
                let refTexture = RefAsset.Get(this._curFont.source);
                refTexture.release();
                this._curFont = null
            }
            if (this._clipArray) {
                for (let clip of this._clipArray) {
                    clip.destroy(true);
                }
                this._clipArray = null;
            }
            if (this._preImage) {
                this._preImage.destroy(true);
                this._preImage = null;
            }
            if (this._postImage) {
                this._postImage.destroy(true);
                this._postImage = null;
            }
            super.destroy(destroyChild);
        }

    }
}