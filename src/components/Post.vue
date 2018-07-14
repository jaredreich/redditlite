<template>

  <div class="post">

    <article>

      <figure v-if="thumbnail">
        <a :href="url" target="_blank"><img :src="thumbnail"></a>
      </figure>

      <div class="post-content">

        <div class="title">
          <a :href="url" target="_blank">{{ post.title }}</a>
        </div>

        <div class="submitted">
          <span>submitted {{ created }} by <a :href="`${this.redditUrl}/user/${post.author}`" target="_blank">{{ post.author }}</a></span>
          <span v-if="showSubreddit"> to <router-link :to="`/r/${post.subreddit}`">/r/{{ post.subreddit }}</router-link></span>
        </div>

        <div class="stats">
          <span class="score"><i class="fa fa-star" aria-hidden="true"></i>&nbsp;{{ score }}</span>
          <span class="comments"><a :href="`${this.redditUrl}${post.permalink}`" target="_blank"><i class="fa fa-comments" aria-hidden="true"></i>&nbsp;{{ numberOfComments }}</a></span>
        </div>

      </div>

    </article>

  </div>

</template>

<script>
import moment from 'moment'

import { numberToStringWithCommas } from 'src/utilities'

export default {
  props: {
    post: { type: Object, required: true },
    showSubreddit: { type: Boolean, default: true }
  },
  data () {
    return {
      redditUrl: 'https://www.reddit.com'
    }
  },
  computed: {
    created () {
      // Convert from seconds to milliseconds since reddit
      // stores their created and created_utc times in seconds
      return moment(new Date(this.post.created_utc * 1000)).fromNow()
    },
    numberOfComments () {
      return numberToStringWithCommas(this.post.num_comments)
    },
    score () {
      return numberToStringWithCommas(this.post.score)
    },
    thumbnail () {
      if (!this.post.thumbnail) {
        return null
      } else if (this.post.thumbnail === 'self') {
        return '/img/thumbnail_text.svg'
      } else if (this.post.thumbnail === 'default') {
        return '/img/thumbnail_link.svg'
      } else if (this.post.thumbnail === 'image') {
        return '/img/thumbnail_image.svg'
      } else if (this.post.thumbnail === 'nsfw') {
        return '/img/thumbnail_nsfw.svg'
      } else if (!this.post.thumbnail.includes('http')) {
        return '/img/thumbnail_link.svg'
      } else {
        return this.post.thumbnail.replace('http://', 'https://')
      }
    },
    url () {
      // To fix reddit API bug where it returns ampersands
      // as html-escaped rather than plaintext
      return this.post.url.replace(/&amp;/g, '&')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/defaults';

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: $primary;
  }
}

article {
  display: flex;
}

figure {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0;
  margin-right: 1rem;
  max-width: 100px;
  min-width: 50px;
  padding: 0;
  width: 10%;

  img {
    width: 100%;
  }
}

.post {
  background-color: #FFFFFF;
  border-bottom: 1px solid #F2F2F2;
  padding: 1.25rem 1.5rem;
}

.post-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;

  .title {
    color: #555555;
    margin-bottom: 0.5rem;

    a {
      word-break: break-word;
    }
  }

  .submitted {
    color: #BBBBBB;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .stats {
    color: #CCCCCC;
    font-size: 0.75rem;

    .comments {
      margin-left: 10px;
    }
  }
}
</style>
