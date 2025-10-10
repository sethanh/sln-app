# PayFlash Monorepo

This repository is a monorepo containing the PayFlash application and related packages. The main app is located in `apps/payflash`, and shared code is managed in the `@my-monorepo` namespace.

## Features

- Modern contact management UI (React, Ant Design, Jotai)
- Shared UI and business logic via internal packages
- API integration with backend services

## Prerequisites

- **Node.js** v16 or newer
- **Yarn** (recommended) or **pnpm** with workspace support
- Access to internal/private npm registry if required

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd sln-app
   ```

2. **Install dependencies for all packages using workspaces:**
   ```sh
   yarn install
   # or, if you use pnpm:
   pnpm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the root and in `apps/payflash` if needed.
   - Update API URLs, keys, etc. according to your environment.

4. **Run the PayFlash app:**
   ```sh
   yarn workspace @my-monorepo/payflash dev
   # or, with pnpm:
   pnpm --filter @my-monorepo/payflash dev
   ```

## Project Structure

- `apps/payflash`: Main PayFlash application (frontend)
- `packages/ui`: Shared UI components
- `packages/Constants`, `packages/Models`, etc.: Shared business logic and types

## Useful Scripts

- `yarn workspace @my-monorepo/payflash dev` – Start PayFlash in development mode
- `yarn workspace @my-monorepo/payflash build` – Build PayFlash for production
- `yarn lint` – Lint all packages

## Notes

- Make sure all internal packages are built if you make changes to them.
- If you add new packages, update the root `package.json` and workspace configuration.

## License

This project is proprietary and intended for internal use only.

---

For more details, see code comments or contact the development team.