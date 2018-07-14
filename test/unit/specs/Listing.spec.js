import Vue from 'vue'
import Vuex from 'vuex'

import Listing from 'components/Listing'
import { getters } from 'src/store/getters'
import { mutations } from 'src/store/mutations'
import { post } from './Post.spec'

Vue.use(Vuex)

export const listing = {
  after: null,
  before: null,
  children: [
    {
      kind: 't3',
      data: { ...post }
    }
  ]
}

const store = new Vuex.Store({
  getters,
  mutations,
  state: {
    listing
  }
})

describe('Listing.vue', () => {
  it('has a components object', () => {
    expect(Listing.components).to.be.an('object')
  })

  it('has the correct components', () => {
    expect(Listing.components.Post).to.be.an('object')
  })

  it('has a computed object', () => {
    expect(Listing.computed).to.be.an('object')
  })

  it('has the correct computed functions', () => {
    expect(Listing.computed.listing).to.be.a('function')
    expect(Listing.computed.count).to.be.a('function')
    expect(Listing.computed.countNext).to.be.a('function')
    expect(Listing.computed.countNext()).to.be.a('number')
    expect(Listing.computed.countPrev).to.be.a('function')
    expect(Listing.computed.countPrev()).to.be.a('number')
    expect(Listing.computed.after).to.be.a('function')
    expect(Listing.computed.before).to.be.a('function')
    expect(Listing.computed.subreddit).to.be.a('function')
  })

  it('has a methods object', () => {
    expect(Listing.methods).to.be.an('object')
  })

  it('has the correct methods', () => {
    expect(Listing.methods.getListing).to.be.a('function')
    expect(Listing.methods.getListingWrapper).to.be.a('function')
    expect(Listing.methods.initializeInterval).to.be.a('function')
    expect(Listing.methods.setDocumentTitle).to.be.a('function')
  })

  it('has a created lifecycle method', () => {
    expect(Listing.created).to.be.a('function')
  })

  it('has a watch object', () => {
    expect(Listing.watch).to.be.an('object')
  })

  it('watch object uses the correct handler', () => {
    expect(Listing.watch.$route).to.equal('getListingWrapper')
  })

  it('has a destroyed lifecycle method', () => {
    expect(Listing.destroyed).to.be.a('function')
  })

  it('renders posts correctly', () => {
    const Ctor = Vue.extend({
      ...Listing,
      store
    })
    const vm = new Ctor()

    vm.$route = {
      params: {
        subreddit: ''
      }
    }

    vm.$mount()

    // Has successfully rendered one or more posts
    // Post.vue tests located in ./Post.spec.js
    expect(vm.$el.querySelector('article')).to.exist
  })
})
