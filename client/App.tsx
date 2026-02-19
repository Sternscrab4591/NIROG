import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import MedicalHistory from "./pages/MedicalHistory";
import LifestyleDetail from "./pages/LifestyleDetail";
import FamilyHistoryDetail from "./pages/FamilyHistoryDetail";
import Add from "./pages/Add";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-history"
        element={
          <ProtectedRoute>
            <MedicalHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lifestyle-detail"
        element={
          <ProtectedRoute>
            <LifestyleDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/family-history-detail"
        element={
          <ProtectedRoute>
            <FamilyHistoryDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/terms"
        element={
          <ProtectedRoute>
            <Terms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/privacy"
        element={
          <ProtectedRoute>
            <Privacy />
          </ProtectedRoute>
        }
      />

      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function MainContent() {
  const { showSplash } = useAuth();

  if (showSplash) {
    return <Splash />;
  }

  return <AppRoutes />;
}

const App = () => {

  useEffect(() => {
  let handler: any;

  const setupBackButton = async () => {
    if (Capacitor.isNativePlatform()) {

      // Fix header under battery
      StatusBar.setOverlaysWebView({ overlay: false });

      handler = await CapacitorApp.addListener("backButton", () => {

        if (window.location.pathname === "/") {
          // Minimize app instead of killing it
          CapacitorApp.minimizeApp();
        } else {
          window.history.back();
        }

      });
    }
  };

  setupBackButton();

  return () => {
    if (handler) {
      handler.remove();
    }
  };

}, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MainContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


createRoot(document.getElementById("root")!).render(<App />);
