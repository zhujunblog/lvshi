// pages/lawyerInfo/lawyerInfo.js
import { lawyerInfo} from './module.js';
import { config } from '../../utils/config.js';
console.log(config);
const http = new lawyerInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkbox: [{
      value: 1,
      name: '房屋买卖',
      checked: false,
    }, {
      value: 2,
      name: '房屋租赁',
      checked: false,
    }, {
      value: 3,
      name: '婚姻',
      checked: false,
    }, {
      value: 4,
      name: '继承',
      checked: false,
    }, {
      value: 5,
      name: '合同',
      checked: false,
    }, {
      value: 6,
      name: '劳动合同',
      checked: false,
      }, {
        value: 7,
        name: '知识产权',
        checked: false,
      }, {
        value: 8,
        name: '债权',
        checked: false,
      }, {
        value: 9,
        name: '交通肇事',
        checked: false,
      }],

    picker: ['男','女'],
    keyword: '',
    keywords: [],
    region: [],
    realName: null,
    userAddress: null,
    
    headImage: null,
    telephone: null,
    selfData: null,
    goodAt: null,
    workExperience: null,
    imgList: [],
    lab: [],
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

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
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
  uploadImgHttp(fn){
    let _that = this;
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    wx.uploadFile({
      url: config.api_base_url +'/user/uploadOss', // 仅为示例，非真实的接口地址
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
   * 获取关键字
   */
  getkeyword(e){
    console.log(e.detail.value);
    this.setData({
      keyword: e.detail.value
    })
  },
  addKeyword(){
   let value  = this.data.keyword;
   let keywords = this.data.keywords;
   if(!value){
     wx.showToast({
       title: '请输入关键字',
       icon: 'none',
     })
     return false;
   }
   keywords.push(value);
   this.setData({
     keywords: keywords,
     keyword: '',
   })
  },
  delectKeyword(e){
    let index = e.target.dataset.index;
    let keywords = this.data.keywords;
    keywords.splice(index,1);
    this.setData({
      keywords: keywords,
    })
  },
  /**
   * 获取姓名
   */
  getrealName(e){
    this.setData({
      realName: e.detail.value
    })
  },
  /**
   * 获取地址
   */
  getuserAddress(e){
    let data = e.detail.value;
    this.setData({
      region: data,
      userAddress: data[0]+data[1]+data[2]
    })
  },
  /**
   * 获取电话
   */
  gettelephone(e){
    this.setData({
      telephone: e.detail.value
    })
  },
  /**
   * 获取简介
   */
  getselfData(e){
    
    this.setData({
      selfData: e.detail.value
    })
  },
  /**
   * 获取擅长
   */
  getgoodAt(e){
    
    this.setData({
      goodAt: e.detail.value
    })
  },
  /**
   * 获取工作经历
   */
  getworkExperience(e){
    
    this.setData({
      workExperience: e.detail.value
    })
  },
  /**
   * 提交用户信息
   */
  submit(){
    // if (!this.isValue()){
    //   return false;
    // }

    //  上传图片

    if (this.data.imgList.length == 0) {
      let userLabel = this.data.lab;
      userLabel.push(...this.data.keywords);
      let data = {
        realName: this.data.realName,
        telephone: this.data.telephone,
        userAddress: this.data.userAddress,
        headImage: this.data.headImage,
        userLabel: userLabel.join(),
        selfData: this.data.selfData,
        goodAt: this.data.goodAt,
        workExperience: this.data.workExperience
      }
      http.getList(data)
        .then((res) => {
          wx.showToast({
            title: '保存成功',
          })
        })
    }else{
      this.uploadImgHttp(() => {

        let userLabel = this.data.lab;
        userLabel.push(...this.data.keywords);
        let data = {
          realName: this.data.realName,
          telephone: this.data.telephone,
          userAddress: this.data.userAddress,
          headImage: this.data.headImage,
          userLabel: userLabel.join(),
          selfData: this.data.selfData,
          goodAt: this.data.goodAt,
          workExperience: this.data.workExperience
        }

        http.getList(data)
          .then((res) => {
            wx.showToast({
              title: '保存成功',
            })
          })

      });
    }


    

    
  },
  /**
   * 判断信息是否填写完成
   */
  isValue(){
    if (!this.data.realName){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.userAddress)
    {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.telephone){
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return false;
    }

    // if (this.data.imgList.length == 0){
    //   wx.showToast({
    //     title: '请上传头像',
    //   })
    // }

    let data = this.data.checkbox;
    let arr = [];
    for(let i = 0; i < data.length; i++){
      if (data[i].checked){
        arr.push(data[i].name);
      }
    }
    this.setData({
      lab: arr
    })
    if(arr.length == 0){
      wx.showToast({
        title: '请选择主要类目',
        icon: 'none'
      })
      return false;
    }

    if (this.data.keywords.length == 0){
      wx.showToast({
        title: '请输入关键字',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.selfData){
      wx.showToast({
        title: '请输入简介',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.goodAt){
      wx.showToast({
        title: '请输入擅长',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.workExperience){
      wx.showToast({
        title: '请输入执业经历',
        icon: 'none'
      })
      return false;
    }

    return true;
  }
})