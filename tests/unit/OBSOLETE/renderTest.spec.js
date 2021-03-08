import {shallowMount} from '@vue/test-utils';

import App from '@/views/Home.vue';
import PokeStats from '@/views/PokeStats.vue';

import TestHelpers from "../../test-helpers.js";


describe('Testing the correct rendering of elements', ()=>{
    let h
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(App);
        h = new TestHelpers(wrapper, expect)
    })

    test('should render 2 sections',()=>{
        //comprueba que exista la clase y luego comprueba si el elemento es un section
        h.find('.app-pokemon-main')
        expect(wrapper.find('.app-pokemon-main').element.tagName.toLowerCase() == 'section').toBeTruthy();
        h.find('.app-pokemon-stats')
        expect(wrapper.find('.app-pokemon-stats').element.tagName.toLowerCase() == 'section').toBeTruthy();
    });
    test('should render 1 image',()=>{
        //comprueba que exista la clase y luego comprueba si el elemento es un section
        h.find('img')
        expect(wrapper.find('img').element.tagName.toLowerCase() == 'img').toBeTruthy();
    });
    test('should render 2 p',()=>{
        //comprueba que exista la clase y luego comprueba si el elemento es un section
        h.find('.pokemon-name')
        expect(wrapper.find('.pokemon-name').element.tagName.toLowerCase() == 'p').toBeTruthy();
        h.find('#abilities')
        expect(wrapper.find('#abilities').element.tagName.toLowerCase() == 'p').toBeTruthy();
    });
    test('should render 1 button', () => {

        h.find('button')
        expect(wrapper.find('button').element.tagName.toLowerCase() == 'button').toBeTruthy();

    });
    test('should render 1 ul', () => {

        h.find('ul')
        expect(wrapper.find('ul').element.tagName.toLowerCase() == 'ul').toBeTruthy();

    });
    test('should render 1 child', () => {
        //Normalmente cuando hacemos pruebas, tratamos de mantenerlas lo más modular posible,
        //es decir, no probamos los hijos en los padres.
        //En el caso de Vue, al no crear una etiqueta de nuestro componente,
        //nos crea esta etiqueta con esa clase.
        h.hasChild(PokeStats)

    });

    test('renders without erros', () => {
        h.isVueInstance()
    })
})
