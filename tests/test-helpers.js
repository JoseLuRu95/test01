class TestHelpers {
  constructor( wrapper, expect) {
    this.wrapper = wrapper
    this.expect = expect
  }


  click(selector) {
    this.wrapper.find(selector).trigger('click')
  }
  domHas(selector) {
    this.expect(this.wrapper.contains(selector)).toBe(true)
  }


  find(selector) {
      this.expect(this.wrapper.find(selector).exists()).toBeTruthy();
  }
  hasChild(child) {
      this.expect(this.wrapper.findComponent(child).exists()).toBeTruthy();
  }


  isVueInstance() {
    this.expect(this.wrapper.vm).toBeTruthy();
  }
  hasProperty (property, type) {
    let tp = type && type.toLowerCase()
    this.expect(this.wrapper.vm.$data).toHaveProperty(property)
    if (type) {
        if (tp === "array") {
            this.expect(Array.isArray(this.wrapper.vm[property])).toBeTruthy();
        } else {
            this.expect(typeof this.wrapper.vm[property]).toBe(tp)
        }
    }
  }
}

export default TestHelpers
