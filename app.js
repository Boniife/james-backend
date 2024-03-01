var createError = require('http-errors');
var express = require('express');
var path = require('path');
const http = require('http');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { Server } = require('socket.io');

var cors = require('cors');
var formRouter = require('./src/routes/form');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var projectRouter = require('./src/routes/project');

var app = express();

mongoose.connect(
  'mongodb+srv://boniife:adajane2000@cluster0.induqot.mongodb.net/genius?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  { useCreateIndex: true },
  { useUnifiedTopology: true }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   express.static(
//     path.join(__dirname, "/frontend/src/components/contact/Contact.jsx")
//   )
// );
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/form', formRouter);
app.use('/post', projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb connection successful');
});

server.listen('3001', () => {
  console.log('server running on port 3001');
});

module.exports = app;
