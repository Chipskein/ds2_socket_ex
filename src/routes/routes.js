const { Router }=require('express');
const router=Router();
router.get('/room',(req,res,next)=>{
    return res.redirect('/room.html');
});
module.exports=router