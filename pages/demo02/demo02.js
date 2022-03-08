// pages/demo02/demo02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'landmark',
    condition: 'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * tabbar的加载与切换
   * @param {*} event 
   */
  handleType(event) {
    const type = event.currentTarget.dataset.type;
    this.setData({
      type: type,
    });
  },

  /**
   * 用于判断是文学地标还是地标+文人故居
   */

  

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