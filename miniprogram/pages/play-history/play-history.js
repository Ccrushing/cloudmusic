 const app = getApp()
Page({
  data: {
    musiclist:[]
  },
  onLoad: function (options) {
    //取出本地存储key为openid的数据（播放历史）
    const playHistory = wx.getStorageSync(app.globalData.openid)
    if(playHistory.length == 0) {
      wx.showModal({
        title: '播放历史为空',
        content:'',
      })
    } else {
      //storage里面存储的musiclist替换成播放历史的歌单
      wx.setStorage({
        data: playHistory,
        key: 'musiclist',
      })
      this.setData({
        musiclist:playHistory
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