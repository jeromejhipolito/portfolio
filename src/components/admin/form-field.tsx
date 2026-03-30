'use client';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  type?: 'text' | 'textarea' | 'number' | 'url' | 'checkbox' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options,
  placeholder,
  required,
}: FormFieldProps) {
  const inputClasses =
    'w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none';

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-neutral-400">
        <input
          type="checkbox"
          name={name}
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-neutral-600 bg-neutral-800 text-cyan-500"
        />
        {label}
      </label>
    );
  }

  if (type === 'select' && options) {
    return (
      <div>
        <label className="mb-1.5 block text-sm text-neutral-400">{label}</label>
        <select
          name={name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="mb-1.5 block text-sm text-neutral-400">{label}</label>
        <textarea
          name={name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cn(inputClasses, 'resize-y')}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-neutral-400">{label}</label>
      <input
        type={type}
        name={name}
        value={value as string | number}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
      />
    </div>
  );
}
