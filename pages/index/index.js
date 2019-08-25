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
    elements: [
      { title: '问律师', name: '咨询已关注的律师', color: 'mauve', icon: 'vipcard' },
      { title: '看科普', name: '阅读科普文章', color: 'mauve', icon: 'formfill' }
    ],
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
        selected: 0
      })
    }
  },
  jumpToList(){
    // console.log(isLogin);
    wx.switchTab({
      url: '/pages/list/list',
    })

    // if(isLogin()){
      
    // }else{

    // }
  },
  jumpTofocusLawyer() {
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/focusLawyer/focusLawyer',
    })
  },
  onShareAppMessage: function () {

  }
})