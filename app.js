// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //登录
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'http://localhost:8080/user/login',
            data: {
              code: res.code,
            },
            method:'get',
            header: {
              "Content-Type": "applciation/json"
            },  
            success:function(res){
              console.log('res.openid: ' + res.data.openid)
            },
            fail:function(res){
              console.log("fail");
            }
            
          })
        } else {
          console.log(res.errMsg)
        }
      },
      fail(res) {
        console.log("登录失败！")
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log("获得用户信息")
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  //全局变量 用户信息和openid
  globalData: {
    userInfo: null,
    openid: null,
    loginState: false //登录状态
  }
})
