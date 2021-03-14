class TestHelpers {
  constructor(wrapper, expect) {
    this.wrapper = wrapper
    this.expect = expect
  }
  // EVENTS //
  click(selector) {
    this.wrapper.find(selector).vm.$emit('click')
  }

  // RENDER //
  domHas(selector) {
    this.expect(this.wrapper.contains(selector)).toBe(true)
  }
  find(selector) {
    this.expect(this.wrapper.find(selector).exists()).toBeTruthy();
  }
  hasChild(child) {
    this.expect(this.wrapper.findComponent(child).exists()).toBeTruthy();
  }

  // ROUTER // 
  currentRoute(name) {
    const route = this.wrapper.vm.$router.currentRoute.name
    this.expect(route).toBe(name)
  }

  // PROPS //
  hasProperty(property, type, value) {
    let tp = type && type.toLowerCase()
    const data = this.wrapper.vm.$data
    this.expect(data).toHaveProperty(property)
    if (type) {
      switch (type) {
        case "array":
          this.expect(Array.isArray(data[property])).toBeTruthy();
          break;
        case "null":
          this.expect(data[property]).toBeNull();
          break;
        default:
          this.expect(typeof data[property]).toBe(tp)
          break;
      }
    }
    if (value) {
      this.expect(data[property]).toEqual(value);
    }
  }
}

export default TestHelpers
