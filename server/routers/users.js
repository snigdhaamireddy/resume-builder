const express=require('express');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;   
const User = require('../models/users');
const Student=require('../models/students');
const Batchmembers=require('../models/batch_members');
const nodemailer= require('nodemailer');
require('dotenv').config();
const router=express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
async function getUserRole(id){
    const userLoggedIn= await User.findOne(new ObjectId(id));
    return userLoggedIn.role;
}

router.put("/:id",async(req,res)=>{
    try {
        //checking for role of user who is editing
        if(await getUserRole(req.body.id)==='admin'){
            //Updating in User Schema
            await User.findByIdAndUpdate(req.params.id, req.body); 
            //Updating name email and phone in student schema
            const filter = { userID: req.params.id };
            await Student.findOneAndUpdate(filter,
            {
                $set:{
                    'basicInfo.name': req.body.name,
                    'basicInfo.email': req.body.email,
                    'basicInfo.phone': req.body.phoneNumber,
                }
            })
            return res.status(200).send({
                status: 200,
                message: "Edited Succesfully"
            });
        }
        else{
            return res.status(403).send({
                status: 403,
                message: "Access Denied"
            })
        }
    } catch (error) {   
        res.status(500).send({
            status:500,
            message:"Internal Server Error"
        });
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        //checking for role of user who is editing
        if(await getUserRole(req.body.id)==='admin'){
            //soft deleting in users table
            await User.findByIdAndUpdate(req.params.id,{isDeleted:true});
            // //soft deleting in students table
            await Student.findByIdAndUpdate(req.params.id,{isDeleted:true});
            return res.status(200).send({
                status: 200,
                message: "Deleted Succesfully"
            });
        }
        else{
            return res.status(403).send({
                status: 403,
                message: "Access Denied"
            })
        }
    } catch (error) {   
        res.status(500).send({
            status:500,
            message:"Internal Server Error"
        });
    }
})

router.post("/:id",async(req,res)=>{
    try{
        const userDetails={
            name:req.body.name,
            email:req.body.email,
            password:req.body.name.replace(/ /g,"").slice(0,4)+req.body.phoneNumber.slice(-4),
            role:'student',
            phoneNumber:req.body.phoneNumber
        }
        //checking for role of user who is adding user
        if(await getUserRole(req.body.id)==='admin'){
            const newUser=new User(userDetails);
            //adding the user in User table and getting the ID
            const newUserId=await newUser.save().then(savedUser=>savedUser._id);
            const batchMembersEntry={
                userID:newUserId,
                batchID:req.params.id,
            }
            //adding entry in batch_members table using the userId and batchId
            const newBatchMembersEntry=new Batchmembers(batchMembersEntry);
            await newBatchMembersEntry.save();
            let mailOptions = {
                from:process.env.MAIL_USERNAME,
                to: req.body.email,
                subject: 'Invite to the Gradious Cohort Platform',
                html: `
                <div style="font-family: Georgia, serif; padding: 20px; background-color: #f4f4f4;">
                    <h2 style="color: #333;">Hi ${req.body.name},</h2>
                    <p style="color: #666;">We are glad to invite you to share the joy of learning and educating with Gradious.</p>
                    <p style="color: #666;">Your password is ${userDetails.password}</p>
                    <p style="color: #666;">Best regards,</p>
                    <p style="color: #666;">The Gradious Team</p>
                </div>
            `    
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            return res.status(201).send({
                status: 201,
                message: "User Created Succesfully"
            });
        }
        else{
            return res.status(403).send({
                status: 403,
                message: "Access Denied"
            })
        }
    }
    catch(error){
        res.status(500).send({
            status:500,
            message:"Internal Server Error"
        });
    }
})
module.exports=router;