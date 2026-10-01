'use client';

import React from 'react';
import CodeBlock from './CodeBlock';

function sanitizeRsc(content: string): string {
  if (!content) return '';
  const rscRegex = /(?:[0-9a-f]{1,6}:T[0-9a-f]{1,6},|[0-9a-f]{1,6}:\[\[?["$]|\[\{)/i;
  const match = content.match(rscRegex);
  if (match && match.index !== undefined) {
    return content.slice(0, match.index).trim();
  }
  return content;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const sanitized = sanitizeRsc(content);

  // Split content by code blocks: ```lang ... ```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(sanitized)) !== null) {
    const textBefore = sanitized.slice(lastIndex, match.index);
    if (textBefore) {
      parts.push(renderTextSection(textBefore, `text-${lastIndex}`));
    }

    const language = match[1] || 'text';
    const code = match[2].trim();
    parts.push(
      <CodeBlock key={`code-${match.index}`} code={code} language={language} />
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingText = sanitized.slice(lastIndex);
  if (remainingText) {
    parts.push(renderTextSection(remainingText, `text-${lastIndex}`));
  }

  return <div className="markdown-body">{parts}</div>;
}

function renderTextSection(text: string, keyPrefix: string): React.ReactNode {
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <div key={keyPrefix}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Check for markdown table
        if (trimmed.startsWith('|') && (trimmed.includes('|---|') || trimmed.includes('|-'))) {
          const lines = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
          if (lines.length >= 2) {
            const parseRow = (row: string) => row.split('|').slice(1, -1).map(c => c.trim());
            const headers = parseRow(lines[0]);
            const rows = lines.slice(2).map(parseRow);

            return (
              <div
                key={`${keyPrefix}-p-${pIdx}`}
                className="markdown-table-wrap"
                style={{
                  margin: '18px 0',
                  overflowX: 'auto',
                  borderRadius: '8px',
                  border: '1px solid var(--border)'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)' }}>
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--ink)' }}>
                          {formatInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, rIdx) => (
                      <tr
                        key={rIdx}
                        style={{
                          borderBottom: rIdx === rows.length - 1 ? 'none' : '1px solid var(--border)',
                          background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                        }}
                      >
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '10px 14px', color: 'var(--ink-secondary)' }}>
                            {formatInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Check for bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n(?=[- *])/);
          return (
            <ul key={`${keyPrefix}-p-${pIdx}`} style={{ marginBottom: '16px', paddingLeft: '24px' }}>
              {items.map((it, iIdx) => (
                <li key={iIdx} style={{ marginBottom: '6px' }}>
                  {formatInline(it.replace(/^[- *]\s*/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Check for numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split(/\n(?=\d+\.\s)/);
          return (
            <ol key={`${keyPrefix}-p-${pIdx}`} style={{ marginBottom: '16px', paddingLeft: '24px' }}>
              {items.map((it, iIdx) => (
                <li key={iIdx} style={{ marginBottom: '6px' }}>
                  {formatInline(it.replace(/^\d+\.\s*/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={`${keyPrefix}-p-${pIdx}`} style={{ marginBottom: '16px' }}>
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}


function formatInline(str: string): React.ReactNode[] {
  // Handles:
  // `code`
  // **bold**
  // [link](url)
  const tokens: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(str)) !== null) {
    if (m.index > lastIdx) {
      tokens.push(str.slice(lastIdx, m.index));
    }

    const token = m[1];
    if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code key={`c-${m.index}`}>{token.slice(1, -1)}</code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={`b-${m.index}`}>{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        tokens.push(
          <a
            key={`a-${m.index}`}
            href={linkMatch[2]}
            target={linkMatch[2].startsWith('http') ? '_blank' : '_self'}
            rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : ''}
            style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIdx = m.index + m[0].length;
  }

  if (lastIdx < str.length) {
    tokens.push(str.slice(lastIdx));
  }

  return tokens;
}
