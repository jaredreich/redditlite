export const CLEAR_LISTING = 'CLEAR_LISTING'
export const SET_LISTING = 'SET_LISTING'

export const mutations = {
  [CLEAR_LISTING] (state) { state.listing = null },
  [SET_LISTING] (state, { data }) { state.listing = data }
}
