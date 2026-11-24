/**
 * Espaço reservado para uma fotografia real que o cliente ainda vai enviar.
 * Aparece com moldura tracejada e legenda explícita, para não parecer uma imagem definitiva.
 */
export default function PhotoSlot({ titulo, detalhe, className = '' }: { titulo: string; detalhe?: string; className?: string }) {
  return (
    <figure className={`photo-slot rounded-[18px] p-6 ${className}`} aria-label={`Espaço reservado: ${titulo}`}>
      <span className="label-tech opacity-70">Foto a enviar</span>
      <span className="font-display text-lg leading-snug">{titulo}</span>
      {detalhe && <figcaption className="max-w-[16rem] text-xs leading-relaxed opacity-70">{detalhe}</figcaption>}
    </figure>
  )
}
