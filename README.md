# PWD (Portfolio Web Development) Workspace

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-black.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748.svg)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://postgresql.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.40+-003B57.svg)](https://sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-8.55.0-4B32C3.svg)](https://eslint.org/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/pwd-workspace)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](#)

> A comprehensive full-stack web development portfolio showcasing modern technologies, best practices, and scalable application architectures.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Individual Projects](#-individual-projects)
## 🐳 Docker Support

### Prerequisites

- **Docker** - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Docker Compose** (included with Docker Desktop)

### Docker Configuration

Each project includes Docker support for easy deployment and development.

#### Frontend Applications

**Dockerfile** for React applications:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Backend APIs

**Dockerfile** for Node.js APIs:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate

EXPOSE 3001
CMD ["npm", "start"]
```

### Running with Docker Compose

**`docker-compose.yml`** for full-stack deployment:

```yaml
version: '3.8'

services:
  # Databases
  todo-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: todoapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - todo_data:/var/lib/postgresql/data
    ports:
      - "5433:5432"

  social-db:
    image: sqlite:3.40-alpine
    volumes:
      - social_data:/data

  # Backend APIs
  todo-api:
    build: ./todo-api
    environment:
      DATABASE_URL: postgresql://user:password@todo-db:5432/todoapp
      PORT: 3001
    depends_on:
      - todo-db
    ports:
      - "3001:3001"

  social-api:
    build: ./social-api
    environment:
      DATABASE_URL: sqlite:///data/social.db
      PORT: 3002
    depends_on:
      - social-db
    volumes:
      - social_data:/data
    ports:
      - "3002:3002"

  # Frontend Applications
  todo-frontend:
    build: ./todo
    ports:
      - "3000:80"
    environment:
      REACT_APP_API_URL: http://localhost:3001

  social-frontend:
    build: ./social
    ports:
      - "3003:80"
    environment:
      REACT_APP_API_URL: http://localhost:3002

volumes:
  todo_data:
  social_data:
```

### Docker Commands

#### Build and Run Individual Projects

```bash
# Build and run todo frontend
cd todo
docker build -t todo-frontend .
docker run -p 3000:80 todo-frontend

# Build and run todo API
cd todo-api
docker build -t todo-api .
docker run -p 3001:3001 todo-api
```

#### Run Full Stack with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up --build -d
```

#### Database Management with Docker

```bash
# Access database containers
docker-compose exec todo-db psql -U user -d todoapp
docker-compose exec social-db sqlite3 /data/social.db

# Backup databases
docker-compose exec todo-db pg_dump -U user todoapp > backup.sql
docker cp $(docker-compose ps -q social-db):/data/social.db ./backup-social.db
```

### Development with Docker

For development with hot reload:

**`docker-compose.dev.yml`**:

```yaml
version: '3.8'

services:
  todo-frontend:
    build:
      context: ./todo
      dockerfile: Dockerfile.dev
    volumes:
      - ./todo/src:/app/src
      - ./todo/public:/app/public
    ports:
      - "3000:3000"

  todo-api:
    build:
      context: ./todo-api
      dockerfile: Dockerfile.dev
    volumes:
      - ./todo-api:/app
      - /app/node_modules
    ports:
      - "3001:3001"
```

**`Dockerfile.dev`** for hot reload:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev"]
```
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Changelog](#-changelog)

## 🚀 Project Overview

The **PWD (Portfolio Web Development) Workspace** is a comprehensive collection of modern web applications demonstrating full-stack development capabilities. This monorepo houses multiple projects ranging from simple React applications to complex full-stack platforms, showcasing expertise in:

- **Modern Frontend Development** with React 18 and Vite
- **RESTful API Design** with Node.js and Express
- **Database Integration** using Prisma ORM
- **Responsive Web Design** with mobile-first approach
- **State Management** with React Context API
- **Type-Safe Development** practices
- **Code Quality** and development best practices

Each project is self-contained with its own dependencies, configuration, and deployment readiness, making this workspace ideal for both learning and portfolio demonstration.

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PWD Workspace                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React     │  │   React     │  │   React     │             │
│  │  Frontend   │  │  Frontend   │  │  Frontend   │             │
│  │  Apps       │  │  Apps       │  │  Apps       │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐                             │
│  │  Node.js    │  │  Node.js    │                             │
│  │   REST      │  │   REST      │                             │
│  │   APIs      │  │   APIs      │                             │
│  └─────────────┘  └─────────────┘                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Prisma    │  │   SQLite    │  │ PostgreSQL  │             │
│  │     ORM     │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠 Technology Stack

### Frontend Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **React** | 18.2.0 | Modern React with hooks and functional components |
| **Vite** | 5.0.8 | Lightning-fast build tool and dev server |
| **ESLint** | 8.55.0 | Code linting and formatting |
| **TypeScript** | 18.2.43 | Type-safe JavaScript development |

### Backend Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **Node.js** | 16+ | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Minimalist web framework |
| **Prisma** | 6.13.0 | Next-generation ORM and database toolkit |
| **SQLite** | Latest | Embedded database for development |
| **PostgreSQL** | Latest | Advanced relational database |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server during development |
| **CORS** | Cross-origin resource sharing middleware |
| **Vite** | Fast refresh and optimized builds |

## 📁 Project Structure

```
pwd2-1/
├── 📁 app/                 # Main application project
├── 📁 dev/                 # Development utilities and tools
├── 📁 hello-context/       # React Context API demonstration
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── 📁 hello-react/         # Basic React + Vite setup
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── 📁 mobile/              # Mobile-responsive application
│   ├── src/
│   ├── public/
│   └── package.json
├── 📁 movie/               # Movie database application
│   ├── src/
│   ├── public/
│   └── package.json
├── 📁 social/              # Social media platform frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── 📁 social-api/          # Social media backend API
│   ├── prisma/
│   ├── routes/
│   └── package.json
├── 📁 todo/                # Todo list application frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── 📁 todo-api/            # Todo list backend API
    ├── prisma/
    ├── crud/
    └── package.json
```

## 🎯 Individual Projects

### Frontend Applications

#### `hello-react/` - React Fundamentals

**Overview**: A minimal React application demonstrating core React concepts with modern tooling.

**🔧 Tech Stack**:
- React 18.2.0
- Vite 5.0.8
- ESLint 8.55.0

**✨ Features**:
- ⚡ Fast Refresh development
- 🎯 ESLint code quality
- 📦 Optimized builds
- 🧩 Component-based architecture

**🚀 Quick Start**:
```bash
cd hello-react
npm run dev
```

---

#### `hello-context/` - State Management

**Overview**: Demonstrates advanced React patterns including Context API for global state management.

**🔧 Tech Stack**:
- React 18.2.0
- Context API
- Vite 5.0.8

**✨ Features**:
- 🌍 Global state management
- 🔄 Context providers
- 📊 State persistence
- 🎯 Type-safe state updates

**🚀 Quick Start**:
```bash
cd hello-context
npm run dev
```

---

#### `todo/` - Task Management

**Overview**: Interactive todo list application with full CRUD operations and local state management.

**🔧 Tech Stack**:
- React 18.2.0
- Vite 5.0.8
- Local State Management

**✨ Features**:
- ✅ Add, edit, delete todos
- 🔄 Real-time updates
- 💾 Local storage persistence
- 📱 Responsive design
- 🎨 Clean UI/UX

**🚀 Quick Start**:
```bash
cd todo
npm run dev
```

---

#### `social/` - Social Platform

**Overview**: Modern social media platform frontend with user interactions and real-time features.

**🔧 Tech Stack**:
- React 18.2.0
- Vite 5.0.8
- Component Architecture
- Responsive CSS

**✨ Features**:
- 👥 User profiles
- 📝 Post creation and sharing
- 💬 Interactive comments
- 🔍 Content discovery
- 📱 Mobile-optimized
- 🎨 Modern UI design

**🚀 Quick Start**:
```bash
cd social
npm run dev
```

---

#### `movie/` - Entertainment Database

**Overview**: Movie database application with search, filtering, and detailed movie information.

**🔧 Tech Stack**:
- React 18.2.0
- Vite 5.0.8
- API Integration
- Responsive Design

**✨ Features**:
- 🔍 Advanced search
- 🎬 Movie details and ratings
- 📺 Cast and crew information
- ⭐ Favorites system
- 📱 Responsive layout
- 🎨 Beautiful UI

**🚀 Quick Start**:
```bash
cd movie
npm run dev
```

---

#### `mobile/` - Mobile-First Design

**Overview**: Mobile-responsive web application showcasing adaptive design patterns.

**🔧 Tech Stack**:
- React 18.2.0
- Vite 5.0.8
- CSS Media Queries
- Responsive Design

**✨ Features**:
- 📱 Mobile-first approach
- 💻 Tablet optimization
- 🖥️ Desktop enhancement
- 🎨 Adaptive layouts
- ⚡ Touch-friendly interactions

**🚀 Quick Start**:
```bash
cd mobile
npm run dev
```

### Backend APIs

#### `todo-api/` - Task Management API

**Overview**: RESTful API providing backend services for todo applications with data persistence.

**🔧 Tech Stack**:
- Node.js
- Express.js 5.1.0
- Prisma 6.13.0
- SQLite

**🚀 Features**:
- 🔄 RESTful CRUD operations
- 💾 SQLite database
- 🛡️ Input validation
- 📊 Data relationships
- 🔍 Advanced querying

**📡 API Endpoints**:
- `GET /todos` - Retrieve all todos
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

**🚀 Quick Start**:
```bash
cd todo-api
npm install
npm start
```

---

#### `social-api/` - Social Platform API

**Overview**: Comprehensive backend API for social media platform with user management and content handling.

**🔧 Tech Stack**:
- Node.js
- Express.js 5.1.0
- Prisma 6.13.0
- PostgreSQL/SQLite

**🚀 Features**:
- 👤 User authentication
- 📝 Content management
- 💬 Comment system
- 🔗 Relationship handling
- 📊 Analytics ready
- 🛡️ Security best practices

**📡 API Endpoints**:
- `GET /users` - User management
- `POST /posts` - Content creation
- `GET /feed` - Activity feed
- `POST /comments` - Comment system

**🚀 Quick Start**:
```bash
cd social-api
npm install
npm start
```

### Utility Projects

#### `app/` & `dev/` - Development Tools

**Overview**: Shared utilities, configuration files, and development tools for the entire workspace.

**🔧 Includes**:
- 🔧 Build scripts
- ⚙️ Configuration files
- 🛠️ Development utilities
- 📚 Shared resources
- 🧪 Testing setup

## 🚀 Getting Started

### Prerequisites

Before running these projects, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) or **yarn** - Comes with Node.js
- **Git** - For version control
- **SQLite** (for API projects) - [Download](https://sqlite.org/)
- **PostgreSQL** (optional, for production APIs) - [Download](https://postgresql.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pwd-workspace.git
   cd pwd-workspace
   ```

2. **Install dependencies for all projects**
   ```bash
   # Frontend applications
   cd hello-react && npm install && cd ..
   cd hello-context && npm install && cd ..
   cd todo && npm install && cd ..
   cd social && npm install && cd ..
   cd movie && npm install && cd ..
   cd mobile && npm install && cd ..

   # Backend APIs
   cd todo-api && npm install && cd ..
   cd social-api && npm install && cd ..
   ```

3. **Set up databases (for API projects)**
   ```bash
   cd todo-api
   npx prisma generate
   npx prisma migrate dev
   cd ..

   cd social-api
   npx prisma generate
   npx prisma migrate dev
   cd ..
   ```

### Running Projects

#### Development Mode

**Frontend Applications**:
```bash
# Terminal 1 - Hello React
cd hello-react && npm run dev

# Terminal 2 - Todo App
cd todo && npm run dev

# Terminal 3 - Social Platform
cd social && npm run dev
```

**Backend APIs**:
```bash
# Terminal 1 - Todo API
cd todo-api && npm start

# Terminal 2 - Social API
cd social-api && npm start
```

#### Production Mode

**Build frontend applications**:
```bash
cd hello-react && npm run build && cd ..
cd todo && npm run build && cd ..
cd social && npm run build && cd ..
```

## 📚 API Documentation

### Base URLs
- **Todo API**: `http://localhost:3001`
- **Social API**: `http://localhost:3002`

### Authentication

Most API endpoints require authentication. Include the following header:
```
Authorization: Bearer <your-token>
```

### Common Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

## 🔧 Development

### Code Quality

#### Linting
```bash
# Run linting for specific projects
cd hello-react && npm run lint && cd ..
cd todo && npm run lint && cd ..
cd social && npm run lint && cd ..
```

#### Type Checking
```bash
# For TypeScript projects (if applicable)
cd your-project && npx tsc --noEmit && cd ..
```

### Database Management

#### Prisma Commands
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# View database
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

### Environment Variables

Create `.env` files in API projects:

**`.env.example`**:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# JWT
JWT_SECRET="your-secret-key"

# Server
PORT=3001
NODE_ENV="development"
```

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   ```bash
   cd your-frontend-project
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Or deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Backend Deployment (Railway/Render)

1. **Set environment variables**
   ```bash
   railway login
   railway link
   railway variables set DATABASE_URL=<your-db-url>
   railway variables set JWT_SECRET=<your-secret>
   ```

2. **Deploy**
   ```bash
   railway up
   ```

## 📊 Project Status

| Project | Status | Database | Documentation | Testing |
|---------|--------|----------|---------------|---------|
| hello-react | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| hello-context | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| todo | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| social | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| movie | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| mobile | ✅ Complete | ❌ N/A | ✅ Basic | ❌ None |
| todo-api | ✅ Complete | ✅ SQLite | ✅ API | ❌ None |
| social-api | ✅ Complete | ✅ PostgreSQL | ✅ API | ❌ None |

**Legend**:
- ✅ Complete - Fully functional
- 🔄 In Development - Active development
- ❌ N/A - Not applicable

## 🤝 Contributing

We welcome contributions to this workspace! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Update README for new features
- Test your changes thoroughly
- Follow existing code style

### Project Structure Guidelines
- Keep projects self-contained
- Use consistent naming conventions
- Document API changes
- Update dependencies regularly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 PWD Workspace

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

**Project Maintainer**: [Khun Kyaw Hla]

- 📧 Email: bwarpay.bp8@gmail.com
- 💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [your-username](https://github.com/kyawhla-commit)
- 🌐 Portfolio: [your-portfolio-website.com](https://your-portfolio-website.com)

For questions, suggestions, or collaboration opportunities, please don't hesitate to reach out!

## 📈 Changelog

### [Unreleased]

### [1.0.0] - 2024-12-01

#### Added
- Initial release of PWD Workspace
- All frontend applications (React 18 + Vite)
- Backend APIs (Node.js + Express + Prisma)
- Comprehensive documentation
- Development and deployment guides

#### Changed
- Updated to React 18.2.0
- Upgraded to Vite 5.0.8
- Enhanced project structure
- Improved code quality standards

#### Fixed
- Database connection issues
- Build optimization problems
- Documentation inconsistencies

---

<div align="center">

**Built with ❤️ using modern web technologies**

*Show your support by starring this repository!*

</div>
