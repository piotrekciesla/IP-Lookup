import axios from 'axios'

export async function fetchIpDetails(ip: string) {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`)
    if (response.status === 200) {
      if (response.data.error) {
        throw new Error('Failed to fetch IP details ' + response.data.reason)
      }
      return response.data
    } else {
      throw new Error('Failed to fetch IP details')
    }
  } catch (error) {
    console.error('Error fetching IP details:', error)
    throw error
  }
}
