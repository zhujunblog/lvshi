/**
 * 判断是否登陆注册
 */
var app = getApp();

const isLogin = () => {
  let token = wx.getStorageSync("session") || null;
  console.log(token);
  if (token) {
    // 已经授权
    return true;
  } else {
    // 未授权
    wx.showModal({
      title: '提示',
      content: '你还未授权，部分功能不能使用，请前往授权！',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/login/login"
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '很遗憾，你无法使用此功能',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    return false;
  }
}

const login = (fn) => {
  wx.login({
    success: res => {
      let code = res.code;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo;
                wx.request({
                  url: 'http://47.100.218.208:8080/lawyer/wxuser/onLogin',
                  data: {
                    code: code,
                    headImage: res.userInfo.avatarUrl,
                    username: res.userInfo.nickName,
                    userType: wx.getStorageSync("userType") || 1
                  },
                  header: {
                    "content-type": 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: (res) => {
                    console.log(res);
                    let type = res.data.user.userType;
                    wx.setStorageSync("session", res.data.token);
                    wx.setStorageSync("userType", type);
                    wx.setStorageSync("userInfo", res.data.user);
                    app.globalData.user = res.data.user;
                    fn && fn();
                  }
                })

              }
            })
          }
          else {
            // 请打开授权
          }
        }
      })
    }
  })
}
module.exports= {
  isLogin: isLogin,
  login: login
}