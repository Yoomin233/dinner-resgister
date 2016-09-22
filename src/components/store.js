import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	userList:[
		{name:'aoyu.ge', chineseName:'葛翱宇'},
		{name:'bolong.zhai', chineseName:'翟博龙'},
		{name:'chen.li', chineseName:'李辰'},
		{name:'chen.sun', chineseName:'孙晨'},
		{name:'chen.zhang', chineseName:'章晨'},
		{name:'cuifang.wu', chineseName:'武子卿'},
		{name:'deyi.lu', chineseName:'刘德一'},
		{name:'dong.shen', chineseName:'沈东'},
		{name:'feihu.qiu', chineseName:'邱飞虎'},
		{name:'fenghua.li', chineseName:'李风华'},
		{name:'guoqing.zhao', chineseName:'赵国庆'},
		{name:'hongsong.li', chineseName:'李泓松'},
		{name:'huan.wang', chineseName:'王欢'},
		{name:'huixin.gao', chineseName:'高会欣'},
		{name:'jiafeng.qin', chineseName:'秦家峰'},
		{name:'jiajia.fan', chineseName:'范佳佳'},
		{name:'jiakang.xie', chineseName:'谢嘉康'},
		{name:'jiaxiang.wang', chineseName:'王稼香'},
		{name:'jingkun.wang', chineseName:'王井坤'},
		{name:'jingya.wang', chineseName:'王靖雅'},
		{name:'kaiwen.zhang', chineseName:'张凯雯'},
		{name:'kejie.shang', chineseName:'商科洁'},
		{name:'lei.wang', chineseName:'王雷'},
		{name:'liang.ming', chineseName:'明亮'},
		{name:'lingling.cao', chineseName:'曹玲玲'},
		{name:'mengjie.liu', chineseName:'刘盟洁'},
		{name:'nian.liu', chineseName:'刘年'},
		{name:'nina.wang', chineseName:'王妮娜'},
		{name:'pengfei.bao', chineseName:'鲍鹏飞'},
		{name:'qi.wei', chineseName:'魏琪'},
		{name:'qi.zhou', chineseName:'周琪'},
		{name:'qiangmian.dou', chineseName:'窦强勉'},
		{name:'qijun.qi', chineseName:'戚其筠'},
		{name:'tengfei.ma', chineseName:'马腾飞'},
		{name:'tengfei.zou', chineseName:'邹腾飞'},
		{name:'wei.nian', chineseName:'年伟'},
		{name:'wentong.chen', chineseName:'陈文统'},
		{name:'wenwei.xu', chineseName:'许文伟'},
		{name:'xianjun.liu', chineseName:'刘贤俊'},
		{name:'xiaoxu.huang', chineseName:'黄小旭'},
		{name:'xueli.hu', chineseName:'胡学礼'},
		{name:'yang.wang', chineseName:'汪扬'},
		{name:'yapeng.tong', chineseName:'佟亚鹏'},
		{name:'yingying.wang', chineseName:'王迎迎'},
		{name:'yuemin.hu', chineseName:'胡悦旻'},
		{name:'yujia.cheng', chineseName:'程禹嘉'},
		{name:'yupeng.zhu', chineseName:'朱玉鹏'},
		{name:'zhilei.wang', chineseName:'王志磊'},
		{name:'zhubing.ji', chineseName:'计冰冰'},
		{name:'kang.dai', chineseName:'代康'},
		{name:'zhengjun.fan', chineseName:'范镇钧'},
		{name:'chenggang.hong', chineseName:'洪成刚'},
		{name:'jun.zhou', chineseName:'周俊'},
		{name:'kangxi.yin', chineseName:'尹康熙'},
		{name:'qiuping.dong', chineseName:'董秋平'},
		{name:'yuanlong.zhang', chineseName:'张远龙'},
		{name:'jianjun.lin', chineseName:'林建俊'},
		{name:'chenxu.wu', chineseName:'吴晨旭'},
		{name:'daiyun.zhou', chineseName:'周戴昀'},
		{name:'mao.liu', chineseName:'刘茂'}
    ],
    orderedList:[],
    timeStr:null,
    ordered:false,
    name:null
}
const mutations = {
	updateOrderedList (state, list){
		state.orderedList = list
	},
	updateTimeStr (state, str){
		state.timeStr = str
	},
	updateOrderStatus (state, status){
		state.ordered = status
	},
	updateName (state, name){
		state.name = name
	},
	addEater (state, name){
		state.orderedList.push(name);
	},
	delEater (state, name){
		state.orderedList.splice(state.orderedList.findIndex(function(value){
			return value == name;
		}), 1);
	}
}
export default new Vuex.Store({
	state, 
	mutations
})