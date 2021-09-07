<template>
  <teleport :to="target">
    <div
      v-if="isCreatedState"
      ref="root"
      class="modal"
      aria-hidden="true"
      :role="modalRole"
      :aria-labelledby="title"
    >
      <div
        class="modal__overlay"
        @click="() => modalRole === 'dialog' && close()"
      />
      <div class="modal__content" role="document">
        <button
          v-if="closable"
          class="modal__close"
          :aria-label="ariaCLoseLabel"
          @click.prevent="close()"
        >
          <slot name="close">&times;</slot>
        </button>

        <div v-if="title" class="modal__content-title">
          <slot name="title" :title="title">
            <h1 v-text="title" />
          </slot>
        </div>

        <div class="modal__content-body">
          <slot :isOpen="isOpen" :close="close" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export const modalController = {
  resolve: null,
  reject: null,
};
</script>

<script setup>
import { ref, computed, nextTick, onUnmounted } from "vue";
import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import A11yDialog from "a11y-dialog";

// Inits
const props = defineProps({
  title: {
    type: String,
    default: null,
  },

  type: {
    type: String,
    default: "dialog",
    validator: (value) => ["dialog", "alert"].includes(value),
  },

  target: {
    type: String,
    default: "body",
  },

  closable: {
    type: Boolean,
    default: true,
  },

  scrollLock: {
    type: Boolean,
    default: true,
  },

  lazy: {
    type: Boolean,
    default: true,
  },

  ariaCLoseLabel: {
    type: String,
    default: "Close this dialog window",
  },
});
const emit = defineEmits(["open", "close"]);

// Data
let $dialogElement = null;
const root = ref(null);
const isOpenState = ref(false);
const isCreatedState = ref(false);

// Computeds
const isOpen = computed(() => isOpenState.value);
const modalRole = computed(() =>
  props.type === "alert" ? "alertdialog" : "dialog"
);

// Methods
async function open() {
  const modalPromise = new Promise((resolve, reject) => {
    modalController.resolve = resolve;
    modalController.reject = reject;
  });

  if (!isCreatedState.value) {
    isCreatedState.value = true;

    await nextTick();

    $dialogElement = new A11yDialog(root.value);

    $dialogElement.on("destroy", () => {
      $dialogElement = null;
      isCreatedState.value = false;
      props.scrollLock && clearAllBodyScrollLocks();
    });

    $dialogElement.on("show", () => {
      isOpenState.value = true;
      props.scrollLock && disableBodyScroll(root.value);

      emit("open");
    });

    $dialogElement.on("hide", () => {
      isOpenState.value = false;
      props.scrollLock && enableBodyScroll(root.value);
      !props.lazy && (isCreatedState.value = false);
    });
  }

  $dialogElement.show();

  return modalPromise;
}

async function close(returnData) {
  if (!$dialogElement || !isOpenState.value) {
    return;
  }

  $dialogElement.hide();
  modalController.resolve(returnData);

  emit("close", returnData);
}

// Hooks
onUnmounted(() => $dialogElement && $dialogElement.destroy());
defineExpose({
  isOpen,
  open,
  close,
});
</script>

<style lang="scss">
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;

  &[aria-hidden="true"] {
    display: none;
  }

  .modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(43, 46, 56, 0.9);
    animation: fade-in 200ms both;
  }

  .modal__content {
    background-color: rgb(255, 255, 255);
    margin: auto;
    z-index: 2;
    position: relative;
    animation: fade-in 400ms 200ms both, slide-up 400ms 200ms both;
    padding: 1em;
    max-width: 90%;
    width: 600px;
    border-radius: 2px;
  }

  .modal__close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    border: 0;
    padding: 0;
    background-color: transparent;
    font-weight: bold;
    font-size: 1.25em;
    width: 1.2em;
    height: 1.2em;
    text-align: center;
    cursor: pointer;
    transition: 0.15s;
  }
}

@media screen and (mix-width: 700px) {
  .modal__content {
    padding: 2em;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(10%);
  }
}
</style>
