import express from "express";
import Users from "../model/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const router = express.Router();


router.get(`/get_users`, async (req, res) => {
    const users = await Users.find();
    res.json(users)
})

// Register route
router.post("/register", async (req, res) => {

    // check is user already present
    const isPrevUser = await Users.findOne({email: req.body.email})
    if (isPrevUser) return res.status(400).send(`already user present with these ${req.body.email}`)

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)

    const post = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });
    try {
        const savedPost = await post.save()
        res.status(201).send(`account created with email id:${req.body.email}`)

    } catch (error) {
        res.json({message: error})
    }

})

// login
router.post('/login', async (req, res) => {

    const user = await Users.findOne({email: req.body.email}); //finding the email  form database
    if (!user) return res.status(400).send("email or password is wrong");
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordValid) {
        res.status(400).send("worng password");
    } else {
        // res.status(200).send("login successfully");
        // jwt
        const token = jwt.sign({_id: user._id}, 'x3x3x3x3');
        res.header('auth-token', token)
        res.send(token);
    }


});


export default router;