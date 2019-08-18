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
      iconPath: "/image/icon_component.png",
      hide: type,
      selectedIconPath: "/image/icon_component_HL.png",
      text: "组件"
    }, {
        pagePath: "/pages/list/list",
      iconPath: "/image/icon_API.png",
      hide: type,
      selectedIconPath: "/image/icon_API_HL.png",
      text: "接口"
    },
    {
      pagePath: "/pages/lawyerIndex/lawyerIndex",
      iconPath: "/image/icon_API.png",
      hide: !type,
      selectedIconPath: "/image/icon_API_HL.png",
      text: "接口"
    }
    ]
  },
  attached() {
     type = wx.getStorageSync("type") == 1 ? true : false;
     index = wx.getStorageSync("type") == 1 ? 0 : 2;
    this.setData({
      list: [{
        pagePath: "/pages/index/index",
        iconPath: "/image/icon_component.png",
        hide: type,
        selectedIconPath: "/image/icon_component_HL.png",
        text: "组件"
      }, {
          pagePath: "/pages/list/list",
        iconPath: "/image/icon_API.png",
        hide: type,
        selectedIconPath: "/image/icon_API_HL.png",
        text: "接口"
      },
      {
        pagePath: "/pages/lawyerIndex/lawyerIndex",
        iconPath: "/image/icon_API.png",
        hide: !type,
        selectedIconPath: "/image/icon_API_HL.png",
        text: "接口"
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