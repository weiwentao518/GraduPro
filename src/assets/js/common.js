 /* 组件时间格式转换 */
var temptime=function(temptime){
    var gettype=Object.prototype.toString;
    if (temptime != '' && (gettype.call(temptime) == '[object Date]')) {
        temptime = temptime.getFullYear() + '-' + (temptime.getMonth() + 1) + '-' + temptime.getDate();
    }
    return temptime;
}
/* 时间戳转换函数 */
var getDataYear = function(format, timestamp) {
  console.log(timestamp==0 )
  if(timestamp == null||timestamp == undefined||timestamp == 0){
    return ''
  }
    var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
    var FORMAT = new Object();
    FORMAT = {
        'Y': "date.getFullYear()",
        'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
        'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
        'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
        'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
        's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
    }
    for (var i in FORMAT) {
      if (format.indexOf(i) != -1) {
        format = format.replace(i, eval(FORMAT[i]));
    }
  }
  return format;
}
//设置cookie
var setcookie=function(name,value){//设置cookie的值
  name="token";
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookie
var getcookie=function(name){//获取cookie的值
  name="token";
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  } else{
    return null;
  }
}
var delatecookie=function(){//清空cookie
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
  if (keys) { 
    for (var i = keys.length; i--;) {
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
    }  
  }
}
/* ajax请求 */
var ajax = function(that, url, params, success, method) {
  var token = sessionStorage.getItem('token');
  var uid=sessionStorage.getItem("userid");
  if(method=='GET'){
    that.axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type':'application/x-www-form-urlencoded;',
      },
     params:params,
    }).then((response) => {
      success(response.data); 
    }).catch(function(response){
      console.log(response);
    })
  }else{
    // params=that.querystring.stringify(params);
    that.axios({
      method: "POST",
      url: url,
      headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type':'application/json',
      },
     data:params,
    }).then((response) => {
      success(response.data);
    }).catch(function(response){
      console.log(response);
    })
  }
}

export{
  temptime,
  getDataYear,
  ajax,
  delatecookie,
  getcookie,
  setcookie,
}