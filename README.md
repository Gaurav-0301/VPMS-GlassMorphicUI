🛡️ GatekeeperVisitor Pass Management SystemGatekeeper is a modern, full-stack web application designed to streamline and automate the entire visitor check-in process. From registration to gate entry, it ensures a secure, smooth, and paperless experience.Live Demo Frontend: vpms-psi.vercel.appProduction Backend API: gatekeeper-sx2h.onrender.com✨ Key Features⚡ Host Dashboard: Review, approve, or reject visitor requests instantly with a single click.🪪 Automated Digital Passes: Dynamically generates beautiful PDF credentials embedded with visitor photos and a unique verification signature.📲 Secure QR Verification: Generates high-contrast scannable QR codes for guard-station validation at physical entry points.📩 Background Notifications: Offloads automated email dispatches via Nodemailer so hosts never experience dashboard lag.🔐 Role-Based Auth: Secure application routing split across dedicated Host, Security, and Admin access scopes using JSON Web Tokens (JWT).🛠️ Tech StackLayerTechnologies UsedFrontendReact.js • Tailwind CSS • DaisyUI • Lucide Icons • React Hot ToastBackendNode.js • Express.js • PDFKit • Nodemailer • QRCodeDatabaseMongoDB • Mongoose ODM🚀 Quick Start Guide1. Clone the RepositoryBashgit clone https://github.com/Gaurav-0301/VPMS.git
cd VPMS
2. Backend Environment SetupNavigate to the server directory, install your node modules, and configure your environment variables.Bashcd Server
npm install
Create a .env file inside the Server/ root folder:Code snippetPORT=2724
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-google-app-password
3. Frontend Environment SetupOpen a separate terminal window, navigate into the client root, and install the interface dependencies.Bashcd Client
npm install
💻 Running the ApplicationTo run the full-stack system locally, execute the development servers concurrently in your open terminals:Bash# Terminal 1: Spin up the Express Backend
cd Server
npm run dev

# Terminal 2: Spin up the React Frontend
cd Client
npm run dev
