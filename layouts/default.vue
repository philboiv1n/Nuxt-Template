<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
}
</style>
