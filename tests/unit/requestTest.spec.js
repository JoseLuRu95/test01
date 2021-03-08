import { mockService } from '../../public/mockCall'
import {shallowMount} from '@vue/test-utils';

import App from '@/views/Home.vue';

import TestHelpers from "../test-helpers.js";

describe('Fetching data from mock service', () => {
    let h
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(App);
        h = new TestHelpers(wrapper, expect)
    })


    test('Testing the date from the resolved promise', () => {
        const data = {"mock": [{"abilities": [], "height": 7, "image": "", "name": "", "sprites": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", "type": "", "weight": 69}]}
        expect.assertions(1)
        // expect(Promise.resolve(mockService())).resolves.toBe(data)
        return expect(mockService()).resolves.toStrictEqual(data)
    })
})