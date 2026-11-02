# Salesforce Automation

Projeto de automação de testes end-to-end para o CRM Salesforce, usando **Playwright** e **TypeScript**.

> 🚧 Projeto em construção. Estou evoluindo o framework em etapas, de um script simples até uma estrutura profissional, e registrando o processo no histórico de commits.

## Objetivo

- Automatizar fluxos do Salesforce (começando pela criação de Leads)
- Aplicar boas práticas de mercado: Page Object Model, fixtures, variáveis de ambiente
- Integrar com CI/CD usando GitHub Actions

## Tecnologias

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- GitHub Actions

## Como executar

```bash
# Instalar dependências
npm install

# Instalar os navegadores do Playwright
npx playwright install

# Executar os testes
npx playwright test

# Abrir o relatório
npx playwright show-report
```

> Os testes do Salesforce exigem credenciais e sessão local, que serão documentadas nas próximas etapas.

## Roadmap

- [x] Setup do Playwright com TypeScript
- [x] Repositório no GitHub com CI básico
- [ ] Login com sessão salva (storageState)
- [ ] Teste de criação de Lead
- [ ] Page Object Model e fixtures
- [ ] Pipeline de CI/CD completo
- [ ] Contas e Oportunidades