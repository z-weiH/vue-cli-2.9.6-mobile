// element 通用配置项
let element = {
  // 表格 每一页展示数量
  pageSizes : [10, 20, 30, 40],
  // 表格 默认展示数量 
  pageSize : 10,
  // 表格 layout
  layout : "total, sizes, prev, pager, next, jumper",

};

let config = {
  env : 'dev', // dev 开发环境 ， test 测试环境 ， prod 正式环境
  host : '', // 跨域请求地址

  // element 配置项
  element,
};

export default config