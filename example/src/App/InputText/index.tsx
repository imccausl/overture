/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '@overture/core'

export const InputText = ({
    label,
    value,
    onChange,
}: {
    label: string
    value: string
    onChange: (event: any) => void
}) => {
    return (
        <label>
            {label}
            <input type="text" value={value} onChange={onChange} />
        </label>
    )
}
