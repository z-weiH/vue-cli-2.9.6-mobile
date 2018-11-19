import Vue from 'vue'

Vue.directive('ellipsis',{
  inserted(el,binding,vnode,oldVnode) {
    el.style.display = 'inline-block';
    el.style.whiteSpace = 'nowrap';
    // 可以存储数据到 el中 
    el.$mapp = new Vue({
      el : el,
      data() {
        let padding = Object.keys(binding.modifiers)[0] || 0;
        let parentWidth = binding.value || (el.parentNode.clientWidth - padding);
        let width = el.clientWidth;
        let text = el.innerText;
        return {
          padding,
          parentWidth,
          width,
          el,
          text,
        }
      },
      template : `
        <span class="ellipsis-box" style="display:inline-block;">
          <template v-if="width <= parentWidth">
            {{text}}
          </template>
          <template v-else>
            <el-tooltip :content="text" placement="top-start">
              <span 
                style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;"
                :style="{maxWidth : parentWidth + 'px'}">{{text}}</span>
            </el-tooltip>
          </template>
        </span>
      `
    });
  },
  componentUpdated(el,binding,vnode,oldVnode) {
    // 以下操作 为了获取当前元素的 width
    let span = document.createElement('span');
    let className = `span-${Math.random()}`
    span.className = className;
    span.innerText = el.innerText;
    document.body.appendChild(span);
    let width = span.offsetWidth;
    document.body.removeChild(span);

    let padding = Object.keys(binding.modifiers)[0] || 0;
    el.$mapp.padding = padding;
    el.$mapp.parentWidth = binding.value || (el.$mapp.$el.parentNode.clientWidth - padding);
    el.$mapp.width = width;
    el.$mapp.text = el.innerText;

  },
});