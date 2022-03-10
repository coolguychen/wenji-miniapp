// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:'',
    markers:[
    ],
    mapId:"map",
    controls:[
      {
        id: 1,
        iconPath: '/image/nowLocation.png',
        position: {
          left: 15,
          top: 500,
          width: 30,
          height: 30
        },
        clickable: true
      }
    ],
    list:[]
  },
  /**
    * 跳转到当前的位置
    */
   moveTolocation: function () {
    //mapId 就是你在 map 标签中定义的 id
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },
  /**
   * marker点击事件
   * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   */
  toInformation: function (){
    console.log('点击了marker')
    wx.navigateTo({
      url: '/pages/demo02/demo02',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前定位的经纬度信息
    wx.showLoading({
      title: '定位中',
      mask: true
    })
    wx.getLocation({
      type:'wgs84',
      altitude: 'true', //高精度定位
      //定位成功
      success: function(res) {
        var latitudee = res.latitude
        var longitudee = res.longitude
        console.log(res.longitude)
        console.log(res.latitude)
        const markers = [
          {
            iconPath: "/image/marker1.png",
            id: 0,
            latitude: 31.22472,
            longitude: 121.447588,
            width: 40,
            height: 40,
            label: {
              content: "常德公寓",
              color: "#ffbf00",
              fontSize: 12,
              anchorX: -(0.5 * (3 * 24))/2,
              textAlign: "center"
            }
          },
          {
    
          }
        ]
        that.setData({
          longitude:parseFloat(longitudee),
          latitude: parseFloat(latitudee),
          markers: markers
        })
      },
      //定位失败
      fail: function(){
        wx.showToast({
          title: '定位失败',
          icon: "none"
        })
      },
      complete: function(){
        //隐藏定位中信息进度
        wx.hideLoading()
      }
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