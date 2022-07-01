const http = require("http");
let fs = require("fs");
const app = http.createServer();
const { Server } = require("socket.io")
// 导入io实例
app.on("request", (req, res) => {
  fs.readFile(__dirname + "/index.html", function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end("Error loading index.html")
    }

    res.writeHead(200);
    res.end(data)
  })
})
app.listen(3000, () => {
  console.log("请监听 localhost://3000")
})
// const io = require('socket.io')(app)
const io = new Server(app)
// 监听用户连接
io.on('connection', socket => {
  console.log("新用户连接")
  /**
   * 用户初次连接自动发送信息
   * socket.emit 表示触发某个事件
   * 参数1： 事件名字
   * 参数2： 事件的值
   */
  socket.emit("send", { name: "kangkang" })
  /**
   * 用户触发消息事件
   * socket.io 表示监听事件是否触发，触发后执行，事件名前后端需要保持一致
   */
  socket.on("say hi", data => {
    console.log(data)
  })
  socket.on("disconnect", () => {
    console.log("断开连接")
  })
})