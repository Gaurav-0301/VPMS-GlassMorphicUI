import React from 'react';
import { QrCode } from 'lucide-react';

const RecentActivity = ({ lastScan }) => (
  <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center">
    {!lastScan ? (
      <div className="space-y-4">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="text-slate-300" size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-800">Waiting for Scan</h3>
        <p className="text-slate-400 font-medium max-w-xs">
          Scan a visitor's QR code to verify their pass and manage entry/exit.
        </p>
      </div>
    ) : (
      <div className="w-full text-left">
        {/* You can map a list of recent entries here */}
      </div>
    )}
  </div>
);

export default RecentActivity;