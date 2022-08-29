// pages/comment/comment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    hasComments: false,
    //显示平均星级
    // 星星列表
    stars: [
      {
        bgImg: "/image/star_gray.png",
        bgfImg: "/image/star_yellow.png",
      },
      {
        bgImg: "/image/star_gray.png",
        bgfImg: "/image/star_yellow.png",
      },
      {
        bgImg: "/image/star_gray.png",
        bgfImg: "/image/star_yellow.png",
      },
      {
        bgImg: "/image/star_gray.png",
        bgfImg: "/image/star_yellow.png",
      },
      {
        bgImg: "/image/star_gray.png",
        bgfImg: "/image/star_yellow.png",
      },
    ],
    imageWidth: getApp().screenWidth / 4 - 10, //图片的宽度 1：1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.request({
      url: 'https://www.literaturemap.top/main/comment/all',
      data: {
        placeid: options.id
      },
      method: 'GET',
      success(res) {
        console.log(res.data.data)
        if (res.data.data.length != 0) {
          var tmpList = res.data.data
          var score = []
          var starList = that.data.stars
          //进行 数组对象合并 加上分数数组 包含int和percent
          var obj1 = tmpList.map((item, index) => {
            var int1 = Math.floor(item.score)
            var percent1 = (item.score - int1) * 100 + '%'
            score.push({ int: int1, percent: percent1 })
            return { ...item, ...score[index] };
          });
          //再次与stars数组合并
          var obj2 = obj1.map((item) => {
            item.stars = starList
            return item;
          });
          that.setData({
            comments: obj2,
            hasComments: true //存在评价
          })
          console.log(that.data.comments)
        }

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