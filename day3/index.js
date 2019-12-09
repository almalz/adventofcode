const fs = require('fs')

const getPathTraces = wire => {}

fs.readFile(__dirname + '/inputs', 'utf8', (err, data) => {
  if (err) throw err

  const wires = data.split('\n')
  let [wire1, wire2] = [...[wires[0].split(',')], [...wires[1].split(',')]]

  wire1 = wire1.map(section => {
    return {
      orientation: section.charAt(0),
      length: section.substring(1)
    }
  })

  wire2 = wire2.map(section => {
    return {
      orientation: section.charAt(0),
      length: section.substring(1)
    }
  })

  console.log({ wire1 })
})
