
// // Utilities
// import { mount } from '@vue/test-utils'
// import Vuetify from 'vuetify'
// // import flushPromises from 'flush-promises'
// // import axios from "axios";
// // const MockAdapter = require("axios-mock-adapter");

// //Helpers
// import TestHelpers from "../test-helpers.js";
// import factoryData from "../factoryData"

// // Components
// import toDoList from '@/views/toDoList.vue';

// // GLOBAL VARIABLES INITIALIZATION //
// const localVue = global.localVue
// let wrapper
// let h = null
// const vuetify = new Vuetify()

// const factory = (dataPro) => {
//   return mount(toDoList, {
//     localVue,
//     // vuetify,
//     // router,
//     ...dataPro
//   })
// }


// // TESTING SECTION //
// xdescribe('Render component', () => {
//   // SETUP BEFORE EACH  AND AFTER EACH //
//   beforeEach(() => {
//     vuetify = new Vuetify()
//   })
//   xit("should create snapshot", () => {
//     expect(wrapper.html()).toMatchSnapshot();
//   });

//   it('should find title', () => {
//     const mockData = factoryData();
//     wrapper = factory(mockData)
//     h = new TestHelpers(wrapper, expect)
//     const title = wrapper.find('.v-card__title > div')
//     expect(title.text()).toBe('Exchanges: 2')
//   })
// })

// xdescribe('Properties and types', () => {
//   // SETUP BEFORE EACH  AND AFTER EACH //
//   beforeEach(() => {
//     const mockData = factoryData();
//     wrapper = factory(mockData)
//     h = new TestHelpers(wrapper, expect)
//   })

//   const cases = [
//     ['info', 'array'],
//     ['show', 'boolean'],
//   ]
//   test.each(cases)('should have %s property', (data, type) => {
//     //Validate property existence and type in Vue component
//     h.hasProperty(data, type)
//   });
// })

// xdescribe('Events', () => {
//   // SETUP BEFORE EACH  AND AFTER EACH //
//   beforeEach(() => {
//     const mockData = factoryData();
//     wrapper = factory(mockData)
//     h = new TestHelpers(wrapper, expect)
//   })

//   it('should add a new exchange', async () => {
//     wrapper.vm.addExchange({ 'code': 'GPS', 'description': 'Euro' })
//     await wrapper.vm.$nextTick()
//     const content = wrapper.findAll('td').filter(w => w.text() === "GPS")
//     expect(content.exists()).toBeTruthy()
//   })
//   it('should delete selected exchange', async () => {
//     wrapper.vm.deleteExchange({ 'code': 'USD', 'description': 'Dolar' })
//     await wrapper.vm.$nextTick()
//     const content = wrapper.findAll('td').filter(w => w.text() === "USD")
//     expect(content.exists()).not.toBeTruthy()
//   })
//   it('should update exchange', async () => {
//     wrapper.vm.updateExchange({ 'code': 'USD edited', 'description': 'Dolar' })
//     await wrapper.vm.$nextTick()
//     const content = wrapper.findAll('td').filter(w => w.text() === "USD edited")
//     expect(content.exists()).toBeTruthy()
//   })
// })

// xdescribe('Router push', () => {
//   // SETUP BEFORE EACH  AND AFTER EACH //
//   beforeEach(() => {
//     const mockData = factoryData();
//     wrapper = factory(mockData)
//     h = new TestHelpers(wrapper, expect)
//   })

//   it('should go Home page after clicking button', async () => {
//     try {
//       const initialRoute = wrapper.vm.$router.currentRoute.name
//       expect(initialRoute).toBe("Home")
//       await wrapper.vm.$router.push({ 'name': 'ToDoList' })
//       const currentRoute = wrapper.vm.$router.currentRoute.name
//       expect(currentRoute).toBe("ToDoList")
//       wrapper.find('[data-testid="button-home"]').vm.$emit('click')
//       await flushPromises()
//       const finalRoute = wrapper.vm.$router.currentRoute.name
//       expect(finalRoute).toBe("Home")
//     } catch (error) {
//       console.log(error)
//     }
//   })
// })

// xdescribe('HTTP request', () => {
//   let mock
//   // SETUP BEFORE EACH  AND AFTER EACH //
//   beforeAll(() => {
//     mock = new MockAdapter(axios)
//   })
//   beforeEach(() => {
//     mock.reset()
//     h = new TestHelpers(wrapper, expect)
//   })
//   afterAll(() => {
//     mock.restore()
//   })
//   it('should receive a list of exchanges', async () => {
//     try {
//       mock
//         .onGet("https://api.coindesk.com/v1/bpi/currentprice.json")
//         .reply(200, { bpi: { EUR: { code: "EUR", symbol: "&euro;", rate: "47,934.1602", description: "Euro", rate_float: 47934.1602 } } });
//       wrapper = factory()
//       expect(wrapper.vm.$data.info).toHaveLength(0)
//       await flushPromises() // Need to wait lots of promises before actually modify data after request
//       expect(wrapper.vm.$data.info).toHaveLength(1)
//     } catch (error) {
//       console.error(error);
//     }
//   })
// })


/*PENDIENTES
1. Axios recibir un error
2. Axios post
*/


// Libraries
import Vuetify from 'vuetify'

// Components
import toDoList from '@/views/toDoList.vue';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('CustomCard.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(toDoList, {
      localVue,
      vuetify
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()
  })
})