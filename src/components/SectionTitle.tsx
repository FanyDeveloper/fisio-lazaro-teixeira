import SplitText from './reactbits/SplitText'

/** Título de seção revelado por palavra, cada uma subindo de dentro de uma máscara. */
export default function SectionTitle({ text, as = 'h2', className = '', id }: { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; id?: string }) {
  return <SplitText text={text} as={as} id={id} className={`font-display text-[2.3rem] leading-[1.02] md:text-[3.6rem] ${className}`} stagger={0.045} />
}
