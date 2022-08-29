// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    isSelect: false,//展示类型？
    types: ['人名', '地名', '书名'],//搜索类型
    key:'',
    type: "",
    show: false,
    markers: [],
    center: '',
    mapId: "map",
    controls: [
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

  //键盘输入时实时调用搜索方法
  input(e) {
    var that = this;
    //获取键盘输入的值
    that.setData({
      key: e.detail.value
    })
  },

  //点击完成按钮时触发
  confirm(e) {
    var that = this;
    console.log('点击了搜索')
    var type = this.data.type;
    console.log(type);
    if (type == '') {
      wx.showToast({
        title: '请选择搜索类型！',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    if (type == '人名') type = '0';
    else if (type == '地名') type = '1';
    else if (type == '书名') type = '2';
    //显示搜索结果
    this.search(type, that.data.key)
  },

  search(type, key) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容
    var myMarker = [];
    console.log(key)
    wx.request({
      url: 'https://www.literaturemap.top/main/marker?' + 'name=' + key + '&' + 'option=' + type,
      method: 'GET',
      //重新渲染markers, 显示搜索出来的marker
      success(res) {
        console.log(res.data.data)
        if (res.data.data.length === 0) {
          console.log('暂无该结果！')
          //提示暂无搜索结果
          wx.showToast({
            title: '暂无该结果！',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
        else {
          for (var i = 0; i < res.data.data.length; i++) {
            var item = res.data.data[i];
            console.log(item);
            let mark = {
              id: item.id,
              name: item.name,
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
            myMarker.push(mark);
            that.setData({
              markers: myMarker,
              center: res.data.data[0]
            })
          }
        }
      },
      fail(res) {
        //提示暂无搜索结果
        wx.showToast({
          title: '暂无该结果！',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    })
  },

  //点击控制下拉框的展示、隐藏
  select: function () {
    var isSelect = this.data.isSelect
    this.setData({ isSelect: !isSelect })
  },

  //点击下拉框选项，选中并隐藏下拉框
  getType: function (e) {
    let value = e.currentTarget.dataset.type
    // console.log(e.currentTarget.dataset)
    this.setData({
      type: value,
      isSelect: false,
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
  toInformation(e) {
    //console.log(e.markerId);
    let type = -1;
    wx.request({
      url: 'https://www.literaturemap.top/main/type?id=' + e.markerId,
      method: 'GET',
      success(res) {
        //console.log(res.data.data)
        type = res.data.data
        //console.log(type)
        if (type == 0) { //文人故居
          wx.navigateTo({
            url: '../residence/residence?id=' + e.markerId,
          })
        } else if (type == 1) { //文学地标
          wx.navigateTo({
            url: '../literature/literature?id=' + e.markerId,
          })
        } else { //both
          wx.navigateTo({
            url: '../both/both?id=' + e.markerId,
          })
        }
      }
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
      type: 'gcj02',
      altitude: 'true', //高精度定位
      //定位成功
      success: function (res) {
        var latitudee = res.latitude
        var longitudee = res.longitude
        console.log(res.longitude)
        console.log(res.latitude)
        //赋值
        that.setData({
          longitude: parseFloat(longitudee),
          latitude: parseFloat(latitudee)
        })
      },
      //定位失败
      fail: function () {
        wx.showToast({
          title: '定位失败',
          icon: "none"
        })
      },
      complete: function () {
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
    var that = this;
    var allMarkers = that.getMarkers();
    console.log(allMarkers);
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