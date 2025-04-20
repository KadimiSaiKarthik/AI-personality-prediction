export interface Candidate {
  fileName: string;
  recommendedRoles: string[];
  suitabilityScore: number;
  analysis: {
    insights: string;
    skills: {
      name: string;
      proficiency: number;
    }[];
    experience: {
      role: string;
      duration: string;
      company?: string;
      highlights: string[];
    }[];
    education: {
      degree: string;
      institution: string;
      year: number;
    }[];
  };
  rawText?: string;
} 