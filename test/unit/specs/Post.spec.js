import Vue from 'vue'
import Post from 'components/Post'

import { numberToStringWithCommas } from 'src/utilities'

const redditUrl = 'https://www.reddit.com'

export const post = {
  author: 'johnsmith',
  score: 9999,
  num_comments: 7777,
  permalink: '/comments/fdsafas',
  thumbnail: 'https://reddit.com',
  title: 'A black cat walked by.',
  url: 'https://reddit.com/'
}

const component = {
  data: {
    redditUrl
  },
  props: {
    post
  }
}

describe('Post.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof Post.data).to.equal('function')
    const defaultData = Post.data()
    expect(defaultData.redditUrl).to.equal(component.data.redditUrl)
  })

  it('renders (with props) correctly', () => {
    const Constructor = Vue.extend(Post)
    const vm = new Constructor({ propsData: { ...component.props } }).$mount()

    expect(vm.$el.querySelector('figure a').href)
    .to.have.string(component.props.post.url)

    expect(vm.$el.querySelector('figure a img').src)
    .to.have.string(component.props.post.thumbnail)

    expect(vm.$el.querySelector('.title a').textContent)
    .to.equal(component.props.post.title)

    expect(vm.$el.querySelector('.submitted span a').href)
    .to.have.string(`${redditUrl}/user/${component.props.post.author}`)

    expect(vm.$el.querySelector('.submitted span a').textContent)
    .to.equal(component.props.post.author)

    expect(vm.$el.querySelector('.stats .score').textContent)
    .to.have.string(numberToStringWithCommas(component.props.post.score))

    expect(vm.$el.querySelector('.stats .comments a').href)
    .to.have.string(`${redditUrl}${component.props.post.permalink}`)

    expect(vm.$el.querySelector('.stats .comments a').textContent)
    .to.have.string(numberToStringWithCommas(component.props.post.num_comments))
  })

  it('updates rendered data when vm updates', done => {
    const Constructor = Vue.extend(Post)
    const vm = new Constructor({ propsData: { ...component.props } }).$mount()

    const titleNew = 'A white dog walked by.'
    vm.post.title = titleNew

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.title a').textContent).to.have.string(titleNew)
      done()
    })
  })
})
