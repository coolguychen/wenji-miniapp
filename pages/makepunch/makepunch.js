// pages/makepunch/makepunch.js
// pages_sceond/create/create.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        location: '',
        location_id: '',
        tempFilePaths: [],
        imagelist: [],
        comment: '',
        uploadImg: [], //用于盛放处理成服务器地址之后的图片 
        isPrivate: false,

        // 星星列表
        stars: [{
                bgImg: "/image/star_gray.png",
                bgfImg: "/image/star_yellow.png",
            },
            {
                bgImg: "/image/star_gray.png",
                bgfImg: "/image/star_yellow.png",
            },
            {
                bgImg: "/image/star_gray.png",
                bgfImg: "/image/star_yellow.png",
            },
            {
                bgImg: "/image/star_gray.png",
                bgfImg: "/image/star_yellow.png",
            },
            {
                bgImg: "/image/star_gray.png",
                bgfImg: "/image/star_yellow.png",
            },
        ],
        star_num: 5 //默认评分5分
    },
    //点击照片上传图片
    uploadImage: function () {
        var that = this;
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempImagelist = that.data.imagelist;
                var tempUploadImage = that.data.uploadImg;
                res.tempFilePaths.forEach((element, index, array) => {
                    tempImagelist.push(element);
                });
                that.setData({
                    imagelist: tempImagelist
                });
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths)
                for (var i = 0; i < tempFilePaths.length; i++) {
                    wx.uploadFile({
                        url: "https://www.literaturemap.top/upload/photo", //后端服务器url
                        filePath: tempFilePaths[i],
                        name: 'image',
                        method: "POST",
                        header: {
                            'content-type': 'multipart/form-data'
                        },
                        success(res) {
                            //这里的成功请求执行的内容是我们的图片上传到服务器成功 对应的是wx.uploadFile的api成功          
                            console.log(JSON.parse(res.data))
                            tempUploadImage.push(JSON.parse(res.data).msg)
                            console.log(tempUploadImage)
                            that.setData({
                                uploadImg: tempUploadImage
                            })
                            console.log(that.data.uploadImg)
                        },
                        fail: (err) => {
                            console.log(err, 'errrrrr')
                        },
                    })
                }
            }
        })
    },
    deleteImage: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var oldlist = that.data.imagelist
        var tempImagelist = new Array();
        for (var i = 0; i < oldlist.length; i++) {
            if (i != index) {
                tempImagelist.push(oldlist[i])
            }
        }
        that.setData({
            imagelist: tempImagelist
        })
    },

    //双向绑定文本框的内容
    textinput: function (e) {
        this.setData({
            comment: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            location: options.name,
            location_id: options.id
        });
        console.log(this.data.location_id)
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
    loadto: function () {
        var that = this;
        console.log(app.globalData.openid)
        var openid = app.globalData.openid;
        wx.request({
            url: 'https://www.literaturemap.top/user/addToGoneList',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                openid: openid,
                placeid: that.data.location_id,
                comment: that.data.comment,
                score: that.data.star_num,
                isPrivate: that.data.isPrivate,
                imgs: that.data.uploadImg
            },
            success(res) {
                console.log(res)
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 2000,
                        success: function () {
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '../literature/literature?id=' + that.data.location_id,
                                })
                            }, 1500);
                        }
                    })
                }
                
            }
        })

        if (app.globalData.status == 1) {
            // 弹窗
            wx.showToast({
                title: '发布成功',
                icon: "none",
                success: function () {
                    
                }
            })
        }


    },
    // 选择范围
    score: function (e) {
        var _this = this;
        for (var i = 0; i < _this.data.stars.length; i++) {
            var allItem = 'stars[' + i + '].flag';
            // 全部变为未选中状态
            _this.setData({
                [allItem]: 1
            })
        }
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i <= index; i++) {
            var item = 'stars[' + i + '].flag';
            // 选中项及以前，变为选中状态
            _this.setData({
                [item]: 2,
            })
        }
        // 评分
        _this.setData({
            star_num: index + 1 // 评分
        })
    },
    switch1Change: function (e) {
        this.setData({
            isPrivate: e.detail.value ? true : false
        })
    }
})