import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserHealthProfile } from "@/types/health";

interface User {
  id: string;
  email: string;
  name: string;
  hasCompletedOnboarding: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  showSplash: boolean;
  healthProfile: UserHealthProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setShowSplash: (show: boolean) => void;
  updateHealthProfile: (profile: UserHealthProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [healthProfile, setHealthProfile] = useState<UserHealthProfile | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [showSplash, setShowSplash] = useState(true);

// Restore session on app launch
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedProfile = localStorage.getItem("healthProfile");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  if (savedProfile) {
    setHealthProfile(JSON.parse(savedProfile));
  }

  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  const login = async (email: string, password: string) => {
    // Demo account 1: Basic user
    if (email === "demo@example.com" && password === "demo123") {
      const demoUser: User = {
        id: "1",
        email,
        name: "Demo User",
        hasCompletedOnboarding: false,
      };
      setUser(demoUser);
      localStorage.setItem("user", JSON.stringify(demoUser));
      localStorage.removeItem("healthProfile");
      setHealthProfile(null);
    }
    // Demo account 2: Rajesh Mehta - Full functional demo
    else if (email === "rajesh@example.com" && password === "rajesh123") {
      const rajeshUser: User = {
        id: "2",
        email,
        name: "Rajesh Mehta",
        hasCompletedOnboarding: true,
      };

      const rajeshProfile: UserHealthProfile = {
        userId: "2",
        personalInfo: {
          name: "Rajesh Mehta",
          age: 52,
          gender: "Male",
          height: 173,
          weight: 84,
          bloodGroup: "B+",
          location: "Mumbai, India",
        },
        medicalHistory: {
          conditions: [
            {
              name: "Hypertension",
              diagnosedYear: 2019,
              notes: "Stage 1 Hypertension",
            },
            {
              name: "Type 2 Diabetes Mellitus",
              diagnosedYear: 2021,
              notes: "Controlled with medication",
            },
            {
              name: "Mild Left Ventricular Hypertrophy",
              diagnosedYear: 2023,
              notes: "Cardiac condition",
            },
          ],
          medications: [
            {
              name: "Amlodipine",
              dosage: "5mg",
              frequency: "Once daily",
            },
            {
              name: "Metformin",
              dosage: "500mg",
              frequency: "Twice daily",
            },
            {
              name: "Atorvastatin",
              dosage: "10mg",
              frequency: "Once daily",
            },
          ],
          otherNotes: "Occasional sleep disturbances (wakes up 2-3 times at night)",
        },
        familyHistory: {
          members: [
            {
              relation: "Father",
              conditions: ["Cardiac arrest"],
              notes: "Died at age 61",
            },
            {
              relation: "Mother",
              conditions: ["Type 2 Diabetes"],
              notes: "Still living",
            },
            {
              relation: "Brother",
              conditions: ["Hypertension"],
              notes: "Elder brother",
            },
          ],
          geneticDiseases: ["Cardiac disease", "Diabetes"],
        },
        lifestyle: {
          exerciseFrequency: "Sedentary",
          averageSleep: 5.5,
          dietType: "Eats outside 3-4 times per week",
          stressLevel: "High",
          smokerStatus: "Former",
          alcoholConsumption: "Occasional (weekends)",
          jobType: "Accountant",
          notes: "Quit smoking 5 years ago",
        },
        dailyMetrics: [
          {
            date: "2024-01-20",
            steps: 4200,
            sleepHours: 5,
            systolicBP: 145,
            diastolicBP: 92,
            fastingGlucose: 145,
            notes: "Poor sleep, high stress at work",
          },
          {
            date: "2024-01-21",
            steps: 5800,
            sleepHours: 6,
            systolicBP: 138,
            diastolicBP: 88,
            fastingGlucose: 128,
            notes: "Better sleep, morning walk",
          },
          {
            date: "2024-01-22",
            steps: 6200,
            sleepHours: 6.5,
            systolicBP: 135,
            diastolicBP: 85,
            fastingGlucose: 122,
            notes: "Regular breakfast",
          },
          {
            date: "2024-01-23",
            steps: 3800,
            sleepHours: 4.5,
            systolicBP: 152,
            diastolicBP: 95,
            fastingGlucose: 155,
            notes: "High stress, ate outside",
          },
          {
            date: "2024-01-24",
            steps: 7200,
            sleepHours: 7,
            systolicBP: 132,
            diastolicBP: 82,
            fastingGlucose: 118,
            notes: "Good exercise, better diet",
          },
          {
            date: "2024-01-25",
            steps: 6500,
            sleepHours: 6.5,
            systolicBP: 138,
            diastolicBP: 86,
            fastingGlucose: 125,
            notes: "Consistent routine",
          },
          {
            date: "2024-01-26",
            steps: 2500,
            sleepHours: 5,
            systolicBP: 160,
            diastolicBP: 98,
            fastingGlucose: 160,
            notes: "Day 7 - Lowest activity and sleep",
          },
          {
            date: "2024-01-27",
            steps: 5500,
            sleepHours: 6.5,
            systolicBP: 140,
            diastolicBP: 87,
            fastingGlucose: 130,
            notes: "Recovery day",
          },
          {
            date: "2024-01-28",
            steps: 6800,
            sleepHours: 7,
            systolicBP: 134,
            diastolicBP: 83,
            fastingGlucose: 120,
            notes: "Back on track",
          },
          {
            date: "2024-01-29",
            steps: 7000,
            sleepHours: 7.5,
            systolicBP: 130,
            diastolicBP: 80,
            fastingGlucose: 115,
            notes: "Best day of the week",
          },
        ],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      setUser(rajeshUser);
      setHealthProfile(rajeshProfile);
      localStorage.setItem("user", JSON.stringify(rajeshUser));
      localStorage.setItem("healthProfile", JSON.stringify(rajeshProfile));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      hasCompletedOnboarding: false,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.removeItem("healthProfile");
    setHealthProfile(null);
  };

  const logout = () => {
    setUser(null);
    setHealthProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("healthProfile");
  };

  const updateHealthProfile = (profile: UserHealthProfile) => {
    setHealthProfile(profile);
    localStorage.setItem("healthProfile", JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        showSplash,
        healthProfile,
        login,
        register,
        logout,
        setShowSplash,
        updateHealthProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
