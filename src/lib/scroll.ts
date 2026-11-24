import { getLenis } from '../hooks/useLenis'

/** Altura aproximada do cabeçalho fixo, descontada ao rolar até uma seção. */
export const HEADER_OFFSET = 88

/** Rola até o elemento de um hash (#secao), com Lenis quando disponível. */
export function scrollToHash(hash: string, immediate = false) {
  if (!hash || hash === '#') return false
  let target: HTMLElement | null = null
  try {
    target = document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch {
    return false
  }
  if (!target) return false
  // Posição calculada aqui (número), para não somar scroll-margin/scroll-padding do CSS ao deslocamento
  const alvo = () => Math.max(0, target!.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
  const lenis = getLenis()
  if (lenis) {
    // Se o layout mudar durante a rolagem (seção fixada, imagens), corrige o destino ao chegar.
    let tentativas = 2
    const ir = (imediato: boolean) =>
      lenis.scrollTo(alvo(), {
        immediate: imediato,
        force: true,
        onComplete: () => {
          if (tentativas-- > 0 && Math.abs(target!.getBoundingClientRect().top - HEADER_OFFSET) > 4) ir(false)
        },
      })
    ir(immediate)
  } else window.scrollTo({ top: alvo(), behavior: immediate ? 'auto' : 'smooth' })
  return true
}
