import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IpRow from '../IpRow.vue'
import SpinnerLoader from '../SpinnerLoader.vue'
import FlagIcon from '../FlagIcon.vue'
import ClockDisplay from '../ClockDisplay.vue'
import type { IpRow as IpRowType } from '@/stores/ipStore'

describe('IpRow', () => {
  const createWrapper = (props: Partial<IpRowType> = {}) => {
    const defaultProps = {
      id: 1,
      ip: '192.168.1.1',
      status: 'initial' as const,
      ...props,
    }
    return mount(IpRow, {
      props: {
        ipRow: defaultProps,
      },
      global: {
        stubs: {
          Spinner: true,
          Flag: true,
          Clock: true,
        },
      },
    })
  }

  describe('Initial render', () => {
    it('should render with correct id', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.ipOrderNumber').text()).toBe('1')
    })

    it('should render input with correct IP', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      expect(input.element.value).toBe('192.168.1.1')
    })

    it('should not render spinner, flag or clock initially', () => {
      const wrapper = createWrapper()
      expect(wrapper.findComponent(SpinnerLoader).exists()).toBe(false)
      expect(wrapper.findComponent(FlagIcon).exists()).toBe(false)
      expect(wrapper.findComponent(ClockDisplay).exists()).toBe(false)
    })
  })

  describe('Loading state', () => {
    it('should disable input and show spinner when loading', () => {
      const wrapper = createWrapper({ status: 'loading' })
      const input = wrapper.find('input')

      expect(input.attributes('disabled')).toBe('')
      expect(wrapper.findComponent(SpinnerLoader).exists()).toBe(true)
    })
  })

  describe('Error state', () => {
    it('should display error message', () => {
      const errorMessage = 'Invalid IP address'
      const wrapper = createWrapper({
        status: 'error',
        errorMessage,
      })

      expect(wrapper.text()).toContain(errorMessage)
    })
  })

  describe('Success state', () => {
    it('should show flag and clock when country code and UTC offset are present', () => {
      const wrapper = createWrapper({
        status: 'loaded',
        country_code: 'US',
        utc_offset: '-05:00',
      })

      expect(wrapper.findComponent(FlagIcon).exists()).toBe(true)
      expect(wrapper.findComponent(ClockDisplay).exists()).toBe(true)
    })

    it('should pass correct props to FlagIcon and ClockDisplay components', () => {
      const wrapper = createWrapper({
        status: 'loaded',
        country_code: 'US',
        utc_offset: '-05:00',
      })

      const flag = wrapper.findComponent(FlagIcon)
      const clock = wrapper.findComponent(ClockDisplay)

      expect(flag.props('country_code')).toBe('US')
      expect(clock.props('utc_offset')).toBe('-05:00')
    })
  })

  describe('Input interaction', () => {
    it('should emit update event when input value changes on blur', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      const newIp = '10.0.0.1'

      await input.setValue(newIp)
      await input.trigger('blur')

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')![0]).toEqual([newIp])
    })

    it('should not emit update event when input value has not changed', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('blur')

      expect(wrapper.emitted('update')).toBeFalsy()
    })
  })
})
