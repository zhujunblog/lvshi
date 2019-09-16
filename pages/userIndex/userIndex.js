// pages/index/index.js
import { isLogin } from '../../utils/utils.js';
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    elements: [
      { title: '问律师', name: '咨询已关注的律师', color: 'mauve', icon: 'vipcard' },
      { title: '看科普', name: '阅读科普文章', color: 'mauve', icon: 'formfill' }
    ],
  },
  methods: {
    jumpToList() {
      wx.navigateTo({
        url: '/pages/index/index?type=list',
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
  }
});