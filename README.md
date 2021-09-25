# Vue3 A11y Modal

A simple Vue 3 component for building modal windows of almost 
any complexity.

## Features
* Wrapper component for [a11y-dialogs@7.2.0](https://github.com/KittyGiraudel/a11y-dialog) (Kitty Giraudel)
    * Accessibility - Focus trap, aria-attributes
    * Light and fast
    * Nested dialogs (if you sure you need it)
* Simple registration and usage
* Ability to register both single or a group of modal windows on one page
* Full control over styling (built-in styles are completely optional)
* Two types - modal and alert window

## Installation
```bash
# Npm
npm i -S vue3-a11y-modal

# Yarn
yarn add vue3-a11y-modal
```

## Props 
### AppModal.vue

Prop             | Type         | Required     | Default      | Description
   ------------  | ------------ | ------------ | ------------ | ------------
`title`          | String       | false      | `null` | Text in the heading of the modal window
`type`           | String       | false      | `modal` | Modal window mode <br /> `modal` - regular window, closes on ESC and by click on overlay <br /> `alert` - click on ovelray and ESC press doesn't close window, close button hidden. Only imperative closing possible 
`target`         | String       | false      | `body` | CSS selector of target element that will contain the modal window
`closable`       | Boolean      | false      | `true` | Show/hide close button
`scrollLock`     | Boolean      | false      | `true` | Lock page scrolling while modal is open
`lazy`           | Boolean      | false      | `true` | `true` - the window content slot is rendered when the window is first opened and then stays in the DOM tree. <br /> `false` - the content will be created and destroyed every time the window is opened/closed
`ariaCLoseLabel` | String       | false      | `Close this dialog window` | Aria label content for close button

## Usage

<details>
  <summary>Basic example</summary>

  ```html
  <template>
    <button @click="modalWindow.open">Open</button>

    <AppModal title="Demo Window" ref="modalWindow"> 
      Demo content <br>
      <button @click="modalWindow.close">Close</button>
    </AppModal>
  </template>

  <script>
  import { ref } from 'vue';
  import { AppModal } from 'vue3-a11y-modal';

  export default {
    name: 'DemoApp1',

    components: {
      AppModal,
    },

    setup() {
      const modalWindow = ref(null);

      return {
        modalWindow,
      };
    },
  };
  </script>

  <style>
  @import 'vue3-a11y-modal/dist/vue-modal-dialog.css';
  </style>

  ```
</details>