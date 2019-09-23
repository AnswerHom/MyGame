/**
* name 
*/
module dou.utils {

	export class StringU {

		public static substitute(str: string, ...rest): string {
			if (str == null) return '';

			// Replace all of the parameters in the msg string.
			var len: number = rest.length;
			var args: Array<string>;
			if (len == 1 && typeof rest[0] == "array") {
				args = rest[0];
				len = args.length;
			}
			else {
				args = rest;
			}

			for (var i: number = 0; i < len; i++) {
				str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
			}

			return str;
		}

		/**
		 * 字符串是否为空 
		 * @param str 字符串
		 * @return 
		 * 
		 */
		public static isEmpty(str: string): boolean {
			return str == null || str.length == 0;
		}

		//去左右空格;  
		public static trim(char: string): string {
			if (char == null) {
				return null;
			}
			return this.rtrim(this.ltrim(char));
		}

		//去左空格;   
		public static ltrim(char: string): string {
			if (char == null) {
				return null;
			}
			var pattern: RegExp = /^\s*/;
			return char.replace(pattern, "");
		}

		//去右空格;  
		public static rtrim(char: string): string {
			if (char == null) {
				return null;
			}
			var pattern: RegExp = /\s*$/;
			return char.replace(pattern, "");
		}

		//是否为前缀字符串;  
		public static beginsWith(char: string, prefix: string): boolean {
			return (prefix == char.substring(0, prefix.length));
		}

		//是否为后缀字符串;  
		public static endsWith(char: string, suffix: string): boolean {
			return (suffix == char.substring(char.length - suffix.length));
		}


		//获得查询参数
		static getParameter(url: string, paras: string) {
			if (!url || url.length == 0) return "";
			let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			let paraObj = {}
			for (let i = 0; i < paraString.length; i++) {
				let j = paraString[i];
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			var returnValue = paraObj[paras.toLowerCase()];
			if (!returnValue || typeof (returnValue) == "undefined") {
				return "";
			} else {
				return returnValue;
			}
		}

		/**
		 * 字符串补位，补充左边 
		 * @param	str 需要补充的字符串
		 * @param   char 需要补充的字符串
		 * @param	len 最终长度
		 * @return
		 */
		public static paddingLeft(str: string, char: string, len: number): string {
			var l: number = len - str.length;
			if (l <= 0) {
				return str;
			}

			str = String(str);
			//循环填充
			for (var i: number = 0; i < l; i++) {
				str = char + str;
			}
			return str;
		}

		private static _tempBytesArray: ByteArray;
		// 读取压缩文本
		static readZlibData(data: ByteArray): string {
			let length: number = data.readUnsignedInt();
			if (!this._tempBytesArray) {
				this._tempBytesArray = new ByteArray();
			}
			let byteArray: ByteArray = this._tempBytesArray;
			byteArray.length = length;
			data.readBytes(byteArray, 0, length);
			byteArray.uncompress();
			let str = byteArray.readUTFBytes(byteArray.length);
			byteArray.clear();
			return str;
		}

		//通过时间戳和格式获得日期文本
		static formatDate(date: Date, format: string): string {
			if (!date) return null;
			let o = {
				"y+": date.getFullYear(),
				"M+": date.getMonth() + 1,
				"d+": date.getDate(),
				"h+": date.getHours(),
				"m+": date.getMinutes(),
				"s+": date.getSeconds(),
				"q+": Math.floor((date.getMonth() + 3) / 3),
				"S+": date.getMilliseconds()
			};

			for (let k in o)
				if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return format;
		}

		//数字简写 
        public static sampleNum(num: number): string {
            if (num <= 99999) return num.toString();
            num = Math.floor(num / 10000);
            if (num <= 99999) return num + "万";
            num = Math.floor(num / 10000);
            return num + "亿";
        }

		/**
		 * 替换指定的
		 */
		public static substituteByIndex(str: string, index:number,value:any): string {
			if (str == null) return '';
			str = str.replace(new RegExp("\\{" + index + "\\}", "g"), value);
			return str;
		}

		private static DISABLE_WORDS:string[];
		/**加载敏感词汇(禁用)*/
		public static loadDisableWords():void{
			if(StringU.DISABLE_WORDS) return;
			Laya.loader.load(Path.ui + "pingbi.txt", Handler.create(this, this.onLoadDisableWords), null, Loader.TEXT);
		}
		/*加载敏感词汇(禁用)完成*/
		private static onLoadDisableWords():void{
			let list:string[] = Loader.getRes(Path.ui + 'pingbi.txt').split('\r\n');
			if(list[list.length-1] == "") list.pop();
			StringU.DISABLE_WORDS = list;
		}
		/**检测敏感词汇(禁用)*/
		public static checkDisableWords(content:string):boolean{
			let len:number = content.length;
			let words:string[] = StringU.DISABLE_WORDS;
			for(let i:number = 0; i < words.length; i++){
				if(words[i].length > len) continue;
				if(content.indexOf(words[i]) != -1) return true;
			}
			return false;
		}

		constructor() {

		}
	}
}