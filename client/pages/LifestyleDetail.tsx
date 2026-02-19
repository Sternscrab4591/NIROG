import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Edit2, AlertCircle } from "lucide-react";

export default function LifestyleDetail() {
  const { healthProfile } = useAuth();
  const navigate = useNavigate();

  if (!healthProfile) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
            <p className="text-foreground/70 mb-6">No lifestyle information added yet.</p>
            <Button onClick={() => navigate("/add")}>Add Lifestyle Information</Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const lifestyle = healthProfile.lifestyle;
  const averageSteps =
    healthProfile.dailyMetrics.length > 0
      ? Math.round(
          healthProfile.dailyMetrics.reduce((sum, m) => sum + m.steps, 0) /
            healthProfile.dailyMetrics.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Lifestyle Information</h1>
          <Button onClick={() => navigate("/add")} size="sm">
            <Edit2 className="mr-2" size={16} />
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          {/* Exercise */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">🏃</span>
              Exercise Frequency
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-2xl font-bold text-primary">{lifestyle.exerciseFrequency}</p>
              <p className="text-sm text-foreground/60 mt-2">
                {lifestyle.exerciseFrequency === "Sedentary"
                  ? "Little to no regular exercise"
                  : lifestyle.exerciseFrequency === "Occasional"
                  ? "1-2 times per week"
                  : lifestyle.exerciseFrequency === "Moderate"
                  ? "3-4 times per week"
                  : lifestyle.exerciseFrequency === "Regular"
                  ? "5-6 times per week"
                  : "Daily exercise"}
              </p>
            </div>
            {averageSteps > 0 && (
              <div className="mt-4">
                <p className="text-sm text-foreground/70 mb-2">Average Daily Steps (Last 10 Days)</p>
                <p className="text-3xl font-bold text-primary">{averageSteps.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Sleep */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">😴</span>
              Sleep Pattern
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-2xl font-bold text-primary">{lifestyle.averageSleep} hours/night</p>
              <p className={`text-sm mt-2 ${
                lifestyle.averageSleep < 6
                  ? "text-red-600 dark:text-red-400"
                  : lifestyle.averageSleep < 7
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-green-600 dark:text-green-400"
              }`}>
                {lifestyle.averageSleep < 6
                  ? "⚠️ Below recommended (7-9 hours)"
                  : lifestyle.averageSleep < 7
                  ? "⚠️ Slightly below recommended"
                  : "✓ Within healthy range (7-9 hours)"}
              </p>
            </div>
          </div>

          {/* Diet */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">🍽️</span>
              Diet Type
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-lg font-semibold text-foreground">{lifestyle.dietType}</p>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">😰</span>
              Stress Level
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className={`text-2xl font-bold ${
                lifestyle.stressLevel === "Low"
                  ? "text-green-600 dark:text-green-400"
                  : lifestyle.stressLevel === "Moderate"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                {lifestyle.stressLevel}
              </p>
            </div>
          </div>

          {/* Smoking Status */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">🚭</span>
              Smoking Status
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-lg font-semibold text-foreground">{lifestyle.smokerStatus}</p>
              {lifestyle.smokerStatus === "Former" && lifestyle.notes && (
                <p className="text-sm text-foreground/60 mt-2">{lifestyle.notes}</p>
              )}
            </div>
          </div>

          {/* Alcohol Consumption */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">🍷</span>
              Alcohol Consumption
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-lg font-semibold text-foreground">{lifestyle.alcoholConsumption}</p>
            </div>
          </div>

          {/* Job Type */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary text-2xl">💼</span>
              Occupation
            </h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-lg font-semibold text-foreground">
                {lifestyle.jobType || "Not specified"}
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          {lifestyle.notes && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
              <p className="text-foreground/70">{lifestyle.notes}</p>
            </div>
          )}

          {/* Health Tips */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-blue-600 dark:text-blue-400" size={24} />
              Health Recommendations
            </h2>
            <ul className="space-y-3 text-sm text-foreground/70">
              {lifestyle.exerciseFrequency === "Sedentary" && (
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span>Increase daily physical activity: Aim for at least 150 minutes of moderate exercise per week</span>
                </li>
              )}
              {lifestyle.averageSleep < 7 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span>Improve sleep quality: Try to sleep 7-9 hours per night for better health</span>
                </li>
              )}
              {lifestyle.stressLevel === "High" && (
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span>Manage stress: Practice meditation, yoga, or other relaxation techniques daily</span>
                </li>
              )}
              {lifestyle.smokerStatus === "Current" && (
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span>Consider quitting smoking: Consult with healthcare provider for support</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
