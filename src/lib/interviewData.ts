export interface InterviewQuestion {
  id: string;
  category: 'Linux' | 'Git' | 'Docker' | 'Kubernetes' | 'Terraform' | 'Ansible' | 'CI/CD' | 'AWS' | 'DevSecOps' | 'SRE';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Scenario';
  question: string;
  modelAnswer: string;
  keyConceptsToMention: string[];
  interviewTip: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ===================== LINUX =====================
  {
    id: 'iq-linux-1',
    category: 'Linux',
    level: 'Intermediate',
    question: 'How do you troubleshoot a server that is running out of memory (OOM)? What commands would you use?',
    modelAnswer: 'First, run `free -m` or `top/htop` to inspect memory and swap usage. Check system logs using `sudo dmesg -T | grep -i oom` or `journalctl -k | grep -i oom` to see if the Linux kernel OOM Killer has terminated any processes. Identify memory-hogging processes with `ps aux --sort=-%mem | head -10`. Inspect heap dumps or log files for leaks and restart the service via `systemctl`.',
    keyConceptsToMention: ['free -m', 'top / htop', 'dmesg / OOM Killer logs', 'ps aux sort by memory', 'Swap space configuration'],
    interviewTip: 'Always mention checking `dmesg` logs for Kernel OOM killer invocations—interviewers love candidates who understand lower-level OS kernel responses.'
  },
  {
    id: 'iq-linux-2',
    category: 'Linux',
    level: 'Beginner',
    question: 'What does `chmod 755 script.sh` do, and how does octal permission notation work?',
    modelAnswer: 'Octal permissions map to Read (4), Write (2), and Execute (1). `755` grants 7 (4+2+1 = Read, Write, Execute) to the File Owner, 5 (4+0+1 = Read, Execute) to the Group, and 5 (Read, Execute) to Others.',
    keyConceptsToMention: ['Read=4, Write=2, Execute=1', 'Owner / Group / Others breakdown', 'Octal sum calculation'],
    interviewTip: 'Always state both the numeric breakdown and the human-readable permission string (`-rwxr-xr-x`).'
  },
  {
    id: 'iq-linux-3',
    category: 'Linux',
    level: 'Advanced',
    question: 'What is the difference between SIGTERM (15) and SIGKILL (9) signals when stopping a process?',
    modelAnswer: 'SIGTERM (Signal 15) is a graceful termination request sent to a process, allowing it to complete current requests, save state, and close socket connections. SIGKILL (Signal 9) is uncatchable and instantly kills the process PID at the Kernel level without allowing cleanup.',
    keyConceptsToMention: ['Graceful shutdown vs instant kill', 'Signal handling', 'Cleanup of socket connections'],
    interviewTip: 'Emphasize that SIGKILL should be used as a last resort because abrupt kills can cause data corruption or leave stale lock files.'
  },
  {
    id: 'iq-linux-4',
    category: 'Linux',
    level: 'Scenario',
    question: 'A Linux web server has high load average (e.g. 15.0 on a 4-core CPU), but CPU utilization is only 10%. What is causing this, and how do you diagnose it?',
    modelAnswer: 'High load average with low CPU utilization indicates processes stuck in Uninterruptible Sleep (D state), typically waiting for I/O disk operations or NFS network storage timeouts. Use `iostat -xz 1` to check `%util` and `await` times, run `htop` to identify processes in state D, and inspect disk health with `smartctl` or check network mount mounts.',
    keyConceptsToMention: ['Uninterruptible Sleep state (D state)', 'I/O wait (%wa)', 'iostat -xz 1', 'NFS / Storage bottlenecks'],
    interviewTip: 'Distinguish between CPU-bound load (high CPU %) vs I/O-bound load (high load average, low CPU %).'
  },
  {
    id: 'iq-linux-5',
    category: 'Linux',
    level: 'Intermediate',
    question: 'How do you check which process is listening on Port 8080 and stop it?',
    modelAnswer: 'Run `sudo netstat -tulpn | grep :8080` or `sudo lsof -i :8080` to find the process ID (PID) and command name. Once the PID is identified, attempt graceful termination using `sudo kill -15 <PID>`. If it does not respond, force stop with `sudo kill -9 <PID>`.',
    keyConceptsToMention: ['lsof -i :port', 'netstat -tulpn', 'PID identification', 'kill -15 vs kill -9'],
    interviewTip: 'Mentioning `lsof` or `ss` alongside `netstat` shows modern Linux CLI proficiency.'
  },

  // ===================== GIT & GITHUB =====================
  {
    id: 'iq-git-1',
    category: 'Git',
    level: 'Intermediate',
    question: 'Difference between `git merge` and `git rebase`? When would you use each?',
    modelAnswer: '`git merge` combines two branch histories by creating a non-destructive 3-way merge commit, preserving true historical context. `git rebase` rewrites linear history by moving feature commits onto the tip of the target branch. Use `rebase` on local un-pushed feature branches for clean linear history; use `merge` on public shared branches (`main`) to avoid rewriting published history.',
    keyConceptsToMention: ['Merge commit vs Linear history rewrite', 'Golden Rule of Rebase (never rebase public shared branches)', 'git rebase main'],
    interviewTip: 'Highlight the Golden Rule of Git Rebase: Never rebase commits that have already been pushed to a shared remote repository.'
  },
  {
    id: 'iq-git-2',
    category: 'Git',
    level: 'Advanced',
    question: 'You accidentally ran `git reset --hard HEAD~1` and lost an un-pushed commit. How do you recover it?',
    modelAnswer: 'Run `git reflog` to view the reference log history of all past HEAD movements. Identify the SHA commit hash before the reset (e.g. `HEAD@{1}`). Run `git checkout <commit-sha>` or `git reset --hard <commit-sha>` to restore the lost commit back onto your working branch.',
    keyConceptsToMention: ['git reflog', 'HEAD reference history', 'Dangling commit recovery', 'git reset --hard SHA'],
    interviewTip: '`git reflog` is the ultimate safety net in Git—mentioning it demonstrates deep Git troubleshooting skills.'
  },
  {
    id: 'iq-git-3',
    category: 'Git',
    level: 'Scenario',
    question: 'A developer accidentally committed a private AWS Secret Key to a public GitHub repository. What steps must you take immediately?',
    modelAnswer: '1. Revoke and invalidate the AWS Secret Key immediately in AWS IAM console to prevent unauthorized cloud access.\n2. Purge the secret file completely from all past Git commit DAG history using `git filter-repo` or BFG Repo-Cleaner.\n3. Force push the cleaned repository history (`git push origin --force`).\n4. Generate a new AWS credential pair and store it securely in secret managers.',
    keyConceptsToMention: ['Immediate key revocation in IAM', 'git filter-repo / BFG Repo-Cleaner', 'History purging vs simple git rm', 'Force push'],
    interviewTip: 'Emphasize revoking the credential FIRST before touching Git—bots scrape public GitHub commits within seconds!'
  },

  // ===================== DOCKER =====================
  {
    id: 'iq-docker-1',
    category: 'Docker',
    level: 'Advanced',
    question: 'How do you optimize a Docker image size from 1.5 GB down to under 100 MB?',
    modelAnswer: 'Use multi-stage builds (`FROM node:20-alpine AS builder` for compilation, and a minimal runtime stage like `alpine` or `distroless`). Next, clean package manager caches (`rm -rf /var/cache/apk/*`), combine RUN commands to reduce image layers, utilize `.dockerignore` to exclude node_modules and local build artifacts, and copy only production dependencies.',
    keyConceptsToMention: ['Multi-stage builds', 'Alpine / Distroless base images', '.dockerignore file', 'Layer minimization', 'Pruning devDependencies'],
    interviewTip: 'Mention Distroless base images for maximum production security because they contain no package managers or shell binaries.'
  },
  {
    id: 'iq-docker-2',
    category: 'Docker',
    level: 'Intermediate',
    question: 'What are Linux Namespaces and Control Groups (Cgroups), and how does Docker use them?',
    modelAnswer: 'Linux Namespaces provide process-level isolation (PID, Network, Mounts, IPC, User), ensuring containers cannot see or touch other container environments. Control Groups (Cgroups) enforce hardware resource limits (metering CPU, Memory, and Disk I/O usage) so a single container cannot starve the host server.',
    keyConceptsToMention: ['Namespaces = Isolation', 'Cgroups = Resource Limits', 'Host OS Kernel sharing'],
    interviewTip: 'Explain that Docker is an orchestration wrapper on top of lower-level Linux Kernel namespaces and cgroups features.'
  },
  {
    id: 'iq-docker-3',
    category: 'Docker',
    level: 'Beginner',
    question: 'Difference between Docker Volumes and Bind Mounts?',
    modelAnswer: 'Docker Volumes are managed by Docker within host filesystem directory (`/var/lib/docker/volumes`), providing isolated, persistent storage portable across containers. Bind Mounts link any arbitrary file or directory from the host machine directly into the container filesystem (commonly used for local hot-reloading development).',
    keyConceptsToMention: ['Docker-managed volumes vs Host path bind mounts', 'Persistence across container restarts', 'Local development hot-reloading'],
    interviewTip: 'Recommend Docker Volumes for production workloads and database storage, and Bind Mounts for local dev code syncing.'
  },

  // ===================== KUBERNETES =====================
  {
    id: 'iq-k8s-1',
    category: 'Kubernetes',
    level: 'Scenario',
    question: 'Your application pod in Kubernetes is stuck in `CrashLoopBackOff`. Walk me through your step-by-step diagnostic workflow.',
    modelAnswer: '1. Run `kubectl get pods -n <namespace>` to check exit code and restart count.\n2. Run `kubectl logs <pod-name> --previous` to inspect stdout/stderr before container crashed.\n3. Run `kubectl describe pod <pod-name>` to check events, probe status, and environment variables.\n4. Verify ConfigMap and Secret key bindings exist.\n5. If Out-Of-Memory (OOMKilled exit 137), increase memory limits in deployment manifest.\n6. Run `kubectl exec -it` or attach a debug container to test internal database/network connectivity.',
    keyConceptsToMention: ['kubectl logs --previous', 'kubectl describe pod events', 'OOMKilled exit code 137', 'Liveness probe failure', 'ConfigMap / Secret check'],
    interviewTip: 'Using `--previous` flag with `kubectl logs` is crucial when containers keep restarting!'
  },
  {
    id: 'iq-k8s-2',
    category: 'Kubernetes',
    level: 'Advanced',
    question: 'What is `etcd` in Kubernetes, and why is high availability (HA) critical for the `etcd` cluster?',
    modelAnswer: '`etcd` is a strongly consistent, distributed key-value database that stores the complete cluster state, configuration, and secrets. If `etcd` is lost or corrupted, the entire Kubernetes cluster state is lost. HA requires an odd number of nodes (3 or 5) using the Raft consensus algorithm to maintain quorum.',
    keyConceptsToMention: ['Distributed key-value store', 'Raft consensus algorithm', 'Odd node count (3, 5) for quorum', 'Cluster state backup'],
    interviewTip: 'Mention taking periodic `etcdctl snapshot save` backups before upgrading Kubernetes control plane versions.'
  },
  {
    id: 'iq-k8s-3',
    category: 'Kubernetes',
    level: 'Intermediate',
    question: 'Difference between Liveness, Readiness, and Startup Probes in Kubernetes?',
    modelAnswer: 'Liveness Probe determines if a container is alive; if it fails, Kubernetes kills and restarts the container. Readiness Probe determines if a container is ready to accept user network traffic; if it fails, the pod IP is removed from service endpoints. Startup Probe runs first during container boot to delay Liveness checks for slow-starting applications.',
    keyConceptsToMention: ['Liveness = Restart container', 'Readiness = Remove from Load Balancer endpoints', 'Startup = Delay checks for legacy apps'],
    interviewTip: 'Clarify that a failing Readiness probe does NOT restart the container—it only stops routing network traffic to it.'
  },
  {
    id: 'iq-k8s-4',
    category: 'Kubernetes',
    level: 'Advanced',
    question: 'What are Taints, Tolerations, and Node Affinity in Kubernetes scheduling?',
    modelAnswer: 'Taints are applied to Worker Nodes to repel pods unless the pod has matching Tolerations (e.g., reserving GPU nodes for AI jobs). Node Affinity is applied to Pods to attract them to specific labeled nodes based on rules (Hard/Required vs Soft/Preferred). Together, they control exact pod placement across cluster nodes.',
    keyConceptsToMention: ['Taints repel pods from nodes', 'Tolerations allow pods on tainted nodes', 'Node Affinity attracts pods to labeled nodes'],
    interviewTip: 'Use the analogy: Taints are node warning signs ("GPU Only"); Tolerations are pod badges allowed to enter; Node Affinity is pod preference ("Prefer Zone A").'
  },

  // ===================== TERRAFORM =====================
  {
    id: 'iq-tf-1',
    category: 'Terraform',
    level: 'Intermediate',
    question: 'What is Terraform state locking and why is remote state backend with S3 and DynamoDB required in team setups?',
    modelAnswer: 'Terraform state (`terraform.tfstate`) tracks real cloud infrastructure resource IDs. If two engineers run `terraform apply` simultaneously without state locking, race conditions will corrupt the state file or provision duplicate resources. Storing state in AWS S3 enables centralized remote team state, while DynamoDB provides automatic state locking (Write-Lock) so only one execution runs at a time.',
    keyConceptsToMention: ['terraform.tfstate corruption prevention', 'S3 remote backend', 'DynamoDB state locking table', 'Concurrent execution safety'],
    interviewTip: 'Highlight that storing state locally on laptop is a major security risk because plain-text state contains DB passwords and API tokens.'
  },
  {
    id: 'iq-tf-2',
    category: 'Terraform',
    level: 'Advanced',
    question: 'What is Configuration Drift in Terraform, and how do you detect and remediate it?',
    modelAnswer: 'Configuration Drift occurs when cloud resources are modified manually in the Web Console outside Terraform code. Running `terraform plan` compares the real-world infrastructure API state with the code definition and highlights drift. You remediate drift either by applying Terraform to overwrite manual changes or updating Terraform code to match manual changes.',
    keyConceptsToMention: ['terraform plan diff', 'Manual console edits vs code', 'State refresh', 'Import existing resources'],
    interviewTip: 'Mention using automated `terraform plan` CI cron jobs to alert teams on unexpected cloud console drift.'
  },

  // ===================== ANSIBLE =====================
  {
    id: 'iq-ansible-1',
    category: 'Ansible',
    level: 'Intermediate',
    question: 'Why is Ansible called "Agentless", and what does "Idempotency" mean in Ansible playbooks?',
    modelAnswer: 'Ansible is Agentless because it requires no background daemon or agent software on target managed nodes—it connects over standard SSH, executes Python modules, and cleans up. Idempotency means executing an Ansible playbook 1 time or 100 times produces identical target system state without side-effects or unintended changes.',
    keyConceptsToMention: ['Agentless SSH & Python execution', 'Idempotent state verification', 'No daemon management'],
    interviewTip: 'Contrast Ansible agentless SSH architecture with Puppet or Chef which require master-agent daemons.'
  },

  // ===================== AWS =====================
  {
    id: 'iq-aws-1',
    category: 'AWS',
    level: 'Intermediate',
    question: 'Walk me through designing a secure Multi-AZ AWS VPC architecture for a web application and database.',
    modelAnswer: 'Create a VPC with a `/16` CIDR. Divide it across 2 Availability Zones containing Public Subnets (connected to Internet Gateway) and Private Subnets (isolated behind NAT Gateways). Deploy Application Load Balancer in Public Subnets; deploy web servers in Auto Scaling Groups in Private Subnets; deploy RDS Multi-AZ Database in Private Subnets with no internet access. Enforce Security Group least privilege rules.',
    keyConceptsToMention: ['VPC /16 CIDR', 'Public vs Private Subnets', 'Internet Gateway vs NAT Gateway', 'Multi-AZ RDS & ALB', 'Security Groups'],
    interviewTip: 'Draw or explain the 3-tier architecture clearly (Public Web Tier -> Private App Tier -> Private DB Tier).'
  },
  {
    id: 'iq-aws-2',
    category: 'AWS',
    level: 'Beginner',
    question: 'Difference between AWS Security Groups and Network Access Control Lists (NACLs)?',
    modelAnswer: 'Security Groups act as stateful firewalls at the EC2 instance level; return traffic is automatically allowed. NACLs act as stateless firewalls at the Subnet level; both inbound and outbound rules must be explicitly defined.',
    keyConceptsToMention: ['Stateful (Instance level) vs Stateless (Subnet level)', 'Implicit return traffic vs explicit rules'],
    interviewTip: 'Stateful vs Stateless is the #1 keyword interviewers listen for when asking about AWS firewalls.'
  },

  // ===================== CI/CD =====================
  {
    id: 'iq-cicd-1',
    category: 'CI/CD',
    level: 'Intermediate',
    question: 'Why is it critical to build a Docker image ONCE in CI and deploy that exact same image across Dev, Staging, and Production?',
    modelAnswer: 'Building once guarantees Immutable Artifact environment parity. If you rebuild images per environment, subtle dependency updates or build SDK versions will introduce bugs in production that never occurred in staging testing.',
    keyConceptsToMention: ['Immutable Artifacts', 'Environment Parity', 'Git Commit SHA image tagging', 'Build once, deploy everywhere'],
    interviewTip: 'Tag your Docker images with Git Commit SHA (`myapp:${{ github.sha }}`) to guarantee traceability.'
  },

  // ===================== DEVSECOPS =====================
  {
    id: 'iq-sec-1',
    category: 'DevSecOps',
    level: 'Intermediate',
    question: 'What does "Shift Left" mean in DevSecOps, and what is the difference between SAST and DAST?',
    modelAnswer: 'Shift Left means integrating security checks earlier into the development lifecycle (CI pipeline) rather than right before release. SAST (Static Application Security Testing) inspects uncompiled source code for vulnerabilities (inside out); DAST (Dynamic Application Security Testing) attacks a running application externally to find runtime flaws (outside in).',
    keyConceptsToMention: ['Shift Left early testing', 'SAST = Static code analysis', 'DAST = Dynamic runtime testing', 'Container CVE scanning'],
    interviewTip: 'Mention Trivy or SonarQube as real-world automated tools integrated into CI pipelines.'
  },

  // ===================== SRE =====================
  {
    id: 'iq-sre-1',
    category: 'SRE',
    level: 'Advanced',
    question: 'Explain the difference between SLI, SLO, and SLA with a real-world example.',
    modelAnswer: 'SLI (Service Level Indicator) is the real-time metric measured (e.g., 99.95% of HTTP requests responded in under 200ms). SLO (Service Level Objective) is the internal team target agreed upon (e.g., maintain 99.9% uptime over a rolling 30-day window). SLA (Service Level Agreement) is the legal contract commitment with customers that incurs financial penalties or service credits if violated.',
    keyConceptsToMention: ['SLI = actual measurement', 'SLO = internal target goal', 'SLA = legal contract with penalties', 'Error Budget calculation'],
    interviewTip: 'Connect SLO to "Error Budget": if SLO is 99.9%, your Error Budget is 0.1% downtime that you can spend on risky new feature deployments.'
  },
  {
    id: 'iq-sre-2',
    category: 'SRE',
    level: 'Scenario',
    question: 'What happens when an engineering team exhausts their Error Budget for the month?',
    modelAnswer: 'According to SRE principles, exhausting the Error Budget freezes all new feature deployments. The entire engineering team redirects focus strictly to system stability, bug fixes, automated testing, and reliability refactoring until the Error Budget regenerates.',
    keyConceptsToMention: ['Feature deployment freeze', 'Shift focus to stability & bug fixes', 'Balancing innovation speed with uptime'],
    interviewTip: 'Emphasize that Error Budgets act as a data-driven contract between Product Managers and SREs.'
  }
];
