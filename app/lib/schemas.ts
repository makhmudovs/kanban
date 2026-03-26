import z from "zod";

// Regex to block emojis and most non-standard characters
const noEmojiRegex = /^[\x20-\x7E]*$/;

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(250, "Name cannot exceed 250 characters")
    .regex(noEmojiRegex, "Name contains invalid characters or emojis")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    // Alphanumeric check (requires at least one letter and one number)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "Password must be alphanumeric")
    .regex(noEmojiRegex, "Password cannot contain emojis"),
});

export const loginUserSchema = registerUserSchema.omit({ name: true });

export type RegisterType = z.infer<typeof registerUserSchema>;
export type LoginType = z.infer<typeof loginUserSchema>;

