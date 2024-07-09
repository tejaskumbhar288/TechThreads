import User from '@/models/User';
import connectDb from '@/middleware/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // Decrypt the password
        const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
        let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // Validate email and password
        if (req.body.email === user.email && req.body.password === decryptedPass) {
          var token = jwt.sign({ email: user.email, name: user.name }, 'jwtsecret', {
            expiresIn: "2d"});
          res.status(200).json({ success: true, token });
        } else {
          res.status(401).json({ success: false, error: "Invalid Credentials" }); // 401 for unauthorized
        }
      } else {
        res.status(404).json({ success: false, error: "No user found" }); // 404 for not found
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" }); // 500 for server error
    }
  } else {
    res.status(405).json({ error: "This method is not allowed" }); // 405 for method not allowed
  }
};

export default connectDb(handler);
