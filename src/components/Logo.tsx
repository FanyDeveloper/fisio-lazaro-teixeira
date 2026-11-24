import { Link } from 'react-router-dom'

export function LogoMark({ className = '' }: { className?: string }) {
  // Três arcos que lembram os canais semicirculares do labirinto: o símbolo do equilíbrio.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 27c-4-3-4.5-9.5-.5-13.5s10.5-3.5 13 .5" />
        <path d="M16 30c5 2 11-1 11.8-7S24 13 19.5 13.6" className="text-accent" stroke="currentColor" />
        <path d="M20.5 19.5c-2 1.3-2 4.6.6 5.8s5.2-.6 5.2-3.3" />
      </g>
    </svg>
  )
}

export default function Logo({ tone = 'ink' }: { tone?: 'ink' | 'bone' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${tone === 'ink' ? 'text-navy' : 'text-bone'}`} aria-label="Dr. Lázaro Teixeira Fisioterapia, página inicial">
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[1.2rem] tracking-tight">Lázaro Teixeira</span>
        <span className={`mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] ${tone === 'ink' ? 'text-mist' : 'text-bone/60'}`}>Fisioterapia</span>
      </span>
    </Link>
  )
}
