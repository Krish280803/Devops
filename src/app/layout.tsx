import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AI DevOps Academy — Zero to DevOps Architect',
  description: 'Learn DevOps from absolute zero to advanced production level with interactive lessons, AI tutor, labs, quizzes, and PDF study notes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-devops-dark text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
