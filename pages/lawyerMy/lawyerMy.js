// pages/my/my.js
import { isLogin } from '../../utils/utils.js';
import { lawyerMy} from './module.js';
const http = new lawyerMy();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    realName: null,
    userType: null,
    lawyerBalance: null,
    imgSrc: null,
  },
  created() {
    this.setInfo();
  },
  pageLifetimes: {
    show: function () {
      this.setInfo();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    setInfo(){
      let userInfo = wx.getStorageSync("userInfo") || null;
      console.log(userInfo);
      if (userInfo) {
        this.setData({
          realName: userInfo.realName,
          userType: userInfo.userType,
          lawyerBalance: userInfo.lawyerBalance / 100,
          imgSrc: userInfo.headImage,
        })
      }

      this.setData({
       
        lawyerBalance: 99,

      })
    },
    jumpToLawyerInfo() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/lawyerInfo/lawyerInfo',
      })
    },
    jumpToLaywerOrder() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/lawyerOrder/lawyerOrder',
      })
    },
    jumpToCertification() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/certification/certification',
      })
    },
  }
})