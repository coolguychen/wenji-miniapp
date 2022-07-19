Page({
  data: {
    userInfo: {}, //用户信息（包括昵称和头像）
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    openid:'',
    nickname:'',
    avatar:''
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    this.passInfo(openid, userInfo)
  },
  toHomepage(){
    wx.navigateTo({
      url: '/pages/homepage/homepage',
    })
  },
  //传值 将用户信息传给后端？
  passInfo: function (openid, userInfo) {
    var that = this;
    console.log(that.userInfo);
    console.log(that.openid);
    //数据传给后端
    wx.request({
      url: '登录接口', //后端接口
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        wximg: userInfo.avatarUrl,
        nickname: userInfo.nickName,
        identity: "",
        logintype: "10",//微信登录
        openid: that.data.openid,
      },
      success(res) {
        if (res.data.r == "T") {
          that.setData({ userEntity: res.data.d });
          wx.setStorage({
            key: "userEntity",
            data: res.data.d
          })
          that.setData({ loginstate: "1" });
          wx.setStorage({
            key: "loginstate",
            data: "1"
          })
          wx.setStorage({
            key: 'userinfo',
            data: "1"
          })
        }
        else {
          return;
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },
})
