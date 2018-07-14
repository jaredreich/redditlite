<template>

  <div>

    <div class="navbar-fixed">

      <nav>
        <div class="container nav">

          <router-link class="nav-brand" to="/">
            <img id="nav-icon" class="nav-brand-img" src="~assets/img/icon_white.svg" />
            <img id="nav-logo" class="nav-brand-img" src="~assets/img/logo_white.svg" />
          </router-link>

          <router-link
            :to="`${subreddit ? `/r/${subreddit}` : ''}/top`"
            exact
            :class="{ 'is-active': $route.meta.page === 'top'}"
            class="nav-item"
          >top</router-link>

          <router-link
            :to="`${subreddit ? `/r/${subreddit}` : ''}/controversial`"
            exact
            id="nav-controversial"
            :class="{ 'is-active': $route.meta.page === 'controversial'}"
            class="nav-item"
          >controversial</router-link>

          <router-link
            :to="`${subreddit ? `/r/${subreddit}` : ''}/rising`"
            exact
            :class="{ 'is-active': $route.meta.page === 'rising'}"
            class="nav-item"
          >rising</router-link>

          <router-link
            :to="`${subreddit ? `/r/${subreddit}` : ''}/new`"
            exact
            :class="{ 'is-active': $route.meta.page === 'new'}"
            class="nav-item"
          >new</router-link>

          <router-link
            :to="`${subreddit ? `/r/${subreddit}` : '/'}`"
            exact
            :class="{ 'is-active': $route.meta.page === 'hot'}"
            class="nav-item"
          >hot</router-link>

        </div>
      </nav>

      <div class="nav-subreddit">
        <div class="container nav">
          <span class="nav-subreddit-prefix">/r/</span><!--
          --><input
            :value="subreddit"
            @keyup.enter="submit"
            @input="handleInput"
            class="nav-subreddit-input"
            type="text"
            placeholder="subreddit"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          ><!--
          --><button @click="submit" class="outline light nav-subreddit-button">go</button>
        </div>
      </div>

    </div>

    <div class="navbar-spacer"></div>

  </div>

</template>

<script>
let inputValue = ''

export default {
  computed: {
    subreddit () {
      return this.$route.params.subreddit
    }
  },
  methods: {
    handleInput (event) {
      inputValue = event.target.value.replace(/[^A-Za-z0-9_]/g, '')
    },
    submit (event) {
      // Blur input element if possible
      const element = event.target
      if (element && element.tagName === 'INPUT') {
        element.blur()
      }

      // Go to new subreddit
      if (inputValue && !this.subreddit) {
        this.$router.push(`/r/${inputValue}`)
      } else if (this.subreddit && inputValue !== this.subreddit) {
        const path = inputValue.length ? `/r/${inputValue}` : '/'
        this.$router.push(path)
      }
    }
  },
  mounted () {
    inputValue = this.subreddit
  },
  updated () {
    inputValue = this.subreddit
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/defaults';
@import '~styles/mixins';

.navbar-fixed {
  position: fixed;
  width: 100%;
  z-index: 10;
}

.navbar-spacer {
  height: $navbar-height * 2;
}

nav {
  height: $navbar-height;
  line-height: $navbar-height;
  @include background-gradient-left-to-right($primary, $success)
}

.nav-brand {
  display: inline-block;
  margin-right: 10px;
}

.nav-brand-img {
  height: 30px;
  vertical-align: middle;
}

#nav-icon {
  display: none;
}

.nav-item {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: inline-block;
  margin-left: 20px;
  text-decoration: none;
  float: right;

  &:visited {
    color: rgba(255, 255, 255, 0.6);
  }

  &:hover {
    color: #FFFFFF;
  }

  &.is-active {
    color: #FFFFFF;
  }
}

.nav-subreddit {
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  height: $navbar-height;
  position: relative;
}

.nav-subreddit-prefix {
  color: #AAAAAA;
}

.nav-subreddit-input {
  border: none;
  box-sizing: border-box;
  color: #666666;
  font-size: 1rem;
  height: $navbar-height;
  line-height: $navbar-height;
  margin: 0;
  outline: none;
  padding: 0;
  padding-right: 10px;
  width: calc(100% - 68px);
}

.nav-subreddit-button {
  position: absolute;
  top: 8px;
  width: 50px;
}

@media screen and (max-width: 450px) {
  #nav-controversial {
    display: none;
  }
}

@media screen and (max-width: $tablet) {
  #nav-icon {
    display: inline;
  }
  #nav-logo {
    display: none;
  }
}

@media screen and (max-width: $widescreen) {
  .container.nav {
    box-sizing: border-box;
    padding: 0 20px;
  }
}
</style>
