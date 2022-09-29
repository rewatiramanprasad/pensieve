const data=require('./config/config.json');
const userRouter=require('./user/router')
const dashRouter=require('./dashboard/router')
const express=require('express');
const app=express();

app.use(express.json());
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers',
'Origin,X-Requested-With,Content-Type,Accept,Authorization');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
next();
})
app.use(userRouter);
app.use(dashRouter);








app.listen(process.env.PORT||data['port'],()=>{
    console.log(`server is runing at ${process.env.Port||data['port']}`);
});