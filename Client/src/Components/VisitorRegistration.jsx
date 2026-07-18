import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Camera, User, Phone, Mail, BookOpen, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";

const VisitorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    purpose: '',
    hostId: '',
    hostName: '',
    email: ''
  });

  const [photo, setPhoto] = useState(null);
  const [hosts, setHosts] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef(null);

const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`https://gatekeeper-05sf.onrender.com/staffdata`);
        if (res.data.success) {
          setHosts(res.data.data.filter(p => p.role?.toLowerCase() === 'host'));
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };
    fetchStaff();
    return () => {};
  }, []);

  
const capturePhoto = () => {
  if (!webcamRef.current) {
    toast.error("Camera not ready");
    return;
  }

  const imageSrc = webcamRef.current.getScreenshot();

  if (!imageSrc) {
    toast.error("Unable to capture image");
    return;
  }

  setPhoto(imageSrc);
  setCameraOpen(false);
};
 

  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!photo) return toast.error("A visitor photo is required!");
    if (!formData.hostId) return toast.error("Please select a host!");

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        number: formData.number,
        purpose: formData.purpose,
        email: formData.email,
        url: photo,          
        host: formData.hostName, 
        hostId: formData.hostId, 
      };

      const res = await axios.post(`https://gatekeeper-05sf.onrender.com/register`, payload);
      if (res.data.success) {
        toast.success("Success! Reference ID: " + res.data.data.refId);
        setFormData({ name: '', number: '', purpose: '', hostId: '', hostName: '', email: '' });
        setPhoto(null);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full  bg-gray-100 flex items-center justify-center p-2 sm:p-4 text-black">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl flex flex-col-reverse md:flex-row overflow-hidden h-auto md:h-[85vh]">
        
        {/* Left Side: Form Details */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Visitor Registration</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" icon={<User size={16}/>} value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              <InputField label="Phone Number" icon={<Phone size={16}/>} value={formData.number} onChange={v => setFormData({...formData, number: v})} />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Select Host</label>
              <select 
                required 
                className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 w-full"
                value={formData.hostId} 
                onChange={e => {
                  const h = hosts.find(x => x._id === e.target.value);
                  setFormData({...formData, hostId: e.target.value, hostName: h?.name || ''});
                }}
              >
                <option value="">-- Choose Employee --</option>
                {hosts.map(h => <option key={h._id} value={h._id}>{h.name} ({h.dept})</option>)}
              </select>
            </div>
            
            <InputField label="Purpose" icon={<BookOpen size={16}/>} value={formData.purpose} onChange={v => setFormData({...formData, purpose: v})} />
            <InputField label="Email" icon={<Mail size={16}/>} type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
            
            <button type="submit" disabled={loading} className="w-full py-3.5 sm:py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 mt-2 transition-all">
              {loading ? "Processing..." : "Complete Registration"}
            </button>
          </form>
        </div>

        {/* Right Side: Camera Section */}
       <div className="w-full md:w-[40%] bg-gray-900 flex flex-col items-center justify-center p-6 sm:p-8">

  <div className="relative w-full aspect-square max-w-[280px] rounded-full overflow-hidden">


    {photo ? (
      <img
        src={photo}
        alt="Visitor"
        className="w-full h-full object-cover"
      />
    ) : cameraOpen ? (
     <Webcam
  ref={webcamRef}
  audio={false}
  mirrored
  screenshotFormat="image/jpeg"
  screenshotQuality={0.8}
  videoConstraints={{
    facingMode: { ideal: "user" },
    width: { ideal: 640 },
    height: { ideal: 480 },
  }}
  onUserMedia={() => {
    console.log("Camera started");
    toast.success("Camera started");
  }}
  onUserMediaError={(err) => {
    console.error(err);
    toast.error(err.message || "Unable to access camera");
  }}
  className="w-full h-full object-cover"
/>
    ) : (
      <Camera size={45} className="text-gray-500" />
    )}

  </div>

  <div className="mt-6">

    {!cameraOpen && !photo && (
     <button
  type="button"
  onClick={() => {
    alert("Button clicked");
    setCameraOpen(true);
  }}
  style={{
    position: "relative",
    zIndex: 9999,
  }}
  className="bg-white text-black px-6 py-2 rounded-full font-bold"
>
  Open Camera
</button>
    )}

    {cameraOpen && (
     <button
  type="button"
  onPointerDown={(e) => {
    e.preventDefault();
    capturePhoto();
  }}
  className="bg-green-600 text-white px-8 py-2 rounded-full font-bold touch-manipulation"
>
  Capture
</button>
    )}

    {photo && (
      <button
        type="button"
        onClick={() => {
          setPhoto(null);
          setCameraOpen(true);
        }}
        className="text-gray-300 flex items-center gap-2 mt-2"
      >
        <RefreshCcw size={15} />
        Retake
      </button>
    )}

  </div>

</div>

      </div>
    </div>
  );
};

const InputField = ({ label, icon, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-2">{icon} {label}</label>
    <input type={type} required value={value} onChange={e => onChange(e.target.value)} className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 text-sm" placeholder={`Enter ${label}`} />
  </div>
);

export default VisitorRegistration;