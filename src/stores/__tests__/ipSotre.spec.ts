import { describe, beforeEach, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useIpStore } from '@/stores/ipStore'
import { fetchIpDetails } from '@/service/ipFetchService'
import { isValidIP } from '@/validators/ipValidator'

vi.mock('@/service/ipFetchService')
vi.mock('@/validators/ipValidator')

const mockIpDetails = {
  utc_offset: '+0200',
  country_code: 'PL',
}

describe('ipStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(fetchIpDetails).mockReset()
    vi.mocked(isValidIP).mockReset()
  })

  describe('addIp', () => {
    it('adds a new row with default values', () => {
      const store = useIpStore()
      const initialLength = store.ipList.length

      store.addIp()

      expect(store.ipList.length).toBe(initialLength + 1)
      expect(store.ipList[1]).toMatchObject({
        id: 2,
        ip: '',
        status: 'initial',
      })
    })
  })

  describe('updateIp', () => {
    it('updates IP and resets related fields', async () => {
      const store = useIpStore()
      vi.mocked(isValidIP).mockReturnValue(true)
      vi.mocked(fetchIpDetails).mockResolvedValue(mockIpDetails)
      const promise = store.updateIp(0, '12.12.12.12')

      expect(store.ipList[0].ip).toBe('12.12.12.12')
      expect(store.ipList[0].utc_offset).toBeUndefined()
      expect(store.ipList[0].country_code).toBeUndefined()
      expect(store.ipList[0].errorMessage).toBeUndefined()

      await promise

      expect(store.ipList[0].ip).toBe('12.12.12.12')
      expect(store.ipList[0].utc_offset).toBe('+0200')
      expect(store.ipList[0].country_code).toBe('PL')
      expect(store.ipList[0].errorMessage).toBeUndefined()
    })

    it('sets error for invalid IP', async () => {
      const store = useIpStore()
      vi.mocked(isValidIP).mockReturnValue(false)

      await store.updateIp(0, 'invalid-ip')

      expect(store.ipList[0].status).toBe('error')
      expect(store.ipList[0].errorMessage).toBe('Invalid IP address')
    })

    it('fetches data for valid IP', async () => {
      const store = useIpStore()
      vi.mocked(isValidIP).mockReturnValue(true)
      vi.mocked(fetchIpDetails).mockResolvedValue(mockIpDetails)

      await store.updateIp(0, '8.8.8.8')

      expect(fetchIpDetails).toHaveBeenCalledWith('8.8.8.8')
      expect(store.ipList[0].status).toBe('loaded')
      expect(store.ipList[0].utc_offset).toBe('+0200')
      expect(store.ipList[0].country_code).toBe('PL')
    })

    it('handles API errors', async () => {
      const store = useIpStore()
      vi.mocked(isValidIP).mockReturnValue(true)
      vi.mocked(fetchIpDetails).mockRejectedValue(new Error('API error'))

      await store.updateIp(0, '8.8.8.8')

      expect(store.ipList[0].status).toBe('error')
      expect(store.ipList[0].errorMessage).toBe('API error')
    })

    it('updates status to "loading" during fetching', async () => {
      const store = useIpStore()
      vi.mocked(isValidIP).mockReturnValue(true)
      vi.mocked(fetchIpDetails).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockIpDetails), 100)),
      )

      const promise = store.updateIp(0, '8.8.8.8')
      expect(store.ipList[0].status).toBe('loading')

      await promise
      expect(store.ipList[0].status).toBe('loaded')
    })
  })
})
