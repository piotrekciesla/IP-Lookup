import { describe, it, beforeEach, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddIpRowButton from '../AddIpRowButton.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useIpStore } from '@/stores/ipStore'

describe('AddIpRowButton', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render a button with "+ Add" text', () => {
    const wrapper = mount(AddIpRowButton)
    expect(wrapper.find('button').text()).toBe('+ Add')
  })

  it('should call store.addIp when button is clicked', async () => {
    const wrapper = mount(AddIpRowButton)
    const store = useIpStore()
    const spy = vi.spyOn(store, 'addIp')

    await wrapper.find('button').trigger('click')

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
