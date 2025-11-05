import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const PatientProfile = sequelize.define("PatientProfile", {
  condition: DataTypes.STRING,
  location: DataTypes.STRING,
});

User.hasOne(PatientProfile, { foreignKey: "userId", onDelete: "CASCADE" });
PatientProfile.belongsTo(User, { foreignKey: "userId" });

export default PatientProfile;
