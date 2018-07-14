import { getters } from 'src/store/getters'
import { listing } from './Listing.spec.js'

describe('getters', () => {
  it('listing', () => {
    const state = {
      listing
    }

    const result = getters.listing(state)

    expect(result).to.be.an('object')
    expect(result).to.deep.equal(listing)
  })
})
