// pages/stars/stars.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList: [{
      time: "2021-8-8",
      location: "华东师范大学"
    },
    {
      time: "2022-7-17",
      location: "常德公寓"
    },
    {
      time: "2022-8-1",
      location: "人民广场"
    }
  
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 1. 用户点击“我的”界面的“想去清单”，返回所有想去的地点。
    // a. 输入：用户的openid
    // b. 输出：想去的list, 每一个对象由加入想去的时间（年月日）和对应文学地点组成。
    // wx.request({
    //   url: 'url',
    //   data: {
    //     openid: app.globalData.openid,
    //   },
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "applciation/json"
    //   },
    //   success(res){
    //     console.log(res.data.data)
    //   }
    // })

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