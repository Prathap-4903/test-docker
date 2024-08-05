import express from 'express'
import bcrypt from 'bcrypt'
import {User}  from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/signup',async (req, res) => {
    const {name, username, email, phone, password, confirm_password, gender} = req.body;
    const user = await User.findOne({email})
    if(user) {
        return res.status(400).json({message: "User Already Existed"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name,
        username,
        email,
        phone,
        password: hashPassword,
        confirm_password,
        gender
    })
    await newUser.save()
    return res.json({status: true, message: "Record Saved Successfully"})
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({message: "User Not Registered"})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.status(401).json({message: "Invalid Password"})
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})

    return res.json({status: true, message: "Login Successfull"})
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json({ status: false, message: "No Token"});
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()
    } catch(err) {
        return res.json(err);
    }
}

router.get("/verify", verifyUser, (req, res) => {
    return res.json({status: true, message: "Authorized"})
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})
    
export {router as UserRouter}