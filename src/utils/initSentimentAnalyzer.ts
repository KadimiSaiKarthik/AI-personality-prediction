import { sentimentAnalyzer } from './sentimentAnalysis';
import { trainingData } from './trainingData';
import { testSentimentAnalyzer } from './testSentiment';

export async function initializeSentimentAnalyzer(): Promise<void> {
  try {
    console.log('Training sentiment analyzer...');
    await sentimentAnalyzer.train(trainingData.texts, trainingData.labels);
    console.log('Sentiment analyzer training completed');
    
    // Run tests
    console.log('\nRunning sentiment analysis tests...');
    await testSentimentAnalyzer();
  } catch (error) {
    console.error('Error initializing sentiment analyzer:', error);
  }
} 