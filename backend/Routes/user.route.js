import express from 'express';
const router = express.Router();

import asyncHandler from '../Global/async.handler.js';

import { Register, Login, Logout } from '../Controllers/UserController.js';
import { loginSchema, registerSchema } from '../Validators/auth-Validator.js';
import validate from '../Middlewares/validate-middleware.js';

router.post("/register", validate(registerSchema) ,asyncHandler(Register));
router.post("/login",validate(loginSchema), asyncHandler(Login));
router.post("/logout", asyncHandler(Logout));

export default router;