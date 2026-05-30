# StackLens Server

Backend service powering the StackLens VS Code extension.

## Overview

StackLens Server acts as the secure AI gateway between the VS Code extension and AI providers.

Responsibilities:

* Secure AI provider access
* Documentation generation
* Provider failover
* Rate limiting
* Request validation
* Future architecture-analysis services

## Tech Stack

### Backend

* NestJS
* TypeScript
* Node.js

### Database

* PostgreSQL
* Neon Database

### AI Providers

Primary:

* Groq

Fallback:

* Google Gemini 2.5 Flash

### Deployment

* Render

## Architecture

VS Code Extension

↓

StackLens Server

↓

Groq

↓

Gemini Fallback

↓

Documentation Response

## Installation

```bash
npm install
```

## Development

```bash
npm run start:dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm run start:prod
```

## API

### Generate Documentation

Endpoint:

```http
POST /docs/generate
```

Headers:

```http
x-stacklens-client: vscode-extension
```

Request:

```json
{
  "language": "typescript",
  "messages": []
}
```

Response:

```json
{
  "documentation": "Generated documentation..."
}
```

## Security

Security measures implemented:

* Helmet
* Request validation
* DTO validation
* Rate limiting
* Environment-based secrets
* Hidden AI provider credentials

## Rate Limiting

Current configuration:

* 60 requests per minute

Configurable through:

```ts
ThrottlerModule
```

## Future Modules

Planned services:

* Architecture analysis
* Code explanation
* Security scanning
* Refactoring assistance
* Dependency analysis
* Project onboarding AI

## Deployment

Recommended:

* Render
* Railway
* Fly.io

Database:

* Neon PostgreSQL

## License

MIT License
