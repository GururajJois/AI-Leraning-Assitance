import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';
/** 
 * Extract text content from a PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<{text: string, numPages: number}>} - Extracted text content and page count
 */