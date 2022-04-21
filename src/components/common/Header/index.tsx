import { HTMLAttributes, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { FaBars, FaAngleDown, FaSignOutAlt } from 'react-icons/fa'
import Avatar from '../../ui/media/Avatar'
import DropDown from '../../ui/overlay/DropDown'
import styles from './styles.module.css'
import Switch from '../../ui/forms/Switch'

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

function Header({ className, ...rest }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark')
    }
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    // const isDarkModeByOperatingSystemPreference = window.matchMedia(
    //   '(prefers-color-scheme: dark)'
    // ).matches
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <header
      className={cn(styles.root, 'dark:bg-dark-card dark:border-white/10', className)}
      {...rest}
    >
      <div className={styles.header_inner}>
        <span className={cn(styles['theme-switch'])}>
          <Switch
            id="theme-switch"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </span>
      </div>
    </header>
  )
}

export default Header
