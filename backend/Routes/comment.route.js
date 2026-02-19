import express from 'express';
const router = express.Router();

import asyncHandler from '../Global/async.handler.js';
import { addComment, deleteComment, getCommentsByPost } from '../Controllers/CommentController.js';
import IsAuthenticated from '../Middlewares/isAuthenticatedMiddleware.js';

router.post("/:postId", IsAuthenticated, asyncHandler(addComment));

router.get("/:postId", IsAuthenticated, asyncHandler(getCommentsByPost));

router.delete("/:commentId", IsAuthenticated, asyncHandler(deleteComment));

export default router;
