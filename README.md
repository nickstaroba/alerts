# Alerts Example

## Live Demo

[https://nickstaroba.com/alerts/](https://nickstaroba.com/alerts/)

## Installation

```sh
npm install
```

## Run Locally

```sh
npm start
```

## Publishing

Go to Github Actions > Publish to Github Pages > Run Workflow on `main`

## Initial Repo Setup

Go to Github Settings > Actions > General > Update the following settings:

- Fork pull request workflows from outside collaborators
  - [x] Require approval for all outside collaborators
- Workflow permissions
  - [x] Read and write permissions

Go to Github Settings > Pages > Build and Deployment > Set Branch to `gh-pages`

Go to Github Settings > Secrets and Variables > Actions > Set up a new secret for `VITE_API_URL`
