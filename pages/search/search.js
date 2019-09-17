// pages/search/search.js
import {list} from '../list/module.js';
const app = getApp();
const http = new list();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawyerList: [],
    searchValue: ''
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

  },
  /**
   * 搜索函数
   */
  searchFn(){
    let value = this.data.searchValue;
    if (value.length == 0) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    } else {
      // 执行搜索操作
      this.getLawyerList();
    }
  },
  /**
   * 搜索api
   */
  getLawyerList() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let data = {
      pageNumber: 1,
      pageSize: 99999,
      userName: this.data.searchValue,
    };
    // 判断是否登录
    let token = wx.getStorageSync("session") || null;
    if (token) {
      http.getList(data)
        .then(res => {
          console.log(res);
          if (res.status == 9999) {
            // 查询成功
            let list = res.list;
            this.setData({
              lawyerList: list
            })

            wx.hideLoading();
          }
        })
    } else {
      http.getUserList(data)
        .then(res => {
          console.log(res);
          if (res.status == 9999) {
            // 查询成功
            let list = res.list;
            this.setData({
              lawyerList: list
            })

            wx.hideLoading();
          }
        })
    }

  },
  jumpToinfo(e) {
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = this.data.lawyerList[index];

    wx.navigateTo({
      url: '/pages/info/info?item=' + JSON.stringify(item),
    })
  },
  /**
   * 获取输入框的值
   */
  getSearchValue(e){
    let value = e.detail.value;
    this.setData({
      searchValue: value
    })
  }
})