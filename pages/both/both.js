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
    picture:'',
    preview:'',
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
    var picture1 = ''
    var preview1 = ''
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
      picture1 = ['https://img9.doubanio.com/view/subject/s/public/s1662165.jpg']
      preview1 = '《公寓生活记趣》，是一篇家长里短的娓娓道来，为我们呈现了四十年代上海租界公寓世俗的一角，同时也展露了作者对都市生活的一往情深。'
      quote1 = ''
    }
    else if(options.id == '1'){
      imgUrls1=[
        'https://bkimg.cdn.bcebos.com/pic/43a7d933c895d143d254bd7973f082025aaf074d?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U3Mg==,g_7,xp_5,yp_5/format,f_auto'
     ]
      name1 = '茂名路洋房'
      address1 = '茂名南路'
      works1 = '《繁花》'
      picture1 = ['https://img1.doubanio.com/view/subject/l/public/s26037307.jpg']
      preview1 = '《繁花》是一部地域小说，人物的行走，可找到“有形”地图的对应。这也是一部记忆小说，六十年代的少年旧梦，辐射广泛，处处人间烟火的斑斓记忆，九十年代的声色犬马，是一场接一场的流水席，叙事在两个时空里频繁交替，传奇迭生，延伸了关于上海的“不一致”和错综复杂的局面，小心翼翼的嘲讽，咄咄逼人的漫画，暗藏上海的时尚与流行；昨日的遗漏，或是明天的启示……即使繁花零落，死神到来，一曲终了，人犹未散。'
      quote1 = ''
    }

    this.setData({
      imgUrls: imgUrls1,
      name: name1,
      address: address1,
      works: works1,
      picture: picture1,
      preview: preview1,
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