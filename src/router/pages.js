let pages = [
  {
    path : '/',
    component : resolve => require(['@/views/demo'], resolve), 
  },
  {
    path : '/scroll',
    component : resolve => require(['@/views/scroll'], resolve), 
  },
];

export default pages