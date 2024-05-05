const userModal = require("../models/userModel");

// login
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body
    const user = await userModal.findOne({ userId, password, verified: true });
    if (user) {
      res.status(200).send(user);
    }else{
      res.status(401).json({ error: "Failed to login. Check your credentials." });
    }

  } catch (error) {
    console.log(error)
  }
};

//register
const registerController = async (req, res) => {
  try {
    const newUser = new userModal({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("New User Added Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};





module.exports = { loginController, registerController };