// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:'',
    isSelect:false,//展示类型？
    types:['人名','地名','书名'],//搜索类型
    // types:[{'0':'人名'},{'1':'地名'},{'2':'书名'}],
    type:"",
    show: false,
    markers: [],
    mapId:"map",
    controls:[
      {
        id: 1,
        iconPath: '/image/marker1.png',
        position: {
          left: 15,
          top: 500,
          width: 40,
          height: 40
        },
        clickable: true
      }
    ]
  },

  // 跳转到搜索页面
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
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

  //获取mark标记点本地数据哦
  getAllMarkers(){
    //获取全部markers
    let myMarker = [];
    wx.request({
      url: 'http://localhost:8080/main/all',
      method: 'GET',
      data:{
      },
      success (res) {
        console.log(res.data)
        for(var i = 0; i < res.data.data.length; i++){
          //console.log(res.data.data[i]);
          var item = res.data.data[i];
          //console.log(item);
          let mark = {
            id: item.id ,
            name: item.name ,
            iconPath: '/image/marker1.png',
            //注意经纬度要转成Float类型
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            width: 40,
            height: 40,
            label: {
              content: item.name,
              color: "#ffbf00",
              fontSize: 12,
              textAlign: "center"
            },
          };
          //console.log(mark);
          myMarker.push(mark)
        }
      }
    })
    return myMarker;
  },
  
  //创建marker
  createMarker(item){
    let marker = {
      id: item.id ,
      name: item.name ,
      iconPath: '/image/marker1.png',
      //注意经纬度要转成Float类型
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      width: 40,
      height: 40,
      label: {
        content: item.name,
        color: "#ffbf00",
        fontSize: 12,
        anchorX: -(0.5 * (3 * 24))/2,
        textAlign: "center"
      },
    };
    return marker;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var allMarkers = that.getAllMarkers();
    //获取当前定位的经纬度信息
    wx.showLoading({
      title: '定位中',
      mask: true
    })
    wx.getLocation({
      type:'gcj02',
      altitude: 'true', //高精度定位
      //定位成功
      success: function(res) {
        var latitudee = res.latitude
        var longitudee = res.longitude
        console.log(res.longitude)
        console.log(res.latitude)
        console.log(allMarkers)
        //赋值
        that.setData({
          longitude:parseFloat(longitudee),
          latitude: parseFloat(latitudee),
          markers: allMarkers
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