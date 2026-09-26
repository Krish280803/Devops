import { Project } from './types';

export const PROJECTS: Project[] = [
  // ===================== BEGINNER PROJECTS =====================
  {
    id: 'proj-linux-health',
    title: 'Linux Server Health & Log Monitoring Automation',
    level: 'Beginner',
    description: 'Write a robust Bash script that automatically monitors server CPU usage, memory consumption, disk space, and inspects system logs for critical errors, sending alerts when thresholds are exceeded.',
    architecture: `
┌─────────────────────────────────────────────────────────────┐
│                 Linux Server Cron Job                       │
│                        │                                    │
│                 (Every 5 Minutes)                           │
│                        ▼                                    │
│             [monitor_health.sh Script]                      │
│     ┌──────────────────┼──────────────────┐                 │
│     ▼                  ▼                  ▼                 │
│  CPU & RAM         Disk Space         Syslog grep           │
│  Check (top)       Check (df)         for ERRORS            │
│     │                  │                  │                 │
│     └──────────────────┼──────────────────┘                 │
│                        ▼                                    │
│             [Log Summary & Email Alert]                     │
└─────────────────────────────────────────────────────────────┘
    `,
    prerequisites: ['Linux Shell', 'Bash Scripting', 'Cron Scheduling'],
    tasks: [
      'Write a bash script with functions for CPU, Memory, and Disk checks.',
      'Check if disk usage on / exceeds 85%.',
      'Parse /var/log/syslog or /var/log/messages for "ERROR" or "CRITICAL" lines in the last hour.',
      'Set up a Linux cron job running the script every 5 minutes.'
    ],
    starterCode: [
      {
        filename: 'monitor_health.sh',
        language: 'bash',
        code: `#!/bin/bash
# Linux Server Health Monitoring Script
set -euo pipefail

THRESHOLD_DISK=85
THRESHOLD_RAM=80
LOG_FILE="/var/log/syslog"

echo "=== SERVER HEALTH REPORT: $(date) ==="

# Check Disk Usage
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt "$THRESHOLD_DISK" ]; then
  echo "[WARNING] Disk space usage is high: \${DISK_USAGE}%"
else
  echo "[OK] Disk space usage: \${DISK_USAGE}%"
fi

# Check Memory Usage
RAM_USAGE=$(free -m | awk '/Mem:/ { printf("%.0f"), $3/$2*100 }')
if [ "$RAM_USAGE" -gt "$THRESHOLD_RAM" ]; then
  echo "[WARNING] RAM usage is high: \${RAM_USAGE}%"
else
  echo "[OK] RAM usage: \${RAM_USAGE}%"
fi`
      }
    ],
    expectedResult: 'Script outputs clean health status, flags memory/disk warnings, and appends error reports to health.log.'
  },
  {
    id: 'proj-bash-backup',
    title: 'Automated Server Backup & Log Rotation Script',
    level: 'Beginner',
    description: 'Create an automated backup rotation script that archives designated web server directories, compresses them with timestamped tar.gz, enforces retention policies (deleting backups older than 7 days), and uploads to remote storage.',
    architecture: `
[Source Directory /var/www] ──► [tar -czf timestamp.tar.gz] ──► [Verify Checksum] ──► [Purge > 7 Days Old]
    `,
    prerequisites: ['Bash Scripting', 'Linux File Management', 'Tar & Gzip'],
    tasks: [
      'Accept source and destination paths as positional arguments ($1, $2).',
      'Create timestamped `.tar.gz` archive of target directory.',
      'Delete local archives older than 7 days using `find -mtime +7 -delete`.',
      'Verify archive checksum with `md5sum`.'
    ],
    starterCode: [
      {
        filename: 'backup_rotator.sh',
        language: 'bash',
        code: `#!/bin/bash
set -euo pipefail

SRC_DIR="\${1:-/var/www/html}"
DEST_DIR="\${2:-/backup}"
RETENTION_DAYS=7
DATE=$(date +%Y-%m-%d_%H%M%S)

echo "=== BACKUP ROTATOR: $DATE ==="
mkdir -p "$DEST_DIR"

# Create Compressed Archive
ARCHIVE_NAME="backup_$DATE.tar.gz"
tar -czf "$DEST_DIR/$ARCHIVE_NAME" "$SRC_DIR"
echo "[SUCCESS] Created: $DEST_DIR/$ARCHIVE_NAME"

# Delete Backups Older Than Retention Period
find "$DEST_DIR" -type f -name "backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete
echo "[CLEANUP] Deleted backups older than $RETENTION_DAYS days"`
      }
    ],
    expectedResult: 'Creates timestamped tar.gz archives and automatically prunes backups older than 7 days.'
  },

  // ===================== DIY PRACTICE PROJECTS =====================
  {
    id: 'diy-argocd-gitops',
    title: 'DIY Practice: ArgoCD Self-Healing GitOps Kubernetes Controller',
    level: 'Advanced',
    description: 'CHALLENGE: Set up an ArgoCD GitOps controller in a Kubernetes cluster to manage application deployments declaratively. Configure automated self-healing so manual cluster edits are overwritten back to Git state.',
    architecture: `
Developer Git Push ──► GitHub Repository ──► [ArgoCD Controller (Sync Loop)]
                                                      │
                                                      ▼
[Auto Self-Healing] ◄── [Cluster State Drift] ◄── [Kubernetes Cluster Pods]
    `,
    prerequisites: ['Kubernetes Cluster (minikube/kind)', 'ArgoCD CLI', 'Git Repository'],
    tasks: [
      'Install ArgoCD in `argocd` namespace in your Kubernetes cluster.',
      'Connect ArgoCD to a public/private Git repository containing Kubernetes manifests.',
      'Create an ArgoCD `Application` manifest enabling `automated.selfHeal` and `automated.prune`.',
      'TEST DRIFT: Delete a deployment pod or change replica count manually via `kubectl` and verify ArgoCD auto-reverts changes within 3 minutes.'
    ],
    starterCode: [
      {
        filename: 'argocd-app.yaml',
        language: 'yaml',
        code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app-gitops
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/your-username/k8s-manifests.git'
    targetRevision: HEAD
    path: production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`
      }
    ],
    expectedResult: 'ArgoCD automatically syncs cluster state with Git and instantly self-heals any manual cluster modifications.'
  },
  {
    id: 'diy-loki-logging',
    title: 'DIY Practice: Centralized Log Aggregation with Loki, Promtail & Grafana',
    level: 'Intermediate',
    description: 'CHALLENGE: Deploy a Promtail daemon on multiple Linux nodes to collect syslog and web server log files, stream them into Grafana Loki, and build a real-world Grafana dashboard to filter HTTP 5xx errors.',
    architecture: `
[Linux Node 1 syslog] ──► [Promtail Agent] ──┐
                                             ├─► [Grafana Loki] ──► [Grafana Dashboard]
[Linux Node 2 Nginx]  ──► [Promtail Agent] ──┘
    `,
    prerequisites: ['Linux Shell', 'Docker Compose or Kubernetes', 'Grafana & Loki'],
    tasks: [
      'Deploy Grafana Loki and Promtail using Docker Compose.',
      'Configure Promtail to scrape `/var/log/syslog` and `/var/log/nginx/access.log`.',
      'Add Loki data source in Grafana UI.',
      'Write LogQL query `{job="varlogs"} |= "ERROR"` to display real-time error logs.'
    ],
    starterCode: [
      {
        filename: 'promtail-config.yml',
        language: 'yaml',
        code: `server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
- job_name: system
  static_configs:
  - targets:
      - localhost
    labels:
      job: varlogs
      __path__: /var/log/*log`
      }
    ],
    expectedResult: 'Grafana dashboard displays centralized log streams from Promtail agents with real-time LogQL filtering.'
  },
  {
    id: 'diy-trivy-security-gate',
    title: 'DIY Practice: Automated DevSecOps Vulnerability Gate in GitHub Actions',
    level: 'Intermediate',
    description: 'CHALLENGE: Implement a security pipeline gate in GitHub Actions that scans container images using Trivy and automatically fails pull requests if CRITICAL or HIGH severity CVE vulnerabilities are found.',
    architecture: `
PR Created ──► GitHub Actions ──► Docker Build ──► [Trivy Vulnerability Gate]
                                                            │
                                        ┌───────────────────┴───────────────────┐
                                        ▼                                       ▼
                              [Pass: Merge Allowed]                   [Fail: Block PR Merge]
    `,
    prerequisites: ['GitHub Actions', 'Docker', 'Trivy Scanner'],
    tasks: [
      'Write `.github/workflows/security.yml` triggered on pull_request.',
      'Build local container image tag `app:test`.',
      'Add Trivy step configured with `exit-code: 1` and `severity: CRITICAL,HIGH`.',
      'TEST GATE: Add a vulnerable base image (e.g. `ubuntu:14.04`) and verify Trivy blocks PR merge.'
    ],
    starterCode: [
      {
        filename: '.github/workflows/security.yml',
        language: 'yaml',
        code: `name: Security Gate

on: [pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker Image
        run: docker build -t app:test .
      - name: Run Trivy Vulnerability Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'app:test'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'`
      }
    ],
    expectedResult: 'Pull requests containing Critical/High CVE vulnerabilities are automatically blocked from merging.'
  },

  // ===================== INTERMEDIATE PROJECTS =====================
  {
    id: 'proj-docker-java',
    title: 'Dockerize a Java / Spring Boot Microservice',
    level: 'Intermediate',
    description: 'Containerize a Java Spring Boot REST API using optimized multi-stage Dockerfiles to reduce container size and run as a non-root unprivileged user.',
    architecture: `
┌─────────────────────────────────────────────────────────────┐
│                 Multi-Stage Docker Build                    │
│                                                             │
│   [Stage 1: maven:3.9-eclipse-temurin (SDK)]                │
│   ├── Copy pom.xml & src                                    │
│   └── RUN mvn clean package (Produces jar)                  │
│                        │                                    │
│                        ▼                                    │
│   [Stage 2: eclipse-temurin:17-jre-alpine (Runtime)]        │
│   ├── COPY --from=builder app.jar                           │
│   ├── USER appuser (Non-root)                               │
│   └── ENTRYPOINT ["java", "-jar", "app.jar"]                │
└─────────────────────────────────────────────────────────────┘
    `,
    prerequisites: ['Docker CLI', 'Dockerfile syntax', 'Java / Maven'],
    tasks: [
      'Write a 2-stage Dockerfile separating Maven build from JRE runtime.',
      'Configure non-root user `appuser` for security.',
      'Optimize image layer caching by copying `pom.xml` first.',
      'Verify image size is under 200MB.'
    ],
    starterCode: [
      {
        filename: 'Dockerfile',
        language: 'dockerfile',
        code: `# Stage 1: Build Java Application
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Runtime Environment
FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/target/*.jar app.jar
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
      }
    ],
    expectedResult: 'Produces a secure lightweight runnable Docker image under 200MB running as non-root user.'
  },
  {
    id: 'proj-docker-compose-stack',
    title: 'Spring Boot + MySQL + Redis Multi-Container Compose Stack',
    level: 'Intermediate',
    description: 'Build a production-grade multi-container architecture containing a Web API, MySQL database, and Redis caching layer connected via Docker Compose bridge networks.',
    architecture: `
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                     │
│                                                             │
│   ┌────────────────────────┐    ┌────────────────────────┐  │
│   │ App Container (Port 80)│───►│ MySQL Container (3306) │  │
│   │ (Node / Spring Boot)   │    │ (Persistent Volume)    │  │
│   └───────────┬────────────┘    └────────────────────────┘  │
│               │                              ▲              │
│               ▼                              │              │
│   ┌────────────────────────┐                 │              │
│   │ Redis Cache (6379)     │─────────────────┘              │
│   └────────────────────────┘                                │
└─────────────────────────────────────────────────────────────┘
    `,
    prerequisites: ['Docker CLI', 'Docker Compose YAML', 'Networking'],
    tasks: [
      'Create multi-stage Dockerfile for web application.',
      'Write `docker-compose.yml` linking web container with MySQL and Redis.',
      'Configure named Docker volumes for MySQL persistence.',
      'Implement healthchecks to delay web container startup until MySQL is ready.'
    ],
    starterCode: [
      {
        filename: 'docker-compose.yml',
        language: 'yaml',
        code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: secretpassword
      REDIS_HOST: redis
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-net

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secretpassword
      MYSQL_DATABASE: devopsdb
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-net

  redis:
    image: redis:7-alpine
    networks:
      - app-net

volumes:
  mysql_data:

networks:
  app-net:
    driver: bridge`
      }
    ],
    expectedResult: 'App connects successfully to MySQL and Redis upon `docker compose up -d` with persistent volume retention.'
  },

  // ===================== CAPSTONE PROJECT =====================
  {
    id: 'proj-capstone',
    title: 'Capstone: End-to-End GitOps Production Kubernetes Platform',
    level: 'Capstone',
    description: 'Architect a complete production pipeline: Developers push code to GitHub -> GitHub Actions runs CI unit tests & Trivy security scans -> Builds Docker Image -> Pushes to AWS ECR -> Terraform provisions AWS EKS cluster -> Helm deploys app -> Prometheus & Grafana monitor cluster health.',
    architecture: `
Developer ──► GitHub ──► GitHub Actions CI ──► Trivy Vulnerability Scan ──► AWS ECR
                                                                                │
                                                                                ▼
Grafana Dashboard ◄── Prometheus ◄── AWS EKS Cluster ◄── Terraform Provisioning ┘
    `,
    prerequisites: ['Git', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Prometheus'],
    tasks: [
      'Set up GitHub Actions CI pipeline trigger on push.',
      'Scan container image for vulnerability CVEs using Trivy step.',
      'Write Terraform module for AWS VPC and EKS cluster.',
      'Deploy Kubernetes Deployment, ClusterIP Service, and Ingress routing rules.',
      'Configure Prometheus scraper and Grafana dashboard for pod metrics.'
    ],
    starterCode: [
      {
        filename: '.github/workflows/deploy.yml',
        language: 'yaml',
        code: `name: Production GitOps CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Unit Tests
        run: npm test
      - name: Build Docker Image
        run: docker build -t myapp:\${{ github.sha }} .
      - name: Security Vulnerability Scan (Trivy)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:\${{ github.sha }}'
          format: 'table'
          exit-code: '1'
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'`
      }
    ],
    expectedResult: 'Passing commits automatically trigger security scans, image publishing, zero-downtime rolling deployment to EKS, and live metrics visualization in Grafana.'
  }
];
