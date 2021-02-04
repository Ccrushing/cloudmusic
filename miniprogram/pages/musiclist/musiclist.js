const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //歌曲列表
    musiclist:[],
    //歌单信息（只取了封面图和歌单名称）
    listInfo: {},
    opacity:0,
    title:'歌单',
    statusBarHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      statusBarHeight:app.globalData.sysInfo.statusBarHeight,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url:'musiclist'
      }
    }).then((res) => {
     // console.log(res)
     // console.log(res.result)
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks,
        listInfo:{
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
          avatarUrl:pl.creator.avatarUrl,
          nickname:pl.creator.nickname,
          subscribedCount:pl.subscribedCount,
          commentCount: pl.commentCount,
          shareCount: pl.shareCount,
          description:pl.description,
        }
      })
      console.log(this.data.listInfo)
      this._setMusiclist()
      wx.hideLoading()
    })
  },
  onPageScroll(e){
    let scrollTop = e.scrollTop
    console.log(scrollTop)
    if(scrollTop>44){
      this.setData({
        title:this.data.listInfo.name,
      })
    }else{
      this.setData({
        title:'歌单',
      })
    }
    let _opacity = (scrollTop / 100 > 1) ? 1 : scrollTop / 100
    this.setData({
      opacity: _opacity
    })
  },
      _setMusiclist(){
        //将本歌单的歌曲列表存入本地存储
        wx.setStorageSync('musiclist', this.data.musiclist)
      },
      back(){
        wx.navigateBack({
          delta: 1,
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
