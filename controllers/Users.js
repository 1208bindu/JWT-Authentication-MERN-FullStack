const UserDetails = require('../models/Users');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

   
// @desc    Get all Users
// @route   GET /api/v1/transactions
// @access  Public
exports.getUserDetails = async (req, res, next) => {
  try {
    const users = await UserDetails.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public

exports.addUserDetails=async (req, res,next) => {
  try {
   const { firstname,lastname,email,password } = req.body;

   const existingUser = await UserDetails.findOne({ email: email });
   if (existingUser)
      { 
     return res.status(400).json({ msg: "An account with this email already exists. Enter your credentials" });
      }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserDetails({
      firstname:firstname,
      lastname:lastname,
      email:email,
      password: passwordHash,
     
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}



// Desc: User Login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    const user = await UserDetails.findOne({ email: email });
    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ msg: "No account with this email has been registered." })
    
    if(user){
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) return res.status(400).json({msg:"Incorrect Password"})
    }
    else return res.status(400).json({ msg: "Invalid Email." });
    
    const token = jwt.sign({ id: user._id.toString() }, "have-a-great");
    res.status(200).json({
      token,
      user: {
        id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

exports.isTokenValid= async (req, res) => {
  try {
    
    const token = req.header('x-auth-token');
     if (!token) return res.json(false);

    const verified = jwt.verify(token, "have-a-great");
    if (!verified) return res.json(false);

    const user = await UserDetails.findById(verified.id);
    if (!user) return res.json(false);
    return res.json({
      token,
      user: {
        id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}