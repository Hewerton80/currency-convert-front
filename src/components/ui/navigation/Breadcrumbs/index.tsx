import cn from 'classnames'
import Link from 'next/link'
import { IBreadcrumbsLink } from '../../../../contexts/breadcrumbsContext'
import styles from './styles.module.css'

interface BreadcrumbsProps {
  links: IBreadcrumbsLink[]
  className?: string
}

function Breadcrumbs({ className, links, ...rest }: BreadcrumbsProps) {
  return (
    <div className={cn(styles.root, className)} {...rest}>
      {links.map((link, i) => {
        const isLastIndex = i === links.length - 1
        return (
          <p key={link.text}>
            <Link href={link.path}>
              <a className={cn(isLastIndex && styles.is_last_index)}>
                <span className={cn(isLastIndex && 'text-primary')}>{link.text}</span>
              </a>
            </Link>
            {links.length > 1 && !isLastIndex && <span> / </span>}
          </p>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
