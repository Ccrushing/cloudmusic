let keyword = '' //搜索关键字
Page({
  data: {},
  onSearch(event) {
    keyword =event.detail.keyword
    console.log(keyword)
  },
  onLoad: function (options) {},
  onPublish() {
    
    //获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限，
    //根据是否具有scope.userInfo属性，判断用户是否授权
    wx.getSetting({
      success:(res) => {
        console.log('当前设置' + JSON.stringify(res))
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:(res) => {
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        }else{
          this.setData({
            modalShow:true,
          })
        }
      }
    })
  },
  onLoginSuccess(event){
    console.log('>>>>>>' + event)
    const detail = event.detail
    console.log(detail.nickName)
    wx.navigateTo({
      url: '../publish/publish',
    })

  },
  onLoginFail(){
    wx.showModal({
      title:'授权用户才能发布',
      content:'',
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