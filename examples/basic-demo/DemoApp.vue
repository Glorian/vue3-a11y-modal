<template>
  <h1>Modal Demo</h1>

  <hr />
  <button @click.prevent="open('greeting')">Basic demo</button>
  <button @click.prevent="open('alert')">Alert demo</button>

  <AppModalGroup ref="modalGroup" v-slot="{ registerModal, closeModal }">
    <AppModal
      :ref="registerModal('alert')"
      target="#modal"
      title="Alert!"
      type="alert"
    >
      Content of Alert dialog
      <hr />
      <button @click="closeModal('alert', 'Alert Closed!')">Close</button>
    </AppModal>

    <AppModal
      :ref="registerModal('greeting')"
      target="#modal"
      title="Greeting dialog"
    >
      <div>
        Regular content
        <hr />
        <button @click.prevent="open('alert')">Open Alert</button>
        <hr />
        <button @click.prevent="closeModal('greeting', false)">Close</button>
        <button @click.prevent="closeModal('greeting', true)">Confirm</button>
      </div>
    </AppModal>
  </AppModalGroup>
</template>

<script setup>
import { ref } from "vue";
import { AppModal, AppModalGroup } from "../../dist/vue-modal-dialog";

const modalGroup = ref(null);

async function open(name) {
  const result = await modalGroup.value.openModal(name);

  console.log(`After close ${name} modal ==> ${result}`);
}
</script>

<style src="../../dist/vue-modal-dialog.css" />
