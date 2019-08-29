// pages/jumpToConsultingInfo/jumpToConsultingInfo.js
import { orderInfo } from './module.js';
const http = new orderInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    wxUser: {},         //当前用户信息
    orderInfo: {},       //订单信息
    orderComment: [],    //订单评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.orderInfo);
    console.log(info);
    this.setData({
      orderInfo: info
    })
    // this.getOrderInfo(options.orderId)
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
  jumpToUserIndex(){
    wx.reLaunch({
      url: '/pages/index/index?type=userIndex',
    })
  },
  jumpToOrderList(){
    wx.reLaunch({
      url: '/pages/index/index?type=usermy',
    })
  },
  /**
   * 拨打电话
   */
  callUser() {
    console.log(55)
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.advicePhone
    })
  },
  ViewImage(e) {
    console.log(e);
    let arr = e.currentTarget.dataset.imglist.split(',');
    wx.previewImage({
      urls: arr,
      current: e.currentTarget.dataset.url
    });
  },
})