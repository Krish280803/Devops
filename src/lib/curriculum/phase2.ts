import { Phase } from '../types';

export const phase2: Phase = {
  id: 2,
  slug: 'networking-fundamentals',
  title: 'Phase 2: Computer & Cloud Networking',
  subtitle: 'IP, Subnets, DNS, HTTP/HTTPS, TCP/UDP, Firewalls & Reverse Proxies',
  description: 'Master computer networking fundamentals required for configuring cloud networks (AWS VPC), load balancers, domain routing, and security groups.',
  badge: 'Core Skill',
  iconName: 'Network',
  modules: [
    {
      id: 'p2-m1',
      title: 'Module 1: IP Addressing, DNS & Reverse Proxies',
      description: 'Understand OSI layers, TCP vs UDP, CIDR notation, and domain routing.',
      lessons: [
        {
          id: 'p2-l1',
          title: 'Lesson 1: IP Addressing, Subnets & CIDR Notation',
          duration: '30 mins',
          concept: 'An IP address uniquely identifies a device on a network. IPv4 uses 32-bit dotted-decimal notation. Subnetting divides networks using CIDR notation (e.g. 10.0.0.0/16).',
          whyItMatters: 'Every Cloud Engineer must design Virtual Private Clouds (VPC), configure subnet masks, and manage security group rules.',
          analogy: 'An IP address is a postal mailing address; a Subnet CIDR is a zip code range defining a specific neighborhood.',
          architectureDiagram: `
CIDR Block: 10.0.0.0/16 (65,536 total IPs)
  ├── Public Subnet A:  10.0.1.0/24  (256 IPs - Web Servers / NAT Gateway)
  └── Private Subnet B: 10.0.2.0/24  (256 IPs - Databases / Internal APIs)
          `,
          keyPrinciples: [
            'Private IPv4 Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
            'CIDR Mask /24 = 255.255.255.0 (256 IP addresses total).'
          ],
          commandExamples: [
            { command: 'ping -c 4 google.com', explanation: 'Send ICMP echo packets to check network reachability.' },
            { command: 'dig +short A github.com', explanation: 'Query DNS server for IPv4 address records.' }
          ],
          commonMistakes: ['Creating overlapping CIDR ranges when connecting cloud VPCs.'],
          troubleshooting: [{ issue: 'Could not resolve host error', fix: 'Check `/etc/resolv.conf` DNS nameservers.' }],
          interviewQuestions: [{ question: 'How many usable IP addresses are in a `/24` subnet?', answer: '254 usable IPs (256 total minus network and broadcast).', level: 'Intermediate' }],
          quiz: [{ id: 'q2-1', question: 'Which IPv4 range is reserved for private networks?', options: ['10.0.0.0/8', '8.8.8.8/32'], correctAnswer: 0, explanation: '10.0.0.0/8 is reserved for RFC 1918 private networks.' }],
          practicalExercise: 'Run `dig google.com` in your terminal and find the IP address record returned by DNS.'
        },
        {
          id: 'p2-l2',
          title: 'Lesson 2: DNS Resolution, HTTP/HTTPS & Load Balancing',
          duration: '35 mins',
          concept: 'DNS maps human domain names to IP addresses. HTTP/HTTPS operates at Layer 7. Load Balancers distribute traffic across multiple target instances.',
          whyItMatters: 'Configuring custom domains, SSL/TLS certificates, and load balancing is required for high availability.',
          analogy: 'DNS is a phone directory; HTTPS is a sealed security envelope; Load Balancers are airport queue managers.',
          architectureDiagram: `
User Client ──► DNS Lookup (Port 53) ──► Load Balancer (Port 443) ──► Web Instances (Port 80)
          `,
          keyPrinciples: [
            'A Record maps hostname to IPv4; CNAME aliases domain to another hostname.',
            'SSL/TLS Termination offloads heavy encryption decryption at the Load Balancer edge.'
          ],
          commandExamples: [
            { command: 'curl -v https://httpbin.org/get', explanation: 'Inspect HTTP headers and SSL certificate handshake.' }
          ],
          commonMistakes: ['Exposing unencrypted HTTP databases to public networks.'],
          troubleshooting: [{ issue: 'SSL Certificate Expired alert', fix: 'Renew Let\'s Encrypt certificate via Certbot.' }],
          interviewQuestions: [{ question: 'Difference between L4 and L7 load balancing?', answer: 'L4 balances traffic at Transport IP/Port level; L7 balances based on HTTP path, host headers, and cookies.', level: 'Intermediate' }],
          quiz: [{ id: 'q2-l2-1', question: 'Which DNS record maps a domain directly to an IPv4 address?', options: ['A Record', 'CNAME Record'], correctAnswer: 0, explanation: 'A records map hostnames to IPv4 addresses.' }],
          practicalExercise: 'Execute `curl -I https://github.com` and inspect the HTTP 200 OK status code.'
        }
      ]
    }
  ]
};
