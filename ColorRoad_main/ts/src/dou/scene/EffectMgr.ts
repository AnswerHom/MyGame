module dou.scene{
    export class EffectMgr{

        private static _config:any = {};
        // private _pool:Array< Array<Laya.ShuriKenParticle3D> > = new Array< Array<Laya.ShuriKenParticle3D> >();
        constructor()
        {
        }

        public static addEffect(name:string, effect:Laya.ShuriKenParticle3D):void
        {
            this._config[name] = effect;
        }

        public static getEffect(name:string):Laya.ShuriKenParticle3D{
            if(this._config[name])
            {
                return (this._config[name] as Laya.ShuriKenParticle3D).clone();
            }
            return null;
        }

        // private malloc():Laya.ShuriKenParticle3D
        // {
        //     return null;
        // }

        // private free(effect:Laya.ShuriKenParticle3D):void{

        // }
    }
}