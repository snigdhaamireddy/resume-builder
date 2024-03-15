// routes/batches.js
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Batchmembers = require("../models/batch_members");
const Batch = require("../models/batches");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const batchId = new ObjectId(req.params.id);
    const batchMembers = await Batchmembers.find({ batchID: batchId })
      .populate("userID")
      .exec();
    const batchName = await Batch.findById(batchId);
    let users = batchMembers
      .map((student) => student.userID)
      .filter((user) => user.isDeleted === false && user.role === "student");
    const data= users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      batchName: batchName.name,
    }))
      return res.status(200).send({
        status: 200,
        message: "Fetched Users Succesfully",
        data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find({ isDeleted: false });
    res.status(200).json(batches);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const newBatch = await Batch.create({
      name,
      start_date: new Date(),
      isDeleted: false,
    });

    res.status(201).json(newBatch);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/", async (req, res) => {
  const { id, name } = req.body;

  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    res.status(200).json(updatedBatch);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    const deletedBatch = await Batch.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedBatch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    res.status(200).json(deletedBatch);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
