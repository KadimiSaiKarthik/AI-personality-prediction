import { sentimentAnalyzer } from './sentimentAnalysis';

// Test cases with different experience levels
const testResumes = {
  senior: `Senior Software Engineer with 10+ years of experience in full-stack development.
    • Led a team of 8 developers to successfully deliver a cloud-native application using AWS and Kubernetes
    • Improved system performance by 200% through innovative microservices architecture
    • Implemented CI/CD pipelines reducing deployment time from days to hours
    • Expert in Python, JavaScript, React, and Node.js
    • Mentored 12 junior developers who were promoted to mid-level positions
    • Received "Outstanding Technical Leadership" award for 3 consecutive years
    
    Technical Skills:
    • Languages: Python, JavaScript, TypeScript, Java
    • Frameworks: React, Node.js, Django, Spring Boot
    • Cloud: AWS (Certified Solutions Architect), Kubernetes, Docker
    • Tools: Git, Jenkins, Terraform, Prometheus
    
    Projects:
    • Architected and implemented a scalable e-commerce platform handling $50M in annual transactions
    • Developed machine learning pipeline that improved customer recommendations by 45%
    • Created automated testing framework reducing QA time by 60%`,

  midLevel: `Software Developer with 4 years of experience in web development.
    • Contributed to the development of company's main product using React and Node.js
    • Worked with team members to implement new features and fix bugs
    • Participated in code reviews and documentation updates
    • Regular participant in agile ceremonies and sprint planning
    
    Technical Skills:
    • Languages: JavaScript, Python, HTML, CSS
    • Frameworks: React, Express.js
    • Tools: Git, JIRA, VS Code
    
    Projects:
    • Maintained and updated customer-facing web applications
    • Collaborated on API development and integration
    • Helped implement responsive design improvements`,

  junior: `Junior Developer seeking entry-level position
    • Recent graduate with Bachelor's degree in Computer Science
    • Basic understanding of web development principles
    • Learning modern JavaScript frameworks and tools
    • Completed online courses in React and Node.js
    
    Technical Skills:
    • Basic knowledge of HTML, CSS, and JavaScript
    • Familiar with Git version control
    • Some experience with React components
    
    Projects:
    • Created simple todo application during bootcamp
    • Working on personal portfolio website
    • Contributed minor fixes to open source projects
    • Still learning best practices and patterns`
};

export async function testSentimentAnalyzer() {
  console.log('Testing Sentiment Analyzer with different resume types...\n');

  for (const [level, resume] of Object.entries(testResumes)) {
    console.log(`Testing ${level} level resume:`);
    const result = sentimentAnalyzer.analyze(resume);
    console.log('Result:', {
      sentiment: result.sentiment,
      confidence: result.confidence + '%',
      personalityTraits: result.personalityTraits.join(', ')
    });
    console.log('-------------------\n');
  }
} 