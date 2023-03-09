type EventKey = string
type EventHandler = (e: EBEvent) => void

class EBEvent {
  key: EventKey
  payload: any

  constructor(key: string, payload: any) {
    this.key = key
    this.payload = payload
  }
}

class EventBus {
  _handlers: Record<EventKey, EventHandler[]> = {}

  on(key: EventKey, handler: EventHandler) {
    if (this._handlers[key] === undefined) {
      this._handlers[key] = []
    }
    this._handlers[key].push(handler)
  }

  emit(e: EBEvent) {
    this._handlers[e.key].forEach((h) => h(e))
  }
}

export { EventBus }
