const express=require("express")
const hostRouter=express.Router();
const { testEmailConnection }=require("../controllers/visitorEmail")
const updateStatus=require("../controllers/host.updateStatus")
hostRouter.put("/statusupdate/:id",updateStatus);
hostRouter.get('/testmail', testEmailConnection);

module.exports=hostRouter;