let keyword = '' //搜索关键字
Page({
  data: {
    modalShow: false,
    blogList: [],
  },
  onSearch(event) {
    console.log(event.detail.keyword)
    this.setData({
      blogList:[]
    })
    keyword =event.detail.keyword
    this._loadBlogList(0)
  },
  onLoad(options) {
    this._loadBlogList()
  },
  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        start,
        count: 10,
        $url: 'list',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
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
    // console.log('>>>>>>' + event)
    const detail = event.detail
    // console.log(detail.nickName)
    wx.navigateTo({
      url: `../publish/publish?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
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
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)
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