import { Phase } from '../types';

export const phase0: Phase = {
  id: 0,
  slug: 'devops-fundamentals',
  title: 'Phase 0: DevOps Fundamentals',
  subtitle: 'Culture, CALMS, Lifecycle & Continuous Everything',
  description: 'Understand why DevOps exists, the Wall of Confusion, CALMS framework, DORA metrics, and the CI/CD lifecycle loop.',
  badge: 'Beginner',
  iconName: 'Compass',
  modules: [
    {
      id: 'p0-m1',
      title: 'Module 1: The Core Philosophy & Delivery Loop',
      description: 'Demystifying DevOps culture, breaking silos, and mastering continuous delivery pipelines.',
      lessons: [
        {
          id: 'p0-l1',
          title: 'Lesson 1: What is DevOps?',
          duration: '25 mins',
          concept: 'DevOps is a set of cultural philosophies, practices, and tools that increases an organization\'s ability to deliver applications at high velocity. It bridges the gap between Software Development (Dev) and IT Operations (Ops).',
          whyItMatters: 'Without DevOps, developers want fast feature releases while operations engineers want system stability. This friction creates the "Wall of Confusion", causing slow, brittle releases and high outage rates.',
          analogy: 'Imagine a Restaurant: Dev is the Kitchen experimenting with recipes; Ops is the Waitstaff serving guests. Without communication, dishes get cold or sent to wrong tables. DevOps brings shared ordering systems, standard tray sizes (containers), and continuous communication.',
          architectureDiagram: `
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│   PLAN    │ ───► │   CODE    │ ───► │   BUILD   │ ───► │   TEST    │
└───────────┘      └───────────┘      └───────────┘      └─────┬─────┘
      ▲                                                        │
      │                                                        ▼
┌─────┴─────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│  MONITOR  │ ◄─── │  OPERATE  │ ◄─── │  DEPLOY   │ ◄─── │  RELEASE  │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
          `,
          keyPrinciples: [
            'Culture: Shared responsibility and psychological safety',
            'Automation: Eliminating toil and manual build steps',
            'Lean: Short feedback loops and small batch sizes',
            'Measurement: Tracking DORA metrics (Deployment Frequency, MTTR, Lead Time)',
            'Sharing: Open communication and cross-functional teams'
          ],
          commandExamples: [
            { command: 'curl -I https://api.github.com', explanation: 'Inspect server response headers to verify system accessibility.' },
            { command: 'uptime', explanation: 'Check server operational load average and total uptime.' }
          ],
          commonMistakes: [
            'Treating DevOps as just a job title or isolated team.',
            'Automating broken manual workflows before standardizing them.',
            'Ignoring security until the very end of the release cycle.'
          ],
          troubleshooting: [
            { issue: 'High Change Failure Rate after deployments', fix: 'Implement automated CI unit/integration testing and smaller deployment payloads.' },
            { issue: 'Dev vs Ops blame game during outages', fix: 'Establish blameless postmortems and shared on-call escalation schedules.' }
          ],
          interviewQuestions: [
            { question: 'What does DevOps mean to you?', answer: 'It is a combination of culture, practices, and tools that shortens the systems development lifecycle while delivering high software quality continuously.', level: 'Beginner' },
            { question: 'What is CALMS in DevOps?', answer: 'CALMS stands for Culture, Automation, Lean, Measurement, and Sharing.', level: 'Intermediate' }
          ],
          quiz: [
            {
              id: 'q0-1',
              question: 'What primary problem caused by traditional development does DevOps solve?',
              options: [
                'High hardware costs',
                'The Wall of Confusion between rapid feature releases and operational stability',
                'Slow internet connection speeds',
                'Writing Python code'
              ],
              correctAnswer: 1,
              explanation: 'DevOps eliminates the Wall of Confusion by aligning development velocity with operational stability.'
            },
            {
              id: 'q0-2',
              question: 'In the CALMS framework, what does the "A" stand for?',
              options: ['Agile', 'Automation', 'Architecture', 'AWS'],
              correctAnswer: 1,
              explanation: 'CALMS stands for Culture, Automation, Lean, Measurement, and Sharing.'
            }
          ],
          practicalExercise: 'Draw the DevOps infinity loop on paper or ASCII text editor and label all 8 phases from memory.'
        },
        {
          id: 'p0-l2',
          title: 'Lesson 2: CI vs CD vs Continuous Deployment',
          duration: '30 mins',
          concept: 'Understanding the key milestones of automated delivery: Continuous Integration (CI), Continuous Delivery (CD), and Continuous Deployment (CD).',
          whyItMatters: 'Conflating CI, Continuous Delivery, and Continuous Deployment leads to flawed pipeline architecture and unclear release approvals.',
          analogy: 'Continuous Integration is baking cookies and checking every cookie for quality; Continuous Delivery packages cookies ready on the counter waiting for manager approval; Continuous Deployment automatically ships cookies directly to customers as soon as they cool.',
          architectureDiagram: `
Code Commit ──► Automated Build ──► Automated Test ──► [Continuous Integration]
                                                           │
                                                           ▼
Staging Deploy ──► Acceptance Tests ─────────────────► [Continuous Delivery (Manual Gate)]
                                                           │
                                                           ▼
Automated Production Deploy ─────────────────────────► [Continuous Deployment]
          `,
          keyPrinciples: [
            'CI: Frequent code integrations validated by automated builds and tests.',
            'Continuous Delivery: Code is always in a deployable state to production (requires manual button click).',
            'Continuous Deployment: Every passing build is deployed to production automatically without human intervention.'
          ],
          commandExamples: [
            { command: 'git commit -m "feat: add user login API"', explanation: 'Triggers automated CI pipeline trigger.' },
            { command: 'docker build -t app:v1.0 .', explanation: 'Builds immutable container image artifact.' }
          ],
          commonMistakes: [
            'Claiming to have CI when builds are triggered manually once a week.',
            'Attempting Continuous Deployment without 90%+ automated test coverage.'
          ],
          troubleshooting: [
            { issue: 'Pipeline succeeds but production breaks', fix: 'Add integration/e2e tests and staging environment parity check.' }
          ],
          interviewQuestions: [
            { question: 'What is the core difference between Continuous Delivery and Continuous Deployment?', answer: 'Continuous Delivery keeps code ready for release with manual trigger, whereas Continuous Deployment automatically deploys passing builds straight to production.', level: 'Intermediate' }
          ],
          quiz: [
            {
              id: 'q0-l2-1',
              question: 'Which process requires a human approval gate before releasing to production?',
              options: ['Continuous Integration', 'Continuous Delivery', 'Continuous Deployment', 'Monolithic Delivery'],
              correctAnswer: 1,
              explanation: 'Continuous Delivery maintains production-ready builds but relies on a human approval gate.'
            }
          ],
          practicalExercise: 'Write down 3 automated tests your application must pass before proceeding from CI to CD.'
        }
      ]
    }
  ]
};
