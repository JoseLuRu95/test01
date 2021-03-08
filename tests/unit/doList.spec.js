import Vuetify from 'vuetify'
// Utilities
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
// import TestHelpers from "../test-helpers.js";
// Components
import toDoList from '@/views/toDoList.vue';

const info =[
  {code: 'USD', description: 'Dolar'},
  {code: 'MXN', description: 'Peso'},
]

describe('Render elements', () => {
  let vuetify = new Vuetify
  let localVue
  let wrapper


  const mountFunction = (options) => {
    return mount(toDoList, {
      localVue,
      vuetify,
      ...options,
    })
  }
  beforeEach(()=> {
    localVue = createLocalVue();
    localVue.use(Vuetify)
    wrapper = mount(toDoList, {
      localVue,
      vuetify,
      data() {
        return {
          info
        }
      },
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
    xit("should create snapshot", () => {
      wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should find title', () => {
      const title = wrapper.find('.v-card__title > div')
      expect(title.text()).toBe('Exchanges: 2')
    })

})


describe('Events', () =>{
  let vuetify = new Vuetify
  let localVue
  let wrapper = null

  const mountFunction = (options) => {
    return mount(toDoList, {
      localVue,
      vuetify,
      ...options,
    })
  }
  beforeEach(()=> {
    localVue = createLocalVue();
    localVue.use(Vuetify)
    wrapper = mountFunction({
      data() {
        return {
          info
        }
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  it('should add a new exchange', async () => {
    wrapper = mountFunction(vuetify, {
      data() {
        return{
          info
        }
      }
    })
    await wrapper.vm.addExchange({'code': 'GPS', 'description': 'Euro'})
    const title = wrapper.find('.v-card__title > div')
    expect(title.text()).toBe('Exchanges: 3')
  })
  it('should delete selected exchange', async () => {
    wrapper = mountFunction(vuetify, {
      data() {
        return{
          info
        }
      }
    })
    await wrapper.vm.deleteExchange({'code': 'USD', 'description': 'Dolar'})
    const title = wrapper.find('.v-card__title > div')
    expect(title.text()).toBe('Exchanges: 1')
    // wrapper.vm.$nextTick()
    // expect(wrapper.html()).toMatchSnapshot();
  })
})
