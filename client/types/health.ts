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

  // Age risk (increases after 40)
  if (profile.personalInfo.age > 60) {
    score += 25;
    factors.push('Age over 60');
  } else if (profile.personalInfo.age > 50) {
    score += 15;
    factors.push('Age between 50-60');
  } else if (profile.personalInfo.age > 40) {
    score += 10;
    factors.push('Age between 40-50');
  }

  // BMI risk
  const bmi = calculateBMI(
    profile.personalInfo.height,
    profile.personalInfo.weight
  );
  if (bmi > 30) {
    score += 20;
    factors.push('Obesity (BMI > 30)');
  } else if (bmi > 25) {
    score += 10;
    factors.push('Overweight (BMI 25-30)');
  }

  // Medical conditions
  if (profile.medicalHistory.conditions.length > 0) {
    score += 15;
    factors.push(
      `${profile.medicalHistory.conditions.length} chronic condition(s)`
    );
  }

  // Medications
  if (profile.medicalHistory.medications.length > 0) {
    score += 5;
    factors.push(`On ${profile.medicalHistory.medications.length} medication(s)`);
  }

  // Family history
  if (profile.familyHistory.members.length > 0) {
    score += 10;
    factors.push('Family history of disease');
  }

  // Lifestyle factors
  if (profile.lifestyle.stressLevel === 'High') {
    score += 10;
    factors.push('High stress levels');
  } else if (profile.lifestyle.stressLevel === 'Moderate') {
    score += 5;
    factors.push('Moderate stress levels');
  }

  if (profile.lifestyle.averageSleep < 6) {
    score += 15;
    factors.push('Insufficient sleep (< 6 hours)');
  } else if (profile.lifestyle.averageSleep < 7) {
    score += 5;
    factors.push('Suboptimal sleep (< 7 hours)');
  }

  if (profile.lifestyle.smokerStatus === 'Current') {
    score += 20;
    factors.push('Current smoker');
  } else if (profile.lifestyle.smokerStatus === 'Former') {
    score += 5;
    factors.push('Former smoker');
  }

  if (
    profile.lifestyle.exerciseFrequency ===
    'Sedentary'
  ) {
    score += 15;
    factors.push('Sedentary lifestyle');
  } else if (
    profile.lifestyle.exerciseFrequency ===
    'Occasional'
  ) {
    score += 8;
    factors.push('Occasional exercise');
  }

  // Recent BP readings
  if (profile.dailyMetrics.length > 0) {
    const recentMetrics = profile.dailyMetrics.slice(-7);
    const avgSystolic =
      recentMetrics.reduce((sum, m) => sum + m.systolicBP, 0) /
      recentMetrics.length;
    const avgDiastolic =
      recentMetrics.reduce((sum, m) => sum + m.diastolicBP, 0) /
      recentMetrics.length;

    if (avgSystolic > 160 || avgDiastolic > 100) {
      score += 20;
      factors.push('High blood pressure (Stage 2)');
    } else if (avgSystolic > 140 || avgDiastolic > 90) {
      score += 15;
      factors.push('Elevated blood pressure (Stage 1)');
    } else if (avgSystolic > 130 || avgDiastolic > 80) {
      score += 8;
      factors.push('Elevated blood pressure');
    }
  }

  // Cap score at 100
  score = Math.min(score, 100);

  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  if (score < 25) riskLevel = 'Low';
  else if (score < 50) riskLevel = 'Moderate';
  else if (score < 75) riskLevel = 'High';
  else riskLevel = 'Critical';

  return { riskScore: score, riskLevel, factors };
}
