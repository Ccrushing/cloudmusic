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
    //获得关键参数
    const keyword = event.keyword
    let w = {}
    //如果关键词非空，则新建一个规则
    if(keyword.trim() != ''){
      w = {
        content: new db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    //根据创建时间降序排序排列分页查询
    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count).orderBy('createTime','desc').get().then((res) => {
      return res.data
    })
    ctx.body = blogList
  })
  //查询博客详情（同时查询出博客的评论列表）
  app.router('detail',async(ctx,next) => {
    let blogId = event.blogId
    //聚合和联表查询，将博客集合居然博客评论集合进行联表查询，匹配博客的_id和评论的blogId字段要相等
    //将博客评论表的查询查询出来取名为commentList（blogId类似外键的作用）
    const blog = await blogCollection.aggregate().match({
      _id: blogId
    }).lookup({
      from:'blog-comment',
      localField:'_id',
      foreignField:'blogId',
      as:'commentList'
    }).end()
    ctx.body = blog
  })

  //在云端取得微信上下文，从中可以获得openID
  const wxContext = cloud.getWXContext()
  //从小程序端根据openID获取博客列表
  app.router('getListByOpenid',async(ctx,next) => {
    ctx.body = await blogCollection.where({
      _openid:wxContext.OPENID
    }).skip(event.start).limit(event.count)
    .orderBy('createTime','desc').get().then((res) => {
      return res.data
    })
  })
  return app.serve()
}