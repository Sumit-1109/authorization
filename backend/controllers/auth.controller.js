const User = require("../models/user.model");
const generateTokeAndSetCookie = require('../utils/generateTokeAndSetCookie')
const bcrypt = require("bcryptjs")

const signup = async (req,res) =>{

    const {email, password, name} = req.body;
    try{
        if (!email || !password || !name) {
            throw new Error ("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists) {
            return res.status(400).json({succeess: false, message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificatinTokenExpiresAt: Date.now() + 15*60*1000
        })

        await user.save();

        generateTokeAndSetCookie(res, user._id);

        res.status(201).json({
            succeess: true,
            message: "User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })

    } catch (err){
        res.status(400).json({succeess: false, message: err.message});
    }

};

const login = async (req, res) =>{
    res.send("Login Route");
};

const logout = async (req, res) =>{
    res.send("Logout Route")
};


const authController = {
    signup,
    login,
    logout
}
module.exports = authController;