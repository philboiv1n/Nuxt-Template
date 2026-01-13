<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  width: min(520px, 100%);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  animation: fade 0.5s ease-out both;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
