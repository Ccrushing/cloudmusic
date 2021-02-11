// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  //获得微信上下文
  const wxContext = cloud.getWXContext()
  //生成小程序码
  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID,
  })
  // console.log(result);
  //将小程序图片上传到云储存
  const upload = await cloud.uploadFile({
    cloudPath:'qrcode/' + Date.now() + '-' +Math.random() + '.png',
    fileContent: result.buffer
  })
  return upload.fileID
}