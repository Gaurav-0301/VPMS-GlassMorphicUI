const reg = require('../models/Registration.model');
const staff = require('../models/Staff.credential');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Get total visitor count
const CountVisitor = async (req, res) => {
    try {
        const NumberOfVisitor = await reg.countDocuments();
        return res.status(200).json({
            success: true,
            data: NumberOfVisitor
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "CountVisitor fails"
        });
    }
};

// 2. Get all staff counts in ONE response
const CountStaff = async (req, res) => {
    try {
        // We run these in parallel for better performance
        const [admin, host, security] = await Promise.all([
            staff.countDocuments({ role: "Admin" }),
            staff.countDocuments({ role: "Host" }),
            staff.countDocuments({ role: "Security" })
        ]);

        return res.status(200).json({
            success: true,
            counts: {
                admin,
                host,
                security
               
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "CountStaff fails"
        });
    }
};

const staffData = async (req, res) => {
    try {
        const data = await staff.find({}); // Or whatever your model name is
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const visitorData = async (req, res) => {
    try {
        // Capture hostId from the URL query: /visitordata?hostId=...
        const { hostId } = req.query; 

        let filter = {};
        
        // If a hostId is provided, only fetch visitors for that specific host
        if (hostId && hostId !== "undefined") {
            filter = { hostId: hostId };
        }

        const data = await reg.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching visitor data",
            error: error.message
        });
    }
};
const deletevisitors=async(req,res)=>{
try {
    await reg.deleteMany({});
    return res.json({
        success:true,
        message:"All Visitor Data Remove Successfully"
    })
} catch (error) {
    console.log("Error in deleteVisitor",error);
     return res.json({
        success:false,
        message:"Error in deleteVisitor"
    })
}


}

const deleteStaff = async (req, res) => {
  try {
     const id = req.params.id;
      await staff.findByIdAndDelete(id);
       return res.json({
      success: true,
      message: "Removed successfully!!"
    });

  } catch (error) {

    console.log("Error in deleteStaff:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting staff"
    });

  }
};





// 6. Login Staff

// Updated module.exports
module.exports = {
    CountVisitor, CountStaff, visitorData, staffData, 
    deletevisitors, deleteStaff, 
};

