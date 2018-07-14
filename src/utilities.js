export const debounce = (callback, wait) => {
  let timeout = null
  let callbackArgs = null
  const later = () => callback(...callbackArgs)
  return () => {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// e.g. 1000 => '1,000', 8237953 => '8,237,953'
export const numberToStringWithCommas = num => {
  if (typeof num !== 'number') return ''
  const parts = num % 1 !== 0
    ? num.toFixed(2).toString().split('.')
    : num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
