Component({
  properties: {
    modalShow: Boolean
  },
 
  data: {

  },

  methods: {
    onGotUserInfo(event) {
      console.log(event)
      const userInfo = event.detail.userInfo
      //允许授权
      if(userInfo){
        this.setData({
          modalShow:false
        })
        this.triggerEvent('loginsuccess',userInfo)
      }else{
        this.triggerEvent('loginfail')
      }
    }
  }
})
