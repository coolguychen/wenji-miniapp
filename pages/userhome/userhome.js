// pages/userhome/userhome.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: '/image/daizhuce.png',
    name: '未登录',
    canIUseGetUserProfile: false, //是否同意授权
    userInfo: {}, //用户信息（包括昵称和头像）
    hasUserInfo: false,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //加载页面时的局部变量
    var nickName = ''
    var avatarUrl = ''
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true
      })
    }
    //在“我的”界面登录/注册
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/user/login',
            data: {
              code: res.code,
            },
            method: 'GET',
            header: {
              "Content-Type": "applciation/json"
            },
            success: function (res) {
              var isRegistered = false
              console.log(res.data.msg)
              console.log('openid: ' + res.data.data.openid)
              //设置全局变量openid
              app.globalData.openid = res.data.data.openid
              //看用户是否注册 用户名不为空 注册设为TRUE 并给hasUserInfo和name和head赋值
              if (res.data.data.nickName != "" && res.data.data.nickName != null) {
                isRegistered = true;
                //本地变量赋值
                nickName = res.data.data.nickName
                avatarUrl = res.data.data.avatarUrl
                console.log(nickName)
                console.log(avatarUrl)

              }
              //赋值
              that.setData({
                hasUserInfo: isRegistered,
                openid: app.globalData.openid, //openid
                // name: res.data.data.nickName,
                // head: res.data.data.avatarUrl
              });

            },
            fail: function (res) {
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
    setTimeout(function () {
      //要延时执行的代码
      if (that.data.hasUserInfo == true) {
        //获取用户名和头像
        that.setData({
          head: avatarUrl,
          name: nickName
        })
        console.log(that.data)
      }
    }, 1000) //延迟时间 这里是1秒

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
          head: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          hasUserInfo: true
        })
        console.log(res.userInfo)
        //传值给后端
        wx.login({
          success: function (login_res) {
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                  url: 'http://localhost:8080/user/register',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    openid: that.data.openid,
                    nickName: that.data.userInfo.nickName,
                    avatarUrl: that.data.userInfo.avatarUrl
                  }
                })
              }
            })
          }
        })
      },
    })
  },

  //跳转至“我的收藏”界面
  gotoStars() {
    wx.navigateTo({
      url: '/pages/my/stars',
    })
  },

  //跳转至“我的足迹”界面
  gotoFootprint() {
    wx.navigateTo({
      url: '/pages/my/footprint',
    })
  },

  //跳转至“意见反馈”界面
  gotoSuggestion() {
    wx.navigateTo({
      url: '/pages/my/suggestion',
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})