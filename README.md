# vue-stepper
Vue stepper component to be used with Vuex and Vue Router

## Installation:

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
### Styling:

```scss
@import '~@ricadesign/vue-stepper/dist/stepper';
```

You can pass the following color props to style the stepper. When using both primary and secondary colors, a background gradient will be shown.

| Prop                 | Type   |
|:--------------------:|:------:|
| primary-color        | String |
| secondary-color      | String |
| text-color-primary   | String |
| text-color-secondary | String |

An image route may also be passed. It will be shown instead of the number once a step is completed:

| Prop  | Type   |
|:-----:|:------:|
| image | String |


### Events emitted:

| Event      | Params (type)       |
|:----------:|:-------------------:|
| step-click | routeName (String) |

### Changing maxIndex:

If needed, use `this.$store.commit('steps/setStepsMaxIndex', routeName)` to change the max index allowed to be navigated to.