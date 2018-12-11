<template>
  <div class="scroll-box">
    <scroll
      @pullingDown="pullingDown"
      @pullingUp="pullingUp"
      :data="list"
      ref="scroll"
    >
      <div>
        <p v-for="(item,index) in list" :key="index">{{item}}</p>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from '@/components/scroll.vue'
  import Vue from 'vue'
  import  { ToastPlugin } from 'vux'
  Vue.use(ToastPlugin);
  export default {
    components : {
      scroll,
    },
    data() {
      return {
        list : [],
      }
    },
    mounted() {
      for(let i = 0 ; i <= 100 ; i ++) {
        this.list.push(i);
      }
    },
    methods : {
      pullingDown(next) {
        setTimeout(() => {
          next();
          this.$vux.toast.show({
            text : '刷新成功',
            type : 'text',
            position : 'top',
          });
        },2000);
      },
      pullingUp(next) {
        setTimeout(() => {
          if(Math.random() > 0.5) {
            next();
            for(let i = 0 ; i < 10 ; i ++) {
              this.list.push(+ new Date() + i);
            }
          }else{
            this.$refs.scroll.noData();
          }
        },2000);
      },
    },
  }
</script>

<style lang="scss" scoped>

.scroll-box{
  height: 100%;
  font-size: 24px;
}

</style>