//////////////////////////////////////////////////////////////////////////////
//////////////////////////以下代码为自动生成，请勿手工改动////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/**
* 模板数据
*/
module dou.data{
	export class Template{
		private static _data:Object;

		constructor(){}

		static setData(v:Object){
			Template._data = v;
		}

		static get data():Object{
			return Template._data;
		}

		/**根据id获取某条数据*/
		static getSingeTempDataById(arr:Array<Object>, value:number):Object{
			if(!arr || value <= 0) return null;
			var len:number = arr.length;
			for(var i:number = 0; i < len; i++){
				var obj:Object = arr[i];
				if(!obj) continue;
				if(obj["id"] == value){
					return obj;
				}
			}
			return null;
		}


	



		/**
		 * tb_goods根据对应id取数据
		 *	id:int	编号
		 *	item_id:int	物品ID
		 *	item_name:string	物品名称
		 *	typ:int	货币
		 *	price:int	单价
		 *	begin_time:int	销售开始时间
		 *	end_time:int	销售结束时间
		 *	sequence:int	排序
		*/
		static getGoodsTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_goods"],value);
		}



		/**
		 * tb_item根据对应id取数据
		 *	id:int	编号
		 *	name:string	名字
		 *	desc:string	描述
		 *	quality:int	物品品质
		 *	from:string	获取来源
		 *	max_overlap:int	叠加数
		 *	itype:int	类型
		 *	icon:string	图标
		 *	piliang:int	是否批量
		 *	compose:int	是否可合成
		 *	discard:int	是否可丢弃
		 *	hecheng_id:int	合成宠物ID
		*/
		static getItemTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_item"],value);
		}


		/**
		 * tb_yemeng_back根据对应id取数据
		 *	id:int	背景ID
		 *	name:string	背景名称
		 *	icon:string	图标
		 *	desc:string	物品描述
		*/
		static getYemeng_backTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_back"],value);
		}

		/**
		 * tb_yemeng_config根据对应id取数据
		 *	id:int	唯一ID
		 *	box_distance:int	奖励米数
		 *	max_box_count:int	宝箱数量
		 *	drop_id:int	奖励ID
		 *	reborn_cost:int	紫钻数量
		 *	play_cost:int	金币数量
		 *	day_jifen:int	积分上限
		 *	max_distane:int	游戏总米数
		 *	distance_to_jifen:int	米数
		 *	sprint_1:int	冲刺紫钻消耗数量
		 *	sprint_2:int	冲刺紫钻消耗数量2
		 *	sprint_3:int	冲刺紫钻消耗数量3
		 *	buff_js:int	金身buff持续时间
		 *	buff_hl:int	混乱buff持续时间
		 *	choice_js:int	金身buff概率
		 *	choice_hl:int	混乱buff概率
		*/
		static getYemeng_configTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_config"],value);
		}

		/**
		 * tb_yemeng_ditu根据对应id取数据
		 *	id:int	ID
		 *	mi_1:int	初始米
		 *	mi_2:int	结束米
		 *	zaw_min:int	障碍物下限
		 *	zaw_max:int	障碍物上限
		 *	zaw_1:int	1级障碍物概率
		 *	zaw_2:int	2级障碍物概率
		 *	zaw_3:int	3级障碍物概率
		 *	drop_time:int	标准掉落时间
		 *	ym_item:array	神秘道具数量
		 *	ym_door:array	陷阱数量
		*/
		static getYemeng_dituTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_ditu"],value);
		}

		/**
		 * tb_yemeng_mall根据对应id取数据
		 *	id:int	商品ID
		 *	name:string	商品名字
		 *	cost:int	单价
		 *	limit:int	限购数量
		 *	is_once:int	永久限购
		 *	skin_id:int	皮肤背景ID
		 *	items:array	商品内容
		 *	goods_type:int	商品类型
		*/
		static getYemeng_mallTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_mall"],value);
		}

		/**
		 * tb_yemeng_map根据对应id取数据
		 *	id:int	标识ID
		 *	lu_bianhao:int	路线编号
		 *	lu_id:int	路线id
		 *	left_index:int	左边下一个
		 *	right_index:int	右边下一个
		 *	type:int	类型
		 *	dis:int	路线距离
		*/
		static getYemeng_mapTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_map"],value);
		}

		/**
		 * tb_yemeng_skin根据对应id取数据
		 *	id:int	皮肤ID
		 *	name:string	形象名称
		 *	icon:string	图标
		 *	desc:string	物品描述
		*/
		static getYemeng_skinTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_yemeng_skin"],value);
		}

	}
}