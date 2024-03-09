const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    basicInfo: {
		name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [2, 'Name must be at least 2 characters long'],
            maxLength: [50, 'Name must not exceed 50 characters'],
            match: [/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces']    
        },
		photo: {
            type: String,
            required: true
        },
		dob: {
            type: Date,
            required: true
        },
		phone: {
            type: Number,
            required: true,
            validate: {
                validator: function(val) {
                    return val.toString().length === 10;
                },
                message: 'Invalid phone number. It must contain exactly 10 digits.'
            }    
        },
		email: {
            type: String,
            required: true,
            unique: true,
            validate: [
                { validator: validator.isEmail, msg: 'Invalid email' }
            ]    
        },
		address: {
            type: String,
            required: true
        },
		jobRole: {
            type: String,
            required: true
        },
		careerObjective: {
            type: String,
            required: true
        },
		linkedIn: {
            type: String,
            required: true
        },
		github: {
            type: String,
            required: true
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
        codeForces: {
            type: String,
        },
        geeksForGeeks: {
            type: String,
        },
	},
    academicInfo: {
        type: [{
            degreeName: {
                type: String,
                required: true
            },
            board: {
                type: String,
                required: true
            },
            instituteName: {
                type: String,
                required: true
            },
            place: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            startYear: {
                type: Number,
                required: true
            },
            endYear: {
                type: Number,
                required: true
            },
	    }],
        default: [],
        validate: {
            validator: function(academicInfo) {
                return academicInfo.length >= 3;
            },
            message: '10th, 12th and Graduation details must be specified'
        }
    },
	projects: {
        type: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
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
                required: true
            },
            sourceCodeLink: {
                type: String,
                required: true
            },
            applicationLink: {
                type: String,
                required: true
            }
        }],
        default: [],
        validate: {
            validator: function(projects) {
                return projects.length > 0;
            },
            message: 'At least one project must be specified'
        }
    },
	skills: {
        type: [{
            name: {
                type: String,
                required: true
            },
            completedAssignments: {
                type: Number,
                required: true
            },
            assignmentsScore: {
                type: Number,
                required: true
            },
            assessmentsScore: {
                type: Number,
                required: true
            },
            overallScore: {
                type: Number,
                required: true
            },
	    }],
        default: [],
        validate: {
            validator: function(skills) {
                return skills.length > 0;
            },
            message: 'At least one skill must be specified'
        }
    },
	certifications: {
        type: [{
		    name: {
                type: String,
                required: true
            },
		    organisation: {
                type: String,
                required: true
            },
	    }],
        default: [],
    },
	achievements: {
        type: [String],
        default: [],
    },
	hobbies: {
        type: [String],
        default: [],
    },
	gradiousFeedback: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Student = mongoose.model("students", studentSchema);

module.exports = Student;