import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import wilddog from 'wilddog'
import store from './store.js'
const config = {
  syncDomain:'dx-dinner-order.wilddog.com', 
  syncURL: "https://dx-dinner-order.wilddogio.com" 
};
wilddog.initializeApp(config);
var mainRef = wilddog.sync().ref('/orderRecords');
var chatRef = wilddog.sync().ref('/chatRecords');
var curTime = wilddog.sync().ServerValue.TIMESTAMP;
// 推送通知的函数
function showNotification () {
	if(store.state.ifNotification) {
		var notification = new Notification("来自订餐系统的通知:", {
			body: '订餐时间到啦！想要订餐的童鞋可以直接点击该通知来订餐了!',
			tag:'dinner=order',
			renotify:true
		})
		notification.onclick = () => {
			if(store.state.timeStr&&!store.state.ordered){
				if(store.state.curTime.getHours()>11||(store.state.curTime.getHours()>=11&&store.state.curTime.getMinutes()>40)){
					alert('订餐时间已过, 请客官明天再来!');
					return;
				}
				store.dispatch('addEater', store.state.name);
				var todayRef = mainRef.child(store.state.timeStr);
				todayRef.set(store.state.orderedList.join(','));
			}
			notification.close();
		}
	}
}
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
	    // GMT+8的11点对应UTC03点
	    var elevenOclock = Date.parse(timeStr + 'T' + '03:00:00');
	    // 计算是否时候未到
	    var toElevenDiff = elevenOclock - d;
	    // if (true) {
	    // 	setTimeout(showNotification, 3000);
	    // }
	    if(toElevenDiff > 0) {
	    	setTimeout(showNotification, toElevenDiff);
	    }
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
		var [timeStr, curTime] = dataArr;
	    dispatch('updateCurTime', curTime);
	    dispatch('updateTimeStr', timeStr);
		// 野狗配置
		var todayRef = mainRef.child(timeStr);
		todayRef.on('value', (snapshot, error) => {
			if (error == null){
				var data = snapshot.val();
				if (data !== null) {
					// 更新已定餐列表
					dispatch('updateOrderedList',data.split(','));
					// 判断是否已在订餐列表中

					dispatch('updateOrderStatus', data.indexOf(state.name) == -1?false:true);
				} else {
					dispatch('updateOrderStatus', false);
					console.log('暂无数据, 点击+1来创建一条当天的新纪录')
				}
				// // 如果没有初始数据, 则创建新节点
				// if(data == null){
		  //         let myObj = {
		  //         	[timeStr] : ''
		  //         };
	   //            mainRef.update(myObj);
				// }else{
				// }
			}
		});
	})
	.catch( err => console.log(err))
}
export const fetchTodayChatList = ({state, dispatch}) => {
	timeStrPromise.then((dataArr) => {
		var timeStr = dataArr[0], curTime = dataArr[1];
		if(!state.curTime||!state.timeStr){
		    dispatch('updateCurTime', curTime);
		    dispatch('updateTimeStr', timeStr);
	    }
	    // 创建今日聊天记录的ref
	    var todayChatRef = chatRef.child(state.timeStr);
	    return 
	})
	chatRef.on('value', (snapshot, error) => {
		if (error == null){
			var data = snapshot.val();
			// debugger;
			// 如果无数据则创建新节点
			if (data == null){
				timeStrPromise.then((timestr, d) => {
		          let myObj = {};
	              myObj[timeStr] = '';
	              mainRef.update(myObj);
				})
			// 否则展示数据
			}else{
				dispatch('updateChatRecords', data);
			}
		}
	})
}
export const addEater = ({state,dispatch}) => {
	if(state.timeStr&&!state.ordered){
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
	if(state.timeStr&&state.ordered){
		dispatch('delEater', state.name);
		var todayRef = mainRef.child(state.timeStr);
		if (state.orderedList.length === 0){
			todayRef.set(null);
		} else {
			todayRef.set(state.orderedList.join(','));
		}
	}
}
export const switchIfNotification = ({dispatch}, value) => {
	localStorage.setItem('dinner-register-ifNotification', value);
	dispatch('switchIfNotification', value);
}