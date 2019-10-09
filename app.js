
const { app, pool, Result } =require('./connect')

app.get('/', (req, res) => {
    res.redirect('/public');
})
//alarmsetting
app.get('/api/alarmsetting/list', (req, res) => {
  pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM alarmsetting", (e, r) => {
            if(!e){
                res.json(new Result({ data: r }))
            }else{
              res.json(new Result({ code:'-1',msg:e,data: r }))
            }

        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

})
app.get('/api/alarmsetting/add', (req, res) => {
    if(!e){
        res.json(new Result({ data: r }))
    }else{
      res.json(new Result({ code:'-1',msg:e,data: r }))
    }
})
app.get('/api/alarmsetting/updatebynid', (req, res) => {
    console.log(req.query);

        let sql = buildUpdataSql('alarmsetting',req.query,{nodeid:req.query.nodeid})
        console.log(sql)
        pool.getConnection((err, conn) => {
              conn.query(sql, (e, r) => {
                  if(!e){
                      res.json(new Result({ data: r }))
                  }else{
                    res.json(new Result({ code:'-1',msg:e,data: r }))
                  }

              })
              pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
          })

})
//alarmlog
app.get('/api/alarmlog/list', (req, res) => {
  pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM alarmlog", (e, r) => {
            if(!e){
                res.json(new Result({ data: r }))
            }else{
              res.json(new Result({ code:'-1',msg:e,data: r }))
            }

        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

})
app.get('/api/alarmlog/add', (req, res) => {
    console.log(req.query);
    let {nodeid,nodename,name,key,curvalue,bzvalue,date} = req.query;
    let param = [nodeid,nodename,name,key,curvalue,bzvalue,date];
    console.log(param)
    let sql = 'INSERT INTO `leanproduction`.`alarmlog`( `nodeid`, `nodename`, `name`, `key`, `curvalue`, `bzvalue`, `date`) VALUES (?,?,?,?,?,?,? );'
    pool.getConnection((err, conn) => {
          conn.query(sql,param, (e, r) => {
              if(!e){
                  res.json(new Result({ data: r }))
              }else{
                res.json(new Result({ code:'-1',msg:e,data: r }))
              }

          })
          pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
      })
})
app.get('/api/alarmlog/updatebynid', (req, res) => {
    console.log(req.query);

    let sql = buildUpdataSql('alarmlog',req.query,{nodeid:req.query.nodeid})
    pool.getConnection((err, conn) => {
          conn.query(sql, (e, r) => {
              if(!e){
                  res.json(new Result({ data: r }))
              }else{
                res.json(new Result({ code:'-1',msg:e,data: r }))
              }

          })
          pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
      })
    res.json(new Result({ data: req.query }))
})

let buildUpdataSql = (table,param,fiter)=>{
    let str = 'UPDATE '+table+' SET ';
    let arr = []
    Object.keys(param).forEach((v,i)=>{
      if(v != Object.keys(fiter)[0]){
        arr.push(v+'='+param[v]+' ')
      }

    })
    str+= arr.join(',')
    str += 'where nodeid ='+fiter[Object.keys(fiter)[0]];
    return str;
}
app.listen(80,()=>{
    console.log("servering");
});
