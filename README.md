# 🚀 AI DevOps Academy — Zero to DevOps Architect Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

An interactive, full-stack web platform designed to train software engineers, sysadmins, and cloud enthusiasts from absolute zero to Advanced DevOps & Site Reliability Engineering (SRE) Architects.

---

## 🌟 Key Features

### 1. 🎓 **15-Phase DevOps Curriculum (`/learn`)**
- Complete 15-phase roadmap from **Phase 0 through Phase 14**.
- Every lesson includes point-wise concept breakdowns, real-world analogies, ASCII system architecture diagrams, command references, code manifests, common mistakes, diagnostic troubleshooting guides, and interview Q&A.

### 2. 📝 **Study Notes Generator & PDF Exporter (`/notes`)**
- Auto-generates structured point-wise study notes for individual lessons, complete phases, or the **Complete DevOps Master Course (All 15 Phases)**.
- Live editable Markdown viewer.
- **1-Click Exporter** supporting **PDF**, **Markdown (.md)**, and **Plain Text (.txt)** formats.

### 3. 🧪 **Dynamic Quiz Engine (`/quizzes`)**
- **300+ Practice Questions** spread across all 15 phases.
- Questions and options automatically shuffle on every refresh or retake attempt.
- Instant **✓ Correct** vs **✕ Incorrect** diagnostic feedback, highlighting selected vs correct choices, accompanied by **💡 Detailed Concept Explanations**.

### 4. 🛠️ **DevOps Production Troubleshooter (`/troubleshoot`)**
- Paste error tracebacks, terminal output, Dockerfiles, or Kubernetes YAMLs for root cause diagnosis and copyable terminal fix commands.
- Quick 1-click outage presets (*K8s CrashLoopBackOff OOMKilled*, *Docker Socket Permission Denied*, *Terraform DynamoDB State Lock*, *SSH Key Permissions*, *Nginx 502 Bad Gateway*, *Secret Leaks*).

### 5. 🎙️ **Mock Technical Interview Coach (`/interview`)**
- **50+ Interview Questions** across 10 DevOps categories (Linux, Git, Docker, Kubernetes, Terraform, Ansible, AWS, CI/CD, DevSecOps, SRE).
- Filter by Category and Difficulty Level.
- **Key Concepts Checklist** banner detailing expected technical terms.
- **Reveal Model Answer** toggle for instant study.
- Real-time AI Answer Evaluator providing 0–100 scoring, positive feedback, and missing concept analysis.

### 6. 🚀 **Hands-on Projects & Architecture Labs (`/projects`)**
- 11 complete projects from beginner Bash scripts to **DIY Practice Challenges** and the **Capstone GitOps Production Kubernetes Platform**.

### 7. ⚡ **Interactive Cheat Sheets Hub (`/cheatsheets`)**
- Searchable CLI reference with 1-click command copying across 9 core DevOps categories.

### 8. 📊 **Learning Analytics Dashboard (`/`)**
- Real-time course progress tracking, completion metrics, learning streaks, and interview readiness scores.

---

## 🗺️ Curriculum Roadmap Matrix

| Phase # | Phase Title | Technical Topics Covered |
| :--- | :--- | :--- |
| **Phase 0** | **DevOps Fundamentals** | CALMS Framework, Wall of Confusion, DORA Metrics, CI vs CD vs Continuous Deployment. |
| **Phase 1** | **Linux Administration** | FHS directory hierarchy, permissions (`chmod`, `chown`), systemd daemons, signals. |
| **Phase 2** | **Networking Fundamentals** | IPv4/v6, CIDR `/24`, DNS resolution, HTTP/HTTPS, TCP/UDP, Firewalls & ALB routing. |
| **Phase 3** | **Git & GitHub Engineering** | Staging area, Commits, Rebase vs Merge, `git reflog`, Secret purging, GitOps. |
| **Phase 4** | **Bash Scripting Automation**| Shebang, `set -euo pipefail`, exit codes (`$?`), `$1` args, `trap` cleanup, Cron. |
| **Phase 5** | **CI/CD Pipelines** | Pipeline stages, immutable Docker artifacts, GitHub Actions secrets, Matrix builds. |
| **Phase 6** | **Docker Containers** | Namespaces & Cgroups, multi-stage builds, Alpine images, Docker Compose stacks. |
| **Phase 7** | **Kubernetes Orchestration**| Control Plane (`etcd`, API server), Pods, Deployments, ClusterIP, Ingress, HPA. |
| **Phase 8** | **Enterprise Jenkins** | Controller-Agent topology, Declarative `Jenkinsfile`, credentials manager, K8s agents. |
| **Phase 9** | **Infrastructure as Code** | Declarative HCL, S3 remote state, DynamoDB write-locking, `plan`/`apply`, modules. |
| **Phase 10** | **Ansible Configuration** | Agentless SSH, idempotent playbooks, inventory files, handlers, Vault encryption. |
| **Phase 11** | **Cloud Computing & AWS** | VPC CIDR `/16`, public/private subnets, IGW/NAT, S3 11 9s, IAM least privilege, EKS. |
| **Phase 12** | **Monitoring & Observability**| Three pillars (Metrics/Logs/Traces), Prometheus pull scraping, PromQL, Grafana, Loki. |
| **Phase 13** | **DevSecOps & Security** | Shift-Left, SAST vs DAST, Trivy container scanning, HashiCorp Vault, Cosign signing. |
| **Phase 14** | **SRE & Reliability** | SLI/SLO/SLA, Error Budgets, Blue-Green, Canary releases, Blameless postmortems. |

---

## 💻 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Markdown Parsing**: [Marked](https://marked.js.org/)

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/ai-devops-academy.git
cd ai-devops-academy
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📤 Pushing to GitHub

```bash
# 1. Initialize Git repository
git init

# 2. Add remote repository URL
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 3. Stage and commit files
git add .
git commit -m "feat: complete AI DevOps Academy web platform"

# 4. Push to main branch
git branch -M main
git push -u origin main
```

---

## 📜 License
Licensed under the [MIT License](LICENSE).
