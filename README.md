<div align="center">

# ⚙️ UrbanNest API
### Secure, Scalable REST API for the UrbanNest Rental Marketplace

**Production-grade backend powering authentication, property management, booking workflows,
Stripe payments, and owner analytics — built on Express.js and MongoDB.**

[![Live API](https://img.shields.io/badge/🚀_Live_API-Render-46E3B7?style=for-the-badge)](https://urbannest-property-rental-server.onrender.com)
[![Health Check](https://img.shields.io/badge/💚_Health_Check-Status-22C55E?style=for-the-badge)](https://urbannest-property-rental-server.onrender.com/api/health)
[![Client Repo](https://img.shields.io/badge/🖥️_Client_Repo-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/nilanjanajui/urbannest_property_rental-client)

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=auth0&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Secured-black?style=for-the-badge&logo=jsonwebtokens)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Render](https://img.shields.io/badge/Deployed_on_Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</div>

---

## 💡 Why This API?

This isn't a single-resource CRUD demo — it's the backend for a **three-role marketplace** (Tenant, Owner, Admin), handling real payment flows, aggregation-based analytics, and role-scoped authorization across dozens of endpoints. It's built the way a production rental platform's API actually needs to work.

**At a glance:**

| | |
|---|---|
| 🔐 **Auth** | Better Auth + JWT, Google OAuth, signed cross-domain cookies |
| 🏘️ **Properties** | Full CRUD, approval workflow, server-side search/filter/pagination |
| 📅 **Bookings** | Role-scoped request → approval → status tracking |
| 💳 **Payments** | Stripe Payment Intents with server-side verification |
| 📊 **Analytics** | MongoDB aggregation pipelines for revenue & booking insights |
| 🛡️ **Security** | Helmet, CORS, role-based access control on every protected route |

---

## 🖥️ Tech Stack

<div align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,git,github,vscode&theme=dark" />
</div>

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js 5 |
| **Database** | MongoDB + Mongoose ODM |
| **Auth** | Better Auth, JWT, Google OAuth |
| **Payments** | Stripe (Payment Intents API) |
| **Security** | Helmet, CORS |
| **Logging** | Morgan |
| **Config** | Dotenv |

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- Email/password + Google OAuth via Better Auth
- JWT-secured endpoints with signed, cross-domain cookies
- Role-based access control across Tenant, Owner, and Admin routes

### 🏘️ Property Management
- Full CRUD with an owner-submitted → admin-approved workflow
- Server-side search, filtering (location, type, price), pagination & sorting
- Dedicated featured-listings endpoint

### 📅 Booking Management
- Request → approve/reject → status-tracked lifecycle
- Payment status synced to booking records
- Role-specific booking endpoints (tenant / owner / admin)

### 💳 Payment Processing
- Stripe Payment Intent creation and confirmation
- Server-side verification before any DB write — no client-trusted payment states
- Full transaction history logging

### 📊 Analytics
- MongoDB aggregation pipelines for monthly earnings & booking trends
- Owner-facing revenue dashboards
- Platform-wide transaction reporting for admins

### ⭐ Reviews & Favorites
- Review CRUD with a "latest reviews" public endpoint
- Favorites system with **compound indexes** to prevent duplicates at the database level

---

## 📡 API Reference

<details>
<summary><strong>🌍 Public Endpoints</strong></summary>

```http
GET    /api/health
GET    /api/properties
GET    /api/properties/featured
GET    /api/reviews/home
```
</details>

<details>
<summary><strong>🔒 Protected Endpoints</strong></summary>

```http
GET    /api/token
GET    /api/properties/:id
POST   /api/bookings
POST   /api/reviews
GET    /api/favorites/check
```
</details>

<details>
<summary><strong>🏠 Tenant Routes</strong></summary>

```http
GET     /api/bookings/tenant
GET     /api/favorites/mine
POST    /api/favorites
DELETE  /api/favorites/:id
POST    /api/payments/create-intent
POST    /api/payments/confirm
```
</details>

<details>
<summary><strong>🏘️ Owner Routes</strong></summary>

```http
GET     /api/properties/owner/mine
POST    /api/properties
PATCH   /api/properties/:id
DELETE  /api/properties/:id
GET     /api/bookings/owner
PATCH   /api/bookings/:id/status
GET     /api/analytics/owner
```
</details>

<details>
<summary><strong>🛡️ Admin Routes</strong></summary>

```http
GET     /api/properties/admin/all
PATCH   /api/properties/:id/status
GET     /api/bookings/admin
GET     /api/users
PATCH   /api/users/:id/role
GET     /api/transactions
```
</details>

---

## 🗂️ Project Structure

```text
src/
├── controllers/        # Business logic
├── middlewares/         # Authentication & authorization
├── models/               # Mongoose schemas
├── routes/               # API route definitions
├── lib/
│   └── auth.js           # Better Auth configuration
├── utils/
│   └── db.js              # Database connection
└── index.js               # Application entry point
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/urbannest_property_rental-server.git
cd urbannest_property_rental-server

# Install dependencies
npm install
```

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/urbannest
PORT=5000
CLIENT_URL=https://your-client.vercel.app

BETTER_AUTH_SECRET=your_32_character_secret
BETTER_AUTH_URL=https://your-server.onrender.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=sk_test_your_key
JWT_SECRET=your_secure_jwt_secret
```

```bash
# Start the server
node src/index.js
```

Server runs at **http://localhost:5000**

---

## 🏆 Project Highlights

- ⚡ **Express.js 5** modular, controller-based REST architecture
- 🔒 **Better Auth + JWT** authentication with role-based access control
- 💳 **Real Stripe integration** with server-side payment verification (not client-trusted)
- 📊 **MongoDB aggregation pipelines** for real analytics, not hardcoded numbers
- 🛡️ **Hardened with Helmet & CORS**, signed cross-domain cookies
- 🧩 **Compound indexes** to enforce data integrity (e.g., no duplicate favorites)
- ☁️ **Live production deployment** on Render

---

## 🔗 Related Repositories

| Repository | Link |
|---|---|
| ⚙️ Server (this repo) | You're here |
| 🖥️ Client | [urbannest_property_rental-client](https://github.com/nilanjanajui/urbannest_property_rental-client) |
| 🌐 Live API | [urbannest-property-rental-server.onrender.com](https://urbannest-property-rental-server.onrender.com) |

---

## 📄 License

This project was developed for educational and portfolio purposes under the **MIT License**.

<div align="center">

**Built with Node.js, Express.js, MongoDB, Better Auth, JWT & Stripe**

</div>
