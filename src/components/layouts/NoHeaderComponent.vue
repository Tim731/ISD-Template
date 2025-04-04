<template>
  <div class="h-screen bg-[url('/img/BG-Maintenance.png')] bg-center bg-no-repeat bg-cover flex flex-col">
    <div class="flex grow w-full">
      <slot />
    </div>
    <footer class="flex">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>

</script>
