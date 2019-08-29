// pages/info/info.js
import { info } from './module.js';
import { isLogin } from '../../utils/utils.js';
const http = new info();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    userLabel: [],
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log();
    let info = JSON.parse(options.item);
    this.setData({
      info: info,
      userLabel: info.userLabel.split(','),
      focus: info.ifFocus == 1 ? true : false
    })
    this.getlaywer(info.id);
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
    
  },
  jumpToconsultingPhoto(){
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/consulting/consulting?lawyer=' + JSON.stringify(this.data.info) + '&type=' + 1 + '&money=' + this.data.info.photoPrice,
    })
  },
  jumpToconsultingLawyer(){
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/consulting/consulting?lawyer=' + JSON.stringify(this.data.info) + '&type=' + 2 + '&money=' + this.data.info.lawyerPrice,
    })
  },
  /**
   * 获取律师信息
   */
  getlaywer(id){
    let data = {
      id: id
    }
    http.getInfo(data)
      .then(res => {

      })
  },
  focusLawyer(){
    if (!isLogin()){
      return false;
    }
    let data = {
      id: this.data.info.id,
      type: 1
    }
    http.focusLawyer(data)
    .then(res => {
        if(res.status == 9999){
          wx.showToast({
            title: '关注成功',
          })
          this.setData({
            focus: true
          })
        }else{
          wx.showToast({
            title: '关注失败',
            icon: 'none'
          })
        }
    })
  },
  /**
   * 取消关注
   */
  cancelFocus() {
    let id = this.data.info.id;
    let data = {
      id: id,
      type: 2
    }
    let that = this;

    wx.showModal({
      title: '提示',
      content: '确定要取消关注此律师？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {

        if (res.confirm) {
          http.focusLawyer(data)
            .then(res => {
              if (res.status == 9999) {
                wx.showToast({
                  title: '取消成功',
                })
                that.setData({
                  focus: false
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                  icon: 'none'
                })
              }
            })
        }
      }
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