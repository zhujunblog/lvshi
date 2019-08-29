// pages/jumpToConsultingInfo/jumpToConsultingInfo.js
import { orderInfo} from './module.js';
const http = new orderInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   orderId:'',
    wxUser: {},         //当前用户信息
   orderInfo: {},       //订单信息
   orderComment: [],    //订单评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       orderId: options.orderId
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
    this.getOrderInfo(this.data.orderId);
  },
  jumpTolaywerAnswer(){
    wx.navigateTo({
      url: '/pages/laywerAnswer/laywerAnswer?orderId=' + this.data.orderId,
    })
  },
  /**
   * 拨打电话
   */
  callUser(){
    console.log(55)
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.advicePhone 
    })
  },
  /**
   * 获取订单详情
   */
  getOrderInfo(id){
    let data = {
      pageNumber: 1,
      pageSize: 999,
      orderId: id 
    }
    http.getOrderInfo(data)
    .then(res => {
      console.log(res);
      this.setData({
        orderComment: res.list.reverse(),
        orderInfo: res.wxOrder,
        wxUser: res.wxUser
      })
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
  success(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定完成订单？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          let data = {
            orderId: that.data.orderId
          }
          http.checkOrder(data)
            .then(res => {
                if(res.status == 9999){
                  wx.showToast({
                    title: '操作成功',
                  })
                  // 返回订单列表
                  setTimeout(()=>{
                    wx.navigateBack()
                  },1000)
                  
                }
            })
        }
      }
    })

    
  }
})