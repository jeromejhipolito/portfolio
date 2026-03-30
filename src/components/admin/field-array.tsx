'use client';

import { useState } from 'react';

interface FieldArrayProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function FieldArray({ values, onChange, placeholder = 'Add item...', label }: FieldArrayProps) {
  const [input, setInput] = useState('');

  const add = () => {
    if (input.trim()) {
      onChange([...values, input.trim()]);
      setInput('');
    }
  };

  const remove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm text-neutral-400">{label}</label>}
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((val, i) => (
          <span key={i} className="flex items-center gap-1 rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
            {val}
            <button type="button" onClick={() => remove(i)} className="ml-1 text-neutral-500 hover:text-red-400">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 rounded border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
        />
        <button type="button" onClick={add} className="rounded bg-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-600">
          Add
        </button>
      </div>
    </div>
  );
}
