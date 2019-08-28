// pages/lawyerIndex/lawyerIndex.js
import { isLogin } from '../../utils/utils.js';
import { order } from './module.js';
const http = new order();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    list: [],
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
        selected: 3
      })
    }

    this.getOrderList(1);
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getOrderList(e.currentTarget.dataset.id);
  },
  jumpToConsultingInfo(e) {
    let orderId = e.currentTarget.dataset.orderid;
    if (!isLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/jumpToConsultingInfo/jumpToConsultingInfo?orderId=' + orderId,
    })
  },
  getOrderList(orderStatus) {
    // 判断是否登录
    if(!isLogin()){
      return false;
    }
    wx.showLoading({
      title: '正在获取数据',
    })
    let data = {
      pageNumber: 1,
      pageSize: 9999,
      orderStatus: orderStatus
    };
    http.getOrder(data)
      .then(res => {
        console.log(res);
        if (res.status == 9999) {
          this.setData({
            list: res.list
          })
        }
        wx.hideLoading()
      })
  }
})