import { pdfjsLib } from './pdfjs-init';

// Helper function to check if worker is initialized
const isWorkerInitialized = () => {
  return Boolean(pdfjsLib.GlobalWorkerOptions.workerSrc);
};

// Helper function to wait for worker initialization
const waitForWorker = async (maxAttempts = 5): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    if (isWorkerInitialized()) {
      return true;
    }
    console.log(`Waiting for worker initialization... Attempt ${i + 1}/${maxAttempts}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
};

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    console.log('Starting PDF processing...');

    // Check worker initialization
    const workerReady = await waitForWorker();
    if (!workerReady) {
      throw new Error('Worker initialization timeout');
    }

    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    console.log('File loaded into memory');

    // Create loading task
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0
    });

    // Handle loading progress
    loadingTask.onProgress = ({ loaded, total }) => {
      const progress = Math.round((loaded / total) * 100);
      console.log(`Loading PDF: ${progress}%`);
    };

    // Load document
    console.log('Loading PDF document...');
    const pdf = await loadingTask.promise;
    console.log('PDF document loaded successfully');

    let fullText = '';
    const numPages = pdf.numPages;
    console.log(`PDF has ${numPages} pages`);

    // Process each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        console.log(`Processing page ${pageNum}/${numPages}`);
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        console.error(`Error extracting text from page ${pageNum}:`, pageError);
      }
    }

    if (!fullText.trim()) {
      throw new Error('No text could be extracted from the PDF');
    }

    console.log('PDF processing completed successfully');
    return fullText.trim();
  } catch (error) {
    console.error('PDF processing error:', error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('worker')) {
        throw new Error('PDF worker initialization failed. Please refresh and try again.');
      }
      if (errorMessage.includes('timeout')) {
        throw new Error('PDF worker initialization timed out. Please try again.');
      }
      if (errorMessage.includes('invalid pdf')) {
        throw new Error('The file appears to be an invalid PDF document.');
      }
      throw new Error(`Failed to process PDF: ${error.message}`);
    }
    
    throw new Error('Failed to process PDF. Please ensure the file is valid.');
  }
} 