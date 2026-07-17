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

    // Safely await the email process if status is Approved
    if (status === "Approved") {
      try {
        console.log(`[Gatekeeper] Starting Email Generation for: ${updatedVisitor.refId}`);
        
        // Await here ensures the step finishes before moving to the response
        await sendPassEmail(updatedVisitor);
        
        console.log(`[Gatekeeper] ✅ Email sent successfully for: ${updatedVisitor.refId}`);
      } catch (err) {
        // If Nodemailer times out on Render, this block intercepts it perfectly.
        // The server remains completely safe, and the script moves on.
        console.error(`[Gatekeeper] ❌ PDF/Email Generation Error:`, err.message);
      }
    }

    // 3. Send final response after the email block completes or handles its errors
    return res.status(200).json({
      success: true,
      message: status === "Approved" 
        ? `Pass approved and processed for ${updatedVisitor.email}` 
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