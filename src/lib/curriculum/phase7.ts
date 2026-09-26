import { Phase } from '../types';

export const phase7: Phase = {
  id: 7,
  slug: 'kubernetes-orchestration',
  title: 'Phase 7: Kubernetes Production Orchestration',
  subtitle: 'Pods, Deployments, Services, Ingress, ConfigMaps, Secrets & HPA',
  description: 'Master container orchestration at scale: deployment strategies, self-healing, service discovery, persistent storage, and cluster administration.',
  badge: 'High Priority',
  iconName: 'Server',
  modules: [
    {
      id: 'p7-m1',
      title: 'Module 1: Kubernetes Core Objects & Production Routing',
      description: 'Understand Control Plane, Worker Nodes, Pods, Deployments, Services, and Ingress.',
      lessons: [
        {
          id: 'p7-l1',
          title: 'Lesson 1: Kubernetes Architecture & Workloads',
          duration: '40 mins',
          concept: 'Kubernetes (k8s) is an open-source container orchestration engine that automates deployment, scaling, load balancing, and self-healing of containerized applications.',
          whyItMatters: 'Kubernetes is the industry standard for running cloud-native applications across public clouds (AWS EKS, GCP GKE, Azure AKS).',
          analogy: 'Kubernetes Control Plane is an Air Traffic Control tower; Worker Nodes are airplanes; Pods are the seating sections holding passengers.',
          architectureDiagram: `
┌─────────────────────────────────────────────────────────────┐
│                   CONTROL PLANE (MASTER)                    │
│   [kube-apiserver]  [etcd]  [kube-scheduler]  [cm-manager]  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (API Calls)
      ┌────────────────────────┴────────────────────────┐
      ▼                                                 ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│  WORKER NODE 1               │        │  WORKER NODE 2               │
│  [kubelet]  [kube-proxy]     │        │  [kubelet]  [kube-proxy]     │
└──────────────────────────────┘        └──────────────────────────────┘
          `,
          keyPrinciples: [
            'Control Plane Components: API Server, etcd (key-value store), Scheduler, Controller Manager.',
            'Worker Node Components: Kubelet, Kube-Proxy, Container Runtime (containerd).'
          ],
          commandExamples: [
            { command: 'kubectl get pods -n production', explanation: 'List all running pods in production namespace.' },
            { command: 'kubectl apply -f deployment.yaml', explanation: 'Declaratively apply YAML manifest specification.' }
          ],
          commonMistakes: ['Not defining memory/CPU resource requests and limits.'],
          troubleshooting: [{ issue: 'Pod stuck in CrashLoopBackOff', fix: 'Run `kubectl logs <pod>` and `kubectl describe pod <pod>`.' }],
          interviewQuestions: [{ question: 'What is the role of etcd in Kubernetes?', answer: 'etcd is a consistent, highly-available distributed key-value store holding cluster configuration state.', level: 'Intermediate' }],
          quiz: [{ id: 'q7-1', question: 'Which component stores cluster state in Kubernetes?', options: ['etcd', 'kube-apiserver'], correctAnswer: 0, explanation: '`etcd` stores all cluster state.' }],
          practicalExercise: 'Write a basic Kubernetes Deployment manifest with 2 replicas running Nginx and inspect pods using `kubectl`.'
        },
        {
          id: 'p7-l2',
          title: 'Lesson 2: Services, Ingress Routing & Horizontal Pod Autoscaling (HPA)',
          duration: '45 mins',
          concept: 'Services expose Pod IP sets internally or externally. Ingress Controllers manage Layer 7 HTTP path routing. HPA scales replica count dynamically based on CPU/Memory load.',
          whyItMatters: 'Ingress and HPA handle traffic spikes automatically without human intervention during high load.',
          analogy: 'Service is a phone extension routing to active employees; Ingress is the front building receptionist checking visitor badges; HPA is hiring temporary staff during black friday sales.',
          architectureDiagram: `
Ingress Controller (Layer 7) ──► ClusterIP Service ──► Pod Replicas ◄── Autoscaled by HPA
          `,
          keyPrinciples: [
            'Service Types: ClusterIP (internal), NodePort (static port), LoadBalancer (cloud external).',
            'Horizontal Pod Autoscaler (HPA) targets CPU % thresholds to increase/decrease pod count.'
          ],
          commandExamples: [
            { command: 'kubectl get ingress -A', explanation: 'List all ingress routing rules across cluster.' },
            { command: 'kubectl autoscale deployment web --cpu-percent=70 --min=2 --max=10', explanation: 'Create HPA rule for deployment.' }
          ],
          commonMistakes: ['Exposing internal database pods directly with LoadBalancer Service types.'],
          troubleshooting: [{ issue: 'Ingress returns 502 Bad Gateway', fix: 'Verify backend Service selector labels match Pod template labels.' }],
          interviewQuestions: [{ question: 'Difference between Liveness and Readiness probes?', answer: 'Liveness restarts failed containers; Readiness removes pod IP from Service endpoints without restarting.', level: 'Advanced' }],
          quiz: [{ id: 'q7-l2-1', question: 'Which Service type provisions a cloud provider load balancer?', options: ['LoadBalancer', 'ClusterIP'], correctAnswer: 0, explanation: '`LoadBalancer` provisions an external cloud load balancer.' }],
          practicalExercise: 'Create a Kubernetes Service manifest of type ClusterIP for Nginx.'
        }
      ]
    }
  ]
};
