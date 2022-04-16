export function debounce(func,delay = 500) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    },delay)
  }
}

//正则表达式是干什么的？字符串匹配利器
export function formatDate(date, fmt) {
  //1.获取年份
  //y+
  //2019
  //yy - 19
  //yyyy - 2019
  //yyy - 019
  //y - 9
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
  };
   for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
   }
    return fmt;
 };

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
