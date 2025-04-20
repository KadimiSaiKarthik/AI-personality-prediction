export interface CandidateFeatures {
  technical_skills: number;
  years_experience: number;
  education_level: number;
  communication_skills: number;
  project_complexity: number;
  [key: string]: number;
}

export interface CandidateAnalysis {
  name: string;
  features: CandidateFeatures;
  sentiment: string;
  confidence: number;
  personalityTraits: string[];
  suitabilityScore: number;
  recommendedRoles: string[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
} 