import { describe, it, expect } from 'vitest'
import { isValidIP } from '../ipValidator'

describe('isValidIP', () => {
  describe('IPv4', () => {
    it('should accept valid IPv4 address', () => {
      expect(isValidIP('192.168.1.1', 'v4')).toBe(true)
      expect(isValidIP('10.0.0.0', 'v4')).toBe(true)
      expect(isValidIP('172.16.254.1', 'v4')).toBe(true)
    })

    it('should reject invalid IPv4 address', () => {
      expect(isValidIP('256.1.2.3', 'v4')).toBe(false)
      expect(isValidIP('1.2.3.4.5', 'v4')).toBe(false)
      expect(isValidIP('192.168.001.1', 'v4')).toBe(false)
    })
  })

  describe('IPv6', () => {
    it('should accept valid IPv6 address', () => {
      expect(isValidIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'v6')).toBe(true)
      expect(isValidIP('2001:db8::1234:5678', 'v6')).toBe(true)
      expect(isValidIP('::1', 'v6')).toBe(true)
    })

    it('should reject invalid IPv6 address', () => {
      expect(isValidIP('2001:0db8:85a3::0000:8a2e:0370:7334:extra', 'v6')).toBe(false)
      expect(isValidIP('2001:0db8::85a3::0000', 'v6')).toBe(false)
      expect(isValidIP('gggg:db8::1234:5678', 'v6')).toBe(false)
    })
  })

  describe('Both mode', () => {
    it('should accept valid IPv4 and IPv6 addresses', () => {
      expect(isValidIP('192.168.1.1')).toBe(true)
      expect(isValidIP('2001:db8::1234:5678')).toBe(true)
    })

    it('should reject invalid IP addresses', () => {
      expect(isValidIP('256.1.2.3')).toBe(false)
      expect(isValidIP('2001:0db8::85a3::0000')).toBe(false)
    })
  })

  describe('Error handling', () => {
    it('should reject empty string', () => {
      expect(isValidIP('')).toBe(false)
    })

    it('should reject null value', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidIP(null as any)).toBe(false)
    })

    it('should reject undefined value', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidIP(undefined as any)).toBe(false)
    })

    it('should throw error for invalid version', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => isValidIP('192.168.1.1', 'v5' as any)).toThrow(
        'Invalid IP version param use v4 or v6 or both',
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle IPv4 boundary values correctly', () => {
      expect(isValidIP('0.0.0.0', 'v4')).toBe(true)
      expect(isValidIP('255.255.255.255', 'v4')).toBe(true)
    })

    it('should reject IPv4 addresses with leading zeros', () => {
      expect(isValidIP('192.168.01.1', 'v4')).toBe(false)
    })

    it('should accept shortened IPv6 addresses', () => {
      expect(isValidIP('::', 'v6')).toBe(true)
      expect(isValidIP('2001:db8::', 'v6')).toBe(true)
    })
  })
})
