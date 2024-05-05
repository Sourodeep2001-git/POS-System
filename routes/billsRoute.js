const express = require("express");
const { addBillsController,
    getBillsController } =require ("./../controllers/billsController");

const router = express.Router();


//MEthod - POST
router.post("/add-bills", addBillsController)

//MEthod - GET
router.get("/get-bills", getBillsController)

module.exports = router;