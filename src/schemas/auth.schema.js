import {z} from 'zod';

// schema de register
export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
})


// schema de login

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    }),
})


//pasa a validator.middleware.js y la funcion validateSchema de validator.middleware.js se exporta e importa en auth.routes.js,
//se exportan e importan funciones registerSchema y loginSchema hasta auth.routes.js y se colocan en rutas: ruta register = validateSchema(registerSchema), ruta login = validateSchema(loginSchema)