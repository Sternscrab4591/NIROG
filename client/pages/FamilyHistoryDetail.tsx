import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Edit2, AlertCircle, Users } from "lucide-react";

export default function FamilyHistoryDetail() {
  const { healthProfile } = useAuth();
  const navigate = useNavigate();

  if (!healthProfile) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
            <p className="text-foreground/70 mb-6">No family history information added yet.</p>
            <Button onClick={() => navigate("/add")}>Add Family History</Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const familyHistory = healthProfile.familyHistory;

  const getRelationEmoji = (relation: string) => {
    switch (relation) {
      case "Father":
        return "👨";
      case "Mother":
        return "👩";
      case "Brother":
        return "👨‍🤝‍👨";
      case "Sister":
        return "👩‍🤝‍👩";
      case "Grandparent":
        return "👴";
      default:
        return "👥";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Family Medical History</h1>
          <Button onClick={() => navigate("/add")} size="sm">
            <Edit2 className="mr-2" size={16} />
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          {/* Family Members */}
          {familyHistory.members.length === 0 ? (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
              <Users className="mx-auto mb-4 text-blue-600 dark:text-blue-400" size={48} />
              <p className="text-foreground/70 mb-6">No family members with medical conditions added yet.</p>
              <Button onClick={() => navigate("/add")}>Add Family Member</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {familyHistory.members.map((member, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{getRelationEmoji(member.relation)}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {member.relation}
                        {member.name && ` - ${member.name}`}
                      </h3>
                      {member.notes && (
                        <p className="text-sm text-foreground/60 mt-1">{member.notes}</p>
                      )}
                      {member.conditions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-semibold text-primary">Medical Conditions:</p>
                          <div className="flex flex-wrap gap-2">
                            {member.conditions.map((condition, j) => (
                              <span
                                key={j}
                                className="inline-block bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-sm"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Genetic Diseases */}
          {familyHistory.geneticDiseases.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-primary text-2xl">🧬</span>
                Genetic Diseases in Family
              </h2>
              <div className="flex flex-wrap gap-2">
                {familyHistory.geneticDiseases.map((disease, i) => (
                  <span
                    key={i}
                    className="inline-block bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-200 px-4 py-2 rounded-lg font-medium"
                  >
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Genetic Risk Summary */}
          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-orange-600 dark:text-orange-400" size={24} />
              Genetic Risk Assessment
            </h2>
            <div className="space-y-3 text-sm text-foreground/70">
              {familyHistory.members.length === 0 ? (
                <p>No family history data available for genetic risk assessment.</p>
              ) : (
                <>
                  <p className="font-semibold text-foreground mb-3">
                    You have {familyHistory.members.length} family member(s) with recorded medical conditions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>
                        Genetic predisposition may increase your risk for certain conditions present in your family
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>
                        Regular health screenings are recommended for conditions that run in your family
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>
                        Lifestyle modifications can help reduce the expression of genetic risk factors
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>
                        Consult a genetic counselor for personalized risk assessment and recommendations
                      </span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Preventive Measures</h2>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Maintain a healthy lifestyle with regular exercise and balanced nutrition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Schedule regular health check-ups and age-appropriate screenings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Monitor blood pressure, cholesterol, and blood sugar levels regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Avoid smoking and limit alcohol consumption</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Manage stress through meditation, yoga, or counseling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Maintain adequate sleep (7-9 hours per night)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
