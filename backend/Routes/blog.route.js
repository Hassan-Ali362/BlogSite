import express from 'express';
import isAuthenticated from '../Middlewares/isAuthenticatedMiddleware.js';
const router = express.Router();

import asyncHandler from '../Global/async.handler.js';

import { createPost, deletePost, getAllPosts, getPostById, updatePost, getPostsOfUser, handleLike } from '../Controllers/PostController.js';

router.post("/create", isAuthenticated, asyncHandler(createPost));

router.get("/get/:id",isAuthenticated, asyncHandler(getPostById));

router.get("/getAll", asyncHandler(getAllPosts));

router.get("/my-posts",isAuthenticated, asyncHandler(getPostsOfUser));

router.put("/update/:id", isAuthenticated, asyncHandler(updatePost));

router.delete("/delete/:id", isAuthenticated, asyncHandler(deletePost));

router.put("/like/:id", isAuthenticated, asyncHandler(handleLike));

export default router;