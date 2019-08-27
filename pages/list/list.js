import {list} from './module.js';
const app = getApp();
const http = new list();
Page({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '房屋买卖'
      },
      {
        id:2,
        name: '房屋租赁'
      },
      {
        id: 3,
        name: '婚姻',
      },
      {
        id: 4,
        name: '继承',
      },
      {
        id: 5,
        name: '合同'
      },
      {
        id: 6,
        name: '劳动合同'
      },
      {
        id: 7,
        name: '知识产权'
      },
      {
        id: 8,
        name: '债权'
      },
      {
        id: 9,
        name: '交通肇事'
      }
    ],
    lawyerList: [

    ],
    title: '全部',
    load: true
  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    };

    this.getLawyerList();
  },
  onLoad() {
   

    this.setData({
      listCur: this.data.list[0]
    })
  },
  onReady() {
    
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      title: this.data.list[e.currentTarget.dataset.id].name
      // MainCur: e.currentTarget.dataset.id,
      // VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    });
    this.getLawyerList();
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  jumpToinfo(e){
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = this.data.lawyerList[index];

    wx.navigateTo({
      url: '/pages/info/info?item=' + JSON.stringify(item),
    })
  },
  /**
   * 获取律师列表
   */
  getLawyerList(){
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let data = {
      pageNumber: 1,
      pageSize: 99999,
      userLabel: this.data.title,
    };
    if (this.data.title == '全部'){
      data = {
        pageNumber: 1,
        pageSize: 99999,
      };
    }
    http.getList(data)
    .then(res => {
       console.log(res);
       if(res.status == 9999){
         // 查询成功
         let list = res.list;
         this.setData({
           lawyerList: list
         })

         wx.hideLoading();
       }
    })
  }
})