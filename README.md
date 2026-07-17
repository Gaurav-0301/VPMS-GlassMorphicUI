# 🛡️ Gatekeeper
### Visitor Pass Management System

Gatekeeper is a modern, full-stack web application designed to streamline and automate the entire visitor check-in process. From registration to gate entry, it ensures a secure, smooth, and paperless experience.

> **Live Demo Frontend:** [vpms-psi.vercel.app](https://vpms-psi.vercel.app/)  
> **Production Backend API:** [gatekeeper-sx2h.onrender.com](https://gatekeeper-sx2h.onrender.com)

---

## ✨ Key Features

*   **⚡ Host Dashboard:** Review, approve, or reject visitor requests instantly with a single click.
*   **🪪 Automated Digital Passes:** Dynamically generates beautiful PDF credentials embedded with visitor photos and a unique verification signature.
*   **📲 Secure QR Verification:** Generates high-contrast scannable QR codes for guard-station validation at physical entry points.
*   **📩 Background Notifications:** Offloads automated email dispatches via Nodemailer so hosts never experience dashboard lag.
*   **🔐 Role-Based Auth:** Secure application routing split across dedicated **Host**, **Security**, and **Admin** access scopes using JSON Web Tokens (JWT).

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js • Tailwind CSS • DaisyUI • Lucide Icons • React Hot Toast |
| **Backend** | Node.js • Express.js • PDFKit • Nodemailer • QRCode |
| **Database** | MongoDB • Mongoose ODM |

---

by Gaurav Kakpure
