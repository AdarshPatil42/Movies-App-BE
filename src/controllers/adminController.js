const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY1

const signup = async(req, res)=>{
    try {
        const {adminName, email, password} = req.body;

        const existingUser = await adminModel.findOne({email: email});
        if(existingUser){
            res.status(400).json({message:"User Already Exist..!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await adminModel.create({
            adminName: adminName,
            email: email,
            password: hashedPassword
        })

        const token = await jwt.sign({email: admin.email, id:admin._id}, secretKey, {expiresIn: '2h'})
        res.status(201).json({user: admin, token: token})

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Something Went Wrong..!"})
    }
}

const signin = async(req, res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await adminModel.findOne({email: email});
        if(! existingUser){
            res.status(404).json({message:"User Not Found..!"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(! matchPassword){
            res.status(404).json({message:"Invalid Credential..!"})
        }

        const token = await jwt.sign({email: existingUser.email, id: existingUser._id}, secretKey);
        res.status(200).json({user: existingUser, token: token});

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Something went wrong..!"})
    }
}

module.exports = {signup, signin};