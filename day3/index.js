const fs = require('fs')

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

const getSectionListOfCoordinates = ({ orientation, length }, initialPosition) => {
  let positions
  let startX = Math.abs(initialPosition[0])
  let startY = Math.abs(initialPosition[1])


  switch (orientation) {
    case 'U':
      positions = range(startX, startX + length, 1).map(
        coord => {
          return [
            initialPosition[0] + coord,
            initialPosition[1]
          ]
        }
      )
      break

    case 'D':
      positions = range(startX, startX + length, 1).map(
        coord => {
          return [
            initialPosition[0] - coord,
            initialPosition[1]
          ]
        }
      )
      break

    case 'L':
      positions = range(startY, startY + length, 1).map(
        coord => {
          return [
            initialPosition[0],
            initialPosition[1] - coord
          ]
        }
      )
      break

    case 'R':
      positions = range(startY, startY + length, 1).map(
        coord => {
          return [
            initialPosition[0],
            initialPosition[1] + coord
          ]
        }
      )
      break

    default:
      break

  }


  return positions
}

const getPathTraces = wire => {
  let traces = [], positions
  let initialPosition = [0, 0]

  for (const section of wire) {
    positions = getSectionListOfCoordinates(
      section,
      initialPosition
    )
    initialPosition = positions[positions.length - 1]
    traces.push(...positions)
  }
  console.log(traces)
  return traces
}

const getWireCrossings = (trace1, trace2) => {
  return trace1.filter(coords => trace2.includes(coords))
}


fs.readFile(__dirname + '/inputs', 'utf8', (err, data) => {
  if (err) throw err

  const [wire1, wire2] = data.split('\n').map(wire => {
    return wire.split(',').map(section => {
      return {
        orientation: section.charAt(0),
        length: Number(section.substring(1))
      }
    })
  })

  const [trace1, trace2] = [getPathTraces(wire1), getPathTraces(wire2)]

  console.log(getWireCrossings(trace1, trace2))

})
