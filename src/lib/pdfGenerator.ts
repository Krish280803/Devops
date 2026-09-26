import { jsPDF } from 'jspdf';

export interface PDFExportOptions {
  title: string;
  subtitle?: string;
  filename: string;
  markdownContent: string;
}

export const downloadPDFNotes = ({ title, subtitle, filename, markdownContent }: PDFExportOptions) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxLineWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // Header banner background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Header Title
  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(title, margin, 18);

  // Subtitle
  if (subtitle) {
    doc.setTextColor(203, 213, 225); // slate-300
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(subtitle, margin, 26);
  }

  // Footer metadata
  const totalPagesExp = '{total_pages_count_string}';
  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`AI DevOps Academy — Official Study Notes | Page ${pageNum}`, margin, pageHeight - 10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, pageHeight - 10);
  };

  cursorY = 45;

  // Parse markdown content line by line
  const lines = markdownContent.split('\n');
  let currentPage = 1;

  doc.setTextColor(30, 41, 59); // slate-800

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trimEnd();

    // Page overflow check
    if (cursorY > pageHeight - 20) {
      addFooter(currentPage);
      doc.addPage();
      currentPage++;
      cursorY = 20;
    }

    if (!rawLine) {
      cursorY += 4;
      continue;
    }

    // Heading 1
    if (rawLine.startsWith('# ')) {
      cursorY += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(2, 132, 199); // brand-500
      doc.text(rawLine.replace('# ', ''), margin, cursorY);
      cursorY += 7;
    }
    // Heading 2
    else if (rawLine.startsWith('## ')) {
      cursorY += 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(3, 105, 161);
      doc.text(rawLine.replace('## ', ''), margin, cursorY);
      cursorY += 6;
    }
    // Heading 3
    else if (rawLine.startsWith('### ')) {
      cursorY += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(rawLine.replace('### ', ''), margin, cursorY);
      cursorY += 5;
    }
    // Code block line
    else if (rawLine.startsWith('```') || rawLine.startsWith('    ')) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const cleanCode = rawLine.replace(/```[a-z]*/g, '');
      if (cleanCode) {
        doc.setFillColor(241, 245, 249);
        doc.rect(margin, cursorY - 3.5, maxLineWidth, 5, 'F');
        doc.text(cleanCode, margin + 2, cursorY);
        cursorY += 5;
      }
    }
    // Bullet points
    else if (rawLine.startsWith('* ') || rawLine.startsWith('- ')) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const bulletText = '• ' + rawLine.substring(2);
      const wrapped = doc.splitTextToSize(bulletText, maxLineWidth - 4);
      doc.text(wrapped, margin + 2, cursorY);
      cursorY += wrapped.length * 4.5;
    }
    // Standard paragraph
    else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const wrapped = doc.splitTextToSize(rawLine.replace(/\*\*/g, ''), maxLineWidth);
      doc.text(wrapped, margin, cursorY);
      cursorY += wrapped.length * 4.5;
    }
  }

  addFooter(currentPage);

  // Save PDF file
  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
};

export const downloadTextNotes = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadMarkdownNotes = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  link.click();
  URL.revokeObjectURL(url);
};
