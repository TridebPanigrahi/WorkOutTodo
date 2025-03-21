const workoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// Geeting all workout records
const allWorkoutRecords = async (req, res) => {
  try {
    const allWorkout = await workoutModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(allWorkout);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

// Geeting single workout record
const getSingleRecord = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such record found" });
    }
    const singleRecord = await workoutModel.findById(id);
    if (!singleRecord) {
      return res.status(404).json({ error: "No such record found" });
    }
    res.status(200).json(singleRecord);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

// Create workout record
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workoutData = await workoutModel.create({ title, reps, load });
    res.status(200).json(workoutData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete workout record
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such record found" });
    }
    const deleteWorkoutData = await workoutModel.findByIdAndDelete({ _id: id });
    if (!deleteWorkoutData) {
      return res.status(404).json({ error: "No such record found" });
    }
    res.status(200).json(deleteWorkoutData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update workout record
const updateWorkoutRecord = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such record found" });
    }
    const updatedRecord = await workoutModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: "No such record found" });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  allWorkoutRecords,
  getSingleRecord,
  createWorkout,
  deleteWorkout,
  updateWorkoutRecord,
};
