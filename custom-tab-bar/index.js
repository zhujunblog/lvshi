let type = wx.getStorageSync("type") == 1 ? true : false;
let index = wx.getStorageSync("type") == 1 ? 0 : 2;
console.log(index);
Component({
  data: {
    selected:0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/index.png",
      hide: type,
      selectedIconPath: "/image/index_cur.png",
      text: "首页"
    }, {
        pagePath: "/pages/list/list",
      iconPath: "/image/list.png",
      hide: type,
      selectedIconPath: "/image/list_cur.png",
      text: "分类"
    },
      {
        pagePath: "/pages/my/my",
        iconPath: "/image/my.png",
        hide: type,
        selectedIconPath: "/image/my_cur.png",
        text: "我的"
      },
    {
      pagePath: "/pages/lawyerIndex/lawyerIndex",
      iconPath: "/image/index.png",
      hide: !type,
      selectedIconPath: "/image/index_cur.png",
      text: "首页"
    },
      {
        pagePath: "/pages/lawyerMy/lawyerMy",
        iconPath: "/image/my.png",
        hide: !type,
        selectedIconPath: "/image/my_cur.png",
        text: "我的"
      }
    ]
  },
  attached() {
     type = wx.getStorageSync("type") == 1 ? true : false;
     index = wx.getStorageSync("type") == 1 ? 0 : 2;
    this.setData({
      list: [{
        pagePath: "/pages/index/index",
        iconPath: "/image/index.png",
        hide: type,
        selectedIconPath: "/image/index_cur.png",
        text: "首页"
      }, {
          pagePath: "/pages/list/list",
        iconPath: "/image/list.png",
        hide: type,
        selectedIconPath: "/image/list_cur.png",
        text: "分类"
      },
        {
          pagePath: "/pages/my/my",
          iconPath: "/image/my.png",
          hide: type,
          selectedIconPath: "/image/my_cur.png",
          text: "我的"
        },
      {
        pagePath: "/pages/lawyerIndex/lawyerIndex",
        iconPath: "/image/index.png",
        hide: !type,
        selectedIconPath: "/image/index_cur.png",
        text: "首页"
      },
        {
          pagePath: "/pages/lawyerMy/lawyerMy",
          iconPath: "/image/my.png",
          hide: !type,
          selectedIconPath: "/image/my_cur.png",
          text: "我的"
        }
      ]
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})