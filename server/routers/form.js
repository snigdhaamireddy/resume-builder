const express = require("express");
const Student = require("../models/students");

const router = express.Router();

router.route("/").post(async (req, res) => {
    try{
        console.log(req.body);
        if(req.body.sectionName === "projects"){
            const data = req.body.data;
            data.forEach(ele => {
                ele.technologies = JSON.parse(ele.technologies);
            });
            req.body.data = data;
            console.log(req.body);
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

module.exports = router;