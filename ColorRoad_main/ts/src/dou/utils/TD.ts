
module dou.utils {

	export class TD {
        public static TD_Vector3_0:Vector3 = new Laya.Vector3();
        public static TD_Vector3_1:Vector3 = new Laya.Vector3();
        public static TD_Vector3_2:Vector3 = new Laya.Vector3();

        public static TD_Vector4_0:Vector4 = new Laya.Vector4();
        public static TD_Vector4_1:Vector4 = new Laya.Vector4();
        public static TD_Vector4_2:Vector4 = new Laya.Vector4();


        public static color_r:Vector4 = new Laya.Vector4(1,0,0,1);
        public static color_g:Vector4 = new Laya.Vector4(0,1,0,1);
        public static color_b:Vector4 = new Laya.Vector4(0,0,1,1);

        public static getColor(type):Vector4
        {
            switch(type)
            {
                case 1:
                    return TD.color_r;
                case 2:
                    return TD.color_g;
                case 3:
                    return TD.color_b;
            }
            return TD.color_r;
        }
    }
}