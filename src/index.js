import Stepper from './Stepper.vue'

const state = (steps) => () => ({
  steps,
  currentStepIndex: 0,
  maxStepIndex: 0,
})

const mutations = {
  setCurrentStepIndex(state, routeName) {
    state.currentStepIndex = state.steps.findIndex(
      (route) => route.name === routeName
    )
  },
  setStepsMaxIndex(state, routeName) {
    state.maxStepIndex = state.steps.findIndex(
      (route) => route.name === routeName
    )
  },
}

export default {
  install(Vue, { store, routes }) {
    if (! store || ! routes) {
      throw new Exception('You must provide a store and some routes!')
      return
    }

    store.registerModule('steps', {
      namespaced: true,
      state: state(routes),
      mutations,
    })

    Vue.component('stepper', Stepper)

    Vue.mixin({
      methods: {
        setCurrentStepIndex(routeName) {
          this.$store.commit('steps/setCurrentStepIndex', routeName)
        },
        setStepsMaxIndex(routeName) {
          this.$store.commit('steps/setStepsMaxIndex', routeName)
        },
      },
    })
  },
}
