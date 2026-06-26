import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const n = idx++;
      parts.push(
        <img
          key={n}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          className='my-6 w-full rounded-sm object-cover'
        />,
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const n = idx++;
      parts.push(
        <a
          key={n}
          href={linkMatch[2]}
          className='text-custom underline underline-offset-2 transition-colors hover:opacity-80'
        >
          {renderInline(linkMatch[1])}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      const n = idx++;
      parts.push(<strong key={n}>{renderInline(boldMatch[1])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      const n = idx++;
      parts.push(<em key={n}>{renderInline(italicMatch[1])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.search(/!\[|\[|\*\*/);
    if (nextSpecial === 0) continue;
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    }
    parts.push(remaining.slice(0, nextSpecial));
    remaining = remaining.slice(nextSpecial);
  }

  return parts.length === 1 ? parts[0] : parts;
}

export function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const nodes: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={i} className='mb-3 mt-10 text-xl font-serif'>
          {renderInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={i} className='mb-4 mt-12 text-2xl font-serif md:text-3xl'>
          {renderInline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      nodes.push(
        <h1 key={i} className='mb-4 mt-12 text-3xl font-serif md:text-4xl'>
          {renderInline(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }

    if (line.match(/^[-*]\s/)) {
      const items: ReactNode[] = [];
      const startIdx = i;
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        const n = i;
        items.push(
          <li
            key={n}
            className='relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full             before:bg-custom'
          >
            {renderInline(lines[i].replace(/^[-*]\s/, ''))}
          </li>,
        );
        i++;
      }
      nodes.push(
        <ul key={`ul-${startIdx}`} className='mb-6 space-y-2'>
          {items}
        </ul>,
      );
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '') {
      paraLines.push(lines[i]);
      i++;
    }
    nodes.push(
      <p key={`p-${i}`}         className='mb-5 leading-relaxed text-muted-foreground'>
        {renderInline(paraLines.join(' '))}
      </p>,
    );
  }

  return nodes;
}
