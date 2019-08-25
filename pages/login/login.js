// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  login(data,fn){
    wx.showLoading({
      title: '正在授权',
    })
    wx.login({
      success: res => {
        let code  = res.code;
        let params = {
          code: code,
          headImage: data.avatarUrl,
          username: data.nickName,
          userType: wx.getStorageSync("type") || 1
        }
        fn && fn(params);
      }
    })
  },
  getUserInfo(e){
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userInfo = e.detail.userInfo;
      this.login(userInfo,(res) => {
        this.resqusetHttp(res);
      })
    }else{
      // 获取失败
      wx.showModal({
        title: '授权失败',
        content: '授权失败，主要功能将无法使用，是否重新授权？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 用户点击确定留在当前页
          } else if (res.cancel) {
            console.log('用户点击取消');
            // 返回主界面
          }
        }
      })
    }
  },
  resqusetHttp(params){
    wx.request({
      url: 'http://118.31.64.51:8081/lawyer/wxuser/onLogin',
      data: params,
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: (res) => {
        console.log(res);
        // 保存session
        let data = res.data;
        if(data.status = 9999){
          // 授权成功
          wx.setStorageSync("session", data.token);
          wx.setStorageSync("userType", wx.getStorageSync("type") || 1);
          wx.hideLoading();
          wx.navigateBack();
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})