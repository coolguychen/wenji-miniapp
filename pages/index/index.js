var app = getApp();
Page({
  data: {
    userInfo: {}, //用户信息（包括昵称和头像）
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    openid: '',
    nickname: '',
    avatar: ''
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    var that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          nickname: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
        //修改全局变量 方便其他页面使用
        app.globalData.userInfo = res.userInfo
        app.globalData.loginState = true;
        //传值给后端
        wx.login({
          success: function (login_res) {
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                  url: config.api_base_url + 'me/login',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    code: login_res.code,//code是啥？
                    avatar: userInfo.avatarUrl,
                    nickname: userInfo.nickName
                  }
                })
              }
            })
          }
        })
      },
      
    })
  },

  toHomepage() {
    wx.redirectTo({
      url: '/pages/homepage/homepage',
    })
  },
})
