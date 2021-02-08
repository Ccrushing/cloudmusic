// 输入文字最大的个数
const MAX_WORDS_NUM = 140
//最大上传图片数量
const MAX_IMG_NUM = 9
//引入云数据库
const db = wx.cloud.database()
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
  send() {
    //发布流程
    //图片 -> 云储存 fileID 云文件ID
    //数据 -> 云数据库
    //数据库包括：内容、图片fileID、openid、昵称、头像、时间
    //openid从小程序端操作云数据库可以自动获得，时间可以获得数据库服务器时间

    //1.对输入的文字内容做判空操作，（没输或者输入的都是空格），所以先trim一下
    if(content.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: '',
      })
      return
    }
    //2.加载动画
    wx.showLoading({
      title: '发布中',
      mask: true,
    })

    //3.上传文件
    let promiseArr = [] //promise数组
    let fileIds = []  //返回的文件id数组
    //循环遍历图片数组，上传（云存储的API只能上传单个文件）
    for(let i = 0, len = this.data.images.length; i < len; i++) {
      //每次上传操作都要创建一个异步对象，resolve为成功，reject为失败
      let p = new Promise((resolve,reject) => {
        //从数组中取出当前需要上传的文件
        let item = this.data.images[i]
        //正则表达式，取出文件扩展名，你也可以用其他方法，这里只是为了强化正则
        let suffix = /\.\w+$/.exec(item)[0]
        console.log(suffix)
        //调用云开发的文件上传API，需要传：云端文件存储路径（这里在云存储创建blog目录，将图片都上传到该目录），以及本地文件路径
        //为了避免重复的文件名覆盖前面文件，这里对文件的文件名做了时间戳和随机数的拼接，扩展名保留原扩展名
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix,
          filePath: item,
          success: (res) => {
            //上传成功的回调，拿到上传后的文件ID
            console.log(res.fileID)
            //追加到文件id数组里
            fileIds = fileIds.concat(res.fileID)
            //继续下一个异步任务
            resolve()
          },
          //失败的处理
          fail: (err) => {
            console.error(err)
            reject()
          }
        })
      })
      //将异步任务推入异步任务数组
      promiseArr.push(p)
    }

    //存入到云数据库
    //promise.all的resolve回调执行是在所有输入的promise的resolve回调都结束
    Promise.all(promiseArr).then((res) => {
      //操作云数据库的blog集合，执行新增操作
      db.collection('blog').add({
        data: {
          ...userInfo, //使用延展操作符... 取得userInfo对象的所有属性（昵称、头像）
          content, //文字内容
          imgs: fileIds, //文字id处理
          createTime: db.serverDate(),
        }
      }).then((res) => {
        console.log(res) 
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        //返回blog页面，并且刷新
        wx.navigateBack()
        const pages = getCurrentPages()
        //取到上一个页面
        const prevPage = pages[pages.length - 2]
        prevPage.onPullDownRefresh()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
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