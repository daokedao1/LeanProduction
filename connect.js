var express=require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const router = express.Router();

const option = {
    host: '39.98.215.185',
    user: 'leanproduction',
    password: 'zzy123456',
    port: '3306',
    database: 'leanproduction',
    connectTimeout: 5000, //连接超时
    multipleStatements: false //是否允许一个query中包含多条sql语句
}



//创建app应用，相当于=>Node.js Http.createServer();
var app=express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}))

app.use('/public',express.static(__dirname+'/dist'))

let pool;
repool()
// 断线重连机制
function repool() {
    // 创建连接池
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数（0为不限制）
    })
    pool.on('error', err => {
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
    })
    app.all('*', (_,__, next) => {
        pool.getConnection( err => {
            err && setTimeout(repool, 2000) || next()
        })
    })
}

function Result ({ code = 200, msg = '成功', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}
module.exports = { app, pool, Result, router }
