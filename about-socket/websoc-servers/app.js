const app = require("express")();
const http = require("http").Server(app)
// 导入nodejs websocket 包
const ws = require("nodejs-websocket")
let count = 0
// 每次只要有用户连接 就会创建一个connect对象
const server = ws.createServer(connect => {
  count++;
  connect.userName = `用户${count}`
  console.log("用户已连接")
  broadcast(connect.userName+ "进入聊天室")
  // 当用户传递数据text事件就会触发
  connect.on("text", data => {
    console.log("接收到了数据", data)
    // 给用户一个响应的数据
    broadcast(data)
  })
  /**
   * 链接断开事件 当用户断开连接就会触发该事件
   * ! 注意 当用户断开连接 而后端没有error事件就会进行报错
   */
  connect.on("close", () => {
    broadcast(connect.userName + "离开了")
    console.log(connect.userName + "离开了")
  })
  // 用户链接异常事件
  connect.on("error", () => {
    console.log("用户链接异常")
  })
})
// 定义广播函数给所有人发送消息
const broadcast = (msg) => {
  // server.connections 表示当前所有连接服务器的用户
  server.connections.forEach(item => {
    item.send(msg);
  })
}
server.listen(3000, () => {
  console.log("请使用 ws://localhost:3000 打开端口")
})