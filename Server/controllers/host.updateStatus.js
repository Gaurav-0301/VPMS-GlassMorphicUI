const reg = require("../models/Registration.model");
const sendPassEmail = require("../utils/pdfGenerator"); 

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const updatedVisitor = await reg.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { returnDocument: 'after' } 
    ).lean();

    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor record not found",
      });
    }

    // Fire-and-forget background task: The API will NOT wait for this to finish
    if (status === "Approved") {
      console.log(`[Gatekeeper] Offloading Email Generation to background for: ${updatedVisitor.refId}`);
      
      sendPassEmail(updatedVisitor)
        .then(() => console.log(`[Gatekeeper] ✅ Background Email sent successfully for: ${updatedVisitor.refId}`))
        .catch((err) => console.error(`[Gatekeeper] ❌ Background Email Error:`, err.message));
    }

    // This response returns instantly now!
    return res.status(200).json({
      success: true,
      message: status === "Approved" 
        ? `Pass approved successfully. Pass is being generated and emailed.` 
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