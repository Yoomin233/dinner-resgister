<template lang='jade'>
div.tableMain
	table
		caption 加班餐预定
		thead
			tr
				td 序号
				td 日期
				td 部门
				td 姓名
				td 签收(请写正楷)
		tbody
			tr(v-for='item in orderedList')
				td {{$index}}
				td {{todayStr}}
				td 技术部
				td {{item}}
				td &nbsp;
			tr(v-for='item in fillBlank' track-by='$index')
				td {{$index + orderedList.length}}
				td {{todayStr}}
				td 技术部
				td
				td
</template>
<script>
import store from './store.js'
export default {
	data () {
		return {

		}
	},
	computed: {
		fillBlank () {
			return new Array(10);
		}
	},
	store,
	vuex:{
		getters:{
			orderedList: state => state.orderedList,
			todayStr: state => state.timeStr,
		}
	}
}
</script>
<style scoped lang='less'>
	div.tableMain{
		background-color: #fff;
		color:#000;
	}
	table{
		border-collapse:collapse;
		caption{
			font-size:2rem;
		}
		tbody, thead{
			td{
				border: 1px solid black;
				padding:5px 15px;
				text-align: center;
				&:last-child{
					width:120px;
				}
			}
		}
	}
</style>