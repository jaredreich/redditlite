<template>

  <transition name="fade">

    <div v-if="listing && listing.children && listing.children.length">

      <template v-for="child in listing.children">
        <post :post="child.data" :showSubreddit="!subreddit" />
      </template>

      <div class="page-control">

        <router-link
          v-if="listing.before"
          :to="`${$route.path}?count=${countPrev}&before=${listing.before}`"
        >
          <button class="outline light"><i class="fa fa-caret-left" aria-hidden="true"></i>&nbsp;&nbsp;prev</button>
        </router-link>

        <router-link
          v-if="listing.after"
          :to="`${$route.path}?count=${countNext}&after=${listing.after}`"
        >
          <button class="outline light">next&nbsp;&nbsp;<i class="fa fa-caret-right" aria-hidden="true"></i></button>
        </router-link>

      </div>

    </div>

    <div v-if="listing && listing.children && !listing.children.length">
      <div class="container">
        <p class="empty">There doesn't seem to be anything here...</p>
      </div>
    <div>

  </transition>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Post from 'components/Post'
import { CLEAR_LISTING } from 'src/store/mutations'

let interval

export default {
  components: { Post },
  computed: {
    ...mapGetters(['listing']),
    count () { return this.$route.query.count },
    countNext () {
      if (this.listing && this.after && this.count) {
        return Number(this.count) + 25
      } else if (this.listing && this.before && this.count) {
        return Number(this.count) - 1
      } else {
        return 25
      }
    },
    countPrev () {
      if (this.listing && this.after && this.count) {
        return Number(this.count) + 1
      } else if (this.listing && this.before && this.count) {
        return Number(this.count) - 25
      } else {
        return 26
      }
    },
    after () { return this.$route.query.after },
    before () { return this.$route.query.before },
    subreddit () { return this.$route.params.subreddit }
  },
  methods: {
    ...mapActions(['getListing']),
    async getListingWrapper (first) {
      this.setDocumentTitle()

      if (first) this.$store.commit(CLEAR_LISTING)

      await this.getListing({
        path: this.$route.path,
        countNext: this.count,
        countPrev: this.count,
        after: this.after,
        before: this.before
      })

      this.initializeInterval()
    },
    initializeInterval () {
      // Refresh data every minute if on first page
      clearInterval(interval)
      if (!this.after && !this.before) {
        interval = window.setInterval(() => {
          this.getListingWrapper()
        }, 60000)
      }
    },
    setDocumentTitle () {
      const path = this.$route.path !== '/'
        ? `redditlite: ${this.$route.path}`
        : 'redditlite'
      window.document.title = path
    }
  },
  created () {
    this.getListingWrapper(true)
  },
  watch: {
    $route: 'getListingWrapper'
  },
  destroyed () {
    clearInterval(interval)
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/defaults';

.page-control {
  padding: 20px;
  text-align: center;
}

p.empty {
  color: #888888;
  margin-bottom: 20px;
}

.fade-enter-active {
  transition: opacity .3s
}
.fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

@media screen and (max-width: $widescreen) {
  .container {
    box-sizing: border-box;
    padding: 0 20px;
  }
}
</style>
