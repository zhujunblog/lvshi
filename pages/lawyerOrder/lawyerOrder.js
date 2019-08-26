// pages/lawyerIndex/lawyerIndex.js
import { isLogin } from '../../utils/utils.js';
import {order}  from './module.js';
const http = new order();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
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
    this.getOrderList();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  jumpToConsultingInfo() {
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/jumpToConsultingInfo/jumpToConsultingInfo',
    })
  },
  getOrderList(){
    let data = {
      pageNumber: 1,
      pageSize: 9999
    };
    http.getOrder(data)
    .then(res => {
      console.log(res);
    })
  }
})