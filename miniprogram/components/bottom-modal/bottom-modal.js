Component({
  properties: {
    modalShow: Boolean
  },
  options: {
    //子组件就可以使用app引入的iconfont样式了
    styleIsolation:'apply-shared',
    //可以使用多个插槽
    multipleSlots:true,
  },
  data: {

  },
  methods: {
    onClose(){
      this.setData({
        modalShow:false,
      })
    },
  }
})
