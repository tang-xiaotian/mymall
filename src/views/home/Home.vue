<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control-up"
                 v-show="isTabFixed"></tab-control>

    <scroll class="scrollcontent" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- 监听组件点击：加修饰符 -->
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop : 0,
      isTabFixed:false
    }
  },
  computed:{
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    //3.监听item中图片加载完成
    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll.refresh()
    // })
  },
  mounted(){
      // 防抖动  图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,500)
    // this.$bus.$on('itemImageLoad',()=>{
    //   // this.$refs.scroll.refresh()
    //   refresh()
    // })

    // 获取tabControl的offsetTop
    // 所有组件都有一个属性 $el  获取组件元素
    // this.$refs.tabControl.$el
    // console.log(this.$refs.tabControl2.$el.offsetTop)

  },
  unmounted(){
    console.log('123456')
  },
  methods:{
    //事件监听相关

    
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
          case 1:
          this.currentType = 'new'
          break
          case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.判断backTop 是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.决定tabControl是否吸顶(position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('----')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },



    //网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        // console.log(this.goods[type].list)

        this.$refs.scroll.finishPullUp()
      })
    }
  }
};

</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    /* vh  viewport height */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control{
    position:sticky;
    top:44px;
    z-index: 9;
  } */

  .scrollcontent{
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control-up{
    position: relative;
    z-index: 9;
  }
/* 
  

  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
