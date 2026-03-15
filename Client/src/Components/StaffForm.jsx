import React, { useState } from 'react';
import { User, Mail, Shield, Building,UserPlus} from 'lucide-react';

const StaffForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    role: '',
    dept: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Staff:", formData);
    
    // Logic for frontend only: 
    // 1. Trigger success to parent (to update local state)
    if (onSuccess) onSuccess(formData);
    // 2. Close the modal
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" text-black space-y-6">
      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="text"
            placeholder="Full Name"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="email"
            placeholder="Work Email"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
         {/* Name Input */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="text"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Role Selection */}
          <div className="relative">
            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option >Role</option> 
              <option value="Host">Host</option>
              <option value="Admin">Admin</option>
              <option value="Security">Security</option>
            </select>
          </div>

          {/* Department Input */}
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="text"
              placeholder="Department"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4"
      >
        <UserPlus size={20} /> Add Staff
      </button>
    </form>
  );
};

export default StaffForm;