import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, createTasks, get_Task, deleteTask,updateTask } from '../controllers/tasks.controllers.js';
import { createSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, get_Task)
router.post('/tasks', authRequired, validateSchema(createSchema) ,createTasks)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, updateTask)


export default router;

// nota: crear tasks.router.js, importar y exportar y crear ruta en esta carpeta. 
// Pasar a app.js e importar y crear ruta: app.use('/api', taskRouter)