const Reg = require('../models/Registration.model');

const createRegistration = async (req, res) => {
    // 1. Extract hostId along with other fields
    const { name, purpose, number, host, hostId, email, url } = req.body;

    try {
        // 2. Pass hostId to the creation object
        const newVisitor = await Reg.create({
            name,
            purpose,
            number,
            host,  
            hostId,
            email,
            url
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            data: newVisitor
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createRegistration };
const registrationStatus = async (req, res) => {
  const { number } = req.params;

  try {
  
    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Number is required to check the status"
      });
    }

   
    const found = await Reg.findOne({ number: number });


    if (found) {
      return res.status(200).json({
        success: true,
        data: found 
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No registration found with this number"
      });
    }

  } catch (error) {
    console.error("registrationStatus Controller error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports={createRegistration,registrationStatus}