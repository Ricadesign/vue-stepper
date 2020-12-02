<template>
  <div id="vue-stepper-component" :class="{ 'with-gradient': secondaryColor }">
    <span class="line"></span>
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step"
      :id="`step-${index + 1}`"
      :class="{
        activated: stepIsActivated(index),
        active: stepIsActive(step),
        disabled: stepIsDisabled(index),
        'with-image': image
      }"
      @click="goToRoute(step, index)"
    >
      <div class="inner-circle"></div>
      <div class="bullet">{{ index + 1 }}</div>
      <img v-if="image" :src="image" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    image: {
      type: String,
      required: false
    },
    primaryColor: {
      type: String,
      required: false
    },
    secondaryColor: {
      type: String,
      required: false
    },
    textColorPrimary: {
      type: String,
      required: false
    },
    textColorSecondary: {
      type: String,
      required: false
    }
  },
  computed: {
    steps() {
      return this.$store.state.steps.steps
    },
    currentStep() {
      return this.$store.state.steps.currentStepIndex
    },
    maxIndex() {
      return this.$store.state.steps.maxStepIndex
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.$store.commit('steps/setCurrentStepIndex', to.name)
        this.updateMaxIndex();
      },
    },
  },
  methods: {
    stepIsDisabled(stepIndex) {
      return stepIndex > this.maxIndex
    },
    stepIsActivated(stepIndex) {
      return stepIndex < this.currentStep
    },
    stepIsActive(step) {
      return this.$route.name === step.name
    },
    goToRoute(step, index) {
      this.$router.push({ name: step.name }).catch(() => {})
    },
    updateMaxIndex() {
      if (this.currentStep > this.maxIndex) {
        this.$store.commit('steps/setStepsMaxIndex', this.$route.name)
      }
    }
  },
  mounted() {
    const stepper = document.querySelector('#vue-stepper-component')
    const props = ['primaryColor', 'secondaryColor', 'textColorPrimary', 'textColorSecondary']

    for (let prop of props) {
      if (this[prop]) {
        stepper.style.setProperty(`--${prop}`, this[prop])
      }
    }
  },
}
</script>