const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

const dataURIToBuffer = (dataURI) => {
    if (!dataURI) return null;
    const base64Data = dataURI.split(',')[1];
    return Buffer.from(base64Data, 'base64');
};

const sendPassEmail = async (visitor) => {
    // Configured for reliability on cloud containers (Render)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: { 
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        },
        family: 4, 
        connectionTimeout: 10000, // 10s maximum wait time for connection
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: {
            rejectUnauthorized: false,
            servername: 'smtp.gmail.com' 
        }
    });

    // STEP 1: Generate PDF completely independent of mail transporter
    const pdfBuffer = await new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: [650, 400], margin: 0 });
            let buffers = [];
            
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', (err) => reject(err));

            // Generate Assets
            const qrCodeDataUrl = QRCode.toDataURL(visitor.refId, {
                margin: 1, width: 300, 
                color: { dark: '#1e293b', light: '#ffffff' }
            }).catch(() => null);

            const timestamp = new Date().toLocaleString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true
            });

            // --- PDF DESIGN ---
            doc.rect(0, 0, 650, 400).fill('#ffffff');
            doc.rect(0, 0, 650, 65).fill('#f1f5f9'); 
            doc.fillColor('#059669').fontSize(22).font('Helvetica-Bold').text('Status: Approved', 30, 22);
            doc.fillColor('#64748b').fontSize(10).font('Helvetica').text(`ISSUED: ${timestamp}`, 450, 28, { align: 'right', width: 170 });

            const photoBuffer = dataURIToBuffer(visitor.url);
            if (photoBuffer) {
                doc.save();
                doc.fillColor('#e2e8f0').roundedRect(28, 88, 114, 114, 16).fill(); 
                doc.roundedRect(30, 90, 110, 110, 15).clip();
                doc.image(photoBuffer, 30, 90, { width: 110, height: 110 });
                doc.restore();
            }

            doc.fillColor('#1e293b').fontSize(22).font('Helvetica-Bold').text(visitor.name, 150, 100);
            doc.fillColor('#3b82f6').fontSize(14).font('Helvetica').text(visitor.purpose ? visitor.purpose.toUpperCase() : 'MEETING', 150, 132);
            
            doc.fillColor('#94a3b8').fontSize(10).text('HOSTING OFFICER', 150, 175);
            doc.fillColor('#1e293b').fontSize(18).font('Helvetica-Bold').text(visitor.host, 150, 190);

            doc.fillColor('#94a3b8').fontSize(10).text('REF ID', 150, 225);
            doc.fillColor('#475569').fontSize(12).font('Helvetica').text(visitor.refId, 150, 240);

            doc.save();
            doc.strokeColor('#10b981').lineWidth(1.5).dash(6, { space: 4 });
            doc.roundedRect(380, 90, 230, 220, 20).stroke();
            doc.restore(); 

            qrCodeDataUrl.then(url => {
                const qrBuffer = dataURIToBuffer(url);
                if (qrBuffer) doc.image(qrBuffer, 425, 115, { width: 140 });
            });

            doc.fillColor('#059669').fontSize(13).font('Helvetica-Bold').text('AUTHORIZED ACCESS', 380, 265, { align: 'center', width: 230 });
            doc.fillColor('#64748b').fontSize(9).font('Helvetica').text('Scan at Security Entry', 380, 285, { align: 'center', width: 230 });

            doc.rect(0, 380, 650, 20).fill('#0f172a');
            doc.fillColor('#ffffff').fontSize(8).text('GATEKEEPER - VISITOR MANAGEMENT SYSTEM', 20, 387);
            doc.fillColor('#94a3b8').fontSize(8).text(`VALID UNTIL: ${new Date().toLocaleDateString('en-IN')} | 11:59 PM`, 30, 360);

            doc.end();
        } catch (err) {
            reject(err);
        }
    });

    // STEP 2: Dispatch Transporter with static buffer data safely
    const currentTimestamp = new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    await transporter.sendMail({
        from: `"Gatekeeper System" <${process.env.EMAIL_USER}>`,
        to: visitor.email,
        subject: `✅ Pass Approved - ${visitor.refId}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; max-width: 500px; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; background-color: #ffffff;">
                <h2 style="color: #059669; margin-top: 0; font-size: 24px;">Booking Successful!</h2>
                <p>Hi <b>${visitor.name}</b>,</p>
                <p>Your visit to meet <b>${visitor.host}</b> has been approved. Please find your digital pass attached.</p>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 5px solid #059669; margin: 20px 0;">
                    <strong style="color: #065f46;">Entry Instructions:</strong><br/> 
                    Present the QR code in the attached PDF at the security gate for quick verification.
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
                    Issued by Gatekeeper VMS • ${currentTimestamp}
                </p>
            </div>
        `,
        attachments: [{ 
            filename: `VisitorPass_${visitor.refId}.pdf`, 
            content: pdfBuffer 
        }]
    });

    return true;
};

module.exports = sendPassEmail;