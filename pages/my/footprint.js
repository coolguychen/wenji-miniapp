// pages/footprint/footprint.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  输出：list，每一个对象包括：地点名、评分、打卡图片、打卡文字、时间、显示范围
    footprintList: [],
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
    //获取去过的地点 
    wx.request({
      url: 'http://localhost:8080/user/getGoneList',
      data: {
        openid: app.globalData.openid,
      },
      method: 'GET',
      header: {
        "Content-Type": "applciation/json"
      },
      success(res) {
        console.log(res.data.data)
        var tmpList = res.data.data
        var score = []
        var starList = that.data.stars
        //进行 数组对象合并 加上分数数组 包含int和percent
        var obj1 = tmpList.map((item, index) => {
          var int1 = Math.floor(item.score)
          var percent1 = (item.score - int1) * 100 + '%'
          score.push({int:int1, percent:percent1})
          console.log(score)
          return { ...item, ...score[index] };
        });
        //再次与stars数组合并
        var obj2 = obj1.map((item) => {
          item.stars = starList
          return item;
        });
        console.log(obj2)
        that.setData({
          footprintList: obj2
        })
        console.log(that.data.footprintList)
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