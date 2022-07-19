# BED Assignment 2

This is a submission for my school's backend web development (BED) assignment.

## What's inside?

### Tech Stack

**Frontend**

- [Next.js](https://nextjs.org/), a react-based framework
- [Chakra UI](https://chakra-ui.com/), a component library

**Backend**

- [Express.js](https://expressjs.com/), a backend web framework
- [MySQL](https://www.mysql.com/), a SQL database

### Folder Structure

- `apps/api`: API powered by express
- `apps/web`: web app powered by next.js
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier` used by `apps/web`)
- `packages/scripts`: scripts used throughout the monorepo (includes `custom-commit` for formatting git commits)

### Utilities

- [Turborepo](https://turborepo.org/) for building monorepos
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Jest](https://jestjs.io/) for running tests
- [Supertest](https://www.npmjs.com/package/supertest) for testing APIs
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## How to Setup?

### Prerequisites

- [npm](https://www.npmjs.com/): ^8.0.0
- [node](https://nodejs.org/): ^16.0.0
- [MySQL Server](https://www.mysql.com/)

### Configuration

Refer to `.env.example` in both `apps/api` and `apps/web` directories and create a `.env` file in each.

### Start the App

### For Development

To develop all apps and packages, run the following command:

```bash
# Ensure that NODE_ENV=development
cd bed-assignment-2

npm run dev
```

#### For Production

To start the app for production, run the following commands:

```bash
# Ensure that NODE_ENV=production
cd bed-assignment-2

npm run build

npm run start
```
