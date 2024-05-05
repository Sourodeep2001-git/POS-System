const express = require("express");
const { loginController,
    registerController,
    } =require ("./../controllers/userController");

const router = express.Router();


//MEthod - POST
router.post("/login", loginController);

router.post("/register", registerController);

module.exports = router;