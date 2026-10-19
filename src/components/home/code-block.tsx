// A tiny highlighter for the short code samples: comments, strings and keywords, nothing more.
const KEYWORDS = new Set([
  'const',
  'let',
  'await',
  'async',
  'return',
  'export',
  'class',
  'new',
  'private',
  'import',
  'from',
  'function',
  'if',
  'else',
  'for',
  'of',
  'this',
  'CONSTRAINT',
  'EXCLUDE',
  'USING',
  'WITH',
  'WHERE',
  'CREATE',
  'TABLE',
]);

function Line({ text }: { text: string }) {
  const t = text.trimStart();
  if (t.startsWith('//') || t.startsWith('--'))
    return <span className="text-[#64748b]">{text}</span>;
  // Split into strings and words, colour each part.
  const parts = text.split(
    /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\b[A-Za-z_]+\b|@\w+)/g,
  );
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (/^['"`]/.test(p))
          return (
            <span key={i} className="text-[#3dff9a]">
              {p}
            </span>
          );
        if (p.startsWith('@'))
          return (
            <span key={i} className="text-[#ff79c6]">
              {p}
            </span>
          );
        if (KEYWORDS.has(p))
          return (
            <span key={i} className="text-[#7eeeff]">
              {p}
            </span>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function CodeBlock({ code }: { code: string }) {
  // Samples stored as a diff carry a leading "+ "; it reads as noise here.
  const lines = code.replace(/^\+ ?/gm, '').split('\n');
  return (
    <pre className="p-5 text-[13px] leading-relaxed break-words whitespace-pre-wrap text-[#c3cbdb]">
      <code className="font-mono">
        {lines.map((l, i) => (
          <span key={i} className="block min-h-[1.6em]">
            <Line text={l} />
          </span>
        ))}
      </code>
    </pre>
  );
}
