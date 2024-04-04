const mongoose = require("mongoose");
const {Schema}=mongoose;

const studentSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    basicInfo: {
        type: {
            name: {
                type: String,
                required: [true, 'Name is required'],
                minLength: [2, 'Name must be at least 2 characters long'],
                maxLength: [50, 'Name must not exceed 50 characters'],
                match: [/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces']    
            },
            photo: {
                type: String,
                required: [true, 'Photo is required']
            },
            dob: {
                type: Date,
                required: [true, 'DOB is required']
            },
            phone: {
                type: String,
                required: [true, 'Phone Number is required'],
                validate: {
                    validator: function(val) {
                        return val.length === 10;
                    },
                    message: 'Invalid phone number. It must contain exactly 10 digits.'
                }    
            },
            email: {
                type: String,
                required: [true, 'Email is required'],  
            },
            address: {
                type: String,
                required: [true, 'Address is required']
            },
            jobRole: {
                type: String,
                required: [true, 'Job Role is required']
            },
            careerObjective: {
                type: String,
                required: [true, 'Career Objective is required']
            },
            linkedIn: {
                type: String,
                required: [true, 'LinkedIn is required']
            },
            github: {
                type: String,
                required: [true, 'GitHub is required']
            },
            leetcode: {
                type: String,
            },
            hackerrank: {
                type: String,
            },
            hackerearth: {
                type: String,
            },
            codechef: {
                type: String,
            },
            codeforces: {
                type: String,
            },
            geeksforgeeks: {
                type: String,
            },
        },
        default: null
	},
    academicInfo: {
        type: [{
            degreeName: {
                type: String,
                required: [true, "Degree Name is required"]
            },
            board: {
                type: String,
                required: [true, "Board is required"]
            },
            instituteName: {
                type: String,
                required: [true, "Institue Name is required"]
            },
            place: {
                type: String,
                required: [true, "Place is required"]
            },
            score: {
                type: Number,
                required: [true, "Score is required"]
            },
            startYear: {
                type: Number,
                required: [true, "Start Year is required"]
            },
            endYear: {
                type: Number,
                required: [true, "End Year is required"]
            },
	    }],
        default: () => null,
    },
	projects: {
        type: [{
            title: {
                type: String,
                required: [true, "Project Title is required"]
            },
            description: {
                type: String,
                required: [true, "Description is required"]
            },
            technologies: {
                type: [String],
                default: [],
                validate: {
                    validator: function(technologies) {
                        return technologies.length > 0;
                    },
                    message: 'At least one technology must be specified'
                }
            },
            demoLink: {
                type: String,
                required: [true, "Demo Link is required"]
            },
            sourceCodeLink: {
                type: String,
                required: [true, "Source Code Link is required"]
            },
            applicationLink: {
                type: String,
                required: [true, "Application Link is required"]
            }
        }],
        default: () => null,
    },
	skills: {
        type: [{
            name: {
                type: String,
                required: [true, "Name is required"]
            },
            completedAssignments: {
                type: Number,
                required: [true, "Completed Assignments is required"]
            },
            assignmentsScore: {
                type: Number,
                required: [true, "Assignments Score is required"]
            },
            assessmentsScore: {
                type: Number,
                required: [true, "Assessments Score is required"]
            },
            overallScore: {
                type: Number,
                required: [true, "Overall Score is required"]
            },
	    }],
        default: () => null,
    },
	certifications: {
        type: [{
		    name: {
                type: String,
                required: [true, "Certificate Name is required"]
            },
		    organisation: {
                type: String,
                required: [true, "Organisation is required"]
            },
	    }],
        default: () => null,
    },
	achievements: {
        type: [String],
        default: () => null,
    },
	hobbies: {
        type: [String],
        default: () => null,
    },
	gradiousFeedback: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Student = mongoose.model("students", studentSchema);

module.exports = Student;