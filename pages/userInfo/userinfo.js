// pages/lawyerInfo/lawyerInfo.js
import { userInfo} from './module.js';
import { config } from '../../utils/config.js';
const http = new userInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImage: null,
    telephone: null,
    realName: null,
    imgList: [],
    imgSrc: null,
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
    let userInfo = wx.getStorageSync("userInfo") || null;
    if (userInfo) {
      this.setData({
        realName: userInfo.realName,
        telephone: userInfo.telephone,
        imgSrc: userInfo.headImage,
      })
    }
  },
  
  /**
  * 上传图片
  */
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          imgSrc: null,
          imgList: res.tempFilePaths
        })

        // if (this.data.imgList.length != 0) {
        //   this.setData({
        //     imgList: this.data.imgList.concat(res.tempFilePaths)
        //   })
        // } else {
        //   this.setData({
        //     imgList: res.tempFilePaths
        //   })
        // }

      }
    });
  },
  /**
   * 上传图片到服务器
   */
  uploadImgHttp(fn) {
    let _that = this;
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    wx.uploadFile({
      url: config.api_base_url + '/user/uploadOss', // 仅为示例，非真实的接口地址
      filePath: _that.data.imgList[0],
      name: 'file',
      success(res) {
        const data = JSON.parse(res.data)
        console.log(data);
        _that.setData({
          headImage: "https://" + data.url
        })
        wx.hideLoading();
        fn && fn();
      }
    });
  },
  /**
   * 获取名字
   */
  gettelephone(e){
    this.setData({
      telephone: e.detail.value
    })
  },
  getrealName(e) {
    this.setData({
      realName: e.detail.value
    })
  },
  /**
   * 提交用户信息
   */
  submit() {
    if (!this.isValue()) {
      return false;
    }

    //  上传图片

    if (this.data.imgList.length == 0) {
     
      let data = {
        realName: this.data.realName,
        telephone: this.data.telephone,
        headImage: this.data.imgSrc
      }
      http.getList(data)
        .then((res) => {
          wx.showToast({
            title: '保存成功',
          })
          this.updateStroge();
        })
    } else {
      this.uploadImgHttp(() => {
        let data = {
          realName: this.data.realName,
          telephone: this.data.telephone,
          headImage: this.data.headImage,
        }
        console.log(data);
        http.getList(data)
          .then((res) => {
            wx.showToast({
              title: '保存成功',
            })
            this.updateStroge();
          })

      });
    }

  },
  /**
   * 更新缓存
   */
  updateStroge(){
    let userInfo = wx.getStorageSync("userInfo") || null;
    userInfo.realName = this.data.realName;
    userInfo.telephone = this.data.telephone;
    userInfo.headImage = this.data.imgList.length == 0 ? this.data.imgSrc : this.data.headImage;
    wx.setStorageSync("userInfo", userInfo);
  },
  /**
   * 判断信息是否填写完成
   */
  isValue() {
    if (!this.data.realName) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.telephone) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return false;
    }

    return true;
  }
})