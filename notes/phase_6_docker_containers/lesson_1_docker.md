# Phase 6: Docker Containers — Lesson 1: Containers vs VMs & Dockerfile Optimization

## 1. Concept Summary
A **Container** is a lightweight, isolated execution package sharing the host OS Kernel via Linux namespaces and cgroups. Unlike Virtual Machines, containers do not carry a guest OS.

## 2. Why It Matters
Containers eliminate the "Works on my machine" problem, standardizing development, testing, and production environments globally.

## 3. Real-World Analogy
VMs are individual standalone houses (each with its own plumbing, roof, electric meter); Containers are apartments sharing the building foundation and main utility supply.

## 4. Architecture Diagram
```text
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ App A │ App B │ App C       │        │ App A │ App B │ App C       │
├─────────────────────────────┤        ├─────────────────────────────┤
│ Docker Engine (Namespaces)  │        │ Guest OS │ Guest OS │ Guest │
├─────────────────────────────┤        ├─────────────────────────────┤
│ Host Operating System       │        │ Hypervisor (VMware/KVM)     │
├─────────────────────────────┤        ├─────────────────────────────┤
│ Infrastructure (Physical)   │        │ Physical Hardware           │
└─────────────────────────────┘        └─────────────────────────────┘
      [CONTAINER MODEL]                       [VIRTUAL MACHINE MODEL]
```

## 5. Key Principles
* Layer Caching: Order Dockerfile instructions from least frequently changed to most frequently changed.
* Multi-stage Builds: Separate build SDK environment from final runtime image to minimize image size and attack surface.
* Non-root user: Run container processes as unprivileged user for security.

## 6. Commands Reference
* `docker build -t myapp:1.0 .` — Build Docker image from local Dockerfile.
* `docker run -d -p 8080:80 --name webapp myapp:1.0` — Run container detached mapping host port 8080 to container port 80.
* `docker exec -it webapp sh` — Open interactive shell inside running container.
* `docker logs -f --tail 100 webapp` — Stream last 100 log lines from container.

## 7. Multi-Stage Dockerfile Example
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --only=production
USER nextjs
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 8. Common Mistakes
* Using heavy base images (e.g. full Ubuntu 1.5GB) instead of Alpine or Slim images (50MB).
* Storing stateful data inside temporary container layer instead of Docker Volumes.

## 9. Interview Q&A
* **Q**: What are Linux Namespaces and Cgroups in Docker?
  **A**: Namespaces provide container process isolation (PID, Network, Mounts); Cgroups enforce hardware resource limits (CPU, RAM, I/O).
