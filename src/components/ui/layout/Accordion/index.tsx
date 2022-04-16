import { HTMLAttributes, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FaCaretDown } from 'react-icons/fa'

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

function Accordion({ children, title, className }: AccordionProps) {
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={styles.title}
        role="button"
        onClick={() => setCollapsed(!isCollapsed)}
      >
        {/* <div className={styles.title}> */}
        <h5>{title}</h5>
        {/* </div> */}
        <FaCaretDown className={cn(!isCollapsed && 'rotate-180')} />
      </div>
      <div className={cn(styles.content, isCollapsed && 'hidden')}>{children}</div>
    </div>
  )
}

export default Accordion
