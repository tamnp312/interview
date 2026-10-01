'use client';

import React, { useState, useMemo } from 'react';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const rawLang = (language || '').trim().toLowerCase();

  const displayLang = useMemo(() => {
    if (!rawLang || rawLang === 'text' || rawLang === 'code') return 'CODE';
    if (rawLang === 'js') return 'JAVASCRIPT';
    if (rawLang === 'ts') return 'TYPESCRIPT';
    if (rawLang === 'py') return 'PYTHON';
    if (rawLang === 'sh') return 'BASH';
    return rawLang.toUpperCase();
  }, [rawLang]);

  const highlightedHtml = useMemo(() => {
    try {
      if (rawLang && hljs.getLanguage(rawLang)) {
        return hljs.highlight(code, { language: rawLang, ignoreIllegals: true }).value;
      }
      const autoRes = hljs.highlightAuto(code);
      return autoRes.value || '';
    } catch (e) {
      return '';
    }
  }, [code, rawLang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="code-block-wrap">
      <div className="code-block-header">
        <span className="code-block-lang">{displayLang}</span>
        <button
          onClick={handleCopy}
          className={`code-copy-btn ${copied ? 'copied' : ''}`}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block-pre">
        {highlightedHtml ? (
          <code
            className="hljs"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
}

