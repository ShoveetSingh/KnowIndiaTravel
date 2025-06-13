// .. code to handle the callback.

//In the callback route, exchange the auth code for a session and set it as a cookie

const express = require('express')
const router = express()

router.get("/signup",async(req,res)=>{

const {jws} = req.body.params;

if(!jws)
   return  res.status(400).json({'message':'verifcation error!'});

console.log(jws);


//cookies & sessions.



res.send('message : Email Verified!');

})

module.exports = router