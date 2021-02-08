// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const TcbRouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  //获得博客列表数据
  app.router('list',async (ctx, next) =>{
    //根据创建时间降序排序排列分页查询
    let blogList = await blogCollection.skip(event.start).limit(event.count).orderBy('createTime','desc').get().then((res) => {
      return res.data
    })
    ctx.body = blogList
  })
  return app.serve()
  
}