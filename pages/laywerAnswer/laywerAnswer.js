// pages/laywerAnswer/laywerAnswer.js
import { config } from '../../utils/config.js';
import { answer } from './module.js';
const http = new answer();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autofocus: false,
    imgList: [],
    uploadUrl: [],
    content: null,
    orderId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       orderId: options.orderId
     })
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
  autofocusFn(){
    this.setData({
      autofocus: true
    })
  },
  /**
  * 上传图片
  */
  ChooseImage() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        let arr = [];
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let url = res.tempFilePaths[i];
          arr.push({
            status: 0,
            url: url
          })
        }
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(arr)
          })
        } else {
          this.setData({
            imgList: arr
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此照片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
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
    let arr = [];
    for (let i = 0; i < _that.data.imgList.length; i++) {
      wx.uploadFile({
        url: config.api_base_url + '/user/uploadOss', // 仅为示例，非真实的接口地址
        filePath: _that.data.imgList[i].url,
        name: 'file',
        success(res) {
          const data = JSON.parse(res.data)
          let url = _that.data.uploadUrl;
          url.push(data.url);
          _that.data.imgList[i].status = 1;
          _that.setData({
            uploadUrl: url
          })
          // wx.hideLoading();
          fn && fn();
        },
        fail(err) {
          _that.data.imgList[i].status = 2;
        }
      });
    }
  },
  getContent(e){
    this.setData({
      content: e.detail.value
    })
  },
  submit(){
    if (!this.isValue()){
      return false;
    }

    let timer = null;
    let that = this;
    if (this.data.imgList.length > 0) {
      this.uploadImgHttp();
      let imgList = this.data.imgList;
      timer = setInterval(() => {
        let status = true;
        let err = false;
        let arr = [];
        for (let i = 0; i < imgList.length; i++) {
          if (imgList[i].status == 0) {
            status = false;
            break;
          }

          if (imgList[i].status == 2) {
            // 失败
            arr.push(imgList[i]);
            err = true;
          }
        }
        if (status && err) {
          // 执行完成并且有上传失败的文件
          wx.hideLoading();
          clearInterval(timer);
          that.setData({
            imgList: arr
          })
          wx.showModal({
            title: '提示',
            content: '部分图片上传失败，是否重新上传失败图片？',
            cancelText: '直接提交',
            confirmText: '重新上传',
            success: res => {
              if (res.confirm) {
                that.submit();
              } else {
                // 提交数据
                that.submitFn(true);
              }
            }
          })
        }
        if (status) {
          clearInterval(timer);
          // 提交数据
          wx.hideLoading();
          that.submitFn(true);
        }
      }, 300)
    } else {
      // 不上传
      this.submitFn(false)
    }
  },
  /**
   * 提交数据
   */
  submitFn(upload) {
    wx.showLoading({
      title: '正在提交数据',
    })
    let data = {
      orderId: this.data.orderId,
      content: this.data.content,
    }
    if (upload) {
      data = {
        orderId: this.data.orderId,
        content: this.data.content,
        answerImage: this.data.uploadUrl.join()
      }
    }
    http.operationOrder(data)
      .then(res => {
        console.log(res);
        wx.hideLoading();

      })
  },
  /**
  * 检查
  */
  isValue() {
    if (!this.data.content) {
      wx.showToast({
        title: '请输入描述',
        icon: 'none'
      })
      return false;
    }
    return true;
  }
})