<template lang='jade'>
div.tableMain
	p 加班餐预订
	table
		thead
			tr
				td 序号
				td 日期
				td 部门
				td 姓名(请写正楷)
				td 签收
		tbody
			tr(v-for='item in orderedList')
				td {{$index + 1}}
				td {{shortStr}}
				td 技术部
				td {{item}}
				td &nbsp;
			tr(v-for='item in fillBlank' track-by='$index')
				td {{$index + orderedList.length + 1}}
				td {{shortStr}}
				td &nbsp;
				td &nbsp;
				td
	table
		thead
			tr
				td 序号
				td 日期
				td 部门
				td 姓名(请写正楷)
				td 签收
		tbody
			tr(v-for='item in 30' track-by='$index')
				td {{$index + 31}}
				td {{shortStr}}
				td &nbsp;
				td &nbsp;
				td
</template>
<script>
import store from './store.js'
import {fetchOrderedList,updateName} from './actions.js'

export default {
	ready () {
		this.updateName('孙晨');
		// 拉取订餐数据到vuex中
		this.fetchOrderedList();
	},
	data () {
		return {

		}
	},
	computed: {
		fillBlank () {
			var remained = 30 - this.orderedList.length;
			return new Array(remained);
		},
		shortStr () {
			return this.todayStr.match(/\d{4}\-(\d{2}\-\d{2})/)[1];
		}
	},
	store,
	vuex:{
		getters:{
			orderedList: state => state.orderedList,
			todayStr: state => state.timeStr,
		},
		actions:{
			fetchOrderedList,
			updateName,
		}
	}
}
</script>
<style scoped lang='less'>
	body{
		> div {
			display: inline-block;
		}
	}
	div.tableMain{
		background-color: #fff;
		color:#000;
		display: inline-block;
		> p {
			font-size:2rem;
			font-weight:bold;
			text-align: center;
			margin: 0 auto;
		}
	}
	table{
		display: inline-block;
		border-collapse:collapse;
		vertical-align:bottom;
		thead{
			font-weight:bold;
		}
		tbody, thead{
			td{
				font-size:0.8rem;
				border: 1px solid black;
				padding:7px 5px;
				text-align: center;
				min-width:30px;
				height:15px;
				&:last-child{
					width:40px;
				}
			}
		}
	}
</style>