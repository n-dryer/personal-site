# AGENTS.md

This document provides instructions and context for AI coding agents working on this project. Its purpose is to ensure efficient, consistent, and high-quality contributions.

## Project Overview

[Briefly describe the project's purpose, main goals, and key features. What problem does it solve? Who is the target audience?]

## Code Stack

This section outlines the primary technologies and tools used in this project.

-   **Languages**: [e.g., TypeScript, JavaScript, Python, Go, Rust, Java, C#]
-   **Frameworks/Libraries**: [e.g., React, Next.js, Angular, Vue.js, Node.js (Express/Fastify), Django, Flask, Spring Boot, .NET]
-   **Styling**: [e.g., Tailwind CSS, Styled Components, SASS, CSS Modules]
-   **State Management**: [e.g., Redux, Zustand, React Context, Vuex, Pinia]
-   **Database**: [e.g., PostgreSQL, MongoDB, MySQL, SQLite, Redis]
-   **Testing**: [e.g., Jest, Vitest, React Testing Library, Playwright, Cypress, Pytest, JUnit]
-   **Build Tools**: [e.g., Vite, Webpack, Rollup, Gulp, Maven, Gradle]
-   **Linting/Formatting**: [e.g., ESLint, Prettier, Black, Ruff, gofmt]
-   **Version Control**: Git
-   **CI/CD**: [e.g., GitHub Actions, GitLab CI, Jenkins, CircleCI]
-   **Deployment Platform**: [e.g., Vercel, Netlify, AWS, Azure, Google Cloud, Heroku, GitHub Pages]

## Codebase Organization and Structure

This project generally follows a [e.g., feature-based, layer-based, domain-driven] architecture. Key directories and their purposes include:

```
/src
├── /components/    # Reusable UI components
├── /pages/         # Top-level page components or routes
├── /services/      # API integrations, data fetching logic
├── /utils/         # Utility functions and helpers
├── /hooks/         # Custom React hooks (if applicable)
├── /types/         # TypeScript type definitions
├── /styles/        # Global styles, themes, CSS variables
└── [main entry file] # e.g., index.ts, main.tsx, App.js
```

-   **Modularity**: Components, functions, and data are organized to promote reusability and maintainability.
-   **Naming Conventions**: [e.g., PascalCase for components, camelCase for functions/variables, kebab-case for CSS classes/filenames]
-   **Barrel Exports**: [Indicate if `index.ts` or similar files are used for cleaner imports within directories.]
-   **Separation of Concerns**: Logic, UI, and data handling are typically separated into distinct modules or layers.

## Getting Started

### Prerequisites

-   **Operating System**: [e.g., macOS, Linux, Windows]
-   **Node.js**: [Specify required version, e.g., `>=18`, `LTS`]
-   **Package Manager**: [e.g., npm, Yarn, pnpm]
-   **Python**: [Specify required version, e.g., `>=3.9`]
-   **Other**: [e.g., Docker, Go, Rust, specific CLI tools]

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```
2.  Install dependencies:
    ```bash
    [package-manager] install # e.g., yarn install, npm install, pip install -r requirements.txt
    ```

### Development

To start the development server or environment:

```bash
[command-to-start-dev-server] # e.g., yarn start, npm run dev, python manage.py runserver
```

## Building the Project

To create a production-ready build:

```bash
[command-to-build-project] # e.g., yarn build, npm run build, vite build
```

## Testing

To run the test suite and ensure code quality:

```bash
[command-to-run-tests] # e.g., yarn test, npm test, pytest
```

## Code Style and Conventions

-   **Linting**: To check for code quality and potential errors:
    ```bash
    [command-to-run-linter] # e.g., yarn lint, npm run lint, ruff check .
    ```
-   **Formatting**: To automatically format the codebase:
    ```bash
    [command-to-run-formatter] # e.g., yarn format, npm run format, black .
    ```
-   **Type Checking**: [If applicable, e.g., `tsc --noEmit` for TypeScript]

## Deployment

[Describe the deployment process. Is it automated via CI/CD? Are there manual steps?]

## AI Agent Guidelines

To ensure optimal effectiveness and alignment with project goals, AI agents should adhere to the following:

-   **Understand Context**: Always analyze existing code patterns, architectural decisions, and project conventions before proposing or implementing changes.
-   **Prioritize Safety**: Implement robust error handling, validation, and consider edge cases. Avoid introducing breaking changes without clear justification and testing.
-   **Incremental Changes**: Prefer smaller, atomic changes that are easier to review and verify.
-   **Self-Correction**: Utilize testing and linting tools to self-verify changes before presenting them.
-   **Documentation**: Update relevant documentation (e.g., JSDoc, READMEs, this `AGENTS.md`) for any significant changes or new features.
-   **User Communication**: Clearly explain proposed changes, reasoning, and any assumptions made.

## Local Development Environment Information (Example)

This section provides an example of how to document a specific local development environment. AI agents can use this to understand the user's setup and tailor their suggestions.

-   **Operating System**: macOS (darwin)
-   **Shell**: zsh
-   **macOS Package Manager**: Homebrew (`brew` installed at `/opt/homebrew/bin/brew`)
-   **Node.js Version Manager**: `nvm`
-   **Project-Specific Package Manager**: `yarn`
-   **Python**: `python3` installed at `/opt/homebrew/bin/python3`
-   **Python Package Manager**: `pip3` installed at `/opt/homebrew/bin/pip3`
-   **Go**: Not found in PATH.
-   **Rust**: `rustc` installed at `/opt/homebrew/bin/rustc`
-   **Code Editor CLI**: `code` (VS Code command-line launcher) installed at `/usr/local/bin/code`

## Tool-Specific Documentation

This section provides documentation for specific tools that AI agents might interact with.

### Chrome DevTools MCP

The `chrome-devtools-mcp` tool allows AI agents to control a Chrome browser instance for debugging, testing, and automation.

#### Starting the Server

To start the MCP server, run the following command:

```bash
npx chrome-devtools-mcp@latest
```

To use a specific Chrome channel (e.g., Beta, Canary, Dev), use the `--channel` flag:

```bash
# Use Chrome Beta
npx chrome-devtools-mcp@latest --channel beta

# Use Chrome Canary
npx chrome-devtools-mcp@latest --channel canary
```

The server runs in the foreground by default. To run it in the background, append `&` to the command.

#### Usage

The MCP server operates on a client-server model. I, as an AI agent, need to connect to this server using an MCP client to send commands and control the browser. Without a configured client, direct control from the command line is not possible. The typical workflow involves configuring an AI development environment (e.g., VS Code, Cursor) to act as the MCP client.
