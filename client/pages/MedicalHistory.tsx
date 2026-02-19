import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Edit2, Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MedicalHistory() {
  const { healthProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Medical History</h1>
          <Button onClick={() => navigate("/add")} size="sm">
            <Edit2 className="mr-2" size={16} />
            Edit
          </Button>
        </div>

        {!healthProfile ? (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
            <p className="text-foreground/70 mb-6">
              No medical history added yet.
            </p>
            <Button onClick={() => navigate("/add")}>
              <Plus className="mr-2" size={18} />
              Add Medical Information
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Chronic Conditions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Chronic Conditions</h2>
              {healthProfile.medicalHistory.conditions.length === 0 ? (
                <p className="text-foreground/60">No chronic conditions recorded</p>
              ) : (
                <div className="space-y-3">
                  {healthProfile.medicalHistory.conditions.map((condition, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-primary mt-1" size={20} />
                        <div>
                          <h3 className="font-semibold">{condition.name}</h3>
                          <p className="text-sm text-foreground/60 mt-1">
                            Diagnosed: {condition.diagnosedYear}
                          </p>
                          {condition.notes && (
                            <p className="text-sm text-foreground/70 mt-2">{condition.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Medications */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Current Medications</h2>
              {healthProfile.medicalHistory.medications.length === 0 ? (
                <p className="text-foreground/60">No medications recorded</p>
              ) : (
                <div className="space-y-3">
                  {healthProfile.medicalHistory.medications.map((med, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4">
                      <h3 className="font-semibold">{med.name}</h3>
                      <div className="grid grid-cols-2 gap-3 mt-2 text-sm text-foreground/70">
                        <div>
                          <p className="text-xs text-foreground/50">Dosage</p>
                          <p className="font-medium text-foreground">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/50">Frequency</p>
                          <p className="font-medium text-foreground">{med.frequency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other Notes */}
            {healthProfile.medicalHistory.otherNotes && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
                <p className="text-foreground/70">{healthProfile.medicalHistory.otherNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
