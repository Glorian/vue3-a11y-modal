<template>
  <slot
    :registerModal="registerModal"
    :openModal="openModal"
    :closeModal="closeModal"
  />
</template>

<script setup>
const dialogs = new Map();

const registerModal = (name) => (modal) => dialogs.set(name, modal);
const openModal = (name) => dialogs.get(name)?.open();
const closeModal = (name, data = true) => {
  dialogs.get(name)?.close(data);
};

defineExpose({ openModal, closeModal });
</script>
