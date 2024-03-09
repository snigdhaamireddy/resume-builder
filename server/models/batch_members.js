const mongoose = require("mongoose");

const batchMembersSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    batchID: {
        type: Schema.Types.ObjectId,
        ref: 'batches'
    }
}, { timestamps: true });

const Batchmembers = mongoose.model("batchMembers", batchMembersSchema);

module.exports = Batchmembers;