// pages/demo02/demo02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type: 'landmark',
    condition: 'true',
    navbar: ['文学地标','文人故居'],
    currentTab: 0,
    imgUrls:[
      
    ],
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
    name:'',
    address:''
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
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据option.id动态显示数据
    console.log(options)
    this.setData({
      id: options.id
    })
    
    if(id == 1) {
      this.setData({
        imgUrls=[
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.i4EBorjElD938U5rJkZdMwHaE6?w=289&h=192&c=7&r=0&o=5&dpr=1.56&pid=1.7',
          'https://tse3-mm.cn.bing.net/th/id/OIP-C.z3rI8ovheg1WaG7OJpCkgwHaFj?w=257&h=193&c=7&r=0&o=5&dpr=1.56&pid=1.7',
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.42wwafCfSLYGEMLmyV-KDQHaE5?w=269&h=180&c=7&r=0&o=5&dpr=1.56&pid=1.7',
        ],
        address = '上海市静安区常德路195号',
      })
    } else if(id == 2) {
      this.setData({
        imgUrls=[
          'https://bkimg.cdn.bcebos.com/pic/43a7d933c895d143d254bd7973f082025aaf074d?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U3Mg==,g_7,xp_5,yp_5/format,f_auto'
        ],
        address='茂名南路',
      })
    }
    
  },

  /**
   * 用于判断是文学地标还是地标+文人故居
   */

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({boxStyle: 'height: 100px'})
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