import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Save, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  UserHealthProfile,
  PersonalInfo,
  LifestyleData,
} from "@/types/health";

export default function Add() {
  const { healthProfile, updateHealthProfile, user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Personal Info
  const [personal, setPersonal] = useState<PersonalInfo>(
    healthProfile?.personalInfo || {
      name: user?.name || "", //keep internally
      age: 0,
      gender: "Male",
      height: 0,
      weight: 0,
      bloodGroup: "",
      location: "",
    }
  );

  // Medical
  const [medicalNotes, setMedicalNotes] = useState(
    healthProfile?.medicalHistory.otherNotes || ""
  );

  const [medications, setMedications] = useState(
    healthProfile?.medicalHistory.medications || []
  );

  // Lifestyle
  const [lifestyle, setLifestyle] = useState<LifestyleData>(
    healthProfile?.lifestyle || {
      exerciseFrequency: "Sedentary",
      averageSleep: 7,
      dietType: "Balanced",
      stressLevel: "Moderate",
      smokerStatus: "Never",
      alcoholConsumption: "Never",
      jobType: "",
      notes: "",
    }
  );

  // Medication Functions
  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const updateMedication = (
    index: number,
    field: "name" | "dosage" | "frequency",
    value: string
  ) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  // Save Handlers
  const handleSavePersonal = () => {
    const updated: UserHealthProfile = {
      userId: user?.id || "",
      personalInfo: personal,
      medicalHistory: {
        conditions: healthProfile?.medicalHistory.conditions || [],
        medications,
        otherNotes: medicalNotes,
      },
      familyHistory:
        healthProfile?.familyHistory || { members: [], geneticDiseases: [] },
      lifestyle,
      dailyMetrics: healthProfile?.dailyMetrics || [],
      createdAt: healthProfile?.createdAt || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    updateHealthProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveLifestyle = () => {
    const updated = {
      ...healthProfile!,
      lifestyle,
      lastUpdated: new Date().toISOString(),
    };

    updateHealthProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveMedical = () => {
    const updated = {
      ...healthProfile!,
      medicalHistory: {
        ...healthProfile?.medicalHistory,
        medications,
        otherNotes: medicalNotes,
      },
      lastUpdated: new Date().toISOString(),
    };

    updateHealthProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add/Edit Information</h1>

        {saved && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-200 flex items-center gap-2">
            <AlertCircle size={18} />
            <span>Information saved successfully!</span>
          </div>
        )}

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
          </TabsList>

          {/* PERSONAL TAB */}
          <TabsContent value="personal" className="space-y-4 mt-6">
            <Input
              type="number"
              value={personal.age || ""}
              onChange={(e) =>
                setPersonal({
                  ...personal,
                  age: parseInt(e.target.value),
                })
              }
              placeholder="Age"
            />
            <Input
              type="number"
              value={personal.height || ""}
              onChange={(e) =>
                setPersonal({
                  ...personal,
                  height: parseInt(e.target.value),
                })
              }
              placeholder="Height (cm)"
            />
            <Input
              type="number"
              value={personal.weight || ""}
              onChange={(e) =>
                setPersonal({
                  ...personal,
                  weight: parseInt(e.target.value),
                })
              }
              placeholder="Weight (kg)"
            />

            <Button onClick={handleSavePersonal} className="w-full">
              <Save className="mr-2" size={18} />
              Save Personal Info
            </Button>
          </TabsContent>

          {/* LIFESTYLE TAB */}
          <TabsContent value="lifestyle" className="space-y-4 mt-6">
            <Input
              value={lifestyle.dietType}
              onChange={(e) =>
                setLifestyle({
                  ...lifestyle,
                  dietType: e.target.value,
                })
              }
              placeholder="Diet Type"
            />

            <Button onClick={handleSaveLifestyle} className="w-full">
              <Save className="mr-2" size={18} />
              Save Lifestyle Info
            </Button>
          </TabsContent>

          {/* MEDICAL TAB */}
          <TabsContent value="medical" className="space-y-6 mt-6">

            <h2 className="text-lg font-semibold">Medications</h2>

            {medications.map((med, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-4 rounded-lg space-y-3"
              >
                <Input
                  placeholder="Medication Name"
                  value={med.name}
                  onChange={(e) =>
                    updateMedication(index, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) =>
                    updateMedication(index, "dosage", e.target.value)
                  }
                />
                <Input
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) =>
                    updateMedication(index, "frequency", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMedication(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button onClick={addMedication} type="button">
              + Add Medication
            </Button>

            <textarea
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              placeholder="Medical Notes"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-[120px]"
            />

            <Button onClick={handleSaveMedical} className="w-full">
              <Save className="mr-2" size={18} />
              Save Medical Info
            </Button>
          </TabsContent>

          {/* FAMILY TAB (UNCHANGED) */}
          <TabsContent value="family" className="space-y-4 mt-6">
            <textarea
              placeholder="Family medical history..."
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-[120px]"
            />
            <Button className="w-full">
              <Save className="mr-2" size={18} />
              Save Family History
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
