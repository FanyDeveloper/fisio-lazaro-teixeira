import type { ReactNode } from 'react'

/** Rótulo técnico de seção: "04 — Avaliação e tecnologia". */
export default function SectionLabel({ n, children, tone = 'ink', className = '' }: { n?: string; children: ReactNode; tone?: 'ink' | 'bone'; className?: string }) {
  return (
    <p className={`label-tech flex items-center gap-3 ${tone === 'ink' ? 'text-accent-ink' : 'text-accent'} ${className}`}>
      {n && <span>{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  )
}
