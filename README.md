# Salesforce Automation

🇧🇷 [Leia em português](README.pt-BR.md)

End-to-end test automation project for the Salesforce CRM, built with **Playwright** and **TypeScript**.

> 🚧 Work in progress. I'm evolving this framework step by step, from a simple script to a professional structure, and documenting the process in the commit history.

## Goals

- Automate Salesforce flows (starting with Lead creation)
- Apply industry best practices: Page Object Model, fixtures, environment variables
- Integrate with CI/CD using GitHub Actions

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- GitHub Actions

## Project Structure

```
Salesforce_Automation/
├── .github/
│   └── workflows/      # GitHub Actions (CI)
├── fixtures/           # Custom Playwright fixtures
├── pages/              # Page Objects (one class per screen)
├── playwright/
│   └── .auth/          # Saved Salesforce session (git-ignored)
├── test-data/          # Test data builders
├── tests/              # Test files (*.spec.ts)
├── utils/              # Shared helpers (e.g. env validation)
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── README.pt-BR.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```
SF_BASE_URL=       # Salesforce login URL (my.salesforce.com)
SF_LIGHTNING_URL=  # Lightning URL used by the tests (lightning.force.com), no trailing slash
SF_USERNAME=       # Salesforce user
SF_PASSWORD=       # Salesforce password
```

> `SF_USERNAME` and `SF_PASSWORD` are not used by the tests yet. They are reserved for an automated login in a future step.

The `.env` file is git-ignored. Never commit credentials. Use a **Sandbox or Developer Edition** org, not production.

### 3. Record the Salesforce session

Tests reuse a saved login session. Salesforce asks for a verification code on new devices, so the session is recorded manually:

```bash
npx playwright codegen --save-storage=playwright/.auth/user.json <YOUR_SALESFORCE_LOGIN_URL>
```

Log in, enter the verification code, wait for Lightning to load and close the browser. The session file is git-ignored.

When the session expires, tests are redirected to the login page and fail. Repeat this step to renew it.

### 4. Run the tests

```bash
# Run all tests
npx playwright test

# Run with the browser visible
npx playwright test --headed

# Open the report
npx playwright show-report
```

> Tests currently run on Chromium only. Other browsers are disabled in `playwright.config.ts`.
>
> Each run creates real records in the Salesforce org.

## Roadmap

- [x] Playwright + TypeScript setup
- [x] GitHub repository with basic CI
- [x] Login with saved session (storageState)
- [x] Lead creation test
- [x] Test data builder
- [x] Page Object Model and fixtures
- [ ] Complete CI/CD pipeline (including automated authentication)
- [ ] Accounts and Opportunities