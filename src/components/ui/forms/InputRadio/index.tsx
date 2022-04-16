import { InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
}

function InputRadio({ text, className, ...rest }: InputRadioProps) {
  return (
    <label htmlFor={rest?.id} className={cn('flex items-center', className)}>
      <span className={cn(styles.root)}>
        <input type="radio" {...rest} />
        <span />
      </span>
      {text && <p>{text}</p>}
    </label>
  )
}

export default InputRadio
