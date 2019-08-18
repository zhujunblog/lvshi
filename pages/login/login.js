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
  login(){

  },
  getUserInfo(){

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})