<template>

  <div v-if="scrollPosition > 700" @click="scrollback" id="scrollback">
    <span class="icon">
      <i class="fa fa-arrow-up"></i>
    </span>
  </div>

</template>

<script>
import { debounce } from 'src/utilities'

let scrollFunc = null

export default {
  data () {
    return {
      scrollPosition: 0
    }
  },
  methods: {
    scrollback () {
      window.scrollTo(0, 0)
    }
  },
  beforeCreate () {
    scrollFunc = debounce(() => {
      this.scrollPosition = window.scrollY
    }, 100)

    window.addEventListener('scroll', scrollFunc)
  },
  destroyed () {
    window.removeEventListener('scroll', scrollFunc)
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/defaults';
@import '~styles/mixins';

#scrollback {
  @include background-gradient-topleft-to-bottomright($primary, $success)
  border-radius: 50%;
  bottom: 10px;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  opacity: 0.75;
  position: fixed;
  right: 10px;
  text-align: center;
  width: 50px;
  z-index: 5;

  &:hover {
    opacity: 1;
  }
}

#scrollback .icon {
  color: #FFFFFF;
  font-size: 20px;
}
</style>
