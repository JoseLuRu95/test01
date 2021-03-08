import Vuetify from 'vuetify'

// Components
import About from '@/views/About.vue';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// import TestHelpers from "../test-helpers.js";



const files = [
    {
        'name': 'Document.pdf',
        size: 3200000
    },
    {
        'name': 'Document_2.pdf',
        size: 4300000
    },
]

describe('CustomCard.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = (options) => {
    return mount(About, {
      localVue,
      vuetify,
      ...options,
    })
  }


  xit('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mountFunction({
            propsData: { files, title: 'Hi' } 
        })

    const event = jest.fn()
    const button = wrapper.find('.v-btn')

    expect(button).toBeTruthy()

    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
  it("should change text displayed on button click", async () => {
    const wrapper = mountFunction({
        propsData: { files, title: 'Testing' } 
    })
    const button = wrapper.find('[data-testid="button-show"]')

    expect(button).toBeTruthy()

    button.trigger('@click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="title"]').text()).toBe('Testing')

  })
})