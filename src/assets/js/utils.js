//获取url后面的参数 直接从href字段上去匹配
const getUrlParam = name => {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(window.location.href)) {
    return unescape(RegExp.$2.replace(/\+/g, " "))
  } else {
    return null;
  }
}

//检测-ios终端
const isIOS = () => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

//检测-android终端
const isAndroid = () => {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

export {
  getUrlParam,
  isIOS,
  isAndroid,
}