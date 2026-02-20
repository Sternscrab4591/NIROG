import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Plus, AlertCircle, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { calculateRiskScore, calculateBMI } from "@/types/health";

export default function Index() {
  const { user, healthProfile } = useAuth();
  const navigate = useNavigate();
  const [show3DView, setShow3DView] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Low');
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [riskChange, setRiskChange] = useState(0);
  const previousRiskRef = useRef<number | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const hasCompletedOnboarding = user.hasCompletedOnboarding;

  useEffect(() => {
  if (!healthProfile) return;

  const risk = calculateRiskScore(healthProfile);

  const prev = previousRiskRef.current;

  // First time mount → just store baseline
  if (prev === null) {
    previousRiskRef.current = risk.riskScore;
    setRiskScore(risk.riskScore);
    setRiskLevel(risk.riskLevel);
    setRiskFactors(risk.factors);
    return;
  }

  // If value changed
  if (risk.riskScore !== prev) {
    const diff = risk.riskScore - prev;

    setRiskChange(diff);

    setTimeout(() => {
      setRiskChange(0);
    }, 3000);

    previousRiskRef.current = risk.riskScore;
    setRiskScore(risk.riskScore);
  }

  setRiskLevel(risk.riskLevel);
  setRiskFactors(risk.factors);

}, [healthProfile]);

  const bmi = healthProfile
    ? calculateBMI(
        healthProfile.personalInfo.height,
        healthProfile.personalInfo.weight
      )
    : 0;
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-foreground/60 mt-2">
            {hasCompletedOnboarding && healthProfile
              ? "Your personalized health overview"
              : hasCompletedOnboarding
              ? "Your health overview"
              : "Complete your profile to get started"}
          </p>
        </div>

        {!hasCompletedOnboarding ? (
          /* Onboarding State */
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="font-semibold text-lg mb-4">Get Started</h2>
              <p className="text-sm text-foreground/70 mb-6">
                Add your lifestyle and medical history to begin your health risk assessment.
              </p>
              <Button
                onClick={() => navigate("/add")}
                className="w-full"
              >
                <Plus className="mr-2" size={18} />
                Add Your Information
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition"
                onClick={() => navigate("/add")}>
                <div className="flex items-center gap-3">
                  <Activity className="text-primary" size={24} />
                  <div>
                    <h3 className="font-semibold">Lifestyle Information</h3>
                    <p className="text-sm text-foreground/60">Add exercise, diet, sleep habits</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition"
                onClick={() => navigate("/add")}>
                <div className="flex items-center gap-3">
                  <Heart className="text-primary" size={24} />
                  <div>
                    <h3 className="font-semibold">Medical History</h3>
                    <p className="text-sm text-foreground/60">Add previous conditions, medications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Main Dashboard */
          <div className="space-y-6">
            {/* Risk Meter */}
            <div
              className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary transition"
              onClick={() => setShow3DView(!show3DView)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Health Risk Assessment</h2>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  riskLevel === "Low"
                    ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-200"
                    : riskLevel === "Moderate"
                    ? "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-200"
                    : riskLevel === "High"
                    ? "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-200"
                    : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-200"
                }`}>
                  {riskLevel} Risk
                </span>
              </div>

              {/* Progress Bar */}
                <div className="space-y-3 mb-6">

                  {riskChange !== 0 && (
                    <div
                      className={`text-sm font-semibold mt-2 transition-opacity duration-700 ${
                        riskChange > 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {riskChange > 0 ? "▲" : "▼"} {Math.abs(riskChange)}% change
                    </div>
                  )}

                  {/* Labels */}
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-green-500">Low Risk</span>
                    <span className="text-red-500">High Risk</span>
                  </div>

                  {/* Bar */}
                  <div className="relative w-full h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">

                    {/* Filled Portion */}
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-in-out"
                      style={{
                        width: `${riskScore}%`,
                        background: "linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)"
                      }}
                    />

                  </div>

                  {/* Score Text */}
                  <div className="text-center text-xs text-foreground/60">
                    Risk Score: {riskScore}/100
                  </div>

                </div>


              {/* 3D View */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  show3DView ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 bg-secondary rounded-lg border border-border transform transition-transform duration-500 hover:rotate-x-2 hover:rotate-y-1">

                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-blue-900/20 rounded flex flex-col items-center justify-center border border-blue-200 dark:border-blue-800 p-4 shadow-lg">

                    <p className="text-sm text-foreground/70 font-medium mb-3">
                      Risk Factor Breakdown
                    </p>

                    <div className="w-full space-y-2 text-xs">
                      {riskFactors.slice(0, 5).map((factor, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-foreground/70">{factor}</span>
                        </div>
                      ))}

                      {riskFactors.length > 5 && (
                        <p className="text-foreground/50 italic">
                          +{riskFactors.length - 5} more factors
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              </div>


              {/* Personalized Recommendations */}
              <div className={`rounded-lg p-4 mb-4 ${
                riskLevel === "Critical"
                  ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                  : riskLevel === "High"
                  ? "bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800"
                  : "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
              }`}>
                <h3 className="font-semibold text-sm mb-3">Key Recommendations</h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  {healthProfile?.lifestyle.averageSleep && healthProfile.lifestyle.averageSleep < 7 && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>Improve sleep: Currently {healthProfile.lifestyle.averageSleep} hrs/night, target 7-8 hours</span>
                    </li>
                  )}
                  {healthProfile && calculateBMI(healthProfile.personalInfo.height, healthProfile.personalInfo.weight) > 25 && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>Weight management: BMI is {bmi} (Overweight), aim for healthy range</span>
                    </li>
                  )}
                  {healthProfile?.lifestyle.stressLevel === "High" && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>Stress reduction: Practice meditation or yoga daily</span>
                    </li>
                  )}
                  {healthProfile?.lifestyle.exerciseFrequency === "Sedentary" && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>Increase physical activity: Aim for 30+ minutes of daily exercise</span>
                    </li>
                  )}
                  {healthProfile?.medicalHistory.conditions.length === 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>Maintain current health habits and regular check-ups</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-foreground/50 flex items-start gap-2">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                <span>*AI is only providing lifestyle suggestions and not a full diagnosis. A doctor visit is recommended for accurate medical assessment.</span>
              </p>
            </div>

            {/* Health Sections */}
            {healthProfile && (
              <div className="grid gap-4">
                {/* Lifestyle Information */}
                <button
                  onClick={() => navigate("/lifestyle-detail")}
                  className="text-left bg-card border border-border rounded-lg p-4 hover:border-primary hover:bg-secondary/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="text-primary" size={20} />
                      <div>
                        <h3 className="font-semibold">Lifestyle Information</h3>
                        <p className="text-xs text-foreground/60 mt-1">
                          {healthProfile.lifestyle.exerciseFrequency} • {healthProfile.lifestyle.averageSleep} hrs sleep
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-foreground/40" />
                  </div>
                </button>

                {/* Medical History */}
                <button
                  onClick={() => navigate("/medical-history")}
                  className="text-left bg-card border border-border rounded-lg p-4 hover:border-primary hover:bg-secondary/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="text-primary" size={20} />
                      <div>
                        <h3 className="font-semibold">Medical History</h3>
                        <p className="text-xs text-foreground/60 mt-1">
                          {healthProfile.medicalHistory.conditions.length} condition(s) • {healthProfile.medicalHistory.medications.length} medication(s)
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-foreground/40" />
                  </div>
                </button>

                {/* Family Medical History */}
                <button
                  onClick={() => navigate("/family-history-detail")}
                  className="text-left bg-card border border-border rounded-lg p-4 hover:border-primary hover:bg-secondary/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-primary" size={20} />
                      <div>
                        <h3 className="font-semibold">Family Medical History</h3>
                        <p className="text-xs text-foreground/60 mt-1">
                          {healthProfile.familyHistory.members.length} family member(s) with conditions
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-foreground/40" />
                  </div>
                </button>

                {/* Health App Integration */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Health App Integration</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/settings")}
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    Link Apple Health, Google Fit, Samsung Health
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
