export const money = (num) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && num.indexOf('**') > -1) {
    return num
  }
  return `￥${(+num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const decimal = (num, precision = 2) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && num.indexOf('**') > -1) {
    return num
  }
  return `${(+num).toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, '$&,')}`
}
