// pages/residence/authorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    color: '#ffffff',
    //当前选中的指示点颜色
    autoplay: true,
    interval: 3000,
    duration: 100,
    vertical: false,
    circular: true,
    //swiper高度
    height: '',
    authorName: '', //作者名字
    authorPicture: '', //作者图片--数组
    authorPreview: '', //作者简介
  },

  // 图片高度自适应
  goheight: function (e) {
    var width = wx.getSystemInfoSync().windowWidth
    //获取可使用窗口宽度
    var imgheight = e.detail.height
    //获取图片实际高度
    var imgwidth = e.detail.width
    //获取图片实际宽度
    var height = width * imgheight / imgwidth + "px"
    //计算等比swiper高度
    this.setData({
      height: height
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    console.log(options.id);
    var id = options.id;
    wx.request({
      url: 'https://www.literaturemap.top/main/residence?id=' + id,
      method: 'GET',
      data: {},
      success(res) {
        console.log(res.data.data);
        var item = res.data.data;
        var authorName = item.authorName;
        var authorPicture = item.authorImg;
        var authorPreview = item.authorPreview;
        that.setData({
          authorName: authorName,
          authorPreview: authorPreview,
          authorPicture: authorPicture
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