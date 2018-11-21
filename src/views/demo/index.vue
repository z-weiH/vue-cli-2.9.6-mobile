<template>
  <div>
    <group>
      <x-input title="用户名：" v-model.trim="ruleForm.login" v-validator="rules.login">
        <span class="error" slot="right">{{$validator.firstError('ruleForm.login')}}</span>
      </x-input>
    </group>
    <group>
      <x-input type="password" title="密码：" v-model.trim="ruleForm.password" v-validator="rules.password">
        <span class="error" slot="right">{{$validator.firstError('ruleForm.password')}}</span>
      </x-input>
    </group>
    <group>
      <x-button @click.native="handleSubmit" type="primary">提交</x-button>
    </group>
  </div>
</template>

<script>
  import { Group, Cell , Popup , XButton, XInput } from 'vux'
  import { getUrlParam } from '@/assets/js/utils'
  import qs from 'qs'
  export default {
    data() {
      return {
        ruleForm : {
          login : '',
          password : '',
        },
        rules : {
          login : [
            {rule : 'required' , message : '请输入用户名' , trigger : 'blur'},
          ],
          password : [
            {rule : 'required' , message : '请输入密码' , trigger : 'blur'},
            {rule : val => val.length > 5, message : '密码不能少于6位' , trigger : 'blur'},
          ],
        },
      }
    },
    components: {
      Group,
      Cell,
      Popup,
      XButton,
      XInput,
    },
    mounted() {
      let openId = getUrlParam('code');
      if(!openId) {
        // 微信 获取 openId 逻辑 start
        let Tencent_WxCode_api = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
        let domain_src = 'http://zw.tunnel.qydev.com'; // 获取code后的回调地址  ， 后端根据code获取openId 再做重定向操作跳转至前端url地址
        let loginConfig = {
          appid: 'wxb785be721e2989f3',
          redirect_uri: domain_src + '/mobile/band/openid/query_gzh.htm',
          response_type: 'code',
          scope: 'snsapi_userinfo', // snsapi_base - 静默授权 ， snsapi_userinfo - 弹窗授权
        };
        window.location.replace(Tencent_WxCode_api + qs.stringify(loginConfig) + '#wechat_redirect');
        // 微信 获取 openId 逻辑 end
      }else{
        console.log('code:',openId);
      }
    },
    methods : {
      handleSubmit() {
        let success = Object.keys(this.$validator.check().getError()).length === 0;
        if(success) {
          alert('提交数据');
        }
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

.error{
  color: red;
}

</style>