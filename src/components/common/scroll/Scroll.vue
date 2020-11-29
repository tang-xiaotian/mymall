<template>
  <div class="wrapper" ref="aaa">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  components: {},
  data(){
    return {
      scroll: null
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    //  this.scroll = new BScroll(this.$refs.aaa,{})
    //  this.scroll = new BScroll(document.querySelector('.wrapper'),{})
    // console.log(this.$refs.aaa)
    //默认情况下BScroll不能实时监听滚动位置
    //probe侦测(0,1不侦测 2侦测:手指在时侦测，惯性过程不侦测 3全侦测)
    //BScroll默认不支持按钮事件，click属性可改
    this.scroll = new BScroll(this.$refs.aaa,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // console.log(this.scroll)
    //监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll',position)
    })
    //监听上拉加载更多
    this.scroll.on('pullingUp',()=>{
      // console.log('上架')
      this.$emit('pullingUp')
    })

    // console.log(this.scroll)
  },
  updated(){
    this.scroll.refresh();
  }
};
</script>

<style scoped>
  
</style>
