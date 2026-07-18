import React from "react";

const Backdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-blue-400 opacity-10 blur-[120px] animate-pulse" />

      <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full bg-indigo-400 opacity-10 blur-[100px] animate-pulse" />
    </div>
  );
};

export default Backdrop;
