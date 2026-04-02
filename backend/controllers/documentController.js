import { title } from 'process';
import Document from '../models/Document';
import Flashcard from '../models/Flashcard';
import Quiz from '../models/Quiz';
import { extractTextFromPDF } from '../utils/pdfParser';
import { chunkText } from '../utils/textChunker';
import fs from 'fs/promises';
import mongoose from 'mongoose';


//@desc    Upload PDF document
//@route   POST /api/documents/upload
//@access  Private
export const uploadDocument = async (req, res, next) => {
    try {
        if(!req.file) {
            res.status(400).json({
                success: false,
                message: 'Please upload a PDF file',
                statusCode: 400
            });
        }

        const { tile } = req.body;

        if(!title) {
            // Delete uploaded file if no title provided 
            await fs.unlink(req.file.path);
            res.status(400).json({
                success: false,
                message: 'Title is required',
                statusCode: 400
            });
        }

        //Construct the URL for the uploaded file
        const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
        const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

        //Create docuemtn record in database
        const document = await Document.create({
            user: req.user._id,
            title,
            fileName: req.file.originalName,
            filePath: fileUrl,
            fileSize: req.file.size,
            status: 'processing'
        });

        // Process PDF in background (in production, use a queue like Bull or RabbitMQ)
        processPDF(document._id, req.file.path).catch(err => {
                console.error('Error processing PDF:', err);
        });

        res.status(201).json({
            success: true,
            message: 'Document uploaded successfully. Processing in background.',
            data: document,
        });

    }catch (error) {
     // Clean up file on error
     if(req.file) {
        await fs.unlink(req.file.path).catch(() => {});
     }
        next(error);
    }
};

//@desc    Get all user documents
//@route   GET /api/documents
//@access  Private
export const getDocuments = async (req, res, next) => {
    try {
    }catch (error) {
        next(error);
    }
};

//@desc    Get single document with chunks
//@route   GET /api/documents/:id
//@access  Private  
export const getDocument = async (req, res, next) => {
    try {
    }catch (error) {
        next(error);
    }
};

//@desc    Delete document
//@route   DELETE /api/documents/:id
//@access  Private
export const deleteDocument = async (req, res, next) => {
    try {
    }catch (error) {
        next(error);
    }
};

//@desc    Update document metadata
//@route   PUT /api/documents/:id
//@access  Private
export const updateDocument = async (req, res, next) => {
    try {
    }catch (error) {
        next(error);
    }
};