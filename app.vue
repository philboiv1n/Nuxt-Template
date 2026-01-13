<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --ink: #1a1a1a;
  --muted: #5a564f;
  --card: #ffffff;
  --line: rgba(0, 0, 0, 0.08);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: var(--ink);
}
</style>
