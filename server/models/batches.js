const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	start_date: {
        type: Date,
        required: true
    },
	isDeleted: {
        type: Boolean,
        required:true,
        default: false
    }
}, { timestamps: true });

const Batch = mongoose.model("batches", batchSchema);

module.exports = Batch;