// pages/demo02/demo02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['文学地标', '文人故居'],
    currentTab: 0,
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
    id: '', //地标的id
    imgUrls: [], //地点图片（轮播、数组）
    name: '', //地名
    address: '', //具体地址信息
    authorName: '', //文人故居-作者名
    authorPicture: '', //文人故居-作者图片
    books: '', //文人故居-该作者在此地发表的书列表

    booklist: '' //文学地标-该地标相关文学作品的列表
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

  //点击切换标签页
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var that = this
    console.log('currentTab:'+this.data.currentTab)
    if (this.data.currentTab == 0) { //tab为文学地标
      wx.request({
        url: 'http://localhost:8080/main/literature?id='+ this.data.id,
        method: 'GET',
        success(res) {
          console.log(res.data.data)
          let item = res.data.data
          var imgUrls1 = [item.picture]
          console.log(imgUrls1)
          var name1 = item.name
          var address1 = item.address
          var booklist1 = item.books

          that.setData({
            imgUrls: imgUrls1,
            name: name1,
            address: address1,
            booklist: booklist1
          })

          console.log(booklist1)
          console.log(that.data.booklist)

        }
      })
    } else if (this.data.currentTab == 1) { //文人故居的tab
      console.log(this.data.id)
      wx.request({
        url: 'http://localhost:8080/main/residence?id=' + this.data.id,
        method: 'GET',
        data: {},
        success(res) {
          console.log(res.data.data);
          var item = res.data.data;
          var imgUrls = [item.picture];
          var name = item.name; //地名
          var address = item.address; //具体地址信息
          var authorName = item.authorName;
          // var authorPicture = ''; 暂无
          var books = item.books //书列表
          that.setData({
            imgUrls: imgUrls, //地点图片列表
            name: name, //地点名字
            address: address, //地点具体位置
            authorName: authorName, //作家名
            books: books, //该作家在此地发表的书籍
          })
        }
      })
    }


  },

  //点击时间轴上的书籍，跳转到书籍详情页。
  goBook: function (e) {
    console.log(e.currentTarget.dataset.bookid);
    var bookID = e.currentTarget.dataset.bookid;
    // console.log(bookID);
    wx.navigateTo({
      //传入bookID
      url: '../residenceDetail/residenceDetail?bookID=' + bookID,
    })
  },

  //点击文学地标对应书籍列表中的书籍，跳转到书籍详情
  toBookDetail: function (e) {
    console.log(e)
    let bookId = e.currentTarget.dataset.idx
    let placeId = this.data.id
    console.log(bookId)
    console.log(placeId)
    wx.navigateTo({
      url: '../literatureDetail/literatureDetail?bookId=' + bookId + '&placeId=' + placeId
    })
  },

  onCollectionTap: function (ev) {
    wx.showToast({
      title: "收藏成功",
      duration: 1000,
      icon: "success"
    })
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
      url: 'http://localhost:8080/main/literature?id=' + options.id,
      method: 'GET',
      success(res) {
        console.log(res.data.data)
        let item = res.data.data
        var imgUrls1 = [item.picture]
        console.log(imgUrls1)
        var name1 = item.name
        var address1 = item.address
        var booklist1 = item.books

        that.setData({
          id: id,
          imgUrls: imgUrls1,
          name: name1,
          address: address1,
          booklist: booklist1
        })

        console.log(booklist1)
        console.log(that.data.booklist)

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      boxStyle: 'height: 100px'
    })
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