export interface PersonalInfo {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // cm
  weight: number; // kg
  bloodGroup: string;
  location: string;
}

export interface MedicalCondition {
  name: string;
  diagnosedYear: number;
  notes?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface MedicalHistory {
  conditions: MedicalCondition[];
  medications: Medication[];
  otherNotes: string;
}

export interface FamilyMember {
  relation: 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Grandparent' | 'Other';
  name?: string;
  conditions: string[];
  notes?: string;
}

export interface FamilyHistory {
  members: FamilyMember[];
  geneticDiseases: string[];
}

export interface LifestyleData {
  exerciseFrequency: string;
  averageSleep: number;
  dietType: string;
  stressLevel: 'Low' | 'Moderate' | 'High';
  smokerStatus: 'Never' | 'Former' | 'Current';
  alcoholConsumption: string;
  jobType: string;
  notes: string;
}

export interface DailyMetric {
  date: string;
  steps: number;
  sleepHours: number;
  systolicBP: number;
  diastolicBP: number;
  fastingGlucose?: number;
  notes?: string;
}

export interface UserHealthProfile {
  userId: string;
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  familyHistory: FamilyHistory;
  lifestyle: LifestyleData;
  dailyMetrics: DailyMetric[];
  createdAt: string;
  lastUpdated: string;
}

export function calculateBMI(height: number, weight: number): number {
  return Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
}

export function calculateRiskScore(profile: UserHealthProfile): {
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  factors: string[];
} {
  let score = 0;
  const factors: string[] = [];

  // 🔹 Age (reduced weight)
  if (profile.personalInfo.age > 60) {
    score += 10;
    factors.push('Age over 60');
  } else if (profile.personalInfo.age > 45) {
    score += 6;
    factors.push('Age over 45');
  }

  // 🔹 BMI (reduced weight)
  const bmi = calculateBMI(
    profile.personalInfo.height,
    profile.personalInfo.weight
  );

  if (bmi > 30) {
    score += 8;
    factors.push('Obesity');
  } else if (bmi > 25) {
    score += 5;
    factors.push('Overweight');
  }

  // 🔹 Conditions (reduced)
  if (profile.medicalHistory.conditions.length > 0) {
    score += 6;
    factors.push('Chronic conditions');
  }

  // 🔹 Lifestyle (reduced)
  if (profile.lifestyle.stressLevel === 'High') {
    score += 5;
    factors.push('High stress');
  }

  if (profile.lifestyle.averageSleep < 6) {
    score += 6;
    factors.push('Poor sleep');
  }

  if (profile.lifestyle.smokerStatus === 'Current') {
    score += 8;
    factors.push('Current smoker');
  }

  if (profile.lifestyle.exerciseFrequency === 'Sedentary') {
    score += 6;
    factors.push('Sedentary lifestyle');
  }

  // 🔥🔥🔥 BLOOD PRESSURE — HIGH IMPACT
  // Dynamic BP contribution (Strong weight)
if (profile.dailyMetrics.length > 0) {
  const recentMetrics = profile.dailyMetrics.slice(-7);

  const avgSystolic =
    recentMetrics.reduce((sum, m) => sum + m.systolicBP, 0) /
    recentMetrics.length;

  const avgDiastolic =
    recentMetrics.reduce((sum, m) => sum + m.diastolicBP, 0) /
    recentMetrics.length;

  // Base normal values
  const normalSys = 120;
  const normalDia = 80;

  // Calculate how much above normal
  const sysExcess = Math.max(0, avgSystolic - normalSys);
  const diaExcess = Math.max(0, avgDiastolic - normalDia);

  // Scale aggressively
  const bpScore = (sysExcess * 0.8) + (diaExcess * 0.6);

  score += Math.min(bpScore, 40); // Cap BP contribution at 40%

  if (sysExcess > 0 || diaExcess > 0) {
    factors.push("Elevated Blood Pressure");
  }
}

  // Cap score at 100
  score = Math.min(Math.round(score), 100);

  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';

  if (score < 25) riskLevel = 'Low';
  else if (score < 50) riskLevel = 'Moderate';
  else if (score < 75) riskLevel = 'High';
  else riskLevel = 'Critical';

  return { riskScore: score, riskLevel, factors };
}
