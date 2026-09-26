import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, userPrompt, category, errorLog, interviewQuestion } = body;

    // 1. AI Tutor Q&A Mode
    if (mode === 'tutor') {
      const response = `
### 🤖 AI DevOps Mentor Explanation

Great question! Let's break down your question:

**Concept Breakdown:**
${userPrompt}

* **Why this matters in production:** In cloud environments, staying consistent prevents deployment outages and reduces mean time to recovery (MTTR).
* **Key Command to remember:**
\`\`\`bash
# Diagnostic command
curl -v https://httpbin.org/status/200
\`\`\`
* **Pro Tip:** Always check system logs (\`journalctl -u service\`) before making configuration changes.
`;
      return NextResponse.json({ reply: response });
    }

    // 2. DevOps Error Troubleshooter Mode
    if (mode === 'troubleshoot') {
      const logText = (errorLog || userPrompt || '').toLowerCase();
      let rootCause = 'Resource Allocation or Configuration Mismatch';
      let whyOccurred = 'The system encountered an unhandled execution exception or network socket binding failure.';
      let fixCommands = `
# 1. Inspect process and network ports
sudo netstat -tulpn || sudo lsof -i

# 2. Check system daemon logs
journalctl -xe --no-pager | tail -50
`;

      if (logText.includes('oomkilled') || logText.includes('137') || logText.includes('out of memory')) {
        rootCause = 'Kernel OOMKilled (Exit Code 137)';
        whyOccurred = 'The container/process exceeded its assigned memory resource limits, forcing the Linux Kernel OOM killer to terminate PID 1.';
        fixCommands = `
# Inspect pod events & memory limit breaches
kubectl describe pod <pod-name> -n production

# View logs prior to container termination
kubectl logs <pod-name> --previous

# Increase memory limit in deployment manifest:
# resources:
#   limits:
#     memory: "512Mi"
`;
      } else if (logText.includes('permission denied') && logText.includes('docker.sock')) {
        rootCause = 'Docker Daemon Socket Permission Denied';
        whyOccurred = 'The current Linux user does not belong to the docker user group and lacks write access to /var/run/docker.sock.';
        fixCommands = `
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply new group membership (or re-login)
newgrp docker

# Verify docker access without sudo
docker ps
`;
      } else if (logText.includes('state lock') || logText.includes('dynamodb')) {
        rootCause = 'Terraform State Lock Acquisition Conflict';
        whyOccurred = 'A previous Terraform pipeline run failed without releasing its DynamoDB write lock, or another engineer is currently running terraform apply.';
        fixCommands = `
# Verify if another pipeline is active. If confirmed stale, force unlock state:
terraform force-unlock <LOCK-ID>

# Re-run plan
terraform plan
`;
      } else if (logText.includes('permissions') && logText.includes('too open')) {
        rootCause = 'SSH Private Key Permissions Too Permissive';
        whyOccurred = 'SSH client rejects private key files with permissions broader than 600 (owner read/write only) to prevent unauthorized key leakage.';
        fixCommands = `
# Set strict read-only permissions for owner only
chmod 600 ~/.ssh/id_rsa

# Verify permissions
ls -l ~/.ssh/id_rsa
`;
      } else if (logText.includes('secret') || logText.includes('gitleaks') || logText.includes('aws_secret')) {
        rootCause = 'Security Gate Block: Hardcoded Secret Committed';
        whyOccurred = 'The pre-commit hook or CI pipeline detected plain-text API credentials or private keys in the Git diff payload.';
        fixCommands = `
# 1. IMMEDIATELY revoke AWS Secret Key in AWS IAM Console!
# 2. Remove file from git staging
git rm --cached <file-with-secret>

# 3. Purge commit history using BFG or filter-repo
git filter-repo --invert-paths --path <file-with-secret>
`;
      } else if (logText.includes('502 bad gateway') || logText.includes('connection refused')) {
        rootCause = 'Nginx 502 Bad Gateway / Upstream Connection Refused';
        whyOccurred = 'The Nginx reverse proxy cannot establish a socket connection to the upstream application service on port 8080/3000.';
        fixCommands = `
# Check if backend application service is listening
sudo lsof -i :8080

# Check backend systemd service status
sudo systemctl status backend-app

# Inspect Nginx error logs
sudo tail -50 /var/log/nginx/error.log
`;
      }

      const response = `
### 🛠️ AI Production Diagnostic Report

#### 🔍 1. Identified Root Cause
**${rootCause}**

#### ⚠️ 2. Why This Outage Occurred
${whyOccurred}

#### 💻 3. Terminal Fix Commands
\`\`\`bash
${fixCommands.trim()}
\`\`\`

#### 💡 4. Production Prevention Guardrails
* Add automated CI validation checks to catch configuration misconfigurations before deployment.
* Ensure monitoring dashboards (Prometheus/CloudWatch) alert on memory/CPU thresholds before outages occur.
`;
      return NextResponse.json({ reply: response });
    }

    // 3. Mock Interview Evaluator Mode
    if (mode === 'interview_eval') {
      const response = `
### 🎙️ AI Interview Feedback

**Score: 85 / 100** (Solid Technical Answer!)

#### ✅ What Was Correct
- You correctly identified the primary diagnostic commands.
- You explained the operational impact and recovery steps clearly.

#### ⚠️ Key Concepts to Strengthen
- Remember to explicitly mention checking system logs (journalctl / dmesg).
- Mention prevention guardrails (e.g. resource limits, automated monitoring).

#### 🌟 Model Interviewer Response
"${interviewQuestion?.modelAnswer || 'Always inspect system events, previous container logs, and check for resource limit breaches using describe and logs commands.'}"
`;
      return NextResponse.json({ reply: response });
    }

    return NextResponse.json({ reply: 'Mode not recognized.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal AI Server Error' }, { status: 500 });
  }
}
