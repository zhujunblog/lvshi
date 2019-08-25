const app = getApp()
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
        name: '房屋租聘'
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
    load: true
  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    this.setData({
      listCur: this.data.list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
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
  jumpToinfo(){
    wx.navigateTo({
      url: '/pages/info/info',
    })
  }
})