// pages/userhome/userhome.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: '/image/用户.png',
    name: '未登录',
    canIUseGetUserProfile: false, //是否同意授权
    userInfo: {}, //用户信息（包括昵称和头像）
    hasUserInfo: false,
    isRegistered: false,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true
      })
    }
    //在“我的”界面登录
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'http://localhost:8080/user/login',
            data: {
              code: res.code,
            },
            method: 'get',
            header: {
              "Content-Type": "applciation/json"
            },
            success: function (res) {
              //看用户是否存在于数据库
              console.log(res.data.data.registered)
              console.log('openid: ' + res.data.data.openid)
              //设置全局变量openid
              app.globalData.openid = res.data.data.openid
              console.log(app.globalData.openid)
              //赋值
              that.setData({
                isRegistered: res.data.data.registered, //是否注册
                openid: app.globalData.openid //openid
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
    console.log(that.data)
    if(that.data.isRegistered == true) {
      //获取用户名和头像
      that.setData({
        head : app.globalData.userInfo.avatarUrl,
        name : app.globalData.userInfo.nickName
      })
      console.log(that.data)
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
          head: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          isRegistered: true
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