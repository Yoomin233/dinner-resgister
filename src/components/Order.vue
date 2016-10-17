<template lang='jade'>
  div.main
    div.settings
      div(@click='switchPanel' v-bind:class='["settingsIcon", ifShowPanel?"settingsIconActivated":""]')
        <img src="../assets/gear.png" alt="">
      div.settingsPanel(v-if='ifShowPanel' transition='expand' @click='switchPanel') 
        p 当前用户是:{{name}}
          span.switchUser(@click='resetUser') 更换用户
        p 通知开关
          span.notificationSwitchContainer(@click.stop='switchStatus')
            span(v-bind:class='["notificationSwitchSlider", ifNotification?"sliderRight":""]')
            span(v-bind:class='["notificationSwitchFiller", ifNotification?"fillerGreen":""]')
    p 欢迎登录, {{name}}
    p 今天的日期是 {{todayStr}}
    p(v-if='!ordered') &nbsp;
    p(v-if='ordered') 你已经成功订餐啦！
    button.plus(@click='addEater') +1
    button.cancel(@click='delEater' v-if='ordered') cancel
    div.componentSwitcher
      a(v-link="{ path: '/order/orderedList', replace:true}") 订餐列表
      // a(v-link="{ path: '/order/chatRoom', replace:true}") 一起聊天
      // a(v-link="{ path: '/order/foodMenu', replace:true}") 今日菜谱
    div.router-view
      router-view(keep-alive)
    p.footer author: <a href='https://github.com/YueminHu/'>yuemin.hu</a>, powered by <a href='https://vuejs.org/'>vue</a> and <a href='https://www.wilddog.com/dashboard/'>wilddog</a>
    div.infoHelper(v-if='ifInfoHelper', transition='infoHelperToggle') {{info}}
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import store from './store.js'
import {fetchOrderedList,updateName,addEater,delEater,switchIfNotification} from './actions.js'
export default {
  data () {
    return {
      ifShowPanel:false,
      ifInfoHelper:false,
      info:'22',
      infoHelperTimer:''
    }
  },
  ready () {
    if(!localStorage.getItem('dinner-register-name')){
      this.$router.replace('/register');
    }
    // 如果之前设置过允许通知则写入vuex
    if (localStorage.getItem('dinner-register-ifNotification') == 'true') {
      this.switchIfNotification(true);
    }
    this.updateName(localStorage.getItem('dinner-register-name'));
    // 拉取订餐数据到vuex中
    this.fetchOrderedList();
    // this.fetchChatList();
  },
  components: {
  }, 
  methods: {
    resetUser () {
      localStorage.setItem('dinner-register-name','');
      this.$router.replace('/register');
    },
    switchPanel () {
      this.ifShowPanel = !this.ifShowPanel;
    },
    switchStatus () {
      this.switchIfNotification(!this.ifNotification);
      this.ifInfoHelper = true;
      if(this.ifNotification){
        this.info = '通知推送已打开';
      } else {
        this.info = '通知推送已关闭';
      }
      if(this.infoHelperTimer)clearTimeout(this.infoHelperTimer);
      this.infoHelperTimer = setTimeout(() => {
        this.ifInfoHelper = false;
      }, 1500)
    }
  },
  store,
  vuex:{
    actions:{
      fetchOrderedList,
      updateName,
      addEater,
      delEater,
      switchIfNotification
    },
    getters:{
      orderedList: state => state.orderedList,
      todayStr: state => state.timeStr,
      name: state => state.name,
      ordered: state => state.ordered,
      ifNotification: state => state.ifNotification
    }
  },
}
</script>

<style lang='less' scoped>
div.main{
  color:#777;
  position: relative;
  > div.infoHelper {
    text-shadow: none;
    position: absolute;
    left:50%;
    top:70%;
    transform:translateX(-50%);
    background-color: rgba(0, 0, 0, 0.6);
    padding:15px;
    color:#fff;
  }
  > div.settings {
    position: absolute;
    right:30px;
    top:30px;
    width:45px;
    height:45px;
    z-index:9999;
    text-shadow: none;
  }
  div.settingsPanel{
    position: absolute;
    width:500%;
    background-color: rgba(0,0,0,0.6);
    text-align: left;
    padding:10px;
    color:#fff;
    span {
      display: inline-block;
      height:80%;
      vertical-align: baseline;
      transition:all .3s ease;
    }
    span.switchUser {
      font-size:90%;
      vertical-align: bottom;
      text-decoration: underline;
      padding:0 10px;
      cursor: pointer;
    }
    span.notificationSwitchContainer{
      background-color: #fff;
      border-radius:100px;
      height:20px;
      width:40px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      margin-left:20px;
      span.notificationSwitchSlider{
        position: absolute;
        width:18px;
        height:18px;
        top:1px;
        transform:translate3d(1px, 0, 0);
        background-color: #fff;
        border-radius:9px;
        z-index:2;
      }
      span.notificationSwitchFiller{
        position: absolute;
        width:100%;
        height:100%;
        left:0;
        top:0;
        background-color: lightgray;
        z-index:1;
      }
      span.sliderRight{
        transform:translate3d(20px, 0, 0);
      }
      span.fillerGreen{
        background-color: lightgreen;
      }
    }
  }
  div.expand-transition{
    transition:all .3s ease;
    opacity:1;
    transform:translate3d(-180px,45px, 0);
  }
  div.expand-enter, div.expand-leave{
    opacity:0;
    transform:translate3d(-180px,0, 0);
  }
  div.infoHelperToggle-transition{
    transition:all .3s ease;
    opacity:1;
  }
  div.infoHelperToggle-enter, div.infoHelperToggle-leave{
    opacity:0;
  }
  div.settingsIcon {
    position: absolute;
    right:0;
    top:0;
    border-radius:50%;
    width:45px;
    height:45px;
    cursor: pointer;
    overflow: hidden;
    >img {
      width:100%;
      filter:drop-shadow(-45px 0px 0px rgba(0,0,0,0.3));
      border-left:45px solid transparent;
    }
  }
  div.settingsIconActivated {
    > img {
      filter:drop-shadow(-45px 0px 0px rgba(215,53,53,0.8));
    }
  }
  > button {
    color:#fff;
  }
  > button.plus{
    border:none;
    cursor:pointer;
    display: block;
    margin:0 auto;
    padding:50px;
    background-color: #9dea93;
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
  > button.plus:focus{
    outline:none;
  }
  > button.plus:active{
    transform:translate3d(0, 0, 0);
    border:none;
    outline:none;
  }
  > button.cancel, button.reset{
    background-color: #eee;
    border:1px solid #aaa;
    cursor:pointer;
    padding:5px;
    margin:10px;
    border-radius:10px;
  }
  > button.cancel {
    background-color: #d28787;
  }
  > button.reset {
    background-color: #626bdb;
  }
  > div.componentSwitcher{
    color:#444;
    display:flex;
    padding:0 10%;
    > a {
      text-decoration: none;
      width:100%;
      display: inline-block;
      text-align: center;
      padding:10px;
      transition:all .3s ease;
      &:visited,link,hover,activated{
        color:#777;
      }
      &.v-link-active{
        color:#000;
        background-color: rgba(0,0,0,0.1);
      }
    }
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
