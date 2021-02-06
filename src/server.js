//const express = require('express');
//const app = express();
//const mongoose = require('mongoose');
//const cors = require('cors');
//const path = require("path");
//const routes = require('./router');
//const PORT = process.env.port || 8000 ;
//const http = require('http')
//const socketio = require('socket.io')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./router')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const PORT = process.env.PORT || 8000

const app = express()
const server = http.Server(app)
const io = socketio(server,
{
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"],
	  credentials: true
	}
  });

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(error)
}
const connectUsers = {}
io.on('connection', socket => {
	const { user } = socket.handshake.query
	connectUsers[user] = socket.id
    // console.log(connectUsers);
})

app.use((req, res, next) => {
	req.io = io
	req.connectUsers = connectUsers
	// console.log("i am here ");
	return next()
})
app.use(cors())
app.use(express.json())
app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

server.listen(PORT , () => 
{
    console.log(`listenning to port ${PORT}`)
})

