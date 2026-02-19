import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Edit2, LogOut, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calculateBMI } from "@/types/health";
import { useState } from "react";

export default function Profile() {
  const { user, healthProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedMetric, setSelectedMetric] = useState<{
    date: string;
    steps: number;
  } | null>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const profileInfo = healthProfile?.personalInfo;
  const bmi = profileInfo
    ? calculateBMI(profileInfo.height, profileInfo.weight)
    : 0;

  const getBPColor = (systolic: number, diastolic: number) => {
    if (systolic > 140 || diastolic > 90)
      return "text-red-600 dark:text-red-400";
    if (systolic > 130 || diastolic > 80)
      return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-start gap-6">

            {/* Profile Photo */}
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded cursor-pointer">
                Edit
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-foreground/60">{user?.email}</p>

              {profileInfo && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-foreground/60">Age</p>
                    <p className="font-semibold">{profileInfo.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Weight</p>
                    <p className="font-semibold">
                      {profileInfo.weight} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Height</p>
                    <p className="font-semibold">
                      {profileInfo.height} cm
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step Graph */}
        {healthProfile && healthProfile.dailyMetrics.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-lg">
              Recent Daily Steps
            </h3>

            <div className="bg-card border border-border rounded-lg p-6">

              <div className="h-48 flex items-end justify-around gap-1">
                {healthProfile.dailyMetrics.slice(-7).map((metric, i) => {
                  const maxSteps = Math.max(
                    ...healthProfile.dailyMetrics.map((m) => m.steps),
                    10000
                  );
                  const percentage = (metric.steps / maxSteps) * 100;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedMetric(metric)}
                      className={`flex-1 rounded-t cursor-pointer transition ${
                        selectedMetric?.date === metric.date
                          ? "bg-blue-500"
                          : "bg-gradient-to-t from-primary to-blue-400 hover:opacity-80"
                      }`}
                      style={{ height: `${Math.max(percentage, 5)}%` }}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between text-xs text-foreground/60 mt-3">
                {healthProfile.dailyMetrics.slice(-7).map((metric, i) => (
                  <span key={i}>
                    {new Date(metric.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                ))}
              </div>

              {selectedMetric && (
                <div className="mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                  <p className="text-sm text-zinc-400">
                    {new Date(selectedMetric.date).toLocaleDateString()}
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {selectedMetric.steps.toLocaleString()} steps
                  </p>
                </div>
              )}
            </div>

            {/* Blood Pressure */}
            <h3 className="font-semibold text-lg mt-6">
              Recent Blood Pressure
            </h3>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-3">
                {healthProfile.dailyMetrics.slice(-7).map((metric, i) => {
                  const previous =
                    healthProfile.dailyMetrics.slice(-7)[i - 1];

                  const trend =
                    previous &&
                    metric.systolicBP > previous.systolicBP
                      ? "up"
                      : previous &&
                        metric.systolicBP < previous.systolicBP
                      ? "down"
                      : null;

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded"
                    >
                      <span className="text-sm text-foreground/70">
                        {new Date(metric.date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${getBPColor(
                            metric.systolicBP,
                            metric.diastolicBP
                          )}`}
                        >
                          {metric.systolicBP}/{metric.diastolicBP}
                        </span>

                        {trend === "up" && (
                          <ArrowUp
                            size={16}
                            className="text-red-500"
                          />
                        )}
                        {trend === "down" && (
                          <ArrowDown
                            size={16}
                            className="text-green-500"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 text-xs space-y-1">
                <p className="text-green-600 dark:text-green-400">
                  ● Normal
                </p>
                <p className="text-orange-600 dark:text-orange-400">
                  ● Elevated
                </p>
                <p className="text-red-600 dark:text-red-400">
                  ● High
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => navigate("/add")}
          >
            <Edit2 className="mr-2" size={18} />
            Edit Profile
          </Button>

          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
