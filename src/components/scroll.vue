<template>
  <div class="scroll-wrapper" :style="{height}">
    <div class="scroll-wrapper-content">
      <!-- 刷新 box -->
      <div v-if="pullDownRefresh" class="pulldown-wrapper" :style="{
        height : `${pullDownRefresh.stop}px` , 
        'line-height' : `${pullDownRefresh.stop}px` , 
        top : `-${pullDownRefresh.stop}px`
      }">
        <span v-if="pullingDownStatus === 1">{{pullDownRefresh.text1}}</span>
        <span v-if="pullingDownStatus === 2">{{pullDownRefresh.text2}}</span>
        <inline-loading v-if="pullingDownStatus === 3"></inline-loading>
      </div>
      <slot></slot>
      <!-- 加载 box -->
      <div class="pullup-wrapper">下一页</div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { InlineLoading } from 'vux'
  export default {
    props : {
      // 容器 height
      height : {
        default : '100%',
        type : String,
      },
      // 这个配置用于做下拉刷新功能
      pullDownRefresh : {
        default : () => {
          return {
            threshold: 50,
            stop: 25,
            text1 : '下拉刷新',
            text2 : '松开立即刷新',
          }
        },
      },
      // 这个配置用于做上拉加载功能
      pullUpLoad : {
        default : () => {
          return {
            threshold: -50,
          }
        },
      },
      // 用于监听数据变化
      data : {
        default : () => [],
      },
    },
    watch : {
      data() {
        this.scroll.refresh();
      },
    },
    components : {
      InlineLoading,
    },
    data() {
      return {
        scroll : '',

        pullingDownStatus : '', // 1 当前下拉刷新状态 2 当前松开立即刷新状态 3 loading状态
        pullingUpStatus : '', // 
      }
    },
    mounted() {
      console.log('this',this);
      let wrapper = document.querySelector('.scroll-wrapper');
      let options = {
        pullDownRefresh : this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,

        ...this._props,
      };
      this.scroll = new BScroll(wrapper,options);

      this.$nextTick(() => {
        this.init();
      });
    },
    methods : {
      init() {
        // 加载下一页 逻辑
        this.scroll.on('pullingUp', () => {
          console.log('加载下一页');

          //this.scroll.finishPullUp();
          setTimeout(() => {
            this.scroll.finishPullUp();
          },2000);
          
        });

        // 刷新逻辑
        this.pullDownRefresh && this.scroll.on('pullingDown',() => {
          console.log('刷新');
          this.pullingDownStatus = 3;
          let next = () => {
            this.scroll.finishPullDown();
            // 增加定时器 防止关闭时文案直接加载出来
            setTimeout(() => {
              this.pullingDownStatus = '';
            },500);
          };
          this.$emit('pullingDown',next);
        });

        // 滚动逻辑
        this.pullDownRefresh && this.scroll.on('scroll',(pos) => {
          if(this.pullingDownStatus === 3) {
            return;
          }
          if(pos.y >= this.pullDownRefresh.threshold) {
            this.pullingDownStatus = 2;
          }else{
            this.pullingDownStatus = 1;
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.scroll-wrapper{
  overflow: hidden;
  .scroll-wrapper-content{
    position: relative;
  }
  .pulldown-wrapper{
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .pullup-wrapper{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    text-align: center;
  }
}

</style>