import { mutations } from 'src/store/mutations'
import { listing } from './Listing.spec.js'

const { CLEAR_LISTING, SET_LISTING } = mutations

describe('mutations', () => {
  it('CLEAR_LISTING', () => {
    const state = {
      listing
    }

    CLEAR_LISTING(state)

    expect(state.listing).to.equal(null)
  })

  it('SET_LISTING', () => {
    const state = {
      listing: null
    }

    SET_LISTING(state, { data: listing })

    expect(state.listing).to.be.an('object')
    expect(state.listing).to.deep.equal(listing)
  })
})
