import { debounce, numberToStringWithCommas } from 'src/utilities'

describe('utilities', () => {
  it('debounce', done => {
    let counter = 0

    const func = debounce(() => {
      counter += 1
    }, 50)

    for (let i = 0; i < 5; i++) { func() }

    expect(counter).to.equal(0)

    setTimeout(() => {
      expect(counter).to.equal(1)
      done()
    }, 100)
  })

  it('numberToStringWithCommas', () => {
    expect(numberToStringWithCommas(undefined)).to.equal('')
    expect(numberToStringWithCommas(null)).to.equal('')
    expect(numberToStringWithCommas({})).to.equal('')
    expect(numberToStringWithCommas('1000')).to.equal('')
    expect(numberToStringWithCommas(0)).to.equal('0')
    expect(numberToStringWithCommas(100)).to.equal('100')
    expect(numberToStringWithCommas(1000)).to.equal('1,000')
    expect(numberToStringWithCommas(8754592)).to.equal('8,754,592')
  })
})
