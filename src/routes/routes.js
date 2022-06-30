const { Router }=require('express');
const router=Router();
router.get('/',(req,res,next)=>{
    return res.redirect('/index.html');
});
module.exports=router