<template>

  <div class="container">
    <p>Oops, this page does not exist.</p>
    <router-link to="/">
      <button class="outline light">Go home</button>
    </router-link>
  </div>

</template>

<style lang="scss" scoped>
@import '~styles/defaults';

p {
  color: #888888;
  font-size: 1.25rem;
  margin-bottom: 20px;
}

@media screen and (max-width: $widescreen) {
  .container {
    box-sizing: border-box;
    padding: 0 20px;
  }
}
</style>
