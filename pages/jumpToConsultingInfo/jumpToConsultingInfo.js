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
    checkbox: [],       // 标签
    score: 0,           // 评分
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
    this.getAppraiseList();
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
   * 获取评价标签
   */
  getAppraiseList(){
    let data = {
      pageNumber: 1,
      pageSize: 999
    }
    http.getAppraiseList(data)
    .then(res => {
      if(res.status == 9999){
        let list = res.list;
        for(let i = 0; i < list.length; i++){
          list[i].checked = false;
        }
        this.setData({
          checkbox: list
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    wx.showModal({
      title: '提示',
      content: '是否放弃评价？',
      cancelText: '狠心放弃',
      confirmText: '重新评价',
      success(res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          wx.showToast({
            title: '不好意思，评价失败！',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      }
    })
  },
  hideModalSuccess(){
    if (this.data.score <= 0){
      wx.showToast({
        title: '请选择评分',
        icon: 'none'
      })
      return false;
    }
    let list = this.data.checkbox;
    let arr = [];
    for(let i = 0; i < list.length; i++){
      if(list[i].checked){
        arr.push(list[i].id);
      }
    }

    if(arr.length > 0){
      this.appraiseOrder(arr.join());
    }else{
      wx.showToast({
        title: '请选择标签',
        icon: 'none'
      })
    }
  },
  clickFavor(e){
   this.setData({
     score: e.currentTarget.dataset.id
   })
  },
  /**
   * 提交评价
   */
  appraiseOrder(ids){
   wx.showLoading({
     title: '正在提交数据',
   })
   let data = {
     orderId: this.data.orderId,
     orderLabel: ids,
     orderScore: this.data.score,
   };
   http.appraiseOrder(data)
   .then(res => {
     wx.hideLoading();
     if(res.status == 9999)
     {
       wx.showToast({
         title: '评价成功',
       })
       // 返回页面
       setTimeout(() => {
         wx.navigateBack()
       }, 1000)
     }else{
       wx.showToast({
         title: '不好意思，评价失败！',
         icon: 'none'
       })
       setTimeout(() => {
         wx.navigateBack()
       }, 1000)
     }
     
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
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

                  // 判断用户类型 律师 返回订单列表 用户弹出是否评价律师
                  if (that.wxUser.userType == 1){
                    wx.showModal({
                      title: '提示',
                      content: '咨询结束，去给律师评价一下',
                      cancelText: '残忍拒绝',
                      confirmText: '去评价',
                      success(res) {
                        if (res.confirm) {
                          that.setData({
                            modalName: 'ChooseModal'
                          })
                        } else if (res.cancel) {
                          setTimeout(() => {
                            wx.navigateBack()
                          }, 1000)
                        }
                      }
                    })
                  }else{
                    // 返回订单列表
                    setTimeout(() => {
                      wx.navigateBack()
                    }, 1000)
                  }
                  
                  
                }
            })
        }
      }
    })

    
  }
})