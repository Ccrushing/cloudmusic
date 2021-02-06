Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },

  options: {
    //子组件就可以使用app引入的iconfont样式了
    styleIsolation:'apply-shared',
    //可以使用多个插槽
    multipleSlots:true,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(){
      this.setData({
        modalShow:false,
      })
    },
  }
})
