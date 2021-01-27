// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'crush-6g9y7twuc24db157'
})

const db = cloud.database()

const playListCollection = db.collection('playlist')

exports.main = async (event, context) => {
  const res = await playListCollection.get()
  console.log('######' + res.data)
  return res.data
}
