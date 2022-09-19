//setting up the server

const express = require('express');// create an express server
const app = express(); //runs the express function


const { v4: uuidV4 } = require('uuid');//importing v4 version of uuid
//uuid would generate random ids for the rooms


const server = require('http').Server(app); //setting up express server to be used with further libraries
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});//importing socket.io


const { ExpressPeerServer } = require('peer');//imported peer
const peerServer = ExpressPeerServer(server, {
  debug: true
});


app.use('/peerjs', peerServer);//specific peer which url we are using


app.set('view engine', 'ejs');//our view engine is going to be ejs
app.use(express.static('public')); //static folder in public url

app.get('/', (req, res) => {
  res.render('home') //redirect to a page with a new gennerated id
})


app.get('/login', (req, res)=>{
  res.render('login') //redirect to a page with a new gennerated id
 })

app.get('/room', (req, res)=>{
  res.redirect(`/${uuidV4()}`) //redirect to a page with a new gennerated id
 })

app.get('/:room', (req, res) => {
res.render('room', { id_of_the_room: req.params.room }) //passed id to the front end
})


io.on('connection', socket => {
  socket.on('joining-the-room', (id_of_the_room, userId, userName) => {
    // console.log("joined room");
    socket.join(id_of_the_room);//joined the room on that specific id
    socket.to(id_of_the_room).emit('user-is-connected', userId);//telling everyone that a user has been connected

    socket.on('disconnect', () => {
      socket.to(id_of_the_room).emit('user-is-disconnected', userId);
      // console.log('disconnectedd')

    })
    socket.on('message', (message) => { //listen for the message
      //send message to the same room in front end
      io.to(id_of_the_room).emit('create-a-Message', message, userName)
    });

  })
});

server.listen(process.env.PORT || 3010); //server will be a local host andd the port will be 3010 

