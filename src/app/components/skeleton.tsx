import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={twMerge('animate-pulse rounded-md bg-zinc-50/10', className)}
    {...props}
  />
)
