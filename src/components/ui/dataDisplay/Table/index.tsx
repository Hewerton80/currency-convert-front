import { HTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TableProps extends HTMLAttributes<HTMLDivElement> {}

export function Table({ children, className, ...rest }: TableProps) {
  return (
    <div className={cn(styles.root, className)} {...rest}>
      <table>{children}</table>
    </div>
  )
}

export default Table
