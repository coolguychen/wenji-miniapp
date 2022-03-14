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
   * 通过url传参(e.markerId),页面demo02负责接受，根据id动态显示信息
   */
  toInformation(e){
    console.log(e.markerId);
    wx.navigateTo({
      url: '../demo02/demo02?id=' + e.markerId,
    })
  },

  //创建标记点 -- 获取后端数据point
  // createMyMarker(point){
  //   let mark = {
  //     id: point.id || 0,
  //     name: point.name || 0,
  //     iconPath: '/image/marker1.png',
  //     latitude: point.lat || 0,
  //     longitude: point.lon || 0,
  //     width: 50,
  //     height: 50
  //   };
  //   return mark;
  // },

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
            },
          },
          {
            iconPath: "/image/marker1.png",
            id: 1,
            latitude: 31.229997,
            longitude: 121.467338,
            width: 40,
            height: 40,
            label: {
              content: "茂名路洋房",
              color: "#ffbf00",
              fontSize: 12,
              anchorX: -(0.5 * (3 * 24))/2,
              textAlign: "center"
            },
          },
          {
            iconPath: "/image/marker1.png",
            id: 2,
            latitude: 31.221002,
            longitude: 121.471452,
            width: 40,
            height: 40,
            label: {
              content: "复兴中路统间",
              color: "#ffbf00",
              fontSize: 12,
              anchorX: -(0.5 * (3 * 24))/2,
              textAlign: "center"
            }
          },
          {
            iconPath: "/image/marker1.png",
            id: 3,
            latitude: 31.22203,
            longitude: 121.452276,
            width: 40,
            height: 40,
            label: {
              content: "长乐路厢房",
              color: "#ffbf00",
              fontSize: 12,
              anchorX: -(0.5 * (3 * 24))/2,
              textAlign: "center"
            }
          },
          {
            iconPath: "/image/marker1.png",
            id: 4,
            latitude: 31.215624,
            longitude: 121.472909,
            width: 40,
            height: 40,
            label: {
              content: "瑞金路石库门",
              color: "#ffbf00",
              fontSize: 12,
              anchorX: -(0.5 * (3 * 24))/2,
              textAlign: "center"
            }
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