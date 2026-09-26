import { Phase } from '../types';

export const phase12: Phase = {
  id: 12,
  slug: 'monitoring-observability',
  title: 'Phase 12: Monitoring, Logging & Observability',
  subtitle: 'Prometheus, Grafana, Loki, OpenTelemetry, Metrics & Alerting',
  description: 'Implement full-stack observability across systems: collect metrics with Prometheus, visualize dashboards in Grafana, centralize logs with Loki/ELK, and configure alerts.',
  badge: 'Core Skill',
  iconName: 'Activity',
  modules: [
    {
      id: 'p12-m1',
      title: 'Module 1: Observability Pillars & Prometheus Architecture',
      description: 'Master Metrics, Logs, Traces, Prometheus pull scraping, PromQL queries, and Alertmanager.',
      lessons: [
        {
          id: 'p12-l1',
          title: 'Lesson 1: The Three Pillars of Observability & Prometheus Scraping',
          duration: '35 mins',
          concept: 'Observability allows engineers to infer internal system health based on external outputs: Metrics (numeric time-series), Logs (timestamped events), and Traces (end-to-end request journeys). Prometheus scrapes HTTP `/metrics` endpoints.',
          whyItMatters: 'Without observability, outages remain invisible until frustrated customers file tickets. Prometheus alerts notify engineers before systems crash.',
          analogy: 'Metrics are a car dashboard speedometer; Logs are the black box flight recorder; Traces are GPS navigation tracking a package.',
          architectureDiagram: `
Prometheus Server ──(Pull Scrape)──► Target [/metrics] ──► Alertmanager ──► Slack / PagerDuty
          `,
          keyPrinciples: [
            'Pull Model: Prometheus periodically scrapes target metrics endpoints over HTTP.',
            'Metric Types: Counter (only increases), Gauge (goes up/down), Histogram, Summary.'
          ],
          commandExamples: [
            { command: 'curl http://localhost:9100/metrics', explanation: 'Inspect Node Exporter plain-text metrics output.' }
          ],
          commonMistakes: ['High Cardinality Explosion: Adding unique user IDs to metrics labels, exhausting RAM.'],
          troubleshooting: [{ issue: 'Target state DOWN in Prometheus', fix: 'Verify target service network reachability and confirm port 9100.' }],
          interviewQuestions: [{ question: 'Difference between Push and Pull metrics architecture?', answer: 'Prometheus pulls metrics by scraping HTTP endpoints; Pushgateways push metrics from short-lived jobs.', level: 'Intermediate' }],
          quiz: [{ id: 'q12-1', question: 'Which Prometheus metric type measures total network bytes sent (value only increases)?', options: ['Counter', 'Gauge'], correctAnswer: 0, explanation: 'Counter metrics only increase or reset to zero.' }],
          practicalExercise: 'Write a PromQL query to calculate 5-minute HTTP request error rate.'
        },
        {
          id: 'p12-l2',
          title: 'Lesson 2: Grafana Visual Dashboards & Centralized Loki Logging',
          duration: '40 mins',
          concept: 'Grafana connects to Prometheus and Loki data sources to build interactive real-time dashboards. Loki indexes log metadata labels for fast searching using LogQL.',
          whyItMatters: 'Centralizing log streams into Loki eliminates the need to SSH into 50 individual servers to debug log errors.',
          analogy: 'Loki is a Google search engine for server logs across 100 machines.',
          architectureDiagram: `
[Node 1 Syslog] ──► Promtail Agent ──► Grafana Loki Storage ──► Grafana Log Dashboard
          `,
          keyPrinciples: [
            'LogQL: Loki Query Language used to search and extract log metrics.',
            'Grafana Dashboards visualize metrics and logs in a single pane of glass.'
          ],
          commandExamples: [
            { command: '{job="varlogs"} |= "ERROR"', explanation: 'LogQL query filtering logs for keyword ERROR.' }
          ],
          commonMistakes: ['Alert Fatigue: Triggering notifications for non-actionable minor spikes.'],
          troubleshooting: [{ issue: 'Grafana cannot connect to Loki', fix: 'Check Loki URL `http://loki:3100` network connectivity inside Docker/K8s.' }],
          interviewQuestions: [{ question: 'What is Grafana Loki?', answer: 'A horizontally-scalable log aggregation system inspired by Prometheus that indexes metadata labels.', level: 'Intermediate' }],
          quiz: [{ id: 'q12-l2-1', question: 'What tool visualizes Prometheus metrics into interactive dashboards?', options: ['Grafana', 'Alertmanager'], correctAnswer: 0, explanation: 'Grafana visualizes time-series metrics.' }],
          practicalExercise: 'Add a Prometheus data source inside Grafana UI and build a CPU usage graph.'
        }
      ]
    }
  ]
};
