const permissionMixins = {
    data () {
        return {
            'mixin1': 1,
            'mixin2': 2
        }
    },
    methods: {
        '$can': (role) => role === 'admin'
    },
    created: function () {
        console.assert('Created')
    },
}

const permissionsDirective = () => (el, bindings,) => {
        const { arg: permissions, modifiers: appsModels  } = {...bindings}
        Object.keys(appsModels).forEach(appModel => {
            el.style.display = (permissions === 'admin' && appModel === 'see\\view')  ? 'block' : 'none' 
        })
    }

export default {
    install (Vue) {
        Vue.mixin(permissionMixins)
        Vue.directive('can', permissionsDirective())
    }
}