// pages/residence/residence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //地标的id
    imgUrls: [], //地点图片 -- 数组
    desLatitude: '',
    desLongitude: '',
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
    name: '', //地名
    address: '', //具体地址信息
    authorName: '', //作者名字
    authorPicture: '', //作者图片--数组
    authorPreview: '', //作者简介
    books: '' //书列表
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

  //点击作家名，去到authorDetail
  authorDetail: function(){
    var id = this.data.id;
    console.log(id);
    wx.navigateTo({
      //传入bookID
      url: '../residence/authorDetail?id=' + id,
    })
  },

  //点击时间轴上的书籍，跳转到书籍详情页。
  goBook: function (e) {
    console.log(e.currentTarget.dataset.bookid);
    var bookID = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      //传入bookID
      url: '../residenceDetail/residenceDetail?bookID=' + bookID,
    })

  },

  onCollectionTap: function (ev) {
    wx.showToast({
      title: "收藏成功",
      duration: 1000,
      icon: "success"
    })
  },

  nav: function () {
    let plugin = requirePlugin('routePlan');
    let key = 'M2NBZ-PW6KX-KM644-7Y3RN-EQGYO-37FOM';  //使用在腾讯位置服务申请的key
    let referer = '文迹';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': this.data.name,
      'latitude': 31.229997,
      'longitude': 121.454047
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //根据option.id动态显示数据
    console.log(options)
    var id = options.id;

    wx.request({
      url: 'http://localhost:8080/main/residence?id=' + id,
      method: 'GET',
      data: {},
      success(res) {
        console.log(res.data.data);
        var item = res.data.data;
        var imgUrls = item.picture;
        var name = item.name; //地名
        var address = item.address; //具体地址信息
        var authorName = item.authorName;
        var authorPicture = item.authorImg;
        console.log(authorPicture);
        var authorPreview = item.authorPreview;
        var books = item.books //书列表
        that.setData({
          id: id,
          imgUrls: imgUrls,
          name: name,
          address: address,
          authorName: authorName,
          authorPreview: authorPreview,
          authorPicture: authorPicture,
          books: books
        })
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