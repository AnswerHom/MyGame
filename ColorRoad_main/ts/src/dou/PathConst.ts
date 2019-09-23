/**
* 路径配置
*/
module dou{
	export class Path{
		static template: string = 'data/temp/template.bin';
		static skin:string = "skin/";
		static uiAtlas:string = "res/atlas/";
		static sfAtlas:string = "res/atlas/sf/";
		static ui:string = "ui/";
		static scene_path:string = "scene/LayaScene_newrace/";
		static scene:string = Path.scene_path + "newrace.ls";
		static newraceshow:string = "scene/LayaScene_newraceshow/newraceshow.ls";
		static tuoWei:string = "scene/LayaScene_tuowei/tuowei.lh";
		static scene_model:string = Path.scene_path + "Assets/race/model/";
		static scene_material:string = Path.scene_path + "Assets/race/materials/";
		static obstacle_model:string = "scene/LayaScene_Obstacle/Assets/race/zhangaiwu/model/";
		// static scene_materials:string = Path.scene_path + "Assets/tangguosaidao/materials/";
		static scene_texture:string = Path.scene_path + "Assets/race/particle/texture/";
		static name_texture:string = Path.scene_path + "Assets/AINames/";
		static sk:string = "sk/";
		static sf:string = "sf/";
		static petdeco:string = 'petdeco/';
		static scene_sf:string = ''
		
		// 获得一直序列帧地址
		static getSeqFrames(path:string, count:number, start:number = 0):string[]{
			let paths = [];
			start = start? start : 0;
			for (let i = start; i < start + count; i ++) {
				paths.push(StringU.substitute(path, i));
			}
			return paths;
		}
	}
}