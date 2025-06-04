# GitHub Repositories Explorer

A React application built with TypeScript that integrates with the GitHub API to search for users and display their repositories.

## Features

*   Search for GitHub users by username.
*   Display a list of up to 5 users matching the search query.
*   View a list of repositories for a selected user.
*   Display repository details, including README content.
*   Error handling and loading states for a smooth user experience.
*   Responsive design for mobile and desktop devices.

## Technologies Used

*   React
*   TypeScript
*   Next.js
*   Tailwind CSS
*   React Hook Form
*   Zod
*   React Query
*   MSW (for testing)

## Setup Instructions

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd github-repositories-explorer
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4.  Set up environment variables:

    Create a `.env.local` file in the root directory and add your GitHub Personal Access Token:

    ```
    NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN=<your_token>
    ```

    **Note:**  It's highly recommended to use a personal access token for development purposes.  Follow GitHub's documentation to create one.

5.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1.  Enter a username in the search input.
2.  A list of up to 5 matching users will be displayed.
3.  Click on a user to expand the accordion and view their repositories.
4.  Click on a repository to view its details and README content in a modal.

## Testing

To run the unit and integration tests, use the following command:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## Deployment

The application is deployed on [Vercel](https://vercel.com).  You can view the live application [here](<deployment-url>).

## Contributing

Contributions are welcome! Please submit a pull request with your proposed changes.

## License

[MIT](LICENSE)
