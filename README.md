# General

This repo contains the frontend for the EasyGenerator interview assignment.

# Live Demo

![API Status](https://img.shields.io/website-up-down-green-red/https/authly.zooop.in)

- [Online Demo](https://authly.zooop.in)

## Functionality 🛠️

### **Auth Management** 🔐:

- Sign Up User
- Sign In User
- Forgot / Reset Password of User
- Verify Email
- Refresh token

# Features

- UI/UX
  - Reusable components
  - Layouts
  - Theming (primary/seconday and light/dark)
  - State management using **Context API** and Redux
  - **Prettier** for code formatting
  - **Eslint** for error checking
  - **Vitest** with **Testing Library** for testing components and hooks
  - **Public** and **Private** layouts
  - Basic **authentication** hooks and events
  - **Dark** and **Light** mode
  - FavIcon and Manifest for **PWA**

# Tools/Technologies

- React
- Vite
- Typescript
- MUI
- React router
- Node.js
- NPM
- Redux

## Environment Variables 🌍

Default environment variables passed during the Docker build process:

- `APP_API_BASE_URL`: Api Base Url.
- `AUTH_API_BASE_URL`: Auth Api Base Url (Can be same as app api base url).
- `ENABLE_SESSION_TIMEOUT`: Boolean true/false to allow session timeout

## Project setup

```bash
$ npm install
```

## How to use

1. Copy `.env.sample` file into `.env` file

## Compile, Test and Run

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run lint`

Checks the code for errors and missing things

### `npm run format`

Formats the code according to `./prettierrc.js` config

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production or local development to the `dist` folder.<br />

## Docker

Prequisites - Install docker

### `docker compose up`
