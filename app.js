//app.js
App({
  onLaunch: function () {
    // 判断用户是否已经注册，以及注册的类型 1 用户 2 律师
    let session = wx.getStorageSync("session") || null;
    let userType = wx.getStorageSync("userType") || null;
    



    if(session){
      // 已经注册
      wx.showLoading({
        title: '正在登陆',
      })
      // 自动登陆
      wx.login({
        success: res => {
          console.log(res);
          let code = res.code;
          wx.getSetting({
            success: res => {
              console.log(res);
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo;
                    wx.request({
                      url: 'http://47.100.218.208:8080/lawyer/wxuser/onLogin',
                      data: {
                        code: code,
                        headImage: res.userInfo.avatarUrl,
                        username: res.userInfo.nickName,
                        userType: wx.getStorageSync("userType") || 1
                      },
                      header: {
                        "content-type": 'application/x-www-form-urlencoded'
                      },
                      method: "POST",
                      success: (res) => {
                        console.log(res);
                        let type = res.data.user.userType;
                        wx.setStorageSync("session", res.data.token);
                        wx.setStorageSync("userType", type);
                        wx.setStorageSync("userInfo",res.data.user);
                        wx.hideLoading()
                        wx.reLaunch({
                          url: '/pages/index/index'
                        });
                        // if(type == 1){
                        //   wx.switchTab({
                        //     url: '/pages/index/index'
                        //   })
                        // }else{
                        //   wx.switchTab({
                        //     url: '/pages/lawyerIndex/lawyerIndex'
                        //   })
                        // }
                        
                      }
                    })

                  }
                })
              }
              else {
                // 请打开授权
              }
            }
          })
        }
      })

      if(userType == 1)
      {
        wx.setStorageSync("type", 1);
        wx.switchTab({
          url: '/pages/index/index'
        })
      }else if(userType == 2)
      {
        wx.setStorageSync("type", 2);
        wx.switchTab({
          url: '/pages/lawyerIndex/lawyerIndex'
        })
      }
    }else{
      // 未注册
    }
  },
  globalData: {
    userInfo: null
  }
})