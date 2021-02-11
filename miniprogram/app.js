
App({
  onLaunch: function (options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'crush-6g9y7twuc24db157',
        traceUser: true,
      })
    }
    this.getOpenid()

    this.globalData = {
      sysInfo: this.getSysInfo(),
      openid: -1,
    }
  },
  getOpenid(){
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid
      if(wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, [])
      }
    })
  },
  getSysInfo: function () {
    //获得系统信息
    let systemInfo = wx.getSystemInfoSync()
    //计算px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    //状态栏的高度px
    let statusBarHeight = systemInfo.statusBarHeight
    //胶囊按钮信息
    let rect = wx.getMenuButtonBoundingClientRect()
    const sysInfo = {
      pxToRpxScale,
      statusBarHeight,
      rect
    }
    return sysInfo
  },

  onShow(options){
    console.log('onShow 执行')
    console.log(options)
  },
     
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    } 
  },
    globalData: {     
      userInfo: null    
    }    
})

