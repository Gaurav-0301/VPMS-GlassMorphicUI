const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const cors = require("cors");

// ✅ CORS (already correct)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vpms-psi.vercel.app"  
  ],
  credentials: true
}));



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const router = require("./routes/user.routes");
const regRouter = require("./routes/staff.reg.routes");
const recordRouter = require('./routes/record.count.routes');
const hostRouter = require("./routes/host.routes");
const securityRouter = require("./routes/security.routes");

app.use("/", router);
app.use("/", regRouter);
app.use("/", recordRouter);
app.use("/", hostRouter);
app.use("/", securityRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello Jee");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});