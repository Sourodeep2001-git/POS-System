const express = require("express");
const { getItemController, addItemController, editItemController, deleItemController} 
= require ("./../controllers/itemController");

const router = express.Router();

//Method - GET
router.get("/get-item", getItemController);

//Method - POST
router.post("/add-item", addItemController);

//Method - PUT
router.put("/edit-item", editItemController);

//Mothod - DELETE
router.post("/delete-item", deleItemController);

module.exports = router;