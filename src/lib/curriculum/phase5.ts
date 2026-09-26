import { Phase } from '../types';

export const phase5: Phase = {
  id: 5,
  slug: 'cicd-pipelines',
  title: 'Phase 5: Continuous Integration & Continuous Delivery (CI/CD)',
  subtitle: 'Pipeline Architecture, Stages, Artifacts, Environments & GitHub Actions',
  description: 'Design robust pipeline-as-code automation workflows for building, testing, security scanning, packaging, and deploying applications.',
  badge: 'Core Skill',
  iconName: 'Workflow',
  modules: [
    {
      id: 'p5-m1',
      title: 'Module 1: Pipeline Design & GitHub Actions',
      description: 'Master pipeline stages, secret injection, caching, matrix builds, and release workflows.',
      lessons: [
        {
          id: 'p5-l1',
          title: 'Lesson 1: Declarative Pipeline Architecture',
          duration: '35 mins',
          concept: 'A CI/CD Pipeline automates the stages required to move code from Git commit to Production deployment: Checkout -> Lint -> Unit Test -> Security Scan -> Docker Build -> Container Registry Push -> Deploy.',
          whyItMatters: 'Manual deployments are prone to human error. Declarative pipelines ensure every single code commit is vetted identically.',
          analogy: 'A CI/CD pipeline is an automated quality control assembly line in a car factory inspecting every part before shipping.',
          architectureDiagram: `
Git Push ──► [Source Checkout] ──► [Lint & Unit Test] ──► [Security Scan] ──► [Deploy]
          `,
          keyPrinciples: [
            'Fail Fast: Put quick unit tests and linters at the beginning of the pipeline.',
            'Immutable Artifacts: Build Docker image ONCE in CI and deploy that exact same image.'
          ],
          commandExamples: [
            { command: 'act', explanation: 'Run GitHub Actions workflows locally for testing.' }
          ],
          commonMistakes: ['Rebuilding different binary code artifacts for staging vs production.'],
          troubleshooting: [{ issue: 'Pipeline build step failed', fix: 'Check build log stdout and verify missing package dependencies.' }],
          interviewQuestions: [{ question: 'Why build Docker images only once in CI/CD?', answer: 'Building once guarantees Immutable Artifact environment parity across Dev, Staging, and Prod.', level: 'Intermediate' }],
          quiz: [{ id: 'q5-1', question: 'Which stage should run first to adhere to Fail Fast?', options: ['Lint & Unit Tests', 'Production Deploy'], correctAnswer: 0, explanation: 'Lint & Unit tests run fast and detect syntax errors immediately.' }],
          practicalExercise: 'Create `.github/workflows/ci.yml` in a GitHub repository and verify build execution on push.'
        },
        {
          id: 'p5-l2',
          title: 'Lesson 2: GitHub Actions Workflows, Matrix Builds & Secrets',
          duration: '35 mins',
          concept: 'GitHub Actions defines automation workflows in YAML under `.github/workflows/`. Matrix builds run jobs concurrently across version matrices.',
          whyItMatters: 'Matrix builds let you test code against Node 18, 20, 22 concurrently in seconds.',
          analogy: 'Matrix build is testing a car tires concurrently in heat, ice, and rain simulators at the same time.',
          architectureDiagram: `
GitHub Trigger ──► [Matrix: Node 18] ──┐
                ──► [Matrix: Node 20] ──┼─► [Aggregate Results]
                ──► [Matrix: Node 22] ──┘
          `,
          keyPrinciples: [
            'Secret Safety: Inject API keys via encrypted pipeline secrets (`secrets.AWS_SECRET_KEY`).',
            'Matrix Strategy: Run jobs concurrently across matrix arrays.'
          ],
          commandExamples: [
            { command: 'uses: actions/setup-node@v4', explanation: 'Setup Node environment with caching enabled.' }
          ],
          commonMistakes: ['Hardcoding API credentials in workflow YAML files.'],
          troubleshooting: [{ issue: 'Secret variable empty in workflow', fix: 'Ensure secret is added under Repository Settings -> Secrets and variables.' }],
          interviewQuestions: [{ question: 'What is a Matrix Build in GitHub Actions?', answer: 'It automatically creates multiple job runs based on combinations of variables (like OS or language runtime versions).', level: 'Intermediate' }],
          quiz: [{ id: 'q5-l2-1', question: 'Where should AWS API tokens be stored in GitHub Actions?', options: ['Repository Secrets', 'Inside workflow YAML text'], correctAnswer: 0, explanation: 'Repository Secrets encrypt credentials safely.' }],
          practicalExercise: 'Add a matrix strategy `matrix: node-version: [18.x, 20.x]` to a GitHub Actions workflow.'
        }
      ]
    }
  ]
};
