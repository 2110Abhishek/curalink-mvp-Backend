import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Forum = sequelize.define("Forum", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

User.hasMany(Forum, { foreignKey: "userId", onDelete: "CASCADE" });
Forum.belongsTo(User, { foreignKey: "userId" });

export default Forum;
