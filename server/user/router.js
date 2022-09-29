const express=require('express');
const {queryWithPara}=require('../utility/db');
const crypto=require('crypto-js');
const response = require('../utility/response');
const router=express.Router();



router.post('/signup',async(req,res)=>{
let user=req.body.email;
let password=req.body.password;
console.log(req);
console.log(user,password);
let decPassword=crypto.MD5(password);
let result=await queryWithPara(`insert into login(username,password) values(?,?)`,[user,""+decPassword]);
console.log(decPassword+"");
console.log(result)
if(result.affectedRows==1){
    res.status(200).send(response(true,"insert successfully")).end();
}else{
    res.status(200).send(result).end();
}


});

router.post('/login',async(req,res)=>{
let user=req.body.email;
let password=req.body.password;
let userCheck=await queryWithPara(`select * from login where username=? `,[user]);
console.log(userCheck);
let result={};
let status=400;
if(userCheck.length==1){
    let passwordMd5=crypto.MD5(password)+"";
    console.log(passwordMd5,userCheck[0].password);
    if(passwordMd5===userCheck[0].password){
        result=response(true," login successful");
        status=200;
    }else {
        result=response(false,"wrong combination of user and password");
    }
}else{
    result=response(false,"wrong combination of user and password");
}
res.status(status).send(result).end();
});



module.exports=router;