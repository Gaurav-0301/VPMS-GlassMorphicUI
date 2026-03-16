const reg = require("../models/Registration.model");

const securityCheck = async (req, res) => {
  const { refId } = req.params;

  try {
    
    const visitor = await reg.findOne({ refId });

    
    if (!visitor) {
      return res.status(404).json({ 
        success: false, 
        message: "Pass not found. Invalid QR Code." 
      });
    }

    
    if (visitor.status !== 'Approved') {
      return res.status(403).json({ 
        success: false, 
        message: `Access Denied. Current status: ${visitor.status}` 
      });
    }

    
    res.status(200).json({ 
      success: true, 
      message: "Pass verified and approved by Host",
      visitor: {
        name: visitor.name,
        isInside: visitor.isInside, 
        purpose: visitor.purpose
      }
    });

  } catch (error) {
    console.error("Security Scan Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during database verification" 
    });
  }
};



 const updateMovement = async (req, res) => {
  try {
    const { refId } = req.params;
    const { action } = req.body; 

    const visitor = await reg.findOne({ refId }); // This looks in the "Reg" collection

    if (!visitor) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    if (action === 'check-in') {
      visitor.isInside = true;
      visitor.lastCheckIn = new Date();
    } else if (action === 'check-out') {
      visitor.isInside = false;
      visitor.lastCheckOut = new Date();
    }

    await visitor.save(); // This will now work because isInside exists in registrationSchema

    res.status(200).json({ success: true, message: `Successfully updated to ${action}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { securityCheck,updateMovement };