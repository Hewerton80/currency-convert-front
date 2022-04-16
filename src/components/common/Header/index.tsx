import { HTMLAttributes, useContext, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { FaBars, FaAngleDown, FaSignOutAlt } from 'react-icons/fa'
import Avatar from '../../ui/media/Avatar'
import DropDown from '../../ui/overlay/DropDown'
import styles from './styles.module.css'

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

function Header({ className, ...rest }: HeaderProps) {
  return (
    <header className={cn(styles.root, className)} {...rest}>
      <div className={styles.header_inner}>
        {/* <div className={cn(showSideBar && styles.show)}>
          <span className={cn(styles.logo_wrapper, showSideBar && styles.show)}>
            <Image src="/images/logo.svg" alt="logo" width={126} height={40} />
          </span>
          <span
            className={cn(styles.navbar_toggler)}
            role="button"
            onClick={handleToogleSideBar}
          >
            <FaBars />
          </span>
        </div>

        <div>
          <div role="button" onClick={() => !showDropDown && setShowDropDown(true)}>
            <Avatar src="/images/face5.jpg" />
            <p>Fulano de tal</p>
            <FaAngleDown />
            {showDropDown && (
              <DropDown
                onClickOutside={() => setShowDropDown(false)}
                onClickOption={() => console.log('logout')}
                dropDownItens={[
                  <span key="logout">
                    <FaSignOutAlt /> Log out
                  </span>,
                ]}
              />
            )}
          </div>
        </div> */}
      </div>
    </header>
  )
}

export default Header
