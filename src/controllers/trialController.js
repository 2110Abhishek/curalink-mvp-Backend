import Trial from "../models/Trial.js";
import { Op } from "sequelize";

// Get all trials with optional filtering
export const getTrials = async (req, res) => {
  try {
    const { condition, location, status } = req.query;
    
    let whereClause = {};
    
    // Add condition filter if provided
    if (condition) {
      whereClause.condition = {
        [Op.like]: `%${condition}%`
      };
    }
    
    // Add location filter if provided
    if (location) {
      whereClause.location = {
        [Op.like]: `%${location}%`
      };
    }
    
    // Add status filter if provided
    if (status) {
      whereClause.status = status;
    }

    const trials = await Trial.findAll({ 
      where: whereClause,
      order: [["createdAt", "DESC"]] 
    });
    
    res.json(trials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new trial
export const createTrial = async (req, res) => {
  try {
    const trial = await Trial.create(req.body);
    res.status(201).json(trial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a trial
export const updateTrial = async (req, res) => {
  try {
    const trial = await Trial.findByPk(req.params.id);
    if (!trial) return res.status(404).json({ message: "Trial not found" });

    await trial.update(req.body);
    res.json(trial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a trial
export const deleteTrial = async (req, res) => {
  try {
    const trial = await Trial.findByPk(req.params.id);
    if (!trial) return res.status(404).json({ message: "Trial not found" });

    await trial.destroy();
    res.json({ message: "Trial deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get trial by ID
export const getTrialById = async (req, res) => {
  try {
    const trial = await Trial.findByPk(req.params.id);
    if (!trial) return res.status(404).json({ message: "Trial not found" });

    res.json(trial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};