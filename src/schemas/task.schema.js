import {z} from 'zod';

export const createSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }),
    description: z.string({
        required_error: "Description must be a string"
    }),
    date: z.string().datetime().optional()
})

//pasa directo a archivo task.routes.js porque ya esta creada validation.middleware.js, 
//en task.routes.js se importa funcion createSchema y se coloca en  despues de authRequired: authRequired, validateSchema(createSchema)