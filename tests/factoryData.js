// https://vue-test-utils.vuejs.org/api/options.html#context
// https://kevinnadro.com/blog/there-are-code-smells-when-writing-vue-router-unit-tests-with-nodejs-and-jsdom

// import routes from "../src/router/routes"

const data = {
  data() {
    return {
      currencies: [
        { code: 'USD', description: 'Dolar' },
        { code: 'MXN', description: 'Peso' },
      ]
    }
  }
}

const propsData = {}

const factoryData = (override) => {
  // const { path: path, name: name } = routes.find(route => route.name === "Home")
  const mocks = {
    // Vue Router
    // $router: {
    //   push: jest.fn(),
    // }
  };
  return Object.assign({ mocks, propsData }, override, data);
}

export default factoryData