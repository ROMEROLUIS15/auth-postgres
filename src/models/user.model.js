import {DataTypes} from "sequelize";
import sequelize from "../../db.js";

const UserSchema = sequelize.define("user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true, //limpia espacios
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // permite ver fecha de creacion y actualizacion
    //createdAt y updatedAt
  }
);

export default UserSchema
