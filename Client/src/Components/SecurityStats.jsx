import React from 'react';

// Main Export: The grouping component
const SecurityStats = ({ stats }) => (
  <div className="space-y-6">
    <StatCard 
      label="Inside Premises" 
      value={stats.inside} 
      sub="Current" 
      color="text-indigo-600" 
    />
    <StatCard 
      label="Total Visitors" 
      value={stats.totalToday} 
      sub="Today" 
    />
    <StatCard 
      label="Visits Completed" 
      value={stats.completed} 
      sub="Exited" 
      color="text-emerald-600" 
    />
  </div>
);

// Sub-component: The individual card
const StatCard = ({ label, value, sub, color = "text-slate-800" }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <span className={`text-5xl font-black tracking-tighter ${color}`}>
        {value}
      </span>
      <span className="text-slate-400 font-bold text-sm tracking-tight">
        {sub}
      </span>
    </div>
  </div>
);

export default SecurityStats;