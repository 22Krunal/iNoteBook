const express=require('express');
const User=require('../models/User');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET="Krunaliscoolb$oy ";
//Route1: create a user using :POST: "/api/auth/createuser".Doesn't requrie auth

router.post('/createuser',[body('email','Enter a valid Email').isEmail(),
body('name','Enter a valid name').isLength({min:3}),
body('password','Password must contain six charcters').isLength({min:6})],async (req,res)=>{
    // console.log(req.body);
    let success=false;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // const user=User(req.body);
    // user.save();
    try{

   let user= await User.findOne({email:req.body.email});
   if(user) {
       success=false;
       return res.status(400).json({success,error:"Sorry a user with this email already exists"})
   }
   const salt= await bcrypt.genSalt(10);
   secpass= await bcrypt.hash( req.body.password,salt);
    user=await User.create({
        name:req.body.name,
        password:secpass,
        email:req.body.email,
    });
    const data={
        user:{
            id:user.id
        }
    }
  const authtoken=  jwt.sign(data,JWT_SECRET);
//   console.log(jwtData);
    // .then(user=>res.json(user)).catch((error)=>{console.log(error);
    // res.json({error:'Please enter a unique value for email'})});
    // res.send(req.body);
    success=true;
    res.json({success,authtoken});
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

//Route 2:authenticate a user using:POST"/api/auth/login".
router.post('/login',[body('email','Enter a valid Email').isEmail(),
body('password','password cannot be blank').exists(),],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
   const {email,password}=req.body;
   try{
let user= await User.findOne({email});
 if(!user){
   success=false;
     return res.status(400).json({success,error:'Please try to login with correct credentials'});
    }
  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
      success=false;
    return res.status(400).json({success,error:'Please try to login with correct credentials'});
      
  }
  const data={
      user:{
          id:user.id
      }
    }
    success=true;
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({success,authtoken});
   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
})
// Route 3:get lggedin user details using :POST"/api/auth/getuser".loin reqired
router.post('/getuser',fetchuser,async (req,res)=>{

try{
 userID=req.user.id;
 const user=await User.findById(userID).select("-password");
 res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports=router;