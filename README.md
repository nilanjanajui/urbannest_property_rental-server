# UrbanNest - REST API Server

> A secure, scalable, and production-ready REST API built with **Express.js**, **MongoDB**, **Better Auth**, and **Stripe**. It powers the UrbanNest property rental platform by providing authentication, property management, booking workflows, payment processing, and analytics services.

<p align="center">
  <img src="https://img.shields.io/badge/Express.js-5-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Better%20Auth-Authentication-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-Authorization-black?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" />
</p>

---

## Live Services

| Service            | URL                                                              |
| ------------------ | ---------------------------------------------------------------- |
| API Server         | https://urbannest-property-rental-server.onrender.com            |
| Health Check       | https://urbannest-property-rental-server.onrender.com/api/health |
| Client Application | https://urbannest-property-rental-client.vercel.app              |

---

## Overview

UrbanNest REST API serves as the backend of the UrbanNest rental marketplace. It provides secure authentication, role-based authorization, property management, booking operations, payment processing through Stripe, and analytical data for property owners.

The application follows a modular architecture with Express.js and MongoDB, making it scalable, maintainable, and easy to extend.

---

# Technology Stack

<p align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,git,github,vscode&theme=dark"/>
</p>

| Category       | Technologies      |
| -------------- | ----------------- |
| Runtime        | Node.js           |
| Framework      | Express.js 5      |
| Database       | MongoDB, Mongoose |
| Authentication | Better Auth, JWT  |
| Payments       | Stripe            |
| Security       | Helmet, CORS      |
| Logging        | Morgan            |
| Environment    | Dotenv            |

---

# Core Features

## Authentication & Authorization

* Email and password authentication
* Google OAuth integration
* JWT-based API authentication
* Role-based access control
* Secure session management with Better Auth
* Signed cookies for cross-domain authentication
* Protected endpoints for Tenant, Owner, and Admin roles

---

## Property Management

* Complete CRUD operations
* Property approval workflow
* Server-side searching
* Filtering by location, property type, and price
* Pagination and sorting
* Featured property endpoint
* Owner-specific property management

---

## Booking Management

* Booking request creation
* Booking approval and rejection workflow
* Booking status management
* Payment status tracking
* Separate booking endpoints for each user role

---

## Payment Processing

* Stripe Payment Intent integration
* Server-side payment verification
* Secure transaction recording
* Transaction history management
* Payment validation before database updates

---

## Analytics

* MongoDB aggregation pipelines
* Monthly earnings reports
* Owner dashboard statistics
* Revenue insights
* Booking analytics

---

## Reviews & Favorites

* Review management
* Latest review endpoint
* Favorite property management
* Duplicate favorite prevention using compound indexes

---

# API Overview

## Public Endpoints

```http
GET    /api/health
GET    /api/properties
GET    /api/properties/featured
GET    /api/reviews/home
```

---

## Protected Endpoints

```http
GET    /api/token
GET    /api/properties/:id
POST   /api/bookings
POST   /api/reviews
GET    /api/favorites/check
```

---

## Tenant Routes

```http
GET     /api/bookings/tenant
GET     /api/favorites/mine
POST    /api/favorites
DELETE  /api/favorites/:id
POST    /api/payments/create-intent
POST    /api/payments/confirm
```

---

## Owner Routes

```http
GET     /api/properties/owner/mine
POST    /api/properties
PATCH   /api/properties/:id
DELETE  /api/properties/:id
GET     /api/bookings/owner
PATCH   /api/bookings/:id/status
GET     /api/analytics/owner
```

---

## Admin Routes

```http
GET     /api/properties/admin/all
PATCH   /api/properties/:id/status
GET     /api/bookings/admin
GET     /api/users
PATCH   /api/users/:id/role
GET     /api/transactions
```

---

# Project Structure

```text
src/
├── controllers/        # Business logic
├── middlewares/        # Authentication & authorization
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── lib/
│   └── auth.js         # Better Auth configuration
├── utils/
│   └── db.js           # Database connection
└── index.js            # Application entry point
```

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/nilanjanajui/urbannest_property_rental-server.git

cd urbannest_property_rental-server
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env` file in the project root.

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

## Start the development server

```bash
node src/index.js
```

The server will be available at:

```text
http://localhost:5000
```

---

# Project Highlights

* Express.js 5 REST API architecture
* MongoDB with Mongoose ODM
* Better Auth authentication system
* JWT-secured protected endpoints
* Role-based authorization
* Stripe payment processing
* MongoDB aggregation pipelines
* Secure middleware with Helmet and CORS
* Modular controller-based architecture
* Production deployment on Render

---

# Related Projects

| Repository | Link                                                             |
| ---------- | ---------------------------------------------------------------- |
| Client     | https://github.com/nilanjanajui/urbannest_property_rental-client |
| Server     | https://github.com/nilanjanajui/urbannest_property_rental-server |
| Live API   | https://urbannest-property-rental-server.onrender.com            |

---

# License

This project was developed for educational and portfolio purposes.

---

<p align="center">
Built with Node.js, Express.js, MongoDB, Better Auth, JWT, and Stripe.
</p>
