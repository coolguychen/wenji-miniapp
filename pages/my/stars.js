// pages/stars/stars.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //   1. 用户点击“我的”界面的“想去清单”，返回所有想去的地点。
    // a. 输入：用户的openid
    // b. 输出：想去的list, 每一个对象由加入想去的时间（年月日）和对应文学地点组成。
    wx.request({
      url: 'https://www.literaturemap.top/user/getWishList',
      data: {
        openid: app.globalData.openid,
      },
      method: 'GET',
      header: {
        "Content-Type": "applciation/json"
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          starList: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})