const fs = require('fs')

fs.readFile('./data-json/goods.json', 'utf-8', (err, data) => {
  if (!err) {
    let newData = JSON.parse(data)
    let i = 0
    let pushData = []
    newData.RECORDS.map(function (value, index) {
      if (value.IMAGE1 !== null) {
        i++
        console.log(value.NAME)
        pushData.push(value)
      }
    })
    console.log(i)
    fs.writeFile('./data-json/newGoods.json', JSON.stringify(pushData), function (err) {
      if (err) console.log('写入失败')
      else console.log('写入成功')
    })
  }
})
