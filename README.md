# 🚀 Scalable URL Shortener with Analytics

A distributed URL shortening platform built using **React, Fastify, MongoDB, Redis, Docker, Nginx, JWT Authentication, and ZooKeeper**.

The system provides secure URL shortening, distributed token generation, visitor analytics, caching, authentication, and load-balanced backend services.

---

# ✨ Features

* 🔗 URL Shortening
* 🔐 JWT Authentication
* 👤 User Registration & Login
* 📊 Analytics Dashboard
* 👥 Unique Visitor Tracking
* 🌐 Browser Detection
* 📱 Device Detection
* 📈 Click Tracking
* 🌍 Visitor Location Tracking
* ⚡ Redis Caching
* 🐳 Dockerized Deployment
* ⚖️ Nginx Load Balancing
* 🦓 ZooKeeper Token Generation

---

# 🏗️ URL Shortening Strategy

Unlike traditional URL shorteners that use Base62 encoding of database IDs, this project uses **ZooKeeper-based distributed token generation**.

### Token Characteristics

* Character Set: `A-Z`, `a-z`, `0-9`
* Token Length: `6 Characters`
* Total Possible Combinations:

```text
62^6 = 56,800,235,584
≈ 56.8 Billion URLs
```

### Example

Original URL

```text
https://leetcode.com/problems/two-sum
```

Generated Token

```text
tyDLAj
```

Short URL

```text
http://localhost/tyDLAj
```

### Advantages

* ✅ Collision Free
* ✅ No Sequential IDs
* ✅ Distributed System Friendly
* ✅ Horizontally Scalable
* ✅ Difficult to Predict URLs

---

# 🏛️ System Architecture

```text
                    Client Browser
                           │
                           ▼
                 Nginx Reverse Proxy
                           │
                    Load Balancer
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼

      Server-1         Server-2         Server-3
      (Fastify)        (Fastify)        (Fastify)

          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼

                       Redis Cache
                           │
                           ▼

                        MongoDB
                           │
                           ▼

                       ZooKeeper
```

---

# 🔄 URL Creation Flow

```text
User
 ↓
Submit URL
 ↓
Validate URL
 ↓
Check Existing URL
 ↓
Generate Unique Token
(ZooKeeper)
 ↓
Store URL Mapping
(MongoDB)
 ↓
Store Cache Entry
(Redis)
 ↓
Return Short URL
```

---

# 🚦 URL Redirection Flow

```text
User Opens Short URL
          ↓
         Nginx
          ↓
     Fastify Server
          ↓
      Redis Check
          ↓
   Hit           Miss
    ↓              ↓
Return URL     MongoDB
                  ↓
             Cache Result
                  ↓
          Save Analytics
                  ↓
              Redirect
```

---

# 📊 Analytics Dashboard

The platform tracks detailed visitor information for every shortened URL.

### Visitor Information

* 🌍 Country
* 🗺️ State / Region
* 🏙️ City
* 🌐 Browser
* 📱 Device Type
* 📍 IP Address
* 🕒 Timestamp

### Dashboard Metrics

* 👥 Total Visitors
* 🎯 Unique Visitors
* 🌐 Unique Browsers
* 📱 Unique Devices
* 📈 Click Count

---

# 🔐 Authentication Flow

### Registration

```text
User
 ↓
Register
 ↓
Hash Password
(bcrypt)
 ↓
MongoDB
```

### Login

```text
User
 ↓
Login
 ↓
Verify Password
 ↓
Generate JWT
 ↓
Return Token
 ↓
Store in Browser
```

---

# ⚡ Redis Caching Strategy

Redis stores frequently accessed URL mappings.

### Benefits

* Faster URL lookups
* Reduced MongoDB load
* Improved response times
* Better scalability

### Cache Flow

```text
Request
 ↓
Redis Lookup
 ↓
Hit → Return URL

Miss
 ↓
MongoDB
 ↓
Store in Redis
 ↓
Return URL
```

---

# ⚖️ Load Balancing

Nginx distributes incoming traffic among multiple Fastify backend instances using **Round Robin Load Balancing**.

Example:

```text
Request 1 → Server-1
Request 2 → Server-2
Request 3 → Server-3
Request 4 → Server-1
```

### Benefits

* Improved Throughput
* Better Reliability
* Horizontal Scalability
* Reduced Server Overload

---

# 🦓 ZooKeeper Integration

ZooKeeper is used for distributed coordination and unique token generation.

When multiple backend instances generate URLs simultaneously:

```text
Server-1 → tyDLAj
Server-2 → tyDLAj
```

ZooKeeper guarantees:

```text
Only one token reservation succeeds.
The other server generates a new token.
```

This prevents collisions across multiple servers.

---

# 🚦 Planned Rate Limiting Strategy

To protect the system from abuse and excessive resource consumption, Redis-based distributed rate limiting is planned.

| Endpoint                | Limit                      |
| ----------------------- | -------------------------- |
| POST /api/urls          | 10 requests/minute per IP  |
| GET /:shortUrl          | 100 requests/minute per IP |
| POST /api/auth/login    | 5 requests/minute per IP   |
| POST /api/auth/register | 3 requests/minute per IP   |

### Benefits

* 🛡️ Prevents Abuse
* 🔐 Protects Authentication Endpoints
* 📈 Improves Stability
* ⚡ Reduces Unnecessary Load
* 🌐 Works Across Multiple Backend Instances

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Material UI
* Redux Toolkit Query
* React Router

## Backend

* Node.js
* Fastify
* TypeScript

## Database

* MongoDB
* Mongoose

## Cache

* Redis
* ioredis

## Authentication

* JWT
* bcrypt

## Infrastructure

* Docker
* Docker Compose
* Nginx
* ZooKeeper

## Analytics

* geoip-lite
* ua-parser-js

---

# 🚀 Run Locally

Clone Repository

```bash
git clone <repository-url>
cd url-shortener
```

Start Services

```bash
docker compose up --build
```

Application URLs

```text
Frontend: http://localhost
Backend : http://localhost/api
```

---

# 📈 Scalability Highlights

* Multiple Fastify Backend Instances
* Redis Distributed Cache
* Nginx Load Balancing
* ZooKeeper Coordination
* MongoDB Persistent Storage
* Dockerized Infrastructure

The architecture is designed to scale horizontally by adding additional backend instances behind Nginx.

---

# 🔮 Future Improvements

* 📱 QR Code Generation
* ✏️ Custom Short URLs
* 📊 Analytics Charts
* ☁️ Cloud Deployment
* 📧 Email Verification
* 🔑 Password Reset
* 🌎 Country-wise Traffic Reports
* 🛡️ Cloudflare Integration
* ⏳ Custom URL Expiration Policies
