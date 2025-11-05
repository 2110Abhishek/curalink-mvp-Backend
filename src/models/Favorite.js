import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Trial from "./Trial.js";

const Favorite = sequelize.define("Favorite", {
  type: { type: DataTypes.STRING }, // "trial" or "forum"
});

User.belongsToMany(Trial, { through: Favorite });
Trial.belongsToMany(User, { through: Favorite });

export default Favorite;
