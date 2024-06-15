import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {createdAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../../config.js";
import UserSchema from "../models/user.model.js";


//Funcionalidad a register
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {

    const  userFound = await UserSchema.findOne({where: {email: email}})
    if (userFound) return res.status(400).json(["The email already exists"]);

    const passworDHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email, // esta manera de crear usuarios permite , alterarlo y guardarlo
      password: passworDHash,
    });

    const userSaved = await newUser.save();
    const token = await createdAccessToken({
      id: userSaved._id
    })
    res.cookie('token', token)
    res.json({
       id: userSaved._id,
       username: userSaved.username, //solicitando informacion exacta a recibir
       email: userSaved.email,
       createdAt: userSaved.createdAt,
       updateAt: userSaved.updatedAt
     });

    // res.json({
    //   message: "User created successfully"
    // })

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


// Funcionalidad a login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await UserSchema.findOne({email})
    if (!userFound) return res.status(400).json({message: "User not found"})

    const isMatch = await bcrypt.compare(password, userFound.password)
    if(!isMatch) return res.status(400).json({message: "Invalid password"})


    const token = await createdAccessToken({
      id: userFound._id
    })
    res.cookie('token', token)
    res.json({
       id: userFound._id,
       username: userFound.username, //solicitando informacion exacta a recibir
       email: userFound.email,
       createdAt: userFound.createdAt,
       updateAt: userFound.updatedAt
     });

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


// Funcionalidad a logout

export const logout = (req,res) => {
  res.cookie('token', "", {
    expires: new Date(0)   // funcion para eliminar token logout
  })
  return res.sendStatus(200)
}

// Section Profile
export const profile = async (req,res) => {
  const userFound = await UserSchema.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: " User not found"})

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

export const verifyToken = async (req,res) => {
  const {token} = req.cookies

  if(!token) res.status(401).json({message: "Unauthorized"})

 jwt.verify(token, TOKEN_SECRET, async (err, user) => {
  if(err) return res.status(401).json({message: "Unauthorized"})

  const userFound = await UserSchema.findById(user.id)

  if (!userFound) return res.status(401).json({message: 'User no longer exists'});

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  })
 })
}