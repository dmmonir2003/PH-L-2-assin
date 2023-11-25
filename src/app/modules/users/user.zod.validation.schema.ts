import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const fullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const userSchemaZodValidation = z.object({
  userId: z.number(),
  userName: z.string(),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
  address: addressSchema,
  hobbies: z.array(z.string()),
  isActive: z.boolean(),
});
