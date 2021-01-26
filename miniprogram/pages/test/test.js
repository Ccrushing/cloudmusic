// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //var let const
    // for(var i = 0; i<5;i++){

    // }
    // console.log(i)
    // const a = 3
    // a = 4
    // const obj = {}
    // const arr = []
    // const str = ''
    // const name = "wjy"
    // const person = {
    //   name,
    //   age = 20,
    // }
    // let_this = this
    wx.cloud.callFunction({
      name:'login'
    }).then((res) => {
      this.setData({
        openid:res.result.openid
      })
      //  console.log(JSON.stringify(res.result))
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