<template>
  <div class="scroll-wrapper" :style="{height}">
    <div class="scroll-wrapper-content">
      <!-- 刷新 box -->
      <div v-if="pullDownRefresh" class="pulldown-wrapper" :style="{
        height : `${pullDownRefresh.stop}px` , 
        'line-height' : `${pullDownRefresh.stop}px` , 
        top : `-${pullDownRefresh.stop}px`
      }">
        <template v-if="loadingType === 1">
          <span v-if="pullingDownStatus === 1">{{pullDownRefresh.text1}}</span>
          <span v-if="pullingDownStatus === 2">{{pullDownRefresh.text2}}</span>
        </template>
        <template v-if="loadingType === 2">
          <bubble v-if="pullingDownStatus === 1 || pullingDownStatus === 2" :y="bubbleY"></bubble>
        </template>
        <inline-loading v-if="pullingDownStatus === 3"></inline-loading>
      </div>
      <slot></slot>
      <!-- 加载更多 box -->
      <div class="pullup-wrapper" :class="{'pullup-wrapper-pos' : pullingUpStatus === 1}" :style="{
        height : `${pullUpLoad.stop}px` , 
        'line-height' : `${pullUpLoad.stop}px` , 
      }">
        <span v-if="pullingUpStatus === 1">{{pullUpLoad.text1}}</span>
        <span v-if="pullingUpStatus === 2">{{pullUpLoad.text2}}</span>
        <inline-loading v-if="pullingUpStatus === 3"></inline-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { InlineLoading } from 'vux'
  import Bubble from './bubble.vue'
  export default {
    props : {
      // 1 下拉刷新为 text文字 2 canvas动画
      loadingType : {
        default : 1,
        type : Number,
      },
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
            stop: 80, // loadingType 为1时 该值最好为25
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
            stop: 25,

            text1 : '上拉加载更多',
            text2 : '没有更多数据了',
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
      Bubble,
    },
    data() {
      return {
        scroll : '',
        bubbleY : '',

        pullingDownStatus : '', // 1 当前下拉刷新状态 2 当前松开立即刷新状态 3 loading状态
        pullingUpStatus : 1, // 1 加载更多 2 暂无数据 3 loading状态
      }
    },
    mounted() {
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
      // 初始化 事件
      init() {
        // 加载下一页 逻辑
        this.pullUpLoad && this.scroll.on('pullingUp', () => {
          console.log('加载下一页');
          // 如果当前暂无数据 退出
          if(this.pullingUpStatus === 2) {
            return;
          }
          this.pullingUpStatus = 3;
          // 加载更多 正常流 需要调用此方法
          this.$nextTick(() => {
            this.scroll.refresh();
          });

          let next = () => {
            this.pullingUpStatus = 1;
            this.$nextTick(() => {
              this.scroll.finishPullUp();
            });
          };
          this.$emit('pullingUp',next);
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

              // 重置暂无数据逻辑
              this.scroll.finishPullUp();
              this.pullingUpStatus = 1;
              this.$nextTick(() => {
                this.scroll.refresh();
              });
            },1000);
          };
          this.$emit('pullingDown',next);
        });

        // 滚动逻辑
        this.pullDownRefresh && this.scroll.on('scroll',(pos) => {
          if(this.pullingDownStatus === 3) {
            return;
          }
          if(pos.y > 0) {
            if(pos.y >= this.pullDownRefresh.threshold) {
              this.pullingDownStatus = 2;
            }else{
              this.pullingDownStatus = 1;
            }
            this.bubbleY = Math.max(0, pos.y + -50);
          }
        });
      },

      // 暂无数据方法
      noData() {
        this.pullingUpStatus = 2;
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
    text-align: center;
  }
  .pullup-wrapper-pos{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    text-align: center;
  }
}

</style>