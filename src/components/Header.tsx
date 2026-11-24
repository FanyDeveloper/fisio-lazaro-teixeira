import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { navDesktop } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import Logo from './Logo'
import SmartLink from './SmartLink'
import Magnet from './reactbits/Magnet'
import StaggeredMenu from './reactbits/StaggeredMenu'

function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.3-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.97 3.86Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.87 2.06c0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.24 3.74 1.58.68 2.2.74 2.99.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  )
}
export { WaIcon }

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const shell = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const nav = useRef<HTMLUListElement>(null)
  const indicator = useRef<HTMLSpanElement>(null)
  const burger = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const menuRef = useRef(menuOpen)
  menuRef.current = menuOpen
  const applyRef = useRef<(s: boolean) => void>(() => {})
  const scrolledRef = useRef(false)

  // Pílula flutuante + esconder/mostrar conforme a direção da rolagem
  useEffect(() => {
    let lastY = window.scrollY
    let isScrolled = false
    let hidden = false
    const dur = prefersReducedMotion() ? 0 : 0.6
    const apply = (s: boolean) => {
      gsap.to(bar.current, {
        duration: dur,
        ease: 'expo.out',
        maxWidth: s ? 1080 : 1600,
        marginTop: s ? 12 : 0,
        paddingTop: s ? 10 : 22,
        paddingBottom: s ? 10 : 22,
        borderRadius: s ? 999 : 0,
        backgroundColor: s ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0)',
        borderColor: s ? 'rgba(11,47,91,0.12)' : 'rgba(11,47,91,0)',
        boxShadow: s ? '0 18px 40px -22px rgba(7,31,61,0.35)' : '0 0px 0px 0px rgba(7,31,61,0)',
      })
    }
    applyRef.current = apply
    const onScroll = () => {
      const y = window.scrollY
      const s = y > 80
      if (s !== isScrolled) {
        isScrolled = s
        scrolledRef.current = s
        setScrolled(s)
        apply(s)
      }
      const delta = y - lastY
      if (s && delta > 6 && !hidden && !menuRef.current) {
        hidden = true
        gsap.to(shell.current, { yPercent: -140, duration: dur * 0.8, ease: 'power3.out' })
      } else if ((delta < -6 || !s) && hidden) {
        hidden = false
        gsap.to(shell.current, { yPercent: 0, duration: dur * 0.8, ease: 'power3.out' })
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Indicador deslizante do link ativo
  const moveTo = useCallback((el: HTMLElement | null, instant = false) => {
    const ind = indicator.current
    if (!ind) return
    if (!el) return gsap.to(ind, { opacity: 0, duration: 0.3 })
    gsap.to(ind, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: instant || prefersReducedMotion() ? 0 : 0.5,
      ease: 'expo.out',
    })
  }, [])
  // Seção ativa (scroll spy na Início; página atual nas demais)
  const [ativo, setAtivo] = useState<string | null>(null)
  const ativoRef = useRef(ativo)
  ativoRef.current = ativo
  const activeEl = () => (ativoRef.current ? nav.current?.querySelector<HTMLElement>(`li[data-nav="${ativoRef.current}"]`) ?? null : null)

  useEffect(() => {
    const { pathname } = location
    if (pathname !== '/') {
      setAtivo(pathname.startsWith('/servicos') ? 'tratamentos' : pathname === '/sobre' ? 'sobre' : pathname === '/contato' ? 'contato' : null)
      return
    }
    // seção da página → item do menu
    const mapa: Record<string, string | null> = {
      inicio: null, sobre: 'sobre', areas: 'areas', tecnologia: 'tecnologia', processo: 'tecnologia', envelhecimento: 'areas',
      academico: 'academico', publicacoes: 'academico', depoimentos: 'sobre', contato: 'contato', agenda: 'contato',
    }
    let raf = 0
    const calc = () => {
      raf = 0
      const linha = window.innerHeight * 0.4
      let atual: string | null = null
      for (const id of Object.keys(mapa)) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= linha) atual = mapa[id]
      }
      setAtivo(atual)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    const t = window.setTimeout(calc, 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [location])

  useLayoutEffect(() => {
    moveTo(activeEl())
  }, [ativo, moveTo])

  useLayoutEffect(() => {
    setMenuOpen(false)
    setGrupo(null)
  }, [location.pathname, location.hash])

  // Submenus do desktop
  const [grupo, setGrupo] = useState<string | null>(null)
  const abertoEm = useRef(0) // evita que o clique logo após o hover feche o submenu
  useEffect(() => {
    if (!grupo) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setGrupo(null)
    const onDown = (e: PointerEvent) => !nav.current?.contains(e.target as Node) && setGrupo(null)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [grupo])

  useEffect(() => {
    const onResize = () => moveTo(activeEl(), true)
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [moveTo])

  // Com o menu aberto, a barra fica transparente sobre o fundo escuro
  useEffect(() => {
    if (menuOpen) gsap.to(bar.current, { backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(11,47,91,0)', boxShadow: '0 0 0 0 rgba(0,0,0,0)', duration: 0.3 })
    else applyRef.current(scrolledRef.current)
  }, [menuOpen])

  // Ícone hambúrguer → X
  useEffect(() => {
    const lines = burger.current?.querySelectorAll('span[data-l]')
    if (!lines) return
    gsap.to(lines[0], { y: menuOpen ? 4 : 0, rotate: menuOpen ? 45 : 0, duration: 0.45, ease: 'expo.out' })
    gsap.to(lines[1], { y: menuOpen ? -4 : 0, rotate: menuOpen ? -45 : 0, duration: 0.45, ease: 'expo.out' })
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <a href="#conteudo" className="sr-only z-[60] rounded-full bg-navy px-4 py-2 text-bone focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <header ref={shell} className="fixed inset-x-0 top-0 z-50 px-3">
        <div
          ref={bar}
          className={`mx-auto flex items-center justify-between border px-4 md:px-8 ${scrolled && !menuOpen ? 'backdrop-blur-xl backdrop-saturate-150' : ''}`}
          style={{ maxWidth: 1600, paddingTop: 22, paddingBottom: 22, borderColor: 'transparent' }}
        >
          <Logo tone={menuOpen ? 'bone' : 'ink'} />

          <nav aria-label="Principal" className="hidden xl:block">
            <ul ref={nav} className="relative flex items-center gap-0.5" onMouseLeave={() => moveTo(activeEl())}>
              <span ref={indicator} aria-hidden className="absolute left-0 top-0 h-full rounded-full bg-navy/[0.07] opacity-0" style={{ width: 0 }} />
              {navDesktop.map((g) => {
                const atual = ativo === g.id
                const base = `group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${atual ? 'text-navy' : 'text-ink/75 hover:text-navy'}`
                return (
                  <li
                    key={g.id}
                    data-nav={g.id}
                    className="relative"
                    onMouseEnter={(e) => {
                      moveTo(e.currentTarget)
                      if (g.children) {
                        abertoEm.current = Date.now()
                        setGrupo(g.id)
                      }
                    }}
                    onMouseLeave={() => g.children && setGrupo(null)}
                  >
                    {g.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={grupo === g.id}
                          aria-controls={`sub-${g.id}`}
                          onClick={() => setGrupo((v) => (v === g.id && Date.now() - abertoEm.current > 500 ? null : g.id))}
                          onFocus={(e) => moveTo(e.currentTarget.parentElement)}
                          className={base}
                        >
                          {g.label}
                          <ChevronDown size={15} strokeWidth={1.8} className={`transition-transform duration-300 ${grupo === g.id ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                          id={`sub-${g.id}`}
                          className={`absolute left-0 top-full pt-3 transition-all duration-300 ${grupo === g.id ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
                        >
                          <ul className="min-w-[14rem] rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_50px_-28px_rgba(7,31,61,0.45)]">
                            {g.children.map((c) => (
                              <li key={c.to}>
                                <SmartLink
                                  to={c.to}
                                  onClick={() => setGrupo(null)}
                                  className="block rounded-xl px-4 py-2.5 text-[0.92rem] text-ink/80 transition-colors hover:bg-bone hover:text-navy"
                                >
                                  {c.label}
                                </SmartLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <SmartLink to={g.to} aria-current={atual ? 'location' : undefined} onFocus={(e) => moveTo(e.currentTarget.parentElement)} className={base}>
                        {g.label}
                      </SmartLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Magnet>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-[0.92rem] font-semibold text-bone transition-colors duration-300 hover:bg-navy-deep"
                >
                  <WaIcon size={17} /> Agendar avaliação
                </a>
              </Magnet>
            </span>
            <button
              ref={burger}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className={`relative z-50 grid h-12 w-12 place-items-center rounded-full transition-colors xl:hidden ${menuOpen ? 'bg-bone text-navy' : 'bg-navy text-bone'}`}
            >
              <span className="flex flex-col gap-[6px]">
                <span data-l className="block h-[1.5px] w-5 bg-current" />
                <span data-l className="block h-[1.5px] w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <StaggeredMenu open={menuOpen} onClose={close} />
    </>
  )
}
