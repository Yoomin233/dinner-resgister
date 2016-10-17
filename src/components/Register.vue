<template lang='jade'>
  div.main 
    p 您的名字是？
    div.input
      input(v-model='query', placeholder='键入任意汉字或字母！')
    p 支持拼音以及首字母搜索
    ul
      li(v-for='item in nameList|filterBy query in "pinyinName" "shortName" "chineseName"', stagger='', @click='registerName($event, item)') 
        span {{item.chineseName}} 
        span ({{item.RTXname}})
    p.footer author: <a href='https://github.com/YueminHu/'>yuemin.hu</a>, powered by <a href='https://vuejs.org/'>vue</a> and <a href='https://www.wilddog.com/dashboard/'>wilddog</a>
</template>

<script>
import wilddog from 'wilddog'
import store from './store.js'
export default {
  data () {
    return {
      query: ''
    }
  },
  ready () {
    if(localStorage.getItem('dinner-register-name')){
      this.$router.replace('/order');
    }
    document.querySelector('input').focus();
  },
  methods:{
    registerName(event, item){
      localStorage.setItem('dinner-register-name', item.chineseName);
      this.$router.replace('/order');
    }
  },
  store,
  vuex:{
    getters:{
      nameList: state => state.userList
    }
  }
}
</script>

<style lang='less'>
html, body{
  padding:0;
  margin:0;
}
div.main {
  color:#777;
  text-align: center;
  max-width:400px;
  margin:auto;
  background-color: #eee;
  font-family:Microsoft Yahei, Consolas,"Liberation Mono",Menlo,Courier,monospace;
  padding: 1em 0;
  > p:first-of-type{
    font-size: 1.5rem;
  }
}
div.main input{
  display: block;
  margin:0 auto;
  font-family:Consolas,"Liberation Mono",Menlo,Courier,monospace;
  width:100%;
  font-size:2rem;
  border:none;
  background-color: #fff;
  font-style:italic;
  position: relative;
  text-align: center;
  z-index:1;
}
div.input{
  position: relative;
  background-color: #fff;
  margin-bottom:10px;
  z-index:1;
}
div.input::before, div.input::after{
  position: absolute;
  content: "";
  bottom: 45%;
  left: 2%;
  width: 50%;
  height:1px;
  background: transparent;
  box-shadow: 0 15px 10px #222;
  transform: rotate(-3deg);
  display: block;
}
div.input::after{
  right:2%;
  left:auto;
  transform:rotate(3deg);
}
div.main input:focus{
  outline:none;
}
div.main li{
  list-style-type: none;
  cursor:pointer;
  transition: all .3s ease; 
}
div.main li:hover{
  background-color: rgba(255, 255, 255, 0.6);
}
div.main ul{
  -webkit-padding-start: 0px;
}
</style>
<style lang='less' scoped>
  div.main li{
    display: flex;
    > span{
      width:100%;    
      padding-left:10%;
      text-align: left;
    }
  }
</style>
