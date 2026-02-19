import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../nirog-logo.png";

export default function Splash() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/login"); // Change to "/" if you want home page
          return 100;
        }
        return prev + 2;
      });
    }, 40); // speed of progress

    return () => clearInterval(interval);
  }, [navigate]);

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-950 text-white">
      
      {/* Logo */}
      <img
        src={logo}
        alt="NIROG Logo"
        className="w-28 h-28 object-contain mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      />

      {/* App Name */}
      <h1 className="text-3xl font-bold mb-8 tracking-wide">
        NIROG
      </h1>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm opacity-80">
        Loading... {progress}%
      </p>

    </div>
  );
}
