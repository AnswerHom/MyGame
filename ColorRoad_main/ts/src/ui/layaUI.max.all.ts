
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class CaiNiXiHuanUI extends View {
		public btn_gg:Laya.Button;
		public list_info:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":619,"mouseThrough":true,"height":650},"child":[{"type":"Box","props":{"y":0,"x":0,"width":619,"height":621},"child":[{"type":"Image","props":{"skin":"play/di_ct.png","sizeGrid":"33,41,47,41"}},{"type":"Image","props":{"y":86,"x":21,"width":516,"skin":"top/tu_di.png","sizeGrid":"26,42,31,40","height":498,"alpha":0.7}},{"type":"Button","props":{"y":250,"x":566,"visible":true,"var":"btn_gg","stateNum":1,"skin":"play/btn_ct.png"}}]},{"type":"List","props":{"y":104,"x":26,"width":492,"var":"list_info","spaceY":18,"spaceX":15,"height":462},"child":[{"type":"CaiNiXiHuan_T","props":{"y":0,"x":0,"name":"render","runtime":"ui.component.CaiNiXiHuan_TUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.CaiNiXiHuan_TUI",ui.component.CaiNiXiHuan_TUI);

            super.createChildren();
            this.createView(ui.CaiNiXiHuanUI.uiView);

        }

    }
}

module ui {
    export class ChengJiuUI extends View {
		public txtMoney:Laya.Label;
		public txt_JD:Laya.Label;
		public list_achieve:Laya.List;
		public btn_back:Laya.Button;
		public btn_start:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":28,"x":29},"child":[{"type":"Image","props":{"y":10,"x":47,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"skin":"tongyong/tu_jinbi.png"}},{"type":"Label","props":{"y":22,"x":84,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":169,"width":665,"skin":"tongyong/tu_di.png","sizeGrid":"33,41,47,41","height":810,"centerX":0}},{"type":"Image","props":{"y":220,"skin":"chengjiu/bt_chengjiu.png","centerX":11,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":229,"x":422,"width":240,"var":"txt_JD","text":"成就进度:0/555","height":34,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"List","props":{"y":270,"x":46,"width":625,"var":"list_achieve","spaceY":7,"height":644},"child":[{"type":"ChengJiu_T","props":{"y":-6,"x":2,"name":"render","runtime":"ui.component.ChengJiu_TUI"}}]},{"type":"Button","props":{"y":1011,"x":46,"var":"btn_back","stateNum":1,"skin":"tongyong/btn_fh2.png"}},{"type":"Button","props":{"y":1003,"x":378,"var":"btn_start","stateNum":1,"skin":"tongyong/btn_1.png","scaleY":0.9,"scaleX":0.9}},{"type":"Box","props":{"y":1027,"x":409},"child":[{"type":"Image","props":{"y":1,"skin":"tongyong/tu_kaishi.png","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"x":36,"skin":"tongyong/tu_ljtz.png","scaleY":0.8,"scaleX":0.8}}]},{"type":"Image","props":{"y":98,"x":236,"skin":"tongyong/tu_hdj.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.ChengJiu_TUI",ui.component.ChengJiu_TUI);

            super.createChildren();
            this.createView(ui.ChengJiuUI.uiView);

        }

    }
}

module ui.component {
    export class CaiNiXiHuan_TUI extends View {
		public img_grid:Laya.Image;
		public txt_name:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":115,"height":100},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":17,"width":82,"var":"img_grid","skin":"tongyong/wpk_1.png","height":82}},{"type":"Image","props":{"y":72,"x":0,"width":144,"skin":"tongyong/tu_di4.png","sizeGrid":"10,42,11,41","scaleY":0.8,"scaleX":0.8,"height":33}},{"type":"Label","props":{"y":76,"x":0,"width":115,"var":"txt_name","text":"游戏名字六字","height":18,"fontSize":18,"color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.CaiNiXiHuan_TUI.uiView);

        }

    }
}

module ui.component {
    export class ChengJiu_TUI extends View {
		public img_skin:Laya.Image;
		public txt_name:Laya.Label;
		public txt_tesc:Laya.Label;
		public progress1:Laya.ProgressBar;
		public btn_LQ:Laya.Button;
		public txt_count:Laya.Label;
		public btn_go:Laya.Label;
		public img1:Laya.Image;
		public img2:Laya.Image;
		public img3:Laya.Image;
		public img4:Laya.Image;
		public img5:Laya.Image;
		public txt_JD:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":620,"height":166},"child":[{"type":"Box","props":{"y":0,"x":0,"width":620,"height":166},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"skin":"top/tu_di.png","height":166}},{"type":"Image","props":{"y":18,"x":17,"width":115,"skin":"tongyong/wpk_1.png","height":115},"child":[{"type":"Image","props":{"var":"img_skin","skin":"chengjiutubiao/tu_1.png","centerY":0,"centerX":0}}]},{"type":"Label","props":{"y":21,"x":150,"width":240,"var":"txt_name","text":"游戏大神","height":34,"fontSize":32,"color":"#68cac5","align":"left"}},{"type":"Label","props":{"y":72,"x":150,"width":240,"var":"txt_tesc","text":"在游戏中获得100分","height":34,"fontSize":28,"color":"#68cac5","align":"left"}},{"type":"ProgressBar","props":{"y":119,"x":150,"var":"progress1","skin":"chengjiu/progress_1.png"}},{"type":"Button","props":{"y":103,"x":537,"var":"btn_LQ","stateNum":1,"skin":"tongyong/btn_1.png","scaleY":0.35,"scaleX":0.35,"labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"label":"领 取","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":30,"x":492,"skin":"tongyong/tu_jinbi.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":37,"x":543,"width":78,"var":"txt_count","text":"00","height":34,"fontSize":26,"color":"#ffd558","align":"left"}},{"type":"Label","props":{"y":88,"x":502,"width":100,"var":"btn_go","text":"前 往>>","height":34,"fontSize":26,"color":"#68cac5","align":"left"}},{"type":"Image","props":{"y":138,"x":18,"var":"img1","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":138,"x":42,"var":"img2","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":138,"x":65,"var":"img3","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":138,"x":89,"var":"img4","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":138,"x":112,"var":"img5","skin":"tongyong/tu_di6.png"}},{"type":"Label","props":{"y":118,"x":158,"width":235,"var":"txt_JD","text":"00/00","height":34,"fontSize":26,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.ChengJiu_TUI.uiView);

        }

    }
}

module ui.component {
    export class DaoJuShengJi_TUI extends View {
		public txt_skillName:Laya.Label;
		public img_icon:Laya.Image;
		public txt_lv:Laya.Label;
		public txt_tesc:Laya.Label;
		public btn_level:Laya.Button;
		public txt_gold:Laya.Label;
		public img_lv1:Laya.Image;
		public img_lv2:Laya.Image;
		public img_lv3:Laya.Image;
		public img_lv4:Laya.Image;
		public img_lv5:Laya.Image;
		public txt_nextTesc:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":620,"height":207},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"skin":"top/tu_di.png","height":207}},{"type":"Box","props":{"y":0,"x":0,"width":620,"height":207},"child":[{"type":"Image","props":{"y":18,"x":17,"width":115,"skin":"tongyong/wpk_1.png","height":115},"child":[{"type":"Label","props":{"y":90,"var":"txt_skillName","text":"道具名称","fontSize":22,"font":"SimSun","color":"#fbfbfb","centerX":2,"bold":true}},{"type":"Image","props":{"y":41,"x":59,"var":"img_icon","skin":"daojushengji/tu_daoju1.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":13,"x":150,"width":240,"var":"txt_lv","text":"LV.00","height":34,"fontSize":32,"color":"#68cac5","align":"left"}},{"type":"Label","props":{"y":104,"x":149,"width":308,"var":"txt_tesc","text":"在游戏中获得100分","height":34,"fontSize":28,"color":"#68cac5","align":"left"}},{"type":"Button","props":{"y":103,"x":537,"var":"btn_level","stateNum":1,"skin":"tongyong/btn_1.png","scaleY":0.35,"scaleX":0.35,"labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"label":"升 级","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":30,"x":492,"skin":"tongyong/tu_jinbi.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":37,"x":543,"width":78,"var":"txt_gold","text":"00","height":34,"fontSize":26,"color":"#ffd558","align":"left"}},{"type":"Image","props":{"y":69,"x":155,"var":"img_lv1","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":69,"x":194,"var":"img_lv2","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":69,"x":232,"var":"img_lv3","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":69,"x":271,"var":"img_lv4","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":69,"x":309,"var":"img_lv5","skin":"tongyong/tu_di6.png"}},{"type":"Image","props":{"y":141,"x":14,"width":592,"skin":"tongyong/tu_di4.png","sizeGrid":"0,24,0,25","height":49}},{"type":"Label","props":{"y":150,"x":28,"width":565,"var":"txt_nextTesc","text":"下一等级：在6秒内玩家获得×2倍得分","height":34,"fontSize":28,"color":"#ffd558","align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.DaoJuShengJi_TUI.uiView);

        }

    }
}

module ui.component {
    export class Effect_PiaoZiUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_add:Laya.Image;
		public img_num1:Laya.Image;
		public img_num2:Laya.Image;
		public img_num3:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":468,"x":301},"compId":4,"child":[{"type":"Image","props":{"var":"img_add","skin":"piaozi/1_+.png"}},{"type":"Image","props":{"y":0,"x":38,"var":"img_num1","skin":"piaozi/1_0.png"}},{"type":"Image","props":{"y":0,"x":73,"var":"img_num2","skin":"piaozi/1_0.png"}},{"type":"Image","props":{"y":0,"x":108,"var":"img_num3","skin":"piaozi/1_0.png"}}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":468,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":466,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":3},{"value":450,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":16}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":false,"target":4,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":12},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":16}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.Effect_PiaoZiUI.uiView);

        }

    }
}

module ui.component {
    export class PiFuItemUI extends View {
		public img_bg:Laya.Image;
		public img_skin:Laya.Image;
		public box_info:Laya.Box;
		public txt_num:Laya.Label;
		public img_gou:Laya.Image;
		public img_lock:Laya.Image;
		public img_get:Laya.Image;
		public img_use:Laya.Image;
		public img_select:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":170,"height":180},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"img_bg","skin":"pifu/pifudi.png"}},{"type":"Image","props":{"y":8,"x":17,"var":"img_skin","skin":"pifu/wpk.png","mouseEnabled":false}},{"type":"Box","props":{"y":142,"x":17,"var":"box_info"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"pifu/tu_yd.png"}},{"type":"Label","props":{"y":3,"x":2,"width":125,"var":"txt_num","text":"1000","height":24,"fontSize":24,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":56,"x":62,"var":"img_gou","skin":"pifu/xuanzhong.png","mouseEnabled":false}},{"type":"Image","props":{"y":15,"x":22,"var":"img_lock","skin":"pifu/suo.png","mouseEnabled":false}},{"type":"Image","props":{"y":142,"x":17,"var":"img_get","skin":"pifu/tu_yd.png"},"child":[{"type":"Label","props":{"y":0,"x":32,"text":"已拥有","fontSize":22,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":141,"x":17,"visible":false,"var":"img_use","skin":"pifu/tu_yd2.png"},"child":[{"type":"Label","props":{"y":1,"x":32,"text":"使用中","fontSize":22,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":-6,"x":-6,"var":"img_select","skin":"pifu/tu_fg.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.PiFuItemUI.uiView);

        }

    }
}

module ui.component {
    export class PiFu_TUI extends View {
		public box_main:Laya.Box;
		public btn_state:Laya.Button;
		public img_skin:Laya.Image;
		public img_active:Laya.Image;
		public box_buy:Laya.Box;
		public img_di:Laya.Image;
		public img_icon:Laya.Image;
		public txtMoney:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":133,"height":193},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"pifu/tu_di31.png"}},{"type":"Box","props":{"y":0,"x":0,"var":"box_main"},"child":[{"type":"Button","props":{"y":150,"x":21,"visible":false,"var":"btn_state","stateNum":1,"skin":"pifu/btn_1.png","labelSize":20,"labelPadding":"1","labelColors":"#ffffff","label":"随机皮肤"}},{"type":"Image","props":{"y":27,"x":20,"width":100,"var":"img_skin","height":100}},{"type":"Image","props":{"y":0,"x":2,"width":134,"var":"img_active","skin":"tongyong/tu_di8.png","sizeGrid":"26,42,31,40","height":195}},{"type":"Box","props":{"y":146,"x":14,"var":"box_buy"},"child":[{"type":"Image","props":{"y":4,"x":10,"var":"img_di","skin":"pifu/tu_yd.png"}},{"type":"Image","props":{"y":0,"x":0,"var":"img_icon","skin":"tongyong/tu_jinbi.png","scaleY":0.4,"scaleX":0.4}},{"type":"Label","props":{"y":7,"x":33,"width":77,"var":"txtMoney","text":"123456","height":22,"fontSize":21,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.PiFu_TUI.uiView);

        }

    }
}

module ui.component {
    export class PiFu_T2UI extends View {
		public box_main:Laya.Box;
		public img_di:Laya.Image;
		public img_pz:Laya.Image;
		public txt_JD:Laya.Label;
		public list_skin:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":65,"x":160},"child":[{"type":"Box","props":{"y":-9,"x":-110,"var":"box_main"},"child":[{"type":"Image","props":{"y":-3,"x":1,"width":624,"skin":"top/tu_di.jpg","height":85}},{"type":"Box","props":{"y":2,"x":6},"child":[{"type":"Image","props":{"y":0,"x":183,"width":259,"var":"img_di","skin":"pifu/tu_di1.png","sizeGrid":"0,35,0,27","height":75}},{"type":"Image","props":{"y":20,"x":278,"var":"img_pz","skin":"pifu/tu_txt1.png"}}]},{"type":"Label","props":{"y":24,"x":370,"width":240,"var":"txt_JD","text":"55/55","height":34,"fontSize":30,"color":"#05bea7","align":"right"}},{"type":"List","props":{"y":87,"x":29,"var":"list_skin","spaceY":10,"spaceX":14},"child":[{"type":"PiFu_T","props":{"y":0,"x":0,"name":"render","runtime":"ui.component.PiFu_TUI"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.PiFu_TUI",ui.component.PiFu_TUI);

            super.createChildren();
            this.createView(ui.component.PiFu_T2UI.uiView);

        }

    }
}

module ui.component {
    export class QianDao_TUI extends View {
		public img_di:Laya.Image;
		public txt_day:Laya.Label;
		public img_icon:Laya.Image;
		public txt_num:Laya.Label;
		public img_double:Laya.Image;
		public img_YL:Laya.Image;
		public img_YLQ:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":152,"height":250},"child":[{"type":"Box","props":{"y":15,"x":5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":142,"var":"img_di","skin":"qiridenglu/tu_xxd2.png","height":224},"child":[{"type":"Label","props":{"y":7,"x":34,"var":"txt_day","text":"第一天","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":117,"x":71,"visible":true,"var":"img_icon","skin":"tongyong/tu_qian4.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":197,"width":140,"var":"txt_num","text":"00","height":24,"fontSize":24,"color":"#000000","centerX":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":30,"x":45,"var":"img_double","skin":"tongyong/tu_shuangbei.png"}},{"type":"Image","props":{"y":156,"visible":false,"var":"img_YL","skin":"qiridenglu/tu_ylq.png","centerX":6}},{"type":"Image","props":{"y":96,"visible":false,"var":"img_YLQ","skin":"qiridenglu/tu_ylq.png","centerX":1}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.QianDao_TUI.uiView);

        }

    }
}

module ui.component {
    export class QianDao_T2UI extends View {
		public img_di:Laya.Image;
		public txt_day:Laya.Label;
		public img_icon:Laya.Image;
		public img_double:Laya.Image;
		public img_YL:Laya.Image;
		public txt_num:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":297,"height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"width":297,"var":"img_di","skin":"qiridenglu/tu_xxd2.png","sizeGrid":"0,30,0,30","height":224}},{"type":"Label","props":{"y":7,"x":110,"var":"txt_day","text":"第七天","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Image","props":{"y":113,"x":147,"visible":false,"var":"img_icon","skin":"tongyong/tu_jinbi.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":31,"x":182,"var":"img_double","skin":"tongyong/tu_shuangbei.png"}},{"type":"Image","props":{"y":136,"x":107,"visible":false,"var":"img_YL","skin":"qiridenglu/tu_ylq.png"}},{"type":"Label","props":{"y":199,"x":145,"var":"txt_num","text":"00","fontSize":24,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.QianDao_T2UI.uiView);

        }

    }
}

module ui.component {
    export class Top_TUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":486,"renderType":"render","height":94},"child":[{"type":"Box","props":{"y":0,"x":0,"width":539,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"top/tu_di.png"}},{"type":"Image","props":{"y":15,"x":106,"skin":"tongyong/wpk_1.png","sizeGrid":"7,9,11,8"}},{"type":"Image","props":{"y":30,"x":353,"skin":"top/tu_yd.png"}},{"type":"Label","props":{"y":13,"x":203,"width":240,"text":"游戏大神","height":34,"fontSize":28,"color":"#3d7e9c","bold":true,"align":"left"}},{"type":"Label","props":{"y":34,"x":386,"width":51,"text":"00","height":29,"fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Box","props":{"y":54,"x":205},"child":[{"type":"Image","props":{"skin":"top/tu_paihang1.png"}},{"type":"Label","props":{"y":4,"x":2,"width":100,"text":"游戏大神","fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":11,"x":27,"skin":"top/top1.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.component.Top_TUI.uiView);

        }

    }
}

module ui {
    export class DaoJuShengJiUI extends View {
		public txtMoney:Laya.Label;
		public list_daoJ:Laya.List;
		public btn_back:Laya.Button;
		public btn_go:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":28,"x":29},"child":[{"type":"Image","props":{"y":10,"x":47,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"skin":"tongyong/tu_jinbi.png"}},{"type":"Label","props":{"y":22,"x":84,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":169,"width":665,"skin":"tongyong/tu_di.png","sizeGrid":"33,41,47,41","height":885,"centerX":0}},{"type":"Image","props":{"y":227,"x":370,"skin":"daojushengji/bt_djsj.png","centerX":10,"anchorY":0.5,"anchorX":0.5}},{"type":"List","props":{"y":270,"x":46,"width":625,"var":"list_daoJ","spaceY":50,"repeatY":3,"height":761},"child":[{"type":"DaoJuShengJi_T","props":{"y":-6,"x":2,"name":"render","runtime":"ui.component.DaoJuShengJi_TUI"}}]},{"type":"Button","props":{"y":1110,"x":49,"var":"btn_back","stateNum":1,"skin":"tongyong/btn_fh2.png"}},{"type":"Button","props":{"y":1114,"x":364,"var":"btn_go","stateNum":1,"skin":"tongyong/btn_1.png"},"child":[{"type":"Box","props":{"y":27,"x":54},"child":[{"type":"Image","props":{"y":1,"skin":"tongyong/tu_kaishi.png","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"x":36,"skin":"tongyong/tu_ljtz.png","scaleY":0.8,"scaleX":0.8}}]}]},{"type":"Image","props":{"y":98,"x":236,"skin":"tongyong/tu_hdj.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.DaoJuShengJi_TUI",ui.component.DaoJuShengJi_TUI);

            super.createChildren();
            this.createView(ui.DaoJuShengJiUI.uiView);

        }

    }
}

module ui {
    export class FuHuoUI extends View {
		public txt_score:Laya.Label;
		public btn_relife:Laya.Button;
		public btn_relife_use:Laya.Button;
		public btn_skip:Laya.Image;
		public btn_share:Laya.Button;
		public btn_goToRelife:Laya.Image;
		public mouseLayer:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":208,"x":3,"width":635,"height":16},"child":[{"type":"Label","props":{"y":70,"x":203,"width":332,"var":"txt_score","text":"0000","height":85,"fontSize":80,"color":"#fea769","bold":true,"align":"center"}},{"type":"Image","props":{"y":-14,"x":85,"skin":"jiesuan/tu_bccj.png"}}]},{"type":"Box","props":{"y":537,"x":60}},{"type":"Image","props":{"y":448,"x":2,"skin":"jiesuan/tu_dk.png"}},{"type":"Button","props":{"y":751,"x":370,"width":350,"var":"btn_relife","stateNum":1,"skin":"tongyong/btn_1.png","sizeGrid":"0,30,0,30","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":27,"x":74,"skin":"jiesuan/tu_gkspfh.png"}},{"type":"Image","props":{"y":19,"x":22,"skin":"jiesuan/tu_shipin.png"}}]},{"type":"Button","props":{"y":800,"x":365,"width":350,"var":"btn_relife_use","stateNum":1,"skin":"tongyong/btn_2.png","sizeGrid":"0,30,0,30","height":94,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":21,"x":24,"skin":"jiesuan/tu_shipin.png"}},{"type":"Image","props":{"y":27,"x":76,"skin":"jiesuan/tu_gkspfh.png"}}]},{"type":"Image","props":{"y":886,"x":276,"var":"btn_skip","skin":"jiesuan/tu_djtg.png"}},{"type":"Button","props":{"y":800,"x":365,"width":350,"var":"btn_share","stateNum":1,"skin":"tongyong/btn_1.png","sizeGrid":"0,30,0,30","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":51,"x":210,"skin":"jiesuan/tu_yqqy.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":51,"x":87,"skin":"jiesuan/tu_fuhuo.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":34,"x":13,"var":"btn_goToRelife","skin":"play/di_djsw.png"},"child":[{"type":"Image","props":{"y":11,"x":12,"skin":"play/tu_icon.png"}}]},{"type":"Image","props":{"y":263,"x":176,"width":369,"var":"mouseLayer","height":118}},{"type":"Image","props":{"y":458,"x":363,"width":109,"skin":"play/tu_icon.png","height":109}},{"type":"Label","props":{"y":493,"x":508,"text":"999m","fontSize":40,"font":"Microsoft YaHei","color":"#ff5151","bold":true}},{"type":"Label","props":{"y":489,"x":53,"text":"即将超越的好友","fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.FuHuoUI.uiView);

        }

    }
}

module ui {
    export class FuHuoBiUI extends View {
		public txt_gold:Laya.Label;
		public btn_fuhuo:Laya.Button;
		public txt_coin:Laya.Clip;
		public btn_invite:Laya.Button;
		public btn_back:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":275,"x":50,"width":612,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":608},"child":[{"type":"Image","props":{"y":87,"x":20,"width":569,"skin":"top/tu_di.png","sizeGrid":"26,42,31,40","height":487,"alpha":0.6}},{"type":"Box","props":{"y":125,"x":72},"child":[{"type":"Label","props":{"y":17,"x":0,"width":160,"text":"目前拥有：","height":36,"fontSize":26,"color":"#3d7e9c","bold":true,"align":"center"}},{"type":"Image","props":{"y":0,"x":136,"skin":"jiesuan/tu_fuhuobi.png","scaleY":0.9,"scaleX":0.9}},{"type":"Label","props":{"y":22,"x":224,"width":80,"var":"txt_gold","text":"5","fontSize":26,"color":"#3d7e9c","bold":true,"align":"center"}},{"type":"Label","props":{"y":21,"x":298,"width":196,"text":"（上限10个）","height":36,"fontSize":26,"color":"#3d7e9c","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":513,"x":327,"width":350,"var":"btn_fuhuo","stateNum":1,"skin":"tongyong/btn_1.png","sizeGrid":"0,30,0,30","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":29,"x":103,"skin":"jiesuan/tu_syfhb.png"}},{"type":"Image","props":{"y":50,"x":60,"skin":"jiesuan/tu_fh.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Clip","props":{"y":54,"x":76,"var":"txt_coin","skin":"jiesuan/clip_1.png","index":2,"clipX":10}}]},{"type":"Button","props":{"y":394,"x":326,"width":350,"var":"btn_invite","stateNum":1,"skin":"tongyong/btn_1.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":47,"x":204,"skin":"jiesuan/tu_yqqy.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":47,"x":60,"skin":"jiesuan/tu_fh1.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":23,"skin":"jiesuan/bt_fhb.png","centerX":4}},{"type":"Box","props":{"y":205,"x":68},"child":[{"type":"Label","props":{"y":12,"x":7,"width":407,"text":"说明:每日首次登陆立即赠送1个","height":36,"fontSize":26,"color":"#3d7e9c","bold":true,"align":"center"}},{"type":"Label","props":{"y":55,"x":78,"width":407,"text":"邀请群友点入你的链接可恢复1个","height":36,"fontSize":26,"color":"#3d7e9c","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":-74,"x":174,"skin":"tongyong/tu_hdj.png"}}]},{"type":"Button","props":{"y":31,"x":35,"var":"btn_back","stateNum":1,"skin":"tongyong/btn_fh.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.FuHuoBiUI.uiView);

        }

    }
}

module ui {
    export class HuoDeBaoXiangUI extends View {
		public ani1:Laya.FrameAnimation;
		public btn_open:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Button","props":{"y":890,"var":"btn_open","stateNum":1,"skin":"tongyong/btn_1.png","centerX":-3,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":49,"x":149,"skin":"suijibaoxiang/tu_djdk.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":172,"x":59,"skin":"suijibaoxiang/tu_guang.png"}},{"type":"Box","props":{"y":0,"x":-6},"child":[{"type":"Image","props":{"y":516,"x":369,"skin":"suijibaoxiang/tu_baoxiang.png","rotation":0,"pivotY":157,"pivotX":143},"compId":45}]},{"type":"Image","props":{"y":231,"x":233,"skin":"suijibaoxiang/wz_fx.png"}}],"animations":[{"nodes":[{"target":45,"keyframes":{"y":[{"value":582,"tweenMethod":"linearNone","tween":false,"target":45,"key":"y","index":0},{"value":582,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":10},{"value":702,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":12},{"value":510,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":15},{"value":582,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":17}],"rotation":[{"value":-14,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":0},{"value":12,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":2},{"value":-16,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":4},{"value":16,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":6},{"value":-21,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":10}],"height":[{"value":297,"tweenMethod":"linearNone","tween":false,"target":45,"key":"height","index":0},{"value":297,"tweenMethod":"linearNone","tween":true,"target":45,"key":"height","index":10},{"value":177,"tweenMethod":"linearNone","tween":true,"target":45,"key":"height","index":12},{"value":358,"tweenMethod":"linearNone","tween":true,"target":45,"key":"height","index":15},{"value":297,"tweenMethod":"linearNone","tween":true,"target":45,"key":"height","index":17}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":45,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":17}]}},{"target":51,"keyframes":{"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":51,"key":"visible","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":51,"key":"scaleY","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleY","index":14},{"value":4,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleY","index":20}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":51,"key":"scaleX","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleX","index":14},{"value":4,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleX","index":20}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":51,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":14},{"value":0,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HuoDeBaoXiangUI.uiView);

        }

    }
}

module ui {
    export class HuoDeJinBiUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_icon:Laya.Image;
		public txt_gold:Laya.Label;
		public btn_video:Laya.Button;
		public img_video1:Laya.Image;
		public img_video2:Laya.Image;
		public img_friend:Laya.Image;
		public img_title:Laya.Image;
		public btn_lq:Laya.Image;
		public txtMoney:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":320,"x":27,"width":665,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":534},"child":[{"type":"Image","props":{"y":89,"width":622,"skin":"top/tu_di.png","sizeGrid":"26,42,31,40","height":418,"centerX":0,"alpha":0.7}},{"type":"Image","props":{"y":365,"width":85,"var":"img_icon","skin":"tongyong/tu_dajinbi.png","scaleY":2,"scaleX":2,"height":80,"centerX":5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":132,"width":540,"var":"txt_gold","text":"5","height":120,"fontSize":120,"color":"#ffc047","centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":631,"x":331,"width":383,"var":"btn_video","stateNum":1,"skin":"tongyong/btn_1.png","height":115,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":57,"x":236,"var":"img_video1","skin":"jiesuan/tu_gkspsb.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":55,"x":71,"var":"img_video2","skin":"jiesuan/tu_shipin.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":35,"var":"img_friend","skin":"jiesuan/tu_xuanyao.png","centerX":0}}]},{"type":"Image","props":{"y":52,"var":"img_title","skin":"jiesuan/bt_hdjb.png","centerX":-3,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":712,"x":247,"var":"btn_lq","skin":"jiesuan/tu_ljlq.png"}},{"type":"Image","props":{"y":-69,"x":200,"skin":"tongyong/tu_hdj.png"}}]},{"type":"Box","props":{"y":38,"x":39},"child":[{"type":"Image","props":{"y":10,"x":47,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"y":41,"x":40,"skin":"tongyong/tu_jinbi.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5},"compId":43},{"type":"Label","props":{"y":22,"x":84,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":312.75,"x":206.75,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.825,"scaleX":0.825,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":45},{"type":"Image","props":{"y":371.75,"x":274.75,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.7749999999999999,"scaleX":0.7749999999999999,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":46},{"type":"Image","props":{"y":441.72727272727275,"x":363.45454545454544,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.4545454545454546,"scaleX":0.4545454545454546,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":47},{"type":"Image","props":{"y":494.33333333333337,"x":411.25,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.475,"scaleX":0.475,"anchorY":0.5,"anchorX":0.5,"alpha":0.9166666666666666},"compId":48},{"type":"Image","props":{"y":352,"x":261,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.6,"scaleX":0.6,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":49},{"type":"Image","props":{"y":274,"x":200,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.7,"scaleX":0.7,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":50},{"type":"Image","props":{"y":515.6666666666666,"x":313,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.5866666666666667,"scaleX":0.5866666666666667,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":51},{"type":"Image","props":{"y":508.5,"x":376.75,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.17500000000000002,"scaleX":0.17500000000000002,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":52},{"type":"Image","props":{"y":511.8,"x":349.2,"visible":false,"skin":"tongyong/tu_jinbi.png","scaleY":0.36,"scaleX":0.36,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":53}],"animations":[{"nodes":[{"target":45,"keyframes":{"y":[{"value":622,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":0},{"value":544.75,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":2},{"value":479,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":5},{"value":80,"tweenMethod":"linearNone","tween":true,"target":45,"key":"y","index":17}],"x":[{"value":319,"tweenMethod":"linearNone","tween":true,"target":45,"key":"x","index":0},{"value":314.5,"tweenMethod":"linearNone","tween":true,"target":45,"key":"x","index":2},{"value":298,"tweenMethod":"linearNone","tween":true,"target":45,"key":"x","index":5},{"value":79,"tweenMethod":"linearNone","tween":true,"target":45,"key":"x","index":17}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":45,"key":"visible","index":0}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleY","index":0},{"value":0.6499999999999999,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleY","index":2},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleY","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleY","index":17}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleX","index":0},{"value":0.6499999999999999,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleX","index":2},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleX","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"scaleX","index":17}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":0},{"value":0.75,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":16},{"value":0,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":17}]}},{"target":46,"keyframes":{"y":[{"value":596,"tweenMethod":"linearNone","tween":false,"target":46,"key":"y","index":0},{"value":559.7142857142857,"tweenMethod":"linearNone","tween":true,"target":46,"key":"y","index":2},{"value":505.2857142857143,"tweenMethod":"linearNone","tween":true,"target":46,"key":"y","index":3},{"value":469,"tweenMethod":"linearNone","tween":true,"target":46,"key":"y","index":6},{"value":80,"tweenMethod":"linearNone","tween":true,"target":46,"key":"y","index":22}],"x":[{"value":358,"tweenMethod":"linearNone","tween":false,"target":46,"key":"x","index":0},{"value":352.85714285714283,"tweenMethod":"linearNone","tween":true,"target":46,"key":"x","index":2},{"value":345.1428571428571,"tweenMethod":"linearNone","tween":true,"target":46,"key":"x","index":3},{"value":340,"tweenMethod":"linearNone","tween":true,"target":46,"key":"x","index":6},{"value":79,"tweenMethod":"linearNone","tween":true,"target":46,"key":"x","index":22}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":46,"key":"visible","index":0}],"scaleY":[{"value":0.6,"tweenMethod":"linearNone","tween":false,"target":46,"key":"scaleY","index":0},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":2},{"value":0.6749999999999999,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":3},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":22}],"scaleX":[{"value":0.6,"tweenMethod":"linearNone","tween":false,"target":46,"key":"scaleX","index":0},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":2},{"value":0.6749999999999999,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":3},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":22}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":46,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":46,"key":"alpha","index":2},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":46,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"alpha","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"alpha","index":21},{"value":0,"tweenMethod":"linearNone","tween":true,"target":46,"key":"alpha","index":22}]}},{"target":47,"keyframes":{"y":[{"value":617,"tweenMethod":"linearNone","tween":false,"target":47,"key":"y","index":0},{"value":617,"tweenMethod":"linearNone","tween":true,"target":47,"label":null,"key":"y","index":4},{"value":505.8,"tweenMethod":"linearNone","tween":true,"target":47,"key":"y","index":6},{"value":478,"tweenMethod":"linearNone","tween":true,"target":47,"key":"y","index":9},{"value":79,"tweenMethod":"linearNone","tween":true,"target":47,"key":"y","index":20}],"x":[{"value":403,"tweenMethod":"linearNone","tween":false,"target":47,"key":"x","index":0},{"value":403,"tweenMethod":"linearNone","tween":true,"target":47,"label":null,"key":"x","index":4},{"value":394.2,"tweenMethod":"linearNone","tween":true,"target":47,"key":"x","index":6},{"value":392,"tweenMethod":"linearNone","tween":true,"target":47,"key":"x","index":9},{"value":78,"tweenMethod":"linearNone","tween":true,"target":47,"key":"x","index":20}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":47,"key":"visible","index":0}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":47,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":47,"label":null,"key":"scaleY","index":4},{"value":0.38,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleY","index":6},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleY","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleY","index":20}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":47,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":47,"label":null,"key":"scaleX","index":4},{"value":0.38,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleX","index":6},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleX","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":47,"key":"scaleX","index":20}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":47,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":4},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":19},{"value":0,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":20}]}},{"target":48,"keyframes":{"y":[{"value":619,"tweenMethod":"linearNone","tween":false,"target":48,"key":"y","index":0},{"value":619,"tweenMethod":"linearNone","tween":true,"target":48,"label":null,"key":"y","index":5},{"value":528.3333333333334,"tweenMethod":"linearNone","tween":true,"target":48,"key":"y","index":7},{"value":483,"tweenMethod":"linearNone","tween":true,"target":48,"key":"y","index":11},{"value":79,"tweenMethod":"linearNone","tween":true,"target":48,"key":"y","index":19}],"x":[{"value":381,"tweenMethod":"linearNone","tween":false,"target":48,"key":"x","index":0},{"value":381,"tweenMethod":"linearNone","tween":true,"target":48,"label":null,"key":"x","index":5},{"value":403,"tweenMethod":"linearNone","tween":true,"target":48,"key":"x","index":7},{"value":414,"tweenMethod":"linearNone","tween":true,"target":48,"key":"x","index":11},{"value":79,"tweenMethod":"linearNone","tween":true,"target":48,"key":"x","index":19}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":48,"key":"visible","index":0}],"scaleY":[{"value":0.2,"tweenMethod":"linearNone","tween":false,"target":48,"key":"scaleY","index":0},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":48,"label":null,"key":"scaleY","index":5},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleY","index":7},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleY","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleY","index":19}],"scaleX":[{"value":0.2,"tweenMethod":"linearNone","tween":false,"target":48,"key":"scaleX","index":0},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":48,"label":null,"key":"scaleX","index":5},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleX","index":7},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleX","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleX","index":19}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":48,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"label":null,"key":"alpha","index":5},{"value":0.6666666666666666,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":7},{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":18},{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":19}]}},{"target":49,"keyframes":{"y":[{"value":605,"tweenMethod":"linearNone","tween":false,"target":49,"key":"y","index":0},{"value":605,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"y","index":3},{"value":511.4,"tweenMethod":"linearNone","tween":true,"target":49,"key":"y","index":4},{"value":488,"tweenMethod":"linearNone","tween":true,"target":49,"key":"y","index":8},{"value":80,"tweenMethod":"linearNone","tween":true,"target":49,"key":"y","index":14}],"x":[{"value":404,"tweenMethod":"linearNone","tween":false,"target":49,"key":"x","index":0},{"value":404,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"x","index":3},{"value":362.4,"tweenMethod":"linearNone","tween":true,"target":49,"key":"x","index":4},{"value":352,"tweenMethod":"linearNone","tween":true,"target":49,"key":"x","index":8},{"value":79,"tweenMethod":"linearNone","tween":true,"target":49,"key":"x","index":14}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":49,"key":"visible","index":0}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":49,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"scaleY","index":3},{"value":0.38,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleY","index":4},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleY","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleY","index":14}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":49,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"scaleX","index":3},{"value":0.38,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleX","index":4},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleX","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleX","index":14}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":49,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"alpha","index":3},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":49,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"alpha","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"alpha","index":13},{"value":0,"tweenMethod":"linearNone","tween":true,"target":49,"key":"alpha","index":14}]}},{"target":50,"keyframes":{"y":[{"value":615,"tweenMethod":"linearNone","tween":false,"target":50,"key":"y","index":0},{"value":615,"tweenMethod":"linearNone","tween":true,"target":50,"label":null,"key":"y","index":1},{"value":469,"tweenMethod":"linearNone","tween":true,"target":50,"key":"y","index":5},{"value":79,"tweenMethod":"linearNone","tween":true,"target":50,"key":"y","index":15}],"x":[{"value":359,"tweenMethod":"linearNone","tween":false,"target":50,"key":"x","index":0},{"value":359,"tweenMethod":"linearNone","tween":true,"target":50,"label":null,"key":"x","index":1},{"value":321,"tweenMethod":"linearNone","tween":true,"target":50,"key":"x","index":5},{"value":79,"tweenMethod":"linearNone","tween":true,"target":50,"key":"x","index":15}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":50,"key":"visible","index":0}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":50,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":50,"label":null,"key":"scaleY","index":1},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":50,"key":"scaleY","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":50,"key":"scaleY","index":15}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":50,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":50,"label":null,"key":"scaleX","index":1},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":50,"key":"scaleX","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":50,"key":"scaleX","index":15}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":50,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":50,"label":null,"key":"alpha","index":1},{"value":1,"tweenMethod":"linearNone","tween":true,"target":50,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":50,"key":"alpha","index":14},{"value":0,"tweenMethod":"linearNone","tween":true,"target":50,"key":"alpha","index":15}]}},{"target":51,"keyframes":{"y":[{"value":616,"tweenMethod":"linearNone","tween":false,"target":51,"key":"y","index":0},{"value":616,"tweenMethod":"linearNone","tween":true,"target":51,"label":null,"key":"y","index":6},{"value":537,"tweenMethod":"linearNone","tween":true,"target":51,"key":"y","index":8},{"value":505,"tweenMethod":"linearNone","tween":true,"target":51,"key":"y","index":11},{"value":80,"tweenMethod":"linearNone","tween":true,"target":51,"key":"y","index":17}],"x":[{"value":317,"tweenMethod":"linearNone","tween":false,"target":51,"key":"x","index":0},{"value":317,"tweenMethod":"linearNone","tween":true,"target":51,"label":null,"key":"x","index":6},{"value":315,"tweenMethod":"linearNone","tween":true,"target":51,"key":"x","index":8},{"value":312,"tweenMethod":"linearNone","tween":true,"target":51,"key":"x","index":11},{"value":79,"tweenMethod":"linearNone","tween":true,"target":51,"key":"x","index":17}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":51,"key":"visible","index":0}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":51,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":51,"label":null,"key":"scaleY","index":6},{"value":0.5599999999999999,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleY","index":8},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleY","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleY","index":17}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":51,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":51,"label":null,"key":"scaleX","index":6},{"value":0.5599999999999999,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleX","index":8},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleX","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"scaleX","index":17}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":51,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"label":null,"key":"alpha","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":11},{"value":1,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":16},{"value":0,"tweenMethod":"linearNone","tween":true,"target":51,"key":"alpha","index":17}]}},{"target":52,"keyframes":{"y":[{"value":588,"tweenMethod":"linearNone","tween":false,"target":52,"key":"y","index":0},{"value":588,"tweenMethod":"linearNone","tween":true,"target":52,"label":null,"key":"y","index":7},{"value":517.3333333333334,"tweenMethod":"linearNone","tween":true,"target":52,"key":"y","index":9},{"value":482,"tweenMethod":"linearNone","tween":true,"target":52,"key":"y","index":13},{"value":80,"tweenMethod":"linearNone","tween":true,"target":52,"key":"y","index":17}],"x":[{"value":379,"tweenMethod":"linearNone","tween":false,"target":52,"key":"x","index":0},{"value":379,"tweenMethod":"linearNone","tween":true,"target":52,"label":null,"key":"x","index":7},{"value":377,"tweenMethod":"linearNone","tween":true,"target":52,"key":"x","index":9},{"value":376,"tweenMethod":"linearNone","tween":true,"target":52,"key":"x","index":13},{"value":79,"tweenMethod":"linearNone","tween":true,"target":52,"key":"x","index":17}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":52,"key":"visible","index":0}],"scaleY":[{"value":0.1,"tweenMethod":"linearNone","tween":false,"target":52,"key":"scaleY","index":0},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":52,"label":null,"key":"scaleY","index":7},{"value":0.16666666666666669,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleY","index":9},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleY","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleY","index":17}],"scaleX":[{"value":0.1,"tweenMethod":"linearNone","tween":false,"target":52,"key":"scaleX","index":0},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":52,"label":null,"key":"scaleX","index":7},{"value":0.16666666666666669,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleX","index":9},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleX","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"key":"scaleX","index":17}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":52,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"label":null,"key":"alpha","index":7},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"key":"alpha","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":52,"key":"alpha","index":16},{"value":0,"tweenMethod":"linearNone","tween":true,"target":52,"key":"alpha","index":17}]}},{"target":53,"keyframes":{"y":[{"value":582,"tweenMethod":"linearNone","tween":false,"target":53,"key":"y","index":0},{"value":582,"tweenMethod":"linearNone","tween":true,"target":53,"label":null,"key":"y","index":8},{"value":511.8,"tweenMethod":"linearNone","tween":true,"target":53,"key":"y","index":10},{"value":465,"tweenMethod":"linearNone","tween":true,"target":53,"key":"y","index":13},{"value":79,"tweenMethod":"linearNone","tween":true,"target":53,"key":"y","index":23}],"x":[{"value":381,"tweenMethod":"linearNone","tween":false,"target":53,"key":"x","index":0},{"value":381,"tweenMethod":"linearNone","tween":true,"target":53,"label":null,"key":"x","index":8},{"value":349.2,"tweenMethod":"linearNone","tween":true,"target":53,"key":"x","index":10},{"value":328,"tweenMethod":"linearNone","tween":true,"target":53,"key":"x","index":13},{"value":79,"tweenMethod":"linearNone","tween":true,"target":53,"key":"x","index":23}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":53,"key":"visible","index":0}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":53,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":53,"label":null,"key":"scaleY","index":8},{"value":0.36,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleY","index":10},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleY","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleY","index":23}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":53,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":53,"label":null,"key":"scaleX","index":8},{"value":0.36,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleX","index":10},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleX","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"key":"scaleX","index":23}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":53,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"label":null,"key":"alpha","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"key":"alpha","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":53,"key":"alpha","index":22},{"value":0,"tweenMethod":"linearNone","tween":true,"target":53,"key":"alpha","index":23}]}},{"target":43,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":43,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":12},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"key":"scaleY","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"key":"scaleY","index":15},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":16},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":18},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":21},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":22},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":24},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":25},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleY","index":27}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":43,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":12},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"key":"scaleX","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"key":"scaleX","index":15},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":16},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":18},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":21},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":22},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":24},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":25},{"value":1,"tweenMethod":"linearNone","tween":true,"target":43,"label":null,"key":"scaleX","index":27}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HuoDeJinBiUI.uiView);

        }

    }
}

module ui {
    export class HuoDePiFuUI extends View {
		public ani1:Laya.FrameAnimation;
		public btn_sure:Laya.Button;
		public btn_cancel:Laya.Button;
		public txt_name:Laya.Label;
		public txt_desc:Laya.Label;
		public img_icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":238,"x":48,"width":618,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":608}},{"type":"Image","props":{"y":330,"x":84,"width":541,"skin":"top/tu_di.png","height":471,"alpha":0.7}},{"type":"Image","props":{"y":538,"x":345,"skin":"scene/huodepifu/tu_3.png","rotation":252,"anchorY":0.5,"anchorX":0.5,"alpha":0.6},"compId":47},{"type":"Button","props":{"y":880,"x":395,"var":"btn_sure","stateNum":1,"skin":"huodepifu/btn_queren.png"},"child":[{"type":"Image","props":{"y":17,"x":91,"skin":"huodepifu/tu_queren.png"}}]},{"type":"Button","props":{"y":883,"x":71,"var":"btn_cancel","stateNum":1,"skin":"huodepifu/btn_quxiao.png"},"child":[{"type":"Image","props":{"y":17,"x":84,"skin":"huodepifu/tu_quxiao.png"}}]},{"type":"Image","props":{"y":536,"x":348,"skin":"scene/huodepifu/tu_2.png","rotation":252,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":45},{"type":"Image","props":{"y":372,"x":172,"skin":"huodepifu/tu_4.png","skewX":0,"scaleY":1.5,"scaleX":1.5,"rotation":363.46153846153845,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":48},{"type":"Image","props":{"y":536,"x":350,"skin":"huodepifu/tu_1.png","scaleY":2.5,"scaleX":2.5,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":49},{"type":"Label","props":{"y":366,"x":285,"var":"txt_name","text":"球球球球","fontSize":34,"color":"#ff1400","bold":true}},{"type":"Label","props":{"y":692,"x":232,"var":"txt_desc","text":"确认1000购买?","fontSize":38,"font":"Microsoft YaHei","color":"#ff0400","bold":false}},{"type":"Image","props":{"y":730,"x":490,"skin":"huodepifu/tu_4.png","scaleY":1,"scaleX":1,"rotation":400,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":57},{"type":"Image","props":{"y":371.33333333333337,"x":544.3333333333334,"skin":"huodepifu/tu_4.png","scaleY":1.2444444444444445,"scaleX":1.2444444444444445,"rotation":444.44444444444446,"anchorY":0.5,"anchorX":0.5,"alpha":0.3846153846153846},"compId":58},{"type":"Image","props":{"y":669.3181818181818,"x":180.3181818181818,"skin":"huodepifu/tu_4.png","scaleY":1.731818181818182,"scaleX":1.731818181818182,"rotation":414.54545454545456,"anchorY":0.5,"anchorX":0.5,"alpha":0.23076923076923073},"compId":59},{"type":"Image","props":{"y":502,"x":127,"skin":"huodepifu/tu_4.png","scaleY":1,"scaleX":1,"rotation":360,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":60},{"type":"Image","props":{"y":280,"x":401,"skin":"huodepifu/tu_4.png","scaleY":0.7,"scaleX":0.7,"rotation":400,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":61},{"type":"Image","props":{"y":612,"x":566,"skin":"huodepifu/tu_4.png","scaleY":1.5,"scaleX":1.5,"rotation":370,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":62},{"type":"Image","props":{"y":467,"x":274,"var":"img_icon","skin":"pifu/role17.png"}},{"type":"Image","props":{"y":265,"x":272,"skin":"huodepifu/bt_hdpf.png"}},{"type":"Image","props":{"y":167,"x":223,"skin":"tongyong/tu_hdj.png"}}],"animations":[{"nodes":[{"target":49,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleY","index":0},{"value":2.5,"tweenMethod":"linearNone","tween":false,"target":49,"key":"scaleY","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"scaleX","index":0},{"value":2.5,"tweenMethod":"linearNone","tween":false,"target":49,"key":"scaleX","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"scaleX","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":false,"target":49,"key":"alpha","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":49,"label":null,"key":"alpha","index":30}]}},{"target":48,"keyframes":{"y":[{"value":565,"tweenMethod":"linearNone","tween":true,"target":48,"key":"y","index":0},{"value":405,"tweenMethod":"linearNone","tween":true,"target":48,"key":"y","index":15}],"x":[{"value":352,"tweenMethod":"linearNone","tween":true,"target":48,"key":"x","index":0},{"value":185,"tweenMethod":"linearNone","tween":true,"target":48,"key":"x","index":15}],"skewX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"key":"skewX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"key":"skewX","index":26}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleY","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleY","index":15}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleX","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":48,"key":"scaleX","index":15}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"key":"rotation","index":0},{"value":450,"tweenMethod":"linearNone","tween":true,"target":48,"key":"rotation","index":26}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":48,"key":"alpha","index":18}]}},{"target":57,"keyframes":{"y":[{"value":578,"tweenMethod":"linearNone","tween":false,"target":57,"key":"y","index":0},{"value":600,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"y","index":4},{"value":763,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":19}],"x":[{"value":364,"tweenMethod":"linearNone","tween":false,"target":57,"key":"x","index":0},{"value":374,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"x","index":4},{"value":503,"tweenMethod":"linearNone","tween":true,"target":57,"key":"x","index":19}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":57,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"scaleY","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleY","index":19}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":57,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"scaleX","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleX","index":19}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":57,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"rotation","index":4},{"value":400,"tweenMethod":"linearNone","tween":true,"target":57,"key":"rotation","index":19}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":57,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"label":null,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":21}]}},{"target":58,"keyframes":{"y":[{"value":567,"tweenMethod":"linearNone","tween":false,"target":58,"key":"y","index":0},{"value":567,"tweenMethod":"linearNone","tween":true,"target":58,"label":null,"key":"y","index":5},{"value":384,"tweenMethod":"linearNone","tween":true,"target":58,"key":"y","index":23}],"x":[{"value":360,"tweenMethod":"linearNone","tween":false,"target":58,"key":"x","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":58,"label":null,"key":"x","index":5},{"value":582,"tweenMethod":"linearNone","tween":true,"target":58,"key":"x","index":23}],"scaleY":[{"value":0.8,"tweenMethod":"linearNone","tween":false,"target":58,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":58,"label":null,"key":"scaleY","index":5},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":58,"key":"scaleY","index":23}],"scaleX":[{"value":0.8,"tweenMethod":"linearNone","tween":false,"target":58,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":58,"label":null,"key":"scaleX","index":5},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":58,"key":"scaleX","index":23}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":58,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":58,"label":null,"key":"rotation","index":5},{"value":500,"tweenMethod":"linearNone","tween":true,"target":58,"key":"rotation","index":23}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":58,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":58,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":58,"key":"alpha","index":13},{"value":0,"tweenMethod":"linearNone","tween":true,"target":58,"key":"alpha","index":26}]}},{"target":59,"keyframes":{"y":[{"value":565,"tweenMethod":"linearNone","tween":false,"target":59,"key":"y","index":0},{"value":565,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"y","index":2},{"value":724,"tweenMethod":"linearNone","tween":true,"target":59,"key":"y","index":24}],"x":[{"value":360,"tweenMethod":"linearNone","tween":false,"target":59,"key":"x","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"x","index":2},{"value":167,"tweenMethod":"linearNone","tween":true,"target":59,"key":"x","index":24}],"scaleY":[{"value":1.5,"tweenMethod":"linearNone","tween":false,"target":59,"key":"scaleY","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"scaleY","index":2},{"value":1.8,"tweenMethod":"linearNone","tween":true,"target":59,"key":"scaleY","index":24}],"scaleX":[{"value":1.5,"tweenMethod":"linearNone","tween":false,"target":59,"key":"scaleX","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"scaleX","index":2},{"value":1.8,"tweenMethod":"linearNone","tween":true,"target":59,"key":"scaleX","index":24}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":59,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"rotation","index":2},{"value":480,"tweenMethod":"linearNone","tween":true,"target":59,"key":"rotation","index":24}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":59,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":59,"label":null,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":59,"key":"alpha","index":11},{"value":0,"tweenMethod":"linearNone","tween":true,"target":59,"key":"alpha","index":24}]}},{"target":60,"keyframes":{"y":[{"value":563,"tweenMethod":"linearNone","tween":false,"target":60,"key":"y","index":0},{"value":563,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"y","index":2},{"value":535,"tweenMethod":"linearNone","tween":true,"target":60,"key":"y","index":14}],"x":[{"value":359,"tweenMethod":"linearNone","tween":false,"target":60,"key":"x","index":0},{"value":359,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"x","index":2},{"value":140,"tweenMethod":"linearNone","tween":true,"target":60,"key":"x","index":14}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":60,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"scaleY","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":60,"key":"scaleY","index":14}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":60,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"scaleX","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":60,"key":"scaleX","index":14}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":60,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"rotation","index":2},{"value":360,"tweenMethod":"linearNone","tween":true,"target":60,"key":"rotation","index":14}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":60,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":60,"label":null,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":60,"key":"alpha","index":6},{"value":0,"tweenMethod":"linearNone","tween":true,"target":60,"key":"alpha","index":14}]}},{"target":61,"keyframes":{"y":[{"value":567,"tweenMethod":"linearNone","tween":false,"target":61,"key":"y","index":0},{"value":567,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"y","index":3},{"value":313,"tweenMethod":"linearNone","tween":true,"target":61,"key":"y","index":17}],"x":[{"value":360,"tweenMethod":"linearNone","tween":false,"target":61,"key":"x","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"x","index":3},{"value":414,"tweenMethod":"linearNone","tween":true,"target":61,"key":"x","index":17}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":61,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"scaleY","index":3},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":61,"key":"scaleY","index":17}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":false,"target":61,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"scaleX","index":3},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":61,"key":"scaleX","index":17}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":61,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"rotation","index":3},{"value":400,"tweenMethod":"linearNone","tween":true,"target":61,"key":"rotation","index":17}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":61,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":61,"label":null,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":61,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":61,"key":"alpha","index":17}]}},{"target":62,"keyframes":{"y":[{"value":566,"tweenMethod":"linearNone","tween":true,"target":62,"key":"y","index":0},{"value":645,"tweenMethod":"linearNone","tween":true,"target":62,"key":"y","index":14}],"x":[{"value":355,"tweenMethod":"linearNone","tween":true,"target":62,"key":"x","index":0},{"value":579,"tweenMethod":"linearNone","tween":true,"target":62,"key":"x","index":14}],"scaleY":[{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":14}],"scaleX":[{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":14}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":62,"key":"rotation","index":0},{"value":370,"tweenMethod":"linearNone","tween":true,"target":62,"key":"rotation","index":14}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":7},{"value":0,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":14}]}},{"target":45,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":45,"key":"rotation","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":45,"key":"alpha","index":30}]}},{"target":47,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":47,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":47,"key":"rotation","index":30}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":15},{"value":0,"tweenMethod":"linearNone","tween":true,"target":47,"key":"alpha","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HuoDePiFuUI.uiView);

        }

    }
}

module ui {
    export class JieSuanUI extends View {
		public img_ban:Laya.Image;
		public txtMoney:Laya.Label;
		public txt_score:Laya.Label;
		public btn_share:Laya.Button;
		public txt_allTop:Laya.Label;
		public mouseLayer:Laya.Image;
		public box_isNew:Laya.Box;
		public btn_restart:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":1013,"x":0,"width":718,"var":"img_ban","height":270}},{"type":"Box","props":{"y":28,"x":29},"child":[{"type":"Image","props":{"y":10,"x":47,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"skin":"tongyong/tu_jinbi.png"}},{"type":"Label","props":{"y":22,"x":84,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Box","props":{"y":170,"x":0,"width":721,"height":191},"child":[{"type":"Label","props":{"y":56,"var":"txt_score","text":"0000","fontSize":80,"color":"#ffc047","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":7,"x":85,"skin":"jiesuan/tu_bccj.png"}}]},{"type":"Button","props":{"y":808,"x":372,"var":"btn_share","stateNum":1,"skin":"tongyong/btn_2.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":26,"x":67,"skin":"jiesuan/tu_fqtz.png"}}]},{"type":"Box","props":{"y":328,"x":54},"child":[{"type":"Image","props":{"y":0,"x":0,"width":619,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":374}},{"type":"Image","props":{"y":60,"x":28,"width":564,"skin":"top/tu_di.png","sizeGrid":"30,30,30,30","height":288,"alpha":0.7}},{"type":"Label","props":{"y":22,"x":430,"width":158,"visible":true,"var":"txt_allTop","underline":true,"text":"查看全部排行","height":36,"fontSize":26,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Image","props":{"y":96,"x":39,"width":542,"var":"mouseLayer","height":211}},{"type":"Image","props":{"y":10,"x":26,"skin":"top/tu_hyphb1.png"}}]},{"type":"Box","props":{"y":213,"x":463,"var":"box_isNew"},"child":[{"type":"Image","props":{"skin":"tongyong/tu_xjl.png"}}]},{"type":"Label","props":{"y":878,"x":324,"var":"btn_restart","text":"再玩一局","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.JieSuanUI.uiView);

        }

    }
}

module ui {
    export class LianXuDengLuUI extends View {
		public btn_double:Laya.Button;
		public img_txt:Laya.Image;
		public checkBox:Laya.CheckBox;
		public list_day:Laya.List;
		public img_ban:Laya.Image;
		public btnHome:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":185,"width":672,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":649,"centerX":1}},{"type":"Button","props":{"y":933,"x":375,"width":305,"var":"btn_double","stateNum":1,"skin":"tongyong/btn_1.png","height":95,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":48,"var":"img_txt","skin":"qiridenglu/tu_lqjl.png","centerX":3,"anchorY":0.5,"anchorX":0.5}}]},{"type":"CheckBox","props":{"y":753,"x":205,"var":"checkBox","skin":"tongyong/checkbox_1.png"},"child":[{"type":"Label","props":{"y":13,"x":51,"width":349,"text":"观看视频使你的奖励翻倍","height":32,"fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":112,"x":246,"skin":"tongyong/tu_hdj.png"}},{"type":"List","props":{"y":263,"x":70,"width":619,"var":"list_day","height":495},"child":[{"type":"QianDao_T","props":{"y":0,"x":0,"renderType":"render","runtime":"ui.component.QianDao_TUI"}}]},{"type":"Image","props":{"y":1058,"x":19,"width":718,"var":"img_ban","height":270}},{"type":"Label","props":{"y":986,"x":325,"var":"btnHome","text":"点击关闭","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.QianDao_TUI",ui.component.QianDao_TUI);

            super.createChildren();
            this.createView(ui.LianXuDengLuUI.uiView);

        }

    }
}

module ui {
    export class logoUI extends View {
		public img_bk:Laya.Image;
		public box_tip:Laya.Box;
		public lab_jindu:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Box","props":{"y":0,"x":0,"width":753,"height":1334},"child":[{"type":"Image","props":{"var":"img_bk","skin":"tongyong/tu_fkw.jpg"}},{"type":"Box","props":{"y":964,"width":750,"var":"box_tip"},"child":[{"type":"Label","props":{"y":243.5,"x":375,"width":750,"text":"抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当\\n适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活","leading":12,"height":68,"fontSize":22,"font":"SimHei","color":"#8e8e8e","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":131.5,"x":375,"width":750,"text":"本游戏适合年满7周岁以上的用户使用\\n请您确定已如实进行实名注册\\n为了您的健康，请合理控制游戏时间","leading":20,"height":143,"fontSize":24,"font":"SimHei","color":"#8e8e8e","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":19.5,"x":375,"width":750,"text":"健康提示","leading":20,"height":39,"fontSize":32,"font":"SimHei","color":"#8e8e8e","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Label","props":{"y":839,"x":374,"width":750,"var":"lab_jindu","text":"当前加载进度：100%","leading":12,"height":68,"fontSize":22,"color":"#000000","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.logoUI.uiView);

        }

    }
}

module ui {
    export class PiFuUI extends View {
		public btn_skin:Laya.Button;
		public btn_eff:Laya.Button;
		public list_skin:Laya.List;
		public txtMoney:Laya.Label;
		public btn_close:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":90,"x":42,"width":665,"skin":"tongyong/tu_di.png","sizeGrid":"100,100,100,100","height":330}},{"type":"Box","props":{"y":353,"x":45,"width":662,"height":719},"child":[{"type":"Image","props":{"y":66,"x":0,"width":664,"skin":"tongyong/tu_di.png","sizeGrid":"30,30,30,30","height":653}},{"type":"Image","props":{"y":174,"x":26,"width":609,"skin":"pifu/di.png","sizeGrid":"20,20,20,20","height":513}},{"type":"Image","props":{"y":0,"x":197,"skin":"tongyong/tu_hdj.png"}},{"type":"Button","props":{"y":115,"x":88,"var":"btn_skin","stateNum":2,"skin":"pifu/btn_pifu.png"}},{"type":"Button","props":{"y":115,"x":364,"var":"btn_eff","stateNum":2,"skin":"pifu/btn_texiao.png"}},{"type":"Panel","props":{"y":190,"x":22,"width":592,"height":497},"child":[{"type":"List","props":{"y":1,"x":29,"width":573,"var":"list_skin","spaceY":10,"spaceX":30,"repeatY":3,"repeatX":3,"height":496},"child":[{"type":"PiFuItem","props":{"visible":false,"renderType":"render","runtime":"ui.component.PiFuItemUI"}}]}]}]},{"type":"Box","props":{"y":13,"x":11,"scaleY":0.9,"scaleX":0.9},"child":[{"type":"Image","props":{"y":6,"x":34,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"y":0,"x":0,"skin":"tongyong/tu_jinbi.png","scaleY":0.7,"scaleX":0.7}},{"type":"Label","props":{"y":9,"x":62,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffcf17","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":1094,"x":325,"var":"btn_close","text":"点击关闭","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.PiFuItemUI",ui.component.PiFuItemUI);

            super.createChildren();
            this.createView(ui.PiFuUI.uiView);

        }

    }
}

module ui {
    export class PlayUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani3:Laya.FrameAnimation;
		public ani6:Laya.FrameAnimation;
		public img_ban:Laya.Image;
		public btn_start:Laya.Button;
		public box_huadong:Laya.Box;
		public img_start_hand:Laya.Image;
		public txt_best:Laya.Label;
		public img_share2:Laya.Image;
		public img_best:Laya.Image;
		public img_more:Laya.Image;
		public txt_ver:Laya.Label;
		public img_ad:Laya.Image;
		public box_view:Laya.Box;
		public box_coin:Laya.Box;
		public txtMoney:Laya.Label;
		public btn_zhuanpan:Laya.Button;
		public btn_qd:Laya.Button;
		public btn_skin:Laya.Button;
		public btn_top:Laya.Button;
		public box_share:Laya.Box;
		public btn_share:Laya.Button;
		public img_share1:Laya.Image;
		public btn_want:Laya.Button;
		public btn_chengjiu:Laya.Button;
		public btn_levelUp:Laya.Button;
		public btn_set:Laya.Button;
		public img_set:Laya.Image;
		public btn_bgm:Laya.Button;
		public btn_sound_effect:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":1015,"x":-2,"width":718,"var":"img_ban","height":270}},{"type":"Button","props":{"y":753,"x":359,"var":"btn_start","stateNum":1,"skin":"play/btn_kaishi.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":777,"x":169,"var":"box_huadong"},"child":[{"type":"Image","props":{"skin":"play/tiao.png"}},{"type":"Image","props":{"y":0,"x":335,"var":"img_start_hand","skin":"play/shou.png"}}]},{"type":"Label","props":{"y":421,"width":234,"var":"txt_best","text":"100","height":80,"fontSize":80,"color":"#ffffff","centerX":8,"bold":true,"align":"center"}},{"type":"Image","props":{"y":682,"x":260,"visible":false,"var":"img_share2","skin":"tongyong/jb11.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":384,"x":305,"var":"img_best","skin":"play/tu_lszj.png"}},{"type":"Image","props":{"y":70,"x":611,"var":"img_more","skin":"play/btn_gengduo.png"}},{"type":"Label","props":{"y":805,"x":27,"var":"txt_ver","text":"v0.90.3","fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":473,"x":6,"width":200,"var":"img_ad","height":200},"compId":156},{"type":"Box","props":{"y":21,"x":21,"var":"box_view"},"child":[{"type":"Box","props":{"y":3,"x":1,"var":"box_coin","scaleY":0.9,"scaleX":0.9},"child":[{"type":"Image","props":{"y":6,"x":34,"skin":"tongyong/tu_shuzidi.png"}},{"type":"Image","props":{"y":0,"x":0,"skin":"tongyong/tu_jinbi.png","scaleY":0.7,"scaleX":0.7}},{"type":"Label","props":{"y":9,"x":62,"width":127,"var":"txtMoney","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffcf17","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":288,"x":632,"var":"btn_zhuanpan","stateNum":1,"skin":"play/btn_xyzp.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":16,"x":20,"skin":"play/hong.png","alpha":1},"compId":135},{"type":"Image","props":{"y":3,"x":52,"skin":"play/huang.png","alpha":0},"compId":136},{"type":"Image","props":{"y":16,"x":81,"skin":"play/zi.png","alpha":0},"compId":137},{"type":"Image","props":{"y":46,"x":8,"skin":"play/lan.png","alpha":1},"compId":138},{"type":"Image","props":{"y":73,"x":19,"skin":"play/huang.png","scaleY":1.1,"scaleX":1.1,"alpha":1},"compId":139},{"type":"Image","props":{"y":46,"x":93,"skin":"play/lan.png","alpha":0},"compId":141},{"type":"Image","props":{"y":73,"x":82,"skin":"play/hong.png","alpha":1},"compId":142}]},{"type":"Button","props":{"y":418,"x":634,"var":"btn_qd","stateNum":1,"skin":"play/btn_qiandao.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5},"compId":116},{"type":"Button","props":{"y":924,"x":417,"var":"btn_skin","stateNum":1,"skin":"play/btn_pifu.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":924,"x":245,"var":"btn_top","stateNum":1,"skin":"play/btn_paihangbang.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":843,"x":15,"width":138,"var":"box_share","height":154},"child":[{"type":"Button","props":{"y":85,"x":69,"var":"btn_share","stateNum":1,"skin":"play/btn_fenxiang.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"var":"img_share1","skin":"tongyong/jb.png","scaleY":0.9,"scaleX":0.9}}]},{"type":"Button","props":{"y":931,"x":251,"var":"btn_want","stateNum":1,"skin":"play/btn_wyjb.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":17,"x":98,"skin":"play/xingguang.png","scaleY":0.45,"scaleX":0.45,"anchorY":0.5,"anchorX":0.5},"compId":129},{"type":"Image","props":{"y":48,"x":58,"skin":"play/xingguang.png","scaleY":0.125,"scaleX":0.075,"anchorY":0.5,"anchorX":0.5},"compId":130},{"type":"Image","props":{"y":32,"x":44,"skin":"play/xingguang.png","scaleY":0.2571428571428571,"scaleX":0.08571428571428573,"anchorY":0.5,"anchorX":0.5},"compId":131},{"type":"Image","props":{"y":61,"x":16,"skin":"play/xingguang.png","scaleY":0,"scaleX":0,"anchorY":0.5,"anchorX":0.5},"compId":132},{"type":"Image","props":{"y":22,"x":21,"skin":"play/xingguang.png","scaleY":0.23333333333333328,"scaleX":0.09999999999999999,"anchorY":0.5,"anchorX":0.5},"compId":133},{"type":"Image","props":{"y":70,"x":92,"skin":"play/xingguang.png","scaleY":0.18000000000000002,"scaleX":0.135,"anchorY":0.5,"anchorX":0.5},"compId":134}]},{"type":"Button","props":{"y":923,"x":45,"var":"btn_chengjiu","stateNum":1,"skin":"play/btn_chengjiu.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":923,"x":475,"var":"btn_levelUp","stateNum":1,"skin":"play/btn_djsj.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":847,"x":524,"var":"btn_set","stateNum":1,"skin":"play/btn_shezhi.png"}},{"type":"Image","props":{"y":626,"x":399,"var":"img_set","skin":"play/di_shezhi.png"},"child":[{"type":"Button","props":{"y":31,"x":169,"var":"btn_bgm","skin":"play/btn_sz.png"}},{"type":"Button","props":{"y":91,"x":169,"var":"btn_sound_effect","skin":"play/btn_sz.png"}}]},{"type":"Image","props":{"y":92,"x":-11,"skin":"play/di_djsw.png"},"child":[{"type":"Image","props":{"y":11,"x":12,"skin":"play/tu_icon.png"}}]}]}],"animations":[{"nodes":[{"target":116,"keyframes":{"width":[{"value":112,"tweenMethod":"linearNone","tween":false,"target":116,"key":"width","index":0},{"value":127,"tweenMethod":"linearNone","tween":true,"target":116,"key":"width","index":7},{"value":92,"tweenMethod":"linearNone","tween":true,"target":116,"key":"width","index":10},{"value":123,"tweenMethod":"linearNone","tween":true,"target":116,"key":"width","index":14},{"value":112,"tweenMethod":"linearNone","tween":true,"target":116,"key":"width","index":18},{"value":116,"tweenMethod":"linearNone","tween":true,"target":116,"key":"width","index":22},{"value":112,"tweenMethod":"linearNone","tween":false,"target":116,"key":"width","index":27},{"value":112,"tweenMethod":"linearNone","tween":false,"target":116,"label":null,"key":"width","index":50}],"height":[{"value":116,"tweenMethod":"linearNone","tween":true,"target":116,"key":"height","index":0},{"value":131,"tweenMethod":"linearNone","tween":true,"target":116,"key":"height","index":4},{"value":69,"tweenMethod":"linearNone","tween":true,"target":116,"key":"height","index":7},{"value":121,"tweenMethod":"linearNone","tween":true,"target":116,"key":"height","index":10},{"value":110,"tweenMethod":"linearNone","tween":true,"target":116,"key":"height","index":14},{"value":116,"tweenMethod":"linearNone","tween":false,"target":116,"key":"height","index":18},{"value":116,"tweenMethod":"linearNone","tween":true,"target":116,"label":null,"key":"height","index":50}]}}],"name":"ani1","id":1,"frameRate":24,"action":2},{"nodes":[{"target":129,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":129,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":129,"key":"scaleY","index":10},{"value":0,"tweenMethod":"linearNone","tween":false,"target":129,"key":"scaleY","index":17}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":129,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":129,"key":"scaleX","index":10},{"value":0,"tweenMethod":"linearNone","tween":false,"target":129,"key":"scaleX","index":17}]}},{"target":130,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":false,"target":130,"key":"scaleY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":130,"key":"scaleY","index":6},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":130,"key":"scaleY","index":18},{"value":0,"tweenMethod":"linearNone","tween":false,"target":130,"key":"scaleY","index":26}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":130,"key":"scaleX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":130,"key":"scaleX","index":6},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":130,"key":"scaleX","index":18},{"value":0,"tweenMethod":"linearNone","tween":false,"target":130,"key":"scaleX","index":26}]}},{"target":131,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":131,"key":"scaleY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":131,"key":"scaleY","index":3},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":131,"key":"scaleY","index":10},{"value":0,"tweenMethod":"linearNone","tween":false,"target":131,"key":"scaleY","index":16}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":131,"key":"scaleX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":131,"key":"scaleX","index":3},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":131,"key":"scaleX","index":10},{"value":0,"tweenMethod":"linearNone","tween":false,"target":131,"key":"scaleX","index":16}]}},{"target":132,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":132,"key":"scaleY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":132,"key":"scaleY","index":9},{"value":0.4,"tweenMethod":"linearNone","tween":true,"target":132,"key":"scaleY","index":20},{"value":0,"tweenMethod":"linearNone","tween":false,"target":132,"key":"scaleY","index":28}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":132,"key":"scaleX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":132,"key":"scaleX","index":9},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":132,"key":"scaleX","index":20},{"value":0,"tweenMethod":"linearNone","tween":false,"target":132,"key":"scaleX","index":28}]}},{"target":133,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":133,"key":"scaleY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":133,"key":"scaleY","index":6},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":133,"key":"scaleY","index":15},{"value":0,"tweenMethod":"linearNone","tween":false,"target":133,"key":"scaleY","index":27}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":133,"key":"scaleX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":133,"key":"scaleX","index":6},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":133,"key":"scaleX","index":15},{"value":0,"tweenMethod":"linearNone","tween":false,"target":133,"key":"scaleX","index":27}]}},{"target":134,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleY","index":0},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleY","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleY","index":18}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleX","index":0},{"value":0.15,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleX","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":134,"key":"scaleX","index":18}]}}],"name":"ani2","id":2,"frameRate":24,"action":2},{"nodes":[{"target":135,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":135,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":135,"key":"alpha","index":6}]}},{"target":136,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":136,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":136,"key":"alpha","index":7}]}},{"target":137,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":137,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":137,"key":"alpha","index":9}]}},{"target":138,"keyframes":{"y":[{"value":46,"tweenMethod":"linearNone","tween":false,"target":138,"key":"y","index":0},{"value":46,"tweenMethod":"linearNone","tween":true,"target":138,"key":"y","index":5}],"x":[{"value":93,"tweenMethod":"linearNone","tween":false,"target":138,"key":"x","index":0},{"value":8,"tweenMethod":"linearNone","tween":true,"target":138,"key":"x","index":5}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":138,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":138,"key":"alpha","index":5}]}},{"target":139,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":139,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":139,"key":"alpha","index":2}]}},{"target":141,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":false,"target":141,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":141,"key":"alpha","index":11}]}},{"target":142,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":142,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":142,"key":"alpha","index":13}]}}],"name":"ani3","id":3,"frameRate":24,"action":2},{"nodes":[],"name":"ani4","id":4,"frameRate":24,"action":1},{"nodes":[],"name":"ani5","id":5,"frameRate":24,"action":2},{"nodes":[{"target":156,"keyframes":{"y":[{"value":473,"tweenMethod":"linearNone","tween":true,"target":156,"key":"y","index":0},{"value":448,"tweenMethod":"linearNone","tween":true,"target":156,"key":"y","index":6},{"value":473,"tweenMethod":"linearNone","tween":true,"target":156,"key":"y","index":9},{"value":458,"tweenMethod":"linearNone","tween":true,"target":156,"key":"y","index":13},{"value":473,"tweenMethod":"linearNone","tween":true,"target":156,"key":"y","index":16}],"x":[{"value":6,"tweenMethod":"linearNone","tween":true,"target":156,"key":"x","index":0},{"value":6,"tweenMethod":"linearNone","tween":true,"target":156,"key":"x","index":55}]}}],"name":"ani6","id":6,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PlayUI.uiView);

        }

    }
}

module ui {
    export class TipGoldUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":120,"height":150}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.TipGoldUI.uiView);

        }

    }
}

module ui {
    export class Tips_21UI extends View {
		public txt_JD:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":530,"x":91,"width":583,"var":"txt_JD","text":"你的金钱不足","height":29,"fontSize":30,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Tips_21UI.uiView);

        }

    }
}

module ui {
    export class Tips_3UI extends View {
		public ani1:Laya.FrameAnimation;
		public txt_gold:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":223,"x":377,"skin":"tongyong/tu_tishikuang.png","anchorY":0.5,"anchorX":0.5,"alpha":0.5882352941176471},"compId":108},{"type":"Label","props":{"y":219.47058823529412,"x":375,"width":583,"var":"txt_gold","text":"你的金钱不足","height":29,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5,"alpha":0.5882352941176471,"align":"center"},"compId":107}],"animations":[{"nodes":[{"target":107,"keyframes":{"y":[{"value":308,"tweenMethod":"linearNone","tween":true,"target":107,"key":"y","index":0},{"value":308,"tweenMethod":"linearNone","tween":false,"target":107,"key":"y","index":5},{"value":308,"tweenMethod":"linearNone","tween":true,"target":107,"key":"y","index":11},{"value":93,"tweenMethod":"linearNone","tween":true,"target":107,"key":"y","index":28}],"x":[{"value":-343,"tweenMethod":"linearNone","tween":true,"target":107,"key":"x","index":0},{"value":399,"tweenMethod":"linearNone","tween":true,"target":107,"key":"x","index":5},{"value":386,"tweenMethod":"linearNone","tween":true,"target":107,"key":"x","index":6},{"value":375,"tweenMethod":"linearNone","tween":false,"target":107,"label":null,"key":"x","index":8},{"value":375,"tweenMethod":"linearNone","tween":true,"target":107,"label":null,"key":"x","index":11}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":107,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":false,"target":107,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":107,"label":null,"key":"alpha","index":11},{"value":0,"tweenMethod":"linearNone","tween":true,"target":107,"key":"alpha","index":28}]}},{"target":108,"keyframes":{"y":[{"value":313,"tweenMethod":"linearNone","tween":true,"target":108,"key":"y","index":0},{"value":313,"tweenMethod":"linearNone","tween":false,"target":108,"key":"y","index":5},{"value":314,"tweenMethod":"linearNone","tween":true,"target":108,"label":null,"key":"y","index":11},{"value":93,"tweenMethod":"linearNone","tween":true,"target":108,"key":"y","index":28}],"x":[{"value":-339,"tweenMethod":"linearNone","tween":true,"target":108,"key":"x","index":0},{"value":395,"tweenMethod":"linearNone","tween":true,"target":108,"key":"x","index":5},{"value":387,"tweenMethod":"linearNone","tween":true,"target":108,"key":"x","index":6},{"value":377,"tweenMethod":"linearNone","tween":false,"target":108,"label":null,"key":"x","index":8},{"value":377,"tweenMethod":"linearNone","tween":true,"target":108,"label":null,"key":"x","index":11}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":108,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":false,"target":108,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":108,"key":"alpha","index":11},{"value":0,"tweenMethod":"linearNone","tween":true,"target":108,"key":"alpha","index":28}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Tips_3UI.uiView);

        }

    }
}

module ui {
    export class TopUI extends View {
		public mouseLayer:Laya.Image;
		public btn_back:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":720,"renderType":"render","height":1280},"child":[{"type":"Image","props":{"y":124,"width":612,"skin":"tongyong/tu_di.png","sizeGrid":"60,60,60,60","height":787,"centerX":0}},{"type":"List","props":{"y":209,"x":116,"width":488,"visible":false,"spaceY":15,"height":598},"child":[{"type":"Top_T","props":{"y":0,"x":0,"name":"render","runtime":"ui.component.Top_TUI"}}]},{"type":"Top_T","props":{"y":904,"x":49,"visible":false,"runtime":"ui.component.Top_TUI"}},{"type":"Image","props":{"y":173,"width":641,"var":"mouseLayer","sizeGrid":"33,41,47,41","height":861,"centerX":0}},{"type":"Image","props":{"y":163,"x":243,"skin":"top/bt_hyph.png"}},{"type":"Image","props":{"y":59,"x":237,"skin":"tongyong/tu_hdj.png"}},{"type":"Label","props":{"y":933,"x":310,"var":"btn_back","text":"点击关闭","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.component.Top_TUI",ui.component.Top_TUI);

            super.createChildren();
            this.createView(ui.TopUI.uiView);

        }

    }
}

module ui {
    export class WudiUI extends View {
		public btn_video:Laya.Button;
		public btn_start:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":273,"x":30,"width":665,"skin":"tongyong/tu_di.png","height":505},"child":[{"type":"Image","props":{"y":96,"x":35,"width":595,"skin":"top/tu_di.png","sizeGrid":"26,42,31,40","height":366,"alpha":0.7}},{"type":"Label","props":{"y":243,"x":100,"text":"立即免费获得1次无敌状态","fontSize":40,"font":"Microsoft YaHei","color":"#2c2a2a"}}]},{"type":"Button","props":{"y":845,"x":212,"var":"btn_video","stateNum":1,"skin":"tongyong/btn_1.png"},"child":[{"type":"Image","props":{"y":17,"x":25,"skin":"play/tu_ljcc.png"}}]},{"type":"Label","props":{"y":963,"x":297,"var":"btn_start","text":"不了，谢谢","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.WudiUI.uiView);

        }

    }
}

module ui {
    export class YaoQingHaoYouUI extends View {
		public btnHome:Laya.Button;
		public box_1:Laya.Box;
		public btn_1:Laya.Button;
		public box_2:Laya.Box;
		public btn_2:Laya.Button;
		public box_3:Laya.Box;
		public btn_3:Laya.Button;
		public box_4:Laya.Box;
		public btn_4:Laya.Button;
		public box_5:Laya.Box;
		public btn_5:Laya.Button;
		public box_6:Laya.Box;
		public btn_6:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Button","props":{"y":93,"x":82,"var":"btnHome","stateNum":1,"skin":"tongyong/btn_fh.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":331,"width":672,"skin":"tongyong/tu_di.png","sizeGrid":"33,41,47,41","height":593,"centerX":0}},{"type":"Image","props":{"y":246,"skin":"yaoqinghaoy/tu_yqhy.png","centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":857,"width":602,"text":"每有一个好友点击链接，即可获得500金币","height":32,"fontSize":26,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Box","props":{"y":378,"x":109,"width":141,"var":"box_1","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_1","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":378,"x":304,"width":141,"var":"box_2","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_2","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":378,"x":499,"width":141,"var":"box_3","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_3","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":617,"x":109,"width":141,"var":"box_4","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_4","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":617,"x":304,"width":141,"var":"box_5","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_5","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":617,"x":499,"width":141,"var":"box_6","height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"qiridenglu/tu_xxd2.png"}},{"type":"Label","props":{"y":9,"width":141,"text":"金币500","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":73,"skin":"tongyong/tu_qian5.png","centerX":0}},{"type":"Button","props":{"y":195,"var":"btn_6","stateNum":1,"skin":"yaoqinghaoy/btn_yq.png","labelSize":75,"labelPadding":"-5","labelColors":"#ffffff","labelBold":true,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.YaoQingHaoYouUI.uiView);

        }

    }
}

module ui {
    export class YinDaoUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":123,"x":76,"skin":"yindao/tu_yindao.png"}},{"type":"Image","props":{"y":424,"x":76,"skin":"yindao/tu_yindao2.png"}},{"type":"Image","props":{"y":725,"x":76,"skin":"yindao/tu_yindao3.png"}},{"type":"Label","props":{"y":82,"x":168,"text":"手指滑动屏幕控制小球左右移动","fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":350,"x":208,"width":312,"text":"撞击同色球，避开异色球","height":28,"fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":384,"x":207,"width":314,"text":"条纹球会让捡球积分加倍","height":28,"fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":686,"x":207,"width":314,"text":"经过滑板会使球球变色","height":28,"fontSize":28,"color":"#ffffff"}},{"type":"Button","props":{"y":977,"x":219,"stateNum":1,"skin":"yindao/btn_wzdl.png"}}]}],"animations":[{"nodes":[{"target":9,"keyframes":{"y":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":15}],"x":[{"value":-13,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":447,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":15},{"value":-13,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.YinDaoUI.uiView);

        }

    }
}

module ui {
    export class YouXiUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani3:Laya.FrameAnimation;
		public txt_dis1:Laya.Label;
		public txt_time:Laya.Label;
		public img_combo:Laya.Image;
		public txt_combo_num:Laya.Label;
		public progress_speed:Laya.ProgressBar;
		public progress_power:Laya.ProgressBar;
		public txt_speed:Laya.Label;
		public img_power:Laya.Image;
		public img_speed:Laya.Image;
		public img_score:Laya.Image;
		public txt_score:Laya.Label;
		public txt_road_t:Laya.Label;
		public txt_road:Laya.Label;
		public txt_get_coin_t:Laya.Label;
		public txt_get_coin:Laya.Label;
		public txt_speed_t:Laya.Label;
		public txt_speed1:Laya.Label;
		public txt_beishu_t:Laya.Label;
		public txt_beishu:Laya.Label;
		public txt_dis:Laya.Label;
		public img_gem:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":676,"width":450,"visible":false,"var":"txt_dis1","text":"999m","strokeColor":"#0b1730","stroke":5,"height":77,"fontSize":76,"font":"Helvetica","color":"#00ffcb","centerX":55,"bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":30,"x":11,"width":234,"var":"txt_time","text":"时长00:00:00","strokeColor":"#0b1730","stroke":5,"height":36,"fontSize":35,"font":"SimHei","color":"#cacaca","bold":true}},{"type":"Image","props":{"y":457,"x":418,"visible":false,"var":"img_combo","skin":"tongyong/tu_Combo.png"},"compId":29,"child":[{"type":"Label","props":{"y":22,"x":211,"width":105,"var":"txt_combo_num","text":"99","strokeColor":"#0b1730","italic":true,"height":82,"fontSize":72,"font":"Helvetica","color":"#f3f15a","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"ProgressBar","props":{"y":809,"x":705,"width":231,"var":"progress_speed","skin":"tongyong/progress_xuetiao2.png","sizeGrid":"0,14,0,21","scaleY":1.2,"scaleX":1.2,"rotation":-90,"height":21}},{"type":"Label","props":{"y":823,"x":689,"width":54,"text":"时速 ","strokeColor":"#0b1730","stroke":4,"height":31,"fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"ProgressBar","props":{"y":809,"x":29,"width":231,"var":"progress_power","skin":"tongyong/progress_xuetiao1.png","sizeGrid":"0,14,0,21","scaleY":1.2,"scaleX":1.2,"rotation":-90,"height":21}},{"type":"Label","props":{"y":817,"x":13,"wordWrap":true,"width":54,"text":"冲刺能量","strokeColor":"#0b1730","stroke":4,"height":31,"fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":500,"x":689,"width":54,"var":"txt_speed","text":"00/S","strokeColor":"#0b1730","stroke":4,"height":31,"fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":825,"x":26,"width":259,"visible":false,"var":"img_power","skin":"tongyong/tu_guang.png","sizeGrid":"0,40,0,40","scaleY":1.2,"scaleX":1.2,"rotation":-90,"height":25},"compId":37},{"type":"Image","props":{"y":826,"x":703,"width":259,"visible":false,"var":"img_speed","skin":"tongyong/tu_guang.png","sizeGrid":"0,40,0,40","scaleY":1.2,"scaleX":1.2,"rotation":-90,"height":25},"compId":38},{"type":"Box","props":{"y":93,"x":124},"child":[{"type":"Image","props":{"x":176,"var":"img_score","skin":"tongyong/shuzidi.png"}},{"type":"Label","props":{"y":35,"x":192,"width":140,"var":"txt_score","text":"23","height":100,"fontSize":100,"color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":40,"x":-9,"visible":true,"var":"txt_road_t","text":"Road3","fontSize":28,"color":"#000000","bold":true}},{"type":"Label","props":{"y":40,"x":110,"visible":false,"var":"txt_road","text":"6%","fontSize":28,"color":"#ff6828","bold":true}},{"type":"Label","props":{"y":80,"x":-9,"visible":false,"var":"txt_get_coin_t","text":"收获","fontSize":28,"color":"#000000","bold":true}},{"type":"Label","props":{"y":79,"x":110,"var":"txt_get_coin","text":"0","fontSize":28,"color":"#ff6828","bold":true}},{"type":"Label","props":{"y":120,"x":-9,"visible":false,"var":"txt_speed_t","text":"速度","fontSize":28,"color":"#000000","bold":true}},{"type":"Label","props":{"y":121,"x":110,"var":"txt_speed1","text":"68","fontSize":28,"color":"#ff6828","bold":true}},{"type":"Label","props":{"y":160,"x":-9,"visible":false,"var":"txt_beishu_t","text":"倍数","fontSize":28,"color":"#000000","bold":true}},{"type":"Label","props":{"y":161,"x":110,"var":"txt_beishu","text":"3/20","fontSize":28,"color":"#ff6828","bold":true}},{"type":"Label","props":{"y":157,"x":199,"var":"txt_dis","text":"3981m","fontSize":40,"color":"#000000","bold":true}},{"type":"Image","props":{"y":77,"x":60,"var":"img_gem","skin":"tongyong/tu_zuanshi.png"}}]}],"animations":[{"nodes":[{"target":29,"keyframes":{"y":[{"value":451,"tweenMethod":"linearNone","tween":true,"target":29,"key":"y","index":0},{"value":446,"tweenMethod":"linearNone","tween":true,"target":29,"key":"y","index":3},{"value":291,"tweenMethod":"linearNone","tween":true,"target":29,"key":"y","index":25}],"x":[{"value":139,"tweenMethod":"linearNone","tween":true,"target":29,"key":"x","index":0},{"value":370,"tweenMethod":"linearNone","tween":true,"target":29,"key":"x","index":3},{"value":376,"tweenMethod":"linearNone","tween":true,"target":29,"key":"x","index":25}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":29,"key":"visible","index":0}],"scaleY":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":29,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":29,"key":"scaleY","index":3}],"scaleX":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":29,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":29,"key":"scaleX","index":3}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":29,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":29,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":29,"key":"alpha","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":29,"key":"alpha","index":25}]}}],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[{"target":37,"keyframes":{"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":37,"key":"visible","index":0}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":6}]}}],"name":"ani2","id":2,"frameRate":24,"action":0},{"nodes":[{"target":38,"keyframes":{"x":[{"value":703,"tweenMethod":"linearNone","tween":true,"target":38,"key":"x","index":0},{"value":703,"tweenMethod":"linearNone","tween":true,"target":38,"key":"x","index":3},{"value":703,"tweenMethod":"linearNone","tween":true,"target":38,"label":null,"key":"x","index":6}],"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":38,"key":"visible","index":0}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":38,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":38,"key":"alpha","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":38,"label":null,"key":"alpha","index":6}]}}],"name":"ani3","id":3,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.YouXiUI.uiView);

        }

    }
}

module ui {
    export class ZhuanPanUI extends View {
		public btn_relife:Laya.Box;
		public btn_share:Laya.Box;
		public box_pan:Laya.Box;
		public img_pan:Laya.Image;
		public txt_time:Laya.Label;
		public btn_back:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":146,"x":132,"skin":"zhuanpan/tu_3.png"}},{"type":"Box","props":{"y":962,"x":232,"width":318,"var":"btn_relife","scaleY":0.8,"scaleX":0.8,"height":99},"child":[{"type":"Button","props":{"y":47,"x":148,"width":342,"stateNum":1,"skin":"tongyong/btn_2.png","sizeGrid":"0,74,0,66","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":24,"x":47,"skin":"zhuanpan/tu_shipin1.png"}},{"type":"Image","props":{"y":30,"x":101,"skin":"zhuanpan/tu_shipin2.png"}}]},{"type":"Box","props":{"y":962,"x":232,"width":294,"var":"btn_share","scaleY":0.8,"scaleX":0.8,"height":100},"child":[{"type":"Button","props":{"y":47,"x":148,"width":342,"stateNum":1,"skin":"tongyong/btn_1.png","sizeGrid":"0,74,0,66","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":29,"x":62,"skin":"zhuanpan/tu_mfzc.png"}}]},{"type":"Box","props":{"y":542,"x":355,"width":536,"pivotY":268,"pivotX":265,"height":539},"child":[{"type":"Box","props":{"y":274,"x":270,"width":573,"var":"box_pan","rotation":0,"pivotY":274,"pivotX":270,"height":576},"child":[{"type":"Image","props":{"y":-27,"x":-30,"skin":"zhuanpan/tu_2.png"}},{"type":"Image","props":{"y":278,"x":136,"width":85,"skin":"tongyong/tu_qian2.png","rotation":-92,"pivotY":38,"pivotX":40,"height":80}},{"type":"Image","props":{"y":158,"x":336,"skin":"tongyong/tu_qian1.png","rotation":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":147,"x":192,"width":81,"skin":"tongyong/tu_qian5.png","rotation":-28,"pivotY":27,"pivotX":37,"height":81}},{"type":"Image","props":{"y":382,"x":205,"skin":"tongyong/tu_qian6.png","rotation":-150,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":377,"x":332,"skin":"tongyong/tu_qian3.png","rotation":-210,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":268,"x":394,"skin":"tongyong/tu_qian4.png","rotation":-270,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":274,"x":270,"width":169,"text":"300","rotation":-92,"pivotY":249,"height":50,"fontSize":45,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":272,"x":271,"width":169,"text":"1500","rotation":-32,"pivotY":249,"height":50,"fontSize":45,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":266,"x":272,"width":169,"text":"2000","rotation":-150,"pivotY":249,"height":50,"fontSize":45,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":257,"x":258,"width":169,"text":"500","rotation":-215,"pivotY":249,"height":50,"fontSize":45,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":271,"x":256,"width":169,"text":"1000","rotation":-270,"pivotY":249,"height":50,"fontSize":50,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":274,"x":271,"width":169,"text":"200","rotation":31,"pivotY":249,"height":50,"fontSize":45,"color":"#cd3f00","bold":true,"anchorX":0.5,"align":"center"}}]},{"type":"Image","props":{"y":275,"x":270,"width":168,"var":"img_pan","skin":"zhuanpan/tu_1.png","pivotY":148,"pivotX":85,"height":230}}]},{"type":"Label","props":{"y":903,"x":129,"width":127,"var":"txt_time","text":"123456","height":34,"fontSize":34,"font":"Arial","color":"#ffffff","bold":true,"align":"left"}},{"type":"Button","props":{"y":30,"x":35,"var":"btn_back","stateNum":1,"skin":"tongyong/btn_fh.png"}},{"type":"Label","props":{"y":872,"x":127,"text":"点击抽奖按钮下方小卡片，有机会额外获得","fontSize":22,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":872,"x":551,"text":"双倍奖励","fontSize":22,"font":"Microsoft YaHei","color":"#ff0400"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ZhuanPanUI.uiView);

        }

    }
}
