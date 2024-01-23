import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
// import { emit } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname+"/public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('move', (idm)=>{
        socket.broadcast.emit('move', idm)
    })

    socket.on('reset', ()=>{
        socket.broadcast.emit('reset')
    })

  });

server.listen(4000, ()=>{
    console.log("RUNNING ON PORT: %d", 4000);
})