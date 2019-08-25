// pages/my/my.js
import { isLogin } from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  jumpTouserInfo(){
    if(!isLogin()){
     return false;
    }
    wx.navigateTo({
      url: '/pages/userInfo/userinfo',
    })
  },
  jumpTofocusLawyer(){
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/focusLawyer/focusLawyer',
    })
  },
  jumpToUserOrder() {
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/userOrder/userOrder',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})