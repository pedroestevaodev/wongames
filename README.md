# WonGames

<p style="text-align: center;">
  <a href="https://www.pedroestevao.com">
    <img src="https://res.cloudinary.com/dge3g9rcw/image/upload/v1741210796/github/whfxa6ermismpztvumnf.png" alt="illustrative image" />
  </a>
</p>

WonGames is a digital game commerce platform built as a monorepo. The repository contains a Next.js client application and a Strapi API, with centralized dependency management, development scripts, and continuous integration workflows.

The platform provides a complete game catalog experience, including authentication, search, filtering, wishlist management, shopping cart, checkout, orders, recommendations, and content administration.

## Overview

The project is divided into two independently deployable applications:

| Application | Directory | Responsibility                                                                 |
| ----------- | --------- | ------------------------------------------------------------------------------ |
| Client      | `client/` | User interface, authentication, catalog, cart, wishlist, profile, and checkout |
| API         | `api/`    | Content management, users, orders, payments, media, email, and database access |

Both applications are managed through npm Workspaces and share a single dependency lockfile at the repository root.

## Main Features

* Game catalog with categories, platforms, developers, and publishers
* Game search and filtering
* Product detail pages
* User registration and authentication
* Password recovery and reset
* Protected user area
* Profile management
* Shopping cart
* Wishlist
* Recommended and upcoming games
* Stripe checkout integration
* Order history
* Administrative content management
* Cloudinary media storage
* GraphQL communication between the client and API

## Repository Structure

```text
wongames/
├── .github/
│   └── workflows/
│       ├── api-ci.yml
│       └── client-ci.yml
│
├── client/
│   ├── @types/
│   ├── actions/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── generators/
│   ├── graphql/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── schemas/
│   ├── services/
│   ├── target/
│   ├── utils/
│   ├── package.json
│   └── README.md
│
├── api/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── src/
│   ├── types/
│   ├── package.json
│   └── README.md
│
├── package.json
├── package-lock.json
└── README.md
```

The workspace paths are relative to the root `package.json`:

```json
{
  "private": true,
  "workspaces": [
    "client",
    "api"
  ]
}
```

Do not prefix these paths with the repository name.

## Technology Stack

### Client

* Next.js 14
* React 18
* TypeScript
* Apollo Client
* GraphQL Code Generator
* Auth.js
* Styled Components
* Tailwind CSS
* React Hook Form
* Zod
* Stripe.js
* Jest
* Testing Library
* Storybook
* Mock Service Worker

### API

* Strapi 5
* TypeScript
* PostgreSQL
* GraphQL
* Strapi Users & Permissions
* Stripe
* Cloudinary
* Nodemailer

### Repository Tooling

* Node.js 20
* npm 10
* npm Workspaces
* GitHub Actions
* ESLint
* Prettier
* Husky
* lint-staged
* concurrently

## Requirements

Install the following tools before starting:

* Node.js 20
* npm 10 or later
* PostgreSQL
* Git

Optional infrastructure tools:

* Docker
* Docker Compose

External service credentials may also be required:

* Stripe
* Cloudinary
* SMTP provider

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd wongames
```

Install all workspace dependencies from the repository root:

```bash
npm install
```

The installation must be executed from the root directory. npm will resolve dependencies for both workspaces and generate a single `package-lock.json`.

Do not maintain separate lockfiles inside `client/` or `api/`.

The expected lockfile structure is:

```text
wongames/
└── package-lock.json
```

The following files should not exist:

```text
client/package-lock.json
api/package-lock.json
```

## Environment Configuration

Create the environment files for each application:

```bash
cp client/.env.example client/.env.local
cp api/.env.example api/.env
```

Configure the values according to the internal documentation:

* [Client configuration](client/README.md)
* [API configuration](api/README.md)

Environment files, credentials, private keys, and tokens must not be committed to version control.

## Running the Project

Start both applications concurrently:

```bash
npm run dev
```

This command executes:

```bash
npm run dev --workspace=@wongames/client
npm run dev --workspace=@wongames/api
```

The applications are selected by the `name` property declared in their respective `package.json` files:

```json
{
  "name": "@wongames/client"
}
```

```json
{
  "name": "@wongames/api"
}
```

### Run only the client

```bash
npm run dev:client
```

### Run only the API

```bash
npm run dev:api
```

## Local Services

By default, the applications are available at:

| Service          | Address                         |
| ---------------- | ------------------------------- |
| Client           | `http://localhost:3000`         |
| API              | `http://localhost:1337`         |
| Strapi Admin     | `http://localhost:1337/admin`   |
| GraphQL endpoint | `http://localhost:1337/graphql` |

The API and PostgreSQL must be available for features that depend on authentication, content queries, orders, wishlist data, or payments.

## Root Scripts

| Command                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `npm run dev`              | Starts the client and API concurrently               |
| `npm run dev:client`       | Starts only the client                               |
| `npm run dev:api`          | Starts only the API                                  |
| `npm run build`            | Builds the client and API                            |
| `npm run build:client`     | Builds only the client                               |
| `npm run build:api`        | Builds only the API                                  |
| `npm run lint`             | Runs lint scripts in workspaces that provide them    |
| `npm run lint:client`      | Runs the client lint validation                      |
| `npm run lint:api`         | Runs the API lint script when available              |
| `npm run typecheck`        | Runs TypeScript validation in supported workspaces   |
| `npm run typecheck:client` | Runs the client TypeScript validation                |
| `npm run typecheck:api`    | Runs the API TypeScript validation when available    |
| `npm run test`             | Runs tests in workspaces that provide a test script  |
| `npm run test:client`      | Runs the client test suite                           |
| `npm run test:ci`          | Runs workspace test suites in CI mode when available |
| `npm run codegen`          | Generates the client GraphQL artifacts               |
| `npm run storybook`        | Starts the client Storybook environment              |

## Workspace Commands

Commands may also be executed directly against a workspace.

### Client

```bash
npm run dev --workspace=@wongames/client
npm run build --workspace=@wongames/client
npm run test:ci --workspace=@wongames/client
```

### API

```bash
npm run dev --workspace=@wongames/api
npm run build --workspace=@wongames/api
```

Workspace commands should normally be executed from the repository root.

## Dependency Management

Dependencies that belong exclusively to one application should be declared in that application's `package.json`.

Install a dependency in the client:

```bash
npm install <package-name> --workspace=@wongames/client
```

Install a development dependency in the client:

```bash
npm install <package-name> --save-dev --workspace=@wongames/client
```

Install a dependency in the API:

```bash
npm install <package-name> --workspace=@wongames/api
```

Install a root development dependency:

```bash
npm install <package-name> --save-dev
```

Root dependencies should be limited to tooling shared by the repository, such as `concurrently`.

After changing dependencies, commit both the relevant `package.json` and the root `package-lock.json`.

## Application Architecture

The main communication flow is:

```text
Browser
   |
   v
Next.js Client
   |
   | GraphQL and authentication requests
   v
Strapi API
   |
   v
PostgreSQL
```

External integrations are accessed through the appropriate application layer:

```text
Next.js Client --------> Stripe.js
       |
       v
Strapi API ------------> Stripe API
       |
       +---------------> Cloudinary
       |
       +---------------> SMTP provider
       |
       v
PostgreSQL
```

Private integration credentials must remain in the API environment. The client must only receive values that are safe to expose to the browser, such as the Stripe publishable key.

## GraphQL Workflow

GraphQL operations used by the client are stored in:

```text
client/graphql/
```

The client generates TypeScript artifacts from the API GraphQL schema.

With the API running, execute:

```bash
npm run codegen
```

Generated files must not be edited manually.

When an API content type, query, mutation, fragment, or GraphQL response changes:

1. Start the API.
2. Regenerate the GraphQL client artifacts.
3. Run the client type validation.
4. Run the tests.
5. Build both applications.

```bash
npm run codegen
npm run typecheck:client
npm run test:ci
npm run build
```

## Database

The API uses PostgreSQL as its primary database.

Database credentials are configured in:

```text
api/.env
```

The API database configuration is located in:

```text
api/config/database.ts
```

When Docker Compose is used, the database host depends on where the API is running.

If the API runs directly on the host machine:

```env
DATABASE_HOST=127.0.0.1
```

If the API and database run in the same Docker Compose network:

```env
DATABASE_HOST=postgres
```

## Code Quality

The repository applies the following validation tools:

* ESLint for static analysis
* TypeScript for type validation
* Jest and Testing Library for automated tests
* Storybook for isolated component development
* Husky and lint-staged for Git hooks
* GitHub Actions for pull request and branch validation
* Production builds for integration validation

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

GraphQL changes must also run:

```bash
npm run codegen
```

## Continuous Integration

The repository contains separate workflows for each application:

```text
.github/workflows/
├── client-ci.yml
└── api-ci.yml
```

### Client workflow

The client workflow should run when changes affect:

```text
client/**
package.json
package-lock.json
.github/workflows/client-ci.yml
```

The expected validation steps are:

1. Checkout the repository.
2. Configure Node.js 20.
3. Restore the npm cache.
4. Install dependencies with `npm ci`.
5. Run client lint.
6. Run client type validation.
7. Run client tests.
8. Build the client.

### API workflow

The API workflow should run when changes affect:

```text
api/**
package.json
package-lock.json
.github/workflows/api-ci.yml
```

The expected validation steps are:

1. Checkout the repository.
2. Configure Node.js 20.
3. Restore the npm cache.
4. Install dependencies with `npm ci`.
5. Configure the required environment variables.
6. Build the API.

Future API tests can be added to the same workflow.

Both workflows must execute `npm ci` from the repository root because the project uses a single lockfile and npm Workspaces.

## Branch Strategy

The recommended branch naming convention is:

* `main`: stable version
* `develop`: integration branch
* `feature/*`: new features
* `fix/*`: bug fixes
* `refactor/*`: internal improvements
* `chore/*`: maintenance and infrastructure changes

Examples:

```text
feature/game-search
fix/checkout-validation
refactor/graphql-client
chore/update-strapi
```

## Commit Messages

Use objective and descriptive commit messages.

Examples:

```text
feat: add platform filter
fix: handle expired authentication session
refactor: extract checkout service
test: cover wishlist behavior
chore: update workspace configuration
```

## Pull Requests

Each pull request should:

* Describe the problem or requirement.
* Explain the implemented solution.
* Include testing instructions.
* Include screenshots for visual changes.
* Document new environment variables.
* Keep a limited and well-defined scope.
* Pass all applicable CI validations.

Changes affecting the GraphQL contract should preferably update the API and client in the same pull request.

## Deployment

The client and API can be deployed independently, even though they share the same repository.

### Client deployment

The client requires an environment compatible with Next.js.

Production configuration must include:

* Public API URL
* GraphQL endpoint
* Auth.js URL
* Auth.js secret
* Stripe publishable key

Build the client with:

```bash
npm run build:client
```

### API deployment

The API requires:

* Node.js 20
* PostgreSQL
* Cloudinary credentials
* SMTP credentials
* Stripe secret key
* Strapi application secrets

Build the API with:

```bash
npm run build:api
```

Production must use the Strapi `start` command rather than `develop`.

```bash
npm run start --workspace=@wongames/api
```

## Security Guidelines

* Never expose private keys in the client.
* Never commit environment files.
* Use different secrets for each environment.
* Restrict access to the Strapi administration panel.
* Use HTTPS in production.
* Review public and authenticated Strapi permissions.
* Restrict CORS to known origins.
* Do not log passwords, JWTs, payment data, or private credentials.
* Calculate payment amounts on the API.
* Rotate credentials after any suspected exposure.
* Keep dependencies updated and review major version upgrades before deployment.

## Internal Documentation

Application-specific instructions are available in:

* [Client documentation](client/README.md)
* [API documentation](api/README.md)

---

**Built with ☕ by [Pedro Estevão](https://www.pedroestevao.com)**
