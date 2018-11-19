<template>
  <div>
    啦啦啦 - demo
    <x-button class="lalala" @click.native="handleClick">啦啦啦</x-button>
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
  background-color: red;
  color: #fff;
  text-align: center;
  font-size: 32px;
}

</style>