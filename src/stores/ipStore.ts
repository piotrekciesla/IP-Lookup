import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchIpDetails } from '@/service/ipFetchService'
import { isValidIP } from '@/validators/ipValidator'

export interface IpRow {
  id: number
  ip: string
  utc_offset?: string
  country_code?: string
  status: 'initial' | 'loaded' | 'loading' | 'error'
  errorMessage?: string
}
export const useIpStore = defineStore('ipStore', () => {
  const ipList = ref<Array<IpRow>>([
    {
      id: 1,
      ip: '',
      status: 'initial',
    },
  ])

  const addIp = () => {
    ipList.value.push({
      id: ipList.value.length + 1,
      ip: '',
      status: 'initial',
    })
  }

  async function updateIp(index: number, ip: string) {
    ipList.value[index].ip = ip
    ipList.value[index].utc_offset = undefined
    ipList.value[index].country_code = undefined
    ipList.value[index].errorMessage = undefined

    if (!isValidIP(ip)) {
      ipList.value[index].status = 'error'
      ipList.value[index].errorMessage = 'Invalid IP address'
      return
    }

    ipList.value[index].status = 'loading'

    try {
      const ipDetails = await fetchIpDetails(ip)
      ipList.value[index].status = 'loaded'
      ipList.value[index].utc_offset = ipDetails.utc_offset
      ipList.value[index].country_code = ipDetails.country_code
    } catch (error) {
      ipList.value[index].status = 'error'
      ipList.value[index].errorMessage = error.message
    }
  }

  return { ipList, addIp, updateIp }
})
