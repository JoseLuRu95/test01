import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
// Utilities
import { mount, createLocalVue } from '@vue/test-utils'
// Components
import toDoList from '@/views/toDoList.vue';


let vuetify = new Vuetify()
const localVue = createLocalVue()
localVue.use(vuetify)
localVue.use(VueRouter);

const info = [
  { code: 'USD', description: 'Dolar' },
  { code: 'MXN', description: 'Peso' },
]

// enableAutoDestroy(afterEach)

let wrapper
beforeEach(() => {
  wrapper = mountFunction({ info })
})
afterEach(() => {
  wrapper.destroy();
});

const mountFunction = (dataPro) => {
  return mount(toDoList, {
    localVue,
    vuetify,
    data() {
      return {
        ...dataPro
      }
    },
  })
}
describe('Render elements', () => {
  // let wrapper
  // beforeEach(() => {
  //   wrapper = mountFunction({ info })
  // })
  xit("should create snapshot", () => {
    const wrapper = mountFunction()
    wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should find title', () => {
    // const wrapper = mountFunction({ info })
    // try {
    const title = wrapper.find('.v-card__title > div')
    expect(title.text()).toBe('Exchanges: 2')
    // } finally {
    //   wrapper.destroy()
    // }
  })
})


describe('Events', () => {
  // let wrapper
  // beforeEach(() => {
  //   wrapper = mountFunction({ info })
  // })
  it('should add a new exchange', async () => {
    // const wrapper = mountFunction({ info })
    // try {
    wrapper.vm.addExchange({ 'code': 'GPS', 'description': 'Euro' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "GPS")
    expect(content.exists()).toBeTruthy()
    // } finally {
    //   wrapper.destroy()
    // }
  })
  it('should delete selected exchange', async () => {
    // const wrapper = mountFunction({ info })
    // try {
    wrapper.vm.deleteExchange({ 'code': 'USD', 'description': 'Dolar' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "USD")
    expect(content.exists()).not.toBeTruthy()
    // } finally {
    //   wrapper.destroy()
    // }
  })
  it('should update exchange', async () => {
    // const wrapper = mountFunction({ info })
    // try {
    wrapper.vm.updateExchange({ 'code': 'USD edited', 'description': 'Dolar' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "USD edited")
    expect(content.exists()).toBeTruthy()
    // } finally {
    //   wrapper.destroy()
    // }
  })
})
