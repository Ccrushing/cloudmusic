// pages/player/player.js
let musiclist = []
//正在播放的歌曲index
let playingIndex = 0
const backgroundAudioManger = wx.getBackgroundAudioManager()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picUrl:'',
    isPlaying: false,
    name:'',
    singer:'',
    isLyricShow:false,
    lyric: '传给歌词组件的歌词',

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
      if(url === null){
        wx.showToast({
          title:'没有权限播放'
        })
        backgroundAudioManger.pause()
        this.setData({
          isPlaying:false
        })
        return
      }
      backgroundAudioManger.src = url
      backgroundAudioManger.title = music.name
      backgroundAudioManger.coverImgUrl = music.al.picUrl
      backgroundAudioManger.singer = music.ar[0].name
      this.setData({
        isPlaying: true 
      })
      wx.hideLoading()
     //请求歌词
     wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'lyric',
      }
    }).then((res) => {
      console.log(res)
      let lyric = '暂无歌词'
      const lrc = res.result.lrc
      if (lrc) {
        lyric = lrc.lyric 
      }
      this.setData({
        lyric
      })
    })
  })
 },
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManger.pause()
    }else{
      backgroundAudioManger.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onLyricShow(){
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },
  timeUpdate(event) {
this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  onPrew(){
    playingIndex--
    if(playingIndex < 0){
      playingIndex = musiclist.length-1
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
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