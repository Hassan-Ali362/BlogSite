import express from 'express';
import multer from 'multer';   // --> a middleware used for handling file uploads.

import asyncHandler from '../Global/async.handler.js';
import { uploadImg } from '../Controllers/UploadController.js';
const router = express.Router();

const storage = multer.memoryStorage();  // --> Tells Multer to store uploaded files in memory (RAM) of server.

const upload = multer({ storage });    // ---> Configures Multer to use that in-memory storage.

router.post("/upload", upload.single('image'), asyncHandler(uploadImg));   // upload.single is a middleware

export default router;

