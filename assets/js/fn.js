// import wx from 'weixin-js-sdk'

export const asyncHighlight = async () => {
  let Prism = await import("prismjs");
  await import("prismjs/components/prism-javascript");
  let pd = document.querySelectorAll(".highlight pre");
  pd.forEach(x => {
    Prism.highlightElement(x);
  });
};
export const replaceBr = str => {
  try {
    // 兼容br \n
    return str.replace(/[<]br[/]?[>]/gi, "<br/>\n");
  } catch (e) {
    return "";
  }
};

export default {
  createTime(milliseconds) {
    var time = new Date(milliseconds);
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = time.getDate();
    d = d < 10 ? "0" + d : d;
    var h = time.getHours();
    var minute = time.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var seconds = time.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return y + "-" + m + "-" + d + " " + h + ":" + minute;
  },
  getCommonTime(milliseconds) {
    var time = new Date(milliseconds);
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = time.getDate();
    d = d < 10 ? "0" + d : d;
    var h = time.getHours();
    var minute = time.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var seconds = time.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return y + "-" + m + "-" + d;
  },
  ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r === null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (
      d.getFullYear() == r[1] &&
      d.getMonth() + 1 == r[3] &&
      d.getDate() == r[4]
    ) {
      var Y = new Date().getFullYear();
      return Y - r[1];
    }
    return "输入的日期格式错误！";
  },
  getCommonTime1(milliseconds) {
    var time = new Date(milliseconds),
      time_ = new Date(),
      time1 = time.getTime(time), //发布时间
      time_1 = time_.getTime(time_), //现在时间
      jTime = time_1 - time1,
      days = jTime / 1000 / 60 / 60 / 24,
      daysRound = Math.floor(days),
      hours = jTime / 1000 / 60 / 60 - 24 * daysRound,
      hoursRound = Math.floor(hours),
      minutes = jTime / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound,
      minutesRound = Math.floor(minutes),
      seconds =
        jTime / 1000 -
        24 * 60 * 60 * daysRound -
        60 * 60 * hoursRound -
        60 * minutesRound,
      secondsRound = Math.floor(seconds);
    if (jTime < 0) {
      return "刚刚";
    } else {
      if (daysRound > 0) {
        return this.getCommonTime(milliseconds);
      } else {
        if (hoursRound > 0) {
          return hoursRound + "小时前";
        } else {
          if (minutesRound > 10) {
            return minutesRound + "分钟前";
          } else {
            if (secondsRound > 0) {
              return "刚刚";
            }
          }
        }
      }
    }
  },
  getTime(tt) {
    let t = tt;
    if (t) {
      var time = t.split("+")[0];
      time = time.replace("T", " ");
      return time;
    } else {
      return t;
    }
  },
  //转换音频时长显示
  transTime(time) {
    var duration = parseInt(time);
    var minute = parseInt(duration / 60);
    var sec = (duration % 60) + "";
    var isM0 = ":";
    if (minute == 0) {
      minute = "00";
    } else if (minute < 10) {
      minute = "0" + minute;
    }
    if (sec.length == 1) {
      sec = "0" + sec;
    }
    return minute + isM0 + sec;
  },
  getParam(paramName) {
    var paramValue = "";
    var isFound = false;
    if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
      var arrSource = unescape(location.search)
        .substring(1, location.search.length)
        .split("&");
      var i = 0;
      while (i < arrSource.length && !isFound) {
        if (arrSource[i].indexOf("=") > 0) {
          if (
            arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()
          ) {
            paramValue = arrSource[i].split("=")[1];
            isFound = true;
          }
        }
        i++;
      }
    }
    return paramValue;
  },
  getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  // 获取cookie通过name
  getCookiebyName(cookie, name) {
    var pair = cookie.match(new RegExp(name + "=([^;]+)"));
    return !!pair ? pair[1] : null;
  },
  // 回到顶部
  backtotop(topValue) {
    // topValue 介质
    var timer = setInterval(() => {
      let h = document.documentElement.scrollTop || document.body.scrollTop;
      let nowH = h;
      var speed = (0 - nowH) / 5; // 随着高度减速
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (h <= topValue) {
        //当前小于等于介质时,停止这次计时器
        clearInterval(timer); // C1
      }
      document.documentElement.scrollTop = h + speed;
      document.body.scrollTop = h + speed;
    }, 30);
  }
};
