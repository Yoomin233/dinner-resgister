import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	userList:[
		{RTXname:'aoyu.ge', pinyinName:'geaoyu', chineseName:'葛翱宇', shortName:'gay'},
		{RTXname:'bolong.zhai', pinyinName:'zhaibolong', chineseName:'翟博龙', shortName:'zbl'},
		{RTXname:'chen.li', pinyinName:'lichen', chineseName:'李辰', shortName:'lc'},
		{RTXname:'chen.sun', pinyinName:'sunchen', chineseName:'孙晨', shortName:'sc'},
		{RTXname:'chen.zhang', pinyinName:'zhangchen', chineseName:'章晨', shortName:'zc'},
		{RTXname:'cuifang.wu', pinyinName:'wucuifang', chineseName:'武子卿', shortName:'wcf'},
		{RTXname:'deyi.liu', pinyinName:'liudeyi', chineseName:'刘德一', shortName:'ldy'},
		{RTXname:'dong.shen', pinyinName:'shendong', chineseName:'沈东', shortName:'sd'},
		{RTXname:'feihu.qiu', pinyinName:'qiufeihu', chineseName:'邱飞虎', shortName:'qfh'},
		{RTXname:'fenghua.li', pinyinName:'lifenghua', chineseName:'李风华', shortName:'lfh'},
		{RTXname:'guoqing.zhao', pinyinName:'zhaoguoqing', chineseName:'赵国庆', shortName:'zgq'},
		{RTXname:'hongsong.li', pinyinName:'lihongsong', chineseName:'李泓松', shortName:'lhs'},
		{RTXname:'huan.wang', pinyinName:'wanghuan', chineseName:'王欢', shortName:'wh'},
		{RTXname:'huixin.gao', pinyinName:'gaohuixin', chineseName:'高会欣', shortName:'ghx'},
		{RTXname:'jiafeng.qin', pinyinName:'qinjiafeng', chineseName:'秦家峰', shortName:'qjf'},
		{RTXname:'jiajia.fan', pinyinName:'fanjiajia', chineseName:'范佳佳', shortName:'fjj'},
		{RTXname:'jiakang.xie', pinyinName:'xiejiakang', chineseName:'谢嘉康', shortName:'xjk'},
		{RTXname:'jiaxiang.wang', pinyinName:'wangjiaxiang', chineseName:'王稼香', shortName:'wjx'},
		{RTXname:'jingkun.wang', pinyinName:'wangjingkun', chineseName:'王井坤', shortName:'wjk'},
		{RTXname:'jingya.wang', pinyinName:'wangjingya', chineseName:'王靖雅', shortName:'wjy'},
		{RTXname:'kaiwen.zhang', pinyinName:'zhangkaiwen', chineseName:'张凯雯', shortName:'zkw'},
		{RTXname:'kejie.shang', pinyinName:'shangkejie', chineseName:'商科洁', shortName:'skj'},
		{RTXname:'lei.wang', pinyinName:'wanglei', chineseName:'王雷', shortName:'wl'},
		{RTXname:'liang.ming', pinyinName:'mingliang', chineseName:'明亮', shortName:'ml'},
		{RTXname:'lingling.cao', pinyinName:'caolingling', chineseName:'曹玲玲', shortName:'cll'},
		{RTXname:'mengjie.liu', pinyinName:'liumengjie', chineseName:'刘盟洁', shortName:'lmj'},
		{RTXname:'nian.liu', pinyinName:'liunian', chineseName:'刘年', shortName:'ln'},
		{RTXname:'nina.wang', pinyinName:'wangnina', chineseName:'王妮娜', shortName:'wnn'},
		{RTXname:'pengfei.bao', pinyinName:'baopengfei', chineseName:'鲍鹏飞', shortName:'bpf'},
		{RTXname:'qi.wei', pinyinName:'weiqi', chineseName:'魏琪', shortName:'wq'},
		{RTXname:'qi.zhou', pinyinName:'zhouqi', chineseName:'周琪', shortName:'zq'},
		{RTXname:'qiangmian.dou', pinyinName:'douqiangmian', chineseName:'窦强勉', shortName:'dqm'},
		{RTXname:'qijun.qi', pinyinName:'qiqijun', chineseName:'戚其筠', shortName:'qqj'},
		{RTXname:'tengfei.ma', pinyinName:'matengfei', chineseName:'马腾飞', shortName:'mtf'},
		{RTXname:'tengfei.zou', pinyinName:'zoutengfei', chineseName:'邹腾飞', shortName:'ztf'},
		{RTXname:'wei.nian', pinyinName:'nianwei', chineseName:'年伟', shortName:'nw'},
		{RTXname:'wentong.chen', pinyinName:'chenwentong', chineseName:'陈文统', shortName:'cwt'},
		{RTXname:'wenwei.xu', pinyinName:'xuwenwei', chineseName:'许文伟', shortName:'xww'},
		{RTXname:'xianjun.liu', pinyinName:'liuxianjun', chineseName:'刘贤俊', shortName:'lxj'},
		{RTXname:'xiaoxu.huang', pinyinName:'huangxiaoxu', chineseName:'黄小旭', shortName:'hxx'},
		{RTXname:'xueli.hu', pinyinName:'huxueli', chineseName:'胡学礼', shortName:'hxl'},
		{RTXname:'yang.wang', pinyinName:'wangyang', chineseName:'汪扬', shortName:'wy'},
		{RTXname:'yapeng.tong', pinyinName:'tongyapeng', chineseName:'佟亚鹏', shortName:'dyp'},
		{RTXname:'yingying.wang', pinyinName:'wangyingying', chineseName:'王迎迎', shortName:'wyy'},
		{RTXname:'yuemin.hu', pinyinName:'huyuemin', chineseName:'胡悦旻', shortName:'hym'},
		{RTXname:'yujia.cheng', pinyinName:'chengyujia', chineseName:'程禹嘉', shortName:'cyj'},
		{RTXname:'yupeng.zhu', pinyinName:'zhuyupeng', chineseName:'朱玉鹏', shortName:'zyp'},
		{RTXname:'zhilei.wang', pinyinName:'wangzhilei', chineseName:'王志磊', shortName:'wzl'},
		{RTXname:'zhubing.ji', pinyinName:'jizhubing', chineseName:'计冰冰', shortName:'jbb'},
		{RTXname:'kang.dai', pinyinName:'daikang', chineseName:'代康', shortName:'dk'},
		{RTXname:'zhengjun.fan', pinyinName:'fanzhengjun', chineseName:'范镇钧', shortName:'fzj'},
		{RTXname:'chenggang.hong', pinyinName:'hongchenggang', chineseName:'洪成刚', shortName:'hcg'},
		{RTXname:'jun.zhou', pinyinName:'zhoujun', chineseName:'周俊', shortName:'zj'},
		{RTXname:'kangxi.yin', pinyinName:'yinkangxi', chineseName:'尹康熙', shortName:'ykx'},
		{RTXname:'qiuping.dong', pinyinName:'dongqiuping', chineseName:'董秋平', shortName:'dqp'},
		{RTXname:'yuanlong.zhang', pinyinName:'zhangyuanlong', chineseName:'张远龙', shortName:'zyl'},
		{RTXname:'jianjun.lin', pinyinName:'linjianjun', chineseName:'林建俊', shortName:'ljj'},
		{RTXname:'chenxu.wu', pinyinName:'wuchenxu', chineseName:'吴晨旭', shortName:'wcx'},
		{RTXname:'daiyun.zhou', pinyinName:'zhoudaiyun', chineseName:'周戴昀', shortName:'zdy'},
		{RTXname:'mao.liu', pinyinName:'liumao', chineseName:'刘茂', shortName:'lm'},
		{RTXname:'wenbin.yu', pinyinName:'yuwenbin', chineseName:'虞文斌', shortName:'ywb'},
		{RTXname:'qi.li', pinyinName:'liqi', chineseName:'李琦', shortName:'lq'},
		{RTXname:'chao.sun', pinyinName:'synchao', chineseName:'孙超', shortName:'sc'},
		{RTXname:'zongying.huang', pinyinName:'huangzongying', chineseName:'黄宗英', shortName:'hzy'}
    ],
    orderedList:[],
    curTime:null,
    timeStr:null,
    ordered:false,
    name:null,
    chatRecords:null
}
const mutations = {
	updateOrderedList (state, list){
		state.orderedList = list
	},
	updateTimeStr (state, str){
		state.timeStr = str
	},
	updateCurTime (state, time){
		state.curTime = time
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
		state.orderedList.forEach((elem, index) => {
			if (elem == name){
				state.orderedList.splice(index, 1);
			}
		})
	},
	updateChatRecords (state, records){
		state.chatRecords = records;
	}
}
export default new Vuex.Store({
	state, 
	mutations
})