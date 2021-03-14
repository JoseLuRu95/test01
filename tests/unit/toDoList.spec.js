
// Utilities
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'

import flushPromises from 'flush-promises'
import axios from "axios";
const MockAdapter = require("axios-mock-adapter");
import VueRouter from 'vue-router'

//Helpers
import TestHelpers from "../test-helpers.js";
import factoryData from "../factoryData"
import routes from "../../src/router/routes"

// Components
import toDoList from '@/views/toDoList.vue';

// GLOBAL VARIABLES INITIALIZATION //
let wrapper = null
let h = null
const localVue = createLocalVue()
localVue.use(VueRouter)
const vuetify = new Vuetify()
const router = new VueRouter({ routes })

const factory = (dataPro) => {
  return mount(toDoList, {
    localVue,
    vuetify,
    router,
    ...dataPro
  })
}


// TESTING SECTION //
xdescribe('Render component', () => {
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeEach(() => {
    const mockData = factoryData();
    wrapper = factory(mockData)
    h = new TestHelpers(wrapper, expect)
  })
  xit("should create snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should find title', () => {
    const title = wrapper.find('.v-card__title > div')
    expect(title.text()).toBe('Currencies: 2')
  })
})

xdescribe('Properties and types', () => {
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeEach(() => {
    wrapper = factory()
    h = new TestHelpers(wrapper, expect)
  })

  const cases = [
    ['currencies', 'array', []],
    ['show', 'boolean', false],
    ['headers', 'array'],
    ['loading', 'boolean', true],
    ['error', 'null', null],
    ['index', 'number', 0],
    ['mockFunction', 'function', () => { }],
    ['toEditCurrency', 'object', { code: null, description: null }],
  ]
  test.each(cases)('should have %s property, type %s and equal to %s', (data, type) => {
    //Validate property existence, type and initial value in Vue component
    h.hasProperty(data, type)
  });
})

xdescribe('Events', () => {
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeEach(() => {
    const mockData = factoryData();
    wrapper = factory(mockData)
    h = new TestHelpers(wrapper, expect)
  })

  it('should add a new Currency', async () => {
    wrapper.vm.addCurrency({ 'code': 'GPS', 'description': 'Euro' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "GPS")
    expect(content.exists()).toBeTruthy()
  })
  it('should delete selected Currency', async () => {
    wrapper.vm.deleteCurrency({ 'code': 'USD', 'description': 'Dolar' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "USD")
    expect(content.exists()).not.toBeTruthy()
  })
  it('should update Currency', async () => {
    wrapper.vm.updateCurrency({ 'code': 'USD edited', 'description': 'Dolar' })
    await wrapper.vm.$nextTick()
    const content = wrapper.findAll('td').filter(w => w.text() === "USD edited")
    expect(content.exists()).toBeTruthy()
  })
})

describe('Router push', () => {
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeEach(() => {
    const mockData = factoryData();
    wrapper = factory(mockData)
    h = new TestHelpers(wrapper, expect)
  })

  it('should go Home page after clicking button', async () => {
    await flushPromises()
    h.currentRoute('Home')
    wrapper.vm.$router.push({ 'name': 'ToDoList' })
    await flushPromises()
    h.currentRoute("ToDoList")
    h.click('[data-testid="button-home"]')
    await flushPromises()
    h.currentRoute('Home')
  })
})

xdescribe('HTTP request get', () => {
  let mock
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })
  beforeEach(() => {
    mock.reset()
    h = new TestHelpers(wrapper, expect)
  })
  afterAll(() => {
    mock.restore()
  })
  it('should handle 400 status', async () => {
    mock
      .onGet("https://httpbin.org/get")
      .reply(200, { bpi: { EUR: { code: "EUR", symbol: "&euro;", rate: "47,934.1602", description: "Euro", rate_float: 47934.1602 } } });
    wrapper = factory()
    expect(wrapper.vm.$data.loading).toBe(true)
    expect(wrapper.vm.$data.error).toBeNull()
    expect(wrapper.vm.$data.currencies).toHaveLength(0)
    await flushPromises() // Need to wait lots of promises before actually modify data after request
    expect(wrapper.vm.$data.currencies).toHaveLength(1)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBeNull()
  })
  it('should handle 500 status', async () => {
    mock
      .onGet("https://httpbin.org/get")
      .reply(500, { data: 'payload' });
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBeNull()
    await flushPromises() // Need to wait lots of promises before actually modify data after request
    expect(wrapper.vm.$data.error).not.toBeNull()
  })
})

xdescribe('HTTP request post', () => {
  let mock
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })
  beforeEach(() => {
    mock.reset()
    h = new TestHelpers(wrapper, expect)
  })
  afterAll(() => {
    mock.restore()
  })
  it('should receive 200 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onPost("https://httpbin.org/post")
      .reply(200);
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBeNull()
    await flushPromises()
    wrapper.vm.addCurrency({ 'code': 'GPS', 'description': 'Euro' })
    await flushPromises()
    expect(wrapper.vm.$data.error).toEqual({})
  })
  it('should receive 500 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onPost("https://httpbin.org/post")
      .reply(404);
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBeNull()
    await flushPromises()
    wrapper.vm.addCurrency({ 'code': 'GPS', 'description': 'Euro' })
    await flushPromises()
    expect(wrapper.vm.$data.error).not.toEqual({})
  })
})

xdescribe('HTTP request put', () => {
  let mock
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })
  beforeEach(() => {
    mock.reset()
    h = new TestHelpers(wrapper, expect)
  })
  afterAll(() => {
    mock.restore()
  })
  it('should handle 200 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onPut("https://httpbin.org/put")
      .reply(200);
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBeNull()
    await flushPromises()
    wrapper.vm.updateCurrency({ 'code': 'USD edited', 'description': 'Dolar' })
    await flushPromises()
    expect(wrapper.vm.$data.error).toEqual({})
  })
  it('should handle 500 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onPut("https://httpbin.org/put")
      .reply(400);
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBeNull()
    await flushPromises()
    wrapper.vm.updateCurrency({ 'code': 'USD edited', 'description': 'Dolar' })
    await flushPromises()
    expect(wrapper.vm.$data.error).not.toEqual({})
  })
})

xdescribe('HTTP request delete', () => {
  let mock
  // SETUP BEFORE EACH  AND AFTER EACH //
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })
  beforeEach(() => {
    mock.reset()
    h = new TestHelpers(wrapper, expect)
  })
  afterAll(() => {
    mock.restore()
  })
  it('should handle 200 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onDelete("https://httpbin.org/delete")
      .reply(200);
    wrapper = factory()
    expect(wrapper.vm.$data.delete).toBe(false)
    await flushPromises()
    wrapper.vm.deleteCurrency({ 'code': 'USD', 'description': 'Dolar' })
    await flushPromises()
    expect(wrapper.vm.$data.delete).toEqual(true)
  })
  it('should handle 500 status', async () => {
    mock
      .onAny().replyOnce(200)
      .onDelete("https://httpbin.org/delete", {})
      .reply(400);
    wrapper = factory()
    expect(wrapper.vm.$data.error).toBe(null)
    await flushPromises()
    wrapper.vm.deleteCurrency({ 'code': 'USD', 'description': 'Dolar' })
    await flushPromises()
    expect(wrapper.vm.$data.error).not.toEqual({})

  })
})
