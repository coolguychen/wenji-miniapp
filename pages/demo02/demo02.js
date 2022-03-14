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
    address:'',
    works:'',
    quote:''
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
    
    var imgUrls1 = ''
    var name1 = ''
    var address1 = ''
    var works1 = ''
    var quote1 = ''

    if(options.id == '0'){
      imgUrls1=[
              'https://tse4-mm.cn.bing.net/th/id/OIP-C.i4EBorjElD938U5rJkZdMwHaE6?w=289&h=192&c=7&r=0&o=5&dpr=1.56&pid=1.7',
              'https://tse3-mm.cn.bing.net/th/id/OIP-C.z3rI8ovheg1WaG7OJpCkgwHaFj?w=257&h=193&c=7&r=0&o=5&dpr=1.56&pid=1.7',
              'https://tse4-mm.cn.bing.net/th/id/OIP-C.42wwafCfSLYGEMLmyV-KDQHaE5?w=269&h=180&c=7&r=0&o=5&dpr=1.56&pid=1.7',
            ]
      name1 = '常德公寓'
      address1 = '上海市静安区常德路195号',
      works1 = '《公寓生活记趣》'
      quote1 = ''
    }
    else if(options.id == '1'){
      imgUrls1=[
        'https://bkimg.cdn.bcebos.com/pic/43a7d933c895d143d254bd7973f082025aaf074d?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U3Mg==,g_7,xp_5,yp_5/format,f_auto'
     ]
      name1 = '茂名路洋房'
      address1 = '茂名南路'
      works1 = '《繁花》'
      quote1 = "沪生家的地点，是茂名路洋房，父母是空军干部，积极响应社会新生事物——民办小学，为沪生报了名，因此沪生小学六年上课地点，分布于复兴中路的统间，瑞金路石库门客堂，茂名南路洋房客厅，长乐路厢房，长乐邮居委会仓库，南昌路某弄洋房汽车间，中国乒乓摇篮，巨鹿路第一小学对面老式弄堂的后间。这个范围，接近阿宝的活动地盘，但两人并不认得。"
    }

    this.setData({
      imgUrls: imgUrls1,
      name: name1,
      address: address1,
      works: works1,
      quote: quote1
    })
   
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