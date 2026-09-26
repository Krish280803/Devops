import { Phase } from '../types';

export const phase6: Phase = {
  id: 6,
  slug: 'docker-containers',
  title: 'Phase 6: Docker Containerization & Compose',
  subtitle: 'Images, Containers, Dockerfile Optimization & Multi-stage Builds',
  description: 'Learn to build lightweight, reproducible, isolated container environments for application stacks.',
  badge: 'High Priority',
  iconName: 'Box',
  modules: [
    {
      id: 'p6-m1',
      title: 'Module 1: Docker Core Concepts & Containerization',
      description: 'Master Docker CLI, images, volumes, multi-stage builds, and Docker Compose.',
      lessons: [
        {
          id: 'p6-l1',
          title: 'Lesson 1: Containers vs VMs & Dockerfile Best Practices',
          duration: '35 mins',
          concept: 'A Container is a lightweight, isolated execution package sharing the host OS Kernel via Linux namespaces and cgroups. Unlike Virtual Machines, containers do not carry a guest OS.',
          whyItMatters: 'Containers eliminate the "Works on my machine" problem, standardizing development, testing, and production environments globally.',
          analogy: 'VMs are individual standalone houses; Containers are apartments sharing building foundation and main utilities.',
          architectureDiagram: `
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ App A │ App B │ App C       │        │ App A │ App B │ App C       │
├─────────────────────────────┤        ├─────────────────────────────┤
│ Docker Engine (Namespaces)  │        │ Guest OS │ Guest OS │ Guest │
├─────────────────────────────┤        ├─────────────────────────────┤
│ Host Operating System       │        │ Hypervisor (VMware/KVM)     │
└─────────────────────────────┘        └─────────────────────────────┘
      [CONTAINER MODEL]                       [VIRTUAL MACHINE MODEL]
          `,
          keyPrinciples: [
            'Layer Caching: Order Dockerfile instructions from least to most frequently changed.',
            'Multi-stage Builds: Separate build SDK environment from runtime image.'
          ],
          commandExamples: [
            { command: 'docker build -t myapp:1.0 .', explanation: 'Build Docker container image from Dockerfile.' },
            { command: 'docker run -d -p 8080:80 --name webapp myapp:1.0', explanation: 'Run container detached mapping port 8080.' }
          ],
          commonMistakes: ['Using heavy base images instead of Alpine or Slim minimal images.'],
          troubleshooting: [{ issue: 'Container exits immediately with code 0', fix: 'Ensure foreground command PID 1 is running.' }],
          interviewQuestions: [{ question: 'What are Linux Namespaces and Cgroups in Docker?', answer: 'Namespaces provide container isolation; Cgroups enforce hardware resource limits (CPU/RAM).', level: 'Advanced' }],
          quiz: [{ id: 'q6-1', question: 'Which component does a container share with the host machine?', options: ['Host OS Kernel', 'Guest OS Kernel'], correctAnswer: 0, explanation: 'Containers share the host OS Kernel.' }],
          practicalExercise: 'Write a basic Dockerfile for an Nginx web page, build the image, and access it on `http://localhost:8080`.'
        },
        {
          id: 'p6-l2',
          title: 'Lesson 2: Multi-Stage Builds & Docker Compose Stacks',
          duration: '40 mins',
          concept: 'Multi-stage Dockerfiles produce tiny production runtime images. Docker Compose orchestrates multi-container application stacks (App + DB + Cache) in YAML.',
          whyItMatters: 'Docker Compose spins up an entire local microservice stack with database persistence in a single command (`docker compose up -d`).',
          analogy: 'Docker Compose is a symphony conductor bringing violin, drums, and piano players together on time.',
          architectureDiagram: `
Docker Compose ──► App Container (Port 80) ──► MySQL Container (Port 3306)
          `,
          keyPrinciples: [
            'Multi-stage Dockerfiles discard compiler SDKs, shrinking images from 1.5GB to < 50MB.',
            'Docker Compose bridge networks allow container service discovery by container name (`db:3306`).'
          ],
          commandExamples: [
            { command: 'docker compose up -d --build', explanation: 'Build and start multi-container stack in background.' },
            { command: 'docker compose down -v', explanation: 'Tear down stack and remove volumes.' }
          ],
          commonMistakes: ['Storing database files inside temporary container layer instead of Docker Volumes.'],
          troubleshooting: [{ issue: 'App cannot connect to MySQL container', fix: 'Add healthcheck `depends_on: db: condition: service_healthy` to wait for DB boot.' }],
          interviewQuestions: [{ question: 'Why use Docker Compose over standalone `docker run` commands?', answer: 'Docker Compose defines networks, environment vars, volumes, and multi-container startup order in a single version-controlled YAML file.', level: 'Intermediate' }],
          quiz: [{ id: 'q6-l2-1', question: 'What command starts a Docker Compose multi-container stack in detached mode?', options: ['docker compose up -d', 'docker start'], correctAnswer: 0, explanation: '`docker compose up -d` starts containers detached.' }],
          practicalExercise: 'Create a `docker-compose.yml` linking an Nginx container with Redis.'
        }
      ]
    }
  ]
};
