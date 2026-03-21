const reg = require("../models/Registration.model");
const sendPassEmail = require("../utils/pdfGenerator"); 

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    
    const updatedVisitor = await reg.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    ).lean(); 

    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor record not found",
      });
    }

   
    if (status === "Approved") {
      try {
        console.log(`[Gatekeeper] Starting Email Generation for: ${updatedVisitor.refId}`);
        
       
        await sendPassEmail(updatedVisitor);
        
        console.log(`[Gatekeeper] ✅ Email sent successfully to ${updatedVisitor.email}`);
      } catch (err) {
       
        console.error(`[Gatekeeper] ❌ PDF/Email Generation Error:`, err.message);
      }
    }

    
    return res.status(200).json({
      success: true,
      message: status === "Approved" 
        ? `Pass approved and sent to ${updatedVisitor.email}` 
        : `Status updated to ${status} successfully`,
      data: updatedVisitor
    });

  } catch (error) {
    console.error("[Gatekeeper] Status Update Route Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Status Update failed: " + error.message,
    });
  }
};

module.exports = updateStatus;