// pages/index/index.js
import {isLogin} from '../../utils/utils.js';

Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    PageCur: '',
    type: true,         // true 用户  false 律师
  },
  
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = wx.getStorageSync("type") == 1 ? true : false;  // true 用户  false 律师
    let PageCur = type ? 'userIndex' :'lawyerIndex';
    this.setData({
      type: type,
      PageCur: PageCur
    })
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
    // let type = wx.getStorageSync("type") == 1 ? true : false;  // true 用户  false 律师
    // let PageCur = type ? 'userIndex' : 'lawyerIndex';
    // this.setData({
    //   type: type,
    //   PageCur: PageCur
    // })
  },
  onShareAppMessage: function () {

  }
})