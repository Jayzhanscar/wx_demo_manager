var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

// 规范时间
export function formatDate (date, fmt) {
       var date = new Date(date)
       if (/(y+)/.test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
           }
       let o = {
             'M+': date.getMonth() + 1,
             'd+': date.getDate(),
             'h+': date.getHours(),
             'm+': date.getMinutes(),
             's+': date.getSeconds()
       }
       for (let k in o) {
             if (new RegExp(`(${k})`).test(fmt)) {
                   let str = o[k] + ''
                   fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
                 }
           }
       return fmt
     }

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}
