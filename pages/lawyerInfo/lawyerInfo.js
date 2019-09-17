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
    imgSrc: null,
    lawyerPrice: null,
    photoPrice: null
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
    if(userInfo){
      this.setData({
        realName: userInfo.realName,
        telephone: userInfo.telephone,
        selfData: userInfo.selfData,
        goodAt: userInfo.goodAt,
        workExperience: userInfo.workExperience,
        imgSrc: userInfo.headImage,
        userAddress: userInfo.userAddress,
        region: userInfo.userAddress.split(','),
        lawyerPrice: userInfo.lawyerPrice == 0 ? null : userInfo.lawyerPrice,
        photoPrice: userInfo.photoPrice == 0 ? null : userInfo.photoPrice
      })

      // 设置标签
      let lab = userInfo.userLabel.split(',');
      let labList = this.data.checkbox;
      for (let i = lab.length-1; i >=0 ; i--){
        let item = lab[i];
        for (let y = 0; y < labList.length; y++){
           if(item == labList[y].name){
             labList[y].checked = true;
             lab.splice(i,1);
           }
        }
      }
      this.setData({
        checkbox: labList,
        keywords: lab
      })

    }
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
      userAddress: data
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
   * 获取电话咨询价格
   */
  getphotoPrice(e){
    this.setData({
      photoPrice: e.detail.value
    })
  },
  /**
   * 获取图文咨询价格
   */
  getlawyerPrice(e){
    this.setData({
      lawyerPrice: e.detail.value
    })
  },
  /**
   * 提交用户信息
   */
  submit(){
    if (!this.isValue()){
      return false;
    }

    //  上传图片

    if (this.data.imgList.length == 0) {
      let userLabel = this.data.lab;
      userLabel.push(...this.data.keywords);
      let data = {
        realName: this.data.realName,
        telephone: this.data.telephone,
        userAddress: this.data.userAddress,
        headImage: this.data.imgSrc,
        userLabel: userLabel.join(),
        selfData: this.data.selfData,
        goodAt: this.data.goodAt,
        workExperience: this.data.workExperience,
        lawyerPrice: this.data.lawyerPrice,
        photoPrice: this.data.photoPrice
      }
      http.getList(data)
        .then((res) => {
          wx.showToast({
            title: '保存成功',
          })
          this.updateStroge();
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
          workExperience: this.data.workExperience,
          lawyerPrice: this.data.lawyerPrice,
          photoPrice: this.data.photoPrice
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
  updateStroge() {
    let userInfo = wx.getStorageSync("userInfo") || null;
    userInfo.realName = this.data.realName;
    userInfo.telephone = this.data.telephone;
    userInfo.headImage = this.data.imgList.length == 0 ? this.data.imgSrc : this.data.headImage;
    userInfo.selfData = this.data.selfData;
    userInfo.goodAt = this.data.goodAt;
    userInfo.workExperience = this.data.workExperience;
    userInfo.userAddress = this.data.userAddress;
    userInfo.lawyerPrice = this.data.lawyerPrice;
    userInfo.photoPrice = this.data.photoPrice  
    wx.setStorageSync("userInfo", userInfo);            
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
        title: '请输入执业律所',
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
    console.log(this.data.photoPrice * 1);
    if (this.data.photoPrice*1 < 0.2){
      console.log(this.data.photoPrice * 1);
      wx.showToast({
        title: '请输入正确的价格,不能小于0.2元',
        icon: 'none'
      })
      return false;
    }

    if (this.data.lawyerPrice*1 < 0.2) {
      console.log(this.data.lawyerPrice * 1);
      wx.showToast({
        title: '请输入正确的价格,不能小于0.2元',
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