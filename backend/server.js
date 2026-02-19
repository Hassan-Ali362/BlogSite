import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';


import userRouter from "./Routes/user.route.js";
import postRouter from "./Routes/blog.route.js";
import commentRouter from "./Routes/comment.route.js";
import uploadRouter from "./Routes/upload.route.js";

import errorMiddleware from './Middlewares/error-middleware.js';
import cors from 'cors';

import express from 'express';
const app = express();
const port = 3000;

import connectDb from './Database/db.js';

const corsOption = {
  origin: "http://localhost:5173",
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json()); 
 
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api", uploadRouter);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
});