let keyword = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type:String,
      value: '请输入关键字'
    }
  },
  externalClasses: [
    'iconfont',
    'icon-sousuo'
  ],

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event){
      keyword = event.detail.value
    },
    onFoucs(event){
      this.setData({
        inputValue: ''
      })
    },
    onSearch(){
      console.log(keyword)
      this.triggerEvent('search',{
        keyword
      })
    },
  }
})
