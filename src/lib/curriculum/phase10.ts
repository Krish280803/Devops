import { Phase } from '../types';

export const phase10: Phase = {
  id: 10,
  slug: 'ansible-automation',
  title: 'Phase 10: Configuration Management with Ansible',
  subtitle: 'Agentless Architecture, Inventory, Playbooks, Roles & Vault',
  description: 'Automate server provisioning, software installation, patch management, and configuration across hundreds of Linux nodes using Ansible agentless automation.',
  badge: 'Core Skill',
  iconName: 'Cpu',
  modules: [
    {
      id: 'p10-m1',
      title: 'Module 1: Ansible Agentless Architecture & Playbooks',
      description: 'Master SSH inventory control, idempotent playbooks, handlers, roles, and Ansible Vault.',
      lessons: [
        {
          id: 'p10-l1',
          title: 'Lesson 1: Agentless Architecture & Idempotent Playbooks',
          duration: '35 mins',
          concept: 'Ansible is an open-source configuration management tool. Unlike Puppet or Chef, Ansible is Agentless: it connects over standard SSH, executes Python modules on target nodes, and cleans up after itself.',
          whyItMatters: 'Manually SSHing into 50 servers to install updates or configure Nginx is slow and error-prone. Ansible guarantees identical server configurations idempotently.',
          analogy: 'Ansible is like sending a remote maintenance contractor with a exact checklist (Playbook) who uses standard keys (SSH) to inspect and update 50 apartment units.',
          architectureDiagram: `
Ansible Control Node ──(SSH Port 22)──► Web Server 1 & Web Server 2
          `,
          keyPrinciples: [
            'Agentless: Requires no daemon software installed on managed nodes (only SSH and Python).',
            'Idempotency: Running a playbook 1 time or 100 times produces identical system state.'
          ],
          commandExamples: [
            { command: 'ansible all -m ping -i inventory.ini', explanation: 'Run ad-hoc ping module test against inventory hosts.' },
            { command: 'ansible-playbook -i inventory.ini playbook.yml', explanation: 'Execute YAML playbook tasks.' }
          ],
          commonMistakes: ['Writing non-idempotent raw bash commands using `shell` module instead of built-in Ansible modules.'],
          troubleshooting: [{ issue: 'Host key checking failed', fix: 'Add `host_key_checking = False` in `ansible.cfg`.' }],
          interviewQuestions: [{ question: 'What does Idempotency mean in Ansible?', answer: 'Idempotency means an operation can be applied multiple times without changing the result beyond initial application.', level: 'Intermediate' }],
          quiz: [{ id: 'q10-1', question: 'Which protocol does Ansible use by default to manage Linux nodes?', options: ['SSH', 'HTTP'], correctAnswer: 0, explanation: 'Ansible uses SSH (Port 22).' }],
          practicalExercise: 'Write an Ansible inventory file with 2 hosts and run `ansible all -m ping` ad-hoc command.'
        },
        {
          id: 'p10-l2',
          title: 'Lesson 2: Ansible Roles, Handlers & Vault Encryption',
          duration: '40 mins',
          concept: 'Ansible Roles structure automation into reusable tasks, handlers, templates, and vars. Handlers trigger actions on state changes. Vault encrypts secrets.',
          whyItMatters: 'Ansible Vault prevents plain-text passwords from being exposed in version control.',
          analogy: 'Ansible Vault is a locked biometric safe storing confidential server keys.',
          architectureDiagram: `
Playbook ──► Triggers Task Change ──► Notifies Handler ──► Restarts Nginx Service
          `,
          keyPrinciples: [
            'Handlers: Triggered only when notified by tasks that make a system change.',
            'Ansible Vault: Encrypts variable files with AES-256 password protection.'
          ],
          commandExamples: [
            { command: 'ansible-vault encrypt secret_vars.yml', explanation: 'Encrypt sensitive variables file.' },
            { command: 'ansible-galaxy init nginx_role', explanation: 'Scaffold standard Ansible Role directory.' }
          ],
          commonMistakes: ['Storing unencrypted secret keys in public playbook repositories.'],
          troubleshooting: [{ issue: 'Decryption failed for vault file', fix: 'Provide correct `--vault-password-file` or input password.' }],
          interviewQuestions: [{ question: 'What are Ansible Handlers?', answer: 'Tasks triggered only when notified by another task that performed a state change (e.g., restarting Nginx).', level: 'Intermediate' }],
          quiz: [{ id: 'q10-l2-1', question: 'What tool encrypts Ansible variable files using AES-256?', options: ['Ansible Vault', 'Ansible Lock'], correctAnswer: 0, explanation: '`ansible-vault` encrypts variable files.' }],
          practicalExercise: 'Encrypt a test variable file using `ansible-vault encrypt`.'
        }
      ]
    }
  ]
};
