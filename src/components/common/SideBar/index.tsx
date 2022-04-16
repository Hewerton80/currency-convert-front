import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { ToogleSideBarContext } from '../../../contexts/toogleSideBarContext'
import { isMobile } from '../../../utils/isMobile'
import { menu } from '../../../utils/routes'
import { Card, CardProps } from '../../ui/layout/Card'
import styles from './styles.module.css'

interface SideBarProps extends CardProps {}

function SideBar({ className, ...rest }: SideBarProps) {
  const router = useRouter()

  const { showSideBar, handleToogleSideBar } = useContext(ToogleSideBarContext)

  const handleToogleSidebar = useCallback(() => {
    if (isMobile() && showSideBar) {
      handleToogleSideBar()
    }
  }, [showSideBar, handleToogleSideBar])

  return (
    <>
      <Card
        className={cn(styles.root, showSideBar && styles.expanded, className)}
        {...rest}
      >
        <nav>
          <ul>
            {menu.map(({ title, url, icon }) => (
              <li key={url} className={cn(router.pathname === url && styles.active)}>
                <Link href={url}>
                  <a
                    className={cn(showSideBar && styles.expanded)}
                    onClick={handleToogleSidebar}
                  >
                    <span>{icon}</span>
                    <p>{title}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Card>
      <div
        onClick={handleToogleSideBar}
        className={cn(styles.wrapper_sidebar, showSideBar && styles.expanded)}
      />
    </>
  )
}

export default SideBar
