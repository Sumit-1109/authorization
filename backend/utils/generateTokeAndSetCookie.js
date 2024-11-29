const jwt = require("jsonwebtoken");


const generateTokeAndSetCookie = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.send.NODE_ENV === 'development',
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    return token;
}

module.exports = generateTokeAndSetCookie;