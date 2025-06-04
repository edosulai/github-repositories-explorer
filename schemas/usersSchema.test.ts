import { usersSchema } from "./usersSchema";

// Test suite for user schema validation
describe("usersSchema", () => {
  // Test case: Schema should validate correct data
  it("validates correct user data", () => {
    const validData = {
      username: "octocat",
    };

    const result = usersSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  // Test case: Schema should enforce required username
  it("requires username field", () => {
    const invalidData = {
      username: "",
    };

    const result = usersSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  // Test case: Schema should handle missing username
  it("fails when username is missing", () => {
    const invalidData = {};

    const result = usersSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe("username");
    }
  });

  // Test case: Schema should validate username type
  it("fails when username is not a string", () => {
    const invalidData = {
      username: 123,
    };

    const result = usersSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe("invalid_type");
    }
  });
});
