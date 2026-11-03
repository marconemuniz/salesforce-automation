# Salesforce Automation

🇬🇧 [Read in English](README.md)

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

## Estrutura do projeto

```
Salesforce_Automation/
├── .github/
│   └── workflows/      # GitHub Actions (CI)
├── playwright/
│   └── .auth/          # Sessão salva do Salesforce (ignorada pelo Git)
├── test-data/          # Construtores de massa de dados
├── tests/              # Arquivos de teste (*.spec.ts)
├── .env.example        # Modelo das variáveis de ambiente
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── README.pt-BR.md
```

## Como executar

### 1. Instalar dependências

```bash
npm install
npx playwright install
```

### 2. Configurar as variáveis de ambiente

Copie o `.env.example` para `.env` e preencha os valores:

```
SF_BASE_URL=       # URL de login do Salesforce (my.salesforce.com)
SF_LIGHTNING_URL=  # URL do Lightning usada pelos testes (lightning.force.com), sem barra no final
SF_USERNAME=       # Usuário do Salesforce
SF_PASSWORD=       # Senha do Salesforce
```

> `SF_USERNAME` e `SF_PASSWORD` ainda não são usados pelos testes. Estão reservados para um login automatizado em uma etapa futura.

O arquivo `.env` é ignorado pelo Git. Nunca versione credenciais. Use uma org **Sandbox ou Developer Edition**, e não produção.

### 3. Gravar a sessão do Salesforce

Os testes reutilizam uma sessão de login salva. O Salesforce pede um código de verificação em dispositivos novos, então a sessão é gravada manualmente:

```bash
npx playwright codegen --save-storage=playwright/.auth/user.json <URL_DE_LOGIN_DO_SALESFORCE>
```

Faça login, digite o código, espere o Lightning carregar e feche o navegador. O arquivo de sessão é ignorado pelo Git.

Quando a sessão expirar, os testes são redirecionados para a tela de login e falham. Repita este passo para renová-la.

### 4. Executar os testes

```bash
# Executar todos os testes
npx playwright test

# Executar com o navegador visível
npx playwright test --headed

# Abrir o relatório
npx playwright show-report
```

> Os testes rodam atualmente apenas no Chromium. Os outros navegadores estão desativados no `playwright.config.ts`.
>
> Cada execução cria registros reais na org do Salesforce.

## Roadmap

- [x] Setup do Playwright com TypeScript
- [x] Repositório no GitHub com CI básico
- [x] Login com sessão salva (storageState)
- [x] Teste de criação de Lead
- [x] Construtor de massa de dados
- [ ] Page Object Model e fixtures
- [ ] Pipeline de CI/CD completo (incluindo autenticação automatizada)
- [ ] Contas e Oportunidades