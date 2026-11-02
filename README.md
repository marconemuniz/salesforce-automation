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

## Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run the tests
npx playwright test

# Open the report
npx playwright show-report
```

> The Salesforce tests require credentials and a locally saved session, which will be documented in upcoming steps.

## Roadmap

- [x] Playwright + TypeScript setup
- [x] GitHub repository with basic CI
- [ ] Login with saved session (storageState)
- [ ] Lead creation test
- [ ] Page Object Model and fixtures
- [ ] Complete CI/CD pipeline
- [ ] Accounts and Opportunities