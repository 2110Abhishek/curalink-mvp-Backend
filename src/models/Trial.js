import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Trial = sequelize.define("Trial", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  condition: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM("Active", "Completed", "Recruiting"),
    defaultValue: "Active",
  },
});

export default Trial;
