// app.js
App({
  onLaunch() {
    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  //全局变量 用户信息和openid
  globalData: {
    userInfo: null,
    openid: null
  }
})
