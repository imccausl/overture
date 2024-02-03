import { Dispatcher } from '../SharedInternals/dispatcher.js'

type UseStateArg<T> = T | ((prevState: T) => T)

export const useState = <S>(initialState: UseStateArg<S>) => {
  return Dispatcher.current.useState(initialState)
}
