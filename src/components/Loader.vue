<template>
  <div id="loader" />
</template>

<style lang="scss" scoped>
@import '~styles/defaults';

#loader {
  animation: loading 2s linear infinite;
  background-color: $primary;
  display: none;
  height: 5px;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: $navbar-height * 2;
  transition: all .3s ease;
  width: 100%;
  z-index: 10;
}

@keyframes loading {
  0% { background-color: $primary; }
  25% { background-color: $warning; }
  50% { background-color: $success; }
  75% { background-color: $danger; }
}
</style>
