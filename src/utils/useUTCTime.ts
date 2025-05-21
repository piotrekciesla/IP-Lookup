import { useGlobalClock } from '@/utils/useGlobalClock'
import { computed } from 'vue'

export function useUTCTime(offset: string) {
  const { now } = useGlobalClock()

  const timeUTC = computed(() => {
    const date = new Date(now.value)

    const hours = parseInt(offset.substring(1, 3), 10)
    const minutes = parseInt(offset.substring(3), 10)
    const totalOffsetMinutes = (hours * 60 + minutes) * (offset.startsWith('+') ? 1 : -1)

    const localOffset = date.getTimezoneOffset()

    const diffInMinutes = totalOffsetMinutes - -localOffset
    date.setMinutes(date.getMinutes() + diffInMinutes)

    return date.toLocaleTimeString()
  })

  return timeUTC
}
