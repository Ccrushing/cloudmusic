import formatTime from '../../utils/formatTime.js'

// components/blog-card/blog-card.js
Component({
  properties: {
    blog: Object
  },

  observers: {
    ['blog.createTime'](val) {
      if (val) {
        //console.log(val)
        this.setData({
          _createTime: formatTime(new Date(val))
        })
      }
    }
  },

  data: {
    _createTime: ''
  },

  methods: {
    onPreviewImage(event) {
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current:ds.imgsrc,
      })
    }
  }
})
