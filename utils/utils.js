/**
 * 判断是否登陆注册
 */
const isLogin = () => {
  let token = wx.getStorageSync("session") || null;
  console.log(token);
  if (token) {
    // 已经授权
    return true;
  } else {
    // 未授权
    wx.showModal({
      title: '提示',
      content: '你还未授权，部分功能不能使用，请前往授权！',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/login/login"
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '很遗憾，你无法使用此功能',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    return false;
  }
}

module.exports= {
  isLogin: isLogin
}