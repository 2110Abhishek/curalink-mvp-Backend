import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const { userId, trialId } = req.body;
    const favorite = await Favorite.create({ userId, trialId, type: "trial" });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.destroy({ where: { id } });
    res.json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
