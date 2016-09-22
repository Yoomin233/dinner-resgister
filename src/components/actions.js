import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import wilddog from 'wilddog'
const config = {
  syncDomain:'dx-dinner-order.wilddog.com', 
  syncURL: "https://dx-dinner-order.wilddogio.com" 
};
wilddog.initializeApp(config);
var mainRef = wilddog.sync().ref('/orderRecords');
export const updateName = ({dispatch}, name) => {
	dispatch('updateName', name)
}
export const fetchOrderedList = ({state, dispatch}) => {
	function getTimeStr(){
		return Vue.http.jsonp('http://api.timezonedb.com/v2/list-time-zone?key=SNUAZCITLUBA&format=json&country=CN', {})
	}
	getTimeStr()
	.then((response) => {
        var d = new Date((response.data.zones[0]['timestamp'] - response.data.zones[0]['gmtOffset'])*1000);
        var timeStr = (d.getFullYear()+'-'+(d.getMonth()+1<10?'0'+(d.getMonth()+1):''+(d.getMonth()+1))+'-'+(d.getDate()<10?'0'+d.getDate():''+d.getDate()));
        dispatch('updateTimeStr', timeStr);
        return timeStr;
	})
	.then((timeStr) => {
		// 野狗配置
		var todayRef = mainRef.child(timeStr);
		todayRef.on('value', (snapshot, error) => {
			if (error == null){
				var data = snapshot.val();
				// 如果没有初始数据, 则创建新节点
				if(data == null){
		          let myObj = {};
	              myObj[timeStr] = ''
	              mainRef.update(myObj);
				}else{
					// 更新已定餐列表
					dispatch('updateOrderedList',data.split(','));
					// 判断是否已在订餐列表中
					dispatch('updateOrderStatus', data.indexOf(state.name) == -1?false:true);
				}
			}
		})
	})
}
export const addEater = ({state,dispatch}) => {
	if(!state.ordered&&state.timeStr){
		dispatch('addEater', state.name);
		var todayRef = mainRef.child(state.timeStr);
		todayRef.set(state.orderedList.join(','));
	}
}
export const delEater = ({state, dispatch}) => {
	if(state.ordered&&state.timeStr){
		dispatch('delEater', state.name);
		var todayRef = mainRef.child(state.timeStr);
		todayRef.set(state.orderedList.join(','));
	}
}