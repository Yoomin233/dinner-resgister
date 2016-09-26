<template lang='jade'>
div.top 
	ul
		li(v-for='(key, value) in chatRecords') {{value.user}}說:{{value.ct}}@{{value.time}}
	p {{msg}}
	input(v-model='chatContent', @keyup.enter='sendMsg') 
	button(@click='sendMsg') 發送
</template>
<script>
import {exportChatRef, exportTimeStrPromise} from '../actions.js'
import wilddog from 'wilddog'
export default {
	ready () {
		var v = this;
		var chatRef = this.exportChatRef();
		exportTimeStrPromise().then((dataArr) => {
			chatRef.orderByChild('time').limitToLast(10).on('value', (snapshot, error) => {
				// debugger;
				if (!error) {
					this.chatRecords = snapshot.val();
				} else {
					console.log(error);
				}
			})
		})
	},
	data () {
		return {
			chatRecords:null,
			chatContent:''
		}
	},
	methods: {
		sendMsg () {
			if(!this.chatContent)return;
			this.exportChatRef().push({
				ct:this.chatContent,
				time:wilddog.sync().ServerValue.TIMESTAMP,
				user:this.name
			})
			.then((newRef) => {
				this.chatContent = '';
			})
			.catch((err) => {
				console.log(err);
			});
		}
	},
	vuex:{
		getters: {
			name: state => state.name,
		},
		actions:{
			exportChatRef,
			exportTimeStrPromise
		}
	}
}
</script>
<style lang='less' scoped>
div.main {
	input {
		background-color: lightblue;
	}
}
</style>