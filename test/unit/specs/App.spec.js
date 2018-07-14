import App from 'components/App'

describe('App.vue', () => {
  it('has a components object', () => {
    expect(App.components).to.be.an('object')
  })

  it('has the correct components', () => {
    expect(App.components.Loader).to.be.an('object')
    expect(App.components.Navbar).to.be.an('object')
    expect(App.components.Scrollback).to.be.an('object')
  })
})
