const express=require("express")
const regRouter=express.Router();
const {createStaff,loginStaff}=require('../controllers/Staff.registration')

regRouter.post("/staff/register",createStaff);
regRouter.post("/staff/login",loginStaff);

module.exports=regRouter;