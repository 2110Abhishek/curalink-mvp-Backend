import PatientProfile from "../models/PatientProfile.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const saveProfile = async (req, res) => {
  try {
    const { userId, condition, additionalConditions, location } = req.body;
    
    console.log("Received profile data:", req.body);
    
    if (!userId || !condition) {
      return res.status(400).json({ 
        success: false,
        message: "User ID and condition are required" 
      });
    }

    // Check if profile already exists for this user
    let profile = await PatientProfile.findOne({ where: { userId } });
    
    if (profile) {
      // Update existing profile
      await profile.update({
        condition,
        additionalConditions: additionalConditions || "",
        location: location || ""
      });
    } else {
      // Create new profile
      profile = await PatientProfile.create({
        userId,
        condition,
        additionalConditions: additionalConditions || "",
        location: location || ""
      });
    }

    // Reload to get the updated data
    const updatedProfile = await PatientProfile.findOne({ where: { userId } });

    res.json({
      success: true,
      message: "Profile saved successfully",
      data: updatedProfile
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await PatientProfile.findOne({ where: { userId } });
    
    if (!profile) {
      return res.status(404).json({ 
        success: false,
        message: "Profile not found" 
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const analyzeCondition = async (req, res) => {
  try {
    const { text } = req.body; // Changed from 'condition' to 'text' to match frontend
    
    if (!text) {
      return res.status(400).json({ 
        success: false,
        error: "Condition text is required" 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical assistant. Analyze health conditions precisely and provide clear, concise analysis. Focus on identifying medical conditions, symptoms, and potential treatment categories.",
        },
        {
          role: "user",
          content: `Analyze this medical condition description: "${text}". Identify key conditions, medical terms, symptoms, and suggest relevant medical categories or specialties.`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ 
      success: true, 
      analysis: response.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error analyzing condition:", error);
    
    // Provide a fallback analysis if OpenAI fails
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({ 
        success: false,
        error: "OpenAI API key is invalid or missing. Please check your environment variables."
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Optional: Add a method to check if profile exists
export const checkProfileExists = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await PatientProfile.findOne({ where: { userId } });
    
    res.json({
      success: true,
      exists: !!profile,
      data: profile || null
    });
  } catch (error) {
    console.error("Error checking profile:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};