#  Scalable URL Shortener

A distributed URL shortening platform built with React, Fastify, MongoDB, Redis, Docker, Nginx, JWT Authentication, and ZooKeeper.

## ✨ Features

- 🔗 URL Shortening
- 🔐 User Authentication (JWT)
- 📊 Analytics Dashboard
- 👥 Unique Visitor Tracking
- 🌐 Browser Detection
- 📱 Device Detection
- 📈 Click Tracking
- ⚡ Redis Caching
- 🐳 Dockerized Deployment
- ⚖️ Nginx Load Balancing
- 🦓 ZooKeeper Token Generation

---

## 🏗️ URL Shortening Strategy

This project uses **ZooKeeper-based distributed token generation** instead of Base62 encoding.

Example:

Original URL:
```
https://leetcode.com/problems/two-sum
```

Generated Token:
```
tyDLAj
```

Short URL:
```
http://localhost/tyDLAj
```

### Advantages

- ✅ Collision Free
- ✅ Distributed System Friendly
- ✅ No Sequential IDs
- ✅ Scalable Across Multiple Servers

---

## 🏛️ System Architecture

```text
Client Browser
       │
       ▼
Nginx Reverse Proxy
       │
       ▼
Load Balancer
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
Server Server Server
  1      2      3
       │
       ▼
     Redis
       │
       ▼
    MongoDB
       │
       ▼
   ZooKeeper
```

---

## 🔄 URL Creation Flow

```text
User
 ↓
Submit URL
 ↓
Validate URL
 ↓
Generate Token (ZooKeeper)
 ↓
Store in MongoDB
 ↓
Cache in Redis
 ↓
Return Short URL
```

---

## 🚦 URL Redirection Flow

```text
User Opens Short URL
          ↓
      Redis Check
          ↓
   Hit         Miss
    ↓            ↓
 Return      MongoDB
    ↓            ↓
 Save Analytics
          ↓
      Redirect
```

---

## 📊 Analytics Dashboard

Tracks:

- 👥 Total Visitors
- 🎯 Unique Visitors
- 🌐 Unique Browsers
- 📱 Unique Devices
- 🌍 Country
- 🏙️ City
- 🕒 Timestamp
- 📈 Click Count

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Material UI
- Redux Toolkit

### Backend
- Node.js
- Fastify
- TypeScript

### Database
- MongoDB
- Mongoose

### Cache
- Redis

### Authentication
- JWT
- bcrypt

### Infrastructure
- Docker
- Nginx
- ZooKeeper

---

## 🚀 Run Locally

```bash
git clone <repo-url>

docker compose up --build
```

Application:

```text
Frontend: http://localhost
Backend : http://localhost/api
```

---

## 🔮 Future Improvements

- QR Code Generation
- Custom Short URLs
- Analytics Charts
- Cloud Deployment
- Rate Limiting
