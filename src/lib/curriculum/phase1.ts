import { Phase } from '../types';

export const phase1: Phase = {
  id: 1,
  slug: 'linux-fundamentals',
  title: 'Phase 1: Linux Administration & Shell Mastery',
  subtitle: 'Kernel, Filesystem, Permissions, Processes, systemd & SSH',
  description: 'Master the backbone operating system of cloud infrastructure. Learn file manipulation, user management, process management, systemd services, networking tools, and SSH.',
  badge: 'Core Skill',
  iconName: 'Terminal',
  modules: [
    {
      id: 'p1-m1',
      title: 'Module 1: Linux Architecture & Command Line Mastery',
      description: 'Explore Linux directory hierarchy, navigation, permissions, and file management.',
      lessons: [
        {
          id: 'p1-l1',
          title: 'Lesson 1: Linux Architecture & Filesystem Hierarchy',
          duration: '25 mins',
          concept: 'Linux is a Unix-like open-source OS structured into Kernel, Shell, System Libraries, and User Space. Everything in Linux is treated as a file or a process.',
          whyItMatters: 'Over 90% of cloud servers (AWS EC2, Kubernetes nodes, Docker containers) run Linux. Command line fluency is non-negotiable for DevOps.',
          analogy: 'The Kernel is the engine room of a ship; the Shell (Bash/Zsh) is the captain giving verbal orders to the engine room.',
          architectureDiagram: `
┌─────────────────────────────────────────────────────────────┐
│                    User / Applications                      │
├─────────────────────────────────────────────────────────────┤
│                    Shell (Bash, Zsh, Sh)                    │
├─────────────────────────────────────────────────────────────┤
│                    Kernel (OS Core)                         │
├─────────────────────────────────────────────────────────────┤
│                    Hardware (CPU, RAM, Disk)                │
└─────────────────────────────────────────────────────────────┘
          `,
          keyPrinciples: [
            'Filesystem Hierarchy Standard (FHS): /etc (configs), /var (logs), /home (users), /usr (binaries).',
            'Absolute paths start from root (/var/log/syslog), relative paths start from current directory (./syslog).'
          ],
          commandExamples: [
            { command: 'pwd', explanation: 'Print current working directory path.' },
            { command: 'ls -la /var/log', explanation: 'List all files including hidden ones with size, permissions, and timestamps.' },
            { command: 'mkdir -p /tmp/devops/labs', explanation: 'Create directory path recursively.' },
            { command: 'grep -rn "ERROR" /var/log/nginx/', explanation: 'Recursively search for string ERROR with line numbers.' }
          ],
          commonMistakes: [
            'Running `rm -rf /` or deleting files without checking active path.',
            'Confusing relative paths with absolute paths.'
          ],
          troubleshooting: [
            { issue: 'Command not found error', fix: 'Verify binary location using `which <cmd>` and check `$PATH` variable.' }
          ],
          interviewQuestions: [
            { question: 'What is the difference between `/etc`, `/var`, and `/opt` in Linux?', answer: '`/etc` holds configuration files; `/var` stores variable data like logs/queues; `/opt` hosts third-party software packages.', level: 'Beginner' }
          ],
          quiz: [
            {
              id: 'q1-1',
              question: 'Which directory contains system-wide configuration files in Linux?',
              options: ['/var', '/etc', '/bin', '/usr'],
              correctAnswer: 1,
              explanation: '`/etc` contains system configurations such as network settings, SSH config, and user accounts.'
            }
          ],
          practicalExercise: 'Open your terminal, navigate to `/tmp`, create a folder named `devops-lab`, and list its contents with `ls -la`.'
        },
        {
          id: 'p1-l2',
          title: 'Lesson 2: Permissions, Ownership & Process Management',
          duration: '30 mins',
          concept: 'Linux enforces security using user permissions (Read, Write, Execute for Owner, Group, Others) and process signals (SIGTERM, SIGKILL).',
          whyItMatters: 'Incorrect permissions lead to security breaches or application failures (e.g. `Permission denied` on SSH key files or web server roots).',
          analogy: 'Permissions are like keycard access levels in a hotel: guests can enter their room (Read/Write), staff can enter utility rooms, but only security admins have root master keys.',
          architectureDiagram: `
File Permission String: -rwxr-xr--
- : Regular File
rwx : Owner (Read=4, Write=2, Execute=1 = 7)
r-x : Group (Read=4, Write=0, Execute=1 = 5)
r-- : Others (Read=4, Write=0, Execute=1 = 4)
Numeric representation: 754
          `,
          keyPrinciples: [
            'chmod: Modify file access permissions (e.g., `chmod 600 id_rsa`).',
            'chown: Change file user and group owner (`chown -R nginx:nginx /var/www/html`).',
            'ps / top / htop: Monitor process CPU, memory, PID.',
            'systemctl: Manage systemd daemon services (start, stop, restart, status, enable).'
          ],
          commandExamples: [
            { command: 'chmod 400 ~/.ssh/id_rsa', explanation: 'Set SSH private key permissions to read-only by owner.' },
            { command: 'chown -R www-data:www-data /var/www/app', explanation: 'Change directory ownership to web server daemon user.' },
            { command: 'ps aux | grep node', explanation: 'List all running processes matching name node.' },
            { command: 'sudo systemctl restart nginx', explanation: 'Restart Nginx web server systemd service.' }
          ],
          commonMistakes: [
            'Running `chmod 777` on sensitive production directories.',
            'Using `kill -9` (SIGKILL) before trying `kill -15` (SIGTERM), leaving corrupt socket files.'
          ],
          troubleshooting: [
            { issue: 'SSH key permission denied (too open)', fix: 'Execute `chmod 600 ~/.ssh/id_rsa` to restrict read permissions.' },
            { issue: 'Port 80 already in use when starting server', fix: 'Find PID with `sudo netstat -tulpn | grep :80` or `sudo lsof -i :80` and stop matching process.' }
          ],
          interviewQuestions: [
            { question: 'What does `chmod 755 script.sh` do?', answer: 'Gives Read, Write, and Execute (7) to Owner, and Read and Execute (5) to Group and Others.', level: 'Beginner' }
          ],
          quiz: [
            {
              id: 'q1-l2-1',
              question: 'What is the octal permission code for read and write only by owner?',
              options: ['777', '600', '755', '644'],
              correctAnswer: 1,
              explanation: 'Owner Read(4)+Write(2)=6, Group=0, Others=0. Result is 600.'
            }
          ],
          practicalExercise: 'Create a shell script file `test.sh`, set permission to 755 using `chmod`, and run `ls -l` to verify.'
        }
      ]
    }
  ]
};
