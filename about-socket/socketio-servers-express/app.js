const app = require("express")()
const server = require("http").createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})
io.on("connection", socket => {
  console.log("一名用户已连接")
  socket.emit("msg", { msg: "通过express已连接" })
  socket.on("client send", data => console.log(data))
})
server.listen(3000, () => {
  console.log("请打开 localhost://3000")
})
