import {shallowMount } from '@vue/test-utils';

import About from '@/views/About.vue';

import TestHelpers from "../../test-helpers.js";

let h
let wrapper = null

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

beforeEach(() => {
    wrapper = shallowMount(About, {
        propsData:  {
            files,
            progression: 50
        }
    });
    h = new TestHelpers(wrapper, expect)
})

afterEach(() => {
    wrapper.destroy()
})

describe("TDD process for Vue", () => {
    test("render how many files area being uploaded", () => {
        expect(wrapper.find(".title").text()).toBe("Uploading 2 files")
    })
    test("renders the total file size", () => {
        expect(wrapper.find(".size").text()).toBe("7.5 MB")
    })
    it("renders the progression as a progress bar", () => {
        expect(wrapper.find(".progressbar").attributes("style")).toContain("width: 50%")
    })
    it("renders the size in KB when under 1000 bytes", () => {
        wrapper = shallowMount(About, {
          propsData: {
            files: [
                {
                    'name': 'Document.pdf',
                    size: 320
                },
                {
                    'name': 'Document_2.pdf',
                    size: 430
                },
              ]
            }
        })
        expect(wrapper.find(".size").text()).toBe("0.75 KB")
    })
})
