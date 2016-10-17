<template lang='jade'>
  div.main
    div.settingsPanel(v-if='ifShowPanel' transition='expand' @click='switchPanel') 
      p 当前用户是:{{name}}
        span.switchUser(@click='resetUser') 更换用户
      p 推送通知
        span.notificationSwitchContainer(@click.stop='switchStatus')
          span(v-bind:class='["notificationSwitchSlider", ifNotification?"sliderRight":""]')
          span(v-bind:class='["notificationSwitchFiller", ifNotification?"fillerGreen":""]')
      p 日期： {{todayStr}}
      div.infoHelper(v-if='ifInfoHelper', transition='infoHelperToggle') {{info}}
    div.settings
      div(@click='switchPanel' v-bind:class='["settingsIcon", ifShowPanel?"settingsIconActivated":""]')
        <img src="../assets/gear.png" alt="">
    p 欢迎登录, {{name}}
    button.plus(@click='addEater') +1
    div.order-list
      p(v-if='ordered') 你已经成功订餐啦！
      p 和如下小伙伴共进晚餐吧！
      ul
        li(v-for='(index, item) in orderedList') {{item}}
          button.cancel(@click='delEater' v-if='ordered&&item == name') cancel
      p.count 共计: <span>{{orderedList.length == 0?0:orderedList.length}}</span>人
    p.footer author: <a href='https://github.com/YueminHu/'>yuemin.hu</a>, powered by <a href='https://vuejs.org/'>vue</a> and <a href='https://www.wilddog.com/dashboard/'>wilddog</a>
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
      if(this.ifShowPanel == true){
        setTimeout(()=>{
          [...document.querySelectorAll('div.main > * ')].forEach((elem, index) => {
            if([].indexOf.call(elem.classList, 'settingsPanel')){
              elem.style.filter = 'blur(20px)';
            }
          }) 
        }, 80)
      }else{
        setTimeout(()=>{
          [...document.querySelectorAll('div.main > * ')].forEach((elem, index) => {
            if([].indexOf.call(elem.classList, 'settingsPanel')){
              elem.style.filter = '';
            }
          })
        }, 80)
      }
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
  background:linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2) 100%);
  li {
    margin:.6em 0;
    position: relative;
  }
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
  > div.settings + p {
    display: inline-block;
    background-color: darken(#58a,10%);
    padding:.5em 1.5em;
    color:#fff;
    text-shadow:0 .05em .05em rgba(0, 0, 0, 0.3);
    border-radius:.8em;
    border-bottom-right-radius:0;
  }
  div.settingsPanel{
    z-index:1;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.6);
    text-align: center;
    padding:10px;
    color:#fff;
    box-sizing:border-box;
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
        left:0;
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
        background-color: #6b0;
      }
    }
  }
  div.expand-transition{
    transition:all .3s cubic-bezier(0.25, 0.1, 0, 1.42);
    opacity:1;
    transform:translate3d(0px,0%, 0);
  }
  div.expand-enter, div.expand-leave{
    opacity:0;
    transform:translate3d(0px,-100%, 0);
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
    transition:transform .3s;
    &:hover{
      animation:spinIcon 3s linear infinite;
    }
    >img {
      width:100%;
    }
  }
  > button {
    color:#fff;
  }
  > button.plus{
    border:none;
    cursor:pointer;
    display: block;
    margin:.2em auto .2em;
    width:75%;
    background-color:#6b0;
    background-image: linear-gradient(to bottom, rgba(100, 100, 100, 0), rgba(100, 100, 100, 0.4) 100%);
    font-size:4em;
    color:#eee;
    font-weight:bold;
    border-radius:1em;
    border:1px solid #659a26;
    filter:drop-shadow(0 0em .05em rgba(0, 0, 0, 0.6));
    text-shadow:.05em .05em .15em rgba(0,  0, 0, 0.5);
    position: relative;
    &::before{
      content:'';
      border:.2em solid transparent;
      border-top-color:inherit;
      position: absolute;
      bottom:0;
      left:50%;
      z-index:0;
      transform:translate3d(-50%, 100%, 0);
      transition:all .3s ease;
    }
  }
  > button.plus:focus{
    outline:none;
  }
  > button.plus:active{
    outline:none;
    &::before{
     transform:translate3d(-50%, 200%, 0);
     filter:blur(20px);
    }
  }

  > button.reset {
    background-color: #626bdb;
  }
  > div.order-list{
    color:#fff;
    text-shadow:none;
    background-color: #58a;
    padding:2em;
    margin:2em 3em;
    background:linear-gradient(to bottom, transparent 0, transparent 2.4em, rgba(0,0,0,0.4) 2.5em, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 4.8em, transparent 0, transparent 7.2em,  rgba(0,0,0,0.4) 7.3em, rgba(0,0,0,0.1) 0,  rgba(0,0,0,0.1) 9.6em),linear-gradient(-155deg, transparent 1.5em, #58a 0);
/*     background-origin:content-box, padding-box; */
    position: relative;
    border-radius:.8em;
    box-shadow:0 .5em .5em -.5em black;
    text-shadow:0 .05em .05em rgba(0, 0, 0, 0.7);
    button.cancel {
      color:#fff;
      border:none;
      cursor:pointer;
      padding:5px;
      border-radius:.3em;
      background-color: #cb0;
      position: absolute;
      right:10%;
      text-shadow:0 .05em .05em rgba(0, 0, 0, 0.4);
    }
  }
  > div.order-list::before{
    content:'';
    position: absolute;
    right:0;
    top:-2em;
    width:3.5em;
    height:2em;
    background: linear-gradient(to bottom right, transparent 50%, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.4) 100%);
    transform-origin:left bottom;
    transform:rotate(55deg);
    border-bottom-right-radius:inherit;
    box-shadow:.3em .3em .3em -.1em rgba(0, 0, 0, 0.15);
  }

  p.count{
    > span{
      color:#cb0;
      font-weight: bold;
    }
  }
  li:hover{
    background: none;
  }
}
@keyframes spinIcon{
 to {
  transform:rotate(360deg);
 }
}
a{
  color:#999
}
</style>
<style lang='less'>
    p.footer{
    color:#999;
    font-size:0.5rem;
    }
</style>
