<template>
  <div class="flex flex-col">
    <label class="text-lg font-bold mt-5">Default</label>
    <div class="card flex flex-wrap gap-4">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
    </div>

    <label class="text-lg font-bold mt-5">Outlined</label>
    <div class="card flex flex-wrap gap-4">
      <Button label="Primary" outlined />
      <Button label="Secondary" severity="secondary" outlined />
      <Button label="Success" severity="success" outlined />
      <Button label="Info" severity="info" outlined />
      <Button label="Warn" severity="warn" outlined />
      <Button label="Help" severity="help" outlined />
      <Button label="Danger" severity="danger" outlined />
      <Button label="Contrast" severity="contrast" outlined />
    </div>

    <label class="text-lg font-bold mt-5">Faded</label>
    <div class="card flex flex-wrap gap-4">
      <Button label="Primary" class="faded" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
    </div>
  </div>

</template>
<script setup>
import Button from "primevue/button";
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
