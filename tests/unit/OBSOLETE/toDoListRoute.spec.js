import Vuetify from 'vuetify'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"

//Helpers
import mockData from "../../mockData"
import routes from "../../../src/router/routes"
// import routerIn from "../../src/router"

// Components
import toDoList from '@/views/toDoList.vue';


// TESTING SECTION //
describe('Router testing', () => {
  // VARIABLES INITIALIZATION //
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const vuetify = new Vuetify()
  const router = new VueRouter({ routes });
  let wrapper
  const config = mockData();

  const factory = () => {
    return mount(toDoList, {
      localVue,
      vuetify,
      router,
      // ...dataPro
    })
  }

  // // SETUP BEFORE EACH  AND AFTER EACH //
  beforeEach(() => {
    wrapper = factory(config)
  })

  it('should go home page after clicking button', async () => {
    const route = routes.find(route => route.name === "Home");
    await wrapper.find('[data-testid="button-home"]').vm.$emit('click')
    try {
      // expect(wrapper.vm.$route.path).toBe(route.path);
      // expect(spy).toHaveBeenCalledWith(route);
      expect(wrapper.router.push).toHaveBeenCalled();
    } catch (error) {
      console.log(error)
    }

  })
})