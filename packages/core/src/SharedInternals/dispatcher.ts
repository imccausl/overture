type CurrentDispatcher = any
type Dispatcher = {
  current: null | CurrentDispatcher
}

export const Dispatcher: Dispatcher = {
  current: null,
}
