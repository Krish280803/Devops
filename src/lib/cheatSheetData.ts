import { CheatSheet } from './types';

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    id: 'linux',
    title: 'Linux Administration Cheat Sheet',
    description: 'Essential commands for system navigation, process management, permissions, and service control.',
    items: [
      { command: 'ls -la /var/log', purpose: 'List all files including hidden ones with permissions and sizes', example: 'ls -la /var/log', category: 'Navigation' },
      { command: 'grep -rn "ERROR" /var/log/', purpose: 'Search recursively for string pattern with line numbers', example: 'grep -rn "ERROR" /var/log/nginx/', category: 'Search' },
      { command: 'chmod 755 file', purpose: 'Set file permissions (rwx for owner, rx for group/others)', example: 'chmod +x deploy.sh', category: 'Permissions' },
      { command: 'chmod 600 ~/.ssh/id_rsa', purpose: 'Set read/write permissions for file owner only', example: 'chmod 600 ~/.ssh/id_rsa', category: 'Permissions' },
      { command: 'chown user:group file', purpose: 'Change file owner and group assignment', example: 'chown -R www-data:www-data /var/www', category: 'Permissions' },
      { command: 'ps aux | grep node', purpose: 'List running processes matching string node', example: 'ps aux | grep node', category: 'Processes' },
      { command: 'top / htop', purpose: 'Interactive real-time process monitoring for CPU and RAM', example: 'htop', category: 'Processes' },
      { command: 'kill -15 PID', purpose: 'Send graceful SIGTERM signal to stop process', example: 'kill -15 4821', category: 'Processes' },
      { command: 'kill -9 PID', purpose: 'Send forced SIGKILL signal to immediately stop process', example: 'kill -9 4821', category: 'Processes' },
      { command: 'systemctl status service', purpose: 'Check operational status of a systemd daemon service', example: 'systemctl status nginx', category: 'Systemd' },
      { command: 'systemctl restart service', purpose: 'Restart a systemd service daemon', example: 'sudo systemctl restart nginx', category: 'Systemd' },
      { command: 'journalctl -u service -f', purpose: 'Stream live logs for a specific systemd daemon', example: 'journalctl -u docker -f', category: 'Logging' },
      { command: 'df -h', purpose: 'Display disk space usage in human readable format', example: 'df -h', category: 'Monitoring' },
      { command: 'free -m', purpose: 'Show memory (RAM) usage in megabytes', example: 'free -m', category: 'Monitoring' },
      { command: 'du -sh *', purpose: 'Display total size of directories in current path', example: 'du -sh /var/log/*', category: 'Monitoring' }
    ]
  },
  {
    id: 'git',
    title: 'Git & GitHub Workflow Cheat Sheet',
    description: 'Version control commands for staging, committing, branching, rebasing, and remote synchronization.',
    items: [
      { command: 'git checkout -b feature/auth', purpose: 'Create and immediately switch to a new branch', example: 'git checkout -b feature/auth', category: 'Branching' },
      { command: 'git add -p', purpose: 'Interactively review and stage code hunks', example: 'git add -p', category: 'Staging' },
      { command: 'git commit -m "msg"', purpose: 'Create snapshot commit with concise commit message', example: 'git commit -m "fix(api): resolve timeout"', category: 'Commits' },
      { command: 'git rebase main', purpose: 'Re-apply local feature commits on top of updated main branch', example: 'git rebase main', category: 'Branching' },
      { command: 'git stash / git stash pop', purpose: 'Temporarily shelve uncommitted work and restore later', example: 'git stash && git pull', category: 'Utility' },
      { command: 'git cherry-pick <commit-id>', purpose: 'Apply specific single commit from another branch', example: 'git cherry-pick 4a12b3c', category: 'Utility' },
      { command: 'git reset --soft HEAD~1', purpose: 'Undo last commit while keeping changes staged', example: 'git reset --soft HEAD~1', category: 'Commits' },
      { command: 'git reset --hard HEAD~1', purpose: 'Discard last commit and all uncommitted modifications', example: 'git reset --hard HEAD~1', category: 'Commits' },
      { command: 'git revert <commit-id>', purpose: 'Create inverse commit to safely undo previous change', example: 'git revert 8f2910a', category: 'Commits' },
      { command: 'git reflog', purpose: 'View history of all HEAD movements to recover deleted commits', example: 'git reflog', category: 'Recovery' },
      { command: 'git log --oneline --graph', purpose: 'View clean visual DAG commit history', example: 'git log --oneline --graph --all', category: 'History' },
      { command: 'git tag -a v1.0.0 -m "Release"', purpose: 'Create annotated version tag', example: 'git tag -a v1.0.0 -m "Release v1.0.0"', category: 'Releases' }
    ]
  },
  {
    id: 'docker',
    title: 'Docker & Containerization Cheat Sheet',
    description: 'CLI reference for container operations, image building, volume mounts, and Docker Compose.',
    items: [
      { command: 'docker build -t name:tag .', purpose: 'Build Docker image from current directory Dockerfile', example: 'docker build -t app:v1.0 .', category: 'Images' },
      { command: 'docker run -d -p host:cnt app', purpose: 'Run container detached with port mapping', example: 'docker run -d -p 8080:80 nginx', category: 'Containers' },
      { command: 'docker exec -it ID sh', purpose: 'Open interactive terminal shell inside running container', example: 'docker exec -it 4a12b3 sh', category: 'Debugging' },
      { command: 'docker logs -f --tail 100 ID', purpose: 'Stream recent container log stdout', example: 'docker logs -f --tail 100 web-app', category: 'Debugging' },
      { command: 'docker inspect ID', purpose: 'View detailed JSON metadata, IP address, and mounts', example: 'docker inspect web-app', category: 'Debugging' },
      { command: 'docker ps -a', purpose: 'List all containers including stopped ones', example: 'docker ps -a', category: 'Containers' },
      { command: 'docker system prune -af', purpose: 'Remove unused containers, images, and networks to free disk', example: 'docker system prune -af --volumes', category: 'Cleanup' },
      { command: 'docker compose up -d', purpose: 'Start multi-container application stack in background', example: 'docker compose up -d --build', category: 'Compose' },
      { command: 'docker compose down -v', purpose: 'Stop multi-container stack and remove named volumes', example: 'docker compose down -v', category: 'Compose' },
      { command: 'docker volume ls', purpose: 'List named Docker volumes on host', example: 'docker volume ls', category: 'Volumes' }
    ]
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes (kubectl) Cheat Sheet',
    description: 'Essential commands for cluster management, pod inspection, deployments, services, and logs.',
    items: [
      { command: 'kubectl get pods -A', purpose: 'List all running pods across all cluster namespaces', example: 'kubectl get pods -n kube-system', category: 'Cluster Info' },
      { command: 'kubectl apply -f file.yaml', purpose: 'Declaratively apply YAML workload specification', example: 'kubectl apply -f deployment.yaml', category: 'Workloads' },
      { command: 'kubectl describe pod ID', purpose: 'Inspect detailed pod events, probes, and failures', example: 'kubectl describe pod web-7d9b', category: 'Debugging' },
      { command: 'kubectl logs -f deployment/app', purpose: 'Stream logs from all container instances in a deployment', example: 'kubectl logs -f deployment/backend', category: 'Logging' },
      { command: 'kubectl logs pod --previous', purpose: 'View logs from container BEFORE it crashed/restarted', example: 'kubectl logs web-app --previous', category: 'Logging' },
      { command: 'kubectl exec -it pod -- sh', purpose: 'Execute interactive shell inside pod container', example: 'kubectl exec -it web-123 -- sh', category: 'Debugging' },
      { command: 'kubectl scale deployment name --replicas=N', purpose: 'Scale replica count of a deployment', example: 'kubectl scale deployment web --replicas=5', category: 'Scaling' },
      { command: 'kubectl rollout undo deployment/name', purpose: 'Rollback deployment to previous revision instantly', example: 'kubectl rollout undo deployment/web', category: 'Deployments' },
      { command: 'kubectl port-forward pod/name 8080:80', purpose: 'Forward local port directly to cluster pod', example: 'kubectl port-forward pod/web-1 8080:80', category: 'Networking' },
      { command: 'kubectl get nodes -o wide', purpose: 'List worker nodes with IPs and kernel versions', example: 'kubectl get nodes -o wide', category: 'Cluster Info' }
    ]
  },
  {
    id: 'terraform',
    title: 'Terraform & IaC Cheat Sheet',
    description: 'Commands for IaC initialization, planning, applying, state management, and debugging.',
    items: [
      { command: 'terraform init', purpose: 'Initialize working directory and download provider binaries', example: 'terraform init -upgrade', category: 'Workflow' },
      { command: 'terraform plan', purpose: 'Preview execution diff without modifying real resources', example: 'terraform plan -out=tfplan', category: 'Workflow' },
      { command: 'terraform apply', purpose: 'Apply infrastructure modifications previewed in plan', example: 'terraform apply -auto-approve', category: 'Workflow' },
      { command: 'terraform destroy', purpose: 'Tear down and permanently delete managed resources', example: 'terraform destroy', category: 'Workflow' },
      { command: 'terraform fmt', purpose: 'Format HCL code files to canonical style rules', example: 'terraform fmt -recursive', category: 'Code Quality' },
      { command: 'terraform validate', purpose: 'Check HCL code syntax and variable consistency', example: 'terraform validate', category: 'Code Quality' },
      { command: 'terraform state list', purpose: 'List all tracked cloud resources inside state file', example: 'terraform state list', category: 'State' },
      { command: 'terraform import <res.name> <id>', purpose: 'Import pre-existing unmanaged cloud resource into state', example: 'terraform import aws_s3_bucket.data my-bucket', category: 'State' },
      { command: 'terraform force-unlock <LOCK-ID>', purpose: 'Force unlock stuck DynamoDB state lock', example: 'terraform force-unlock 1234-5678', category: 'State' },
      { command: 'terraform output', purpose: 'Extract defined root module output values', example: 'terraform output vpc_id', category: 'Outputs' }
    ]
  },
  {
    id: 'ansible',
    title: 'Ansible Automation Cheat Sheet',
    description: 'CLI reference for inventory execution, ad-hoc modules, playbooks, and Vault encryption.',
    items: [
      { command: 'ansible all -m ping -i inventory.ini', purpose: 'Run ad-hoc ping module test against target hosts', example: 'ansible all -m ping -i inventory.ini', category: 'Ad-Hoc' },
      { command: 'ansible-playbook -i inv.ini site.yml', purpose: 'Execute YAML playbook tasks on inventory hosts', example: 'ansible-playbook -i hosts.ini site.yml', category: 'Playbooks' },
      { command: 'ansible-vault encrypt file.yml', purpose: 'Encrypt sensitive variables file with AES256', example: 'ansible-vault encrypt secret_vars.yml', category: 'Vault' },
      { command: 'ansible-vault edit file.yml', purpose: 'Edit encrypted vault file in-place', example: 'ansible-vault edit secret_vars.yml', category: 'Vault' },
      { command: 'ansible-galaxy init role_name', purpose: 'Scaffold standard Ansible Role folder structure', example: 'ansible-galaxy init nginx_role', category: 'Roles' }
    ]
  },
  {
    id: 'aws',
    title: 'AWS CLI Cheat Sheet',
    description: 'Commands for querying AWS resources, EC2 instances, S3 storage, and STS authentication.',
    items: [
      { command: 'aws sts get-caller-identity', purpose: 'Verify current IAM user/role identity and account ID', example: 'aws sts get-caller-identity', category: 'Auth' },
      { command: 'aws s3 ls', purpose: 'List all S3 storage buckets in account', example: 'aws s3 ls', category: 'S3' },
      { command: 'aws s3 cp file s3://bucket/', purpose: 'Upload local file to S3 storage bucket', example: 'aws s3 cp app.tar.gz s3://my-backup-bucket/', category: 'S3' },
      { command: 'aws ec2 describe-instances', purpose: 'Query EC2 instance status, IP addresses, and state', example: 'aws ec2 describe-instances --region us-east-1', category: 'EC2' },
      { command: 'aws eks update-kubeconfig', purpose: 'Download Kubernetes cluster credentials into local `~/.kube/config`', example: 'aws eks update-kubeconfig --name prod-eks --region us-east-1', category: 'EKS' }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & Diagnostics Cheat Sheet',
    description: 'CLI utilities for testing connectivity, DNS resolution, port listening, and HTTP headers.',
    items: [
      { command: 'dig +short A domain.com', purpose: 'Query DNS server for IPv4 address records', example: 'dig +short A github.com', category: 'DNS' },
      { command: 'curl -v https://domain.com', purpose: 'Inspect HTTP request/response headers and TLS handshake', example: 'curl -v https://httpbin.org/get', category: 'HTTP' },
      { command: 'traceroute 8.8.8.8', purpose: 'Trace router hop path packets travel to target IP', example: 'traceroute 8.8.8.8', category: 'Routing' },
      { command: 'sudo lsof -i :8080', purpose: 'List PID and process listening on specified network port', example: 'sudo lsof -i :8080', category: 'Ports' },
      { command: 'sudo netstat -tulpn', purpose: 'Display all listening TCP/UDP sockets and PIDs', example: 'sudo netstat -tulpn', category: 'Ports' }
    ]
  },
  {
    id: 'devsecops',
    title: 'DevSecOps & Security Tools Cheat Sheet',
    description: 'Commands for container CVE scanning, secret detection, and image signing.',
    items: [
      { command: 'trivy image name:tag', purpose: 'Scan container image for OS and package CVE vulnerabilities', example: 'trivy image nginx:1.25-alpine', category: 'Vulnerability Scanning' },
      { command: 'trivy config .', purpose: 'Scan local IaC files (Terraform/Docker) for security misconfigurations', example: 'trivy config .', category: 'IaC Security' },
      { command: 'gitleaks detect --verbose', purpose: 'Scan git commit history for committed secrets and API keys', example: 'gitleaks detect --verbose', category: 'Secret Scanning' },
      { command: 'cosign verify --key key.pub image', purpose: 'Verify cryptographic signature of a container image', example: 'cosign verify --key cosign.pub myrepo/app:1.0', category: 'Supply Chain' }
    ]
  }
];
