# Blogai

Blogai is a learning-focused blog platform built with the T3 Stack. It combines a modern Next.js frontend, type-safe tRPC APIs, Prisma ORM, and a PostgreSQL-compatible database workflow
to deliver a full-stack blogging experience.

The project includes user authentication, post browsing, markdown-based content rendering, comments, likes, bookmarks, and admin-oriented user management. It was built primarily as a
practical project to explore the T3 ecosystem and common full-stack patterns in TypeScript.

## Features

- Browse blog posts from a curated feed
- View individual posts with markdown rendering
- Create and edit posts with a markdown editor
- Register, log in, and verify accounts
- Like and bookmark posts
- Comment on posts
- Admin tools for user management
- Type-safe client/server communication with tRPC

## Tech Stack

- **Next.js** - React framework for routing, server-side rendering, and app structure
- **TypeScript** - Static typing across the frontend and backend
- **tRPC** - End-to-end type-safe APIs
- **Prisma** - ORM for database access and schema management
- **Tailwind CSS** - Utility-first styling
- **Recoil** - Client-side state management
- **React Query** - Data fetching and caching through tRPC
- **React Markdown** - Markdown rendering for post content
- **SuperJSON** - Serialization for complex data types
- **Zod** - Runtime validation and schema parsing
- **CockroachDB** - Database provider configured through Prisma
- **Redis** - Used for caching or session-related workflows
- **JWT** - Authentication token handling
- **bcrypt** - Password hashing
- **Nodemailer** - Email delivery for verification flows

## Project Structure

- `src/pages` - Next.js pages and API routes
- `src/server/api` - tRPC routers, procedures, and context
- `src/components` - Reusable UI components
- `src/utils` - Shared helpers and domain utilities
- `src/db` - Database client setup
- `prisma/schema.prisma` - Database schema

## Getting Started

### Prerequisites

- Node.js 18+
- A configured database
- Redis credentials
- Environment variables set in `.env`

### Environment Variables

This project expects the following variables to be available:

- `DATABASE_URL`
- `JWT_KEY`
- `REDIS_URL`
- `REDIS_PASSWORD`
- `REDIS_PORT`

### Install Dependencies

```bash
npm install

### Run the Development Server

npm run dev

### Build for Production

npm run build

### Start the Production Server

npm start

## Notes

This application was created as a personal learning project to explore:

- the T3 Stack
- type-safe API patterns with tRPC
- Prisma database modeling
- markdown-based blog workflows
- authentication and user management in a full-stack TypeScript app

```
