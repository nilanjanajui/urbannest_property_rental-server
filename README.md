# UrbanNest - REST API Server

> A secure and scalable Express.js backend powering the UrbanNest property rental platform. It handles authentication, property management, bookings, payments, and analytics.

---

## Live Demo

| Service            | URL                                                              |
| ------------------ | ---------------------------------------------------------------- |
| API Server         | https://urbannest-property-rental-server.onrender.com            |
| Health Check       | https://urbannest-property-rental-server.onrender.com/api/health |
| Client Application | https://urbannest-property-rental-client.vercel.app              |

---

## Overview

UrbanNest is the REST API backend for the UrbanNest property rental marketplace. It manages the application's business logic, including authentication, role-based access control, property management, booking workflows, Stripe payment processing, and owner analytics using MongoDB aggregation pipelines.

---

## Features

### Authentication & Security

* Better Auth with email/password authentication and Google OAuth
* JWT-based API authentication using Bearer tokens
* Role-based authorization for Tenant, Owner, and Admin users
* Secure signed cookies with `SameSite=None` for cross-domain OAuth support
* MongoDB-backed session management using the native MongoDB driver

### Property Management

* Complete CRUD operations with owner and admin authorization
* Server-side location search using MongoDB regular expressions
* Property type and price range filtering
* Server-side sorting and pagination
* Featured properties endpoint for approved listings
* Admin approval and rejection workflow with feedback support

### Booking System

* Booking lifecycle management (Pending → Approved / Rejected)
* Payment status tracking (Unpaid → Paid)
* Dedicated endpoints for Tenant, Owner, and Admin dashboards
* Owners can approve or reject booking requests

### Stripe Payment Integration

* Payment Intent creation with booking validation
* Server-side payment verification before recording transactions
* Transactions are stored only after successful Stripe confirmation
* Complete transaction history for administrators

### Analytics

* MongoDB aggregation pipelines for owner analytics
* Monthly earnings data for the previous twelve months
* Dashboard statistics including:

  * Total Earnings
  * Total Properties
  * Total Bookings

### Reviews & Favorites

* Compound unique index prevents duplicate favorites
* Public endpoint for the latest property reviews
* Favorite status endpoint for real-time UI updates

---

## Technology Stack

| Package        | Version | Purpose                         |
| -------------- | ------- | ------------------------------- |
| `express`      | ^5      | Web framework                   |
| `mongoose`     | ^8      | MongoDB ODM                     |
| `better-auth`  | ^1.6    | Authentication                  |
| `mongodb`      | ^6      | Native MongoDB driver           |
| `jsonwebtoken` | ^9      | JWT authentication              |
| `stripe`       | ^17     | Payment processing              |
| `cors`         | ^2      | Cross-origin resource sharing   |
| `dotenv`       | ^16     | Environment variable management |
| `helmet`       | ^8      | HTTP security headers           |
| `morgan`       | ^1      | HTTP request logging            |

---

## API Endpoints

### Public

```http
GET    /api/health
GET    /api/properties
GET    /api/properties/featured
GET    /api/reviews/home
```

### Protected (Authentication Required)

```http
GET    /api/token
GET    /api/properties/:id
POST   /api/bookings
POST   /api/reviews
GET    /api/favorites/check
```

### Tenant Routes

```http
GET     /api/bookings/tenant
GET     /api/favorites/mine
POST    /api/favorites
DELETE  /api/favorites/:id
POST    /api/payments/create-intent
POST    /api/payments/confirm
```

### Owner Routes

```http
GET     /api/properties/owner/mine
POST    /api/properties
PATCH   /api/properties/:id
DELETE  /api/properties/:id
GET     /api/bookings/owner
PATCH   /api/bookings/:id/status
GET     /api/analytics/owner
```

### Admin Routes

```http
GET     /api/properties/admin/all
PATCH   /api/properties/:id/status
GET     /api/bookings/admin
GET     /api/users
PATCH   /api/users/:id/role
GET     /api/transactions
```

---

## Project Structure

```text
src/
├── controllers/      # Business logic
├── middlewares/      # Authentication and authorization
├── models/           # Mongoose models
├── routes/           # API routes
├── lib/
│   └── auth.js       # Better Auth configuration
├── utils/
│   └── db.js         # MongoDB connection
└── index.js          # Application entry point
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/urbannest_property_rental-server.git

# Navigate to the project
cd urbannest_property_rental-server

# Install dependencies
npm install

# Configure environment variables
cp .env

# Start the development server
node src/index.js
```

The server will be available at **http://localhost:5000**.

---

## Environment Variables

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urbannest-admin
PORT=5000
CLIENT_URL=https://your-client.vercel.app

BETTER_AUTH_SECRET=your_32_character_secret
BETTER_AUTH_URL=https://your-server.onrender.com

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=sk_test_your_key

JWT_SECRET=your_secure_jwt_secret
```

---

## Related Repositories

* **Client Repository:** https://github.com/nilanjanajui/urbannest_property_rental-client


---

## License

This project is intended for educational and portfolio purposes.

---

<p align="center">
Built with Express.js, MongoDB, Better Auth, and Stripe.
</p>
