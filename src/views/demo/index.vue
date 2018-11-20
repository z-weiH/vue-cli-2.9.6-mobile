<template>
  <div>
    啦啦啦 - demo
    <x-button type="primary" class="lalala" @click.native="handleClick">啦啦啦</x-button>
    <div>
      <group>
        <cell title="title" value="value"></cell>
      </group>
      <x-button @click.native="show13 = true" plain type="primary"> Close Me </x-button>
    </div>

    <div>
      <p>vant</p>
    </div>

    <popup v-model="show13" position="bottom" max-height="50%">
      <group>
        <cell v-for="i in 20" :key="i" :title="i"></cell>
      </group>
      <div style="padding: 15px;">
        <x-button @click.native="show13 = false" plain type="primary"> Close Me </x-button>
      </div>
    </popup>
  </div>
</template>

<script>
  import { Group, Cell , Popup , XButton } from 'vux'
  import { getUrlParam } from '@/assets/js/utils'
  import qs from 'qs'
  export default {
    data() {
      return {
        show13 : false,
      }
    },
    components: {
      Group,
      Cell,
      Popup,
      XButton,
    },
    mounted() {
      let openId = getUrlParam('code' || 'openId');
      if(!openId) {
        // 微信 静默授权获取 openId 逻辑 start
        let Tencent_WxCode_api = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
        let domain_src = 'http://zw.tunnel.qydev.com'; // 获取code后的回调地址  ， 后端根据code获取openId 再做重定向操作跳转至前端url地址
        let loginConfig = {
          appid: 'wxb785be721e2989f3',
          redirect_uri: domain_src + '/mobile/band/openid/query_gzh.htm',
          response_type: 'code',
          scope: 'snsapi_base',
        };
        window.location.replace(Tencent_WxCode_api + qs.stringify(loginConfig) + '#wechat_redirect');
        // 微信 静默授权获取 openId 逻辑 end
      }else{
        alert(openId);
      }
    },
    methods : {
      handleClick() {
        console.log('啦啦啦');
      },
    },
  }
</script>

<style lang="scss" scoped>

.lalala{
  width: 224px;
  height: 78px;
  line-height: 78px;
  border-radius: 10px;
  text-align: center;
  font-size: 32px;
}

</style>