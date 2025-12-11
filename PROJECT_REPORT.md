# Code Snippet Sharing Platform - Project Report

## 🚀 Project Overview
This document details the successful implementation of a modern, full-stack web application for sharing code snippets and markdown documentation. The platform allows users to sign up, manage projects, create public/private entries, and discover content via a community feed.

## 🛠 Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom premium design system)
- **Database**: SQLite (via Prisma ORM) - *Configured for easy local development*
- **Authentication**: NextAuth.js (Credentials Provider)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Markdown**: `react-markdown` + `remark-gfm`
- **Syntax Highlighting**: `react-syntax-highlighter`
- **Validation**: Zod

## ✨ Key Features Implemented

### 1. Authentication & User Management
- **Secure Sign-up/Sign-in**: Implemented using NextAuth.js with bcrypt password hashing.
- **Protected Routes**: Middleware ensures dashboard access is restricted to authenticated users.
- **User Profiles**: Users can update their display name and email settings.

### 2. Dashboard & Community Feed
- **Public Feed**: A dynamic feed displaying public snippets from all users.
- **Real-time Search**: Debounced search functionality to filter entries by title or content.
- **Rich Previews**: Entry cards feature syntax-highlighted code previews and rendered markdown.

### 3. Project Management
- **Organization**: Users can group entries into Projects.
- **CRUD Operations**: Full capability to create, view, and delete projects.
- **Project Stats**: Visual indicators of entry counts per project.

### 4. Content Creation (The Editor)
- **Monaco Editor Integration**: A professional-grade code editor experience (VS Code-like).
- **Dual Mode**: Support for both Code Snippets (with language selection) and Markdown Documents.
- **Live Preview**: Split-screen preview for Markdown editing.
- **Visibility Control**: Toggle between Public (shared in feed) and Private (personal use only).

### 5. Premium UI/UX
- **Design System**: Custom Tailwind configuration with vibrant gradients, glassmorphism effects, and dark mode aesthetics.
- **Responsive Layout**: Mobile-first design with a collapsible sidebar and adaptive grids.
- **Interactive Elements**: Hover effects, smooth transitions, and loading states.

## 🗄️ Database Architecture
The database schema (managed via Prisma) consists of three core models:
1.  **User**: Stores account credentials and profile info.
2.  **Project**: Represents a collection of entries, linked to a user.
3.  **Entry**: The core content unit (Code or Markdown), linked to User and optionally a Project. Includes visibility flags (`isPublic`).

*Note: We used SQLite for development to ensure the project runs immediately without requiring a separate PostgreSQL server instance. The schema is compatible with PostgreSQL for production.*

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup
The project includes a seed script that populates the database with demo users (Alice, Bob, Charlie) and sample content.
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to SQLite database
npx prisma db push

# Seed with mock data
npm run db:seed
```

### 3. Running the App
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

### 4. Demo Credentials
- **Email**: `alice@example.com`
- **Password**: `password123`

## 📝 API Routes
- `GET /api/feed`: Public feed with search.
- `GET/POST /api/projects`: Manage user projects.
- `GET/POST /api/entries`: Manage code/markdown entries.
- `PUT /api/user/profile`: Update user settings.
- `POST /api/auth/signup`: User registration.

## 🔮 Future Improvements
- **Comments & Likes**: Add social interaction to entries.
- **Social Auth**: Add Google/GitHub login providers.
- **Production DB**: Switch to PostgreSQL/Supabase for deployment.
- **File Uploads**: Support image attachments in markdown.
