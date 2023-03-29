const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if (!user) {
            return res.sendStatus(401);
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.sendStatus(401);
        }
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({sub: user._id, exp}, process.env.SECRET);

        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production",
        })

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }

}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200); 
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }

}

function checkAuth(req,res) {
    try {
        res.sendStatus(200); 
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }

}

module.exports = {
    login,
    logout,
    checkAuth,
};