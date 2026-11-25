/**
 * Recriação do StaggeredMenu (reactbits.dev): menu em tela cheia com camadas
 * que entram em sequência e links que sobem um a um.
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SmartLink from '../SmartLink'
import { Phone, MapPin, Instagram } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { empresa, mapsLink, navLinks } from '../../data/empresa'
import { telLink, waLink } from '../../lib/whatsapp'

type Props = { open: boolean; onClose: () => void }

export default function StaggeredMenu({ open, onClose }: Props) {
  const { pathname, hash } = useLocation()
  const atual = (to: string) => (to.includes('#') ? pathname + hash === to : to === '/' ? pathname === '/' && !hash : pathname.startsWith(to))
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = root.current!
    const layers = el.querySelectorAll('[data-layer]')
    const links = el.querySelectorAll('[data-link]')
    const foot = el.querySelectorAll('[data-foot]')
    const reduce = prefersReducedMotion()
    gsap.set(el, { autoAlpha: 0 })
    gsap.set(layers, { xPercent: 100 })
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { autoAlpha: 1 })
      .to(layers, { xPercent: 0, duration: reduce ? 0 : 0.6, ease: 'expo.out', stagger: 0.08 })
      .from(links, { yPercent: 120, opacity: 0, duration: reduce ? 0.2 : 0.7, ease: 'expo.out', stagger: 0.06 }, '-=0.3')
      .from(foot, { y: 16, opacity: 0, duration: 0.5, stagger: 0.05 }, '-=0.4')
    return () => {
      tl.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      tl.current.timeScale(1).play()
      document.documentElement.style.overflow = 'hidden'
      const first = root.current?.querySelector<HTMLAnchorElement>('[data-link] a')
      window.setTimeout(() => first?.focus(), 300)
    } else {
      tl.current.timeScale(1.6).reverse()
      document.documentElement.style.overflow = ''
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      ref={root}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className="fixed inset-0 z-[45] xl:hidden"
      data-lenis-prevent
    >
      <div data-layer className="absolute inset-0 bg-[#1b2a8a]" />
      <div data-layer className="absolute inset-0 bg-[#0a1236]" />
      <div data-layer className="hero-glow-menu absolute inset-0 flex flex-col overflow-y-auto bg-[#010207] px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-32 text-bone">
        <nav aria-label="Menu principal" className="flex-1 pb-8">
          <ul className="space-y-0.5">
            {navLinks.map((l) => (
              <li key={l.to} data-link className="overflow-hidden">
                <SmartLink
                  to={l.to}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  aria-current={atual(l.to) ? 'location' : undefined}
                  className={`block py-1 font-editorial text-[2rem] font-medium leading-tight sm:text-[2.4rem] ${atual(l.to) ? 'italic text-white' : 'text-white/75'}`}
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4 border-t border-white/15 pt-6 font-editorial text-[1.1rem]">
          <a data-foot href={waLink()} tabIndex={open ? 0 : -1} className="hero-btn-primary flex w-full items-center justify-center rounded-full px-6 py-4 text-[1.2rem] font-medium text-white">
            Agende sua avaliação
          </a>
          <a data-foot href={telLink} tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-bone/80">
            <Phone size={18} strokeWidth={1.5} /> {empresa.telefone}
          </a>
          <a data-foot href={mapsLink} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-bone/80">
            <MapPin size={18} strokeWidth={1.5} /> Rua 300, 31 · Centro · Balneário Camboriú
          </a>
          {empresa.instagram && (
            <a data-foot href={`https://instagram.com/${empresa.instagram.replace('@', '')}`} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="flex items-center gap-3 text-bone/80">
              <Instagram size={18} strokeWidth={1.5} /> {empresa.instagram}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
