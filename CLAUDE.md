# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LibreChat is an open-source AI chat platform that aggregates multiple AI providers (OpenAI, Anthropic, Google, Azure, AWS Bedrock, etc.) into a ChatGPT-style interface. It supports custom AI agents, RAG (Retrieval-Augmented Generation), MCP (Model Context Protocol), code artifacts, and multi-user authentication.

## Architecture

### Monorepo Structure (npm workspaces)

```
LibreChat/
├── api/           # Express.js backend (Node.js, JavaScript)
├── client/        # React frontend (TypeScript, Vite, TailwindCSS)
└── packages/      # Shared libraries
    ├── data-provider/   # API client, types, React Query hooks
    ├── data-schemas/    # Mongoose schemas and models
    ├── api/             # MCP services, caching, cluster management
    └── client/          # Shared React components
```

### Backend (api/)

- Express.js server in JavaScript (TypeScript conversion not planned)
- Entry point: `api/server/index.js`
- MongoDB via Mongoose for data persistence
- Redis for caching and session management
- Meilisearch for full-text search
- Key directories:
  - `server/routes/` - API endpoints
  - `server/controllers/` - Request handlers
  - `server/services/` - Business logic
  - `server/middleware/` - Express middleware
  - `models/` - Mongoose models
  - `strategies/` - Passport authentication strategies

### Frontend (client/)

- React 18 with TypeScript
- Vite for bundling
- TailwindCSS for styling
- Jotai + Recoil for state management
- React Query (TanStack) for server state
- Key directories:
  - `src/components/` - React components
  - `src/hooks/` - Custom React hooks
  - `src/store/` - State management
  - `src/routes/` - Page components
  - `src/data-provider/` - API integration

### Shared Packages

Packages must be built before running the app. Build order matters due to dependencies:
1. `data-provider` - Core types, API client, React Query hooks
2. `data-schemas` - Mongoose schemas (depends on data-provider)
3. `api` - MCP services (depends on data-provider, data-schemas)
4. `client` - Shared React components

## Development Commands

### Initial Setup
```bash
npm ci                          # Install dependencies
npm run build:data-provider     # Build data-provider package
npm run build:data-schemas      # Build data-schemas package
npm run build:api               # Build API package
npm run build:client-package    # Build client package
# Or build all packages at once:
npm run build:packages
```

### Running Locally
```bash
npm run backend:dev             # Start backend with nodemon (dev mode)
npm run frontend:dev            # Start Vite dev server (client)
```

### Production Build
```bash
npm run frontend                # Build all packages + client for production
npm run backend                 # Start production backend
```

### Testing
```bash
npm run test:api                # Backend unit tests (Jest)
npm run test:client             # Frontend unit tests (Jest)
npm run e2e                     # Playwright integration tests
npm run e2e:headed              # E2E tests with browser visible
```

### Linting
```bash
npm run lint                    # ESLint check
npm run lint:fix                # ESLint auto-fix
npm run format                  # Prettier format
```

### Bun Alternative Commands (faster)
```bash
npm run b:api                   # Run backend with Bun
npm run b:client                # Build client with Bun
npm run b:test:api              # Run API tests with Bun
```

## External Dependencies

- **MongoDB**: Primary database (required)
- **Meilisearch**: Full-text search for conversations (optional but recommended)
- **PostgreSQL + pgvector**: Vector database for RAG features
- **RAG API**: Separate service for RAG functionality (https://github.com/danny-avila/rag_api)
- **Redis**: Caching and rate limiting (optional)

## Configuration

- `.env` - Environment variables (copy from `.env.example`)
- `librechat.yaml` - Main configuration file for AI endpoints, interface settings, and features (copy from `librechat.example.yaml`)

## Docker Deployment

For Railway/cloud deployment, the main `Dockerfile` builds the complete application:
1. Installs dependencies with npm ci
2. Builds frontend with `npm run frontend`
3. Prunes dev dependencies
4. Runs backend on port 3080

The `docker-compose.yml` orchestrates: LibreChat API, MongoDB, Meilisearch, pgvector (vectordb), and RAG API.

## Code Conventions

- **Branch naming**: Descriptive slash-based (e.g., `new/feature/x`, `fix/bug-name`)
- **Commit format**: Semantic commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`)
- **File naming**: camelCase for JS/TS, PascalCase for React components
- **Import order**: npm packages (longest to shortest) > TypeScript types > local imports
- ESLint enforces import conventions via `npm run lint --fix`

## Key Environment Variables

```bash
MONGO_URI=mongodb://127.0.0.1:27017/LibreChat
HOST=localhost
PORT=3080
DOMAIN_CLIENT=http://localhost:3080
DOMAIN_SERVER=http://localhost:3080
# AI Provider keys (OPENAI_API_KEY, ANTHROPIC_API_KEY, etc.)
```

## Testing Setup

Backend tests require:
```bash
cp api/test/.env.test.example api/test/.env.test
```

E2E tests require:
```bash
cp e2e/config.local.example.ts e2e/config.local.ts
npx playwright install
```
