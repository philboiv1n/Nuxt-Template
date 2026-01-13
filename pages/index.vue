<template>
  <AppCard>
    <h1>Nuxt Template</h1>
    <p class="tagline">
      Node / Nuxt / PostgreSQL
      <br />
      {{ dbStatus }}
    </p>
    <p class="foot">Allo Mika 👋</p>
  </AppCard>
</template>

<script setup lang="ts">
const { data, pending, error } = useFetch('/api/db-test');

const dbStatus = computed(() => {
  if (pending.value) return 'DB connection: checking...';
  if (error.value) return 'DB connection: ❌';
  if (data.value?.ok) return 'DB connection: ✅';
  return 'DB connection: unknown';
});
</script>

<style scoped>
h1 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.tagline {
  margin: 0 0 20px;
  color: var(--muted);
}

.foot {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
