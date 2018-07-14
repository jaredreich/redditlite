import Vue from 'vue'

import Navbar from 'components/Navbar'

describe('Navbar.vue', () => {
  it('has a computed object', () => {
    expect(Navbar.computed).to.be.an('object')
  })

  it('has the correct computed functions', () => {
    expect(Navbar.computed.subreddit).to.be.a('function')
  })

  it('has a methods object', () => {
    expect(Navbar.methods).to.be.an('object')
  })

  it('has the correct methods', () => {
    expect(Navbar.methods.handleInput).to.be.a('function')
    expect(Navbar.methods.submit).to.be.a('function')
  })

  it('has a mounted lifecycle method', () => {
    expect(Navbar.mounted).to.be.a('function')
  })

  it('has an updated lifecycle method', () => {
    expect(Navbar.updated).to.be.a('function')
  })

  it('renders correctly', () => {
    const Ctor = Vue.extend({
      ...Navbar
      // store
    })
    const vm = new Ctor()

    vm.$route = {
      meta: {
        page: 'hot'
      },
      params: {
        subreddit: ''
      }
    }

    vm.$mount()

    // Has successfully rendered the outer fixed element
    expect(vm.$el.querySelector('.navbar-fixed')).to.exist

    // Has successfully rendered the spacer
    expect(vm.$el.querySelector('.navbar-spacer')).to.exist

    // Has successfully rendered the container element
    expect(vm.$el.querySelector('.container')).to.exist

    // Has successfully rendered the navigation items (links)
    expect(vm.$el.querySelector('router-link')).to.exist

    // Has successfully rendered the subreddit input container
    expect(vm.$el.querySelector('.nav-subreddit')).to.exist

    const input = vm.$el.querySelector('.nav-subreddit-input')

    // Has successfully rendered the subreddit input
    expect(input).to.exist

    // Input placeholder is "subreddit"
    expect(input.placeholder).to.equal('subreddit')

    // Input spellcheck and autocomplete are off
    // (autocorrect and autocapitalize are not recognized here)
    expect(input.spellcheck).to.equal(false)
    expect(input.autocomplete).to.equal('off')

    // Input type is text
    expect(input.type).to.equal('text')

    // Has successfully rendered the subreddit submit button
    expect(vm.$el.querySelector('.nav-subreddit-button')).to.exist
  })
})
