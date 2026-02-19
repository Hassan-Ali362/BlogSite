import {z} from "zod";

const registerSchema = z.object({
    username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, {message: "Name must be atleast of 3 charaters"})
    .max(255, {message: "Name can have max 255 length"}),

    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {message: "Email must be atleast of 3 charaters"})
    .max(255, {message: "Email can have max 255 length"}),

    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, {message: "password must be atleast of 3 charaters"})
    .max(255, {message: "Password can have max 255 letters"})
});

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {message: "Email must be atleast of 3 charaters"})
    .max(255, {message: "Email can have max 255 length"}),

    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, {message: "password must be atleast of 8 charaters"})
    .max(255, {message: "Password can have max 255 letters"})
});

export { registerSchema, loginSchema };


