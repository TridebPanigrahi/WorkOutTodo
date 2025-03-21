const express = require("express");
const {
  createWorkout,
  getSingleRecord,
  allWorkoutRecords,
  deleteWorkout,
  updateWorkoutRecord,
} = require("../controllers/workoutControllers");

const routes = express.Router();

//GET all workout
routes.get("/", allWorkoutRecords);

// GET Single Record
routes.get("/:id", getSingleRecord);

//POST a new workout
routes.post("/", createWorkout);

//DELETE a new workout
routes.delete("/:id", deleteWorkout);

//Update a new workout
routes.patch("/:id", updateWorkoutRecord);

module.exports = routes;
