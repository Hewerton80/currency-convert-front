import { ReactNode } from 'react'
import cn from 'classnames'
import { Variant } from '../../../../types/Global'
import styles from './styles.module.css'

interface BadgeProps {
  children?: ReactNode
  className?: string
  variant?: Variant
}

function Badge({ children, variant = 'success', className }: BadgeProps) {
  return <span className={cn(styles.root, styles[variant], className)}>{children}</span>
}

export default Badge
