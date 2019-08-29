// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.isLogin()){
      // 已经注册
      // 根据注册类型跳转至相关页面
    }else{
      // 未注册显示按钮
      this.setData({
        isShowBtn: true
      })
    }
  },

  isLogin(){
    let token = wx.getStorageSync("session") || null;
    if(token){
      return true;
    }else{
      return false;
    }
  },
  jumpToLawyer(){
    // 律师界面
    wx.setStorageSync("type", 2);
    // wx.switchTab({
    //   url: '/pages/lawyerIndex/lawyerIndex'
    // })
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  jumpToUser(){
    // 用户界面
    wx.setStorageSync("type", 1);
    // wx.switchTab({
    //   url: '/pages/index/index'
    // })
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})