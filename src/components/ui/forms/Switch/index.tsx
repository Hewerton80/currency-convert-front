import { InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
}

function Switch({ text, className, ...rest }: SwitchProps) {
  return (
    <label htmlFor={rest?.id} className={cn('flex items-center', className)}>
      <span className={cn(styles.root)}>
        <input type="checkbox" {...rest} />
        <span />
      </span>
      {text && <p>{text}</p>}
    </label>
  )
}

export default Switch
