
App({
  onLaunch: function (options) {
    // console.log('onLaunch 执行')
    // console.log(options)
    // const { statusBarHeight, platform } = wx.getSystemInfoSync()
    // const { top, height } = wx.getMenuButtonBoundingClientRect()

    //  // 展示本地存储能力 
    //  var logs = wx.getStorageSync('logs') || []   
    //  logs.unshift(Date.now())   
    //  wx.setStorageSync('logs', logs)
    // 状态栏高度
    // wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    // wx.setStorageSync('menuButtonHeight', height ? height : 32)


    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env:'crush-6g9y7twuc24db157',
        traceUser: true,
      })
    }

    //  // 判断胶囊按钮信息是否成功获取
    //  if (top && top !== 0 && height && height !== 0) {
    //   const navigationBarHeight = (top - statusBarHeight) * 2 + height
    //   // 导航栏高度
    //   wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    // } else {
    //   wx.setStorageSync(
    //     'navigationBarHeight',
    //     platform === 'android' ? 48 : 40
    //   )
    // }
    this.globalData = {
      sysInfo: this.getSysInfo(),
    }
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

