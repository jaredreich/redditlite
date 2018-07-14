import Vue from 'vue'

import Error from 'components/Error'

describe('Error.vue', () => {
  it('renders correctly', () => {
    const Constructor = Vue.extend(Error)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.container p').textContent)
    .to.equal('Oops, this page does not exist.')

    expect(vm.$el.querySelector('.container router-link'))
    .to.exist
  })
})
