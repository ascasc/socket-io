const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');//解析,用req.body获取post参数
const mysql = require('mysql');
const needle = require('needle');

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const env = require('../env');
const router = require('./routes/index');

const connection = mysql.createConnection(env.db);

const urlRESTAPI = 'http://localhost:3000/IO%20Chat/API';
const options = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};

users=[];//使用者名稱
connections=[];//連線到網站的人數


app.use(bodyParser.urlencoded({ extended: false }));//路由端post
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));//ejs模板
app.set('view engine', 'ejs');

app.use('/', router);//運行路由端

io.sockets.on('connection', (socket)=>{ //socket區塊
    console.log('socket runnning...');
    connections.push(socket);
    console.log('Connected: %s socket connected', connections.length);
    socket.on('disconnect', (data)=>{//disconnect
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket Disconnected', connections.length);
    });;

    socket.on('send message', (data)=>{//send message
        Postmessage(socket.username, data);
    });

    socket.on('new user', (data, callback)=>{//login user
        if(users==data){
            callback(false);
            return false;
        }
        callback(true);
        socket.username=data;
        users.push(socket.username);
        updateUsernames();
        Getmessage();
    });
    socket.on('delete message', (data, callback)=>{//delete message
        if(data.username ==socket.username){
            needle.delete(urlRESTAPI+'/'+data.id, null, options, function(err, resp) {
                if(err) console.log(err);
                console.log('delete '+ data.username+': '+data.message);
                io.sockets.emit('new delete message', data.id);
            });
            callback(true);
        }else{
            callback(false);
            console.log('delete '+ data.username+': '+data.message+' error');
        }
    });
    socket.on('update message', (data,callback)=>{//update message
        if(data.username !==socket.username){
            callback(false);
            return false;
        }
        let message={
            message: data.message
        }
        needle.patch(urlRESTAPI+'/'+data.id, message, options, function(err, resp) {
            if(err) return false;
            console.log('patch id: '+ data.id +' username: '+ socket.username +',update:'+data.message+' ok!!');
            io.sockets.emit('new update message', data);
            callback(true);
        });
    });
});

connection.connect(function(err) {//mysql connection
    if (err) {
        console.error('mysql error');
        return;
    }
    console.log('Mysql runnning...');
});

server.listen(3000, function(){//server area
    console.log('Server running...');
});

function Getmessage(){//Get API
    needle.get(urlRESTAPI, (err, resp)=>{
        io.sockets.emit('read message',resp.body);
    });
}
function Postmessage(username,message){//Post API
    
    let post_data ={
        username: username,
        message: message
    };
    needle.post(urlRESTAPI, post_data, options, function(err, resp) {
        try{
            let data={
                id:resp.body,
                user: username,
                msg: message,
            };
            console.log(data);
            console.log('post '+resp.body+'. '+ username+': '+message);
            io.sockets.emit('new message', data);
        }catch(err){
            console.log(err);
        }
    });
}
function updateUsernames(){//get user 
    io.sockets.emit('get users', users);
}
