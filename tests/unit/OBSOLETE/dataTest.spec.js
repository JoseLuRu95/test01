import {shallowMount } from '@vue/test-utils';

import App from '@/views/Home.vue';

import TestHelpers from "../../test-helpers.js";


describe('Testing of the data() properties', ()=>{
    let h
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(App);
        h = new TestHelpers(wrapper, expect)
    })

    afterEach(() => {
        wrapper.destroy()
    })

    test('should have name property',()=>{
        //Se valida la propiedad name de data()
        //Se valida el tipo de dato de la propiedad name
        h.hasProperty('name', 'string')
    });
    test('should have image property',()=>{
        //Se valida la propiedad image de data()
        //Se valida el tipo de dato de la propiedad image
        h.hasProperty('image', 'string')
    });
    test('should have type property',()=>{
        //Se valida la propiedad type de data()
        //Se valida el tipo de dato de la propiedad type
        h.hasProperty('type', 'string')
    });
    test('should have weight property',()=>{
        //Se valida la propiedad weight de data()
        //Se valida el tipo de dato de la propiedad weight
        h.hasProperty('weight', 'number')
    });
    test('should have height property',()=>{
        //Se valida la propiedad height de data()
        //Se valida el tipo de dato de la propiedad height
        h.hasProperty('height', 'number')
    })
    test('should have abilities property',()=>{
        //Se valida la propiedad abilities de data()
        //Se valida el tipo de dato de la propiedad abilities
        //preguntando si es o no un array por medio de un booleano
        h.hasProperty('abilities', 'ARRAY')
    })
})
