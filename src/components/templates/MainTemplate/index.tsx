import { HTMLAttributes } from 'react'
import { AppBar, IconButton, useTheme } from 'hikari-ui'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'
import classNames from 'classnames'
interface MainTemplateProps extends HTMLAttributes<HTMLDivElement> {}

function MainTemplate({ children, ...rest }: MainTemplateProps) {
  const { toogleTheme, isDarkMode } = useTheme()

  return (
    <div
      className={classNames(
        'relative',
        'flex flex-col',
        'min-h-screen max-w-screen',
        'overflow-x-hidden'
      )}
      {...rest}
    >
      <AppBar>
        <AppBar.Tool className={classNames('justify-between mx-auto max-w-7xl')}>
          <h2 className={classNames('text-base sm:text-2xl text-light font-bold')}>
            Conversor de moedas
          </h2>
          <div className="flex items-center">
            <IconButton
              onClick={toogleTheme}
              variantStyle="light-ghost"
              icon={isDarkMode ? <FaRegSun /> : <FaRegMoon />}
            />
          </div>
        </AppBar.Tool>
      </AppBar>
      <div
        className={classNames('flex', 'w-full h-full pt-[35px]', 'overflow-x-hidden')}
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="flex flex-col flex-1 px-7">{children}</div>
      </div>
    </div>
  )
}

export default MainTemplate
