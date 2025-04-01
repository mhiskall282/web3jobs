
# Worka

Worka is a decentralized job platform built on the Internet Computer. This project consists of:

# Live Link: https://4yoni-hyaaa-aaaao-a4dea-cai.icp0.io

- **Backend**: Internet Computer canisters written in Motoko
- **Frontend**: A React app powered by Vite

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=16.0.0)
- [npm](https://www.npmjs.com/) (>=7.0.0)
- [DFINITY SDK (`dfx`)](https://internetcomputer.org/docs/current/developer-docs/setup/install)

---

## Project Structure

```
web3jobs/
├── src/
│   ├── web3jobs_backend/  # Backend canister (Motoko)
│   └── web3jobs_frontend/ # Frontend (React + Vite)
├── dfx.json              # DFX configuration file
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## Installation

### 1. Clone the repository and install root dependencies:
```bash
git clone https://github.com/mhiskall282/web3jobs.git
cd web3jobs
npm install
```

### 2. Install frontend dependencies:
```bash
cd src/web3jobs_frontend
npm install
```

---

## Running the Project Locally

### 1. Start the local Internet Computer replica:
```bash
dfx start --background
```

### 2. Build the frontend:
```bash
cd src/web3jobs_frontend
npm run build
```

### 3. Deploy backend canisters:
```bash
cd ../../
dfx deploy
```

### 4. Start the frontend development server:
```bash
cd src/web3jobs_frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend canisters: Running on local DFX replica

---

## Deployment to Internet Computer Mainnet

To deploy on the mainnet:
```bash
dfx deploy --network ic
```

Ensure production environment variables are properly configured before deploying.

---

## Important Notes

1. **Build Requirement**: Always run `npm run build` in the frontend directory before deploying to generate the `dist/` folder

2. **Canister Bindings**: After modifying backend canisters, regenerate frontend bindings with:
```bash
npm run generate
```

3. **Dependency Management**: This project uses npm workspaces. Install dependencies in both:
   - Root directory
   - `web3jobs_frontend` directory

4. **Development Flow**:
   - Keep DFX replica running in background during development
   - Use `dfx stop` to shutdown the local replica when finished

For more details, refer to the [Internet Computer Documentation](https://internetcomputer.org/docs/current/developer-docs/).