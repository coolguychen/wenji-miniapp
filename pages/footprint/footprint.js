// pages/footprint/footprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  输出：list，每一个对象包括：地点名、评分、打卡图片、打卡文字、时间、显示范围
    footprintList:[{
      time:'2022-1-1',
      location:'常德公寓',
      imgUrls:'',
      comment:'好看',
      score:'4.0',
      isPrivate: true
    },
    {
      time:'2022-8-1',
      location:'华东师范大学',
      imgUrls:'',
      comment:'很好看',
      score:'5.0',
      isPrivate: false
    },
  
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.request({
    //     url: 'url',
    //     data: {
    //       openid: app.globalData.openid,
    //     },
    //     method: 'POST',
    //     header: {
    //       "Content-Type": "applciation/json"
    //     },
    //     success(res){
    //       console.log(res.data.data)
    //     }
    //   })
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