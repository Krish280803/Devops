import { Phase } from '../types';

export const phase13: Phase = {
  id: 13,
  slug: 'devsecops-security',
  title: 'Phase 13: DevSecOps & Security Automation',
  subtitle: 'Shift Left, SAST, DAST, Dependency Scanning, Container Security & Vault',
  description: 'Integrate security controls into every stage of the DevOps lifecycle. Learn static code analysis, vulnerability scanning (Trivy), secret management (HashiCorp Vault), and supply-chain security.',
  badge: 'High Priority',
  iconName: 'Shield',
  modules: [
    {
      id: 'p13-m1',
      title: 'Module 1: Shift-Left Security & Secret Management',
      description: 'Master SAST, DAST, container image vulnerability scanning, and HashiCorp Vault secrets.',
      lessons: [
        {
          id: 'p13-l1',
          title: 'Lesson 1: DevSecOps "Shift Left" & Vulnerability Scanning',
          duration: '35 mins',
          concept: 'DevSecOps integrates security into the software delivery pipeline from day one ("Shift Left"). Rather than conducting security audits right before release, automated SAST, DAST, and container scanners run on every git commit.',
          whyItMatters: 'Fixing a security vulnerability in production costs 30x more than catching it during local development or CI build stage.',
          analogy: 'Shift Left Security is installing smoke detectors while building a house frame, rather than inspecting for fire safety after furniture is moved in.',
          architectureDiagram: `
Git Commit ──► [SAST SonarQube] ──► [Trivy Container Scan] ──► [Block Vulnerable Builds]
          `,
          keyPrinciples: [
            'Shift Left: Move security checks earlier in the SDLC pipeline.',
            'Container Scanning: Inspect OS packages inside Docker images for CVE vulnerabilities (using Trivy / Grype).'
          ],
          commandExamples: [
            { command: 'trivy image nginx:1.25-alpine', explanation: 'Scan container image for security vulnerabilities.' },
            { command: 'trivy fs --security-checks config .', explanation: 'Scan local IaC files for misconfigurations.' }
          ],
          commonMistakes: ['Bypassing pipeline security scanners to meet tight release deadlines.'],
          troubleshooting: [{ issue: 'CI build fails due to CVE in base image', fix: 'Update base image tag to latest patched Alpine/Distroless image.' }],
          interviewQuestions: [{ question: 'Difference between SAST and DAST?', answer: 'SAST analyzes static source code without executing it; DAST tests a running application by injecting attacks externally.', level: 'Intermediate' }],
          quiz: [{ id: 'q13-1', question: 'What does "Shift Left" mean in DevSecOps?', options: ['Integrating security testing earlier into development & CI stages', 'Moving servers left'], correctAnswer: 0, explanation: 'Shift Left moves security verification early in SDLC.' }],
          practicalExercise: 'Run `trivy image python:3.9-slim` to inspect container vulnerability CVE findings.'
        },
        {
          id: 'p13-l2',
          title: 'Lesson 2: Secret Management with HashiCorp Vault & Cosign Image Signing',
          duration: '40 mins',
          concept: 'HashiCorp Vault encrypts secrets and generates short-lived dynamic credentials. Cosign signs container images cryptographically to prevent supply-chain tampering.',
          whyItMatters: 'Dynamic secrets expire automatically, neutralizing credential theft risk if a database password leaks.',
          analogy: 'HashiCorp Vault is a high-security bank vault issuing 15-minute temporary visitor keycards.',
          architectureDiagram: `
CI Pipeline ──► Cosign Private Key Sign ──► Signed Container Image ──► Verify Key in K8s
          `,
          keyPrinciples: [
            'Dynamic Secrets: Generate short-lived database credentials on-demand with automatic TTL expiration.',
            'Image Signing: Verify image provenance before deploying to Kubernetes.'
          ],
          commandExamples: [
            { command: 'cosign verify --key cosign.pub myrepo/app:1.0', explanation: 'Verify cryptographic signature of container image.' }
          ],
          commonMistakes: ['Storing plain-text passwords or API tokens inside source code repos.'],
          troubleshooting: [{ issue: 'Vault lease expired error', fix: 'Renew secret lease before TTL expiration or configure auto-renewal.' }],
          interviewQuestions: [{ question: 'What is Dynamic Secret Generation in Vault?', answer: 'Creating short-lived database credentials on-demand that expire automatically after a leased TTL.', level: 'Advanced' }],
          quiz: [{ id: 'q13-l2-1', question: 'What tool signs container images cryptographically for supply-chain security?', options: ['Cosign (Sigstore)', 'Trivy'], correctAnswer: 0, explanation: 'Cosign signs container images cryptographically.' }],
          practicalExercise: 'Store a secret key inside HashiCorp Vault and retrieve it via Vault CLI.'
        }
      ]
    }
  ]
};
