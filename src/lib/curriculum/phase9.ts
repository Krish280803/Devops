import { Phase } from '../types';

export const phase9: Phase = {
  id: 9,
  slug: 'terraform-iac',
  title: 'Phase 9: Infrastructure as Code (IaC) with Terraform',
  subtitle: 'Providers, Resources, Variables, Modules, State & Remote Backends',
  description: 'Automate infrastructure provisioning across AWS, GCP, and Azure using HashiCorp Terraform declarative configuration.',
  badge: 'Core Skill',
  iconName: 'Layers',
  modules: [
    {
      id: 'p9-m1',
      title: 'Module 1: Terraform Core Workflow & State Management',
      description: 'Master HCL syntax, plan, apply, modules, and S3 remote state locking.',
      lessons: [
        {
          id: 'p9-l1',
          title: 'Lesson 1: Declarative IaC & Terraform Execution Lifecycle',
          duration: '35 mins',
          concept: 'Infrastructure as Code (IaC) allows engineers to define cloud resources (servers, VPCs, databases) in version-controlled text files. Terraform reads desired state and calculates changes.',
          whyItMatters: 'Manual cloud console provisioning leads to configuration drift, human error, and slow disaster recovery. IaC enables reproducible automated cloud infrastructure.',
          analogy: 'Manual Console click-ops is baking a cake by memory; Terraform IaC is a precise written recipe that guarantees identical cakes every time.',
          architectureDiagram: `
Terraform Code (.tf) ──(terraform plan)──► Execution Diff ──(terraform apply)──► Cloud APIs
          `,
          keyPrinciples: [
            'Declarative vs Imperative: Specify WHAT infrastructure you want; Terraform figures out HOW.',
            'Terraform State (tfstate): Maps code definitions to real-world cloud resource IDs.'
          ],
          commandExamples: [
            { command: 'terraform init', explanation: 'Initialize working directory and download provider plugins.' },
            { command: 'terraform plan', explanation: 'Preview execution plan changes before modifying infrastructure.' }
          ],
          commonMistakes: ['Committing `terraform.tfstate` file containing plain-text secrets into public Git repos.'],
          troubleshooting: [{ issue: 'Error locking state in DynamoDB', fix: 'Force unlock with `terraform force-unlock <lock-id>`.' }],
          interviewQuestions: [{ question: 'What is Configuration Drift in Terraform?', answer: 'Drift occurs when physical cloud resources are changed manually outside Terraform code.', level: 'Intermediate' }],
          quiz: [{ id: 'q9-1', question: 'Which command previews planned infrastructure changes without modifying cloud resources?', options: ['terraform plan', 'terraform apply'], correctAnswer: 0, explanation: '`terraform plan` generates execution diff preview.' }],
          practicalExercise: 'Write a `main.tf` file that provisions a local file using `local_file` resource and run `terraform apply`.'
        },
        {
          id: 'p9-l2',
          title: 'Lesson 2: Modules, Remote State Backends & Workspaces',
          duration: '40 mins',
          concept: 'Terraform Modules group resources into reusable blueprints. S3 remote backends with DynamoDB locking enable team collaboration. Workspaces isolate environments.',
          whyItMatters: 'Modules eliminate DRY (Don\'t Repeat Yourself) code duplication across Dev, Staging, and Production.',
          analogy: 'Terraform Modules are pre-fabricated housing blueprints reused to build 50 identical suburban homes.',
          architectureDiagram: `
Terraform Code ──► S3 Remote State Bucket (Storage) + DynamoDB Table (Write-Lock)
          `,
          keyPrinciples: [
            'Remote Backends store `terraform.tfstate` centrally in AWS S3.',
            'DynamoDB tables enforce state locking to prevent concurrent apply collisions.'
          ],
          commandExamples: [
            { command: 'terraform workspace select production', explanation: 'Switch active Terraform environment workspace.' },
            { command: 'terraform state list', explanation: 'List all resources tracked in state file.' }
          ],
          commonMistakes: ['Hardcoding environment variables inside shared module definitions.'],
          troubleshooting: [{ issue: 'Resource already exists error during apply', fix: 'Import pre-existing cloud resource into state using `terraform import`.' }],
          interviewQuestions: [{ question: 'Why use S3 + DynamoDB for Terraform state in team setups?', answer: 'S3 provides remote state storage; DynamoDB handles write-locks to prevent race conditions.', level: 'Intermediate' }],
          quiz: [{ id: 'q9-l2-1', question: 'What database service provides state locking for AWS S3 remote backend?', options: ['DynamoDB', 'PostgreSQL'], correctAnswer: 0, explanation: 'DynamoDB provides state locking for S3 backend.' }],
          practicalExercise: 'Configure an S3 backend block with DynamoDB state locking in `main.tf`.'
        }
      ]
    }
  ]
};
