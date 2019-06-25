const express = require("express")
const bodyParser = require("body-parser")
const Users = require('./schema/users')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())    //为了显示得到传入的用户名和密码,没这句的话,结果是空对象

app.use('/login',(req,res) => {
  let {username,password} = req.body
  Users.findOne({
    username,
    password
  }).then(user => {
    if(user){   //如果找到用户,则登录成功,返回0
      res.send({
        errno:0
      })
    }else{    //如果没找到用户,则登录失败,返回1
      res.send({
        errno:1
      })
    }
  })
})

app.use('/register',(req,res) => {
  let {username,password} = req.body
  Users.findOne({
    username
  }).then(user => {
    if(user){   //注册时,如果用户存在,不可以重复注册,返回1
      res.send({
        errno:1
      })
      return
    }else{    //注册时,如果用户不存在,可以重复注册,返回0.并且保存注册信息和随机生成20-40的年龄
      res.send({
        errno:0
      })
      new Users({   //保存注册成功的用户信息数据
        username,
        password,
        age: ~~(Math.random()*20+20)
      }).save()
    }
  })
})

app.get("/userlist",(req,res) => {
  Users.find().then(users => {
    res.send(users)
  })
})

mongoose.connect('mongodb://localhost:27018/vuex',{useNewUrlParser:true},(err)=>{
  if(err){
    console.log("数据库连接失败");
    return
  }
  app.listen(3000,() => {
    console.log('3000端口成功监听')
  })
  console.log("数据库连接成功");
})
