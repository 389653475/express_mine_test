const express=require('express')
const  app= express();
const mysql =require('mysql')
const config = {
    host: 'localhost',
    user: 'root',
    password: '20020120zyc',
    database: 'testdata'
};

app.use( ( req,res,next)=>{
        console.log('登录界面服务器启动')
         next();
    }
)
app.get('/server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    let pool = mysql.createPool(config);//连接池 连接上指定库
    //从页面获取到数据
    const q=request.query
    //创建一个json对象
    const table_name=q.name
    const submit=q.submit
    const table_time=q.time
    let Insert_sql = `insert into work_about_login_mine set ? `//向mysql中插入语句
    let sql_param={name:table_name,time:table_time,content:submit}
    pool.getConnection((err, connection) => {//连接返回的回调函数
        if (err) {
            console.error(err)
        } else {
            connection.query(Insert_sql,sql_param, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    response.send(result)
                }
            })
        }
    })
    // const data={
    //     'name':table_name,
    //     'time':table_time,
    //     'content':submit
    // }
    // response.send(data);
});
app.get('/mysql',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');

    let pool = mysql.createPool(config);//连接池 连接上指定库
    let sql = 'select * from work_about_login_mine'//向mysql中插入语句
    pool.getConnection((err, connection) => {//连接返回的回调函数
        if (err) {
            console.error(err)
        } else {
            connection.query(sql, (err, result) => {//使用查询语句
                if (err) {
                    console.error(err)
                } else {
                    response.send(result) //发送得到的结果
                }
            })
        }
    })

});
app.listen(8000,()=>{
    console.log("服务已经启动 8000，端口监听中");
});