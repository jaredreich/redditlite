import api from 'src/api'

import { SET_LISTING } from './mutations'

export const actions = {
  async getListing ({ commit }, { after, before, countNext, countPrev, data, path }) {
    // Determine API endpoint
    let url = `${path}.json`
    if (typeof countNext !== 'undefined' && after) {
      url = `${url}?count=${countNext}&after=${after}`
    } else if (typeof countPrev !== 'undefined' && before) {
      url = `${url}?count=${countPrev}&before=${before}`
    }

    const response = await api('get', url, data)
    if (response) commit(SET_LISTING, { data: response.data })
    return response
  }
}
