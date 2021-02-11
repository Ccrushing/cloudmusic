import formatTime from '../../utils/formatTime.js'
const MAX_LIMIT = 10
const db = wx.cloud.database()
Page({
  data: {
    blogList:[],
    //记录当前偏移量
    currentX: 0,
    //用户是否在触摸
    isTouchMove:false
  },

  onLoad: function (options) {
    this._getListByCloud()
  },
  handleMovableChange(e){
    //console.log(e)
    if(
      e.detail.source === 'touch' ||
      e.detail.source === 'touch-out-of-bounds'
    ) {
      this.setData({
        isTouchMove:true,
      })
    } else {
      this.setData({
        isTouchMove:false,
      })
    }
    this.setData({
      currentX:e.detail.x,
    })
  },
  handleTouchestart(e) {
    console.log(e)
  },
  handleTouchend(e){
    //console.log(e)
    let ds = e.currentTarget.dataset
    if(this.data.isTouchMove){
      if(this.data,currentX < -46) {
        this.data.blogList[ds.index].x = -92
        this.setData({
          blogList:this.data.blogList
        })
      } else {
        this.data.blogList[ds.index].x = 0
        this.setData({
          blogList:this.data.blogList
        })
      }
    }
  },
  handleDelete(e){
    console.log(e)
    //从界面上移出
    const index = e.currentTarget.dataset.index
    this.data.blogList.splice(index,1)
    this.setData({
      blogList:this.data.blogList
    });
    //从数据库移除
    const blogId = e.currentTarget.dataset.blogid
    db.collection('blog').doc(blogId).remove({
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
        })
      },
      fail:(err) => {
        wx.showToast({
          icon:'none',
          title: '删除失败',
        })
      }
    })
  },

  //从云函数获取博客列表
  _getListByCloud(){
    wx.showLoading({
      title:'加载中',
    })
    wx.cloud.callFunction({
      name:'blog',
      data: {
        $url:'getListByOpenid',
        start:this.data.blogList.length,
        count:MAX_LIMIT
      }
    }).then((res) => {
      console.log(res)
      let arr = res.result
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i].x = 0
      }
      this.setData({
        blogList:this.data.blogList.concat(arr)
      })
      console.log(arr)
      wx.hideLoading()
    })
  },
  goDetail(event) {
    console.log(event)
    wx.navigateTo({
      url: `../blog-detail/blog-detail?blogId=${event.currentTarget.dataset.blogid}`,
    })
  },
  onReachBottom: function() {
    this._getListByCloud()
  },
  onShareAppMessage:function(event) {
    const blog = event.target.dataset.blog
    return {
      title: blog.content,
      path:`/pages/blog-detail/blog-detail?blogId=${blog._id}`
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