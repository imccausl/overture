/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '@overture/core'

export const InputText = ({ label }: { label: string }) => {
  return (
    <label>
      {label}
      <input type="text" />
    </label>
  )
}
