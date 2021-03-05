# vue-stepper
Vue stepper component to be used with Vuex and Vue Router

## Installation

```bash
npm install @ricadesign/vue-stepper
```

## Usage

```javascript
import Stepper from '@ricadesign/vue-stepper'
Vue.use(Stepper, { store, routes })
```

```html
<rica-vue-stepper></rica-vue-stepper>
```

### Props

---

You can pass the following color props to style the stepper. When using both primary and secondary colors, a background gradient will be shown.

| Prop                 | Type   |
|:--------------------:|:------:|
| primary-color        | String |
| secondary-color      | String |
| pending-text-color   | String |
| done-text-color      | String |

An image route may also be passed. It will be shown instead of the number once a step is completed:

| Prop  | Type   |
|:-----:|:------:|
| image | String |

Automatic navigation when clicking on a step may be disabled:

| Prop                    | Type    |
|:-----------------------:|:-------:|
| prevent-auto-navigation | Boolean |

### Events

---

A `step-click` event is emitted when a non-disabled step is clicked.

| Event      | Params (type)      |
|:----------:|:------------------:|
| step-click | routeName (String) |

### Changing maxIndex

---

If needed, call `this.$store.commit('steps/setStepsMaxIndex', routeName)` mutation to change the max index allowed to be navigated to.

Call `this.$store.commit('steps/disableStepsNavigation')` mutation to disable navigation altogether.