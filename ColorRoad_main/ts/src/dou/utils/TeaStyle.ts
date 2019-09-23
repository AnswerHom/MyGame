/**文本样式工具
* name 王谦
*/
module dou.utils{
	export class TeaStyle{
		/*=====文本颜色(格式:COLOR_XXX)=====*/
		public static COLOR_DEFAULT		:string = "#393939";				//黑色、默认
		public static COLOR_GREEN		:string = "#3eb23e";				//绿色、链接
		public static COLOR_RED			:string = "#fa565a";				//红色、提醒
		public static COLOR_GRAY		:string = "#777777";				//灰色、禁用
		public static COLOR_BLACK		:string = "#000000";				//纯黑色
		public static COLOR_WHITE		:string = "#ffffff";				//纯白色

		/**=品质颜色：白、绿、蓝、紫、橙=*/
		public static COLOR_QUALITYS:string[] = ["#777777", "#3eb23e", "#0078ff", "#cc00ff", "#fa7c00"];
		/**
		 * 获取品质颜色
		 * @param quality 
		 */
		public static getQualityColor(quality:number):string{
			if(quality <= 0 || quality > TeaStyle.COLOR_QUALITYS.length) return null;
			return TeaStyle.COLOR_QUALITYS[quality-1];
		}
	}
}