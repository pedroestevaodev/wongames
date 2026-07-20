# WonGames Client

<p style="text-align: center;">
  <a href="https://www.pedroestevao.com">
    <img src="https://res.cloudinary.com/dge3g9rcw/image/upload/v1741210796/github/whfxa6ermismpztvumnf.png" alt="illustrative image" />
  </a>
</p>

The WonGames client is the web application responsible for the game catalog, authentication, shopping cart, wishlist, user profile, and checkout experience.

It is built with Next.js, React, and TypeScript and communicates with the WonGames API primarily through GraphQL.

For repository-wide setup and workspace commands, see the [root documentation](../README.md).

## Responsibilities

The client is responsible for:

* Rendering public and authenticated pages
* User registration and authentication
* Password recovery and reset
* Protected route handling
* Game catalog navigation
* Search and filtering
* Game detail pages
* Recommended and upcoming game sections
* Shopping cart management
* Wishlist management
* User profile management
* Stripe checkout integration
* Order confirmation pages
* Typed GraphQL communication
* Reusable UI component development
* Component documentation through Storybook

## Technology Stack

* Next.js 14.2
* React 18
* TypeScript 5
* Apollo Client
* GraphQL
* GraphQL Code Generator
* Auth.js 5
* Styled Components
* Tailwind CSS
* React Hook Form
* Zod
* Stripe.js
* Jest
* Testing Library
* Storybook
* Mock Service Worker
* ESLint
* Prettier
* Husky
* lint-staged

## Directory Structure

```text
client/
├── actions/
├── app/
│   ├── (auth)/
│   ├── (protected)/
│   ├── api/
│   ├── game/
│   ├── games/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
├── contexts/
├── data/
├── generators/
├── graphql/
│   ├── fragments/
│   ├── generated/
│   ├── mutations/
│   └── queries/
├── hooks/
├── lib/
├── public/
├── schemas/
├── services/
├── utils/
├── codegen.ts
├── next.config.js
├── package.json
└── README.md
```

## Main Directories

### `actions`

Contains Server Actions for operations such as:

* Sign in
* Sign out
* Password recovery
* Password reset
* Profile updates

### `app`

Contains the routes implemented with the Next.js App Router.

Route groups separate authentication and protected areas:

```text
app/
├── (auth)/
│   ├── forgot-password/
│   ├── reset-password/
│   ├── sign-in/
│   └── sign-up/
│
└── (protected)/
    ├── cart/
    ├── profile/
    ├── success/
    └── wishlist/
```

Public routes include:

* Home page
* Game catalog
* Game details
* Authentication API routes
* Not-found page

### `components`

Contains reusable UI components and composed page sections.

Examples include:

* Banners
* Buttons
* Form fields
* Game cards
* Cart components
* Dropdowns
* Galleries
* Header and footer
* Menus
* Modals
* Navigation elements
* Product detail sections
* Page layouts

### `graphql`

Contains GraphQL operations used by Apollo Client:

```text
graphql/
├── fragments/
├── generated/
├── mutations/
└── queries/
```

Queries cover resources such as:

* Categories
* Games
* Home page content
* Orders
* Platforms
* User profile
* Recommendations
* Upcoming games
* Wishlist

Mutations include user registration and wishlist operations.

### `hooks`

Contains reusable hooks, including logic related to:

* Shopping cart state
* Wishlist state
* Responsive media queries

### `schemas`

Contains Zod validation schemas for authentication, password management, and profile forms.

### `services`

Contains authentication and external communication services.

## Requirements

* Node.js 20
* npm 10 or later
* WonGames API running locally or accessible remotely

Dependencies are installed from the repository root:

```bash
npm install
```

Do not run a separate installation that creates a `client/package-lock.json`.

The repository must maintain only the root lockfile:

```text
../package-lock.json
```

## Environment Variables

Create the local environment file:

```bash
cp .env.example .env.local
```

Example configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_GRAPHQL_SCHEMA=http://localhost:1337/graphql

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

AUTH_URL=http://localhost:3000
AUTH_SECRET=

NODE_ENV=development
```

### Environment Reference

| Variable                             |              Required | Description                                                |
| ------------------------------------ | --------------------: | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`                |                   Yes | Public base URL of the WonGames API                        |
| `NEXT_PUBLIC_GRAPHQL_SCHEMA`         |                   Yes | GraphQL endpoint used by Apollo and GraphQL Code Generator |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Required for checkout | Stripe publishable key                                     |
| `AUTH_URL`                           |                   Yes | Base URL used by Auth.js                                   |
| `AUTH_SECRET`                        |                   Yes | Secret used to sign authentication sessions                |
| `NODE_ENV`                           |                   Yes | Current execution environment                              |

Variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle.

Never use the `NEXT_PUBLIC_` prefix for:

* Stripe secret keys
* Database credentials
* Cloudinary secrets
* SMTP passwords
* Strapi application secrets
* Private authentication credentials

Generate a local authentication secret with:

```bash
openssl rand -base64 32
```

## Running the Client

From the repository root:

```bash
npm run dev:client
```

Alternatively:

```bash
npm run dev --workspace=@wongames/client
```

The application will be available at:

```text
http://localhost:3000
```

The API should normally be available at:

```text
http://localhost:1337
```

## Available Scripts

The following scripts are declared in `client/package.json`:

| Command                                                | Description                           |
| ------------------------------------------------------ | ------------------------------------- |
| `npm run dev --workspace=@wongames/client`             | Starts the Next.js development server |
| `npm run build --workspace=@wongames/client`           | Creates the production build          |
| `npm run start --workspace=@wongames/client`           | Starts the production build           |
| `npm run lint --workspace=@wongames/client`            | Runs the Next.js ESLint validation    |
| `npm run typecheck --workspace=@wongames/client`       | Runs TypeScript validation            |
| `npm run test --workspace=@wongames/client`            | Runs the Jest test suite              |
| `npm run test:watch --workspace=@wongames/client`      | Runs Jest in watch mode               |
| `npm run test:ci --workspace=@wongames/client`         | Runs Jest using the CI configuration  |
| `npm run generate --workspace=@wongames/client`        | Runs the Plop generators              |
| `npm run codegen --workspace=@wongames/client`         | Generates GraphQL artifacts           |
| `npm run storybook --workspace=@wongames/client`       | Starts Storybook                      |
| `npm run build-storybook --workspace=@wongames/client` | Builds the static Storybook output    |

Root aliases are also available:

```bash
npm run dev:client
npm run build:client
npm run lint:client
npm run typecheck:client
npm run test:client
npm run codegen
npm run storybook
```

## Routing

### Public Routes

| Route              | Purpose             |
| ------------------ | ------------------- |
| `/`                | Home page           |
| `/games`           | Game catalog        |
| `/game/[slug]`     | Game detail page    |
| `/sign-in`         | User authentication |
| `/sign-up`         | User registration   |
| `/forgot-password` | Password recovery   |
| `/reset-password`  | Password reset      |

### Protected Routes

| Route       | Purpose            |
| ----------- | ------------------ |
| `/cart`     | Shopping cart      |
| `/profile`  | User profile       |
| `/wishlist` | User wishlist      |
| `/success`  | Order confirmation |

Client-side route protection improves the user experience, but it does not replace API authorization.

The API must validate access to all protected data and operations.

## GraphQL Communication

Apollo Client handles communication with the WonGames GraphQL API.

The main client configuration is located in:

```text
lib/apolloClient.ts
```

The endpoint is configured through:

```env
NEXT_PUBLIC_GRAPHQL_SCHEMA=http://localhost:1337/graphql
```

The API must be available when:

* Querying content during development
* Testing authenticated flows
* Running GraphQL Code Generator
* Validating application behavior against the current schema

## GraphQL Code Generator

GraphQL operations are typed from the API schema.

Run the generator from the repository root:

```bash
npm run codegen
```

Or target the client workspace directly:

```bash
npm run codegen --workspace=@wongames/client
```

The generator uses:

* The API GraphQL schema
* Queries under `graphql/queries`
* Mutations under `graphql/mutations`
* Shared fragments under `graphql/fragments`
* The configuration in `codegen.ts`

Generated files are stored under:

```text
graphql/generated/
```

Do not edit generated files manually.

When changing a GraphQL operation or API content type:

```bash
npm run codegen
npm run typecheck:client
npm run test:ci --workspace=@wongames/client
npm run build:client
```

## Authentication

Authentication is implemented with Auth.js and the WonGames API.

The supported flow includes:

* User registration
* Sign in
* Sign out
* Session persistence
* Password recovery
* Password reset
* Protected pages
* User profile updates

Authentication API routes are located under:

```text
app/api/auth/[...nextauth]/
```

Related logic is distributed across:

```text
actions/
services/
schemas/
```

Private credentials and sensitive tokens must not be exposed in Client Components.

Authorization rules must always be enforced by the API.

## Checkout

The client uses Stripe.js and the Stripe React components to collect and confirm payment information.

The browser must only receive the Stripe publishable key:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

The expected payment flow is:

1. The user reviews the cart.
2. The client sends the selected product identifiers to the API.
3. The API validates the products and calculates the amount.
4. The API creates a Stripe PaymentIntent.
5. The client confirms the payment with Stripe.js.
6. The order is persisted and associated with the authenticated user.
7. The user is redirected to the order confirmation page.

The client must not be treated as the source of truth for product prices or order totals.

## Styling

The project uses Styled Components as its primary component styling solution and Tailwind CSS for selected utility-based scenarios.

When adding or modifying components:

* Reuse existing design tokens.
* Keep component-specific styles close to the component.
* Avoid unnecessary duplicated values.
* Preserve responsive behavior.
* Preserve keyboard navigation.
* Provide accessible names and labels.
* Avoid mixing styling strategies without a clear reason.

## Storybook

Storybook is used for isolated component development and visual documentation.

Start Storybook:

```bash
npm run storybook
```

Or:

```bash
npm run storybook --workspace=@wongames/client
```

The default address is:

```text
http://localhost:6006
```

Build the static Storybook output:

```bash
npm run build-storybook --workspace=@wongames/client
```

Reusable components should include stories when isolated visual validation adds value.

Relevant states may include:

* Default
* Loading
* Empty
* Error
* Disabled
* Mobile
* Desktop
* Authenticated
* Unauthenticated

## Testing

The client test suite uses:

* Jest
* Testing Library
* jest-dom
* Mock Service Worker
* jest-styled-components

Run the tests:

```bash
npm run test:client
```

Run in watch mode:

```bash
npm run test:watch --workspace=@wongames/client
```

Run the CI configuration:

```bash
npm run test:ci --workspace=@wongames/client
```

Tests should prioritize observable behavior instead of internal implementation details.

Relevant scenarios include:

* Component states
* User interaction
* Form validation
* Success and error responses
* Loading indicators
* Empty states
* Authentication behavior
* Protected content
* GraphQL responses
* Cart and wishlist updates

## Code Generators

The client uses Plop to generate standardized project files.

Run:

```bash
npm run generate --workspace=@wongames/client
```

Generator templates are located in:

```text
generators/
```

Generated code should follow the existing directory structure, naming conventions, and testing patterns.

## Remote Images

Allowed remote image hosts are configured in:

```text
next.config.js
```

New remote providers must be explicitly added before being used with the Next.js image component.

Avoid broad or unrestricted hostname rules.

## Code Standards

* Use TypeScript consistently.
* Avoid `any` unless there is a documented reason.
* Keep components focused on a single responsibility.
* Keep GraphQL operations in dedicated files.
* Reuse GraphQL fragments for recurring field selections.
* Centralize form validation in Zod schemas.
* Reuse existing hooks and services.
* Separate Server Components from Client Components correctly.
* Avoid external requests directly inside visual components.
* Handle loading, empty, success, and error states.
* Preserve accessibility.
* Update tests when behavior changes.
* Do not edit generated GraphQL files manually.

## Validation Before Commit

Run:

```bash
npm run lint:client
npm run typecheck:client
npm run test:ci --workspace=@wongames/client
npm run build:client
```

GraphQL-related changes must also run:

```bash
npm run codegen
```

## Production Build

Create the production build:

```bash
npm run build:client
```

Start the production server:

```bash
npm run start --workspace=@wongames/client
```

Public environment variables are included during the build. Verify production values before building and deploying the application.

## Continuous Integration

The client workflow is located at:

```text
.github/workflows/client-ci.yml
```

Because the project uses npm Workspaces, the workflow must install dependencies from the repository root:

```bash
npm ci
```

Client commands should target the workspace:

```bash
npm run lint --workspace=@wongames/client
npm run typecheck --workspace=@wongames/client
npm run test:ci --workspace=@wongames/client
npm run build --workspace=@wongames/client
```

The workflow should monitor changes to:

```text
client/**
package.json
package-lock.json
.github/workflows/client-ci.yml
```

## Troubleshooting

### npm cannot find the client workspace

Verify the root `package.json`:

```json
{
  "workspaces": [
    "client",
    "api"
  ]
}
```

Verify the client package name:

```json
{
  "name": "@wongames/client"
}
```

Then run:

```bash
npm pkg get name --workspaces
```

### GraphQL generation fails

Verify that:

* The API is running.
* `NEXT_PUBLIC_GRAPHQL_SCHEMA` is correct.
* The GraphQL endpoint is accessible.
* The current operations are compatible with the API schema.

### Authentication fails

Verify:

* `AUTH_URL`
* `AUTH_SECRET`
* API URL
* Authentication provider configuration
* Cookies and domain configuration
* Local system time

### Remote images do not load

Verify that the image hostname is configured in `next.config.js`.

### Environment changes are not reflected

Remove the Next.js build cache and rebuild:

```bash
rm -rf client/.next
npm run build:client
```

## Security

* Never expose private keys through `NEXT_PUBLIC_*`.
* Never log authentication tokens.
* Do not rely exclusively on client-side route protection.
* Validate external data before rendering.
* Avoid rendering unsanitized external HTML.
* Use a different `AUTH_SECRET` for each environment.
* Review authentication and payment dependency updates carefully.
* Keep payment calculations on the API.

<br />

---

<br />

**Built with ☕ by [Pedro Estevão](https://www.pedroestevao.com)**
