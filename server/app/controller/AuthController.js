const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StatusCode = require("../utils/statusCode");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }

      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          success: false,
          message: "user already exist",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hasgPassword = await bcrypt.hash(password, salt);

      const userdata = new User({
        name,
        email,
        phone,
        password: hasgPassword,
      });
      const data = await userdata.save();
      return res.status(201).json({
        success: true,
        message: "user Register successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Password does not match" });
      }

      
      console.log("User found:", user.email, "Role:", user.is_admin);

      if (user.is_admin === "user") {
     
        if (!process.env.JWT_SECRET_KEY) {
          throw new Error("JWT_SECRET_KEY is missing in .env file");
        }

        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.is_admin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" },
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
        });
        
      } else {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized role" });
      }
    } catch (error) {
      
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

async dashboard(req,res){
        try{
            return res.status(200).json({
                success:true,
                message:"welcome to user dashboard",
                data:req.user
            })

        }catch(error){
            console.log(error);
        }
    }
    async profile(req,res){
        try{
            return res.status(200).json({
                success:true,
                message:"welcome to user profile",
                data:req.user
            })

        }catch(error){
            console.log(error);
        }
    }


}

module.exports = new AuthController();
