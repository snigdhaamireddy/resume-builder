const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [50, "Name must not exceed 50 characters"],
      match: [/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [{ validator: validator.isEmail, msg: "Invalid email" }],
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return /^[a-zA-Z]{4}\d{4}$/.test(password);
            },  
            message: 'Password must be at least 8 characters long, contain at least one letter and number'
        }
    },
    role: {
        type: String,
		enum: ["admin", "student"],
        required: true,
        default: "student"
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
    isDeleted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre(
  "save",
  function (next) {
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err);
          this.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
