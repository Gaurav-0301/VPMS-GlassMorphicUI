const reg = require("../models/Registration.model");
const sendPassEmail = require("../utils/pdfGenerator"); 

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    // 1. Update the record in MongoDB
   // In updateStatus controller
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
   
    console.log(`Generating pass for Visitor: ${updatedVisitor.refId}`);
    
     await sendPassEmail(updatedVisitor)
        .then(() => res.json({
          messgae:`✅ Email sent successfully to ${updatedVisitor.email}`
}))
        .catch((err) => {
          res.json({
          messgae:(`❌ PDF/Email Error for ${updatedVisitor.refId}:`, err.message)
})
           
        });
}

    return res.status(200).json({
      success: true,
      message: `Status updated to ${status} successfully`,
      data: updatedVisitor
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Status Update failed: " + error.message,
    });
  }
};

module.exports = updateStatus;