export interface CandidateFeatures {
  technical_skills: number;
  years_experience: number;
  education_level: number;
  communication_skills: number;
  project_complexity: number;
}

export class EnhancedCandidateScoringModel {
  private skillKeywords: string[];
  private communicationKeywords: string[];
  private complexityKeywords: string[];

  constructor() {
    this.skillKeywords = [
      "python", "javascript", "react", "machine learning", "data science",
      "sql", "tensorflow", "aws", "docker", "kubernetes", "typescript",
      "node.js", "java", "c++", "scala", "spark", "hadoop", "git"
    ];

    this.communicationKeywords = [
      "communication", "collaborate", "teamwork", "presentation",
      "leadership", "interpersonal", "mentor", "coach", "facilitate",
      "negotiate", "stakeholder", "client", "customer"
    ];

    this.complexityKeywords = [
      "complex", "advanced", "enterprise", "scalable", "distributed",
      "architecture", "microservices", "cloud", "devops", "ci/cd",
      "agile", "scrum", "kubernetes", "containerization"
    ];
  }

  public extractFeatures(text: string): CandidateFeatures {
    const lowercaseText = text.toLowerCase();
    
    return {
      technical_skills: this.countTechnicalSkills(lowercaseText),
      years_experience: this.extractYearsOfExperience(lowercaseText),
      education_level: this.determineEducationLevel(lowercaseText),
      communication_skills: this.analyzeCommunicationSkills(lowercaseText),
      project_complexity: this.assessProjectComplexity(lowercaseText)
    };
  }

  private countTechnicalSkills(text: string): number {
    const skillCount = this.skillKeywords.filter(skill => text.includes(skill)).length;
    return Math.min(skillCount / 2, 10);
  }

  private extractYearsOfExperience(text: string): number {
    const experienceRegex = /(\d+)\s*(?:year|yr)s?\s*(?:of\s*)?experience/i;
    const match = text.match(experienceRegex);
    return match ? Math.min(parseInt(match[1]), 15) : 0;
  }

  private determineEducationLevel(text: string): number {
    const educationLevels = {
      "phd": 10,
      "doctorate": 10,
      "master": 8,
      "bachelor": 6,
      "associate": 4,
      "diploma": 3
    };

    for (const [level, score] of Object.entries(educationLevels)) {
      if (text.includes(level)) return score;
    }

    return 3;
  }

  private analyzeCommunicationSkills(text: string): number {
    const keywordCount = this.communicationKeywords.filter(keyword => text.includes(keyword)).length;
    return Math.min(keywordCount, 10);
  }

  private assessProjectComplexity(text: string): number {
    const complexityCount = this.complexityKeywords.filter(keyword => text.includes(keyword)).length;
    return Math.min(complexityCount, 10);
  }

  public predictSuitability(features: CandidateFeatures): {
    suitabilityScore: number;
    recommendedRoles: string[];
  } {
    const weights = {
      technical_skills: 0.35,
      years_experience: 0.25,
      education_level: 0.15,
      communication_skills: 0.15,
      project_complexity: 0.10
    };

    const score = Object.entries(weights).reduce((total, [feature, weight]) => {
      return total + (features[feature as keyof CandidateFeatures] * weight * 10);
    }, 0);

    return {
      suitabilityScore: Math.round(score),
      recommendedRoles: this.getRecommendedRoles(features, score)
    };
  }

  private getRecommendedRoles(features: CandidateFeatures, score: number): string[] {
    const roles = [];

    if (score >= 85 && features.technical_skills >= 8) {
      roles.push("Senior Software Engineer");
      if (features.project_complexity >= 7) {
        roles.push("Technical Lead");
      }
    }

    if (score >= 75 && features.technical_skills >= 7) {
      roles.push("Software Engineer");
      if (features.communication_skills >= 8) {
        roles.push("Team Lead");
      }
    }

    if (score >= 65) {
      roles.push("Junior Software Engineer");
    }

    if (roles.length === 0) {
      roles.push("Entry Level Developer");
    }

    return roles;
  }
} 