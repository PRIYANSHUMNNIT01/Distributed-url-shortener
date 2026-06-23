# 🚀 Scalable Distributed URL Shortener

A production-oriented distributed URL shortening platform built using **React, Fastify, MongoDB, Redis, Docker, Nginx, JWT Authentication, ZooKeeper, and Rate Limiting**.

The platform provides secure URL shortening, distributed token generation, analytics tracking, caching, authentication, load balancing, and protection against API abuse.

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
* 🚦 API Rate Limiting
* 🐳 Dockerized Deployment
* ⚖️ Nginx Load Balancing
* 🦓 ZooKeeper-Based Token Generation

---

# 🏗️ System Architecture

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

# 🔗 URL Shortening Strategy

Unlike traditional URL shorteners that rely on Base62 encoding of database IDs, this system uses ZooKeeper-assisted distributed token generation.

### Token Characteristics

* Character Set: `A-Z`, `a-z`, `0-9`
* Token Length: `6 Characters`

### Total Possible URLs

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

### Benefits

* ✅ Collision Resistant
* ✅ No Sequential IDs
* ✅ Horizontally Scalable
* ✅ Distributed-System Friendly
* ✅ Difficult to Predict

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
Generate Distributed Token
(ZooKeeper)
 ↓
Store URL Mapping
(MongoDB)
 ↓
Cache URL Mapping
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

The platform collects analytics for every shortened URL.

### Visitor Information

* 🌍 Country
* 🗺️ Region / State
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
* 📈 Total Clicks

---

# 🔐 Authentication

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

# ⚡ Redis Caching

Redis stores frequently accessed URL mappings.

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

### Benefits

* Faster URL Resolution
* Reduced Database Load
* Lower Response Latency
* Improved Scalability

---

# 🚦 Rate Limiting

API rate limiting is implemented using **Fastify Rate Limit** to protect backend services from abuse and excessive traffic.

### Current Limits

| Endpoint                | Limit                      |
| ----------------------- | -------------------------- |
| POST /api/urls          | 20 requests/minute per IP  |
| All Other API Endpoints | 100 requests/minute per IP |

### Example

```text
POST /api/urls

Allowed:
20 requests/minute/IP

Exceeded:
HTTP 429 Too Many Requests
```

### Benefits

* 🛡️ Prevents Abuse
* 🔐 Protects Backend Resources
* ⚡ Reduces Unnecessary Load
* 📈 Improves Stability
* 🌐 Supports Scalable Systems

---

# ⚖️ Load Balancing

Nginx distributes incoming requests across multiple Fastify backend instances using Round Robin Load Balancing.

### Example

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

# 🦓 ZooKeeper Coordination

ZooKeeper is used to coordinate distributed token generation.

Example:

```text
Server-1 → tyDLAj
Server-2 → tyDLAj
```

ZooKeeper ensures:

```text
Only one token reservation succeeds.
The other server generates a new token.
```

This prevents token collisions across backend instances.

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
git clone https://github.com/PRIYANSHUMNNIT01/Distributed-url-shortener.git
cd Distributed-url-shortener
```

Start Services

```bash
docker compose up --build
```

Application URLs

```text
Frontend : http://localhost
Backend  : http://localhost/api
```

---

# 📈 Scalability Highlights

* Multiple Fastify Backend Instances
* Nginx Load Balancer
* Redis Caching Layer
* ZooKeeper Distributed Coordination
* MongoDB Persistent Storage
* API Rate Limiting
* Dockerized Infrastructure

The system is designed to scale horizontally by adding additional Fastify instances behind Nginx.

---

# 🔮 Future Improvements

* 📱 QR Code Generation
* ✏️ Custom Short URLs
* 📊 Interactive Analytics Charts
* ☁️ Cloud Deployment (AWS/GCP)
* 📧 Email Verification
* 🔑 Password Reset
* 🌎 Country-Wise Traffic Reports
* 🛡️ Cloudflare Integration
* ⏳ Custom Expiration Policies
* 🚦 Redis-Based Distributed Rate Limiting
* 📈 Prometheus & Grafana Monitoring
