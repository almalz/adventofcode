const fs = require('fs')

const TO_FIND = 19690720

const setGravity = (intcode, noun, verb) => {
  intcode[1] = noun
  intcode[2] = verb
  return intcode
}

const compute = intcode => {
  for (let index = 0; index < intcode.length; index += 4) {
    let opcode = intcode[index]
    let firstOperator = intcode[intcode[index + 1]]
    let secondeOperator = intcode[intcode[index + 2]]
    let resultPosition = intcode[index + 3]

    switch (opcode) {
      case 1:
        intcode[resultPosition] = firstOperator + secondeOperator
        break

      case 2:
        intcode[resultPosition] = firstOperator * secondeOperator
        break

      case 99:
        return intcode

      default:
        break
    }
  }
  return intcode
}

fs.readFile(__dirname + '/inputs', 'utf8', (err, data) => {
  if (err) throw err
  let intcode = [...data.split(',').map(Number)]

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      intcode = setGravity(intcode, noun, verb)
      result = compute({ intcode: [...intcode], noun, verb })[0]
      if (result === TO_FIND) {
        console.log(100 * noun + verb)
        return
      }
    }
  }
})
