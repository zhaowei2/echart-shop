//index.js
const app = getApp()

Page({
  data: {
    imgUrls: [
      "../../images/20130611154ozvcjs5rmt.jpg",
      "../../images/20130611155akyivixppy.jpg",
      "../../images/201306111501asxsb0onh.jpg",
      "../../images/201306111511skqkvkzxy.jpg",
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    isiphonex:false,

    sleep:false,

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    wx.getUserInfo({
      success: function (res2) {
        console.log(res2)
        // that.getReduction()
      },
      fail:function(res2){
        
      }
    })
    //判断手机尺寸 
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    if (sysinfo>700){
      this.setData({
        isiphonex:true
      })
    }
    // 
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
    //自助点单
  golist: function () {
    // if(this.data.sleep){
    //     this.setData({
    //       showSleepStatus:true
    //     })
    // }else{
      wx.navigateTo({
        url: '../list/list?model=0'
      })
    // }
  },

})
