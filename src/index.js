const express=require('express');
const app=express();
const port=process.env.PORT || 8080;
app.get('/',(req,res)=>{
    return res.status(200).json('Running API');
});
app.listen(port,()=>console.log(`Started Server on ${port}`));