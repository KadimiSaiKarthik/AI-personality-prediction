// Training data with labeled examples
export const trainingData = {
  texts: [
    // Positive examples
    `Experienced software engineer with 8 years of expertise in Python and JavaScript. 
     Successfully led development of cloud-native applications using React and AWS. 
     Implemented machine learning solutions that improved customer satisfaction by 40%.
     Passionate about creating innovative solutions and mentoring junior developers.`,

    `Senior developer with strong track record of delivering high-impact projects.
     Achieved 99.9% uptime for mission-critical microservices architecture.
     Created automated CI/CD pipeline that reduced deployment time by 70%.
     Expert in agile methodologies and team leadership.`,

    `Full-stack developer specialized in modern web technologies.
     Developed scalable React applications serving millions of users.
     Optimized database queries resulting in 50% performance improvement.
     Actively contributed to open-source projects and technical documentation.`,

    // Neutral examples
    `Software developer with experience in Java and Python programming.
     Worked on maintenance and updates of existing systems.
     Participated in code reviews and team meetings.
     Basic understanding of cloud platforms and containerization.`,

    `Web developer familiar with JavaScript and React frameworks.
     Handled bug fixes and feature implementations as assigned.
     Collaborated with team members on project deliverables.
     Currently learning new technologies and tools.`,

    `Backend developer working with Node.js and SQL databases.
     Maintained existing codebase and implemented requested features.
     Participated in agile ceremonies and documentation updates.
     Regular contributor to team projects.`,

    // Negative examples
    `Junior developer still learning fundamental concepts.
     Limited experience with basic programming tasks.
     Faced challenges with complex technical requirements.
     Struggling with advanced framework features.`,

    `Entry-level programmer with minimal practical experience.
     Basic knowledge of web development principles.
     Had difficulty meeting project deadlines consistently.
     Required significant supervision and guidance.`,

    `Intern developer working on small-scale projects.
     Encountered problems with version control systems.
     Limited understanding of software architecture.
     Basic coding skills need improvement.`
  ],
  
  // Labels: [negative, neutral, positive]
  labels: [
    [0, 0, 1], // Positive example 1
    [0, 0, 1], // Positive example 2
    [0, 0, 1], // Positive example 3
    [0, 1, 0], // Neutral example 1
    [0, 1, 0], // Neutral example 2
    [0, 1, 0], // Neutral example 3
    [1, 0, 0], // Negative example 1
    [1, 0, 0], // Negative example 2
    [1, 0, 0]  // Negative example 3
  ]
}; 