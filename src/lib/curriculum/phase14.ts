import { Phase } from '../types';

export const phase14: Phase = {
  id: 14,
  slug: 'sre-reliability',
  title: 'Phase 14: Site Reliability Engineering (SRE) & Reliability',
  subtitle: 'SLO, SLA, Error Budgets, Incident Management, Blue-Green & Canary Deployments',
  description: 'Master SRE principles created by Google: manage error budgets, implement zero-downtime Blue-Green / Canary deployment strategies, and conduct blameless postmortems.',
  badge: 'Advanced',
  iconName: 'Zap',
  modules: [
    {
      id: 'p14-m1',
      title: 'Module 1: SRE Foundations & Zero-Downtime Releases',
      description: 'Master SLI/SLO/SLA, Error Budgets, Blue-Green deployments, and Canary rollouts.',
      lessons: [
        {
          id: 'p14-l1',
          title: 'Lesson 1: Service Level Objectives (SLO), Error Budgets & Deployment Strategies',
          duration: '40 mins',
          concept: 'Site Reliability Engineering (SRE) applies software engineering discipline to infrastructure operations. SLI (Indicator) measures performance; SLO (Objective) sets internal reliability target; Error Budget (100% - SLO) dictates how much unreliability is tolerable for innovation.',
          whyItMatters: 'Aiming for 100% uptime is too expensive and slows down software development. SRE balances rapid feature deployment with system stability using data.',
          analogy: 'Error Budget is a monthly speed ticket budget given to a delivery driver: as long as they stay within budget, they can drive fast (deploy features).',
          architectureDiagram: `
[Blue Environment (v1.0 Live Traffic)] ───┐
                                          ├─► [Router / Load Balancer] ──► Users
[Green Environment (v2.0 New Release)] ──┘
          `,
          keyPrinciples: [
            'SLI / SLO / SLA: SLI = actual metric; SLO = target goal (e.g. 99.9%); SLA = business contract with penalties.',
            'Error Budget: If SLO is 99.9% uptime over 30 days, allowable downtime is 43.2 minutes.'
          ],
          commandExamples: [
            { command: 'kubectl set image deployment/app web=myapp:v2.0', explanation: 'Trigger rolling update deployment in Kubernetes.' },
            { command: 'kubectl rollout undo deployment/app', explanation: 'Instantly rollback deployment to previous revision.' }
          ],
          commonMistakes: ['Setting 100% uptime SLO goals, causing immense engineering waste.'],
          troubleshooting: [{ issue: 'Canary release increases HTTP 500 error rate', fix: 'Trigger automated rollback instantly using `kubectl rollout undo`.' }],
          interviewQuestions: [{ question: 'What happens when an engineering team exhausts their Error Budget?', answer: 'Feature deployments are frozen, and engineering effort is redirected entirely to stability and reliability improvements.', level: 'Advanced' }],
          quiz: [{ id: 'q14-1', question: 'If a service has a 99.9% uptime SLO over 30 days, what is its monthly Error Budget?', options: ['43.2 minutes', '4.32 minutes'], correctAnswer: 0, explanation: '0.1% of 30 days (43,200 minutes) equals 43.2 minutes downtime.' }],
          practicalExercise: 'Calculate the allowable downtime for a 99.99% uptime SLO over a 30-day period.'
        },
        {
          id: 'p14-l2',
          title: 'Lesson 2: Incident Management, Chaos Engineering & Blameless Postmortems',
          duration: '45 mins',
          concept: 'Incident Management structures emergency response (Incident Commander, Scribe). Chaos Engineering proactively injects fault failures (killing nodes/adding latency) to test resilience.',
          whyItMatters: 'Blameless Postmortems focus on fixing systemic software/process flaws rather than punishing individuals after outages.',
          analogy: 'Chaos Engineering is conducting fire drills in a skyscraper to test evacuation routes before a real fire occurs.',
          architectureDiagram: `
Incident Occurs ──► Incident Commander (Lead) ──► Mitigate Outage ──► Blameless Postmortem Review
          `,
          keyPrinciples: [
            'Chaos Engineering: Proactively test resilience using tools like Chaos Monkey or Litmus.',
            'Blameless Postmortems build psychological safety and prevent future outages.'
          ],
          commandExamples: [
            { command: 'litmusctl create chaos-experiment', explanation: 'Create Chaos Engineering experiment in Kubernetes.' }
          ],
          commonMistakes: ['Blaming developers for human typos instead of building automated guardrails.'],
          troubleshooting: [{ issue: 'High MTTR during incident response', fix: 'Document explicit step-by-step Runbooks for on-call alert remediation.' }],
          interviewQuestions: [{ question: 'What is a Blameless Postmortem?', answer: 'An incident review focused on fixing systemic system flaws rather than assigning personal blame to engineers.', level: 'Intermediate' }],
          quiz: [{ id: 'q14-l2-1', question: 'What is the goal of Chaos Engineering?', options: ['Injecting intentional failures to test system resilience', 'Deleting databases'], correctAnswer: 0, explanation: 'Chaos Engineering tests resilience under fault conditions.' }],
          practicalExercise: 'Draft a blameless postmortem template outlining incident timeline, root cause, and action items.'
        }
      ]
    }
  ]
};
