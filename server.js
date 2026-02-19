const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const os = require("os");
const path = require("path")
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const Url = "public/views";



//app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


// Get local IP dynamically
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address;
    }
  }
}
const IP = getLocalIP();
console.log(IP)

//console.log("Server IP (dynamic):", IP);
io.on("connection", socket => {
  console.log("User connected:", socket.id

  );
  socket.on("message", msg => io.emit("message", msg));
  socket.on("disconnect", () => console.log("User disconnected",socket.id));
});
 /* app.get("/", (req, res) => {
    if (err) return res.status(500).send("Error reading file");
    res.send('data'); // send file content as text
}); */
 
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/views", "index.html"));
    //res.send("addmin")
});
app.get("/index",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "index.html"));
    console.log(req)
});
app.get("/@sandip",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "main.html"));
});
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, `index.html`));
    // console.log('home',req.url);
//     console.log('home',req.method);
//     console.log('home',req.statusCode);
    //url: '/home',method: 'GET', statusCode: null,
});
app.get("/profile",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, `profile.html`));
    //console.log('profile');
});
app.get("/Live",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, `Live.html`));
    //console.log('Live');
});
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, `about.html`));
    //console.log('about');
});
app.get("/home/:addmin",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "addmin.html"));
    console.log('addmin',req.params.addmin);
});
app.get("/home/:addmin/:user",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "users.html"));
    console.log('user',req.params.user);
});
app.get("/home/:addmin/:user/:login",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "login.html"));
    console.log('login',req.params.login); 
});


app.get("/home/:addmin/:user/:login/:profile",(req,res)=>{
    res.sendFile(path.join(__dirname, Url, "profile.html"));
    console.log('profile',req.params.profile);
}); 

//app.get("")

server.listen(3000, () =>
 // console.log(__dirname)
  console.log(`Server running at http://localhost:3000`)
);

// server.listen(3000, () =>
//   console.log(`Server running at http://${IP}:3000`)
// );
 
 
