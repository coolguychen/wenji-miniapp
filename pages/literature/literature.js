// pages/literature/literature.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //地址id
    openid: '', //用户id
    type: 'landmark',
    imgUrls: [

    ],
    name: '',
    address: '',
    booklist: [

    ],
    collected: false,
    tick: false, //是否已经打卡
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


    //显示平均星级
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
    // 要展示的评分
    remark_num: 0.0,
    // 整颗星的个数
    int: "",
    // 非整颗星的百分比
    percent: ""
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
    var that = this;
    var collected = that.data.collected;
    if (app.globalData.openid == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        success: function () {
          setTimeout(function () {
            wx.switchTab({
              url: '../userhome/userhome',
            })
          }, 1500);
        }
      })
    }

    //若一开始没有收藏 点击后加入收藏
    if (collected == false) {
      //后端POST一条数据2
      //1. 输入：地点id、openid
      //2. 数据库存储“想去”对应关系（加入时间（年月日））
      wx.request({
        url: 'http://localhost:8080/user/addToWishList',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: app.globalData.openid,
          placeid: that.data.id
        },
        method: 'POST',
        success(res) {
          console.log("加入收藏成功")
          wx.showToast({
            title: "收藏成功",
            duration: 1000,
            icon: "success"
          })
        }
      })
    }
    //否则 取消收藏 后端list中删除该项
    else {
      wx.request({
        url: 'http://localhost:8080/user/deleteFromWishList',
        data: {
          openid: app.globalData.openid,
          placeid: that.data.id
        },
        method: 'DELETE',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log("取消收藏成功")
          wx.showToast({
            title: "取消收藏",
            duration: 1000,
            icon: "success"
          })

        }
      })
    }
    this.setData({
      //赋值
      collected: !collected
    })

    //1s后check一下 更新界面
    setTimeout(function () {
      //check 是否收藏
      wx.request({
        url: 'http://localhost:8080/main/checkUserToPlace',
        header: {
          'Content-Type': 'json' 
        },
        data: {
          openid: app.globalData.openid,
          placeid: that.data.id
        },
        method: 'GET',
        success(res) {
          console.log(res.data.data);
          console.log(res.data.data.wishTo)
        }
      })
    }, 1500)
  },

  onTickTap: function (ev) {
    var tick = this.data.tick;
    if (tick == false) { //如果之前没有打卡过
      if (app.globalData.openid == null) {
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '../userhome/userhome',
              })
            }, 1500);
          }
        })
      } else {
        wx.navigateTo({
          url: '../makepunch/makepunch?name=' + this.data.name + '&id=' + this.data.id,
        })
      }

    } else {
      wx.showToast({
        title: "取消收藏",
        duration: 1000,
        icon: "success"
      })
    }
    this.setData({
      tike: !tick
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

  checkUserToPlace: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //在“我的”界面登录/注册
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/user/login',
            data: {
              code: res.code,
            },
            method: 'GET',
            header: {
              "Content-Type": "applciation/json"
            },
            success: function (res) {
              console.log(res.data.msg)
              console.log('openid: ' + res.data.data.openid)
              //设置全局变量openid
              app.globalData.openid = res.data.data.openid
              //看用户是否注册 用户名不为空 注册设为TRUE 并给hasUserInfo和name和head赋值
              if (res.data.data.nickName != "" && res.data.data.nickName != null) {
                //赋值
                that.setData({
                  openid: app.globalData.openid
                });
              }
            },
            fail: function (res) {
              console.log("fail");
            }
          })
        } else {
          console.log(res.errMsg)
        }
      },
      fail(res) {
        console.log("登录失败！")
      }
    })

    setTimeout(function () {
      //根据option.id动态显示数据
      //给id与openid赋值
      that.setData({
        id: options.id
      })
      console.log('placeid = ' + that.data.id + ', openid=' + that.data.openid)
      var imgUrls1 = ''
      var name1 = ''
      var address1 = ''
      var booklist1 = ''
      var remark_num1 = ''
      //加载地标详情
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
          //todo: 后端更新后修改该评分
          remark_num1 = 4.7
          var int1 = Math.floor(remark_num1); // 向下取整-得到整颗星的个数
          var percent1 = (remark_num1 - int1) * 100 + '%'; // 非整颗星的百分比
          //todo: 后端更新后修改想去，去过状态

          that.setData({
            imgUrls: imgUrls1,
            name: name1,
            address: address1,
            booklist: booklist1,
            remark_num: remark_num1,
            int: int1,
            percent: percent1
          })
          console.log(booklist1)
          console.log(that.data.booklist)
          console.log(that.data.int)
          console.log(that.data.percent)
        }
      })
      //check 是否收藏 or 打卡
      wx.request({
        url: 'http://localhost:8080/main/checkUserToPlace',
        data: {
          openid: that.data.openid,
          placeid: that.data.id
        },
        method: 'GET',
        success: (res) => {
          console.log(res.data.data);
          //如果已经收藏 那么collected
          if (res.data.data.wishTo == true) {
            that.setData({
              //赋值
              collected: true
            })
          }
          else {
            that.setData({
              //赋值
              collected: false
            })
          }
          if (res.data.data.goneTo == true) {
            that.setData({
              //赋值
              tick: true
            })
          }
          else {
            that.setData({
              //赋值
              tick: false
            })
          }
        }
      })
    }, 1000)

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