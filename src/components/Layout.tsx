import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { getLenis, useLenis } from '../hooks/useLenis'
import { scrollToHash } from '../lib/scroll'
import { businessJsonLd } from '../lib/jsonld'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import CookieBanner from './CookieBanner'

export default function Layout() {
  useLenis()
  const { pathname, hash } = useLocation()
  const main = useRef<HTMLDivElement>(null)

  // Troca de página: volta ao topo com transição suave. Troca só de âncora: rola até a seção.
  const prevPath = useRef<string | null>(null)
  useLayoutEffect(() => {
    const pathChanged = prevPath.current !== null && prevPath.current !== pathname
    const first = prevPath.current === null
    prevPath.current = pathname
    if (pathChanged) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo(0, 0)
      const el = main.current
      if (el && !prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' })
      }
    }
    const t = window.setTimeout(
      () => {
        if (pathChanged || first) ScrollTrigger.refresh()
        if (hash) scrollToHash(hash, first)
      },
      pathChanged || first ? 160 : 0,
    )
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  // JSON-LD do consultório, gerado a partir de src/data/empresa.ts
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = 'ld-business'
    s.text = JSON.stringify(businessJsonLd())
    document.getElementById('ld-business')?.remove()
    document.head.appendChild(s)
  }, [])

  return (
    <>
      <Header />
      <div ref={main} id="conteudo" key={pathname}>
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  )
}
