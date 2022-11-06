const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const usermodel= require("../Models/user")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");


const {JWT_SECRET} = require("../keys")

router.get("/",(req,res)=>{
    res.send("hello world")
})

router.post('/signup',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add all fields"})
    }
    usermodel.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exits"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new usermodel({
                email,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })

        })
        
})

router.post('/signin',(req,res)=>{
    const {email,password}= req.body
    console.log(req.body)
    if(!email || !password){
        return res.status(422).res.json({error:"please add all fields"})
     }
     usermodel.findOne({email:email})
     .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"please enter valid info"})
       }
       bcrypt.compare(password,savedUser.password)
       .then(match=>{
        if(match){
            // 
            const token = jwt.sign({id:savedUser.id},JWT_SECRET)
            res.json({message:"success",token})
            
        }else{
            return res.status(422).json({error:"please enter valid info"})
        }
       })
       .catch(err=>{
        console.log(err)
       })
     })
})

module.exports = router;