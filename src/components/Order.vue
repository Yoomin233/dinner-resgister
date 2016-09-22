<template lang='jade'>
  div.main
    p 欢迎登录, {{name}}
    p 今天的日期是 {{todayStr}}
    p(v-if='!ordered') &nbsp;
    p(v-if='ordered') 你已经成功订餐啦！
    button.plus(@click='addEater') +1
    button.cancel(@click='delEater') cancel
    button.reset(@click='resetUser') change user
    p 和如下小伙伴共进晚餐吧！
    ul
      li(v-for='(index, item) in orderedList') {{item}}
    p.count 共计: <span>{{orderedList?orderedList.length - 1:0}}</span>人
    p.footer author: <a href='https://github.com/YueminHu/'>yuemin.hu</a>, powered by <a href='https://vuejs.org/'>vue</a> and <a href='https://www.wilddog.com/dashboard/'>wilddog</a>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import store from './store.js'
import {fetchOrderedList,updateName,addEater,delEater} from './actions.js'
export default {
  ready () {
    if(!localStorage.getItem('dinner-register-name')){
      this.$router.replace('/register');
    }
    this.updateName(localStorage.getItem('dinner-register-name'));
    // 拉取订餐数据到vuex中
    this.fetchOrderedList();
  },
  components: {
  }, 
  methods: {
    resetUser () {
      localStorage.setItem('dinner-register-name','');
      this.$router.replace('/register');
    }
  },
  store,
  vuex:{
    actions:{
      fetchOrderedList,
      updateName,
      addEater,
      delEater
    },
    getters:{
      orderedList: state => state.orderedList,
      todayStr: state => state.timeStr,
      name: state => state.name,
      ordered: state => state.ordered
    }
  },
}
</script>

<style lang='less' scoped>
div.main{
  color:#777;
  > button.plus{
    border:none;
    cursor:pointer;
    display: block;
    margin:0 auto;
    padding:50px;
    background-color: #52ec3f;
    transition:all .3s ease;
    box-shadow:inset -2px -2px 0px 2px #31a204, inset 2px 2px 0px 2px #a8f6a3;
    font-size:4rem;
    color:#eee;
    font-weight:bold;
    border-radius:10%;
  }
  > button.plus:hover{
    transform:translate3d(-5px, -5px, 0);
    box-shadow:inset -2px -2px 0px 2px #31a204, inset 2px 2px 0px 2px #a8f6a3,5px 5px 15px 2px rgba(0, 0, 0, 0.2);
  }
  > button.plus:active{
    transform:translate3d(0, 0, 0);
    border:none;
    outline:none;
  }
  > button.cancel, button.reset{
    background-color: #eee;
    border:1px solid #aaa;
    color:#777;
    cursor:pointer;
    padding:5px;
    margin:10px;
    border-radius:10px;
  }
  p.count{
    > span{
      color:red;
      font-weight: bold;
    }
  }
  li:hover{
    background: none;
  }
}
</style>
<style lang='less'>
    p.footer{
    color:#999;
    font-size:0.5rem;
    }
    a:link, a:visted, a:hover, a:active{
      color:#999;
    }
</style>
