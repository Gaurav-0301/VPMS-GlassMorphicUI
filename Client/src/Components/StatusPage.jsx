import React, { useState } from 'react';
import { Search, Clock, User, QrCode, X, Loader2, SearchX, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // New Import

const StatusPage = ({ statusData, onSearch, searchQuery, setSearchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchClick = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setHasSearched(true);
    await onSearch();
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-black bg-slate-50 flex flex-col items-center pt-8 px-6">
      
      {/* Search Section */}
      <div className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Check Pass Status</h2>
          <X className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" 
             onClick={() => { setSearchQuery(''); setHasSearched(false); }} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Enter your registered phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg font-medium"
            />
          </div>
          <button 
            disabled={loading}
            onClick={handleSearchClick}
            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black disabled:bg-slate-400 transition-all font-semibold shadow-lg shadow-slate-200"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />} 
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Loading & Not Found States (Unchanged) */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-pulse">
           <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
           <p className="text-slate-500 font-medium">Checking database records...</p>
        </div>
      )}

      {!loading && hasSearched && !statusData && (
        <div className="w-full max-w-3xl bg-white rounded-3xl p-12 border border-dashed border-slate-200 flex flex-col items-center text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <SearchX size={40} className="text-slate-300" />
           </div>
           <h3 className="text-xl font-bold text-slate-800">No Record Found</h3>
           <p className="text-slate-500 max-w-xs mt-2">
             We couldn't find a pass associated with <span className="font-bold text-slate-700">{searchQuery}</span>.
           </p>
        </div>
      )}

      {/* Results Section */}
      {!loading && statusData && (
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {statusData.status === 'Pending' && (
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-t-3xl border-b-0 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
              <p className="text-sm text-orange-800 font-medium">
                Waiting for <span className="font-bold">{statusData.host}</span> to approve...
              </p>
            </div>
          )}

          <div className={`bg-white ${statusData.status === 'Pending' ? 'rounded-b-3xl' : 'rounded-3xl'} border border-slate-100 shadow-xl overflow-hidden`}>
            <div className={`px-8 py-5 border-b flex justify-between items-center ${statusData.status === 'Approved' ? 'bg-emerald-50/50 border-emerald-50' : 'bg-blue-50/50 border-blue-50'}`}>
              <div className={`flex items-center gap-3 ${statusData.status === 'Approved' ? 'text-emerald-600' : 'text-blue-600'}`}>
                {statusData.status === 'Approved' ? <CheckCircle2 size={22} /> : <Clock size={22} />}
                <span className="text-xl font-bold tracking-tight">Status: {statusData.status}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Ref: {statusData.refId}</span>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-200">
                  {statusData.url ? (
                    <img src={statusData.url} alt="Visitor" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-slate-300" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">{statusData.name}</h3>
                  <p className="text-slate-500 text-sm font-medium">{statusData.purpose}</p>
                  <div className="pt-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Host</p>
                    <p className="text-slate-800 font-semibold">{statusData.host}</p>
                  </div>
                </div>
              </div>

              {/* DYNAMIC QR CODE SECTION */}
              <div className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center space-y-3 transition-colors ${statusData.status === 'Approved' ? 'bg-white border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                {statusData.status === 'Approved' ? (
                  <>
                    <div className="p-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <QRCodeSVG 
                        value={statusData.refId} // The scanner will read this ID
                        size={120}
                        level="H" // High error correction
                        includeMargin={false}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Authorized Access</p>
                      <p className="text-[9px] text-slate-400 font-medium">Show this at the gate</p>
                    </div>
                  </>
                ) : (
                  <>
                    <QrCode size={64} className="text-slate-200 grayscale opacity-40" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight px-4 leading-relaxed">
                      QR Pass will generate <br/> after host approval
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPage;