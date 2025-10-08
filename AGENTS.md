# Agent Guidelines

## Getting Started

### Prerequisites

- Node.js (version >= 20)
- Yarn (preferred package manager for this project)
- npm (Node Package Manager, often used for global packages or as an alternative)

### Installation

1. Install dependencies:

   ```bash
   yarn install
   ```

### Development

To run the development server:

```bash
yarn start
```

This will start the Vite development server and open the application at `http://localhost:4000`.

**Note:** All commands in this `AGENTS.md` are assumed to be run from the project root directory unless otherwise specified.

## Building the Project

To create a production build:

```bash
yarn build
```

The build artifacts will be located in the `dist/` directory.

## Testing

To run the test suite:

```bash
yarn test
```

This will execute the tests using Vitest.

## Gemini-Specific Guidelines

This section provides specific instructions for me, Gemini, to ensure my contributions align with the project's standards.

### Code Generation Style

- **Verbose Explanations**: Provide detailed JSDoc comments for complex functions.
- **Step-by-Step Reasoning**: Break down complex changes into clear, logical steps.
- **Context Awareness**: Reference existing patterns when suggesting similar implementations.
- **Safety-First**: Prefer explicit type checking over implicit assumptions.

### React Component Patterns

- **Explicit Prop Destructuring**: Use explicit prop destructuring with default values.
- **Early Returns**: Use early returns for empty data or other edge cases.
- **Separation of Concerns**: Keep logic, markup, and styles clearly separated.

### Error Handling

- **Graceful Degradation**: Always provide fallback UI states.
- **Explicit Error Boundaries**: Wrap components that might fail in an ErrorBoundary.
- **User-Friendly Messages**: Avoid technical error details in the UI.

### Performance Optimizations

- **Memoization**: Use `React.memo`, `useCallback`, and `useMemo` where appropriate to prevent unnecessary re-renders.
- **Bundle Optimization**: Import only what's needed from libraries.

### Workflow

1. **Analyze Existing Components**: Before making any changes, thoroughly analyze the relevant React components (e.g., Skills, Timeline) to understand their current JSX structure, state management, and styling. Identify existing patterns and conventions.
2. **Plan Changes**: Develop a clear, step-by-step plan for implementing new features, such as the skill filtering. This includes identifying where state should be managed, how components will interact, and what styling adjustments are needed.
3. **Implement Incrementally**: Build features incrementally, starting with TypeScript type definitions, then data structures, and finally component logic and UI. Verify each step before proceeding.
4. **Test**: Run unit tests (if available) and perform manual checks to verify that each step works as expected and that no regressions have been introduced.
5. **Document**: Add JSDoc comments for new or modified functions, components, and types during development.
6. **Validate**: Ensure cross-browser compatibility, performance impact, accessibility, and mobile responsiveness. Verify that all CI checks (format, lint, type-check, build) pass.

## Chrome DevTools MCP

The `chrome-devtools-mcp` tool allows me to control a Chrome browser instance for debugging and testing.

### Starting the Server

To start the MCP server, run the following command:

```bash
npx chrome-devtools-mcp@latest
```

To use a specific Chrome channel, use the `--channel` flag:

```bash
# Use Chrome Beta
npx chrome-devtools-mcp@latest --channel beta

# Use Chrome Canary
npx chrome-devtools-mcp@latest --channel canary
```

The server runs in the foreground by default. To run it in the background, append `&` to the command.

### Usage

The MCP server is a server that I, the AI agent, connect to as a client. My environment needs to be configured with an MCP client to send commands to the server. Without a client, I cannot directly control the browser.

## Deployment

The website is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. The deployment workflow is defined in `.github/workflows/deploy-pages.yml`.

## Local Development Environment Information

This section provides information about the user's local development environment.

- **Operating System**: macOS (darwin)
- **Shell**: zsh
- **macOS Package Manager**: Homebrew (`brew` installed at `/opt/homebrew/bin/brew`)
- **Node.js Version Manager**: `nvm`
- **Project-Specific Package Manager**: `yarn`
- **Python**: `python3` installed at `/opt/homebrew/bin/python3`
- **Python Package Manager**: `pip3` installed at `/opt/homebrew/bin/pip3`
- **Code Editor (IDE)**: Visual Studio Code Insiders, Cursor

### Shell Profile (`.zshrc`)

Your shell profile (`.zshrc`) is crucial for setting up your development environment. It is likely configured to:

- Initialize `nvm` for Node.js version management, ensuring the correct Node.js version is used for projects.
- Set up aliases or functions for frequently used commands, streamlining your workflow.
- Configure your shell prompt and other environment variables essential for various tools.

If specific details from your `.zshrc` (e.g., custom aliases, environment variables, or tool-specific configurations) are relevant for agent tasks, please provide them.
