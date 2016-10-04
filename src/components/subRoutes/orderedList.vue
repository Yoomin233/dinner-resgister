<template lang='jade'>
div.top
    p 和如下小伙伴共进晚餐吧！
    ul
      li(v-for='(index, item) in orderedList') {{item}}
        span(v-if='item == name') (我)
    p.count 共计: <span>{{orderedList.length == 0?0:orderedList.length}}</span>人
</template>
<script>
export default {
	vuex: {
	    getters:{
	      orderedList: state => state.orderedList,
	      name: state => state.name,
	    }
	}
}
</script>
<styles lang='less'>

</styles>