import TaskSchema from '../models/task.model.js'

export const getTasks = async (req,res) => {
    const tasks = await TaskSchema.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks) //consulta el usuario y coloca sus datos
}


export const createTasks = async (req,res) => {
try {
    const {title, description, date} = req.body;
    const createTasks = new Task({
        title,
        description,
        date,
        user: req.user.id,
    })
    const savedTask = await createTasks.save();
    res.json(savedTask)
} catch (error) {
    return res.status(500).json({message: "Something went wrong"})
}
}


export const get_Task = async (req,res) => {
try {
    const getOneTask = await TaskSchema.findById(req.params.id).populate('user') //populate traera la tarea con el usuario
    if(!getOneTask) return res.status(404).json({message: "Task not found"})
    res.json(getOneTask)
} catch (error) {
return res.status(404).json({message: "Task not found"})
}
}



export const deleteTask = async (req,res) => {
try {
    const deleteTask = await TaskSchema.findByIdAndDelete(req.params.id);
    if(!deleteTask) return res.status(404).json({message: "Task not found"})
    return res.sendStatus(204)
} catch (error) {
    return res.status(404).json({message: "Task not found"})
}
}


export const updateTask = async (req,res) => {
 try {
    const updateTask = await TaskSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if(!updateTask) return res.status(404).json({message: "Task not found"})
    res.json(updateTask)
 } catch (error) {
    return res.status(404).json({message: "Task not found"})
 }
}


//exportar e importar en tasks.router.js
