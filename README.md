# 📱 WhatsApp Multi-Tenant API

This is a scalable, multi-tenant backend system for managing WhatsApp communication using WAHA (WhatsApp API gateway). Built with Node.js, Express, Sequelize, and Docker.

---

## 🚀 Features

- Multi-tenant support (one DB schema per tenant)
- WhatsApp messaging and group management via WAHA
- JWT authentication and role-based permissions
- Dockerized environment
- Swagger API docs
- Sequelize ORM
- TypeScript support

---

## 🛠 Prerequisites

Install the following:

- [Node.js v17+](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- WAHA (hosted or local instance)

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/kunaal369/whatsapp-multi-tenant.git
cd whatsapp-multi-tenant

2. Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with correct DB, JWT, and WAHA credentials

3. Start services with Docker
docker-compose up --build

🏗 Architecture & Design
Backend: Node.js + Express + TypeScript

ORM: Sequelize with models for users, messages, groups, sessions, etc.

Authentication: JWT with role-based middleware

Multi-tenancy: Per-tenant data separation using Sequelize models

WAHA Integration: Uses WAHA config and APIs to handle WhatsApp messaging

🔐 Security & Scalability
JWT tokens for authentication
Permissions middleware for role-based access control
CORS, Helmet, and logging middleware can be easily added
Scalable via Docker + container orchestration

📑 API Documentation
Swagger available at:
http://localhost:8000/api-docs

Backend available at:
http://localhost:8000

WAHA api's available at:
http://localhost:3000
