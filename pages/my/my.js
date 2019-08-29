// pages/my/my.js
import { isLogin } from '../../utils/utils.js';
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  created(){

  },
  methods: {
    jumpTouserInfo() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/userInfo/userinfo',
      })
    },
    jumpTofocusLawyer() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/focusLawyer/focusLawyer',
      })
    },
    jumpToUserOrder() {
      if (!isLogin()) {
        return false;
      }
      wx.navigateTo({
        url: '/pages/userOrder/userOrder',
      })
    },
  }
})