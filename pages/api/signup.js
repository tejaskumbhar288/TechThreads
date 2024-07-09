<<<<<<< HEAD
import User from '@/models/User';
import connectDb from '@/middleware/mongoose';
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        "secret123", // Replace with your secret key
        { expiresIn: '1h' } // Set token expiration time as needed
    );
};


const handler = async (req, res) => {
    if(req.method === 'POST'){
        const { name, email, password } = req.body;

        // Encrypt the password
        let encryptedPass = CryptoJS.AES.encrypt(JSON.stringify(password), "secret123").toString();

        let newUser = new User({
            name,
            email,
            password: encryptedPass
        });

        try {
          await newUser.save();
          // Assume your User model generates a token upon save
          const token = generateToken(newUser); // Implement this function as per your authentication strategy

          res.status(200).json({ success: true, token });
        } catch (error) {
          console.error('Error saving user:', error);
          res.status(500).json({ error: "Error creating user" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
=======
import User from '@/models/User';
import connectDb from '@/middleware/mongoose';
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        "your_jwt_secret", // Replace with your secret key
        { expiresIn: '1h' } // Set token expiration time as needed
    );
};


const handler = async (req, res) => {
    if(req.method === 'POST'){
        const { name, email, password } = req.body;

        // Encrypt the password
        let encryptedPass = CryptoJS.AES.encrypt(JSON.stringify(password), "secret123").toString();

        let newUser = new User({
            name,
            email,
            password: encryptedPass
        });

        try {
          await newUser.save();
          // Assume your User model generates a token upon save
          const token = generateToken(newUser); // Implement this function as per your authentication strategy

          res.status(200).json({ success: true, token });
        } catch (error) {
          console.error('Error saving user:', error);
          res.status(500).json({ error: "Error creating user" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
>>>>>>> ac2bd0ec28289d137c9b25c05448e576ab9ea4d7
