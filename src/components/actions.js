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
var chatRef = wilddog.sync().ref('/chatRecords');
var curTime = wilddog.sync().ServerValue.TIMESTAMP;
// 先获取时间再进行下一步操作
function getTimeStr(){
	return Vue.http.jsonp('http://api.timezonedb.com/v2/list-time-zone?key=SNUAZCITLUBA&format=json&country=CN', {})
}
var timeStrPromise = new Promise(function(resolve, reject){
	getTimeStr()
	.then((response) => {
	    var d = new Date((response.data.zones[0]['timestamp'] - response.data.zones[0]['gmtOffset'])*1000);
	    var timeStr = (d.getFullYear()+'-'+(d.getMonth()+1<10?'0'+(d.getMonth()+1):''+(d.getMonth()+1))+'-'+(d.getDate()<10?'0'+d.getDate():''+d.getDate()));
	    // debugger;
	    resolve([timeStr, d]);
	    });
	})
export const exportChatRef = ({state}) => {
	return chatRef;
}
export const exportTimeStrPromise = () => {
	return timeStrPromise;
}
export const updateName = ({dispatch}, name) => {
	dispatch('updateName', name)
}
export const fetchOrderedList = ({state, dispatch}) => {
	timeStrPromise.then((dataArr) => {
		// debugger;
		var timeStr = dataArr[0], curTime = dataArr[1];
	    dispatch('updateCurTime', curTime);
	    dispatch('updateTimeStr', timeStr);
		// 野狗配置
		var todayRef = mainRef.child(timeStr);
		todayRef.on('value', (snapshot, error) => {
			if (error == null){
				var data = snapshot.val();
				// 如果没有初始数据, 则创建新节点
				if(data == null){
		          let myObj = {
		          	[timeStr] : ''
		          };
	              mainRef.update(myObj);
	           		// return;
				}else{
					// 更新已定餐列表
					dispatch('updateOrderedList',data.split(','));
					// 判断是否已在订餐列表中
					dispatch('updateOrderStatus', data.indexOf(state.name) == -1?false:true);
				}
			}
		});
	})
	.catch( err => {
		console.log(err);
	})
}
// export const fetchTodayChatList = ({state, dispatch}) => {
// 	timeStrPromise.then((dataArr) => {
// 		var timeStr = dataArr[0], curTime = dataArr[1];
// 		if(!state.curTime||!state.timeStr){
// 		    dispatch('updateCurTime', curTime);
// 		    dispatch('updateTimeStr', timeStr);
// 	    }
// 	    // 创建今日聊天记录的ref
// 	    var todayChatRef = chatRef.child(state.timeStr);
// 	    return 
// 	})
// 	chatRef.on('value', (snapshot, error) => {
// 		if (error == null){
// 			var data = snapshot.val();
// 			// debugger;
// 			// 如果无数据则创建新节点
// 			if (data == null){
// 				timeStrPromise.then((timestr, d) => {
// 		          let myObj = {};
// 	              myObj[timeStr] = ''
// 	              mainRef.update(myObj);
// 				})
// 			// 否则展示数据
// 			}else{
// 				dispatch('updateChatRecords', data);
// 			}
// 		}
// 	})
// }
export const addEater = ({state,dispatch}) => {
	if(!state.ordered&&state.timeStr){
		if(state.curTime.getHours()>11||(state.curTime.getHours()>=11&&state.curTime.getMinutes()>40)){
			alert('订餐时间已过, 请客官明天再来!');
			return;
		}
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