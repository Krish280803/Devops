# Phase 7: Kubernetes Orchestration — Lesson 1: Architecture & Workloads

## 1. Concept Summary
Kubernetes (k8s) is an open-source container orchestration engine that automates deployment, scaling, load balancing, and self-healing of containerized applications.

## 2. Why It Matters
Kubernetes is the industry standard for running cloud-native applications across public clouds (AWS EKS, GCP GKE, Azure AKS).

## 3. Real-World Analogy
Kubernetes Control Plane is an Air Traffic Control tower; Worker Nodes are airplanes; Pods are the seating sections holding passengers (containers).

## 4. Architecture Diagram
```text
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
│  ┌────────────────────────┐  │        │  ┌────────────────────────┐  │
│  │ Pod A (App Container)   │  │        │  │ Pod B (App Container)   │  │
│  └────────────────────────┘  │        │  └────────────────────────┘  │
└──────────────────────────────┘        └──────────────────────────────┘
```

## 5. Key Principles
* Control Plane Components: API Server, etcd (key-value store), Scheduler, Controller Manager.
* Worker Node Components: Kubelet, Kube-Proxy, Container Runtime (containerd).
* Pods: Smallest deployable unit in Kubernetes containing 1 or more co-located containers.
* Service Types: ClusterIP (internal), NodePort (static port on nodes), LoadBalancer (cloud load balancer).

## 6. Commands Reference
* `kubectl get pods -n production` — List all running pods in production namespace.
* `kubectl apply -f deployment.yaml` — Declaratively apply YAML manifest specification.
* `kubectl logs -f deployment/api-server` — Stream logs from deployment pods.
* `kubectl describe pod web-app-7d9b` — Inspect detailed events, probe status, and failure causes.

## 7. Deployment Manifest Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.25-alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
```

## 8. Common Mistakes
* Not defining memory/CPU resource requests and limits, causing node OOM (Out Of Memory) kills.
* Hardcoding secrets directly inside Kubernetes YAML manifests without secret encryption.

## 9. Interview Q&A
* **Q**: What is the role of etcd in Kubernetes?
  **A**: etcd is a consistent, highly-available distributed key-value store holding cluster configuration state and data.
