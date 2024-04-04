const express=require('express')
const mongoose=require('mongoose');
const User = require('../models/users');
// const ObjectId = mongoose.Types.ObjectId;   
// const Student=require('../models/students');
// const Batchmembers=require('../models/batch_members');
// const Batch=require('../models/batches')

const router=express.Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        console.log(user);
        if(!user || user.isDeleted){
            return res.status(404).send({
                status: 404,
                message: "User Not Found"
            });
        }
        return res.status(200).send({
            status: 200,
            message: "User fetched successfully",
            data: user
        });
    } catch(error) {
        return res.status(500).send({
            status: 500,
            message: "Internal server error"
        });
    }
});

// router.get("/:id", async (req, res) => {
//     try {
//         const batchId = new ObjectId(req.params.id);
//         const batchMembers=await Batchmembers.find({batchID:batchId})
//         .populate('userID').exec();
//         const batchName=await Batch.findById(batchId);
//         let users = batchMembers.map(student=>student.userID).
//         filter(user=>user.isDeleted===false&&user.role==='student');
//         res.json(users.map(user=>({
//             id:user._id,
//             name:user.name,
//             email:user.email,
//             phoneNumber:user.phoneNumber,
//             batchName:batchName.name

//         }))); 
//     } catch (error) {   
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

// router.put("/:id",async(req,res)=>{
//     try {
//         //check role
//         //Updating in User Schema
//         await User.findByIdAndUpdate(req.params.id, req.body); 
//         //Updating name email and phone in student schema
//         const filter = { userID: req.params.id };
//         await Student.findOneAndUpdate(filter,
//         {
//             $set:{
//                 'basicInfo.name': req.body.name,
//                 'basicInfo.email': req.body.email,
//                 'basicInfo.phone': req.body.phoneNumber,
//             }
//         },{new :true})
//         res.json('Edited succesfully');
//     } catch (error) {   
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// })

// router.delete("/:id",async(req,res)=>{
//     try {
//         //check role
//         //soft deleting in users table
//         await User.findByIdAndUpdate(req.params.id,{isDeleted:true});
//         //soft deleting in students table
//         await Student.findByIdAndUpdate(req.params.id,{isDeleted:true});
//         res.json('Deleted succesfully');
//     } catch (error) {   
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// })

// router.post("/:id",async(req,res)=>{
//     try{
//         const userDetails={
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.name.slice(0,4)+'@'+req.body.phoneNumber.slice(-4),
//             role:'student',
//             phoneNumber:req.body.phoneNumber
//         }
//         const newUser=new User(userDetails);
//         //adding the user in User table and getting the ID
//         const newUserId=await newUser.save().then(savedUser=>savedUser._id);
//         const batchMembersEntry={
//             userID:newUserId,
//             batchID:req.params.id,
//         }
//         //adding entry in batch_members table using the userId and batchId
//         const newBatchMembersEntry=new Batchmembers(batchMembersEntry);
//         await newBatchMembersEntry.save();
//         res.json('User Added Succesfully');
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// })
module.exports = router;  