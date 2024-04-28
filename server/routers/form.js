const express = require("express");
const Student = require("../models/students");

const router = express.Router();

router.route("/").post(async (req, res) => {
    try{
        if(req.body.sectionName === "academicInfo" && req.body.data.length < 3){
            return res.status(404).send({
                status: 404,
                message: "Invalid data",
                errors: ["10th, 12th and graduation details must be specified"]
            })
        }
        if(req.body.sectionName === "projects" && req.body.data.length < 1){
            return res.status(404).send({
                status: 404,
                message: "Invalid data",
                errors: ["Atleast one project must be specified"]
            });
        }
        if(req.body.sectionName === "basicInfo"){
            const data = req.body.data;
            if(!(data.leetcode || data.hackerrank || data.hackerearth || data.codechef || data.codeforces || data.geeksforgeeks)){
                return res.status(404).send({
                    status: 404,
                    message: "Invalid data",
                    errors: ["Atleast one coding platform account must be specified"]
                });
            }
        }
        const student = await Student.findOne({ userID: req.body.userID });
        try{
            if(student) {
                await Student.findOneAndUpdate({ userID: req.body.userID }, { [req.body.sectionName]: req.body.data }, { runValidators: true });
            } else {
                const newStudent = new Student({ userID: req.body.userID, [req.body.sectionName]: req.body.data });
                await newStudent.save();
            }
            return res.status(200).send({
                status: 200,
                message: `${req.body.sectionName} details submitted successfully`
            });
        } catch(error) {
            console.log(error);
            const errorMessages = Object.values(error.errors).map(error => error.properties.message);
            console.log(errorMessages);
            return res.status(404).send({
                status: 404,
                message: 'Invalid values',
                errors: errorMessages
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error',
            errors: ["There is an issue with server. Couldn't submit data."]
        });
    }
});

router.route("/:id").get(async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findOne({ userID: id });
        return res.status(200).send({
            status: 200,
            message: "Data fetched successfully",
            data: student
        });
    } catch(error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;