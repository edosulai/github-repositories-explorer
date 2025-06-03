import { z } from "zod";

export const userReposSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
});

export type UserReposFormData = z.infer<typeof userReposSchema>;
