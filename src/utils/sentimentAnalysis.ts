// Simple sentiment analyzer implementation
export const sentimentAnalyzer = {
  analyze(text: string) {
    const positiveKeywords = [
      "passionate", "motivated", "innovative", 
      "dedicated", "enthusiastic", "proactive",
      "achieved", "successful", "excellent",
      "leadership", "expert", "proficient"
    ];
    
    const negativeKeywords = [
      "challenge", "difficult", "problem", 
      "limitation", "constraint", "failed",
      "struggle", "issue", "concern"
    ];

    const positiveCount = positiveKeywords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    const negativeCount = negativeKeywords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;

    const sentiment = positiveCount > negativeCount 
      ? "Positive" 
      : negativeCount > positiveCount 
        ? "Negative" 
        : "Neutral";

    return {
      sentiment,
      confidence: Math.min((Math.max(positiveCount, negativeCount) / 5) * 100, 100),
      personalityTraits: this.getPersonalityTraits(text, sentiment)
    };
  },

  getPersonalityTraits(text: string, sentiment: string): string[] {
    const traits = [];
    
    // Leadership traits
    if (text.match(/lead|manage|direct|coordinate|supervise/i)) {
      traits.push("Leadership-oriented");
    }
    
    // Technical traits
    if (text.match(/develop|code|engineer|implement|design|architect/i)) {
      traits.push("Technical-minded");
    }
    
    // Analytical traits
    if (text.match(/analyze|solve|research|investigate|study/i)) {
      traits.push("Analytical");
    }
    
    // Communication traits
    if (text.match(/communicate|present|collaborate|team|interact/i)) {
      traits.push("Communicative");
    }
    
    // Innovation traits
    if (text.match(/innovate|create|design|improve|enhance/i)) {
      traits.push("Innovative");
    }

    // Add sentiment-based traits
    if (sentiment === "Positive") {
      traits.push("Optimistic");
    } else if (sentiment === "Negative") {
      traits.push("Detail-oriented");
    } else {
      traits.push("Balanced");
    }

    return traits;
  }
}; 