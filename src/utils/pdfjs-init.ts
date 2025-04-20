import * as pdfjsLib from 'pdfjs-dist';

// Use the correct worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export { pdfjsLib }; 