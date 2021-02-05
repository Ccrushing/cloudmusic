const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { //标题文字
      type: String,
      value:''
    },
    titleColor: { //标题颜色，默认白色
      type:String,
      value:true
    },
    showIcon:{ //返回箭头是否显示，默认显示
      type:Boolean,
      value:true
    },
    isTransparent:{ //是否开启透明效果，默认不开启
      type:Boolean,
      value:false
    },
    backgroundColor: { //背景色，设置默认色
      type:String,
      value:"#24AFFF"
    },
    linearGradient:{ //是否渐变，默认开启
      type:Boolean,
      value:true
    },
    direction: { //颜色渐变方向，默认向右
      type:String,
      value:"right"
    },
    colors: { //渐变的起止颜色数组，设置默认渐变颜色
      type: String,
      value:["#2A6370","#624677"]
    },
    contentOffset:{ //内容是否偏移（不让导航栏遮挡内容，默认是）
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type:"自定义导航",
    statusBarHeight: app.globalData.sysInfo.statusBarHeight //获取手机状态栏高度
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack:function(){ //返回事件
      console.log("后退")
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
