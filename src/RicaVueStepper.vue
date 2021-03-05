<template>
  <div id="rica-vue-stepper-component" :class="{ 'with-gradient': secondaryColor }">
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
      @click="go(step.name)"
    >
      <div class="inner-circle"></div>
      <div class="bullet">{{ index + 1 }}</div>
      <img v-if="image" :src="image" />
    </div>
  </div>
</template>

<script>
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
    pendingTextColor: {
      type: String,
      required: false
    },
    doneTextColor: {
      type: String,
      required: false
    },
    preventAutoNavigation: {
      type: Boolean,
      required: false,
    },
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
    stepNavigationIsDisabled() {
      return this.$store.state.steps.stepNavigationIsDisabled
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.$store.commit('steps/setCurrentStepIndex', to.name)
        this.updateMaxIndex();
      },
    },
  },
  methods: {
    stepIsDisabled(stepIndex) {
      return this.stepNavigationIsDisabled || stepIndex > this.maxIndex
    },
    stepIsActivated(stepIndex) {
      return stepIndex < this.currentStep
    },
    stepIsActive(step) {
      return this.$route.name === step.name
    },
    updateMaxIndex() {
      if (this.currentStep > this.maxIndex) {
        this.$store.commit('steps/setStepsMaxIndex', this.$route.name)
      }
    },
    go(name) {
      if (this.stepNavigationIsDisabled) return

      if (! this.preventAutoNavigation) {
        this.$router.push({ name }).catch(() => {})
      }

      this.$emit('step-click', name)
    }
  },
  mounted() {
    const props = ['primaryColor', 'secondaryColor', 'pendingTextColor', 'doneTextColor']

    for (let prop of props) {
      if (this[prop]) {
        this.$el.style.setProperty(`--${prop}`, this[prop])
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#rica-vue-stepper-component {
  --primaryColor: #10e1ef;
  --secondaryColor: #a1fe0d;
  --pendingTextColor: #6d6d6d;
  --doneTextColor: #ffffff;

  width: calc(100% - 32px);
  max-width: 400px;
  margin: auto;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (min-width: 630px) {
    max-width: 600px;
    width: 100%;
  }

  .line {
    position: absolute;
    width: 99%;
    left: 0;
    border-style: solid;
    border-width: 1px;
    border-color: var(--primaryColor);
  }

  .step {
    width: 31px;
    height: 31px;
    border: double 1px var(--primaryColor);
    border-radius: 80px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    cursor: pointer;
    @media (min-width: 630px) {
      width: 44px;
      height: 44px;
    }

    .inner-circle {
      display: none;
    }
    .bullet {
      font-size: 22px;
      color: var(--pendingTextColor);
    }
    img {
      display: none;
    }

    &.active {
      transform: scale(1.3);
      position: relative;
      .inner-circle {
        width: 25px;
        height: 25px;
        background: var(--primaryColor);
        border-radius: 50%;
        position: absolute;
        z-index: 2;
        display: block;
      }
      .bullet {
        z-index: 3;
        color: var(--doneTextColor);
        font-size: 17px;
      }
      @media (min-width: 630px) {
        transform: scale(1.2);
        .inner-circle {
          width: 38px;
          height: 38px;
        }
        .bullet {
          font-size: 20px;
        }
      }
    }

    &.activated {
      border-radius: 50%;
      background-color: var(--primaryColor);

      .bullet {
        color: var(--doneTextColor);
      }
      &.with-image {
        .bullet {
          display: none !important;
        }
        img {
          display: block !important;
          width: 27px;
        }
      }
    }

    &.disabled {
      pointer-events: none;
    }
  }

  &.with-gradient {
    .line {
      border-image-source: linear-gradient(
        to right,
        var(--primaryColor),
        var(--secondaryColor)
      );
      border-image-slice: 1;
    }

    .step {
      border: double 1px transparent;
      background-image: linear-gradient(white, white),
        radial-gradient(
          circle at top left,
          var(--primaryColor),
          var(--secondaryColor)
        );
      background-origin: border-box;
      background-clip: content-box, border-box;

      &.active {
        .inner-circle {
          background: linear-gradient(
            135deg,
            var(--primaryColor),
            var(--secondaryColor) 100%
          );
        }
      }

      &.activated {
        background: linear-gradient(
          135deg,
          var(--primaryColor),
          var(--secondaryColor) 100%
        );
      }
    }
  }
}
</style>