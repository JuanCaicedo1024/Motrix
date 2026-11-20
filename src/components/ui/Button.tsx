import type { ComponentProps } from 'react'

type Props = ComponentProps<'a'> & { secondary?: boolean }

export default function Button({ secondary, className = '', ...props }: Props) {
  return <a className={`button ${secondary ? 'button-secondary' : ''} ${className}`} {...props} />
}
