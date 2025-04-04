<template>
  <div class="relative bottom-0 w-full">
    <div class="flex w-full justify-center">
      <slot />
    </div>
    <div class="flex w-full">
      <div class="grow h-3 bg-green"></div>
      <div class="grow h-3 bg-brown"></div>
      <div class="grow h-3 bg-yellow-orange"></div>
      <div class="grow h-3 bg-brick-red"></div>
      <div class="grow h-3 bg-blue"></div>
    </div>
  </div>

</template>
