function log(...args) {
  console.log(...args)
}

function createLogger(label: string) {
  const PREFIX = '[' + label + ']: '
  return log.bind(null, PREFIX)
}

export { createLogger }
