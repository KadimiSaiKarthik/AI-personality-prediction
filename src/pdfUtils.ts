// Removed conflicting worker configuration
// import * as pdfjs from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

// export async function extractTextFromPdf(file: File): Promise<string> {
//   try {
//     // Read the file
//     const arrayBuffer = await file.arrayBuffer();
    
//     // Load the PDF document
//     const loadingTask = pdfjs.getDocument({
//       data: arrayBuffer,
//       verbosity: 0  // Reduce console noise
//     });
//     const pdf = await loadingTask.promise;
    
//     let fullText = '';
    
//     // Extract text from each page
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items
//         .map((item: any) => item.str)
//         .join(' ');
//       fullText += pageText + '\n';
//     }

//     return fullText.trim();
//   } catch (error) {
//     console.error('Error extracting text from PDF:', error);
//     throw error;
//   }
// } 