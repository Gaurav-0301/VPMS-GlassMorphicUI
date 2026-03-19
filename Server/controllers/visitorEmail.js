const sendPassEmail = require('../utils/pdfGenerator'); // Path to your mail utility

const testEmailConnection = async (req, res) => {
    try {
        const dummyVisitor = {
            name: "Test User",
            email: "gauravkakpure2702@gmail.com", // Use your own email to check
            host: "System Admin",
            refId: "GK-TEST-001",
            purpose: "System Verification",
            url: null // Testing without photo first
        };

        await sendPassEmail(dummyVisitor);
        
        res.status(200).json({ 
            success: true, 
            message: "Test email sent successfully! Check your inbox (and spam folder)." 
        });
    } catch (error) {
        console.error("Deployment Mail Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Mail failed", 
            error: error.message 
        });
    }
};

module.exports = { testEmailConnection};