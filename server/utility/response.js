const response=(success=false,message="",data=[])=>{
    if(success==false && message.length==0){
        message="technical error";
        }

    return {data,success,message};
};
module.exports=response;