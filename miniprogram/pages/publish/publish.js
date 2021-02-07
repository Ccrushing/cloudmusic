// 输入文字最大的个数
const MAX_WORDS_NUM = 140
//最大上传图片数量
const MAX_IMG_NUM = 9
//输入的文字内容
let content = ''
//用户信息
let userInfo = {}
Page({
  data: {
    //输入的文字个数
    wordsNum: 0,
    //发布操作区离底部距离
    footerBottom:10,
    //选择的图片数组
    images:[],
    //添加图片元素是否显示
    selectPhoto: true,
  },

  onLoad: function (options) {
    console.log(options)
    userInfo = options
  },
  onInput(event) {
    console.log(event.detail.value)
    let wordsNum = event.detail.value.length
    if(wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大数字为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },
  onFocus(event) {
    //模拟器获取的键盘高度为0
    console.log(event)
    //设置手机键盘高度
    this.setData({
      footerBottom:event.detail.height,
    })
  },
  onBlur(){
    this.setData({
      footerBottom:10,
    })
  },
  onChooseImage(){
    //还能再选几张图片
     let max = MAX_IMG_NUM - this.data.images.length
    console.log(max)
    wx.chooseImage({
      count: max,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success:(res) => {
        console.log(res)
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
     //还能再选几张图片
    max = MAX_IMG_NUM - this.data.images.length
    console.log('>>>>' + max)
    //根据max的值决定是否显示选择图片的元素
    this.setData({
      selectPhoto: max <= 0 ? false : true
      })
    },
  })
},
  onPreviewImage(event) {
    console.log(event)
    wx.previewImage({
      urls: this.data.images,
      current:event.target.dataset.imgsrc,
    })

  },
  onDelImage(event) {
    console.log(event)
    //注意js数组中的splice函数
    this.data.images.splice(event.target.dataset.index,1)
    this.setData({
      images:this.data.images
    })
    console.log(this.data.images.length)
    //等于8，就可以显示选择图片元素
    if(this.data.images.length === MAX_IMG_NUM -1) {
      this.setData({
        selectPhoto:true,
      })
    }
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