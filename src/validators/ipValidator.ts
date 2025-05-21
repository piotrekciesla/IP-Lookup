export function isValidIP(ip: string, version: 'v4' | 'v6' | 'both' = 'both') {
  if (!ip) {
    return false
  }
  const isValidIPv4 = (ip) => {
    const parts = ip.split('.')

    if (parts.length !== 4) {
      return false
    }

    return parts.every((part) => {
      if (!/^\d+$/.test(part)) {
        return false
      }

      const num = parseInt(part, 10)

      if (part.length > 1 && part[0] === '0') {
        return false
      }

      return num >= 0 && num <= 255
    })
  }

  const isValidIPv6 = (ip) => {
    const parts = ip.split(':')

    if (parts.length < 3 || parts.length > 8) {
      return false
    }

    const doubleColonCount = (ip.match(/::/g) || []).length
    if (doubleColonCount > 1) {
      return false
    }

    if (doubleColonCount === 1) {
      const missingGroups = 8 - parts.filter((p) => p !== '').length
      if (missingGroups < 1) {
        return false
      }
    } else if (parts.length !== 8) {
      return false
    }

    return parts.every((part) => {
      if (part === '') {
        return true
      }

      return /^[0-9a-fA-F]{1,4}$/.test(part)
    })
  }

  switch (version.toLowerCase()) {
    case 'v4':
      return isValidIPv4(ip)
    case 'v6':
      return isValidIPv6(ip)
    case 'both':
      return isValidIPv4(ip) || isValidIPv6(ip)
    default:
      throw new Error('Invalid IP version param use v4 or v6 or both')
  }
}
