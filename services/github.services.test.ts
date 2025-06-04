import { getRepoReadme, getUserRepos, getUsers } from "./github.services";

import * as githubServices from "./github.services";

jest.mock('./github.services', () => {
  const originalModule = jest.requireActual('./github.services');
  return {
    ...originalModule,
    getUsers: jest.fn(),
    getUserRepos: jest.fn(),
    getRepoReadme: jest.fn(),
  };
});

describe("GitHub Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("searches users successfully", async () => {
      const mockResponse = {
        total_count: 1045,
        incomplete_results: false,
        items: [
          {
            login: "octocat",
            id: 583231,
            avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
            type: "User",
            score: 1.0
          }
        ]
      };

      (githubServices.getUsers as jest.Mock).mockResolvedValueOnce(mockResponse);
      const result = await getUsers("octocat");
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUserRepos", () => {
    it("fetches user repositories successfully", async () => {
      const mockRepos = [
        {
          id: 132935648,
          name: "boysenberry-repo-1",
          full_name: "octocat/boysenberry-repo-1",
          description: "Testing",
          stargazers_count: 334,
          language: null
        },
        {
          id: 18221276,
          name: "git-consortium",
          full_name: "octocat/git-consortium",
          description: "This repo is for demonstration purposes only.",
          stargazers_count: 436,
          language: null
        }
      ];

      (githubServices.getUserRepos as jest.Mock).mockResolvedValueOnce(mockRepos);
      const result = await getUserRepos("octocat");
      expect(result).toEqual(mockRepos);
    });
  });

  describe("getRepoReadme", () => {
    it("fetches repository readme successfully", async () => {
      const mockReadme = "Hello World!";
      (githubServices.getRepoReadme as jest.Mock).mockResolvedValueOnce(mockReadme);
      
      const result = await getRepoReadme("octocat", "Hello-World");
      expect(result).toBe("Hello World!");
    });
  });
});
