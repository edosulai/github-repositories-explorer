import { z } from "zod";

export const usersSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
});

export type UserUsersFormData = z.infer<typeof usersSchema>;
