import { Phase } from '../types';

export const phase4: Phase = {
  id: 4,
  slug: 'bash-scripting',
  title: 'Phase 4: Bash Scripting & Shell Automation',
  subtitle: 'Variables, Conditions, Loops, Functions, Exit Codes & Monitoring Scripts',
  description: 'Automate administrative tasks, server health checks, backup rotators, log cleanup, and deployment automation using Bash.',
  badge: 'Core Skill',
  iconName: 'Code',
  modules: [
    {
      id: 'p4-m1',
      title: 'Module 1: Bash Control Flow & Automation Scripts',
      description: 'Master variables, positional parameters, control loops, functions, and error handling.',
      lessons: [
        {
          id: 'p4-l1',
          title: 'Lesson 1: Bash Control Flow & Exit Codes',
          duration: '30 mins',
          concept: 'Bash scripting automates terminal commands. Every process in Linux returns an Exit Code (0 for success, non-zero 1-255 for error). `set -e` ensures scripts halt immediately on error.',
          whyItMatters: 'DevOps engineers use scripts for server bootstrap, CI/CD pipeline steps, log cleanup, and automated backups.',
          analogy: 'A Bash script is a macro recipe that performs 50 terminal commands automatically in exact sequence without typos.',
          architectureDiagram: `
Shebang (#!/bin/bash) ──► Strict Mode (set -euo pipefail) ──► Read Input Args ($1, $2)
          `,
          keyPrinciples: [
            'Shebang: `#!/bin/bash` defines script execution shell interpreter.',
            'Strict Execution: `set -euo pipefail` stops on error, unset variables, and pipe failures.'
          ],
          commandExamples: [
            { command: 'echo $?', explanation: 'Print exit code status of previous command.' },
            { command: 'chmod +x backup.sh', explanation: 'Make script executable.' }
          ],
          commonMistakes: ['Not quoting variables (`"$VAR"`), leading to word splitting bugs.'],
          troubleshooting: [{ issue: 'Syntax error: unexpected end of file', fix: 'Ensure all `if` blocks end with `fi`.' }],
          interviewQuestions: [{ question: 'What does `set -euo pipefail` do in Bash?', answer: '`-e` exits on error; `-u` treats unset vars as error; `-o pipefail` fails pipeline if sub-command fails.', level: 'Intermediate' }],
          quiz: [{ id: 'q4-1', question: 'Which exit code represents success in Linux?', options: ['0', '1'], correctAnswer: 0, explanation: 'Exit code 0 indicates success.' }],
          practicalExercise: 'Write a bash script that checks if `/var/log/syslog` exists, and prints total lines using `wc -l`.'
        },
        {
          id: 'p4-l2',
          title: 'Lesson 2: Loops, Functions, Trap Signals & Cron Automation',
          duration: '35 mins',
          concept: 'Functions structure script logic. Trap signals catch OS events for cleanup. Cron automates scheduled execution.',
          whyItMatters: 'Scheduling automated backups and log pruners via Cron keeps server disk space clean.',
          analogy: 'Cron is an alarm clock triggering automated maintenance routines every night at 2 AM.',
          architectureDiagram: `
Cron Daemon ──(Schedule 0 0 * * *)──► Execute monitor.sh ──► Send Alert Email
          `,
          keyPrinciples: [
            'Functions: Scoped reusable logic using `local var_name`.',
            'Trap Signals: `trap "cleanup" EXIT INT TERM` guarantees cleanup on exit.'
          ],
          commandExamples: [
            { command: 'crontab -e', explanation: 'Edit user cron job schedule file.' }
          ],
          commonMistakes: ['Forgetting relative path resolution inside cron jobs.'],
          troubleshooting: [{ issue: 'Cron job script fails silently', fix: 'Always use absolute executable paths inside scripts run by Cron.' }],
          interviewQuestions: [{ question: 'How do you catch SIGINT CTRL+C signal in Bash?', answer: 'Use `trap "cleanup_fn" INT` at the beginning of the script.', level: 'Intermediate' }],
          quiz: [{ id: 'q4-l2-1', question: 'What cron format runs a script every night at midnight?', options: ['0 0 * * *', '* * * * *'], correctAnswer: 0, explanation: '`0 0 * * *` specifies 0 minute, 0 hour (midnight).' }],
          practicalExercise: 'Create a cron entry `0 0 * * * /backup/backup.sh` using `crontab -e`.'
        }
      ]
    }
  ]
};
