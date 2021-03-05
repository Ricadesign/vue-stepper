import RicaVueStepper from './RicaVueStepper.vue'

const state = (steps) => () => ({
  steps,
  currentStepIndex: 0,
  maxStepIndex: 0,
  stepNavigationIsDisabled: false,
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
  disableStepsNavigation(state) {
    state.stepNavigationIsDisabled = true;
  }
}

export default {
  install(Vue, { store, routes }) {
    if (!store || !routes) {
      throw new Exception('You must provide a store and some routes!')
      return
    }

    store.registerModule('steps', {
      namespaced: true,
      state: state(routes),
      mutations,
    })

    Vue.component('rica-vue-stepper', RicaVueStepper)
  },
}
