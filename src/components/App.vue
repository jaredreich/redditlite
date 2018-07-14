<template>

  <div>
    <loader />
    <navbar />
    <scrollback />
    <div class="container">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
import Loader from 'components/Loader'
import Navbar from 'components/Navbar'
import Scrollback from 'components/Scrollback'

export default {
  components: { Loader, Navbar, Scrollback }
}
</script>

<style lang="scss">
@import '~styles/main';
</style>
