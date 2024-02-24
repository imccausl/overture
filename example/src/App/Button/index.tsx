/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture, { type PropsWithChildren } from '@overture/core'

type ButtonProps = PropsWithChildren<{
    onClick: () => void
}>

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
    return (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    )
}
