import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToHash } from '../lib/scroll'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/**
 * Link que entende âncoras de seção ("/#tecnologia").
 * Na mesma página, rola direto até a seção (inclusive ao clicar duas vezes no mesmo item);
 * em outra página, navega e o Layout rola até a seção depois que ela renderiza.
 */
const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink({ to, onClick, ...rest }, ref) {
  const { pathname, hash } = useLocation()
  return (
    <Link
      ref={ref}
      to={to}
      onClick={(e) => {
        onClick?.(e)
        const i = to.indexOf('#')
        if (i < 0) return
        const path = to.slice(0, i) || '/'
        const h = to.slice(i)
        if (path === pathname && h === hash) {
          e.preventDefault()
          scrollToHash(h)
        }
      }}
      {...rest}
    />
  )
})

export default SmartLink
