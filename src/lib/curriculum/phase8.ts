import { Phase } from '../types';

export const phase8: Phase = {
  id: 8,
  slug: 'jenkins-automation',
  title: 'Phase 8: Enterprise CI/CD Pipelines with Jenkins',
  subtitle: 'Controller, Agents, Jenkinsfile, Declarative Pipelines & Credentials',
  description: 'Master Jenkins enterprise automation: distributed agent fleets, pipeline-as-code Jenkinsfile, credentials manager, webhooks, and Kubernetes agent pods.',
  badge: 'Enterprise Skill',
  iconName: 'Settings',
  modules: [
    {
      id: 'p8-m1',
      title: 'Module 1: Distributed Jenkins Architecture & Jenkinsfile',
      description: 'Understand Jenkins controller/agent topology, declarative syntax, and secrets storage.',
      lessons: [
        {
          id: 'p8-l1',
          title: 'Lesson 1: Jenkins Controller-Agent Topology & Jenkinsfile Syntax',
          duration: '35 mins',
          concept: 'Jenkins is an extensible open-source automation server. In enterprise setups, a central Jenkins Controller coordinates job scheduling, while distributed Agents (Node/Docker/Kubernetes) execute the heavy build steps.',
          whyItMatters: 'Running build jobs directly on the Controller risks crashing the master node. Distributed agents ensure scalability and security isolation.',
          analogy: 'The Jenkins Controller is a dispatcher at a taxi headquarters; Jenkins Agents are the individual taxis driving around fulfilling trips.',
          architectureDiagram: `
┌─────────────────────────────────────────────────────────────┐
│                     JENKINS CONTROLLER                      │
│      [UI Dashboard]   [Credentials Manager]   [Job Queue]   │
└──────────────────────────────┬──────────────────────────────┘
                               │ SSH / JNLP Agent Connection
      ┌────────────────────────┴────────────────────────┐
      ▼                                                 ▼
┌───────────────┐                             ┌────────────────────────┐
│ Agent Node 1  │                             │ K8s Pod Dynamic Agent  │
└───────────────┘                             └────────────────────────┘
          `,
          keyPrinciples: [
            'Declarative Pipeline: Clean `pipeline { agent any ... }` structure version-controlled inside `Jenkinsfile`.',
            'Credentials Binding: Securely inject SSH keys and tokens into build steps via `withCredentials()`.'
          ],
          commandExamples: [
            { command: 'java -jar jenkins.war', explanation: 'Run standalone Jenkins server locally.' }
          ],
          commonMistakes: ['Running heavy compilation workloads on Master Controller node.'],
          troubleshooting: [{ issue: 'Agent offline / JNLP connection timeout', fix: 'Verify firewall port 50000 (JNLP port) and check agent secret key.' }],
          interviewQuestions: [{ question: 'Difference between Declarative and Scripted Jenkinsfile pipelines?', answer: 'Declarative uses structured `pipeline {}` blocks; Scripted uses imperative Groovy `node {}` blocks.', level: 'Intermediate' }],
          quiz: [{ id: 'q8-1', question: 'Where should Jenkins credentials be stored securely?', options: ['Jenkins Credentials Manager', 'Inside Jenkinsfile text'], correctAnswer: 0, explanation: 'Credentials Manager encrypts secrets safely.' }],
          practicalExercise: 'Write a basic Declarative Jenkinsfile containing Checkout, Build, and Test stages.'
        },
        {
          id: 'p8-l2',
          title: 'Lesson 2: Kubernetes Dynamic Agent Pods & Shared Libraries',
          duration: '40 mins',
          concept: 'Jenkins Kubernetes Plugin provisions dynamic ephemeral pod agents on-demand. Shared Libraries centralize reusable Groovy functions across corporate pipelines.',
          whyItMatters: 'Dynamic K8s agents eliminate fixed static agent server maintenance costs.',
          analogy: 'Dynamic Pod Agents are disposable paper cups created on demand for a single drink and recycled immediately.',
          architectureDiagram: `
Jenkins Controller ──(K8s API)──► Provision Ephemeral Pod Agent ──► Run Build ──► Destroy Pod
          `,
          keyPrinciples: [
            'Ephemeral Agents: Spin up pod agents on-demand per build step and terminate after completion.',
            'Global Pipeline Libraries: Shared Groovy helper functions version-controlled in Git.'
          ],
          commandExamples: [
            { command: 'container("maven") { sh "mvn test" }', explanation: 'Execute step inside specified pod container.' }
          ],
          commonMistakes: ['Hardcoding build environment dependencies on static VM agents.'],
          troubleshooting: [{ issue: 'K8s agent pod stuck in Pending', fix: 'Check K8s cluster node memory/CPU capacity and service account RBAC permissions.' }],
          interviewQuestions: [{ question: 'Why run Jenkins agents inside dynamic Kubernetes pods?', answer: 'Provides isolated, ephemeral build environments that scale to zero when idle.', level: 'Advanced' }],
          quiz: [{ id: 'q8-l2-1', question: 'What plugin provisions on-demand build agent pods in Kubernetes?', options: ['Jenkins Kubernetes Plugin', 'Freestyle Plugin'], correctAnswer: 0, explanation: 'The Kubernetes plugin provisions dynamic pod agents.' }],
          practicalExercise: 'Configure a pipeline step executing inside a `maven:3.8-alpine` Docker agent.'
        }
      ]
    }
  ]
};
