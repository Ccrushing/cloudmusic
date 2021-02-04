// pages/music/music.js
const MAX_LIMIT = 15
const app = getApp()
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'search',
      imgUrls:[{
        url:'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'
      }
    ],
     playlist:[],
  statusBarHeight:0,
  opacity:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let rect = app.globalData.sysInfo.rect
    console.log(JSON.stringify(rect))
    this.setData({
      statusBarHeight:app.globalData.sysInfo.statusBarHeight,
    })
    console.log(this.data.statusBarHeight)
    this._getPlaylist()
  },

  onPageScroll(e){
let scrollTop = e.scrollTop
let _opacity = (scrollTop/100 > 1) ? 1: scrollTop / 100
this.setData({
  opacity:_opacity 
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
      playlist:[]
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},


  _getPlaylist() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count:MAX_LIMIT,
        $url:'playlist'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
})