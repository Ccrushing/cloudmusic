let userInfo = {} //用户信息
const db = wx.cloud.database() //引入云数据库
Component({
  properties: {
    blogId: String, //博客id
    blog: Object, //博客对象
  },
  options: {
    styleIsolation: 'apply-shared', //可以使用外部样式
  },
  data: {
    loginShow: false, //登录组件是否显示
    modalShow: false, //底部弹出层是否显示
    content: '', //评论内容
  },

  methods: {
    //获取textare内容
    onInput(event) {
      this.setData({
        content: event.detail.value
      })
    },
    onComment(){
      //判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res) => {
                userInfo = res.userInfo
                //显示评论弹出层
                this.setData({
                  modalShow:true,
                })
              }
            })
          }else {
            //显示授权登录弹出层
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },
    onLoginsuccess(event) {
      userInfo = event.detail
      //授权框消失，评论框显示
      this.setData({
        loginShow:false,
      }), () => {
        this.setData({
          modalShow:true,
        })
      }
    },
    onLoginfail() {
      wx.showModal({
       title:'授权用户才能进行评价',
       content: '',
      })
    },
    onSend(event) {
      console.log(event) 
      //评论内容插入数据库
      let content = this.data.content
      console.log(content)
      if(content.trim() == '') {
        wx.showModal({
          title:'评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title:'评论中',
        mask:true,
      })
      //需要先在云数据库创建blog-comment集合
      //写入内容为评论人昵称、头像、评论内容，使用服务器时间，需要传当前博客的id
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId:this.properties.blogId,
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        }
      }).then((res) => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        //评论弹框消失，内容清空
        this.setData({
          modalShow:false,
          content:'',
        })
      })
    },
  }
})
                
  
           
