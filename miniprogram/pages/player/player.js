// pages/player/player.js
let musiclist = []
//正在播放的歌曲index
let playingIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:'',
    isPlaying: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.musicId, typeof (options.musicId))
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },
  togglePlaying(){
    this.setData({
      isPlaying: !this.data.isPlaying
    })
 
  },

  _loadMusicDetail(musicId){
   let music =  musiclist[playingIndex]
   console.log(music)
   wx.setNavigationBarTitle({
     title: music.name,
   })
   this.setData({
     picUrl: music.al.picUrl
   })
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'musicUrl',
      }
    }). then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      if(url == null){
        wx.showToast({
          title:'没有权限播放'
        })
        return
      }
      this.setData({
        isPlaying: true 
      })
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