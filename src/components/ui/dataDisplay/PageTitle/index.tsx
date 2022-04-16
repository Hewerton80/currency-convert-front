import cn from 'classnames'
import { HTMLAttributes } from 'react'

interface PageTitleContainerProps extends HTMLAttributes<HTMLDivElement> {}
interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function PageTitleContainer({
  children,
  className,
  ...rest
}: PageTitleContainerProps) {
  return (
    <div className={cn('flex justify-between w-full mb-4', className)} {...rest}>
      {children}
    </div>
  )
}

export function PageTitle({ children, className, ...rest }: PageTitleProps) {
  return (
    <h1 className={cn('text-dark text-lg', className)} {...rest}>
      {children}
    </h1>
  )
}

export function PageTitleActions({
  children,
  className,
  ...rest
}: PageTitleContainerProps) {
  return (
    <div className={cn('flex', className)} {...rest}>
      {children}
    </div>
  )
}
