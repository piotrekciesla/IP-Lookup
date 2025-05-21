import { shallowRef, readonly } from 'vue'

let instance = null

export function useGlobalClock() {
  if (instance) return instance

  const now = shallowRef()
  let timer

  const startClock = () => {
    timer = setInterval(() => {
      now.value = new Date()
    }, 1000)
  }

  const synchronizeWithFullSecond = () => {
    const current = new Date()
    const ms = current.getMilliseconds()

    now.value = current

    setTimeout(() => {
      now.value = new Date()
      startClock()
    }, 1000 - ms)
  }

  synchronizeWithFullSecond()

  window.addEventListener('beforeunload', () => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  instance = {
    now: readonly(now),
  }

  return instance
}
