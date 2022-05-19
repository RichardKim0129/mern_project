import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
    // Getting email and password from the frontend, getting it from req.body
    // from the post request, we get the data we want
    const { email, password } = req.body;

    try {
        // Trying to find user in database
        const existingUser = await User.findOne({ email });

        // Checking user variable to see if user exist
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check password next because bcrypt it is hashed so use built in method and compare
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // If user exists and password match get json web token and send to front end
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // Check if they already have an acct if they do then dont let user make duplicate
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords does not match" });
        }

        // Before creating, hash password
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}