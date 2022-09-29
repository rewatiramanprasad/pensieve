const { query } = require("../utility/db");
const express = require("express");
const dasRouter = express.Router();
const response = require("../utility/response");
const {getAll,getDetails}=require('./sqlController');
dasRouter.get("/gps/summary", async (req, res) => {
    // console.log(req);
    // const page=parseInt(req.query.page);
    // const limit=parseInt(req.query.limit);
    // let sort=req.query.sort ||"";
    // let deviceId=req.query.deviceId ||"";
    // let deviceType=req.query.deviceType||"";
    // const startIndex=(page-1)*limit;
    // const endIndex=page*limit;


  let result = await getAll() ;
  //result=result.slice(startIndex,endIndex);
  res
    .status(200)
    .send(response(true, "fetching data successful", result))
    .end();
});

dasRouter.get('/gps/details',async(req,res)=>{
    const deviceId=req.query.deviceId;
    const deviceType=req.query.deviceType;
    console.log(deviceId);
    console.log(deviceType);
    
    const result=await getDetails(deviceId ,deviceType);
    res
    .status(200)
    .send(response(true,"Data fetch successfuly",result))
    .end();
})

module.exports = dasRouter;
