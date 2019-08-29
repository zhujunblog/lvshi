// pages/lawyerIndex/lawyerIndex.js
import { isLogin } from '../../utils/utils.js';
import { order } from './module.js';
const http = new order();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    TabCur: 1,
    list: [],
  },
  created(){
    // this.setData({
    //   TabCur: 1,
    // })
    // this.getOrderList(1);
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        TabCur: 1,
      })
      this.getOrderList(1);
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods:{
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
      // if(!isLogin()){
      //   return false;
      // }
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
  }
})