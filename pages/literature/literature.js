// pages/literature/literature.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        type: 'landmark',
        imgUrls: [

        ],
        name: '',
        address: '',
        booklist: [

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
        height: ''
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

    onCollectionTap: function (ev) {
        wx.showToast({
            title: "收藏成功",
            duration: 1000,
            icon: "success"
        })
    },

    nav: function () {
        var that = this;
        var id = that.data.id;
        wx.request({
            //根据id获取经纬度，导航至目的地
            url: 'http://localhost:8080/main/location?id=' + id,
            method: 'GET',
            data: {},
            success(res) {
                // console.log(res.data.data);
                var item = res.data.data;
                var latitude = item.latitude;
                var longitude = item.longitude;
                let plugin = requirePlugin('routePlan');
                let key = 'M2NBZ-PW6KX-KM644-7Y3RN-EQGYO-37FOM'; //使用在腾讯位置服务申请的key
                let referer = '文迹'; //调用插件的app的名称
                let endPoint = JSON.stringify({ //终点
                    'name': that.data.name,
                    'latitude': latitude,
                    'longitude': longitude
                });
                wx.navigateTo({
                    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
                });
            },
            fail(res) {
                //获取经纬度失败
            }
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
        var booklist1 = ''
        var that = this

        wx.request({
            url: 'http://localhost:8080/main/literature?id=' + options.id,
            method: 'GET',
            success(res) {
                console.log(res.data.data)
                let item = res.data.data
                imgUrls1 = item.picture
                console.log(imgUrls1)
                name1 = item.name
                address1 = item.address
                booklist1 = item.books

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

    },

    /**
     * 点击书籍列表中元素进行跳转
     */
    toBookDetail: function (e) {
        console.log(e)
        let bookId = e.currentTarget.dataset.idx
        let placeId = this.data.id
        console.log(bookId)
        console.log(placeId)
        wx.navigateTo({
            url: '../literatureDetail/literatureDetail?bookId=' + bookId + '&placeId=' + placeId
        })
    }
})