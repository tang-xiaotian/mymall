<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if='!isActive'><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 1.用静态red渲染文字 -->
    <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->

    <!-- 2.用户可自定义文字颜色 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

    
  </div>
</template>

<script>

export default {
  name: "TabBarItem",
  components: {},
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return {
      // isActive: false
    }
  },
  methods:{
    itemclick(){
      this.$router.replace(this.path)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)!==-1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor}:{}
    }
  }
};
</script>

<style>
 .tab-bar-item{
   flex:1;
   text-align: center;
   height: 49px;
   font-size: 14px;
 }

 .tab-bar-item img{
   width: 24px;
   height: 24px;
   margin-top: 3px;
   vertical-align: middle;
   margin-bottom: 2px;
 }

 /* .active{
   color: red;
 } */

</style>