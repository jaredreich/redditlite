import store from 'src/store'
import { actions } from 'src/store/actions'
import { listing } from './Listing.spec'

const { getListing } = actions

describe('actions', () => {
  it('getListing', done => {
    expect(store.getters.listing).to.equal(null)

    getListing(store, {
      path: '/top.json',
      countNext: '',
      countPrev: '',
      after: '',
      before: '',
      data: {
        response: {
          listing
        }
      }
    }).then(response => {
      expect(store.getters.listing).to.be.an('object')
      done()
    })
  })
})
