import { Phase } from '../types';

export const phase11: Phase = {
  id: 11,
  slug: 'cloud-aws',
  title: 'Phase 11: Cloud Computing & AWS Architecture',
  subtitle: 'EC2, S3, IAM, VPC, ALB, Auto Scaling, RDS, EKS & CloudWatch',
  description: 'Master Amazon Web Services (AWS) infrastructure architecture, secure network design, IAM security, managed Kubernetes (EKS), and cloud storage.',
  badge: 'High Priority',
  iconName: 'Cloud',
  modules: [
    {
      id: 'p11-m1',
      title: 'Module 1: AWS VPC, Computing & Storage Architecture',
      description: 'Master Virtual Private Cloud (VPC), EC2 instances, S3 bucket security, IAM roles, and Load Balancing.',
      lessons: [
        {
          id: 'p11-l1',
          title: 'Lesson 1: AWS VPC Networking & Elastic Compute Cloud (EC2)',
          duration: '40 mins',
          concept: 'AWS provides scalable cloud computing resources. A Virtual Private Cloud (VPC) is an isolated virtual network containing Public Subnets (connected to Internet Gateway) and Private Subnets (isolated behind NAT Gateway).',
          whyItMatters: 'Designing a secure multi-AZ cloud architecture ensures 99.99% high availability and prevents unauthorized access to core databases.',
          analogy: 'AWS VPC is an entire gated office park; Public Subnets are reception lobbies; Private Subnets are secure vault rooms.',
          architectureDiagram: `
VPC (10.0.0.0/16) ──► Public Subnet (ALB / IGW) ──► Private Subnet (App EC2 / NAT) ──► Private Subnet (RDS DB)
          `,
          keyPrinciples: [
            'IAM Least Privilege: Grant minimum required IAM policy permissions.',
            'Multi-AZ High Availability: Spread EC2 instances across at least 2 Availability Zones behind an Application Load Balancer.'
          ],
          commandExamples: [
            { command: 'aws ec2 describe-instances --region us-east-1', explanation: 'Query AWS API for running EC2 instance metadata.' },
            { command: 'aws sts get-caller-identity', explanation: 'Verify current IAM user/role session identity.' }
          ],
          commonMistakes: ['Placing database servers directly in public subnets with 0.0.0.0/0 inbound access.'],
          troubleshooting: [{ issue: 'Unable to connect to EC2 via SSH', fix: 'Check Security Group inbound rule for port 22 and verify Elastic IP.' }],
          interviewQuestions: [{ question: 'Difference between Stateful Security Groups and Stateless NACLs?', answer: 'Security Groups automatically allow return traffic statefully; NACLs check both inbound and outbound rules statelessly.', level: 'Intermediate' }],
          quiz: [{ id: 'q11-1', question: 'Which AWS service routes incoming web traffic across multiple EC2 instances?', options: ['Application Load Balancer (ALB)', 'Route 53'], correctAnswer: 0, explanation: 'ALB operates at Layer 7 distributing HTTP/HTTPS traffic.' }],
          practicalExercise: 'Run `aws sts get-caller-identity` using AWS CLI to inspect your local credential profile.'
        },
        {
          id: 'p11-l2',
          title: 'Lesson 2: S3 Object Storage, IAM Roles & Managed EKS Kubernetes',
          duration: '45 mins',
          concept: 'Amazon S3 provides highly durable object storage. IAM Roles grant temporary permissions to EC2/EKS without hardcoded credentials. Amazon EKS manages Kubernetes Control Plane.',
          whyItMatters: 'Attaching IAM Roles to EC2/EKS pods eliminates exposed hardcoded AWS credentials in code repositories.',
          analogy: 'IAM Role is a temporary security badge given to a visitor for 1 hour, which auto-expires.',
          architectureDiagram: `
EC2 Instance / EKS Pod ──(Instance Profile / OIDC)──► Temporary IAM Credentials ──► Access AWS S3 Bucket
          `,
          keyPrinciples: [
            'S3 Durability: 99.999999999% (11 9s) object durability.',
            'IAM Roles for Service Accounts (IRSA): Binds Kubernetes ServiceAccounts to AWS IAM Roles via OIDC.'
          ],
          commandExamples: [
            { command: 'aws s3 ls', explanation: 'List S3 buckets in AWS account.' },
            { command: 'aws eks update-kubeconfig --name prod-eks', explanation: 'Download EKS cluster kubeconfig.' }
          ],
          commonMistakes: ['Creating public S3 buckets containing confidential customer data.'],
          troubleshooting: [{ issue: 'AccessDenied error calling S3 API', fix: 'Check IAM Role policy statement for `s3:GetObject` and `s3:PutObject` permissions.' }],
          interviewQuestions: [{ question: 'Why use IAM Roles instead of hardcoded AWS Access Keys?', answer: 'IAM Roles issue short-lived temporary credentials automatically, eliminating secret leak risks.', level: 'Intermediate' }],
          quiz: [{ id: 'q11-l2-1', question: 'Which AWS service provides object storage with 11 9s durability?', options: ['Amazon S3', 'Amazon EBS'], correctAnswer: 0, explanation: 'Amazon S3 provides 11 9s of object storage durability.' }],
          practicalExercise: 'Create a private S3 bucket using AWS CLI `aws s3 mb s3://my-test-bucket-123`.'
        }
      ]
    }
  ]
};
