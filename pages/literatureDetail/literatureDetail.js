// pages/literatureDetail/literatureDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showLoading: true,

        bookId: '',
        placeId: '',

        picture: '',
        title: '',
        releaseTime: '',
        preview: '',
        quote: '',
        bookUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var that = this
        wx.request({
          url: 'https://www.literaturemap.top/main//book/literature?id_works='+options.bookId+'&id_place='+options.placeId,
          method: "GET",
          success(res){
              let answer=res.data.data
              console.log(answer)
              that.setData({
                  name: answer.name,
                  picture: answer.picture,
                  releaseTime: answer.release_time,
                  quote: answer.quote,
                  preview: answer.preview,
                  showLoading: false
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