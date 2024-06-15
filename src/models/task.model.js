import {DataTypes} from "sequelize";
import sequelize from "../../db.js";

const TaskSchema = sequelize.define("task",{
    title: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{
        type: DataTypes.STRING,
        default: Date.now,
    },
},
{
    timestamps: true
})

export default TaskSchema