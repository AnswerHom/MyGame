/*
* name;
*/
class DateUtils{
    constructor(){

    }
    /**
		* 日期格式化 
		* @param format        格式化字符串  Y:年 M:月 D:日 h:时 m:分 s:秒 S:毫秒
		* @param timestamp     如果未传递参数，则赋予 Date 对象当前日期和时间
		*                      如果传递一个 Number 数据类型的参数，则基于自 GMT 时间 1970 年 1 月 1 日 0:00:000 以来的毫秒数赋予 Date 对象一个时间值
		* @return              格式化后的时间字符串
		* 
		* 用法   dataFormat("Y-M-D h:m:s:S") |   dataFormat("Y年M月D日 h时m分s秒S毫秒", 235465723566)
		* 
		*/    
		public static dateFormat(format:string, timestamp:any = null,fill:string='00'):string
		{
			var date:Date;
			if(timestamp instanceof Date)
			{
				date = timestamp;
			}else if(timestamp)
			{
				date = new Date()
				date.setTime(timestamp)
			}
			var len:number = fill.length;
			return format.replace(/Y/, date.getFullYear() + '').
				replace(/M/, (date.getMonth() + 1) + '').
				replace(/D/, date.getDate() + '').
				replace(/h/, (fill+date.getHours()).substr(-len)).
				replace(/m/, (fill+date.getMinutes()).substr(-len)).
				replace(/s/, (fill+date.getSeconds()).substr(-len)).
				replace(/S/, (fill+date.getMilliseconds()).substr(-len));
		}
		
		/**
		 *时间格式化 00:00:00 h:m:s
		 * @param format h时: m分: s秒
		 * @param seconds 秒
		 * @param fill 填充
		 * @return 
		 * 
		 */		
		public static secondsFormat(format:string, seconds:number, fill:string='00'):string
		{
			if (format.indexOf('d')!=-1) 
			{
				return DateUtils.secondsDateFormat(format, seconds, fill);
			}
			
			var len:number = fill.length;
			if(format.indexOf('h')!=-1)
			{
				var h:number = Math.floor(seconds/3600);
				if(h>999){
					return format.replace(/h/, ('0000'+ h).substr(-4)).
						replace(/m/, (fill+Math.floor((seconds/60)%60)).substr(-len)).
						replace(/s/, (fill+(seconds%60)).substr(-len))
				}
				else if(h>99){
					return format.replace(/h/, ('000'+ h).substr(-3)).
						replace(/m/, (fill+Math.floor((seconds/60)%60)).substr(-len)).
						replace(/s/, (fill+(seconds%60)).substr(-len))
				}
				return format.replace(/h/, (fill+h).substr(-len)).
					replace(/m/, (fill+Math.floor((seconds/60)%60)).substr(-len)).
					replace(/s/, (fill+(seconds%60)).substr(-len))
			}
			return format.replace(/m/, (fill+Math.floor(seconds/60)).substr(-len)).
				replace(/s/, (fill+(seconds%60)).substr(-len))
		}
		
		/**
		 * 
		 *时间格式化 00:00:00:00 d:h:m:s
		 * @param format d:天 h:时 m:分 s:秒 
		 * @param seconds 秒
		 * @param fill 填充
		 * @return 
		 * 
		 */		
		public static secondsDateFormat(format:string, seconds:number, fill:string='00'):string
		{
			var t:number = Math.floor(seconds / 86400);
			if (t < 10) 
			{
				format = format.replace(/d/, '0' + t);
			}
			else
			{
				format = format.replace(/d/, t+"");
			}
			t = Math.floor(seconds / 3600) % 24;
			if (t < 10) 
			{
				format = format.replace(/h/, '0' + t);
			}
			else
			{
				format = format.replace(/h/, t+"");
			}
			
			t = Math.floor(seconds / 60) % 60;
			if (t < 10) 
			{
				format = format.replace(/m/, '0' + t);
			}
			else
			{
				format = format.replace(/m/, t+'');
			}
			
			t = (seconds% 60);
			if (t < 10) 
			{
				format = format.replace(/s/, '0' + t);
			}
			else
			{
				format = format.replace(/s/, t+'');
			}
			
			return format;
		}
		
		private static gZoneDate:Date = new Date();
		/**
		 * 指定时间 剩余时间
		 * @param month 
		 * @param date
		 * @return 
		 */		
		public static getSurplusTime(timer:number,month:number, date:number,nextYear:Boolean = false) : number
		{
			DateUtils.getDateByTime(timer);
			if(nextYear){
				DateUtils.gZoneDate.setFullYear(DateUtils.gZoneDate.getFullYear() + 1);
			}
			DateUtils.gZoneDate.setDate(date);
			if(date>26){
				if(DateUtils.gZoneDate.getDate() == 1){
					DateUtils.gZoneDate.setMonth(month);
				}else{
					DateUtils.gZoneDate.setMonth(month - 1);
				}
			}else{
				DateUtils.gZoneDate.setMonth(month - 1);
			}
			DateUtils.gZoneDate.setHours(0);
			DateUtils.gZoneDate.setMinutes(0);
			DateUtils.gZoneDate.setSeconds(0);
			DateUtils.gZoneDate.setMilliseconds(0);
			return DateUtils.gZoneDate.getTime()*0.001 - timer;
		}
		
		/**
		 * 获取当前时间抽的Date
		 * @param timer 当前时间戳
		 * @return 
		 */		
		public static getDateByTime(timer:number):Date{
			DateUtils.gZoneDate.setTime(timer*1000);
			return DateUtils.gZoneDate;
		}
		
		/**
		 * 获取指定的日子的 距离当前时间 有多少秒
		 * @param timer 当前时间戳
		 * @param month 指定的月
		 * @param date 指定日子
		 * @param nextYear 是否跨年
		 * @return 
		 */		
		public static getTimeByMonthdaya(timer:number,month:number,date:number,nextYear:Boolean = false):number{
			DateUtils.getDateByTime(timer);
			if(month == DateUtils.gZoneDate.getMonth() + 1 && date >= DateUtils.gZoneDate.getDate()){
				return DateUtils.getSurplusTime(timer,month,date + 1);
			}else if(month > DateUtils.gZoneDate.getMonth() + 1 && month != 12){
				return DateUtils.getSurplusTime(timer,month,date + 1);
			}
			else if(month > DateUtils.gZoneDate.getMonth() + 1){
				return DateUtils.getSurplusTime(timer,month,date + 1);
			}
			else if(month == 1 && DateUtils.gZoneDate.getMonth() == 11){
				return DateUtils.getSurplusTime(timer,month,date,true);
			}
			else if(nextYear){
				return DateUtils.getSurplusTime(timer,month,date + 1,true);
			}
			return 0;
		}
		
		/**
		 * 获取当日24点的  时间戳
		 * @param timer 当前时间戳
		 * @return 
		 */		
		public static curDayHasTime(timer:number):number{
			DateUtils.getDateByTime(timer);
			DateUtils.gZoneDate.setDate(DateUtils.gZoneDate.getDate() + 1);
			DateUtils.gZoneDate.setHours(0);
			DateUtils.gZoneDate.setMinutes(0);
			DateUtils.gZoneDate.setSeconds(0);
			DateUtils.gZoneDate.setMilliseconds(0);
			return DateUtils.gZoneDate.getTime()*0.001;
		}

		public static getCurDayStr():string
		{
			var date:Date = new Date;
			return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		}
}