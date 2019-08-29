// pages/focusLawyer/focusLawyer.js
import {info} from './module.js';
const http = new info();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    this.getFocusLawyerList();
  },
  jumpToinfo(e) {
    let index = e.currentTarget.dataset.id;
    let item = this.data.list[index];
    wx.navigateTo({
      url: '/pages/info/info?item=' + JSON.stringify(item),
    })
  },
  getFocusLawyerList(){
    let data ={
      pageNumber:1,
       pageSize: 999
    };
    http.getFocusLawyerList(data)
    .then(res => {
        this.setData({
          list: res.lawyerList
        })
    })
  },
  cancelFocus(e){
    let id = e.currentTarget.dataset.id;
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
            if(res.status == 9999){
              wx.showToast({
                title: '取消成功',
              })
              that.getFocusLawyerList();
            }else{
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