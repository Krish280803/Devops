import { Phase } from '../types';

export const phase3: Phase = {
  id: 3,
  slug: 'git-and-github',
  title: 'Phase 3: Git Version Control & Engineering Workflows',
  subtitle: 'Branches, Commits, Rebase, PRs, Merge Conflicts & GitHub Security',
  description: 'Learn Git architecture from internal objects to advanced branch strategies, pull request code reviews, git hooks, and repository security.',
  badge: 'Core Skill',
  iconName: 'GitBranch',
  modules: [
    {
      id: 'p3-m1',
      title: 'Module 1: Git Foundations & Workflows',
      description: 'Master local Git staging lifecycle and remote collaboration.',
      lessons: [
        {
          id: 'p3-l1',
          title: 'Lesson 1: Working Tree, Staging Area & Commits',
          duration: '25 mins',
          concept: 'Git tracks project snapshot history using a 3-tier architecture: Working Directory -> Staging Area (Index) -> Repository (Commit History).',
          whyItMatters: 'Git is the single source of truth for code and Infrastructure as Code (GitOps). Every change must be tracked and peer-reviewed.',
          analogy: 'Working directory is taking photos; Staging area is selecting photos for an album; Commit is printing and locking the photo album page.',
          architectureDiagram: `
Working Directory ──(git add)──► Staging Area (Index) ──(git commit)──► Local Repository (.git)
          `,
          keyPrinciples: [
            'git init: Initialize new local git repository.',
            'git status: Inspect working tree state.'
          ],
          commandExamples: [
            { command: 'git add -p', explanation: 'Interactively review and stage code hunk by hunk.' },
            { command: 'git commit -m "feat(auth): add JWT token validation"', explanation: 'Create atomic snapshot commit.' }
          ],
          commonMistakes: ['Committing API keys or `.env` secrets into Git history.'],
          troubleshooting: [{ issue: 'Accidentally committed secret key', fix: 'Revoke key in cloud console and purge history using BFG Repo-Cleaner.' }],
          interviewQuestions: [{ question: 'Difference between `git merge` and `git rebase`?', answer: '`git merge` creates a non-destructive 3-way merge commit; `git rebase` rewrites linear history on top of target branch.', level: 'Intermediate' }],
          quiz: [{ id: 'q3-1', question: 'Which Git command stages working directory changes?', options: ['git add', 'git commit'], correctAnswer: 0, explanation: '`git add` moves changes to staging area.' }],
          practicalExercise: 'Initialize a new git repo, create `index.html`, stage it, commit with a clear message, and inspect `git log`.'
        },
        {
          id: 'p3-l2',
          title: 'Lesson 2: Advanced Branching, Rebase & Reflog Recovery',
          duration: '35 mins',
          concept: 'Advanced Git workflows rely on linear rebase history, interactive stashing, cherry-picking, and reflog safety nets for commit recovery.',
          whyItMatters: 'Resolving complex merge conflicts and recovering lost commits without losing work is essential for senior engineers.',
          analogy: 'Git Reflog is a security flight recorder keeping track of every step taken in the cockpit.',
          architectureDiagram: `
HEAD Movement History ──► git reflog ──► Restore SHA Commit Hash
          `,
          keyPrinciples: [
            'Golden Rule of Rebase: Never rebase commits that have been pushed to a shared remote repo.',
            'git reflog records every HEAD movement, allowing recovery of hard-reset commits.'
          ],
          commandExamples: [
            { command: 'git reflog', explanation: 'Display HEAD movement history log.' },
            { command: 'git cherry-pick 4a12b3c', explanation: 'Apply single specific commit onto current branch.' }
          ],
          commonMistakes: ['Force pushing onto main branch without team coordination.'],
          troubleshooting: [{ issue: 'Lost commit after git reset --hard', fix: 'Find commit SHA in `git reflog` and checkout.' }],
          interviewQuestions: [{ question: 'How do you recover a deleted commit in Git?', answer: 'Use `git reflog` to locate the commit SHA before deletion, then run `git checkout <sha>`.', level: 'Advanced' }],
          quiz: [{ id: 'q3-l2-1', question: 'Which command displays safety log history of all HEAD movements?', options: ['git reflog', 'git log'], correctAnswer: 0, explanation: '`git reflog` tracks all HEAD movements.' }],
          practicalExercise: 'Run `git reflog` in your local workspace and view the commit movement history.'
        }
      ]
    }
  ]
};
