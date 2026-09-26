import { Phase, Lesson } from './types';
import { CURRICULUM_PHASES } from './curriculumData';

export function generateLessonNotes(lesson: Lesson): string {
  return `# ${lesson.title}
## Lesson Study Notes & Revision Guide (${lesson.duration})

### 1. Core Concept (Point-Wise)
${lesson.concept}

### 2. Why It Matters in Production
${lesson.whyItMatters}

### 3. Real-World Analogy
* ${lesson.analogy}

${lesson.architectureDiagram ? `### 4. Architecture & Workflow Diagram\n\`\`\`text\n${lesson.architectureDiagram.trim()}\n\`\`\`\n` : ''}

### 5. Key Architectural Principles
${lesson.keyPrinciples.map((kp) => `* ${kp}`).join('\n')}

### 6. Command & Syntax Reference
${lesson.commandExamples.map((c) => `* \`${c.command}\` — ${c.explanation}`).join('\n')}

${lesson.codeSnippet ? `### 7. Code Manifest (${lesson.codeSnippet.filename || 'Manifest'})\n\`\`\`${lesson.codeSnippet.language}\n${lesson.codeSnippet.code}\n\`\`\`\n` : ''}

### 8. Common Beginner Mistakes
${lesson.commonMistakes.map((cm) => `* ⚠️ ${cm}`).join('\n')}

### 9. Diagnostic Troubleshooting
${lesson.troubleshooting.map((t) => `* **Issue**: ${t.issue}\n  **Fix**: ${t.fix}`).join('\n')}

### 10. Interview Revision Points
${lesson.interviewQuestions.map((iq) => `* **[${iq.level}] Q**: ${iq.question}\n  **A**: ${iq.answer}`).join('\n')}
`;
}

export function generatePhaseNotes(phase: Phase): string {
  const lessons = phase.modules.flatMap((m) => m.lessons);

  return `# ${phase.title} — Complete Phase Master Notes
## ${phase.subtitle}
* **Level**: ${phase.badge}
* **Summary**: ${phase.description}

---

${lessons.map((lesson, idx) => `
## Topic ${idx + 1}: ${lesson.title}

### 📍 Definition & Core Concept
${lesson.concept}

### 💡 Why It Matters & Real-World Analogy
* **Production Value**: ${lesson.whyItMatters}
* **Analogy**: ${lesson.analogy}

${lesson.architectureDiagram ? `### 🏗️ Architecture Diagram\n\`\`\`text\n${lesson.architectureDiagram.trim()}\n\`\`\`\n` : ''}

### 🔑 Key Point-Wise Takeaways
${lesson.keyPrinciples.map((kp) => `* ${kp}`).join('\n')}

### 💻 Command & Syntax Cheat Sheet
${lesson.commandExamples.map((c) => `* \`${c.command}\` — ${c.explanation}`).join('\n')}

### ⚠️ Common Pitfalls & Mistakes
${lesson.commonMistakes.map((cm) => `* ${cm}`).join('\n')}

### 🎙️ Interview Key Questions
${lesson.interviewQuestions.map((iq) => `* **Q**: ${iq.question}\n  **A**: ${iq.answer}`).join('\n')}

---
`).join('\n')}
`;
}

export function generateFullCourseNotes(): string {
  return `# COMPLETE DEVOPS MASTER COURSE — POINT-WISE STUDY GUIDE
## From Absolute Zero to Production DevOps / SRE Architect

Welcome to your complete DevOps Study Notes handbook. This document compiles point-wise explanations, commands, architecture diagrams, best practices, and interview revision points for all 15 DevOps phases.

================================================================================
TABLE OF CONTENTS
================================================================================
${CURRICULUM_PHASES.map((p, idx) => `${idx + 1}. ${p.title} — ${p.subtitle}`).join('\n')}

================================================================================

${CURRICULUM_PHASES.map((phase) => generatePhaseNotes(phase)).join('\n\n')}`;
}
