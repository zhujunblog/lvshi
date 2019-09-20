// pages/my/my.js
import { isLogin, login} from '../../utils/utils.js';
import { lawyerMy} from './module.js';
const http = new lawyerMy();
var app = getApp();
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
    phoneStatus: null
  },
  // created() {
    
  // },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setInfo();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
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
      login(() => {
        let userInfo = app.globalData.user || null;
        console.log(userInfo);
        if (userInfo) {
          this.setData({
            realName: userInfo.realName,
            userType: userInfo.userType,
            lawyerBalance: userInfo.lawyerBalance / 100,
            imgSrc: userInfo.headImage,
            phoneStatus: userInfo.phoneStatus
          })
        }
      });
      

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
    fPhoneStatus(){
      if (!isLogin()) {
        return false;
      }

      let data = {
        phoneStatus: 0
      }
      http.getList(data)
        .then((res) => {
          wx.showToast({
            title: '关闭电话成功',
          })
          // this.updateStroge();
          login(() => {
            let userInfo = app.globalData.user || null;
            console.log(userInfo);
            if (userInfo) {
              this.setData({
                realName: userInfo.realName,
                userType: userInfo.userType,
                lawyerBalance: userInfo.lawyerBalance / 100,
                imgSrc: userInfo.headImage,
                phoneStatus: userInfo.phoneStatus
              })
            }
          });
        })
    },
    sPhoneStatus(){
      if (!isLogin()) {
        return false;
      }
      
      let data = {
        phoneStatus: 1
      }
      http.getList(data)
        .then((res) => {
          wx.showToast({
            title: '开启电话成功',
          })
          // this.updateStroge();
          login(() => {
            let userInfo = app.globalData.user || null;
            console.log(userInfo);
            if (userInfo) {
              this.setData({
                realName: userInfo.realName,
                userType: userInfo.userType,
                lawyerBalance: userInfo.lawyerBalance / 100,
                imgSrc: userInfo.headImage,
                phoneStatus: userInfo.phoneStatus
              })
            }
          });
        })
    }
  }
})